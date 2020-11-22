import cherrypy
from classes.song import Songs
from classes.album import Albums

if __name__ == '__main__':
    cherrypy.tree.mount(
        Albums(), '/api/albums',
        {'/':
            {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
         }
    )
    cherrypy.tree.mount(
        Songs(), '/api/songs',
        {'/':
            {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
         }
    )
   

    cherrypy.engine.start()
    cherrypy.engine.block()