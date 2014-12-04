#!-*- coding:utf-8 -*-
import os
import cgi
import wsgiref.handlers

from google.appengine.ext.webapp import template
from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext import webapp

import json

def main():
  application = webapp.WSGIApplication([
    ('/', MainPage), 
    ('/json/', JsonList), 
    ('/add', JsonAdd), 
    ('/update', JsonUpdate), 
    ('/json/view/([-\w]+)', JsonView),
    ('/json/history/([-\w]+)', JsonHistory),
    ('/json/histories/([-\w]+)', JsonHistories),
    ('/html/', HtmlMainPage), 
    ('/html/add', HtmlAdd), 
    ('/html/view/([-\w]+)', HtmlView),
    ('/html/viewHistory/([-\w]+)', HtmlViewHistory),
    ('/html/update', HtmlUpdate)
    ], debug=True)
  wsgiref.handlers.CGIHandler().run(application)













































class Vocab(db.Model):
  date = db.DateTimeProperty(auto_now_add=True)
  author = db.UserProperty()
  name = db.StringProperty()
  diagram = db.TextProperty()
  updated = db.DateTimeProperty(auto_now=True)
  locked = db.BooleanProperty(default=False)
  archived = db.BooleanProperty(default=False)
  published = db.BooleanProperty(default=False)
  
class VocabHistory(db.Model):
  vocab = db.ReferenceProperty(Vocab, collection_name='histories')
  author = db.UserProperty()
  name = db.StringProperty()
  diagram = db.TextProperty()
  updated = db.DateTimeProperty()
  locked = db.BooleanProperty(default=False)
  archived = db.BooleanProperty(default=False)
  published = db.BooleanProperty(default=False)


 































class JsonList(webapp.RequestHandler):
  def get(self):
    vocabsPublic = Vocab.all().filter('published = ',True)
    vocabsPersonal = []
    authenticated = ""
    
    if users.get_current_user():
      vocabsPersonal = Vocab.all().filter('author = ', users.get_current_user())
      authenticated = users.get_current_user().nickname()
      if self.request.get('archived') != "on":
        vocabsPersonal.filter('archived = ', False)
        vocabsPublic.filter('archived = ', False)
      vocabsPersonal.order('name')
    else:
      vocabsPublic.filter('archived = ', False)

    vocabsPublic.order('name')

    vPublic = []
    for vocab in vocabsPublic:
      usr = vocab.author
      if not users.get_current_user() or users.get_current_user() != usr:
        if usr:
          usr = usr.nickname()
        item = {'key' : str(vocab.key()),
                'archived' : vocab.archived,
                'locked' : vocab.locked,
                'author' : usr,
                'date' : vocab.date.strftime('%Y.%m.%d %H:%M:%S'),
                'name' : vocab.name }
        vPublic.append(item)
      
    vPersonal = []
    for vocab in vocabsPersonal:
      item = {'key' : str(vocab.key()),
              'archived' : vocab.archived,
              'locked' : vocab.locked,
              'published' : vocab.published,
              'date' : vocab.date.strftime('%Y.%m.%d %H:%M:%S'),
              'name' : vocab.name }
      vPersonal.append(item)
      
    self.response.out.write(json.write({
        'public': vPublic, 
        'personal': vPersonal, 
        'authenticated': authenticated,
        'archived': self.request.get('archived')
        }))














class JsonView(webapp.RequestHandler):
  def get(self,vocab_key):
    if vocab_key:
      vocab = Vocab.get(vocab_key)
      if not vocab:
        self.error(403)
        return
    else:
        self.error(403)
        return

    if users.get_current_user():
      authenticated = users.get_current_user().nickname()

    withHistory = False
    if vocab.histories.count():
      withHistory = True

    editable = False
    if vocab.author:
      if users.get_current_user() and (vocab.author == users.get_current_user() or not vocab.locked):
            editable = True
    else:
        editable = True

    ret = json.write({
        'archived': vocab.archived, 
        'locked': vocab.locked, 
        'published': vocab.published, 
        'editable': editable,
        'withHistory': withHistory,
        'updated': vocab.updated.strftime('%Y.%m.%d %H:%M:%S'),
        'diagram': "PUTDIAGRAM"
        })
    
    self.response.out.write(ret.replace('"PUTDIAGRAM"',vocab.diagram))

    



