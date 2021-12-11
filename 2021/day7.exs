Code.require_file("utils.exs")

defmodule Solvers do
  def findCheapest(crabs, location, prevVal, currVal, isp2) when prevVal > currVal do
    newVal =
      Enum.reduce(crabs, 0, fn crab, acc ->
        res = abs(crab - location)

        res =
          if isp2,
            do: Enum.to_list(0..res) |> Enum.reduce(0, fn step, acc -> acc + step end),
            else: res

        acc + res
      end)

    findCheapest(crabs, location + 1, currVal, newVal, isp2)
  end

  def findCheapest(_, _, prevVal, _, _) do
    prevVal
  end

  def partOne(data) do
    lowest =
      Enum.reduce(data, 0, fn crab, low ->
        if crab < low, do: crab, else: low
      end)

    findCheapest(data, lowest, 10_000_000_000_000, 10_000_000_000_000 - 1, false)
  end

  def partTwo(data) do
    lowest =
      Enum.reduce(data, 0, fn crab, low ->
        if crab < low, do: crab, else: low
      end)

    findCheapest(data, lowest, 10_000_000_000_000, 10_000_000_000_000 - 1, true)
  end
end

data = Utils.readLinesAsIntLists("input", ",")
data = Enum.at(data, 0)
result = Solvers.partOne(data)
IO.puts("=result=")
IO.inspect(result)
result = Solvers.partTwo(data)
IO.puts("=result=")
IO.inspect(result)
