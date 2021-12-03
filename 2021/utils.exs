defmodule Utils do
  def readLinesAsStrings(filename) do
    String.split(File.read!(filename), "\n")
  end

  def readLinesAsStringLists(filename, delim) do
    File.read!(filename) |> String.split("\n") |> Enum.map(fn s -> String.split(s, delim) end)
  end

  def readLinesAsInt(filename) do
    list = readLinesAsStrings(filename)
    Enum.map(list, fn element -> elem(Integer.parse(element), 0) end)
  end
end