class JsonHistories(webapp.RequestHandler):
  def get(self,vocab_key):
    if vocab_key:
      vocab = Vocab.get(vocab_key)
      if not vocab:
        self.error(403)
        return
    else:
        self.error(403)
        return

    vocabHistories = []
    for history in vocab.histories.order('-updated'):
      author = ''
      if history.author:
        author = history.author.nickname()
      item = {'key': str(history.key()), 'name': history.name, 'updated': history.updated.strftime('%Y.%m.%d %H:%M:%S'), 'archived': history.archived, 'locked': history.locked, 'published': history.published, 'author': author}
      vocabHistories.append(item)

    self.response.out.write(json.write(vocabHistories))




class JsonHistory(webapp.RequestHandler):
  def get(self,history_key):
    if history_key:
      history = VocabHistory.get(history_key)
      if not history:
        self.error(403)
        return
    else:
        self.error(403)
        return

    ret = json.write({
        'diagram': "PUTDIAGRAM"
        })
    
    self.response.out.write(ret.replace('"PUTDIAGRAM"',history.diagram))

    
















class JsonAdd(webapp.RequestHandler):
  def post(self):
    vocab = Vocab()
    if users.get_current_user():
      vocab.author = users.get_current_user()
      if self.request.get('published') == "true":
        vocab.published = True
      if self.request.get('archived') == "true":
        vocab.archived = True
    else:
      vocab.published = True
    vocab.name = self.request.get('name') 
    vocab.diagram = self.request.get('diagram') 
    vocab.put()
    k = '%s' % vocab.key()
    self.response.out.write(json.write({
        'key': k,
        'updated': vocab.updated.strftime('%Y.%m.%d %H:%M:%S')
        }))

class JsonUpdate(webapp.RequestHandler):
  def post(self):
    vocab_key = self.request.get('key')

    if vocab_key:
      vocab = Vocab.get(vocab_key)
      if not vocab:
        self.error(403)
        return
    else:
        self.error(403)
        return

    h = VocabHistory()
    h.vocab = vocab
    h.author = vocab.author 
    h.name = vocab.name
    h.diagram = vocab.diagram
    h.updated = vocab.updated
    h.locked = vocab.locked
    h.archived = vocab.archived
    h.published = vocab.published
    h.put()

    if vocab.author:
      if not vocab.published and self.request.get('published') == "true":
        vocab.published = True

    if users.get_current_user():
      vocab.author = users.get_current_user()
      if self.request.get('archived') == "true":
        vocab.archived = True
      else:
        vocab.archived = False
      if vocab.published:
        if self.request.get('locked') == "true":
          vocab.locked = True
        else:
          vocab.locked = False

    vocab.name = self.request.get('name') 
    vocab.diagram = self.request.get('diagram')

    vocab.put()
    vocab = Vocab.get(vocab_key)

    k = '%s' % vocab.key()
    self.response.out.write(json.write({
        'key': k,
        'updated': vocab.updated.strftime('%Y.%m.%d %H:%M:%S')
        }))







































class MainPage(webapp.RequestHandler):
  def get(self):
    if users.get_current_user():
      url = users.create_logout_url(self.request.uri)
      url_linktext = 'logout'
      user_text = users.get_current_user().nickname() + ' | '
    else:
      url = users.create_login_url(self.request.uri)
      url_linktext = 'login'
      user_text = ""

    template_values = {
        'url': url,
        'url_linktext': url_linktext,
        'user_text': user_text
    }
    path = os.path.join(os.path.dirname(__file__), 'templates/index.html')
    self.response.out.write(template.render(path, template_values))




















