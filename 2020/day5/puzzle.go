package main

import (
    "fmt"
    "strconv"
    "../utils"
    "sort"
)

func get_seat_id(pass string) uint64 {
    row_byte := ""
    column_byte := ""
    row := pass[:7]
    column := pass[7:]
    for _, char := range row {
        if string(char) == "B" {
            row_byte += "1"
        } else {
            row_byte += "0"
        }
    }

    for _, char := range column {
        if string(char) == "R" {
            column_byte += "1"
        } else {
            column_byte += "0"
        }
    }
    row_nr, _ := strconv.ParseUint(row_byte, 2, 32)
    column_nr,_ := strconv.ParseUint(column_byte, 2, 32)
    return row_nr *8  + column_nr
}

func part1(boarding_passes []string) {
    var highest_seat_id uint64
    var seat_id uint64
    for _, pass := range boarding_passes {
        seat_id = get_seat_id(pass)
        if seat_id > highest_seat_id {
            highest_seat_id = seat_id
        }
    }

    fmt.Println(highest_seat_id)
}

func part2(boarding_passes []string) {
    seat_ids := make([]uint64, len(boarding_passes))
    var seat_id uint64
    for id, pass := range boarding_passes {
        seat_ids[id] = get_seat_id(pass)
    }
    sort.Slice(seat_ids, func(i,j int) bool { return seat_ids[i] < seat_ids[j]})

    for id, seat := range seat_ids {
        if id != 0 && seat_ids[id -1 ] != seat -1 {
            seat_id = seat -1
            break
        }
    }
    fmt.Println(seat_id)

}

func main() {
    boarding_passes := utils.Readlines_as_string_array("input")
    if boarding_passes == nil {
        return
    }

    part1(boarding_passes)
    part2(boarding_passes)

}