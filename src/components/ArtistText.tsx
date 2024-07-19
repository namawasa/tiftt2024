import React from "react"

type ArtistTextProps = {
  artist: string
}

export const ArtistText = ({
  artist
}: ArtistTextProps) => {
  return (
    <>
      {artist.split('<br>').map((val, index) => (
        <React.Fragment key={index}>
          {val}<br />
        </React.Fragment>
      ))}
    </>
  )
}
