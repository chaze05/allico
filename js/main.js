/* ==========================================================================
   ALL ICO — bilingual launch tracker
   Vanilla JS, no dependencies. Data-driven render + i18n + animations.
   ========================================================================== */
(function () {
	"use strict";

	/* ----------------------------------------------------------------------
	   i18n dictionary
	   ---------------------------------------------------------------------- */
	var I18N = {
		en: {
			"a11y.skip": "Skip to content",
			"a11y.menu": "Menu",
			"a11y.backToTop": "Back to top",
			"nav.trending": "Trending",
			"nav.launches": "Launches",
			"nav.support": "Support",
			"nav.submit": "Submit ICO",
			"hero.eyebrow": "ALL ICO · Ether Lab",
			"hero.titleA": "Hot and trending",
			"hero.titleB": "ICOs",
			"hero.lede": "Track live token launches — progress, ratings, countdowns and favorites in one clean dashboard.",
			"hero.cta1": "Explore launches",
			"hero.cta2": "View all projects",
			"stats.raised": "Total raised",
			"stats.tracked": "Projects tracked",
			"stats.active": "Active launches",
			"stats.rating": "Avg. rating",
			"trending.eyebrow": "Trending now",
			"trending.title": "Hot launches this month",
			"trending.note": "Swipe to browse →",
			"projects.eyebrow": "Launch tracker",
			"projects.title": "All ICOs & token launches",
			"tabs.all": "All",
			"tabs.live": "Live",
			"tabs.upcoming": "Upcoming",
			"tabs.ended": "Ended",
			"tabs.favorites": "Favorites",
			"table.name": "Name",
			"table.opened": "Opened",
			"table.closes": "Closes",
			"table.progress": "Progress",
			"table.description": "Description",
			"table.empty": "No projects match this filter yet.",
			"table.emptyHint": "Tap the star on any project to save it here.",
			"status.live": "Live",
			"status.upcoming": "Upcoming",
			"status.ended": "Ended",
			"cd.timeLeft": "Time left",
			"cd.startsIn": "Starts in",
			"cd.ended": "Ended",
			"footer.about": "About ICO",
			"footer.about1": "Company",
			"footer.about2": "Team",
			"footer.about3": "ICO advisors",
			"footer.about4": "Partners",
			"footer.policy": "Policy",
			"footer.policy1": "Terms & policy",
			"footer.policy2": "Investment risk",
			"footer.policy3": "Privacy policy",
			"footer.cs": "CS Center",
			"footer.cs1": "Contact",
			"footer.cs2": "1:1 inquiry",
			"footer.cs3": "FAQ",
			"footer.cs4": "Submit ICO",
			"support.title": "Enjoying the service?",
			"support.sub": "Even a small donation is a big help!",
			"footer.rights": "All rights reserved.",
			"footer.credit": "Bilingual demo rebuild — hand-coded HTML, CSS & JavaScript."
		},
		ko: {
			"a11y.skip": "본문으로 건너뛰기",
			"a11y.menu": "메뉴",
			"a11y.backToTop": "맨 위로",
			"nav.trending": "트렌딩",
			"nav.launches": "런치 목록",
			"nav.support": "후원",
			"nav.submit": "ICO 등록",
			"hero.eyebrow": "ALL ICO · 이더랩",
			"hero.titleA": "지금 뜨는",
			"hero.titleB": "ICO",
			"hero.lede": "실시간 진행 상황, 평가, 카운트다운까지 — 한눈에 확인하는 토큰 런치 트래커.",
			"hero.cta1": "런치 둘러보기",
			"hero.cta2": "전체 프로젝트",
			"stats.raised": "총 모금액",
			"stats.tracked": "추적 프로젝트",
			"stats.active": "진행 중 런치",
			"stats.rating": "평균 평점",
			"trending.eyebrow": "지금 트렌딩",
			"trending.title": "이번 달 인기 런치",
			"trending.note": "← 옆으로 넘겨보세요",
			"projects.eyebrow": "런치 트래커",
			"projects.title": "전체 ICO & 토큰 런치",
			"tabs.all": "전체",
			"tabs.live": "진행중",
			"tabs.upcoming": "진행예정",
			"tabs.ended": "종료",
			"tabs.favorites": "즐겨찾기",
			"table.name": "이름",
			"table.opened": "시작일",
			"table.closes": "종료일",
			"table.progress": "진행률",
			"table.description": "소개",
			"table.empty": "이 필터에 해당하는 프로젝트가 아직 없어요.",
			"table.emptyHint": "별표를 눌러 프로젝트를 저장해 보세요.",
			"status.live": "진행중",
			"status.upcoming": "진행예정",
			"status.ended": "종료",
			"cd.timeLeft": "남은 시간",
			"cd.startsIn": "시작까지",
			"cd.ended": "종료됨",
			"footer.about": "회사 소개",
			"footer.about1": "회사 소개",
			"footer.about2": "개발 팀",
			"footer.about3": "ICO 어드바이저",
			"footer.about4": "제휴 회사",
			"footer.policy": "정책",
			"footer.policy1": "약관 및 정책",
			"footer.policy2": "투자위험경고",
			"footer.policy3": "개인정보 처리방침",
			"footer.cs": "고객센터",
			"footer.cs1": "문의",
			"footer.cs2": "1:1 문의하기",
			"footer.cs3": "자주하는 질문",
			"footer.cs4": "신규 ICO 등록",
			"support.title": "서비스가 만족스러우셨나요?",
			"support.sub": "작은 기부도 저희에게 큰 힘이 됩니다!",
			"footer.rights": "모든 권리 보유.",
			"footer.credit": "한영 데모 리빌드 — 직접 코딩한 HTML, CSS, JavaScript."
		}
	};

	var TITLES = {
		en: "ALL ICO — Live ICO & Token Launch Tracker",
		ko: "ALL ICO — 실시간 ICO & 토큰 런치 트래커"
	};

	/* ----------------------------------------------------------------------
	   Demo data — status is computed from the dates, so it stays truthful.
	   ---------------------------------------------------------------------- */
	var SOCIAL_ICONS = {
		web: "img/web-icon.png",
		twitter: "img/twitter-icon.png",
		mail: "img/mail-icon.png",
		facebook: "img/fb-icon.png",
		linkedin: "img/linkedin-icon.png",
		blog: "img/b-icon.png"
	};

	var PROJECTS = [
		{
			id: "vinchain",
			name: "VINCHAIN",
			ticker: "VIN",
			rating: 4.6,
			opened: "2026-09-28T12:00:00",
			closes: "2026-11-02T12:00:00",
			progress: 78,
			featured: true,
			icon: { type: "wordmark", src: "img/vnchain-icon.png" },
			g1: "rgba(56, 189, 248, 0.45)",
			g2: "rgba(37, 99, 235, 0.5)",
			desc: {
				en: "Track-and-trace supply chain protocol connecting manufacturers and logistics partners.",
				ko: "제조사와 물류 파트너를 잇는 공급망 추적 프로토콜."
			},
			socials: ["web", "twitter", "mail", "facebook", "linkedin", "blog"]
		},
		{
			id: "faceter",
			name: "FACETER",
			ticker: "FCT",
			rating: 4.2,
			opened: "2026-09-20T12:00:00",
			closes: "2026-10-30T12:00:00",
			progress: 64,
			featured: true,
			icon: { type: "square", src: "img/comp-icon.png" },
			g1: "rgba(124, 58, 237, 0.45)",
			g2: "rgba(34, 211, 238, 0.35)",
			desc: {
				en: "Computer-vision surveillance network turning any camera into a smart sensor.",
				ko: "일반 카메라를 스마트 센서로 바꾸는 비전 감시 네트워크."
			},
			socials: ["web", "twitter", "mail", "facebook", "linkedin", "blog"]
		},
		{
			id: "bitcoin-cash",
			name: "Bitcoin Cash",
			ticker: "BCH",
			rating: 4.0,
			opened: "2026-09-12T12:00:00",
			closes: "2026-10-26T12:00:00",
			progress: 41,
			featured: true,
			icon: { type: "wordmark", src: "img/bcash-icon.png" },
			g1: "rgba(52, 211, 153, 0.4)",
			g2: "rgba(37, 99, 235, 0.4)",
			desc: {
				en: "Fast, low-fee peer-to-peer payments for everyday spending.",
				ko: "일상 결제를 위한 빠르고 저렴한 P2P 결제 네트워크."
			},
			socials: ["web", "twitter", "mail", "facebook", "linkedin", "blog"]
		},
		{
			id: "lumenchain",
			name: "LumenChain",
			ticker: "LUM",
			rating: 4.4,
			opened: "2026-11-01T12:00:00",
			closes: "2026-12-20T12:00:00",
			progress: 0,
			featured: true,
			icon: { type: "mono", label: "LC" },
			g1: "rgba(251, 191, 36, 0.4)",
			g2: "rgba(249, 115, 22, 0.35)",
			desc: {
				en: "Layer-2 scaling network for near-instant micro-transactions.",
				ko: "초고속 소액 결제를 위한 레이어2 스케일링 네트워크."
			},
			socials: ["web", "twitter", "mail", "facebook", "linkedin", "blog"]
		},
		{
			id: "orbitpay",
			name: "OrbitPay",
			ticker: "ORB",
			rating: 3.8,
			opened: "2026-10-01T12:00:00",
			closes: "2026-11-15T12:00:00",
			progress: 22,
			featured: false,
			icon: { type: "mono", label: "OP" },
			g1: "rgba(37, 99, 235, 0.45)",
			g2: "rgba(34, 211, 238, 0.35)",
			desc: {
				en: "Cross-border payment rail settling merchant payouts in stablecoins.",
				ko: "스테이블코인으로 정산하는 국경 없는 결제 레일."
			},
			socials: ["web", "twitter", "mail", "linkedin"]
		},
		{
			id: "nebulagrid",
			name: "NebulaGrid",
			ticker: "NBG",
			rating: 3.9,
			opened: "2026-11-10T12:00:00",
			closes: "2027-01-15T12:00:00",
			progress: 0,
			featured: false,
			icon: { type: "mono", label: "NG" },
			g1: "rgba(124, 58, 237, 0.5)",
			g2: "rgba(56, 189, 248, 0.35)",
			desc: {
				en: "Decentralised compute marketplace for AI training workloads.",
				ko: "AI 학습 연산을 분산 처리하는 컴퓨트 마켓플레이스."
			},
			socials: ["web", "twitter", "mail", "blog"]
		},
		{
			id: "bitcoin",
			name: "Bitcoin",
			ticker: "BTC",
			rating: 4.9,
			opened: "2026-06-01T12:00:00",
			closes: "2026-08-30T12:00:00",
			progress: 100,
			featured: false,
			icon: { type: "wordmark", src: "img/btc-icon.png" },
			g1: "rgba(249, 115, 22, 0.42)",
			g2: "rgba(251, 191, 36, 0.3)",
			desc: {
				en: "The original cryptocurrency — digital gold and a store of value.",
				ko: "최초의 암호화폐, 디지털 금이자 가치 저장 수단."
			},
			socials: ["web", "twitter", "mail", "facebook", "linkedin", "blog"]
		},
		{
			id: "zenistack",
			name: "ZeniStack",
			ticker: "ZEN",
			rating: 4.1,
			opened: "2026-05-05T12:00:00",
			closes: "2026-07-18T12:00:00",
			progress: 88,
			featured: false,
			icon: { type: "mono", label: "ZS" },
			g1: "rgba(52, 211, 153, 0.42)",
			g2: "rgba(34, 211, 238, 0.3)",
			desc: {
				en: "Modular DeFi toolkit for automated yield strategies.",
				ko: "자동 수익 전략을 위한 모듈형 디파이 툴킷."
			},
			socials: ["web", "twitter", "mail", "linkedin", "blog"]
		}
	];

	/* ----------------------------------------------------------------------
	   State
	   ---------------------------------------------------------------------- */
	var store = {
		get: function (key, fallback) {
			try {
				var raw = localStorage.getItem(key);
				return raw === null ? fallback : JSON.parse(raw);
			} catch (e) {
				return fallback;
			}
		},
		set: function (key, value) {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch (e) { /* private mode — ignore */ }
		}
	};

	var lang = store.get("allico.lang", null);
	if (lang !== "ko" && lang !== "en") {
		lang = (navigator.language || "en").toLowerCase().indexOf("ko") === 0 ? "ko" : "en";
	}

	var favorites = store.get("allico.favs", []);
	if (!Array.isArray(favorites)) {
		favorites = [];
	}

	var state = { filter: "all", sortKey: null, sortDir: 1 };

	function t(key) {
		return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
	}

	/* ----------------------------------------------------------------------
	   Helpers
	   ---------------------------------------------------------------------- */
	function statusOf(p) {
		var now = Date.now();
		if (now < Date.parse(p.opened)) return "upcoming";
		if (now < Date.parse(p.closes)) return "live";
		return "ended";
	}

	function formatDate(iso) {
		try {
			return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-GB", {
				year: "numeric", month: "2-digit", day: "2-digit"
			}).format(new Date(iso));
		} catch (e) {
			return iso.slice(0, 10);
		}
	}

	function formatRemaining(ms) {
		var s = Math.max(0, Math.floor(ms / 1000));
		var d = Math.floor(s / 86400);
		var h = Math.floor((s % 86400) / 3600);
		var m = Math.floor((s % 3600) / 60);
		var sec = s % 60;
		var parts;
		if (lang === "ko") {
			parts = (d > 0 ? [d + "일"] : []).concat([h + "시간", m + "분", sec + "초"]);
		} else {
			parts = (d > 0 ? [d + "d"] : []).concat([h + "h", m + "m", sec + "s"]);
		}
		return parts.join(" ");
	}

	function iconMarkup(p, big) {
		if (p.icon.type === "wordmark") {
			if (big) {
				return '<span class="wordmark-chip"><img src="' + p.icon.src + '" alt="' + p.name + '" loading="lazy"></span>';
			}
			return monogramMarkup(p);
		}
		if (p.icon.type === "square") {
			return '<span class="chip-logo"' + (big ? ' style="--size:64px"' : "") + '><img src="' + p.icon.src + '" alt="' + p.name + '" loading="lazy"></span>';
		}
		return monogramMarkup(p, big);
	}

	function monogramMarkup(p, big) {
		var label = p.icon.label || p.ticker.slice(0, 2);
		return '<span class="monogram' + (big ? " monogram--lg" : " monogram--sm") + '" aria-hidden="true">' + label + "</span>";
	}

	function favButton(p) {
		var isFav = favorites.indexOf(p.id) !== -1;
		return '<button class="fav' + (isFav ? " is-fav" : "") + '" type="button" data-fav="' + p.id + '" aria-pressed="' + isFav + '" aria-label="Favorite ' + p.name + '">★</button>';
	}

	function statusBadge(p) {
		var s = statusOf(p);
		return '<span class="t-status t-status--' + s + '"><span class="dot"></span>' + t("status." + s) + "</span>";
	}

	function progressBlock(p, anim) {
		var s = statusOf(p);
		var cdLabel = s === "ended" ? "" : (s === "upcoming" ? t("cd.startsIn") : t("cd.timeLeft"));
		var deadline = s === "upcoming" ? p.opened : p.closes;
		return (
			'<div class="p-track" style="--p:' + p.progress + '">' +
				'<span class="p-fill"></span>' +
				'<span class="p-rocket"><span class="chip-logo"><img src="img/rocket-icon.png" alt=""></span></span>' +
			"</div>" +
			'<div class="p-meta">' +
				'<span class="pct">' + p.progress + "%</span>" +
				(cdLabel
					? '<span class="cd-label">' + cdLabel + "</span>"
					: "") +
				'<span class="cd" data-cd="' + Date.parse(deadline) + '" data-cd-status="' + s + '"></span>' +
			"</div>"
		);
	}

	function socialsMarkup(p) {
		return (
			'<div class="socials">' +
			p.socials
				.map(function (key) {
					return '<a href="#" aria-label="' + key + '"><img src="' + SOCIAL_ICONS[key] + '" alt="" loading="lazy"></a>';
				})
				.join("") +
			"</div>"
		);
	}

	function ratingMarkup(p) {
		return '<span class="cell-rating">★ ' + p.rating.toFixed(1) + "</span>";
	}

	/* ----------------------------------------------------------------------
	   Rendering
	   ---------------------------------------------------------------------- */
	var railEl = document.getElementById("trendingRail");
	var tableBody = document.getElementById("tableBody");
	var cardsList = document.getElementById("cardsList");
	var emptyState = document.getElementById("emptyState");

	function renderRail() {
		railEl.innerHTML = PROJECTS.filter(function (p) {
			return p.featured;
		})
			.map(function (p) {
				return (
					'<article class="t-card" data-anim>' +
						'<div class="t-media" style="--g1:' + p.g1 + ";--g2:" + p.g2 + '">' +
							iconMarkup(p, true) +
							'<span class="pill"><span class="star">★</span>' + p.rating.toFixed(1) + "</span>" +
							favButton(p) +
						"</div>" +
						'<div class="t-body">' +
							'<div class="t-head"><span class="t-name">' + p.name + '</span><span class="t-ticker">' + p.ticker + "</span></div>" +
							statusBadge(p) +
							'<p class="t-desc">' + p.desc[lang] + "</p>" +
							progressBlock(p) +
						"</div>" +
					"</article>"
				);
			})
			.join("");
	}

	function filteredProjects() {
		var list = PROJECTS.slice();
		if (state.filter === "favorites") {
			list = list.filter(function (p) {
				return favorites.indexOf(p.id) !== -1;
			});
		} else if (state.filter !== "all") {
			list = list.filter(function (p) {
				return statusOf(p) === state.filter;
			});
		}
		if (state.sortKey) {
			list.sort(function (a, b) {
				var dir = state.sortDir;
				switch (state.sortKey) {
					case "name":
						return a.name.localeCompare(b.name, lang) * dir;
					case "opened":
						return (Date.parse(a.opened) - Date.parse(b.opened)) * dir;
					case "closes":
						return (Date.parse(a.closes) - Date.parse(b.closes)) * dir;
					case "progress":
						return (a.progress - b.progress) * dir;
					default:
						return 0;
				}
			});
		}
		return list;
	}

	function renderTable(list) {
		tableBody.innerHTML = list
			.map(function (p) {
				return (
					"<tr data-anim>" +
						'<td><div class="cell-name">' + iconMarkup(p) +
							'<div class="cell-name-info"><div class="cell-name-line">' + ratingMarkup(p) +
							'<button class="cell-fav' + (favorites.indexOf(p.id) !== -1 ? " is-fav" : "") + '" type="button" data-fav="' + p.id + '" aria-label="Favorite ' + p.name + '">★</button></div>' +
							"<strong>" + p.name + '</strong><span class="cell-ticker">' + p.ticker + "</span></div>" +
						"</div></td>" +
						'<td><div class="cell-dates"><span class="d">' + formatDate(p.opened) + '</span><span class="d">' + t("status." + statusOf(p)) + "</span></div></td>" +
						'<td><div class="cell-dates"><span class="d">' + formatDate(p.closes) + "</span></div></td>" +
						'<td class="cell-progress">' + progressBlock(p) + "</td>" +
						'<td class="cell-desc"><p>' + p.desc[lang] + "</p>" + socialsMarkup(p) + "</td>" +
					"</tr>"
				);
			})
			.join("");
	}

	function renderCards(list) {
		cardsList.innerHTML = list
			.map(function (p) {
				return (
					'<article class="t-row-card" data-anim>' +
						'<div class="t-row-top">' + iconMarkup(p) +
							'<div class="t-row-title"><strong>' + p.name + '</strong><span class="cell-ticker">' + p.ticker + " · " + ratingMarkup(p) + "</span></div>" +
							'<button class="fav' + (favorites.indexOf(p.id) !== -1 ? " is-fav" : "") + '" type="button" data-fav="' + p.id + '" aria-label="Favorite ' + p.name + '">★</button>' +
						"</div>" +
						statusBadge(p) +
						'<p class="t-row-desc">' + p.desc[lang] + "</p>" +
						'<div class="t-row-meta"><span>' + t("table.opened") + ": " + formatDate(p.opened) + "</span><span>" + t("table.closes") + ": " + formatDate(p.closes) + "</span></div>" +
						progressBlock(p) +
						'<div class="t-row-bottom">' + socialsMarkup(p) + "</div>" +
					"</article>"
				);
			})
			.join("");
	}

	function updateTabCounts() {
		var counts = {
			all: PROJECTS.length,
			live: 0,
			upcoming: 0,
			ended: 0,
			favorites: favorites.length
		};
		PROJECTS.forEach(function (p) {
			counts[statusOf(p)]++;
		});
		Object.keys(counts).forEach(function (key) {
			var el = document.querySelector('[data-count-for="' + key + '"]');
			if (el) el.textContent = counts[key];
		});
	}

	function renderProjects() {
		var list = filteredProjects();
		renderTable(list);
		renderCards(list);
		emptyState.hidden = list.length !== 0;
		observeAnims();
		updateCountdowns();
	}

	/* ----------------------------------------------------------------------
	   Language
	   ---------------------------------------------------------------------- */
	function applyI18n() {
		document.documentElement.lang = lang;
		document.title = TITLES[lang];

		document.querySelectorAll("[data-i18n]").forEach(function (el) {
			var key = el.getAttribute("data-i18n");
			el.textContent = t(key);
		});

		document.querySelectorAll(".lang-opt").forEach(function (el) {
			el.classList.toggle("is-active", el.getAttribute("data-lang") === lang);
		});

		var topBtn = document.getElementById("toTop");
		if (topBtn) topBtn.setAttribute("aria-label", t("a11y.backToTop"));

		renderRail();
		renderProjects();
		moveTabIndicator();
	}

	/* ----------------------------------------------------------------------
	   Countdowns
	   ---------------------------------------------------------------------- */
	function updateCountdowns() {
		var els = document.querySelectorAll("[data-cd]");
		var now = Date.now();
		for (var i = 0; i < els.length; i++) {
			var el = els[i];
			var deadline = parseInt(el.getAttribute("data-cd"), 10);
			var diff = deadline - now;
			if (diff <= 0) {
				el.textContent = t("cd.ended");
				el.classList.add("cd--ended");
			} else {
				el.textContent = formatRemaining(diff);
				if (diff < 172800000) el.classList.add("cd--urgent");
			}
		}
	}
	setInterval(updateCountdowns, 1000);

	/* ----------------------------------------------------------------------
	   Observers — reveals, progress bars, counters
	   ---------------------------------------------------------------------- */
	var animObserver = null;
	if ("IntersectionObserver" in window) {
		animObserver = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-in");
						animObserver.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
		);
	}

	function observeAnims() {
		var nodes = document.querySelectorAll("[data-anim]:not(.is-in), .reveal:not(.is-in)");
		nodes.forEach(function (el) {
			if (animObserver) {
				animObserver.observe(el);
			} else {
				el.classList.add("is-in");
			}
		});
	}

	function initCounters() {
		var stats = document.querySelector(".hero-stats");
		if (!stats) return;
		var run = function () {
			stats.querySelectorAll(".count").forEach(function (el) {
				var target = parseFloat(el.getAttribute("data-count"));
				var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
				var prefix = el.getAttribute("data-prefix") || "";
				var suffix = el.getAttribute("data-suffix") || "";
				var start = null;
				var dur = 1400;
				function step(ts) {
					if (start === null) start = ts;
					var p = Math.min((ts - start) / dur, 1);
					var eased = 1 - Math.pow(1 - p, 3);
					var value = (target * eased).toFixed(decimals);
					el.textContent = prefix + value + suffix;
					if (p < 1) requestAnimationFrame(step);
				}
				requestAnimationFrame(step);
			});
		};
		if ("IntersectionObserver" in window) {
			var io = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							run();
							io.disconnect();
						}
					});
				},
				{ threshold: 0.3 }
			);
			io.observe(stats);
		} else {
			run();
		}
	}

	/* ----------------------------------------------------------------------
	   Tabs
	   ---------------------------------------------------------------------- */
	var tabsEl = document.getElementById("filterTabs");
	var indicator = tabsEl.querySelector(".tab-indicator");

	function moveTabIndicator() {
		var active = tabsEl.querySelector(".tab.is-active");
		if (!active) return;
		indicator.style.width = active.offsetWidth + "px";
		indicator.style.transform = "translateX(" + active.offsetLeft + "px)";
		indicator.style.left = "0";
		indicator.classList.add("is-ready");
	}

	tabsEl.addEventListener("click", function (e) {
		var btn = e.target.closest(".tab");
		if (!btn) return;
		state.filter = btn.getAttribute("data-filter");
		tabsEl.querySelectorAll(".tab").forEach(function (tab) {
			var isActive = tab === btn;
			tab.classList.toggle("is-active", isActive);
			tab.setAttribute("aria-selected", isActive ? "true" : "false");
		});
		moveTabIndicator();
		renderProjects();
	});

	/* ----------------------------------------------------------------------
	   Favorites (persisted)
	   ---------------------------------------------------------------------- */
	document.addEventListener("click", function (e) {
		var btn = e.target.closest("[data-fav]");
		if (!btn) return;
		var id = btn.getAttribute("data-fav");
		var index = favorites.indexOf(id);
		if (index === -1) {
			favorites.push(id);
		} else {
			favorites.splice(index, 1);
		}
		store.set("allico.favs", favorites);

		document.querySelectorAll('[data-fav="' + id + '"]').forEach(function (el) {
			var isFav = favorites.indexOf(id) !== -1;
			el.classList.toggle("is-fav", isFav);
			if (el.classList.contains("cell-fav")) return;
			el.classList.add("is-pop");
			setTimeout(function () {
				el.classList.remove("is-pop");
			}, 450);
		});

		updateTabCounts();
		if (state.filter === "favorites") {
			renderProjects();
		}
	});

	/* ----------------------------------------------------------------------
	   Sorting
	   ---------------------------------------------------------------------- */
	document.querySelectorAll(".launch-table th[data-sort]").forEach(function (th) {
		th.querySelector("button").addEventListener("click", function () {
			var key = th.getAttribute("data-sort");
			if (state.sortKey === key) {
				state.sortDir = -state.sortDir;
			} else {
				state.sortKey = key;
				state.sortDir = 1;
			}
			document.querySelectorAll(".launch-table th[data-sort]").forEach(function (h) {
				h.setAttribute("aria-sort", h === th ? (state.sortDir === 1 ? "ascending" : "descending") : "none");
			});
			renderProjects();
		});
	});

	/* ----------------------------------------------------------------------
	   Header, nav, language toggle, to-top
	   ---------------------------------------------------------------------- */
	var header = document.querySelector(".site-header");
	var navEl = document.getElementById("site-nav");
	var navToggle = document.getElementById("navToggle");
	var toTop = document.getElementById("toTop");

	window.addEventListener(
		"scroll",
		function () {
			header.classList.toggle("is-scrolled", window.scrollY > 8);
			toTop.classList.toggle("is-visible", window.scrollY > 620);
		},
		{ passive: true }
	);

	navToggle.addEventListener("click", function () {
		var open = navEl.classList.toggle("is-open");
		navToggle.setAttribute("aria-expanded", open ? "true" : "false");
	});

	navEl.addEventListener("click", function (e) {
		if (e.target.closest("a")) {
			navEl.classList.remove("is-open");
			navToggle.setAttribute("aria-expanded", "false");
		}
	});

	document.getElementById("langToggle").addEventListener("click", function () {
		lang = lang === "ko" ? "en" : "ko";
		store.set("allico.lang", lang);
		applyI18n();
	});

	toTop.addEventListener("click", function () {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	window.addEventListener("resize", function () {
		if (window.innerWidth > 900) {
			navEl.classList.remove("is-open");
			navToggle.setAttribute("aria-expanded", "false");
		}
		moveTabIndicator();
	});

	/* ----------------------------------------------------------------------
	   Boot
	   ---------------------------------------------------------------------- */
	document.getElementById("year").textContent = String(new Date().getFullYear());
	applyI18n();
	updateTabCounts();
	initCounters();
	observeAnims();

	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(moveTabIndicator);
	}
	window.addEventListener("load", moveTabIndicator);
})();
