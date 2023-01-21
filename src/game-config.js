import { Point } from "./gameobjects/Point";

//game config
export const line_segments = 20;

export const ship_speed = 800;
export const ship_hp = 100;

export const buildings_count = 4;
export const buildings_y = window.innerHeight / 2 + 100;
export const buildings_size = new Point(100, 100);
export const building_part_hp = 4;

export const arrow_size = new Point(5, 25);
export const arrow_speed = 1000;

export const aliens_count = new Point(11, 5);
export const aliens_matrix_gap = 25;
export const alien_size = 45;
export const alien_first_point = new Point(0, 20);
export const alien_speed = 250;
export const alien_shoot_interval = 400;
export const aliens_new_wave_time = 2000;

//config changes during the game
export let alien_hp = 1;