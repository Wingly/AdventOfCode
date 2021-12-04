Code.require_file("utils.exs")

defmodule Solvers do
  def checkRows(board) do
    Enum.chunk_every(board, 5)
    |> Enum.map(fn chunk ->
      Enum.reduce(chunk, 0, fn e, acc -> if e == "d", do: acc + 1, else: acc end)
    end)
    |> Enum.any?(fn ele -> ele == 5 end)
  end

  def checkColumns(board) do
    Stream.with_index(board)
    |> Enum.reduce([0, 0, 0, 0, 0], fn {e, i}, acc ->
      if e == "d",
        do: List.update_at(acc, rem(i, 5), fn e -> e + 1 end),
        else: acc
    end)
    |> Enum.any?(fn ele -> ele == 5 end)
  end

  def play(drawOrder, boards, winningScore, _) when winningScore == 0 do
    {thisDraw, remainingDraws} = List.pop_at(drawOrder, 0)

    updatedBoards =
      Enum.map(boards, fn board ->
        Enum.map(board, fn ele -> if ele == thisDraw, do: "d", else: ele end)
      end)

    checkedRows = Enum.map(updatedBoards, fn board -> checkRows(board) end)
    index = Enum.find_index(checkedRows, fn val -> val == true end)
    checkedColumns = Enum.map(updatedBoards, fn board -> checkColumns(board) end)

    index =
      if index == nil, do: Enum.find_index(checkedColumns, fn val -> val == true end), else: index

    score =
      if index != nil,
        do:
          Enum.filter(Enum.at(updatedBoards, index), fn e -> e != "d" end)
          |> Enum.map(fn b -> String.to_integer(b) end)
          |> Enum.sum(),
        else: 0

    play(remainingDraws, updatedBoards, score * String.to_integer(thisDraw), index)
  end

  def play(_, _, winningScore, index) do
    {winningScore, index}
  end

  def partOne(drawOrder, boards) do
    elem(play(drawOrder, boards, 0, nil), 0)
  end

  def playToLose(drawOrder, boards, _) when length(boards) != 0 do
    {score, index} = play(drawOrder, boards, 0, nil)
    {_, remainder} = List.pop_at(boards, index)
    playToLose(drawOrder, remainder, score)
  end

  def playToLose(_, _, winningScore) do
    winningScore
  end

  def partTwo(drawOrder, boards) do
    playToLose(drawOrder, boards, 0)
  end
end

data = Utils.readLinesAsStrings("input")

split = List.pop_at(data, 0)
drawOrder = String.split(elem(split, 0), ",")

boards =
  elem(split, 1)
  |> Enum.filter(fn e -> e != "" end)
  |> Enum.chunk_every(5, 5)
  |> Enum.map(fn board ->
    List.flatten(Enum.map(board, fn row -> String.split(row, " ", trim: true) end))
  end)

result = Solvers.partOne(drawOrder, boards)
IO.puts(result)
result = Solvers.partTwo(drawOrder, boards)
IO.puts(result)
