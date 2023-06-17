create table category
(
    category_id bigint auto_increment primary key,
    name        varchar(45)  not null,
    img_url     varchar(200) not null
);

create table town
(
    town_id  bigint auto_increment
        primary key,
    city     varchar(45) not null,
    county   varchar(45) not null,
    district varchar(45) not null
);

create table member
(
    member_id    bigint auto_increment
        primary key,
    memberId     varchar(45)  not null,
    memberToken  varchar(200) not null,
    img_url      varchar(200) null,
    main_town_id bigint       not null,
    sub_town_id  bigint null,
    constraint fk_member_town1
        foreign key (main_town_id) references town (id),
    constraint fk_member_town2
        foreign key (sub_town_id) references town (id)
);

create table product
(
    product_id    bigint auto_increment
        primary key,
    title         varchar(45)  not null,
    content       text         not null,
    price         int null,
    status        tinyint      not null,
    created_at    datetime     not null,
    count_view    smallint null,
    count_like    smallint null,
    thumbnail_url varchar(200) not null,
    town_id       bigint       not null,
    category_id   bigint       not null,
    member_id     bigint       not null,
    constraint fk_product_category1
        foreign key (category_id) references category (id),
    constraint fk_product_member1
        foreign key (member_id) references member (id),
    constraint fk_product_town1
        foreign key (town_id) references town (id)
);

create table chat_room
(
    chat_room_id bigint auto_increment
        primary key,
    title        varchar(45) null,
    created_at   datetime not null,
    contents     text null,
    product_id   bigint   not null,
    seller_id    bigint   not null,
    customer_id  bigint   not null,
    constraint fk_chat_room_member1
        foreign key (seller_id) references member (id),
    constraint fk_chat_room_member2
        foreign key (customer_id) references member (id),
    constraint fk_chat_room_product1
        foreign key (product_id) references product (id)
);

create table interested
(
    interested_id bigint auto_increment primary key,
    product_id    bigint not null,
    member_id     bigint not null,
    constraint fk_interested_member1
        foreign key (member_id) references member (id),
    constraint fk_interested_product1
        foreign key (product_id) references product (id)
);

create table product_img
(
    product_img_id bigint auto_increment primary key,
    img_url        varchar(200) not null,
    product_id     bigint       not null,
    constraint fk_product_img_product
        foreign key (product_id) references product (id)
);

