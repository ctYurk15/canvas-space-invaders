import { Point } from "./gameobjects/Point";

//game config
export const ship_speed = 400;
export const ship_hp = 5;

export const buildings_count = 4;
export const buildings_y = window.innerHeight / 2 + 100;
export const buildings_size = new Point(100, 100);
export const building_part_hp = 1;

export const arrow_size = new Point(5, 25);
export const arrow_speed = 1000;

export const aliens_count = new Point(11, 5);
export const aliens_matrix_gap = 25;
export const alien_size = 45;
export const alien_first_point = new Point(50, 20);
export const alien_speed = 250;
export const alien_shoot_interval = 900;