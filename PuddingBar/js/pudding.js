$(document).ready(function() {
	var menuItemNum = $(".menu-item").length;
	var angle = 120;
	var distance = 80;
	var startingAngle = 180 + (-angle / 2);
	var slice = angle / (menuItemNum - 1);
	var xPos = {
		x: 0
	};
	TweenMax.globalTimeScale(0.8);
	$(".menu-item").each(function(i) {
		var angle = startingAngle + (slice * i);
		$(this).css({
			transform: "rotate(" + (angle) + "deg)"
		});
		$(this).find(".menu-item-icon").css({
			transform: "rotate(" + (-angle) + "deg)"
		});
	});
	//定位颜色小球
	$(".ball-orange").css({
		"left": -$(document).width() / 2 + "px",
		"top": -$(document).height() / 2 - 105 + "px"
	});
	$(".ball-yellow").css({
		"left": -$(document).width() / 2 + "px",
		"top": -$(document).height() / 2 - 60 + "px"
	});
	$(".ball-green").css({
		"left": -$(document).width() / 2 + "px",
		"top": -$(document).height() / 2 - 15 + "px"
	});
	$(".ball-bluegrey").css({
		"left": -$(document).width() / 2 + "px",
		"top": -$(document).height() / 2 + 30 + "px"
	});
	$(".ball-purple").css({
		"left": -$(document).width() / 2 + "px",
		"top": -$(document).height() / 2 + 75 + "px"
	});
	var on = false;

	$(".menu-toggle-button").mousedown(function() {
		TweenMax.to($(".menu-toggle-icon"), 0.1, {
			scale: 0.65
		});
	});
	$(document).mouseup(function() {
		TweenMax.to($(".menu-toggle-icon"), 0.1, {
			scale: 1
		});
	});
	$(document).on("touchend", function() {
		$(document).trigger("mouseup");
	});
	$(".menu-toggle-button").on("mousedown", pressHandler);
	$(".menu-toggle-button").on("touchstart", function(event) {
		$(this).trigger("mousedown");
		event.preventDefault();
		event.stopPropagation();
	});
	$(".ball").on("mousedown", function(event) {
		var $ball;
		var height = 0;
		var color;
		var yTop;
		switch(event.currentTarget.className) {
			case "ball ball-orange":
				$ball = $(".ball-orange");
				color = "#ff9800";
				yTop = $ball[0].offsetTop;
				height = $(document).height() + yTop;
				break;
			case "ball ball-yellow":
				$ball = $(".ball-yellow");
				color = "#ffeb3b";
				yTop = $ball[0].offsetTop;
				height = $(document).height() + yTop;
				break;
			case "ball ball-green":
				$ball = $(".ball-green");
				color = "#4caf50";
				yTop = $ball[0].offsetTop;
				height = $(document).height() + yTop;
				break;
			case "ball ball-bluegrey":
				$ball = $(".ball-bluegrey");
				color = "#607d8b";
				yTop = $ball[0].offsetTop;
				height = $(document).height() + yTop;
				break;
			case "ball ball-purple":
				$ball = $(".ball-purple");
				color = "#9c27b0";
				yTop = $ball[0].offsetTop;
				height = $(document).height() + yTop;
				break;
		}
		
		TweenMax.to($ball, 2.4, {
				y: -yTop - 40,
				onStart: function() {
					TweenMax.to($ball, 3, {
						x: $(document).width() / 2,
					});
				},
				onComplete: function() {
					TweenMax.fromTo($ball, 2.2, {
						x: 0,
						y: -height
					}, {
						y: 0,
						x: 0,
						onComplete: function() {
							$ball.css({
								"left": -$(document).width() / 2 + "px",
								"transform": "none"
							})
						},
						ease: Bounce.easeOut
					});
				},
				ease: Bounce.easeOut
			})

		TweenMax.set($(".menu-item-button")[0], {
			delay: 1.6,
			background: color
		})
		TweenMax.set([$(".menu-item-bounce"), $(".menu-list-back")], {
			delay: 1.8,
			background: color
		})
		TweenMax.set($(".menu-item-button")[1], {
			delay: 1.9,
			background: color
		})
		TweenMax.set($(".menu-item-button")[2], {
			delay: 2.0,
			background: color
		})
	});
	$(".ball").on("touchstart", function(event) {
		$(this).trigger("mousedown");
		event.preventDefault();
		event.stopPropagation();
	});

	function pressHandler(event) {
		on = !on;

		TweenMax.to($(this).children('.menu-toggle-icon'), 0.4, {
			rotation: on ? 45 : 0,
			ease: Quint.easeInOut,
			force3D: true
		});

		on ? openMenu() : closeMenu();
	}

	function openMenu() {
		$(".menu-item").each(function(i) {
			var delay = i * 0.08;

			var $bounce = $(this).children(".menu-item-bounce");

			TweenMax.fromTo($bounce, 0.2, {
				transformOrigin: "50% 50%"
			}, {
				delay: delay,
				scaleX: 0.8,
				scaleY: 1.2,
				force3D: true,
				ease: Quad.easeInOut,
				onComplete: function() {
					TweenMax.to($bounce, 0.15, {
						scaleX: 1,
						scaleY: 0.7,
						force3D: true,
						ease: Quad.easeInOut,
						onComplete: function() {
							TweenMax.to($bounce, 3, {
								scaleY: 1,
								force3D: true,
								ease: Elastic.easeOut,
								easeParams: [1.1, 0.12]
							});
						}
					});
				}
			});

			TweenMax.to($(this).children(".menu-item-button"), 0.5, {
				delay: delay,
				y: distance,
				force3D: true,
				ease: Quint.easeOut
			});
		});
		$('.menu-list-left').each(function() {
			TweenMax.to($(this), 1, {
				delay: 0.2,
				x: -15,
				ease: Elastic.easeOut.config(1, 0.2)
			});
		});
		$('.menu-list-right').each(function() {
			TweenMax.to($(this), 1, {
				delay: 0.2,
				x: 15,
				ease: Elastic.easeOut.config(1, 0.2)
			});
		});
	}

	function closeMenu() {
		$(".menu-item").each(function(i) {
			var delay = i * 0.08;

			var $bounce = $(this).children(".menu-item-bounce");

			TweenMax.fromTo($bounce, 0.2, {
				transformOrigin: "50% 50%"
			}, {
				delay: delay,
				scaleX: 1,
				scaleY: 0.8,
				force3D: true,
				ease: Quad.easeInOut,
				onComplete: function() {
					TweenMax.to($bounce, 0.15, {
						scaleY: 1.2,
						force3D: true,
						ease: Quad.easeInOut,
						onComplete: function() {
							TweenMax.to($bounce, 3, {
								scaleY: 1,
								force3D: true,
								ease: Elastic.easeOut,
								easeParams: [1.1, 0.12]
							});
						}
					});
				}
			});

			TweenMax.to($(this).children(".menu-item-button"), 0.5, {
				delay: delay,
				y: 0,
				force3D: true,
				ease: Quint.easeIn
			});
		});
		$('.menu-list-left').each(function() {
			TweenMax.to($(this), 1, {
				delay: 0.2,
				x: 0,
				ease: Elastic.easeOut.config(1, 0.2)
			});
		});
		$('.menu-list-right').each(function() {
			TweenMax.to($(this), 1, {
				delay: 0.2,
				x: 0,
				ease: Elastic.easeOut.config(1, 0.2)
			});
		});
	}
});