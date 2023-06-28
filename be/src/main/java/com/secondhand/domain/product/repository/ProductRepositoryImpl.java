package com.secondhand.domain.product.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.Status;
import com.secondhand.web.dto.requset.ProductCategorySearchCondition;
import com.secondhand.web.dto.requset.ProductSearchCondition;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    @Override
    public Slice<Product> findAllByTowns(ProductSearchCondition condition, Pageable pageable, long userId) {

        log.debug("querydsl 실행 ========================");
        JPAQuery<Product> query = jpaQueryFactory.selectFrom(product)
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member, member).fetchJoin()
                .where(locationEq(condition.getTownId()),
                        categoryEq(condition.getCategoryId()),
                        isStatusEq(condition.getStatus())
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
        int pageSize = 10; // 페이지 크기를 10으로 고정

        log.debug("querydsl 실행 ========================");
        JPAQuery<Product> query = jpaQueryFactory.selectFrom(product)
                .leftJoin(product.interesteds, interested).fetchJoin()
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member, member).fetchJoin()
                .where(
                        categoryEq(condition.getCategoryId()),
                        interested.member.id.eq(userId)
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

    private BooleanExpression isStatusEq(String status) {
        if (status == null || status.isEmpty()) {
            return null;  // status가 null 또는 비어있는 경우 조건을 적용하지 않음
        }
        return product.status.in(Status.valueOf(status));
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

    private BooleanExpression categoryEq(Long categoryId) {
        if (categoryId == null) {
            return null;
        }
        return product.category.categoryId.eq(categoryId);
    }
}
