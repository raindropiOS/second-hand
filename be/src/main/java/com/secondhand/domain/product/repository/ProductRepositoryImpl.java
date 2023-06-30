package com.secondhand.domain.product.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.interested.QInterested;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.QProduct;
import com.secondhand.domain.product.Status;
import com.secondhand.service.MemberService;
import com.secondhand.web.dto.filtercondition.ProductSalesSearchCondition;
import com.secondhand.web.dto.filtercondition.ProductCategorySearchCondition;
import com.secondhand.web.dto.filtercondition.ProductSearchCondition;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.secondhand.domain.categorie.QCategory.category;
import static com.secondhand.domain.interested.QInterested.interested;
import static com.secondhand.domain.member.QMember.member;
import static com.secondhand.domain.product.QProduct.product;
import static com.secondhand.domain.town.QTown.town;


@Slf4j
@Repository
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductCustomRepository {

    // 페이지 크기를 10으로 고정
    public static final int PAGE_SIZE = 10;
    private final JPAQueryFactory jpaQueryFactory;
    private final MemberService memberService;

    @Override
    public Slice<Product> findAllByTowns(ProductSearchCondition condition, Pageable pageable, long userId) {

        log.debug("querydsl 실행 ========================");
        JPAQuery<Product> query = jpaQueryFactory.selectFrom(product)
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member, member).fetchJoin()
                .where(locationEq(condition.getTownId()),
                        categoryEq(condition.getCategoryId())
                )
                .orderBy(product.id.desc());

        log.debug("offset = {}", pageable.getPageNumber() * PAGE_SIZE);
        log.debug("pageable.getPageNumber() = {}", pageable.getPageNumber());
        List<Product> products = query.offset(pageable.getPageNumber() * PAGE_SIZE)
                .limit(PAGE_SIZE)
                .fetch();

        log.debug("qurelydsl 종료 =================");
        int nextPageIndex = pageable.getPageNumber() * PAGE_SIZE;
        return new SliceImpl<>(products, pageable, hasNext(products, PAGE_SIZE + nextPageIndex));
    }

    @Override
    public Slice<Product> findAllByCategory(ProductCategorySearchCondition condition, Pageable pageable, long userId) {

        log.debug("querydsl 실행 ========================");
        JPAQuery<Product> query = jpaQueryFactory.selectFrom(product)
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member).fetchJoin()
                .leftJoin(product.interesteds, interested).fetchJoin()
                .where(
                        categoryEq(condition.getCategoryId()),
                        //      categoryListEq(condition.getCategoryId(), likedCategoryIds))
                        interested.isNotNull().and(interested.member.id.eq(userId)),
                        interested.member.id.eq(userId))
                //interested.product.category.categoryId.in(likedCategoryIds))
                .orderBy(product.id.desc());

        log.debug("offset = {}", pageable.getPageNumber() * PAGE_SIZE);
        log.debug("pageable.getPageNumber() = {}", pageable.getPageNumber());
        List<Product> products = query.offset(pageable.getPageNumber() * PAGE_SIZE)
                .limit(PAGE_SIZE)
                .fetch();

        log.debug("qurelydsl 종료 =================");
        int nextPageIndex = pageable.getPageNumber() * PAGE_SIZE;
        return new SliceImpl<>(products, pageable, hasNext(products, PAGE_SIZE + nextPageIndex));
    }

    @Override
    public Slice<Product> findAllByStatus(ProductSalesSearchCondition condition, Pageable pageable, long userId) {
        log.debug("querydsl 실행 ========================");
        JPAQuery<Product> query = jpaQueryFactory.selectFrom(product)
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member, member).fetchJoin()
                .where(
                        isOnSales(condition),
                        product.member.id.eq(userId)
                )
                .orderBy(product.id.desc());

        log.debug("status = {}} ", Status.getStatusByValue(1).toString());
        log.debug("status = {}} ", Status.getStatusByValue(0).toString());
        log.debug("getStatus = {}} ", condition.getStatus());

        log.debug("offset = {}", pageable.getPageNumber() * PAGE_SIZE);
        log.debug("pageable.getPageNumber() = {}", pageable.getPageNumber());
        List<Product> products = query.offset(pageable.getPageNumber() * PAGE_SIZE)
                .limit(PAGE_SIZE)
                .fetch();

        log.debug("qurelydsl 종료 =================");
        int nextPageIndex = pageable.getPageNumber() * PAGE_SIZE;
        return new SliceImpl<>(products, pageable, hasNext(products, PAGE_SIZE + nextPageIndex));
    }

    private static BooleanExpression isOnSales(ProductSalesSearchCondition condition) {
        if (condition.getStatus() == null) {
            return null;
        }
        if (condition.getStatus() == 0) {
            return product.status.in(Status.SELLING, Status.RESERVING);
        }
        return product.status.eq(Status.SOLD);
    }

    private BooleanExpression isStatusEq(Integer status) {
        if (status == null) {
            return null;  // status가 null 또는 비어있는 경우 조건을 적용하지 않음
        }

        return product.status.in(Status.getStatusByValue(status));
    }


    private boolean hasNext(List<Product> fetch, int pageSize) {
        return fetch.size() > pageSize;
    }

    private BooleanExpression locationEq(Long locationId) {
        if (locationId == null) {
            return null;
        }
        return product.towns.townId.eq(locationId);
    }

    private BooleanExpression categoryListEq(Long categoryId, List<Long> interesteds) {
        if (categoryId == null) {
            return null;
        }
        return product.category.categoryId.in(interesteds);
    }


    private BooleanExpression categoryEq(Long categoryId) {
        if (categoryId == null) {
            return null;
        }
        return product.category.categoryId.eq(categoryId);
    }
}
