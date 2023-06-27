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
import static com.secondhand.domain.product.QProductImage.productImage;
import static com.secondhand.domain.town.QTown.town;


@Slf4j
@Repository
@RequiredArgsConstructor
public class ProductQueryRepositoryImpl implements ProductCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<Product> findAllByTowns(ProductSearchCondition condition, Pageable pageable) {

        log.debug("qurelydsl 실행 ={}", condition);
        int pageSize = pageable.getPageSize();
        List<Product> fetch = jpaQueryFactory.selectFrom(product)
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member, member).fetchJoin()
                .leftJoin(interested.member, member).fetchJoin()
                .where(product.deleted.eq(false),
                        locationEq(condition.getTownId()),
                        categoryEq(condition.getCategoryId()),
                        isLikedEq(condition.isLiked(), 1),
                        isStatusEq(condition.getStatus()),
                        isValidImg())
                .offset(pageable.getOffset())
                .orderBy(product.createdAt.desc())
                .limit(pageSize + 1)
                .fetch();

        return new SliceImpl<>(getContents(fetch, pageSize), pageable, hasNext(fetch, pageSize));
    }

    private BooleanExpression isStatusEq(Status status) {
        if (status == null) {
            return null;
        }
        return product.status.in(status);
    }

    private List<Product> getContents(List<Product> fetch, int pageSize) {
        return fetch.subList(0, Math.min(fetch.size(), pageSize));
    }

    private boolean hasNext(List<Product> fetch, int pageSize) {
        return fetch.size() > pageSize;
    }

    private BooleanExpression isLikedEq(boolean liked, long userId) {
        if (liked) {
            return interested.member.id.eq(userId);
        } else {
            return null;
        }
    }

    private BooleanExpression isValidImg() {
        return product.id.eq(productImage.product.id);
    }

    private BooleanExpression locationEq(Long locationId) {
        if (locationId == null) {
            return null;
        }
        return product.towns.id.eq(locationId);
    }

    private BooleanExpression categoryEq(Long categoryId) {
        if (categoryId == null) {
            return null;
        }
        return product.category.id.eq(categoryId);
    }
}
