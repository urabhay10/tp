<script>
    import {io} from 'socket.io-client'
    import {onMount, onDestroy} from 'svelte'

    let messages = []
    let socket = io('ws://localhost:3001')

    onMount(() => {
      socket.on('message', (message) => {
        messages = [...messages, message]
      })
    })

    onDestroy(() => {
      socket.disconnect()
    })

    function sendMessage() {
      socket.emit('message', 'Hello')
    }


  </script>
  
  <!-- Basic UI for showing messages -->
  <h2>Messages</h2>
  <ul>
    {#each messages as message}
      <li>{message}</li>
    {/each}
  </ul>
  <button on:click={sendMessage}>Send Hello</button>
  