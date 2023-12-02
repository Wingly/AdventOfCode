require "utility"

local input = read_lines('input')

function part1(games)
    local max = {
        ["blue"] = 14,
        ["green"] = 13,
        ["red"] = 12
    }
    local retval =0
    for gameNum, g in pairs(games) do
       local data = {}
       for str in string.gmatch(g, "(%w+)") do
            data[#data+1] = str
        end
        local i = 3
        local badgame = false
        while i < #data do
            if max[data[i+1]] < tonumber(data[i]) then
                badgame = true
                break
            end
            i = i +2
        end
        if badgame ~= true then
          retval = retval + gameNum
        end 
    end
    return retval
end
 
function part2(games)
    local retval =0
    for gameNum, g in pairs(games) do
        local min = {
            ["blue"] = 0,
            ["green"] = 0,
            ["red"] = 0
        }
        local data = {}
        for str in string.gmatch(g, "(%w+)") do
             data[#data+1] = str
         end
         local i = 3
         while i < #data do
            if min[data[i+1]] < tonumber(data[i]) then
                min[data[i+1]] = tonumber(data[i])
            end
            i = i +2
        end
        retval = retval + min.blue * min.red * min.green
    end
    return retval
end

print(part1(input))

print(part2(input))
