package com.secondhand.service.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.secondhand.web.dto.requset.ProductSearchCondition;
import com.secondhand.web.dto.response.ProductPagingResponse;
import com.secondhand.web.dto.response.QProductPagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.secondhand.domain.categorie.QCategory.category;
import static com.secondhand.domain.interested.QInterested.interested;
import static com.secondhand.domain.member.QMember.member;
import static com.secondhand.domain.product.QProduct.product;
import static com.secondhand.domain.product.QProductImage.productImage;
import static com.secondhand.domain.town.QTown.town;

@Repository
@RequiredArgsConstructor
public class ProductQueryRepository implements ProductCustomRepository {

    private final JPAQueryFactory queryFactory;

    public Page<ProductPagingResponse> searchPage(ProductSearchCondition condition, Pageable pageable, long userId) {
        QueryResults<ProductPagingResponse> result = queryFactory
                .select(new QProductPagingResponse(
                        product.member.id.eq(userId),
                        product.member,
                        product.status,
                        product.title,
                        product.content,
                        product.createdAt,
                        product.category,
                        product.price,
                        //TODO : 사진이랑, 카운트 나와야함
                        null,
                        interested.isLiked,
                        null))
                .from(product)
                .leftJoin(product.towns, town).fetchJoin()
                .leftJoin(product.category, category).fetchJoin()
                .leftJoin(product.member, member).fetchJoin()
                .leftJoin(interested.member, member).fetchJoin()
                .where(product.deleted.eq(false),
                        locationEq(condition.getTownId()),
                        categoryEq(condition.getCategoryId()),
                        isLikedEq(condition.isLiked(), userId),
                        isValidImg())
                .orderBy(product.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetchResults();

        List<ProductPagingResponse> content = result.getResults();
        long total = result.getTotal();

        return new PageImpl<>(content, pageable, total);
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
