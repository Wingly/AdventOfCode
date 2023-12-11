require "utility"

local input = read_lines('input')

function part1(data)
    local movement = {}
    for c in data[1]:gmatch"." do
        table.insert(movement, c)
    end
    local nodes= {}

    for index=3, #data do
        for node, left, right in string.gmatch(data[index],'(%w+) = .(%w%w%w), (%w%w%w)') do
            nodes[node] = {['R']=right, ['L']=left}
        end
    end
    local current = "AAA"
    local steps = 0
    local i = 1
    while true do
        steps = steps +1
        current = nodes[current][movement[i]]
       -- print(current)
        if current == "ZZZ" then
            break
        end
        i = i+1
        if i > #movement then
            i = 1
        end
    end
    return steps
end

function part2(data)
    local movement = {}
    for c in data[1]:gmatch"." do
        table.insert(movement, c)
    end
    local nodes= {}
    local currentNodes = {}

    for index=3, #data do
        for node, left, right in string.gmatch(data[index],'(%w+) = .(%w%w%w), (%w%w%w)') do
            nodes[node] = {['R']=right, ['L']=left}
            if string.sub(node, 3) == 'A' then
                table.insert(currentNodes, node)
            end
        end
    end
    local cycle = {}

    for _, current in ipairs(currentNodes) do
        local steps = 0
        local i = 1
        local orig = current
        local firstMove = movement[i]
        while true do
            steps = steps +1
            current = nodes[current][movement[i]]
            if string.sub(current, 3) == 'Z' and hasValue(cycle, steps) ~= true then
                table.insert(cycle, steps)
                break
            end
        
            i = i+1
            if i > #movement then
                i = 1
            end
        end
    end
    -- im lazy okay?
    local i = 1
    local divVal = math.floor(cycle[1]/2)
    while true do
        local success = true
        for j = 1, #cycle do
            if math.fmod(cycle[j], divVal ) ~= 0 then
                success = false
                break
            end
        end
        if success then
            break
        end
        divVal = divVal -1
        i = i +1
    end
    local retval = cycle[1]
    for _, value in ipairs(cycle) do
        if _ ~= 1 then
            retval = (retval * value)/divVal
        end
    end
    return retval
end

print(part1(input))

print(part2(input))

