create database instagram;

create table users(
    user_id serial primary key,
    username varchar(30) unique not null,
    password varchar(12) not null,
    link text check (link ~ '^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?'),
    deleted boolean default false,
    visibility boolean default true
);

create table posts(
    post_id serial primary key,
    photo text not null,
    title text not null,
    likes int default 0 check (likes >= 0),
    date date default current_date,
    user_id int references users(user_id) not null
);

drop table comments;
create table comments(
    comment_id serial primary key,
    title text not null,
    created_time timestamp default current_timestamp,
    user_id int references users(user_id) on delete cascade,
    post_id int references posts(post_id),
    to_whose_user_post int not null
);

insert into users (username, password, link) values ('said', '12345678', 'https://i.ytimg.com/vi/byjGtCn9f08/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCG_30H3m2Rk5ViJtYS_NwasoFnnA');
insert into users (username, password) values ('bobir', '12345678');
insert into users (username, password) values ('hasan', '12345678');

insert into comments (title, user_id, post_id) values ('zor post', 1, 4);
insert into comments (title, user_id, post_id) values ('comment', 1, 4);
insert into comments (title, user_id, post_id) values ('supper', 1, 4);
insert into comments (title, user_id, post_id, to_whose_user_post) values ('supper', 1, 4, (select user_id from posts where post_id = 4));