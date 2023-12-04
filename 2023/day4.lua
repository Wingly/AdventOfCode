require "utility"

local input = read_lines('input')

function part1(cards)
    local retval = 0
    for _, card in pairs(cards) do
        local prevPoints =0
        for str1, str2 in string.gmatch(card, ":(.*)|(.*)") do
            local winning = {}
            for winner in string.gmatch(str1, "(%w+)") do
                winning[#winning+1] = winner
            end
            for myNum in string.gmatch(str2, "(%w+)") do
                if hasValue(winning, myNum) then
                    if prevPoints == 0 then
                        retval = retval + 1
                        prevPoints = 1
                    else
                        retval = retval + prevPoints
                        prevPoints = prevPoints * 2
                    end
                end
            end
        end
    end
    return retval
end

function part2(cards)
    local retval = 0
    local cardGeneration = {}
    local baseCards = {}
    for num, card in pairs(cards) do
        local wins =0
        for str1, str2 in string.gmatch(card, ":(.*)|(.*)") do
            local winning = {}
            for winner in string.gmatch(str1, "(%w+)") do
                winning[#winning+1] = winner
            end
            for myNum in string.gmatch(str2, "(%w+)") do
                if hasValue(winning, myNum) then
                    wins = wins +1
                end
            end
        end
        cardGeneration[num] = wins
        baseCards[num] = 1
    end
    for cardI, wins in ipairs(cardGeneration) do
        for i= 1, wins do
            baseCards[cardI+i] = baseCards[cardI+i] +1 * baseCards[cardI]
        end
    end
    for _, wins in pairs(baseCards) do
        retval = retval + wins
    end
    return retval
end

print(part1(input))

print(part2(input))
