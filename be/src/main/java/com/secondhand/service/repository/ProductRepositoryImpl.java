package com.secondhand.service.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.Status;
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

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<Product> findAllByTowns(ProductSearchCondition condition, Pageable pageable, long userId) {

        log.debug("qurelydsl 실행 ========================");
        List<Product> products = jpaQueryFactory.selectFrom(product)
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member, member).fetchJoin()
                .where(locationEq(condition.getTownId()),
                        categoryEq(condition.getCategoryId()),
                        isStatusEq(condition.getStatus())
                )
                .offset(pageable.getOffset())
                .orderBy(product.createdAt.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();
        log.debug("condition.getStatus() = {}", condition.getStatus());
        log.debug("qurelydsl 종료 =================");

        return new SliceImpl<>(products, pageable, hasNext(products, pageable.getPageSize()));
    }

    private BooleanExpression isStatusEq(String status) {
        if (status == null || status.isEmpty()) {
            return null;  // status가 null 또는 비어있는 경우 조건을 적용하지 않음
        }
        return product.status.in(Status.valueOf(status));
    }

    private List<Product> getContents(List<Product> fetch, int pageSize) {
        return fetch.subList(0, Math.min(fetch.size(), pageSize));
    }

    private boolean hasNext(List<Product> fetch, int pageSize) {
        return fetch.size() > pageSize;
    }

//    private BooleanExpression isLikedEq(boolean liked) {
//        if (categoryId == null) {
//            return null;
//        }
//        return product.interesteds.id.eq(categoryId);
//    }


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
