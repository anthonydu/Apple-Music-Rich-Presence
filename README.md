# Apple Music Discord Rich Presence

<picture>
  <img align="center" src="images/banner.png" alt="Screenshot of the Discord Rich Presence interface" width="500"></img>
</picture>

## Contents

1. Project Overview
2. Features
3. Installation

## Project Overview

This Discord Rich Presence is a bridge between the social media app [Discord](https://discord.com) and the music service [Apple Music](https://www.apple.com/apple-music/). Currently, Apple Music does not have native [Discord Rich Presence](https://discord.com/rich-presence) support built into their Music and iTunes apps for MacOS and Windows by default, so this app was made to do just that. Other parties like Spotify have had full integration with Discord, so it's about time that something efficient is made for Apple Music.

### Project Goals

- Efficient timing and re-calculation of song duration
- Update the status as efficiently as possible to prevent computer lag or fans turning on.

## Features

1. Song Details

   - Song name
   - Album name
   - Artist name
   - Album artwork
   - Playing icon
   - Elapsed time

2. Search Buttons

   - Search for song on Apple Music website
   - Search for song on Spotify website

<picture>
  <img src="images/presence.png" alt="Screenshot of the Discord Rich Presence interface" height="200"></img>
</picture>

## Installation

### macOS 11+

1. Go to [releases](https://github.com/anthonydu/Apple-Music-Rich-Presence/releases) and choose a version of your choice. It it highly encouraged that you choose the most recent version.

2. At the bottom of the release, where is says "Assets", choose the file that corresponds with your operating system (`darwin` corresponds with **macOS**)

3. Download the file by clicking on it, and open the file in your **Downloads** folder, or the respective location of where your downloads go to.

4. Open the file and locate the "AppleMusicRPC" application inside.

5. Attempt opening the application. If it works, there you go! **If it doesn't work due to an "Unidentified Developer" error, continue reading.**

6. Drag the app into the "Applications" tab in Finder.

7. Locate the app once it is in the "Applications" tab. Right click on the app and click "Open" to view the app. Enjoy!

### Windows 7 / 10 / 11

1. Go to [releases](https://github.com/anthonydu/Apple-Music-Rich-Presence/releases) and choose a version of your choice. It it highly encouraged that you choose the most recent version.

2. At the bottom of the release, where is says "Assets," choose the file that corresponds with your operating system (eg. `win32` corresponds with **windows**).

   - Note for the files there are two folders use the one that says `win32`

3. Download the file by clicking on it, and open the file in your **Downloads** folder, or the respective location of where your downloads go to.

4. Unzip the file to see the contents.

5. Open the folder (the one that says `win32`) and find "AppleMusicRPC.exe"

6. Run the file and you are go to go! Running this file should automatically open up iTunes and hook into it. Enjoy!
