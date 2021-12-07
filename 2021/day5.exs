Code.require_file("utils.exs")

defmodule Solvers do
  def getPositionsInLine(origAndDest, ignoreDiagonal) do
    [orig, dest] = origAndDest
    [x1, y1] = String.split(orig, ",") |> Enum.map(fn x -> String.to_integer(x) end)
    [x2, y2] = String.split(dest, ",") |> Enum.map(fn y -> String.to_integer(y) end)
    retVal = []

    retVal =
      if x1 == x2, do: Enum.to_list(y1..y2) |> Enum.map(fn y -> "x#{x1},y#{y}" end), else: retVal

    retVal =
      if y1 == y2, do: Enum.to_list(x1..x2) |> Enum.map(fn x -> "x#{x},y#{y1}" end), else: retVal

    if retVal == [] && !ignoreDiagonal,
      do:
        List.zip([Enum.to_list(x1..x2), Enum.to_list(y1..y2)])
        |> Enum.map(fn {x, y} -> "x#{x},y#{y}" end),
      else: retVal
  end

  def mapPositions(lineSources, ignoreDiagonal) do
    Enum.reduce(lineSources, %{}, fn ele, acc ->
      acc =
        getPositionsInLine(ele, ignoreDiagonal)
        |> Enum.reduce(acc, fn point, ac ->
          if ac[point] == nil,
            do: Map.put(ac, point, 1),
            else: Map.replace(ac, point, 2)
        end)

      acc
    end)
    |> Map.values()
    |> Enum.filter(fn count -> count >= 2 end)
    |> length
  end

  def partOne(data) do
    mapPositions(data, true)
  end

  def partTwo(data) do
    mapPositions(data, false)
  end
end

data = Utils.readLinesAsStringLists("input", " -> ")
result = Solvers.partOne(data)
IO.inspect(result)
result = Solvers.partTwo(data)
IO.inspect(result)