class HtmlMainPage(webapp.RequestHandler):
  def get(self):
    vocabs = Vocab.all().filter('published = ',True)
    vocabsPersonal = []

    if users.get_current_user():
      url = users.create_logout_url(self.request.uri)
      url_linktext = 'logout'
      user_text = users.get_current_user().nickname() + ' | '
      vocabsPersonal = Vocab.all().filter('author = ', users.get_current_user())
      if self.request.get('archived') != "on":
        vocabsPersonal.filter('archived = ', False)
        vocabs.filter('archived = ', False)
    else:
      url = users.create_login_url(self.request.uri)
      url_linktext = 'login'
      user_text = ""

    if self.request.get('archived') != "on":
      url_archive = "/html/?archived=on"
      url_archivetext = "Show archived vocabs"
    else:
      url_archive = "/html/"
      url_archivetext = "No show archived vocabs"

    vocabs.order('-date')
    self.response.headers['Content-Type'] = 'text/html; charset=utf-8'
    template_values = {
        'vocabs': vocabs,
        'vocabsPersonal': vocabsPersonal,
        'url': url,
        'url_linktext': url_linktext,
        'url_archive': url_archive,
        'url_archivetext': url_archivetext,
        'user_text': user_text,
        'authenticated': users.get_current_user()
      }
    path = os.path.join(os.path.dirname(__file__), 'templates/html/index.html')
    self.response.out.write(template.render(path, template_values))

class HtmlView(webapp.RequestHandler):
  def get(self,vocab_key):
    self.response.headers['Content-Type'] = 'text/html; charset=utf-8'

    if vocab_key:
      vocab = Vocab.get(vocab_key)
      if not vocab:
        self.error(403)
        return
    else:
        self.error(403)
        return

    if users.get_current_user():
      url = users.create_logout_url(self.request.uri)
      url_linktext = 'logout'
      user_text = users.get_current_user().nickname() + ' | '
    else:
      url = users.create_login_url(self.request.uri)
      url_linktext = 'login'
      user_text = ""


    editable = False
    if vocab.author:
      if users.get_current_user() and (vocab.author == users.get_current_user() or not vocab.locked):
            editable = True
    else:
        editable = True

    template_values = {
        'vocab': vocab,
        'histories': vocab.histories,
        'url': url,
        'url_linktext': url_linktext,
        'user_text': user_text,
        'editable': editable,
        'authenticated': users.get_current_user()
      }
    path = os.path.join(os.path.dirname(__file__), 'templates/html/view.html')
    self.response.out.write(template.render(path, template_values))


class HtmlViewHistory(webapp.RequestHandler):
  def get(self,vocabHistory_key):
    self.response.headers['Content-Type'] = 'text/html; charset=utf-8'

    if vocabHistory_key:
      vocab = VocabHistory.get(vocabHistory_key)
      if not vocab:
        self.error(403)
        return
    else:
        self.error(403)
        return

    if users.get_current_user():
      url = users.create_logout_url(self.request.uri)
      url_linktext = 'logout'
      user_text = users.get_current_user().nickname() + ' | '
    else:
      url = users.create_login_url(self.request.uri)
      url_linktext = 'login'
      user_text = ""


    template_values = {
        'vocab': vocab,
        'url': url,
        'url_linktext': url_linktext,
        'user_text': user_text,
        'authenticated': users.get_current_user()
      }
    path = os.path.join(os.path.dirname(__file__), 'templates/html/viewHistory.html')
    self.response.out.write(template.render(path, template_values))


class HtmlAdd(webapp.RequestHandler):
  def post(self):
    vocab = Vocab()
    if users.get_current_user():
      vocab.author = users.get_current_user()
    else:
      vocab.published = True
    vocab.name = self.request.get('name') 
    vocab.diagram = self.request.get('diagram') 
    vocab.put()
    self.redirect('/html/')

class HtmlUpdate(webapp.RequestHandler):
  def post(self):
    vocab_key = self.request.get('key')

    if vocab_key:
      vocab = Vocab.get(vocab_key)
      if not vocab:
        self.error(403)
        return
    else:
        self.error(403)
        return

    h = VocabHistory()
    h.vocab = vocab
    h.author = vocab.author 
    h.name = vocab.name
    h.diagram = vocab.diagram
    h.updated = vocab.updated
    h.locked = vocab.locked
    h.archived = vocab.archived
    h.published = vocab.published
    h.put()

    if vocab.author:
      if not vocab.published and self.request.get('published'):
        vocab.published = True
      if vocab.published:
        if self.request.get('locked'):
          vocab.locked = True
        else:
          vocab.locked = False


    if users.get_current_user():
      vocab.author = users.get_current_user()
      if self.request.get('archived'):
        vocab.archived = True
      else:
        vocab.archived = False

    vocab.name = self.request.get('name') 
    vocab.diagram = self.request.get('diagram')

    vocab.put()

    self.redirect('/html/')

if __name__ == '__main__':
  main()
