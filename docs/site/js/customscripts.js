$('#mysidebar').height($(".nav").height());

$( document ).ready(function() {
    $('#search-input').on("keyup", function (e) {
            if (e.target.value.length > 0 ) $(".search__results").addClass("active");
            else $(".search__results").removeClass("active");
          });
});

document.addEventListener("DOMContentLoaded", function() {
    /**
    * AnchorJS
    */
    if (window.anchors_disabled != true) {
        anchors.add('h2,h3,h4,h5');
    }

});

$( document ).ready(function() {
    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $(window).height();
    //console.log (h);
    if (h > 800) {
        // $( "#mysidebar" ).attr("class", "nav affix");
        // $( "#mysidebar" ).attr("class", "nav");
    }
    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });
});

$(document).ready(function() {
    var $notice = $('#notice');
    var $notice_collapse = $('#notice-collapse');
    var $notice_expand = $('#notice-expand');
    var notice_state = localStorage.getItem('notice-state') || 'expanded';

    function switchNotice(state) {
        $notice.attr('data-state', state);
        localStorage.setItem('notice-state', state);
    }

    switchNotice(notice_state);

    $notice_collapse.on('click', (e) => {
        e.preventDefault();
        switchNotice('collapsed');
    })
    $notice_expand.on('click', (e) => {
        e.preventDefault();
        switchNotice('expanded')
    })
});

/* Set share link */

$( document ).ready(function() {
    if ($.cookie("demotoken") || $.cookie("license-token") ) {
        let token = $.cookie("license-token") ? $.cookie("license-token") : $.cookie("demotoken");
        $('.notice__share_message a').prop('href','https://early.deckhouse.io/license-token/auth?token=' + token);
        $('.notice__share_message.disabled').removeClass("disabled");
    }
});

/* features tabs */

$(document).ready(function() {
    $('[data-features-tabs-trigger]').on('click', function() {
        var name = $(this).attr('data-features-tabs-trigger');
        var $parent = $(this).closest('[data-features-tabs]');
        var $triggers = $parent.find('[data-features-tabs-trigger]');
        var $contents = $parent.find('[data-features-tabs-content]');
        var $content = $parent.find('[data-features-tabs-content=' + name + ']');

        $triggers.removeClass('active');
        $contents.removeClass('active');

        $(this).addClass('active');
        $content.addClass('active');
    })
});

/* Request access */
var ra = {};
ra.api_url = 'https://license.deckhouse.io/api/license/request';

function raSend(e) {
    e.preventDefault();
    if ($('#h0n3y').val() != '') {
        raError()
    } else {
        $.ajax({
            type: 'POST',
            url: ra.api_url,
            data: ra.form.serialize(),
            dataType: 'json',
            success: raSuccess,
            error: raError
        });
    }
}
function raSuccess() {
    ra.intro.hide();
    ra.success.show();
}
function raError() {
    ra.intro.hide();
    ra.error.show();
}
function raClose() {
    ra.base.hide();
    ra.intro.show();
    ra.error.hide();
    ra.success.hide();
}
function raOpen() {
    ra.base.show();
}

$(document).ready(function() {
    ra.base = $('#request_access');
    ra.form = $('#request_access_form');
    ra.intro = $('#request_access_intro');
    ra.success = $('#request_access_success');
    ra.error = $('#request_access_error');

    ra.form.on('submit', raSend);
});

$(document).on('keydown', function(event) {
    event.key == "Escape" && raClose();
});
