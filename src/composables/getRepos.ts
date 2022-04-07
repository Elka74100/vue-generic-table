import type Repo from "@/types/Repo"
import { ref } from "vue"

const getRepos = () => {
    const repos = ref<Repo[]>([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('https://api.github.com/search/repositories?q=vue')
        if (!data.ok) {
          throw Error('no data available')
        }
        const dataJson = await data.json()
        repos.value = dataJson.items
      }
      catch (err: any) {
        error.value = err.message
      }
    }

    return { repos, error, load }
}

export default getRepos