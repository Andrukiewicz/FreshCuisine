import { useEffect } from "react"

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Pyszne Obiady 3klik.pl`
  }, [title])

  return null
}

export const usePageTitleAdmin = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return null
}
