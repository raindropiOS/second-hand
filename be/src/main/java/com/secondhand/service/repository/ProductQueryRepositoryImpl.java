package com.secondhand.service.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.secondhand.domain.product.Product;
import com.secondhand.web.dto.requset.ProductSearchCondition;
import com.secondhand.web.dto.response.ProductPagingResponse;
import com.secondhand.web.dto.response.QProductPagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.secondhand.domain.categorie.QCategory.category;
import static com.secondhand.domain.interested.QInterested.interested;
import static com.secondhand.domain.member.QMember.member;
import static com.secondhand.domain.product.QProduct.product;
import static com.secondhand.domain.town.QTown.town;


@Repository
@RequiredArgsConstructor
public class ProductQueryRepositoryImpl implements ProductCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public Slice<Product> findAllByTowns(ProductSearchCondition condition, Pageable pageable, long userId) {
        return null;
    }

    public Slice<Product> findAll(ProductSearchCondition condition, Pageable pageable, long userId) {
//        List<Product> res = jpaQueryFactory
//                .select(new QProductPagingResponse(
//                        product.member.id.eq(userId),
//                        product.member,
//                        product.status,
//                        product.title,
//                        product.content,
//                        product.createdAt,
//                        product.category,
//                        product.price,
//                        //TODO : 사진이랑, 카운트 나와야함
//                        null,
//                        interested.isLiked,
//                        null))
//                .from(product)
//                .leftJoin(product.towns, town).fetchJoin()
//                .leftJoin(product.category, category).fetchJoin()
//                .leftJoin(product.member, member).fetchJoin()
//                .leftJoin(interested.member, member).fetchJoin()
//                .where(product.deleted.eq(false),
//                        locationEq(condition.getTownId()),
//                        categoryEq(condition.getCategoryId()),
//                        isLikedEq(condition.isLiked(), userId),
//                        isValidImg())
//                .orderBy(product.createdAt.desc())
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize() + 1)
//                .fetch();


        int pageSize = pageable.getPageSize();

        List<Product> fetch = jpaQueryFactory.selectFrom(product)
                .innerJoin(product.towns)
                .where(
                        locationEq(condition.getTownId()),
                        categoryEq(condition.getCategoryId())
                )
                .offset(pageable.getOffset())
                .limit(pageSize + 1)
                .orderBy(product.id.desc())
                .fetchJoin()
                .fetch();
        return new SliceImpl<>(getContents(fetch, pageSize), pageable, hasNext(fetch, pageSize));
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

//    private BooleanExpression isValidImg() {
//        return product.id.eq(productImage.product.id);
//    }

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
