"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/page"
import { PlusCircle, Users, Sword } from "lucide-react"

interface Player {
  name: string
  rating: number
}

export default function TeamGenerator() {
  const [players, setPlayers] = useState<Player[]>([])
  const [name, setName] = useState("")
  const [rating, setRating] = useState("")
  const [teams, setTeams] = useState<{ team1: Player[]; team2: Player[] } | null>(null)

  const addPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && rating) {
      setPlayers([...players, { name, rating: parseInt(rating) }])
      setName("")
      setRating("")
    }
  }

  const generateTeams = () => {
    const shuffled = [...players].sort(() => 0.5 - Math.random())
    let team1: Player[] = []
    let team2: Player[] = []
    let sum1 = 0
    let sum2 = 0

    shuffled.forEach((player) => {
      if (sum1 <= sum2) {
        team1.push(player)
        sum1 += player.rating
      } else {
        team2.push(player)
        sum2 += player.rating
      }
    })

    setTeams({ team1, team2 })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 bg-pattern">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Sword className="w-12 h-12 text-blue-500 mr-4" />
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">Team Generator</h1>
        </div>
        <Card className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Add Players</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addPlayer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Player Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter player name"
                    className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:ring-2 hover:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="rating" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Player Rating (1-10)
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Enter player rating"
                    className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:ring-2 hover:ring-blue-500"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Player
              </Button>
            </form>
          </CardContent>
        </Card>

        {players.length > 0 && (
          <Card className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Player List</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {players.map((player, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <span className="text-gray-900 dark:text-gray-100">{player.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">Rating: {player.rating}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {players.length > 1 && (
          <Button onClick={generateTeams} className="w-full mb-8 bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-105">
            <Users className="w-4 h-4 mr-2" />
            Generate Teams
          </Button>
        )}

        {teams && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[teams.team1, teams.team2].map((team, index) => (
              <Card key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Team {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {team.map((player, playerIndex) => (
                      <li
                        key={playerIndex}
                        className="flex justify-between items-center py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <span className="text-gray-900 dark:text-gray-100">{player.name}</span>
                        <span className="text-gray-600 dark:text-gray-400">Rating: {player.rating}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-right font-semibold text-gray-900 dark:text-gray-100">
                    Total Rating: {team.reduce((sum, player) => sum + player.rating, 0)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}