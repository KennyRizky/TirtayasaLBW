<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>function CicaheumLedengProtocol(apikey, errorHandler) {
	// IE fix: when window.location.origin is not available 
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	var HANDLE_URL = window.location.origin + '/api';
	this.searchPlace = function(query, region, successHandler) {
		$.ajax({
			url: HANDLE_URL,
			type: "GET",
			data: {
				mode: "searchplace",
				version: "3",
				region: region,
				apikey: apikey,
				querystring: query
			},
			success: function(data) {
				successHandler(data);
			},
			error: function(jqxhr, textStatus, error) {
				errorHandler();
			}
		});
	};
	this.findRoute = function(start, finish, locale, successHandler) {
		$.ajax({
			url: HANDLE_URL,
			type: "GET",
			data: {
				mode: "findroute",
				version: "3",
				apikey: apikey,
				start: start,
				finish: finish,
				locale: locale,
				presentation: "desktop"
			},
			success: function(data) {
				successHandler(data);
			},
			error: function(jqxhr, textStatus, error) {
				errorHandler();
			}
		});
	};	
}
function TomTomProtocol(apikey, errorHandler) {
	this.findRoute = function(start, finish, successHandler) {
		var HANDLE_URL2 = 'https://api.tomtom.com/routing/1/calculateRoute/';
		HANDLE_URL2 += start + ':' + finish + '/json?key=' + apikey + '&computeTravelTimeFor=all';
		$.ajax({
			url: HANDLE_URL2,
			success: function(data) {
				console.log(data);
				successHandler(data);
			},
			error: function(jqxhr, textStatus, error) {
				errorHandler();
			}
		});
	};	
}