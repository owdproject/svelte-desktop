import { mount } from 'svelte'
import App from './App.svelte'
import './desktop.css'

mount(App, { target: document.getElementById('app')! })
