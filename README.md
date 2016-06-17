# Githubr

Simple Android app that searches github repositories and opens them in a webview.

![Alt text](/screencast.gif?raw=true "Optional Title")

## Architecture

__Tools Used__
* React Native
* es6 syntax

For this I went with a purely React codebase, as it's abstraction adds all of what is needed for this application. Due to being on Linux I can only test on Android, so this is Android only compatible. Theoretically you could run nearly the exact same code on iOS. I have chosen to use Android specific elements, such as the Android progress bar to show the loading state while paginating, you could easily swap for an animated image.

React Native applications are made of of components, a component is tied directly to it's own state. In your logic you manipulate state and React handles the UI changes for you. If I were making a larger app I would add on something like Redux to give me a global state object rather than letting each component contain it's own state. This app, however, is basic enough that it would be overkill to add global state.

The main point of entry is `index.android.js` which is essentially a router that loads a component based on what route is being triggered. The router is being passed as a property to each component so that it might trigger routes within it.


#### 3 Hour Mark
There's an annotated tag labeled 3hr on this repository that marks 3 hours into the project. At that point I have created the majority of the styles for the search bar and the list view. As well I am loading the first page of results and displaying the required data. Later on I add infinite pagination with a loading indicator, as


I just wanted to add how simple it is to setup async & databinding in React Native vs Java, it took me a few minutes to start pulling data and displaying it vs having to setup multiple libraries with complex syntax and un-obvious class generation. Although I'm not extremely confident in the performance of certain React Views and would be curious to see how this does on an older Nexus. I started with a ListView, which was pretty buggy. Later on I went on to use a RecyclerViewBackedScrollView which is an abstraction on the native RecyclerView (both of which are known to have better performance/functionality than ListView).

I just wanted to add how simple it is to setup async & databinding in React Native vs Java, it took me a little time to start pulling data and displaying it vs having to setup multiple libraries with complex syntax and un-obvious class generation. As stated above, some React Views aren't reliable and would be curious to do more testing on a true native device. The main drawback I have with the data binding is the lack of typing & POJO style models. Which Im sure could be added with additional libraries.


## Installation

To get this app installed & working, follow the instructions to install React Native here
[React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)

Then run `react-native start` in the Githubr directory w/ your Android Simulator running