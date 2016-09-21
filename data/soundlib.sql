-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema soundlib
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema soundlib
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `soundlib` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `soundlib` ;

-- -----------------------------------------------------
-- Table `soundlib`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soundlib`.`user` (
  `usr_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `usr_name` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL COMMENT '',
  `usr_email` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`usr_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `soundlib`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soundlib`.`playlist` (
  `pls_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `pls_name` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL COMMENT '',
  `pls_user` INT(11) NOT NULL COMMENT '',
  PRIMARY KEY (`pls_id`)  COMMENT '',
  INDEX `fk_playlist_user_idx` (`pls_user` ASC)  COMMENT '',
  CONSTRAINT `fk_playlist_user`
    FOREIGN KEY (`pls_user`)
    REFERENCES `soundlib`.`user` (`usr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `soundlib`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soundlib`.`track` (
  `trk_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `trk_title` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL COMMENT '',
  `trk_duration` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`trk_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `soundlib`.`playlist_has_track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `soundlib`.`playlist_has_track` (
  `playlist_pls_id` INT(11) NOT NULL COMMENT '',
  `track_trk_id` INT(11) NOT NULL COMMENT '',
  PRIMARY KEY (`playlist_pls_id`, `track_trk_id`)  COMMENT '',
  INDEX `fk_playlist_has_track_track1_idx` (`track_trk_id` ASC)  COMMENT '',
  INDEX `fk_playlist_has_track_playlist1_idx` (`playlist_pls_id` ASC)  COMMENT '',
  CONSTRAINT `fk_playlist_has_track_playlist1`
    FOREIGN KEY (`playlist_pls_id`)
    REFERENCES `soundlib`.`playlist` (`pls_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_has_track_track1`
    FOREIGN KEY (`track_trk_id`)
    REFERENCES `soundlib`.`track` (`trk_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
