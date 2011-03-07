(function() {
  /*
  Copyright (c) 2002-2011 "Neo Technology,"
  Network Engine for Objects in Lund AB [http://neotechnology.com]

  This file is part of Neo4j.

  Neo4j is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.
  */  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['lib/backbone'], function() {
    var DataBrowserState;
    return DataBrowserState = (function() {
      function DataBrowserState() {
        this.setData = __bind(this.setData, this);;
        this.setQuery = __bind(this.setQuery, this);;
        this.getEscapedQuery = __bind(this.getEscapedQuery, this);;
        this.initialize = __bind(this.initialize, this);;        DataBrowserState.__super__.constructor.apply(this, arguments);
      }
      __extends(DataBrowserState, Backbone.Model);
      DataBrowserState.prototype.defaults = {
        type: null,
        data: null,
        query: "",
        queryOutOfSyncWithData: true
      };
      DataBrowserState.prototype.initialize = function(options) {
        return this.server = options.server;
      };
      DataBrowserState.prototype.getEscapedQuery = function() {
        return encodeURIComponent(this.get("query"));
      };
      DataBrowserState.prototype.setQuery = function(val, isForCurrentData, opts) {
        if (isForCurrentData == null) {
          isForCurrentData = false;
        }
        if (opts == null) {
          opts = {};
        }
        this.set({
          "queryOutOfSyncWithData": !isForCurrentData
        }, opts);
        return this.set({
          "query": val
        }, opts);
      };
      DataBrowserState.prototype.setData = function(result, basedOnCurrentQuery, opts) {
        if (basedOnCurrentQuery == null) {
          basedOnCurrentQuery = true;
        }
        if (opts == null) {
          opts = {};
        }
        this.set({
          "data": result,
          "queryOutOfSyncWithData": basedOnCurrentQuery
        }, {
          silent: true
        });
        if (result instanceof neo4j.models.Node) {
          return this.set({
            type: "node"
          }, opts);
        } else if (result instanceof neo4j.models.Relationship) {
          return this.set({
            type: "relationship"
          }, opts);
        } else if (_(result).isArray()) {
          return this.set({
            type: "list"
          }, opts);
        } else {
          return this.set({
            "data": null,
            type: "not-found"
          }, opts);
        }
      };
      return DataBrowserState;
    })();
  });
}).call(this);
