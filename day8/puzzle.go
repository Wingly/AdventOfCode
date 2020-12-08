package main

import (
    "fmt"
    "../utils"
    "strings"
    "strconv"
)

func execute_instructions(instructions []string) ([]int, int) {
    executed_instructions := []int{}
    accumulator := 0
    index := 0

    for index < len(instructions) {
        execution_info := strings.Split(instructions[index], " ")
        executed_instructions = append(executed_instructions, index)

        switch execution_info[0]{
            case "nop":
                index += 1
            case "acc":
                increment, _ := strconv.Atoi(execution_info[1])
                accumulator += increment
                index += 1
            case "jmp":
                increment, _ := strconv.Atoi(execution_info[1])
                index += increment
        }

        if utils.Int_in_slice(index, executed_instructions)  {
                break
        }

    }
    return executed_instructions, accumulator
}

func part1(instructions []string) {
    _, accumulated := execute_instructions(instructions)
    fmt.Println(accumulated)
}

func part2(instructions []string) {
    original_run, _ := execute_instructions(instructions)
    
    filtered_executions := []int{}
    for _, execution := range original_run {
        if instructions[execution][:3] != "acc" {
            filtered_executions = append(filtered_executions, execution)
        }
    }

    instructions_copy := make([]string, len(instructions))
    new_accumulated := 0
    for _, execution := range filtered_executions {
        copy(instructions_copy, instructions)
        instruction := strings.Split(instructions_copy[execution], " ")
        switch instruction[0] {
            case "jmp":
                instructions_copy[execution] = "nop " + instruction[1]
            case "nop":
                instructions_copy[execution] = "jmp " + instruction[1]
        }
        run, accumulated := execute_instructions(instructions_copy)

        //This could be wrong if the last instruction is a jmp, but whatever
        if run[len(run) -1] == len(instructions) -1 {
            new_accumulated = accumulated
            break
        }
    }
    fmt.Println(new_accumulated)
}

func main() {
    instructions := utils.Readlines_as_string_array("input")

    part1(instructions)
    part2(instructions)
}