<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

$(document).ready(function () {
	var protocol = new TomTomProtocol(<?=json_encode($this->config->item('tomtom-key'))?>, function (message) {
		clearSecondaryAlerts();
		showAlert('<?=$this->lang->line("Connection problem")?>', 'alert');
	});

	function showRoutingResults(results) {
		clearStartFinishMarker();
		clearRoutingResultsOnTable();
		clearSecondaryAlerts();
		var kiriURL = encodeURIComponent('<?= base_url() ?>?start=' + encodeURIComponent($('#startInput').val()) + '&finish=' + encodeURIComponent($('#finishInput').val()) + '&region=' + region);
		var kiriMessage = encodeURIComponent('<?=$this->lang->line("I take public transport")?>'.replace('%finish%', $('#finishInput').val()).replace('%start%', $('#startInput').val()));
		var sectionContainer = $('<div></div>');
		var temp1 = $('<ul class="nav nav-tabs" role="tablist"></ul>');
		var temp2 = $('<div class="tab-content"></div>');
		$('#routingresults').append(sectionContainer);
		$.each(results.routingresults, function(resultIndex, result) {
			var resultHTML1 = resultIndex === 0 ? '<li><a class="nav-link active active-tabs ' : '<li><a class="nav-link ';
			resultHTML1 += 'text-decoration-none" data-toggle="tab" href="#panel1-' + (resultIndex + 1) + '" role="tab">' + (result.traveltime === null ? '<?=$this->lang->line("Oops")?>' : result.traveltime) + '</a></li>';
			var resultHTML2 = '<div id="panel1-' + (resultIndex + 1) + '"';
			resultHTML2 += resultIndex === 0 ? ' class="tab-pane active" role="tabpanel"><table class="table-striped">' : ' class="x tab-pane" role="tabpanel"><table class="table-striped">';
			$.each(result.steps, function (stepIndex, step) {
				resultHTML2 += '<tr><td class="p-1"><img src="../images/means/' + step[0] + '/' + step[1] + '.png" alt="' + step[1] + '"/></td><td class="p-1">' + step[3];
				resultHTML2 += '</td></tr>';
			});
			resultHTML2 += "<tr><td class=\"p-1 center\" colspan=\"2\">";
			resultHTML2 += "<a target=\"_blank\" href=\"https://www.facebook.com/sharer/sharer.php?u=" + kiriURL + "\"><img alt=\"Share to Facebook\" src=\"images/fb-large.png\"/></a> &nbsp; &nbsp; ";
			resultHTML2 += "<a target=\"_blank\" href=\"https://twitter.com/intent/tweet?via=kiriupdate&text=" + kiriMessage + "+" + kiriURL + "\"><img alt=\"Tweet\" src=\"images/twitter-large.png\"/></a>";
			resultHTML2 += "</td></tr>\n";
			resultHTML2 += '</table></div>';
			temp1.append(resultHTML1);
			temp2.append(resultHTML2);
		});
		sectionContainer.append(temp1);
		sectionContainer.append(temp2);

		$(".nav .nav-link").on("click", function(){
			$(".nav").find(".active").removeClass("active");
			$(".tab-pane").removeClass("active");
			$(this).addClass("active");
			$($(this).attr("href")).addClass("active");
		});

		$.each(results.routingresults, function(resultIndex, result) {
			$('a[href="#panel1-' + (resultIndex + 1) + '"]').click(function() {
				showSingleRoutingResultOnMap(result);
			});
		});
		showSingleRoutingResultOnMap(results.routingresults[0]);
	}
});
