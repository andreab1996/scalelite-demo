import cherrypy
import json

albums = {
    '1': {
        'title': 'Lumberjack Album',
        'artist': 'Canadian Guard Choir'
    },

    '2': {
        'title': 'Always Look On the Bright Side of Life',
        'artist': 'Eric Idle'
    },

    '3': {
        'title': 'Spam Spam Spam',
        'artist': 'Monty Python'
    }
}


class Albums:
    exposed = True
# @cherrypy.tools.json_in()
# data = cherrypy.request.json
#  @cherrypy.tools.json_out()
    @cherrypy.tools.json_out()
    def GET(self, id=None):

        if id is None:
            return albums
            # return('Here are all the Albums we have: %s' % albums)
        elif id in albums:
            album = albums[id]

            return(
                'Album with the ID %s is called %s, and the artist is %s' % (
                    id, album['title'], album['artist']))
        else:
            return('No Album with the ID %s :-(' % id)
# @cherrypy.tools.json_in()
# data = cherrypy.request.json
#  @cherrypy.tools.json_out()
    # @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self):
        id = str(max([int(_) for _ in albums.keys()]) + 1)

        cl = cherrypy.request.headers['Content-Length']
        rawbody = cherrypy.request.body.read(int(cl))
        newObject = json.loads(rawbody)

        albums[id] = {
            'title': newObject['title'],
            'artist': newObject['artist']
        }

        # return ('Create a new Album with the ID: %s' % id)
        return albums[id]

    def PUT(self, id, title=None, artist=None):
        if id in albums:
            albums = albums[id]

            album['title'] = title or album['title']
            album['artist'] = artist or album['artist']

            return(
                'Album with the ID %s is now called %s, '
                'and the artist is now %s' % (
                    id, album['title'], album['artist'])
            )
        else:
            return('No Album with the ID %s :-(' % id)

    def DELETE(self, id):
        if id in albums:
            albums.pop(id)

            return('Album with the ID %s has been deleted.' % id)
        else:
            return('No Album with the ID %s :-(' % id)