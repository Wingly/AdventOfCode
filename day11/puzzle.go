package main

import (
    "fmt"
    "../utils"
    "strings"
)

func check_row(row []string, j int) int{
    nr_adjecent := 0
    if row[j] == "#" {
        nr_adjecent++
    }
    if 0 < j && row[j - 1] =="#" {
        nr_adjecent++
    }
    if j < len(row) - 1 && row[j + 1] =="#" {
        nr_adjecent++
    }
    return nr_adjecent
}

func check_left_right(row []string, j int) int{
    nr_adjecent := 0
    if 0 < j && row[j - 1] =="#" {
        nr_adjecent++
    }
    if j < len(row) - 1 && row[j + 1] =="#" {
        nr_adjecent++
    }
    return nr_adjecent
}

func part1(seat_map [][]string) {
    for true {
        next_seat_map := [][]string{}
        nr_changed_seats := 0
        for i, row := range seat_map {
            updated_row := make([]string, len(row))
            for j, seat := range row {
                new_seat := seat
                nr_adjecent := 0
                if i != 0 {
                    nr_adjecent += check_row(seat_map[i - 1], j)
                }
                if i != len(seat_map) - 1{
                    nr_adjecent += check_row(seat_map[i + 1], j)
                }
                nr_adjecent += check_left_right(seat_map[i],j)
                if seat == "L" && nr_adjecent == 0 {
                    new_seat = "#"
                    nr_changed_seats++
                } else if seat == "#" && 4 <= nr_adjecent {
                    new_seat = "L"
                    nr_changed_seats++
                }
                updated_row[j] = new_seat
            }
            next_seat_map = append(next_seat_map, updated_row)
        }
        seat_map = next_seat_map
        if nr_changed_seats == 0 {
            break
        }	
    }
    occupied_seats := 0
    for _, row := range seat_map {
        for _, seat := range row {
            if seat == "#" {
                occupied_seats++
            }
        }
    }
    fmt.Println(occupied_seats)
}


func check_direction(seat_map [][]string, x_pos, y_pos, x_speed, y_speed int) bool {
    board_size := len(seat_map[0]) -1
    cur_x := x_pos
    cur_y := y_pos
    for true {
        cur_x += x_speed
        cur_y += y_speed

        if cur_x < 0 || board_size < cur_x || cur_y < 0 || board_size < cur_y {
            //No seats in sight in this direction
            return false
        }
        looking_at := seat_map[cur_y][cur_x]
        if looking_at == "#" {
            return true
        } else if looking_at == "L" {
            return false
        }
    }

    return false
}

func check_seats_in_sight(seat_map [][]string, x_pos, y_pos int) int {
    nr_adjecent :=0
    for y_speed := -1; y_speed < 2; y_speed++ {
        for x_speed := -1; x_speed < 2; x_speed++ {
            if x_speed == 0 && y_speed == 0 {
                continue
            }
            if check_direction(seat_map, x_pos, y_pos, x_speed, y_speed) {
                nr_adjecent++
            }

        }
    }
    return nr_adjecent
}

func part2(seat_map [][]string) {
    for true {
        next_seat_map := [][]string{}
        nr_changed_seats := 0
        for i, row := range seat_map {
            updated_row := make([]string, len(row))
            for j, seat := range row {
                new_seat := seat
                in_sight := 0
                if (seat_map[i][j] != ".") {
                    in_sight += check_seats_in_sight(seat_map,j ,i)
                }
                if seat == "L" && in_sight == 0 {
                    new_seat = "#"
                    nr_changed_seats++
                } else if seat == "#" && 5 <= in_sight {
                    new_seat = "L"
                    nr_changed_seats++
                }
                updated_row[j] = new_seat
            }
            next_seat_map = append(next_seat_map, updated_row)
        }
        seat_map = next_seat_map

        
        for _, row := range seat_map {
            fmt.Println(strings.Join(row, ""))
        }

        if nr_changed_seats == 0 {
            break
        }
    }



    occupied_seats := 0
    for _, row := range seat_map {
        for _, seat := range row {
            if seat == "#" {
                occupied_seats++
            }
        }
    }
    fmt.Println(occupied_seats)
    fmt.Println(len(seat_map))

}

func marc(seat_map [][]string, x_pos, y_pos, x_speed, y_speed int) *string{
    board_size := len(seat_map[0]) -1
    cur_x := x_pos
    cur_y := y_pos
    var in_sight *string
    for true {
        cur_x += x_speed
        cur_y += y_speed

        if cur_x < 0 || board_size < cur_x || cur_y < 0 || board_size < cur_y {
            //No seats in sight in this direction
            break
        }
        looking_at := seat_map[cur_y][cur_x]
        if looking_at == "#" || looking_at == "L"{
            in_sight = &seat_map[cur_y][cur_x]
            break
        }
    }
    return in_sight
}


type Seat struct {
    val string
    in_sight []*string
    x int
    y int
}


func test(seat_map [][]string) {
    mapped_seats := []Seat{}
    for i, row := range seat_map {
        for j, _ := range row {
            in_sight := []*string{}
            for y_speed := -1; y_speed < 2; y_speed++ {
                for x_speed := -1; x_speed < 2; x_speed++ {
                    if x_speed == 0 && y_speed == 0 {
                        continue
                    }
                    seen := marc(seat_map, j, i ,x_speed, y_speed)
                    if seen != nil {
                        in_sight = append(in_sight, seen)
                    }
                }
            }
            mapped_seats = append(mapped_seats, Seat{seat_map[i][j], in_sight, j, i})

        }
    }
    for _, p := range mapped_seats[0].in_sight {
        fmt.Println(*p)
    }
    for true {
        nr_changed_seats := 0
        for _, seat := range mapped_seats {
            seen_occupied := 0
            for _, val := range seat.in_sight {
                if val != nil && *val == "#" {
                    seen_occupied++
                }
            }
            if seen_occupied == 0 {
                seat.val = "#"
                nr_changed_seats++
            } else if 5 <= seen_occupied {
                seat.val = "L"
                nr_changed_seats++
            } 
        }
        if nr_changed_seats == 0 {
            break
        }

        for _, seat := range mapped_seats {
            seat_map[seat.y][seat.x] = seat.val
        }

        
        for _, row := range seat_map {
            fmt.Println(strings.Join(row, ""))
        }
    }
}

func main() {
    seat_map := [][]string{}
    for _, row := range utils.Readlines_as_string_array("testinput") {
        /*Maybe it would be better to create an array of size len(utils.Re....)
         instead of using append. But if it works it works 
        */
        seat_map = append(seat_map, strings.Split(row, ""))
    }

    test(seat_map)
//	part1(seat_map)
//	part2(seat_map)
    da := [][]string{[]string{"hi", "world"}}
    fmt.Println(da)
    q := &da[0][0]
    fmt.Println(*q)
    da[0][0] = "b"
    fmt.Println(*q)
    ze := [][]string{[]string{"hasd", "gr"}}
    for i, val := range ze {
        for j, q := range val {
            da[i][j] = q
        }
    }
    fmt.Println(*q)
}