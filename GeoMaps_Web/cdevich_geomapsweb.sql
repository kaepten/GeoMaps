-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: mysql13j02.db.internal
-- Erstellungszeit: 19. Mai 2015 um 10:12
-- Server-Version: 5.5.37-log
-- PHP-Version: 5.4.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `cdevich_geomapsweb`
--
CREATE DATABASE IF NOT EXISTS `cdevich_geomapsweb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `cdevich_geomapsweb`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_configuration`
--

DROP TABLE IF EXISTS `uf_configuration`;
CREATE TABLE IF NOT EXISTS `uf_configuration` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_configuration`
--

INSERT INTO `uf_configuration` (`id`, `name`, `value`) VALUES
(1, 'website_name', 'GeoMapsWeb BETA'),
(2, 'website_url', 'geomapsweb.c-dev.ch/'),
(3, 'email', 'info@c-dev.ch'),
(4, 'activation', '1'),
(5, 'resend_activation_threshold', '0'),
(6, 'language', '../models/languages/de.php'),
(8, 'can_register', '1'),
(9, 'new_user_title', 'GeoMaps User'),
(11, 'email_login', '1'),
(12, 'token_timeout', '10800'),
(13, 'version', '0.2.2');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_filelist`
--

DROP TABLE IF EXISTS `uf_filelist`;
CREATE TABLE IF NOT EXISTS `uf_filelist` (
  `id` int(11) NOT NULL,
  `path` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `uf_filelist`
--

INSERT INTO `uf_filelist` (`id`, `path`) VALUES
(1, 'account'),
(3, 'content'),
(2, 'forms'),
(4, 'fragments');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_groups`
--

DROP TABLE IF EXISTS `uf_groups`;
CREATE TABLE IF NOT EXISTS `uf_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `can_delete` tinyint(1) NOT NULL,
  `home_page_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_groups`
--

INSERT INTO `uf_groups` (`id`, `name`, `is_default`, `can_delete`, `home_page_id`) VALUES
(1, 'User', 2, 0, 4),
(2, 'Administrator', 0, 0, 5),
(3, 'GeoMapsPlanner', 0, 1, 19);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_group_action_permits`
--

DROP TABLE IF EXISTS `uf_group_action_permits`;
CREATE TABLE IF NOT EXISTS `uf_group_action_permits` (
  `id` int(10) unsigned NOT NULL,
  `group_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `permits` varchar(400) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_group_action_permits`
--

INSERT INTO `uf_group_action_permits` (`id`, `group_id`, `action`, `permits`) VALUES
(1, 1, 'updateUserEmail', 'isLoggedInUser(user_id)'),
(2, 1, 'updateUserPassword', 'isLoggedInUser(user_id)'),
(3, 1, 'loadUser', 'isLoggedInUser(user_id)'),
(4, 1, 'loadUserGroups', 'isLoggedInUser(user_id)'),
(5, 2, 'updateUserEmail', 'always()'),
(6, 2, 'updateUserPassword', 'always()'),
(7, 2, 'updateUser', 'always()'),
(8, 2, 'updateUserDisplayName', 'always()'),
(9, 2, 'updateUserTitle', 'always()'),
(10, 2, 'updateUserEnabled', 'always()'),
(11, 2, 'loadUser', 'always()'),
(12, 2, 'loadUserGroups', 'always()'),
(13, 2, 'loadUsers', 'always()'),
(14, 2, 'deleteUser', 'always()'),
(15, 2, 'activateUser', 'always()'),
(16, 2, 'loadGroups', 'always()');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_group_page_matches`
--

DROP TABLE IF EXISTS `uf_group_page_matches`;
CREATE TABLE IF NOT EXISTS `uf_group_page_matches` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_group_page_matches`
--

INSERT INTO `uf_group_page_matches` (`id`, `group_id`, `page_id`) VALUES
(1, 1, 1),
(3, 2, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 2, 12),
(13, 2, 13),
(14, 2, 14),
(15, 2, 15),
(16, 2, 16),
(19, 1, 3),
(20, 1, 4),
(21, 1, 6),
(22, 1, 13),
(23, 1, 15),
(27, 3, 19),
(28, 3, 18);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_nav`
--

DROP TABLE IF EXISTS `uf_nav`;
CREATE TABLE IF NOT EXISTS `uf_nav` (
  `id` int(11) NOT NULL,
  `menu` varchar(75) NOT NULL,
  `page` varchar(175) NOT NULL,
  `name` varchar(150) NOT NULL,
  `position` int(11) NOT NULL,
  `class_name` varchar(150) NOT NULL,
  `icon` varchar(150) NOT NULL,
  `parent_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_nav`
--

INSERT INTO `uf_nav` (`id`, `menu`, `page`, `name`, `position`, `class_name`, `icon`, `parent_id`) VALUES
(1, 'left', 'account/dashboard_admin.php', 'Admin Dashboard', 1, 'dashboard-admin', 'fa fa-dashboard', 0),
(2, 'left', 'account/users.php', 'Users', 4, 'users', 'fa fa-users', 0),
(3, 'top-main', 'content/dashboard.php', 'Dashboard', 2, 'dashboard', 'fa fa-dashboard', 0),
(4, 'top-main', 'account/account_settings.php', 'Account Settings', 6, 'settings', 'fa fa-gear', 0),
(5, 'left-sub', '#', 'Site Settings', 5, '', 'fa fa-wrench', 0),
(6, 'left-sub', 'account/site_settings.php', 'Site Configuration', 6, 'site-settings', 'fa fa-globe', 5),
(7, 'left-sub', 'account/groups.php', 'Groups', 7, 'groups', 'fa fa-users', 5),
(8, 'left-sub', 'account/site_authorization.php', 'Authorization', 8, 'site-pages', 'fa fa-key', 5),
(9, 'top-main-sub', '#', '#USERNAME#', 3, 'site-settings', 'fa fa-user', 0),
(10, 'top-main-sub', 'account/account_settings.php', 'Account Settings', 1, '', 'fa fa-gear', 9),
(11, 'top-main-sub', 'account/logout.php', 'Log Out', 2, '', 'fa fa-power-off', 9),
(12, 'top-main', 'content/map.php', 'Karte', 0, 'settings', 'fa fa-compass', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_nav_group_matches`
--

DROP TABLE IF EXISTS `uf_nav_group_matches`;
CREATE TABLE IF NOT EXISTS `uf_nav_group_matches` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_nav_group_matches`
--

INSERT INTO `uf_nav_group_matches` (`id`, `menu_id`, `group_id`) VALUES
(1, 3, 1),
(2, 4, 2),
(3, 9, 1),
(4, 10, 1),
(5, 11, 1),
(6, 1, 2),
(7, 2, 2),
(8, 5, 2),
(9, 6, 2),
(10, 7, 2),
(11, 8, 2),
(12, 12, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_pages`
--

DROP TABLE IF EXISTS `uf_pages`;
CREATE TABLE IF NOT EXISTS `uf_pages` (
  `id` int(11) NOT NULL,
  `page` varchar(150) NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_pages`
--

INSERT INTO `uf_pages` (`id`, `page`, `private`) VALUES
(1, 'forms/table_users.php', 1),
(3, 'account/logout.php', 1),
(4, 'content/dashboard.php', 1),
(5, 'account/dashboard_admin.php', 1),
(6, 'account/account_settings.php', 1),
(7, 'account/site_authorization.php', 1),
(8, 'account/site_settings.php', 1),
(9, 'account/users.php', 1),
(10, 'account/user_details.php', 1),
(11, 'account/index.php', 0),
(12, 'account/groups.php', 1),
(13, 'forms/form_user.php', 1),
(14, 'forms/form_group.php', 1),
(15, 'forms/form_confirm_delete.php', 1),
(16, 'forms/form_action_permits.php', 1),
(17, 'account/404.php', 0),
(18, 'content/map.php', 1),
(19, 'fragments/GeoMapsPlanner.php', 1),
(20, 'account/dashboard.php', 0),
(21, 'fragments/index.php', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_plugin_configuration`
--

DROP TABLE IF EXISTS `uf_plugin_configuration`;
CREATE TABLE IF NOT EXISTS `uf_plugin_configuration` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL,
  `binary` int(1) NOT NULL,
  `variable` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_users`
--

DROP TABLE IF EXISTS `uf_users`;
CREATE TABLE IF NOT EXISTS `uf_users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `activation_token` varchar(225) NOT NULL,
  `last_activation_request` int(11) NOT NULL,
  `lost_password_request` tinyint(1) NOT NULL,
  `lost_password_timestamp` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `title` varchar(150) NOT NULL,
  `sign_up_stamp` int(11) NOT NULL,
  `last_sign_in_stamp` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Specifies if the account is enabled.  Disabled accounts cannot be logged in to, but they retain all of their data and settings.',
  `primary_group_id` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Specifies the primary group for the user.'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_users`
--

INSERT INTO `uf_users` (`id`, `user_name`, `display_name`, `password`, `email`, `activation_token`, `last_activation_request`, `lost_password_request`, `lost_password_timestamp`, `active`, `title`, `sign_up_stamp`, `last_sign_in_stamp`, `enabled`, `primary_group_id`) VALUES
(1, 'kaepten', 'kaepten', '$2y$10$.jLU3OWmrTrJlhF8wh001ONTV68EyfWO6BEntV7LJNXjJp9Ir3VNi', 'kaepten@c-dev.ch', '538b307ec344823e881ee11a4942c027', 1429272403, 0, 1429272403, 1, 'Master Account', 1429272403, 1432015991, 1, 2),
(8, 'neisgei', 'neisgei', '$2y$10$77aRgOjYVRqWJSiJz27cRucFgfN58TouwJzLAp3e0oQmaGmAYYUSO', 'neisgei@c-dev.ch', '999a5156fa1f549bf436c48ea6637a6c', 1431946213, 0, 1431946213, 1, 'GeoMaps User', 1431946213, 1432029841, 1, 1),
(9, 'patrik', 'patrik', '$2y$10$pFVBT/Rs92Ck3.y286PtGO3uQF9nuS9oAeL.Agor62o.FD0XWDwH.', 'patrik.bitzer@wwimmo.ch', '40d96854ec4e950b8d15cbffced8655a', 1431948461, 0, 1431948461, 1, 'GeoMaps User', 1431948461, 1432016004, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_user_action_permits`
--

DROP TABLE IF EXISTS `uf_user_action_permits`;
CREATE TABLE IF NOT EXISTS `uf_user_action_permits` (
  `id` int(10) unsigned NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `permits` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uf_user_group_matches`
--

DROP TABLE IF EXISTS `uf_user_group_matches`;
CREATE TABLE IF NOT EXISTS `uf_user_group_matches` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `uf_user_group_matches`
--

INSERT INTO `uf_user_group_matches` (`id`, `user_id`, `group_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(9, 8, 1),
(10, 8, 3),
(11, 9, 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `uf_configuration`
--
ALTER TABLE `uf_configuration`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_filelist`
--
ALTER TABLE `uf_filelist`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `path` (`path`);

--
-- Indizes für die Tabelle `uf_groups`
--
ALTER TABLE `uf_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_group_action_permits`
--
ALTER TABLE `uf_group_action_permits`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_group_page_matches`
--
ALTER TABLE `uf_group_page_matches`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_nav`
--
ALTER TABLE `uf_nav`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_nav_group_matches`
--
ALTER TABLE `uf_nav_group_matches`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_pages`
--
ALTER TABLE `uf_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_plugin_configuration`
--
ALTER TABLE `uf_plugin_configuration`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_users`
--
ALTER TABLE `uf_users`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_user_action_permits`
--
ALTER TABLE `uf_user_action_permits`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `uf_user_group_matches`
--
ALTER TABLE `uf_user_group_matches`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `uf_configuration`
--
ALTER TABLE `uf_configuration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT für Tabelle `uf_filelist`
--
ALTER TABLE `uf_filelist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `uf_groups`
--
ALTER TABLE `uf_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `uf_group_action_permits`
--
ALTER TABLE `uf_group_action_permits`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `uf_group_page_matches`
--
ALTER TABLE `uf_group_page_matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT für Tabelle `uf_nav`
--
ALTER TABLE `uf_nav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `uf_nav_group_matches`
--
ALTER TABLE `uf_nav_group_matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `uf_pages`
--
ALTER TABLE `uf_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `uf_plugin_configuration`
--
ALTER TABLE `uf_plugin_configuration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `uf_users`
--
ALTER TABLE `uf_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `uf_user_action_permits`
--
ALTER TABLE `uf_user_action_permits`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `uf_user_group_matches`
--
ALTER TABLE `uf_user_group_matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
