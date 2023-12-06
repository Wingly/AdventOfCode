require "utility"

local input = read_lines('input')

function part1(data)
    local time = {}
    local distance = {}
    local retval = 1

    for val in string.gmatch( data[1],"%d+") do
        time[#time + 1] = val
    end 
    for val in string.gmatch(data[2], "%d+") do
        distance[#distance + 1] = val
    end
    for index, raceTime in ipairs(time) do
        local numWins = 0
        local record = tonumber(distance[index])
        for i=1, raceTime do
            if i * (raceTime -i) > record then
                numWins = numWins + 1
            end 
        end
        retval = retval * numWins
    end
    return retval
end

function part2(data)
    local time =""
    local distance = ""
    local retval = 0

    for val in string.gmatch( data[1],"%d+") do
        time = time..val
    end 
    for val in string.gmatch(data[2], "%d+") do
        distance = distance..val
    end
    time = tonumber(time)
    distance = tonumber(distance)
    -- if bruteforce finishes in less than 2 sec, is it really a bruteforce?
    for i=1, time do
        if i * (time -i) > distance then
            retval = retval + 1
        end 
    end
    return retval
end

print(part1(input))

print(part2(input))