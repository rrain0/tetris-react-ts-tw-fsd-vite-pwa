import 'react'



declare module 'react' {
  interface HTMLAttributes<T> {
    cn?: string | undefined
  }
  interface SVGAttributes<T> {
    cn?: string | undefined
  }
}
