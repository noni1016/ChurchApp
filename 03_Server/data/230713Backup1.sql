-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 23-07-13 20:05
-- 서버 버전: 10.3.27-MariaDB-0+deb10u1
-- PHP 버전: 7.3.27-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `churmmunity`
--
CREATE DATABASE IF NOT EXISTS `churmmunity` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `churmmunity`;

-- --------------------------------------------------------

--
-- 테이블 구조 `Club`
--

CREATE TABLE `Club` (
  `id` int(12) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mainImg` varchar(100) NOT NULL,
  `location` varchar(20) NOT NULL,
  `location_ll` point DEFAULT NULL,
  `description` text NOT NULL,
  `keyword` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `Club`
--

INSERT INTO `Club` (`id`, `name`, `mainImg`, `location`, `location_ll`, `description`, `keyword`) VALUES
(1, '글쓰기로 마음을 나눕니다, 쓸모', 'WinLockImages/f7c29ab1fb12da03847e5d667b8623ab2eaaa11b3cd2133fbe23b6829a42eea3.jpg', '서초구 서초4동 서초대로', NULL, '', NULL),
(2, '취미:힐링:함께하는 피아노 클래스', 'WinLockImages/1a57006fe3862e10ca743b7bcfb2f1233fa4312d3d8b2740dc20ec16f174f3d4.jpg', '경기 군포시 수리동', 0xe61000000101000000d99367d9f1ba5f40fcc43e0692ad4240, '피아노 연주회\n 매주 토요일 오후 5시', '안녕,'),
(3, '외국인친구와 언어교환모임', 'WinLockImages/8a527c9f54953d4ba096e41501165d038f08e1695b4ad89b38e4f18c04b2ffae.jpg', '용산구 이태원2동 회나무로 7', NULL, '', NULL),
(4, '킵러닝크루', 'WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg', '수원시 영통구 매탄4동 10', 0xe6100000010100000000000000000043400000000000c05f40, '달리기 합시다.\r\n같이 달려요.', NULL),
(7, '몸과 마음을 깨워주는 빈야사 요가', 'WinLockImages/2e9956ca9e16083528132a53ad63f6393b0115c651a130b1d873f45d0d040fae.jpg', '인천', NULL, '', NULL),
(8, '클럽미식생활', 'WinLockImages/64e4b9bdb3786bbd9a21b1e9bfd75f206f47e6da1bd091d71f72e6be098d93e2.jpg', '강서구', NULL, '', NULL),
(9, '고전을 통한 소통', 'WinLockImages/9e02f2ca3fd46bae0bdb74e07237864d37ec6191538af955cdf1adec6fa899a2.jpg', '관악구 신림동', NULL, '', NULL),
(10, '커피 관심있는 분들', 'WinLockImages/69c3aac6e5c6087ff6935df19ce9fbd30db79d74a7686a8015290057672e8331.jpg', '관악구', NULL, '', NULL),
(11, 'H.K VOLLEYBALL', 'WinLockImages/75b8d95c2cc75a084af61eb9a5dd76bbe1ac55e88c11a62c71a3f47758f8c888.jpg', '광명시', NULL, '', NULL),
(12, '돈 안드는 태린이 모임', 'WinLockImages/78c12561958a477676cf484cbe1de26354a20190936dc99ca2378d2d1d1b6705.jpg', '동작구 신대방동', NULL, '', NULL),
(37, '새로 만든 모임', 'GroupImg/1659157815604.jpg', '군포시 수리산로', NULL, '새로 만든 모임입니다.', NULL),
(46, '또 만든 모임', 'GroupImg/1659160844831.jpg', '군포시 수리산로', NULL, '또만들었어', NULL),
(53, 'Popo', 'GroupImg/1660392126683.jpg', '군포시 수리산로', 0xe6100000010100000000000000000000000000000000000000, 'popo', 'pom,'),
(55, 'Haha', 'GroupImg/1661056391840.jpg', '', 0xe6100000010100000000000000000000000000000000000000, 'hello\n', 'Hi,'),
(56, '캬캬캬\n', 'GroupImg/1661056392545.jpg', '', NULL, 'ㅋㅋㅋㅋ', 'ㅎㅎ,'),
(57, 'hi', 'GroupImg/1661056935684.jpg', '', 0xe6100000010100000000000000000000000000000000000000, 'hi', 'hihi,'),
(58, 'hello', 'GroupImg/1661058939522.jpg', '', 0xe6100000010100000000000000000000000000000000000000, 'hello', 'hi,ㅁㅁ'),
(59, 'ㅁㅁ', 'GroupImg/1662682661995.jpg', '', 0xe610000001010000007dd43607ea0e6040058f82e0fd974240, 'ㅁㅁ', 'ㅁㅁ,'),
(60, '지도를 만들테야', 'GroupImg/1662983047338.jpg', '', 0xe61000000101000000a041005f11bc5f40d2eac211caaf4240, '지도기능을 테스트 할테야', '지도,맵,ㅁㅁ'),
(61, '테스트야', 'GroupImg/1663493564860.jpg', '', 0xe61000000101000000cdbc5f8b88be5f408a59e5e483b24240, '테스테스트', 'ㅁㅁ,테스트,지도,'),
(62, '지역을 넣어줄테야', 'GroupImg/1663501003067.jpg', '경기 안양시 동안구 평촌동', 0xe61000000101000000cdbc5f8b88be5f408a59e5e483b24240, '히히히', '지역이나올거야,'),
(63, '매일 만나 식단 공유', 'GroupImg/1677286332035.jpg', '경기 군포시 산본로 299', 0xe61000000101000000d27b1744d3bb5f40c0d6542b67ad4240, '매일 먹는 음식 공유', '음식,만나,식단,');

-- --------------------------------------------------------

--
-- 테이블 구조 `ClubUser`
--

CREATE TABLE `ClubUser` (
  `id` int(11) NOT NULL,
  `clubId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `ClubUser`
--

INSERT INTO `ClubUser` (`id`, `clubId`, `userId`, `role`) VALUES
(2, 4, 5, 'user'),
(4, 2, 4, 'user'),
(5, 2, 5, 'user'),
(6, 8, 5, 'admin'),
(50, 9, 3, 'user'),
(51, 3, 6, 'user'),
(88, 4, 3, 'user'),
(110, 12, 46, 'user'),
(111, 2, 47, 'leader'),
(137, 53, 46, 'leader'),
(139, 8, 48, 'user'),
(142, 55, 46, 'leader'),
(144, 57, 46, 'leader'),
(145, 58, 46, 'leader'),
(146, 59, 47, 'leader'),
(148, 60, 47, 'user'),
(149, 61, 47, 'leader'),
(151, 12, 47, 'user'),
(152, 63, 47, 'leader');

-- --------------------------------------------------------

--
-- Stand-in structure for view `ClubView`
-- (See below for the actual view)
--
CREATE TABLE `ClubView` (
`id` int(12)
,`name` varchar(20)
,`mainImg` varchar(100)
,`location` varchar(20)
,`location_ll` point
,`description` text
,`keyword` varchar(500)
,`numMember` bigint(21)
);

-- --------------------------------------------------------

--
-- 테이블 구조 `Comment`
--

CREATE TABLE `Comment` (
  `id` int(11) NOT NULL,
  `clubId` int(11) NOT NULL,
  `feedId` int(11) NOT NULL,
  `authorId` int(11) NOT NULL,
  `text` varchar(200) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `Comment`
--

INSERT INTO `Comment` (`id`, `clubId`, `feedId`, `authorId`, `text`, `time`) VALUES
(30, 9, 29, 3, 'cc', '2022-03-01 14:56:44'),
(31, 9, 29, 3, 'rrrr', '2022-03-01 15:25:52'),
(32, 9, 29, 3, 'rrrrr', '2022-03-01 15:26:38');

-- --------------------------------------------------------

--
-- 테이블 구조 `Feed`
--

CREATE TABLE `Feed` (
  `id` int(11) NOT NULL,
  `clubId` int(11) NOT NULL,
  `authorId` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `time` datetime NOT NULL,
  `contentImg` varchar(200) DEFAULT NULL,
  `contentText` text DEFAULT NULL,
  `notice` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `Feed`
--

INSERT INTO `Feed` (`id`, `clubId`, `authorId`, `location`, `time`, `contentImg`, `contentText`, `notice`) VALUES
(14, 2, 3, 'asdftdjf', '2021-12-19 05:53:26', '/FeedImg/FeedId14.jpg', 'ffff\n', 1),
(19, 2, 3, 'test', '2021-12-19 06:27:59', '/FeedImg/', 'test', 0),
(20, 2, 3, 'qqqqqqqqqqqqq', '2021-12-19 09:50:39', '/FeedImg/FeedId20.jpg', 'sdfasdfasdfasdfsdfasdfasdfasdfasdfasdfsadf\nasdfasdfasdf', 0),
(21, 2, 3, '11111', '2021-12-19 09:54:22', '/FeedImg/FeedId20.jpg', 'asdaaa111', 0),
(22, 2, 3, '3434343', '2021-12-19 09:55:29', '/FeedImg/FeedId20.jpg', 'ffffff', 0),
(28, 2, 3, '222', '2022-02-02 15:31:30', '/FeedImg/FeedId28.jpg', '111', 0),
(29, 9, 3, 'bbaa', '2022-02-28 10:55:53', '/FeedImg/FeedId29.jpg', 'aaaa\nbbbb', 0),
(37, 12, 46, 'uiwang', '2022-07-23 10:20:54', '/FeedImg/FeedId30.jpg', 'bbangsil\n', 0),
(41, 2, 47, '집', '2022-10-01 19:12:02', NULL, '공지사항4', 0),
(42, 2, 47, '집', '2022-10-01 19:13:24', NULL, '공지사항5', 1),
(43, 59, 47, '집', '2022-10-01 19:25:11', '/FeedImg/FeedId43.jpg', '공지사항', 1),
(44, 2, 47, '집', '2022-10-01 20:22:22', NULL, '공지사항7', 1),
(49, 2, 47, '집', '2022-10-01 20:36:10', NULL, '공지사항8', 0),
(50, 2, 47, '집', '2022-10-01 20:37:15', NULL, '그냥글1', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `recGroups`
--

CREATE TABLE `recGroups` (
  `id` int(12) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mainImg` varchar(100) NOT NULL,
  `location` varchar(20) NOT NULL,
  `numMember` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `recGroups`
--

INSERT INTO `recGroups` (`id`, `name`, `mainImg`, `location`, `numMember`) VALUES
(1, '글쓰기로 마음을 나눕니다, 쓸모', 'WinLockImages/f7c29ab1fb12da03847e5d667b8623ab2eaaa11b3cd2133fbe23b6829a42eea3.jpg', '서초구 서초4동 서초대로', 4),
(2, '취미:힐링:함께하는 피아노 클래스', 'WinLockImages/1a57006fe3862e10ca743b7bcfb2f1233fa4312d3d8b2740dc20ec16f174f3d4.jpg', '신림역7번출구', 7),
(3, '외국인친구와 언어교환모임', 'WinLockImages/8a527c9f54953d4ba096e41501165d038f08e1695b4ad89b38e4f18c04b2ffae.jpg', '용산구 이태원2동 회나무로 7', 67),
(4, '킵러닝크루', 'WinLockImages/a48b65589f2727feb93b12693ffeccb5d4aa1c0b6bbc1dff4d503ff28eba5a4c.jpg', '수원시 영통구 매탄4동 10', 10),
(7, '몸과 마음을 깨워주는 빈야사 요가', 'WinLockImages/2e9956ca9e16083528132a53ad63f6393b0115c651a130b1d873f45d0d040fae.jpg', '인천', 13),
(8, '클럽미식생활', 'WinLockImages/64e4b9bdb3786bbd9a21b1e9bfd75f206f47e6da1bd091d71f72e6be098d93e2.jpg', '강서구', 12),
(9, '고전을 통한 소통', 'WinLockImages/9e02f2ca3fd46bae0bdb74e07237864d37ec6191538af955cdf1adec6fa899a2.jpg', '관악구 신림동', 1),
(10, '커피 관심있는 분들', 'WinLockImages/69c3aac6e5c6087ff6935df19ce9fbd30db79d74a7686a8015290057672e8331.jpg', '관악구', 1),
(11, 'H.K VOLLEYBALL', 'WinLockImages/75b8d95c2cc75a084af61eb9a5dd76bbe1ac55e88c11a62c71a3f47758f8c888.jpg', '광명시', 4),
(12, '돈 안드는 태린이 모임', 'WinLockImages/78c12561958a477676cf484cbe1de26354a20190936dc99ca2378d2d1d1b6705.jpg', '동작구 신대방동', 4);

-- --------------------------------------------------------

--
-- 테이블 구조 `recLights`
--

CREATE TABLE `recLights` (
  `id` int(12) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mainImg` varchar(100) NOT NULL,
  `location` varchar(20) NOT NULL,
  `time` datetime NOT NULL,
  `numMember` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `recLights`
--

INSERT INTO `recLights` (`id`, `name`, `mainImg`, `location`, `time`, `numMember`) VALUES
(1, '산본 배드민턴 번개', 'badminton.png', '산본 중앙공원', '2021-05-16 17:00:00', 8),
(2, '막무가내 리코더 합주', 'ins.png', '올림픽공원 나홀로나무 앞', '2021-05-13 20:00:00', 3),
(3, '탁구 구력 인증 대잔치', 'WinLockImages/723aeb317ff6c5786d3ba4a2ecde2c57afb702dead38bb38dc01b360a4338ff7.jpg', '삼성역 삼성탁구장', '2021-05-15 07:00:00', 4),
(4, '베이킹 취미단 - 요양원 나눔활동', 'bakery.jpg', '강남역', '2021-05-15 16:00:00', 12),
(5, '아마추어오케스트라 합주', 'WinLockImages/ff1dd5342292b9fd018ceb48ee6b3f4704fdd266835ea8733e1f08e84f4e62e0.jpg', '루스초이뮤직', '2021-06-19 10:30:00', 1),
(6, '레트로 필름카메라 클래스', 'WinLockImages/7895adcb12cbeecf01a490118cb992f8d73cce92d37a8dbc2ad81fd4b939b5a0.jpg', '종로구 효자동 자하문로 66-1', '2021-06-06 17:38:45', 3),
(7, '온라인 독서모임', 'WinLockImages/a622c441510fe9b7043aa878aacdc9c3af111b75eb7721c1e31e709736fa8951.jpg', '온라인 이벤트', '2021-06-08 19:30:00', 4),
(8, '부의 당구장', 'WinLockImages/a85be52ac00a87fbad9798dd8f0f3babd4505e34fb4157db0bf7b32f9657f288.jpg', '성동구 성수2가3동', '2021-05-18 17:44:42', 5),
(9, '리필 (Re-feel)', 'WinLockImages/a05547ae0102f56908893ca90d1c8ee166f7a86a3de5e58302661bc159441bcc.jpg', '영등포구', '2021-05-20 17:48:13', 3),
(10, '날 알아가기 & 내면 가꾸기', 'WinLockImages/f42cf15f41cb58276f418cc994df1a13fee21ce9ee0478b54d2ac206f7ce8413.jpg', '마포구', '2021-06-06 17:48:13', 11);

-- --------------------------------------------------------

--
-- 테이블 구조 `Spot`
--

CREATE TABLE `Spot` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mainImg` varchar(100) NOT NULL,
  `location` varchar(20) NOT NULL,
  `location_ll` point DEFAULT NULL,
  `description` text NOT NULL,
  `keyword` varchar(500) DEFAULT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `Spot`
--

INSERT INTO `Spot` (`id`, `name`, `mainImg`, `location`, `location_ll`, `description`, `keyword`, `time`) VALUES
(1, '막무가내 리코더 합주', 'GroupImg/1659157815604.jpg', '올림픽공원 나홀로나무 앞', 0x00000000010100000094a14621c9bb5f40d290909268ad4240, '인적 드물고 경치 좋은 곳에서 리코더 뿝뿝 하실 분들~! \\n\r\n찬양 연주 같이 해요', '리코더, 합주, 악기, 연주', '2023-06-15 15:27:12'),
(2, 'Aaaaa', 'GroupImg/1687672745088.jpg', '경기 군포시 산본동', 0xe61000000101000000a041005f11bc5f40d2eac211caaf4240, 'aaaaaa', 'Aaa,', '2023-06-26 05:44:00'),
(3, 'ㅁㅁㅁ', 'GroupImg/1687672887816.jpg', '경기 의왕시', 0xe61000000101000000ad3eb732f8bd5f40fb7ce11821ac4240, 'ㅁㅁㅁ', 'ㅁㅁㅁ,', '2023-06-27 06:00:00'),
(4, 'ㅁㄴㅇㄹ', 'GroupImg/1687673220221.jpg', '경기 안양시 동안구 평촌동', 0xe61000000101000000cdbc5f8b88be5f408a59e5e483b24240, 'ㅁㄴㅇㄹ', 'ㅁㄴㅇㄹ,', '2023-06-26 06:06:00'),
(5, 'ㅎㅎㅎ', 'GroupImg/1687673332751.jpg', '전남 목포시 만호동', 0xe610000001010000008ae2fcc89f985f408d2e943480644140, 'ㅎㅎㅎㅎ', '', '2023-06-27 06:08:00'),
(6, 'ㅂㅂ', 'GroupImg/1687673881741.jpg', '경기 군포시 산본동', 0xe61000000101000000a041005f11bc5f40d2eac211caaf4240, 'ㅂㅂ', 'ㅂㅂ,', '2023-06-28 06:16:00'),
(7, 'ㅂㅂㅂ', 'GroupImg/1687673961472.jpg', '경북 봉화군', 0xe61000000101000000a2d431b66f176040cbf9354052724240, 'ㅂㅂ', '', '2023-06-28 06:18:00'),
(8, '놀자놀자', 'GroupImg/1688278133059.jpg', '경기 군포시 산본동 1231', 0xe610000001010000001a13f407b7bb5f402abaa293d3ad4240, '자취생들 모여라', '자취,러닝,', '2023-07-07 20:50:00');

-- --------------------------------------------------------

--
-- 테이블 구조 `SpotUser`
--

CREATE TABLE `SpotUser` (
  `id` int(11) NOT NULL,
  `spotId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `SpotUser`
--

INSERT INTO `SpotUser` (`id`, `spotId`, `userId`, `role`) VALUES
(10, 1, 51, 'user'),
(37, 2, 47, 'leader'),
(38, 3, 47, 'leader'),
(39, 4, 47, 'leader'),
(40, 5, 47, 'leader'),
(41, 6, 47, 'leader'),
(42, 7, 47, 'leader'),
(46, 8, 47, 'user'),
(47, 1, 50, 'user'),
(48, 1, 46, 'user'),
(52, 1, 47, 'leader');

-- --------------------------------------------------------

--
-- 테이블 구조 `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `photo` varchar(500) NOT NULL,
  `church` varchar(20) NOT NULL,
  `age` int(3) NOT NULL,
  `level` int(3) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `id_kakao` bigint(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `location_ll` point DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `User`
--

INSERT INTO `User` (`id`, `name`, `photo`, `church`, `age`, `level`, `role`, `id_kakao`, `description`, `location`, `location_ll`) VALUES
(3, '노니', 'http://121.139.124.10:7009/Profile/노니.jpg', '유목민교회', 29, 100, '1', NULL, NULL, NULL, NULL),
(4, '짱쎄', 'http://121.139.124.10:7009/Profile/짱쎄.jpg', '새중앙교회', 30, 1, '0', 4, NULL, NULL, NULL),
(5, '프로베이커', 'http://121.139.124.10:7009/Profile/프로베이커.jpg', '수원성교회', 27, 1, '0', NULL, NULL, NULL, NULL),
(6, 'Song', 'http://121.139.124.10:7009/Profile/Song.jpg', '행복교회', 28, 1, '0', NULL, NULL, NULL, NULL),
(46, '김보미', 'https://k.kakaocdn.net/dn/bKjFED/btrEoXwdCNJ/aQBuEzHdFAr8CuNsobEARk/img_640x640.jpg', 'saejoongang', 10, 99, '0', 2290668861, NULL, NULL, NULL),
(47, '경은', 'http://121.139.124.10:7009/Profile/UserImg47.jpg', 'Manna', 10, 99, '0', 1917200509, '노니입니다.', NULL, NULL),
(48, '장성환', 'http://121.139.124.10:7009/Profile/UserImg48.jpg', '', 10, 99, '0', 2343971055, NULL, NULL, NULL),
(50, '장세민', 'http://121.139.124.10:7009/Profile/UserImg50.jpg', '교회교회', 10, 99, '0', 1919909852, NULL, NULL, NULL),
(51, '성호', 'https://k.kakaocdn.net/dn/dl2zBQ/btrwaqHpeOS/kM1cIP9tnUQgzMnxMHxLg1/img_640x640.jpg', '', 10, 99, '0', 2818831552, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 뷰 구조 `ClubView`
--
DROP TABLE IF EXISTS `ClubView`;

CREATE ALGORITHM=MERGE DEFINER=`sjaCoders`@`%` SQL SECURITY DEFINER VIEW `ClubView`  AS SELECT `Club`.`id` AS `id`, `Club`.`name` AS `name`, `Club`.`mainImg` AS `mainImg`, `Club`.`location` AS `location`, `Club`.`location_ll` AS `location_ll`, `Club`.`description` AS `description`, `Club`.`keyword` AS `keyword`, (select count(0) from `ClubUser` where `ClubUser`.`clubId` = `Club`.`id`) AS `numMember` FROM `Club` ;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `Club`
--
ALTER TABLE `Club`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `ClubUser`
--
ALTER TABLE `ClubUser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `GroupKey` (`clubId`),
  ADD KEY `UserKey` (`userId`);

--
-- 테이블의 인덱스 `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CommentUserKey` (`authorId`),
  ADD KEY `CommentFeedKey` (`feedId`),
  ADD KEY `CommentClubKey` (`clubId`);

--
-- 테이블의 인덱스 `Feed`
--
ALTER TABLE `Feed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FeedGroupKey` (`clubId`),
  ADD KEY `FeedUserKey` (`authorId`);

--
-- 테이블의 인덱스 `recGroups`
--
ALTER TABLE `recGroups`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `recLights`
--
ALTER TABLE `recLights`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `Spot`
--
ALTER TABLE `Spot`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `SpotUser`
--
ALTER TABLE `SpotUser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SpotKey` (`spotId`),
  ADD KEY `SpotUserKey` (`userId`);

--
-- 테이블의 인덱스 `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `Club`
--
ALTER TABLE `Club`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- 테이블의 AUTO_INCREMENT `ClubUser`
--
ALTER TABLE `ClubUser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- 테이블의 AUTO_INCREMENT `Comment`
--
ALTER TABLE `Comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- 테이블의 AUTO_INCREMENT `Feed`
--
ALTER TABLE `Feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- 테이블의 AUTO_INCREMENT `recGroups`
--
ALTER TABLE `recGroups`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 테이블의 AUTO_INCREMENT `recLights`
--
ALTER TABLE `recLights`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `Spot`
--
ALTER TABLE `Spot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 테이블의 AUTO_INCREMENT `SpotUser`
--
ALTER TABLE `SpotUser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- 테이블의 AUTO_INCREMENT `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `ClubUser`
--
ALTER TABLE `ClubUser`
  ADD CONSTRAINT `GroupKey` FOREIGN KEY (`clubId`) REFERENCES `Club` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserKey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `CommentClubKey` FOREIGN KEY (`clubId`) REFERENCES `Club` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CommentFeedKey` FOREIGN KEY (`feedId`) REFERENCES `Feed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CommentUserKey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `Feed`
--
ALTER TABLE `Feed`
  ADD CONSTRAINT `FeedGroupKey` FOREIGN KEY (`clubId`) REFERENCES `Club` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FeedUserKey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `SpotUser`
--
ALTER TABLE `SpotUser`
  ADD CONSTRAINT `SpotKey` FOREIGN KEY (`spotId`) REFERENCES `Spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SpotUserKey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- 데이터베이스: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(11) NOT NULL,
  `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `query` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_length` text COLLATE utf8_bin DEFAULT NULL,
  `col_collation` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) COLLATE utf8_bin DEFAULT '',
  `col_default` text COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `settings_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `export_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `template_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `template_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

--
-- 테이블의 덤프 데이터 `pma__export_templates`
--

INSERT INTO `pma__export_templates` (`id`, `username`, `export_type`, `template_name`, `template_data`) VALUES
(1, 'sjaCoders', 'table', 'Groups', '{\"quick_or_custom\":\"quick\",\"what\":\"sql\",\"allrows\":\"1\",\"aliases_new\":\"\",\"output_format\":\"sendit\",\"filename_template\":\"@TABLE@\",\"remember_template\":\"on\",\"charset\":\"utf-8\",\"compression\":\"none\",\"maxsize\":\"\",\"codegen_structure_or_data\":\"data\",\"codegen_format\":\"0\",\"csv_separator\":\",\",\"csv_enclosed\":\"\\\"\",\"csv_escaped\":\"\\\"\",\"csv_terminated\":\"AUTO\",\"csv_null\":\"NULL\",\"csv_structure_or_data\":\"data\",\"excel_null\":\"NULL\",\"excel_columns\":\"something\",\"excel_edition\":\"win\",\"excel_structure_or_data\":\"data\",\"json_structure_or_data\":\"data\",\"json_unicode\":\"something\",\"latex_caption\":\"something\",\"latex_structure_or_data\":\"structure_and_data\",\"latex_structure_caption\":\"@TABLE@ 테이블 구조\",\"latex_structure_continued_caption\":\"@TABLE@ 테이블 구조 (continued)\",\"latex_structure_label\":\"tab:@TABLE@-structure\",\"latex_relation\":\"something\",\"latex_comments\":\"something\",\"latex_mime\":\"something\",\"latex_columns\":\"something\",\"latex_data_caption\":\"Content of table @TABLE@\",\"latex_data_continued_caption\":\"Content of table @TABLE@ (continued)\",\"latex_data_label\":\"tab:@TABLE@-data\",\"latex_null\":\"\\\\textit{NULL}\",\"mediawiki_structure_or_data\":\"data\",\"mediawiki_caption\":\"something\",\"mediawiki_headers\":\"something\",\"htmlword_structure_or_data\":\"structure_and_data\",\"htmlword_null\":\"NULL\",\"ods_null\":\"NULL\",\"ods_structure_or_data\":\"data\",\"odt_structure_or_data\":\"structure_and_data\",\"odt_relation\":\"something\",\"odt_comments\":\"something\",\"odt_mime\":\"something\",\"odt_columns\":\"something\",\"odt_null\":\"NULL\",\"pdf_report_title\":\"\",\"pdf_structure_or_data\":\"data\",\"phparray_structure_or_data\":\"data\",\"sql_include_comments\":\"something\",\"sql_header_comment\":\"\",\"sql_use_transaction\":\"something\",\"sql_compatibility\":\"NONE\",\"sql_structure_or_data\":\"structure_and_data\",\"sql_create_table\":\"something\",\"sql_auto_increment\":\"something\",\"sql_create_view\":\"something\",\"sql_create_trigger\":\"something\",\"sql_backquotes\":\"something\",\"sql_type\":\"INSERT\",\"sql_insert_syntax\":\"both\",\"sql_max_query_size\":\"50000\",\"sql_hex_for_binary\":\"something\",\"sql_utc_time\":\"something\",\"texytext_structure_or_data\":\"structure_and_data\",\"texytext_null\":\"NULL\",\"xml_structure_or_data\":\"data\",\"xml_export_events\":\"something\",\"xml_export_functions\":\"something\",\"xml_export_procedures\":\"something\",\"xml_export_tables\":\"something\",\"xml_export_triggers\":\"something\",\"xml_export_views\":\"something\",\"xml_export_contents\":\"something\",\"yaml_structure_or_data\":\"data\",\"\":null,\"lock_tables\":null,\"csv_removeCRLF\":null,\"csv_columns\":null,\"excel_removeCRLF\":null,\"json_pretty_print\":null,\"htmlword_columns\":null,\"ods_columns\":null,\"sql_dates\":null,\"sql_relation\":null,\"sql_mime\":null,\"sql_disable_fk\":null,\"sql_views_as_tables\":null,\"sql_metadata\":null,\"sql_drop_table\":null,\"sql_if_not_exists\":null,\"sql_simple_view_export\":null,\"sql_view_current_user\":null,\"sql_or_replace_view\":null,\"sql_procedure_function\":null,\"sql_truncate\":null,\"sql_delayed\":null,\"sql_ignore\":null,\"texytext_columns\":null}');

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- 테이블의 덤프 데이터 `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('phpmyadmin', '[{\"db\":\"www\",\"table\":\"board\"},{\"db\":\"www\",\"table\":\"test\"}]'),
('sjaCoders', '[{\"db\":\"churmmunity\",\"table\":\"User\"},{\"db\":\"churmmunity\",\"table\":\"SpotUser\"},{\"db\":\"churmmunity\",\"table\":\"Spot\"},{\"db\":\"churmmunity\",\"table\":\"ClubUser\"},{\"db\":\"churmmunity\",\"table\":\"ClubView\"},{\"db\":\"churmmunity\",\"table\":\"Club\"},{\"db\":\"churmmunity\",\"table\":\"Comment\"},{\"db\":\"mysql\",\"table\":\"user\"},{\"db\":\"churmmunity\",\"table\":\"Feed\"},{\"db\":\"churmmunity\",\"table\":\"recLights\"}]');

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

--
-- 테이블의 덤프 데이터 `pma__relation`
--

INSERT INTO `pma__relation` (`master_db`, `master_table`, `master_field`, `foreign_db`, `foreign_table`, `foreign_field`) VALUES
('churmmunity', 'SpotUser', 'spotId', 'churmmunity', 'Spot', 'id'),
('churmmunity', 'SpotUser', 'userId', 'churmmunity', 'User', 'id');

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

--
-- 테이블의 덤프 데이터 `pma__table_info`
--

INSERT INTO `pma__table_info` (`db_name`, `table_name`, `display_field`) VALUES
('churmmunity', 'Comment', 'text'),
('churmmunity', 'Feed', 'authorId'),
('churmmunity', 'SpotUser', 'role');

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `prefs` text COLLATE utf8_bin NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- 테이블의 덤프 데이터 `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('sjaCoders', 'churmmunity', 'Club', '{\"CREATE_TIME\":\"2022-07-30 07:36:16\",\"col_order\":[0,1,2,3,4,5,6],\"col_visib\":[1,1,1,1,1,1,1],\"sorted_col\":\"`Club`.`location_ll`  DESC\"}', '2023-04-01 00:23:17'),
('sjaCoders', 'churmmunity', 'ClubUser', '[]', '2022-02-05 05:52:32'),
('sjaCoders', 'churmmunity', 'User', '{\"CREATE_TIME\":\"2022-10-23 21:01:40\"}', '2023-05-29 01:28:07'),
('sjaCoders', 'churmmunity', 'recLights', '[]', '2021-06-06 09:02:12');

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text COLLATE utf8_bin NOT NULL,
  `schema_sql` text COLLATE utf8_bin DEFAULT NULL,
  `data_sql` longtext COLLATE utf8_bin DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- 테이블의 덤프 데이터 `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('phpmyadmin', '2021-03-24 12:54:21', '{\"collation_connection\":\"utf8mb4_unicode_ci\",\"lang\":\"ko\"}'),
('sjaCoders', '2023-07-13 11:03:44', '{\"collation_connection\":\"utf8mb4_unicode_ci\",\"Console\\/Mode\":\"collapse\",\"lang\":\"ko\"}');

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL,
  `tab` varchar(64) COLLATE utf8_bin NOT NULL,
  `allowed` enum('Y','N') COLLATE utf8_bin NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- 테이블 구조 `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- 테이블의 인덱스 `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- 테이블의 인덱스 `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- 테이블의 인덱스 `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- 테이블의 인덱스 `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- 테이블의 인덱스 `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- 테이블의 인덱스 `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- 테이블의 인덱스 `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- 테이블의 인덱스 `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- 테이블의 인덱스 `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- 테이블의 인덱스 `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- 테이블의 인덱스 `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- 테이블의 인덱스 `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- 테이블의 인덱스 `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- 테이블의 인덱스 `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- 테이블의 인덱스 `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- 테이블의 인덱스 `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- 테이블의 인덱스 `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- 데이터베이스: `www`
--
CREATE DATABASE IF NOT EXISTS `www` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `www`;

-- --------------------------------------------------------

--
-- 테이블 구조 `board`
--

CREATE TABLE `board` (
  `num` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `writer` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `date` date NOT NULL,
  `view` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- 테이블의 덤프 데이터 `board`
--

INSERT INTO `board` (`num`, `title`, `writer`, `date`, `view`) VALUES
(1, '캠린이를 위한 동계 안전캠핑 5대 수칙 소문내기 이벤트', 'admin', '2021-01-08', 0),
(2, '일산화탄소 경보기 지원 이벤트 (11.5~11.18)(종료)', 'admin', '2020-11-05', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`num`);

--
-- 테이블의 인덱스 `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
