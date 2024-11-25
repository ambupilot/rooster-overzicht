-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Gegenereerd op: 25 nov 2024 om 15:57
-- Serverversie: 8.0.35
-- PHP-versie: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Kerssing_roosters`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `RoosterCarolas`
--

CREATE TABLE `RoosterCarolas` (
  `id` int NOT NULL,
  `dagVanDeWeek` int NOT NULL,
  `startKalenderWeek` int NOT NULL,
  `roosterWeek` int NOT NULL,
  `dienst` varchar(255) DEFAULT NULL,
  `opmerkingen` varchar(12) DEFAULT NULL,
  `locoflex` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `RoosterCarolas`
--

INSERT INTO `RoosterCarolas` (`id`, `dagVanDeWeek`, `startKalenderWeek`, `roosterWeek`, `dienst`, `opmerkingen`, `locoflex`) VALUES
(1, 1, 51, 3, 'RES', 'na 17', 'tot 17'),
(2, 2, 51, 3, '--', '', 'hele dag'),
(3, 3, 51, 3, '--', '', 'hele dag'),
(4, 4, 51, 3, 'RES', '', 'tot 17'),
(5, 5, 51, 3, 'RES', '', 'tot 17'),
(6, 6, 51, 3, 'R', '', '--'),
(7, 7, 51, 3, 'R', '', '--'),
(8, 1, 52, 4, '--', '1-52-4', NULL),
(9, 2, 52, 4, 'RES', 'sdsd', NULL),
(10, 3, 52, 4, 'R ', 'Martijn', NULL),
(11, 4, 52, 4, 'R', '', NULL),
(12, 5, 52, 4, 'RES', '', NULL),
(13, 6, 52, 4, 'RES', '', NULL),
(14, 7, 52, 4, 'RES', '', NULL),
(15, 1, 1, 5, '--', '1-1-5', NULL),
(16, 2, 1, 5, 'RES', '', NULL),
(17, 3, 1, 5, 'RES', '', NULL),
(18, 4, 1, 5, 'RES', '', NULL),
(19, 5, 1, 5, '--', '', NULL),
(20, 6, 1, 5, 'R ', '', NULL),
(21, 7, 1, 5, 'R ', '', NULL),
(22, 1, 2, 6, 'R', '1-2-6', NULL),
(23, 2, 2, 6, '--', '', NULL),
(24, 3, 2, 6, 'RES', '', NULL),
(25, 4, 2, 6, 'RES', '', NULL),
(26, 5, 2, 6, 'R', '', NULL),
(27, 6, 2, 6, 'RES', '', NULL),
(28, 7, 2, 6, 'RES', '', NULL),
(29, 1, 3, 7, 'RES', '1-3-7', NULL),
(30, 2, 3, 7, '--', '', NULL),
(31, 3, 3, 7, '--', '', NULL),
(32, 4, 3, 7, 'RES', '', NULL),
(33, 5, 3, 7, 'CO', '', NULL),
(34, 6, 3, 7, 'R', '', NULL),
(35, 7, 3, 7, 'R', '', NULL),
(36, 1, 4, 8, 'RES', '1-4-8', NULL),
(37, 2, 4, 8, 'RES', '', NULL),
(38, 3, 4, 8, 'R', '', NULL),
(39, 4, 4, 8, '--', '', NULL),
(40, 5, 4, 8, 'RES', '', NULL),
(41, 6, 4, 8, 'RES', '', NULL),
(42, 7, 4, 8, 'R', '', NULL),
(43, 1, 5, 9, '--', '1-5-9', NULL),
(44, 2, 5, 9, '--', '', NULL),
(45, 3, 5, 9, 'RES', '', NULL),
(46, 4, 5, 9, 'RES', '', NULL),
(47, 5, 5, 9, 'RES', '', NULL),
(48, 6, 5, 9, 'R', '', NULL),
(49, 7, 5, 9, 'R', '', NULL),
(50, 1, 6, 10, 'RES', '1-6-10', NULL),
(51, 2, 6, 10, 'R', '', NULL),
(52, 3, 6, 10, 'R', '', NULL),
(53, 4, 6, 10, '--', '', NULL),
(54, 5, 6, 10, 'RES', '', NULL),
(55, 6, 6, 10, 'RES', '', NULL),
(56, 7, 6, 10, 'RES', '', NULL),
(57, 1, 7, 11, '--', '1-7-11', NULL),
(58, 2, 7, 11, '--', '', NULL),
(59, 3, 7, 11, 'RES', '', NULL),
(60, 4, 7, 11, 'RES', '', NULL),
(61, 5, 7, 11, 'RES', '', NULL),
(62, 6, 7, 11, 'R', '', NULL),
(63, 7, 7, 11, 'R', '', NULL),
(64, 1, 8, 12, 'RES', '1-8-12', NULL),
(65, 2, 8, 12, 'R', '', NULL),
(66, 3, 8, 12, 'R', '', NULL),
(67, 4, 8, 12, '--', '', NULL),
(68, 5, 8, 12, 'RES', '', NULL),
(69, 6, 8, 12, 'RES', '', NULL),
(70, 7, 8, 12, 'RES', '', NULL),
(71, 1, 9, 1, '--', '1-9-1', NULL),
(72, 2, 9, 1, '--', '', NULL),
(73, 3, 9, 1, 'CO', '', NULL),
(74, 4, 9, 1, 'RES', '', NULL),
(75, 5, 9, 1, 'RES', '', NULL),
(76, 6, 9, 1, 'R', '', NULL),
(77, 7, 9, 1, 'R', '', NULL),
(78, 1, 10, 2, 'RES', '1-10-2', NULL),
(79, 2, 10, 2, 'R', '', NULL),
(80, 3, 10, 2, '--', '', NULL),
(81, 4, 10, 2, 'RES', '', NULL),
(82, 5, 10, 2, 'R', '', NULL),
(83, 6, 10, 2, 'RES', '', NULL),
(84, 7, 10, 2, 'RES', '', NULL);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `RoosterCarolas`
--
ALTER TABLE `RoosterCarolas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_week_day` (`dagVanDeWeek`,`startKalenderWeek`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `RoosterCarolas`
--
ALTER TABLE `RoosterCarolas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=477;
