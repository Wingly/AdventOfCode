package main

import (
	"fmt"
	"../utils"
	"strings"
)

func combine_to_group_answer(answers []string) ([]string, []int) {
	group_answers := []string{}
	answers_per_group := []int{}
	group_id := 1
	for _, answer := range answers {
		if answer == "" {
			group_id +=1
		} else if len(group_answers) < group_id {
			group_answers = append(group_answers, answer)
			answers_per_group = append(answers_per_group, 1)
		} else {
			group_answers[group_id - 1] += answer
			answers_per_group[group_id -1 ] +=1
		}
	}
	return group_answers, answers_per_group

}

func part1(group_answers []string) {
	total_answers := 0
	for _, answer := range group_answers {
		counted_chars := ""
		for _, char := range answer {
			if !strings.Contains(counted_chars, string(char)) {
				counted_chars += string(char)
			}
		}
		total_answers += len(counted_chars)
	}
	fmt.Println(total_answers)
}

func part2(group_answers []string, answers_per_group []int)  {
	total_answers := 0
	for idx, answer := range group_answers {
		answers_with_count := map[string]int{}
		for _, char := range answer {
			answers_with_count[string(char)] += 1
		}
		for _, val := range answers_with_count {
			if val == answers_per_group[idx] {
				total_answers += 1
			}
		}
	}
	fmt.Println(total_answers)
}

func main() {
	answers := utils.Readlines_as_string_array("input")
	group_answers, answers_per_group := combine_to_group_answer(answers)

	part1(group_answers)
	part2(group_answers, answers_per_group)
}