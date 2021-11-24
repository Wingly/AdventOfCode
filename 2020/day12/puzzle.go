package main

import (
    "fmt"
    "../utils"
    "strconv"
    "math"
)

type Boat struct  {
    x int
    y int
    aim [2]int
}

func handle_rotation(cur_aim [2]int, rotation float64 ) [2]int {

    rotation_radians := rotation * (math.Pi/180)
    new_aim := [2]int{0,0}
    new_aim[0] = cur_aim[0] * int(math.Cos(rotation_radians)) - cur_aim[1] * int(math.Sin(rotation_radians))
    new_aim[1] = cur_aim[0] * int(math.Sin(rotation_radians)) + cur_aim[1] * int(math.Cos(rotation_radians))
    return new_aim
}

func part1(instructions []string) {
    cur_pos := Boat{0,0, [2]int{1,0}}
    for _, instruction := range instructions {
        command := instruction[:1]
        speed, _ := strconv.Atoi(instruction[1:])
        switch command {
            case "N":
                cur_pos.y += speed
            case "S":
                cur_pos.y -= speed
            case "E":
                cur_pos.x += speed
            case "W":
                cur_pos.x -= speed
            case "L":
                cur_pos.aim = handle_rotation(cur_pos.aim, float64(speed))
            case "R":
                cur_pos.aim = handle_rotation(cur_pos.aim, -float64(speed))
            case "F":
                cur_pos.x += cur_pos.aim[0] * speed
                cur_pos.y += cur_pos.aim[1] * speed
        }
   
    }
    fmt.Println(math.Abs(float64(cur_pos.x)) + math.Abs(float64(cur_pos.y)))
}

func part2(instructions []string) {
    cur_pos := Boat{0,0, [2]int{1,0}}
    waypoint := [2]int{10,1}
    for _, instruction := range instructions {
        command := instruction[:1]
        speed, _ := strconv.Atoi(instruction[1:])
        switch command {
            case "N":
                waypoint[1] += speed
            case "S":
                waypoint[1] -= speed
            case "E":
                waypoint[0] += speed
            case "W":
                waypoint[0] -= speed
            case "L":
                waypoint = handle_rotation(waypoint, float64(speed))
            case "R":
                waypoint = handle_rotation(waypoint, -float64(speed))
            case "F":
                cur_pos.x += waypoint[0] * speed
                cur_pos.y += waypoint[1] * speed
        }
   
    }
    fmt.Println(math.Abs(float64(cur_pos.x)) + math.Abs(float64(cur_pos.y)))

}

func main() {
    instructions := utils.Readlines_as_string_array("input")
    part1(instructions)
    part2(instructions)

}