defmodule Utils do
  def readLinesAsStrings(filename) do
    String.split(File.read!(filename), "\n")
  end

  def readLinesAsStringLists(filename, delim) do
    File.read!(filename)
    |> String.split("\n")
    |> Enum.map(fn s -> String.split(s, delim, trim: true) end)
  end

  def readLinesAsInt(filename) do
    list = readLinesAsStrings(filename)
    Enum.map(list, fn element -> elem(Integer.parse(element), 0) end)
  end

  def readLinesAsIntLists(filename, delim) do
    list = readLinesAsStringLists(filename, delim)
    Enum.map(list, fn ele -> Enum.map(ele, fn e -> String.to_integer(e) end) end)
  end

  def sortString(value) do
    String.split(value, "", trim: true) |> Enum.sort() |> Enum.join("")
  end
end
