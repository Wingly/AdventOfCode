Code.require_file("utils.exs")

defmodule Solvers do
  def countOnes(data) do
    splitList = List.pop_at(data, 0)

    Enum.reduce(elem(splitList, 1), elem(splitList, 0), fn list, acc ->
      Stream.with_index(list) |> Enum.map(fn {ele, i} -> ele + Enum.at(acc, i) end)
    end)
  end

  def partOne(data) do
    gAndE =
      countOnes(data)
      |> Enum.reduce({"", ""}, fn val, {g, e} ->
        if val > length(data) / 2, do: {"#{g}1", "#{e}0"}, else: {"#{g}0", "#{e}1"}
      end)

    String.to_integer(elem(gAndE, 0), 2) * String.to_integer(elem(gAndE, 1), 2)
  end

  def removeNonMatching(remaining, index, type) when length(remaining) > 1 do
    bit = if Enum.at(countOnes(remaining), index) >= length(remaining) / 2, do: 1, else: 0

    removeNonMatching(
      Enum.filter(remaining, fn list ->
        if type == "ox", do: Enum.at(list, index) == bit, else: Enum.at(list, index) != bit
      end),
      index + 1,
      type
    )
  end

  def removeNonMatching(remaining, _, _) do
    String.to_integer(Enum.join(Enum.at(remaining, 0)), 2)
  end

  def partTwo(data) do
    oxygen = removeNonMatching(data, 0, "ox")
    co2 = removeNonMatching(data, 0, "somethingelse")
    oxygen * co2
  end
end

data = Utils.readLinesAsIntLists("input", "")
result = Solvers.partOne(data)
IO.puts(result)
result = Solvers.partTwo(data)
IO.puts(result)
