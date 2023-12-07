require "utility"

local input = read_lines('input')

function buildHandData(hands, jokers)
    local allHandData = {}
    for _, hand in ipairs(hands) do
        local cards, bid
        for c, b in string.gmatch(hand,'(%w+) (%w+)') do
            cards = c
            bid = b
        end
        local handData = {
            cards= {},
            value = 0,
            bid = bid
        }
        local numOfCardType = {}

        for card in cards:gmatch"." do
            if card == 'A' then
                card = 14
            elseif card == 'K' then
                card = 13
            elseif card == 'Q' then
                card = 12
            elseif card == 'J' then
                if jokers then
                    card = 1
                else 
                    card = 11
                end
            elseif card == 'T' then
                card = 10
            else
                card = tonumber(card)
            end

            handData.cards[#handData.cards + 1] = card
            if numOfCardType[card] ~= nil then
                numOfCardType[card] = numOfCardType[card] +1
            else
                numOfCardType[card] = 1
            end
        end

        local numTwo = 0
        local numThree = 0
        local numFour = 0
        local numFive = 0
        local numJokers = 0
        if jokers and numOfCardType[1] ~= nil then
            numJokers = numOfCardType[1]
        end
        
        for _, num in pairs(numOfCardType) do
            if num == 2 then
                numTwo = numTwo +1
            elseif num == 3 then
                numThree = numThree +1
            elseif num == 4 then
                numFour = numFour +1
            elseif num == 5 then
                numFive = numFive +1
            end
        end

        -- this looks horrible, but can't be bothered to refactor it now
        if numFive == 1 or (numFour == 1 and numJokers == 1) or (numThree == 1 and numJokers == 2) or (numTwo == 1 and numJokers == 3) or numJokers >= 4 then
            handData.value = 6    
        elseif numFour == 1 or (numThree == 1 and numJokers == 1) or (numTwo == 1 and numJokers == 3) or (numTwo == 2 and numJokers == 2) or numJokers >= 3  then
            handData.value = 5
        elseif (numTwo == 1 and numThree == 1) or (numTwo == 2 and numJokers == 1) then
            handData.value = 4
        elseif numThree == 1 or (numTwo == 1 and numJokers == 1) or numJokers == 2 then
            handData.value = 3
        elseif numTwo == 2  then
            handData.value = 2
        elseif numTwo == 1  or numJokers == 1 then
            handData.value = 1
        end

        allHandData[#allHandData+1] = handData
    end

    table.sort(allHandData, function (left, right)
        if left.value == right.value then
            for i, card in ipairs(left.cards) do
                if card ~= right.cards[i] then
                    return card < right.cards[i]
                end
            end
        else
            return left.value < right.value
        end
    end)
    return allHandData
end

function part1(hands)
    local retval = 0
    local allHandData = buildHandData(hands, false)
    for i, data in ipairs(allHandData) do
        retval = retval +  i * data.bid
    end
    return retval
end

function part2(hands)
    local retval = 0
    local allHandData = buildHandData(hands, true)
    for i, data in ipairs(allHandData) do
        retval = retval +  i * data.bid
    end
    return retval
end

print(part1(input))

print(part2(input))