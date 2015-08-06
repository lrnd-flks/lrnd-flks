# stylesheet switcher

linkIsProper = (link) ->
    if (link.getAttribute 'rel') . indexOf 'style' isnt -1 and
    link.getAttribute 'title'
    then true
    else false

links = () ->
    a for a in document.getElementsByTagName 'link' when linkIsProper a

setActiveStyleSheet = (title) ->
    (if (a.getAttribute 'title') == title
    then a.disabled = false
    else a.disabled = true ) for a in links()

getActiveStyleSheet = () ->
    (a.getAttribute 'title' for a in links() when not a.disabled)[0]

getPreferredStyleSheet = () ->
    (a.getAttribute 'title' for a in links() when !a.getAttribute 'disabled')[0]

createCookie = (name, value, days) ->
    if days
        date = new Date()
        date.setTime (date.getTime() + days * 24*60*60*1000)
        expires = '; expires=' + date.toGMTString()
    else
        expires = ''
    document.cookie = name + '=' + value + expires + '; path=/'

readCookie = (name) ->
    ca = ( a for a in document.cookie.split ';'  ) .reduce (t,c) ->
            console.log(c)
            cs = c.split '='
            t[ cs[0] ] = cs[1]
            t
        , {}
    ca[name]

setMyStyle = () ->
    cookie = readCookie 'style'
    console.log '...cookie...' + cookie
    title = cookie ? cookie : getPreferredStyleSheet()
    console.log 'default... ' + title
    setActiveStyleSheet title

window.onload = (e) ->
    setMyStyle()
    for a in document.getElementsByClassName 'css-switch'
        console.log 'event set... ' + a.id
        a .addEventListener 'click', ->
            setActiveStyleSheet (this.id)
            for b in document.getElementsByClassName 'css-switch'
                b.classList.remove 'active'
            this.classList.add 'active'
            console.log 'click... ' + this.id


window.onunload = (e) ->
    title = getActiveStyleSheet()
    createCookie 'style', title, 365

setMyStyle()

