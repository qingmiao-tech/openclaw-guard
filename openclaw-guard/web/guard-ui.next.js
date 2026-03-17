/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Zt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Oe = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Fn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Le = () => {
}, pl = () => !1, bs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), zs = (e) => e.startsWith("onUpdate:"), Ae = Object.assign, pr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, mc = Object.prototype.hasOwnProperty, be = (e, t) => mc.call(e, t), ee = Array.isArray, En = (e) => ys(e) === "[object Map]", Wn = (e) => ys(e) === "[object Set]", zr = (e) => ys(e) === "[object Date]", ae = (e) => typeof e == "function", Te = (e) => typeof e == "string", Nt = (e) => typeof e == "symbol", ve = (e) => e !== null && typeof e == "object", hr = (e) => (ve(e) || ae(e)) && ae(e.then) && ae(e.catch), hl = Object.prototype.toString, ys = (e) => hl.call(e), _r = (e) => ys(e).slice(8, -1), _l = (e) => ys(e) === "[object Object]", co = (e) => Te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, os = /* @__PURE__ */ Zt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), gc = /* @__PURE__ */ Zt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), uo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, vc = /-\w/g, rt = uo(
  (e) => e.replace(vc, (t) => t.slice(1).toUpperCase())
), bc = /\B([A-Z])/g, Xt = uo(
  (e) => e.replace(bc, "-$1").toLowerCase()
), fo = uo((e) => e.charAt(0).toUpperCase() + e.slice(1)), gn = uo(
  (e) => e ? `on${fo(e)}` : ""
), Vt = (e, t) => !Object.is(e, t), Vn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Js = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, po = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Jr;
const Es = () => Jr || (Jr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function mr(e) {
  if (ee(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = Te(s) ? Nc(s) : mr(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (Te(e) || ve(e))
    return e;
}
const yc = /;(?![^(]*\))/g, Ec = /:([^]+)/, wc = /\/\*[^]*?\*\//g;
function Nc(e) {
  const t = {};
  return e.replace(wc, "").split(yc).forEach((n) => {
    if (n) {
      const s = n.split(Ec);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ge(e) {
  let t = "";
  if (Te(e))
    t = e;
  else if (ee(e))
    for (let n = 0; n < e.length; n++) {
      const s = ge(e[n]);
      s && (t += s + " ");
    }
  else if (ve(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const $c = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Oc = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Sc = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", kc = /* @__PURE__ */ Zt($c), Cc = /* @__PURE__ */ Zt(Oc), xc = /* @__PURE__ */ Zt(Sc), Dc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Tc = /* @__PURE__ */ Zt(Dc);
function ml(e) {
  return !!e || e === "";
}
function Pc(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = an(e[s], t[s]);
  return n;
}
function an(e, t) {
  if (e === t) return !0;
  let n = zr(e), s = zr(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Nt(e), s = Nt(t), n || s)
    return e === t;
  if (n = ee(e), s = ee(t), n || s)
    return n && s ? Pc(e, t) : !1;
  if (n = ve(e), s = ve(t), n || s) {
    if (!n || !s)
      return !1;
    const o = Object.keys(e).length, r = Object.keys(t).length;
    if (o !== r)
      return !1;
    for (const a in e) {
      const c = e.hasOwnProperty(a), u = t.hasOwnProperty(a);
      if (c && !u || !c && u || !an(e[a], t[a]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function gr(e, t) {
  return e.findIndex((n) => an(n, t));
}
const gl = (e) => !!(e && e.__v_isRef === !0), d = (e) => Te(e) ? e : e == null ? "" : ee(e) || ve(e) && (e.toString === hl || !ae(e.toString)) ? gl(e) ? d(e.value) : JSON.stringify(e, vl, 2) : String(e), vl = (e, t) => gl(t) ? vl(e, t.value) : En(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, o], r) => (n[No(s, r) + " =>"] = o, n),
    {}
  )
} : Wn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => No(n))
} : Nt(t) ? No(t) : ve(t) && !ee(t) && !_l(t) ? String(t) : t, No = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Nt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ut(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Be;
class bl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Be, !t && Be && (this.index = (Be.scopes || (Be.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Be;
      try {
        return Be = this, t();
      } finally {
        Be = n;
      }
    } else process.env.NODE_ENV !== "production" && ut("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Be, Be = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Be = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function yl(e) {
  return new bl(e);
}
function El() {
  return Be;
}
function Rc(e, t = !1) {
  Be ? Be.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && ut(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let $e;
const $o = /* @__PURE__ */ new WeakSet();
class wl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Be && Be.active && Be.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, $o.has(this) && ($o.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || $l(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Qr(this), Ol(this);
    const t = $e, n = Et;
    $e = this, Et = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && $e !== this && ut(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Sl(this), $e = t, Et = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        yr(t);
      this.deps = this.depsTail = void 0, Qr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? $o.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    jo(this) && this.run();
  }
  get dirty() {
    return jo(this);
  }
}
let Nl = 0, rs, is;
function $l(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = is, is = e;
    return;
  }
  e.next = rs, rs = e;
}
function vr() {
  Nl++;
}
function br() {
  if (--Nl > 0)
    return;
  if (is) {
    let t = is;
    for (is = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; rs; ) {
    let t = rs;
    for (rs = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ol(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Sl(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), yr(s), Ac(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  e.deps = t, e.depsTail = n;
}
function jo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (kl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function kl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ds) || (e.globalVersion = ds, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !jo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = $e, s = Et;
  $e = e, Et = !0;
  try {
    Ol(e);
    const o = e.fn(e._value);
    (t.version === 0 || Vt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    $e = n, Et = s, Sl(e), e.flags &= -3;
  }
}
function yr(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: o } = e;
  if (s && (s.nextSub = o, e.prevSub = void 0), o && (o.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = o), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      yr(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ac(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Et = !0;
const Cl = [];
function $t() {
  Cl.push(Et), Et = !1;
}
function Ot() {
  const e = Cl.pop();
  Et = e === void 0 ? !0 : e;
}
function Qr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = $e;
    $e = void 0;
    try {
      t();
    } finally {
      $e = n;
    }
  }
}
let ds = 0;
class Vc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Er {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!$e || !Et || $e === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== $e)
      n = this.activeLink = new Vc($e, this), $e.deps ? (n.prevDep = $e.depsTail, $e.depsTail.nextDep = n, $e.depsTail = n) : $e.deps = $e.depsTail = n, xl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = $e.depsTail, n.nextDep = void 0, $e.depsTail.nextDep = n, $e.depsTail = n, $e.deps === n && ($e.deps = s);
    }
    return process.env.NODE_ENV !== "production" && $e.onTrack && $e.onTrack(
      Ae(
        {
          effect: $e
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, ds++, this.notify(t);
  }
  notify(t) {
    vr();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            Ae(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      br();
    }
  }
}
function xl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        xl(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Qs = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Uo = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), fs = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Fe(e, t, n) {
  if (Et && $e) {
    let s = Qs.get(e);
    s || Qs.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new Er()), o.map = s, o.key = n), process.env.NODE_ENV !== "production" ? o.track({
      target: e,
      type: t,
      key: n
    }) : o.track();
  }
}
function It(e, t, n, s, o, r) {
  const a = Qs.get(e);
  if (!a) {
    ds++;
    return;
  }
  const c = (u) => {
    u && (process.env.NODE_ENV !== "production" ? u.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: o,
      oldTarget: r
    }) : u.trigger());
  };
  if (vr(), t === "clear")
    a.forEach(c);
  else {
    const u = ee(e), p = u && co(n);
    if (u && n === "length") {
      const h = Number(s);
      a.forEach((f, _) => {
        (_ === "length" || _ === fs || !Nt(_) && _ >= h) && c(f);
      });
    } else
      switch ((n !== void 0 || a.has(void 0)) && c(a.get(n)), p && c(a.get(fs)), t) {
        case "add":
          u ? p && c(a.get("length")) : (c(a.get(wn)), En(e) && c(a.get(Uo)));
          break;
        case "delete":
          u || (c(a.get(wn)), En(e) && c(a.get(Uo)));
          break;
        case "set":
          En(e) && c(a.get(wn));
          break;
      }
  }
  br();
}
function Ic(e, t) {
  const n = Qs.get(e);
  return n && n.get(t);
}
function xn(e) {
  const t = /* @__PURE__ */ de(e);
  return t === e ? t : (Fe(t, "iterate", fs), /* @__PURE__ */ We(e) ? t : t.map(kt));
}
function ho(e) {
  return Fe(e = /* @__PURE__ */ de(e), "iterate", fs), e;
}
function At(e, t) {
  return /* @__PURE__ */ St(e) ? Hn(/* @__PURE__ */ ht(e) ? kt(t) : t) : kt(t);
}
const Mc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Oo(this, Symbol.iterator, (e) => At(this, e));
  },
  concat(...e) {
    return xn(this).concat(
      ...e.map((t) => ee(t) ? xn(t) : t)
    );
  },
  entries() {
    return Oo(this, "entries", (e) => (e[1] = At(this, e[1]), e));
  },
  every(e, t) {
    return Ht(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ht(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => At(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Ht(
      this,
      "find",
      e,
      t,
      (n) => At(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ht(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ht(
      this,
      "findLast",
      e,
      t,
      (n) => At(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ht(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ht(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return So(this, "includes", e);
  },
  indexOf(...e) {
    return So(this, "indexOf", e);
  },
  join(e) {
    return xn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return So(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ht(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Qn(this, "pop");
  },
  push(...e) {
    return Qn(this, "push", e);
  },
  reduce(e, ...t) {
    return Yr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Yr(this, "reduceRight", e, t);
  },
  shift() {
    return Qn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ht(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Qn(this, "splice", e);
  },
  toReversed() {
    return xn(this).toReversed();
  },
  toSorted(e) {
    return xn(this).toSorted(e);
  },
  toSpliced(...e) {
    return xn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Qn(this, "unshift", e);
  },
  values() {
    return Oo(this, "values", (e) => At(this, e));
  }
};
function Oo(e, t, n) {
  const s = ho(e), o = s[t]();
  return s !== e && !/* @__PURE__ */ We(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.done || (r.value = n(r.value)), r;
  }), o;
}
const Fc = Array.prototype;
function Ht(e, t, n, s, o, r) {
  const a = ho(e), c = a !== e && !/* @__PURE__ */ We(e), u = a[t];
  if (u !== Fc[t]) {
    const f = u.apply(e, r);
    return c ? kt(f) : f;
  }
  let p = n;
  a !== e && (c ? p = function(f, _) {
    return n.call(this, At(e, f), _, e);
  } : n.length > 2 && (p = function(f, _) {
    return n.call(this, f, _, e);
  }));
  const h = u.call(a, p, s);
  return c && o ? o(h) : h;
}
function Yr(e, t, n, s) {
  const o = ho(e), r = o !== e && !/* @__PURE__ */ We(e);
  let a = n, c = !1;
  o !== e && (r ? (c = s.length === 0, a = function(p, h, f) {
    return c && (c = !1, p = At(e, p)), n.call(this, p, At(e, h), f, e);
  }) : n.length > 3 && (a = function(p, h, f) {
    return n.call(this, p, h, f, e);
  }));
  const u = o[t](a, ...s);
  return c ? At(e, u) : u;
}
function So(e, t, n) {
  const s = /* @__PURE__ */ de(e);
  Fe(s, "iterate", fs);
  const o = s[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Un(n[0]) ? (n[0] = /* @__PURE__ */ de(n[0]), s[t](...n)) : o;
}
function Qn(e, t, n = []) {
  $t(), vr();
  const s = (/* @__PURE__ */ de(e))[t].apply(e, n);
  return br(), Ot(), s;
}
const Lc = /* @__PURE__ */ Zt("__proto__,__v_isRef,__isVue"), Dl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Nt)
);
function jc(e) {
  Nt(e) || (e = String(e));
  const t = /* @__PURE__ */ de(this);
  return Fe(t, "has", e), t.hasOwnProperty(e);
}
class Tl {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (o ? r ? Ml : Il : r ? Vl : Al).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const a = ee(t);
    if (!o) {
      let u;
      if (a && (u = Mc[n]))
        return u;
      if (n === "hasOwnProperty")
        return jc;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ke(t) ? t : s
    );
    if ((Nt(n) ? Dl.has(n) : Lc(n)) || (o || Fe(t, "get", n), r))
      return c;
    if (/* @__PURE__ */ ke(c)) {
      const u = a && co(n) ? c : c.value;
      return o && ve(u) ? /* @__PURE__ */ Go(u) : u;
    }
    return ve(c) ? o ? /* @__PURE__ */ Go(c) : /* @__PURE__ */ cn(c) : c;
  }
}
class Pl extends Tl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let r = t[n];
    const a = ee(t) && co(n);
    if (!this._isShallow) {
      const p = /* @__PURE__ */ St(r);
      if (!/* @__PURE__ */ We(s) && !/* @__PURE__ */ St(s) && (r = /* @__PURE__ */ de(r), s = /* @__PURE__ */ de(s)), !a && /* @__PURE__ */ ke(r) && !/* @__PURE__ */ ke(s))
        return p ? (process.env.NODE_ENV !== "production" && ut(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = s, !0);
    }
    const c = a ? Number(n) < t.length : be(t, n), u = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ ke(t) ? t : o
    );
    return t === /* @__PURE__ */ de(o) && (c ? Vt(s, r) && It(t, "set", n, s, r) : It(t, "add", n, s)), u;
  }
  deleteProperty(t, n) {
    const s = be(t, n), o = t[n], r = Reflect.deleteProperty(t, n);
    return r && s && It(t, "delete", n, void 0, o), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Nt(n) || !Dl.has(n)) && Fe(t, "has", n), s;
  }
  ownKeys(t) {
    return Fe(
      t,
      "iterate",
      ee(t) ? "length" : wn
    ), Reflect.ownKeys(t);
  }
}
class Rl extends Tl {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && ut(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && ut(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Uc = /* @__PURE__ */ new Pl(), Hc = /* @__PURE__ */ new Rl(), Gc = /* @__PURE__ */ new Pl(!0), Bc = /* @__PURE__ */ new Rl(!0), Ho = (e) => e, Cs = (e) => Reflect.getPrototypeOf(e);
function Kc(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = /* @__PURE__ */ de(o), a = En(r), c = e === "entries" || e === Symbol.iterator && a, u = e === "keys" && a, p = o[e](...s), h = n ? Ho : t ? Hn : kt;
    return !t && Fe(
      r,
      "iterate",
      u ? Uo : wn
    ), Ae(
      // inheriting all iterator properties
      Object.create(p),
      {
        // iterator protocol
        next() {
          const { value: f, done: _ } = p.next();
          return _ ? { value: f, done: _ } : {
            value: c ? [h(f[0]), h(f[1])] : h(f),
            done: _
          };
        }
      }
    );
  };
}
function xs(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      ut(
        `${fo(e)} operation ${n}failed: target is readonly.`,
        /* @__PURE__ */ de(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Wc(e, t) {
  const n = {
    get(o) {
      const r = this.__v_raw, a = /* @__PURE__ */ de(r), c = /* @__PURE__ */ de(o);
      e || (Vt(o, c) && Fe(a, "get", o), Fe(a, "get", c));
      const { has: u } = Cs(a), p = t ? Ho : e ? Hn : kt;
      if (u.call(a, o))
        return p(r.get(o));
      if (u.call(a, c))
        return p(r.get(c));
      r !== a && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Fe(/* @__PURE__ */ de(o), "iterate", wn), o.size;
    },
    has(o) {
      const r = this.__v_raw, a = /* @__PURE__ */ de(r), c = /* @__PURE__ */ de(o);
      return e || (Vt(o, c) && Fe(a, "has", o), Fe(a, "has", c)), o === c ? r.has(o) : r.has(o) || r.has(c);
    },
    forEach(o, r) {
      const a = this, c = a.__v_raw, u = /* @__PURE__ */ de(c), p = t ? Ho : e ? Hn : kt;
      return !e && Fe(u, "iterate", wn), c.forEach((h, f) => o.call(r, p(h), p(f), a));
    }
  };
  return Ae(
    n,
    e ? {
      add: xs("add"),
      set: xs("set"),
      delete: xs("delete"),
      clear: xs("clear")
    } : {
      add(o) {
        const r = /* @__PURE__ */ de(this), a = Cs(r), c = /* @__PURE__ */ de(o), u = !t && !/* @__PURE__ */ We(o) && !/* @__PURE__ */ St(o) ? c : o;
        return a.has.call(r, u) || Vt(o, u) && a.has.call(r, o) || Vt(c, u) && a.has.call(r, c) || (r.add(u), It(r, "add", u, u)), this;
      },
      set(o, r) {
        !t && !/* @__PURE__ */ We(r) && !/* @__PURE__ */ St(r) && (r = /* @__PURE__ */ de(r));
        const a = /* @__PURE__ */ de(this), { has: c, get: u } = Cs(a);
        let p = c.call(a, o);
        p ? process.env.NODE_ENV !== "production" && Xr(a, c, o) : (o = /* @__PURE__ */ de(o), p = c.call(a, o));
        const h = u.call(a, o);
        return a.set(o, r), p ? Vt(r, h) && It(a, "set", o, r, h) : It(a, "add", o, r), this;
      },
      delete(o) {
        const r = /* @__PURE__ */ de(this), { has: a, get: c } = Cs(r);
        let u = a.call(r, o);
        u ? process.env.NODE_ENV !== "production" && Xr(r, a, o) : (o = /* @__PURE__ */ de(o), u = a.call(r, o));
        const p = c ? c.call(r, o) : void 0, h = r.delete(o);
        return u && It(r, "delete", o, void 0, p), h;
      },
      clear() {
        const o = /* @__PURE__ */ de(this), r = o.size !== 0, a = process.env.NODE_ENV !== "production" ? En(o) ? new Map(o) : new Set(o) : void 0, c = o.clear();
        return r && It(
          o,
          "clear",
          void 0,
          void 0,
          a
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = Kc(o, e, t);
  }), n;
}
function _o(e, t) {
  const n = Wc(e, t);
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    be(n, o) && o in s ? n : s,
    o,
    r
  );
}
const qc = {
  get: /* @__PURE__ */ _o(!1, !1)
}, zc = {
  get: /* @__PURE__ */ _o(!1, !0)
}, Jc = {
  get: /* @__PURE__ */ _o(!0, !1)
}, Qc = {
  get: /* @__PURE__ */ _o(!0, !0)
};
function Xr(e, t, n) {
  const s = /* @__PURE__ */ de(n);
  if (s !== n && t.call(e, s)) {
    const o = _r(e);
    ut(
      `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Al = /* @__PURE__ */ new WeakMap(), Vl = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), Ml = /* @__PURE__ */ new WeakMap();
function Yc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Xc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Yc(_r(e));
}
// @__NO_SIDE_EFFECTS__
function cn(e) {
  return /* @__PURE__ */ St(e) ? e : mo(
    e,
    !1,
    Uc,
    qc,
    Al
  );
}
// @__NO_SIDE_EFFECTS__
function Fl(e) {
  return mo(
    e,
    !1,
    Gc,
    zc,
    Vl
  );
}
// @__NO_SIDE_EFFECTS__
function Go(e) {
  return mo(
    e,
    !0,
    Hc,
    Jc,
    Il
  );
}
// @__NO_SIDE_EFFECTS__
function Mt(e) {
  return mo(
    e,
    !0,
    Bc,
    Qc,
    Ml
  );
}
function mo(e, t, n, s, o) {
  if (!ve(e))
    return process.env.NODE_ENV !== "production" && ut(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Xc(e);
  if (r === 0)
    return e;
  const a = o.get(e);
  if (a)
    return a;
  const c = new Proxy(
    e,
    r === 2 ? s : n
  );
  return o.set(e, c), c;
}
// @__NO_SIDE_EFFECTS__
function ht(e) {
  return /* @__PURE__ */ St(e) ? /* @__PURE__ */ ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function St(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function We(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Un(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function de(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ de(t) : e;
}
function on(e) {
  return !be(e, "__v_skip") && Object.isExtensible(e) && Js(e, "__v_skip", !0), e;
}
const kt = (e) => ve(e) ? /* @__PURE__ */ cn(e) : e, Hn = (e) => ve(e) ? /* @__PURE__ */ Go(e) : e;
// @__NO_SIDE_EFFECTS__
function ke(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  return Ll(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Zc(e) {
  return Ll(e, !0);
}
function Ll(e, t) {
  return /* @__PURE__ */ ke(e) ? e : new eu(e, t);
}
class eu {
  constructor(t, n) {
    this.dep = new Er(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ de(t), this._value = n ? t : kt(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ We(t) || /* @__PURE__ */ St(t);
    t = s ? t : /* @__PURE__ */ de(t), Vt(t, n) && (this._rawValue = t, this._value = s ? t : kt(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function l(e) {
  return /* @__PURE__ */ ke(e) ? e.value : e;
}
const tu = {
  get: (e, t, n) => t === "__v_raw" ? e : l(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return /* @__PURE__ */ ke(o) && !/* @__PURE__ */ ke(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function jl(e) {
  return /* @__PURE__ */ ht(e) ? e : new Proxy(e, tu);
}
// @__NO_SIDE_EFFECTS__
function Zr(e) {
  process.env.NODE_ENV !== "production" && !/* @__PURE__ */ Un(e) && ut("toRefs() expects a reactive object but received a plain one.");
  const t = ee(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Ul(e, n);
  return t;
}
class nu {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ de(t);
    let o = !0, r = t;
    if (!ee(t) || !co(String(n)))
      do
        o = !/* @__PURE__ */ Un(r) || /* @__PURE__ */ We(r);
      while (o && (r = r.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = l(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ ke(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ ke(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Ic(this._raw, this._key);
  }
}
class su {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Vs(e, t, n) {
  return /* @__PURE__ */ ke(e) ? e : ae(e) ? new su(e) : ve(e) && arguments.length > 1 ? Ul(e, t, n) : /* @__PURE__ */ Z(e);
}
function Ul(e, t, n) {
  return new nu(e, t, n);
}
class ou {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Er(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ds - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    $e !== this)
      return $l(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return kl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && ut("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function ru(e, t, n = !1) {
  let s, o;
  ae(e) ? s = e : (s = e.get, o = e.set);
  const r = new ou(s, o, n);
  return process.env.NODE_ENV, r;
}
const Ds = {}, Ys = /* @__PURE__ */ new WeakMap();
let vn;
function iu(e, t = !1, n = vn) {
  if (n) {
    let s = Ys.get(n);
    s || Ys.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && ut(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function lu(e, t, n = Oe) {
  const { immediate: s, deep: o, once: r, scheduler: a, augmentJob: c, call: u } = n, p = (D) => {
    (n.onWarn || ut)(
      "Invalid watch source: ",
      D,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, h = (D) => o ? D : /* @__PURE__ */ We(D) || o === !1 || o === 0 ? Jt(D, 1) : Jt(D);
  let f, _, g, k, O = !1, W = !1;
  if (/* @__PURE__ */ ke(e) ? (_ = () => e.value, O = /* @__PURE__ */ We(e)) : /* @__PURE__ */ ht(e) ? (_ = () => h(e), O = !0) : ee(e) ? (W = !0, O = e.some((D) => /* @__PURE__ */ ht(D) || /* @__PURE__ */ We(D)), _ = () => e.map((D) => {
    if (/* @__PURE__ */ ke(D))
      return D.value;
    if (/* @__PURE__ */ ht(D))
      return h(D);
    if (ae(D))
      return u ? u(D, 2) : D();
    process.env.NODE_ENV !== "production" && p(D);
  })) : ae(e) ? t ? _ = u ? () => u(e, 2) : e : _ = () => {
    if (g) {
      $t();
      try {
        g();
      } finally {
        Ot();
      }
    }
    const D = vn;
    vn = f;
    try {
      return u ? u(e, 3, [k]) : e(k);
    } finally {
      vn = D;
    }
  } : (_ = Le, process.env.NODE_ENV !== "production" && p(e)), t && o) {
    const D = _, T = o === !0 ? 1 / 0 : o;
    _ = () => Jt(D(), T);
  }
  const V = El(), I = () => {
    f.stop(), V && V.active && pr(V.effects, f);
  };
  if (r && t) {
    const D = t;
    t = (...T) => {
      D(...T), I();
    };
  }
  let L = W ? new Array(e.length).fill(Ds) : Ds;
  const te = (D) => {
    if (!(!(f.flags & 1) || !f.dirty && !D))
      if (t) {
        const T = f.run();
        if (o || O || (W ? T.some((b, S) => Vt(b, L[S])) : Vt(T, L))) {
          g && g();
          const b = vn;
          vn = f;
          try {
            const S = [
              T,
              // pass undefined as the old value when it's changed for the first time
              L === Ds ? void 0 : W && L[0] === Ds ? [] : L,
              k
            ];
            L = T, u ? u(t, 3, S) : (
              // @ts-expect-error
              t(...S)
            );
          } finally {
            vn = b;
          }
        }
      } else
        f.run();
  };
  return c && c(te), f = new wl(_), f.scheduler = a ? () => a(te, !1) : te, k = (D) => iu(D, !1, f), g = f.onStop = () => {
    const D = Ys.get(f);
    if (D) {
      if (u)
        u(D, 4);
      else
        for (const T of D) T();
      Ys.delete(f);
    }
  }, process.env.NODE_ENV !== "production" && (f.onTrack = n.onTrack, f.onTrigger = n.onTrigger), t ? s ? te(!0) : L = f.run() : a ? a(te.bind(null, !0), !0) : f.run(), I.pause = f.pause.bind(f), I.resume = f.resume.bind(f), I.stop = I, I;
}
function Jt(e, t = 1 / 0, n) {
  if (t <= 0 || !ve(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ke(e))
    Jt(e.value, t, n);
  else if (ee(e))
    for (let s = 0; s < e.length; s++)
      Jt(e[s], t, n);
  else if (Wn(e) || En(e))
    e.forEach((s) => {
      Jt(s, t, n);
    });
  else if (_l(e)) {
    for (const s in e)
      Jt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Jt(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Nn = [];
function Is(e) {
  Nn.push(e);
}
function Ms() {
  Nn.pop();
}
let ko = !1;
function B(e, ...t) {
  if (ko) return;
  ko = !0, $t();
  const n = Nn.length ? Nn[Nn.length - 1].component : null, s = n && n.appContext.config.warnHandler, o = au();
  if (s)
    qn(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var a, c;
          return (c = (a = r.toString) == null ? void 0 : a.call(r)) != null ? c : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        o.map(
          ({ vnode: r }) => `at <${ks(n, r.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    o.length && r.push(`
`, ...cu(o)), console.warn(...r);
  }
  Ot(), ko = !1;
}
function au() {
  let e = Nn[Nn.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function cu(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...uu(n));
  }), t;
}
function uu({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, o = ` at <${ks(
    e.component,
    e.type,
    s
  )}`, r = ">" + n;
  return e.props ? [o, ...du(e.props), r] : [o + r];
}
function du(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Hl(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Hl(e, t, n) {
  return Te(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ ke(t) ? (t = Hl(e, /* @__PURE__ */ de(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : ae(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ de(t), n ? t : [`${e}=`, t]);
}
const wr = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function qn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (o) {
    ws(o, t, n);
  }
}
function Ut(e, t, n, s) {
  if (ae(e)) {
    const o = qn(e, t, n, s);
    return o && hr(o) && o.catch((r) => {
      ws(r, t, n);
    }), o;
  }
  if (ee(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(Ut(e[r], t, n, s));
    return o;
  } else process.env.NODE_ENV !== "production" && B(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function ws(e, t, n, s = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: a } = t && t.appContext.config || Oe;
  if (t) {
    let c = t.parent;
    const u = t.proxy, p = process.env.NODE_ENV !== "production" ? wr[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const h = c.ec;
      if (h) {
        for (let f = 0; f < h.length; f++)
          if (h[f](e, u, p) === !1)
            return;
      }
      c = c.parent;
    }
    if (r) {
      $t(), qn(r, null, 10, [
        e,
        u,
        p
      ]), Ot();
      return;
    }
  }
  fu(e, n, o, s, a);
}
function fu(e, t, n, s = !0, o = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = wr[t];
    if (n && Is(n), B(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Ms(), s)
      throw e;
    console.error(e);
  } else {
    if (o)
      throw e;
    console.error(e);
  }
}
const Ye = [];
let Rt = -1;
const Ln = [];
let nn = null, In = 0;
const Gl = /* @__PURE__ */ Promise.resolve();
let Xs = null;
const pu = 100;
function ps(e) {
  const t = Xs || Gl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hu(e) {
  let t = Rt + 1, n = Ye.length;
  for (; t < n; ) {
    const s = t + n >>> 1, o = Ye[s], r = hs(o);
    r < e || r === e && o.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function go(e) {
  if (!(e.flags & 1)) {
    const t = hs(e), n = Ye[Ye.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= hs(n) ? Ye.push(e) : Ye.splice(hu(t), 0, e), e.flags |= 1, Bl();
  }
}
function Bl() {
  Xs || (Xs = Gl.then(ql));
}
function Kl(e) {
  ee(e) ? Ln.push(...e) : nn && e.id === -1 ? nn.splice(In + 1, 0, e) : e.flags & 1 || (Ln.push(e), e.flags |= 1), Bl();
}
function ei(e, t, n = Rt + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < Ye.length; n++) {
    const s = Ye[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid || process.env.NODE_ENV !== "production" && Nr(t, s))
        continue;
      Ye.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Wl(e) {
  if (Ln.length) {
    const t = [...new Set(Ln)].sort(
      (n, s) => hs(n) - hs(s)
    );
    if (Ln.length = 0, nn) {
      nn.push(...t);
      return;
    }
    for (nn = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), In = 0; In < nn.length; In++) {
      const n = nn[In];
      process.env.NODE_ENV !== "production" && Nr(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    nn = null, In = 0;
  }
}
const hs = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ql(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Nr(e, n) : Le;
  try {
    for (Rt = 0; Rt < Ye.length; Rt++) {
      const n = Ye[Rt];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), qn(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Rt < Ye.length; Rt++) {
      const n = Ye[Rt];
      n && (n.flags &= -2);
    }
    Rt = -1, Ye.length = 0, Wl(e), Xs = null, (Ye.length || Ln.length) && ql(e);
  }
}
function Nr(e, t) {
  const n = e.get(t) || 0;
  if (n > pu) {
    const s = t.i, o = s && Ca(s.type);
    return ws(
      `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Ft = !1;
const Fs = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Es().__VUE_HMR_RUNTIME__ = {
  createRecord: Co(zl),
  rerender: Co(gu),
  reload: Co(vu)
});
const Sn = /* @__PURE__ */ new Map();
function _u(e) {
  const t = e.type.__hmrId;
  let n = Sn.get(t);
  n || (zl(t, e.type), n = Sn.get(t)), n.instances.add(e);
}
function mu(e) {
  Sn.get(e.type.__hmrId).instances.delete(e);
}
function zl(e, t) {
  return Sn.has(e) ? !1 : (Sn.set(e, {
    initialDef: Zs(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Zs(e) {
  return xa(e) ? e.__vccOpts : e;
}
function gu(e, t) {
  const n = Sn.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Zs(s.type).render = t), s.renderCache = [], Ft = !0, s.job.flags & 8 || s.update(), Ft = !1;
  }));
}
function vu(e, t) {
  const n = Sn.get(e);
  if (!n) return;
  t = Zs(t), ti(n.initialDef, t);
  const s = [...n.instances];
  for (let o = 0; o < s.length; o++) {
    const r = s[o], a = Zs(r.type);
    let c = Fs.get(a);
    c || (a !== n.initialDef && ti(a, t), Fs.set(a, c = /* @__PURE__ */ new Set())), c.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (c.add(r), r.ceReload(t.styles), c.delete(r)) : r.parent ? go(() => {
      r.job.flags & 8 || (Ft = !0, r.parent.update(), Ft = !1, c.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(a);
  }
  Kl(() => {
    Fs.clear();
  });
}
function ti(e, t) {
  Ae(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Co(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let bt, ts = [], Bo = !1;
function Ns(e, ...t) {
  bt ? bt.emit(e, ...t) : Bo || ts.push({ event: e, args: t });
}
function $r(e, t) {
  var n, s;
  bt = e, bt ? (bt.enabled = !0, ts.forEach(({ event: o, args: r }) => bt.emit(o, ...r)), ts = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    $r(r, t);
  }), setTimeout(() => {
    bt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Bo = !0, ts = []);
  }, 3e3)) : (Bo = !0, ts = []);
}
function bu(e, t) {
  Ns("app:init", e, t, {
    Fragment: Y,
    Text: Os,
    Comment: it,
    Static: Us
  });
}
function yu(e) {
  Ns("app:unmount", e);
}
const Eu = /* @__PURE__ */ Or(
  "component:added"
  /* COMPONENT_ADDED */
), Jl = /* @__PURE__ */ Or(
  "component:updated"
  /* COMPONENT_UPDATED */
), wu = /* @__PURE__ */ Or(
  "component:removed"
  /* COMPONENT_REMOVED */
), Nu = (e) => {
  bt && typeof bt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !bt.cleanupBuffer(e) && wu(e);
};
// @__NO_SIDE_EFFECTS__
function Or(e) {
  return (t) => {
    Ns(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const $u = /* @__PURE__ */ Ql(
  "perf:start"
  /* PERFORMANCE_START */
), Ou = /* @__PURE__ */ Ql(
  "perf:end"
  /* PERFORMANCE_END */
);
function Ql(e) {
  return (t, n, s) => {
    Ns(e, t.appContext.app, t.uid, t, n, s);
  };
}
function Su(e, t, n) {
  Ns(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let je = null, Yl = null;
function eo(e) {
  const t = je;
  return je = e, Yl = e && e.type.__scopeId || null, t;
}
function ie(e, t = je, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && ro(-1);
    const r = eo(t);
    let a;
    try {
      a = e(...o);
    } finally {
      eo(r), s._d && ro(1);
    }
    return process.env.NODE_ENV !== "production" && Jl(t), a;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Xl(e) {
  gc(e) && B("Do not use built-in directive ids as custom directive id: " + e);
}
function Xe(e, t) {
  if (je === null)
    return process.env.NODE_ENV !== "production" && B("withDirectives can only be used inside render functions."), e;
  const n = yo(je), s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, a, c, u = Oe] = t[o];
    r && (ae(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Jt(a), s.push({
      dir: r,
      instance: n,
      value: a,
      oldValue: void 0,
      arg: c,
      modifiers: u
    }));
  }
  return e;
}
function _n(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let a = 0; a < o.length; a++) {
    const c = o[a];
    r && (c.oldValue = r[a].value);
    let u = c.dir[s];
    u && ($t(), Ut(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), Ot());
  }
}
function Ls(e, t) {
  if (process.env.NODE_ENV !== "production" && (!Me || Me.isMounted) && B("provide() can only be used inside setup()."), Me) {
    let n = Me.provides;
    const s = Me.parent && Me.parent.provides;
    s === n && (n = Me.provides = Object.create(s)), n[e] = t;
  }
}
function _t(e, t, n = !1) {
  const s = zn();
  if (s || On) {
    let o = On ? On._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && ae(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && B(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && B("inject() can only be used inside setup() or functional components.");
}
function ku() {
  return !!(zn() || On);
}
const Cu = /* @__PURE__ */ Symbol.for("v-scx"), xu = () => {
  {
    const e = _t(Cu);
    return e || process.env.NODE_ENV !== "production" && B(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Du(e, t) {
  return Sr(e, null, t);
}
function qe(e, t, n) {
  return process.env.NODE_ENV !== "production" && !ae(t) && B(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Sr(e, t, n);
}
function Sr(e, t, n = Oe) {
  const { immediate: s, deep: o, flush: r, once: a } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && B(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && B(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), a !== void 0 && B(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = Ae({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = B);
  const u = t && s || !t && r !== "post";
  let p;
  if (ms) {
    if (r === "sync") {
      const g = xu();
      p = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!u) {
      const g = () => {
      };
      return g.stop = Le, g.resume = Le, g.pause = Le, g;
    }
  }
  const h = Me;
  c.call = (g, k, O) => Ut(g, h, k, O);
  let f = !1;
  r === "post" ? c.scheduler = (g) => {
    ot(g, h && h.suspense);
  } : r !== "sync" && (f = !0, c.scheduler = (g, k) => {
    k ? g() : go(g);
  }), c.augmentJob = (g) => {
    t && (g.flags |= 4), f && (g.flags |= 2, h && (g.id = h.uid, g.i = h));
  };
  const _ = lu(e, t, c);
  return ms && (p ? p.push(_) : u && _()), _;
}
function Tu(e, t, n) {
  const s = this.proxy, o = Te(e) ? e.includes(".") ? Zl(s, e) : () => s[e] : e.bind(s, s);
  let r;
  ae(t) ? r = t : (r = t.handler, n = t);
  const a = Ss(this), c = Sr(o, r.bind(s), n);
  return a(), c;
}
function Zl(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
const Pu = /* @__PURE__ */ Symbol("_vte"), Ru = (e) => e.__isTeleport, Au = /* @__PURE__ */ Symbol("_leaveCb");
function kr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, kr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Ve(e, t) {
  return ae(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ae({ name: e.name }, t, { setup: e })
  ) : e;
}
function ea(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const ni = /* @__PURE__ */ new WeakSet();
function si(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const to = /* @__PURE__ */ new WeakMap();
function ls(e, t, n, s, o = !1) {
  if (ee(e)) {
    e.forEach(
      (O, W) => ls(
        O,
        t && (ee(t) ? t[W] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (jn(s) && !o) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && ls(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? yo(s.component) : s.el, a = o ? null : r, { i: c, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !c) {
    B(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const p = t && t.r, h = c.refs === Oe ? c.refs = {} : c.refs, f = c.setupState, _ = /* @__PURE__ */ de(f), g = f === Oe ? pl : (O) => process.env.NODE_ENV !== "production" && (be(_, O) && !/* @__PURE__ */ ke(_[O]) && B(
    `Template ref "${O}" used on a non-ref value. It will not work in the production build.`
  ), ni.has(_[O])) || si(h, O) ? !1 : be(_, O), k = (O, W) => !(process.env.NODE_ENV !== "production" && ni.has(O) || W && si(h, W));
  if (p != null && p !== u) {
    if (oi(t), Te(p))
      h[p] = null, g(p) && (f[p] = null);
    else if (/* @__PURE__ */ ke(p)) {
      const O = t;
      k(p, O.k) && (p.value = null), O.k && (h[O.k] = null);
    }
  }
  if (ae(u))
    qn(u, c, 12, [a, h]);
  else {
    const O = Te(u), W = /* @__PURE__ */ ke(u);
    if (O || W) {
      const V = () => {
        if (e.f) {
          const I = O ? g(u) ? f[u] : h[u] : k(u) || !e.k ? u.value : h[e.k];
          if (o)
            ee(I) && pr(I, r);
          else if (ee(I))
            I.includes(r) || I.push(r);
          else if (O)
            h[u] = [r], g(u) && (f[u] = h[u]);
          else {
            const L = [r];
            k(u, e.k) && (u.value = L), e.k && (h[e.k] = L);
          }
        } else O ? (h[u] = a, g(u) && (f[u] = a)) : W ? (k(u, e.k) && (u.value = a), e.k && (h[e.k] = a)) : process.env.NODE_ENV !== "production" && B("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (a) {
        const I = () => {
          V(), to.delete(e);
        };
        I.id = -1, to.set(e, I), ot(I, n);
      } else
        oi(e), V();
    } else process.env.NODE_ENV !== "production" && B("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function oi(e) {
  const t = to.get(e);
  t && (t.flags |= 8, to.delete(e));
}
Es().requestIdleCallback;
Es().cancelIdleCallback;
const jn = (e) => !!e.type.__asyncLoader, Cr = (e) => e.type.__isKeepAlive;
function Vu(e, t) {
  ta(e, "a", t);
}
function Iu(e, t) {
  ta(e, "da", t);
}
function ta(e, t, n = Me) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (vo(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Cr(o.parent.vnode) && Mu(s, t, n, o), o = o.parent;
  }
}
function Mu(e, t, n, s) {
  const o = vo(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  na(() => {
    pr(s[t], o);
  }, n);
}
function vo(e, t, n = Me, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...a) => {
      $t();
      const c = Ss(n), u = Ut(t, n, e, a);
      return c(), Ot(), u;
    });
    return s ? o.unshift(r) : o.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const o = gn(wr[e].replace(/ hook$/, ""));
    B(
      `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const en = (e) => (t, n = Me) => {
  (!ms || e === "sp") && vo(e, (...s) => t(...s), n);
}, Fu = en("bm"), $s = en("m"), Lu = en(
  "bu"
), ju = en("u"), Uu = en(
  "bum"
), na = en("um"), Hu = en(
  "sp"
), Gu = en("rtg"), Bu = en("rtc");
function Ku(e, t = Me) {
  vo("ec", e, t);
}
const Wu = /* @__PURE__ */ Symbol.for("v-ndc");
function ye(e, t, n, s) {
  let o;
  const r = n, a = ee(e);
  if (a || Te(e)) {
    const c = a && /* @__PURE__ */ ht(e);
    let u = !1, p = !1;
    c && (u = !/* @__PURE__ */ We(e), p = /* @__PURE__ */ St(e), e = ho(e)), o = new Array(e.length);
    for (let h = 0, f = e.length; h < f; h++)
      o[h] = t(
        u ? p ? Hn(kt(e[h])) : kt(e[h]) : e[h],
        h,
        void 0,
        r
      );
  } else if (typeof e == "number")
    if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0))
      B(
        `The v-for range expects a positive integer value but got ${e}.`
      ), o = [];
    else {
      o = new Array(e);
      for (let c = 0; c < e; c++)
        o[c] = t(c + 1, c, void 0, r);
    }
  else if (ve(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (c, u) => t(c, u, void 0, r)
      );
    else {
      const c = Object.keys(e);
      o = new Array(c.length);
      for (let u = 0, p = c.length; u < p; u++) {
        const h = c[u];
        o[u] = t(e[h], h, u, r);
      }
    }
  else
    o = [];
  return o;
}
function ri(e, t, n = {}, s, o) {
  if (je.ce || je.parent && jn(je.parent) && je.parent.ce) {
    const p = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), E(), un(
      Y,
      null,
      [X("slot", n, s)],
      p ? -2 : 64
    );
  }
  let r = e[t];
  process.env.NODE_ENV !== "production" && r && r.length > 1 && (B(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), r = () => []), r && r._c && (r._d = !1), E();
  const a = r && sa(r(n)), c = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  a && a.key, u = un(
    Y,
    {
      key: (c && !Nt(c) ? c : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!a && s ? "_fb" : "")
    },
    a || [],
    a && e._ === 1 ? 64 : -2
  );
  return u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), r && r._c && (r._d = !0), u;
}
function sa(e) {
  return e.some((t) => kn(t) ? !(t.type === it || t.type === Y && !sa(t.children)) : !0) ? e : null;
}
const Ko = (e) => e ? Sa(e) ? yo(e) : Ko(e.parent) : null, $n = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ae(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(e.refs) : e.refs,
    $parent: (e) => Ko(e.parent),
    $root: (e) => Ko(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ia(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      go(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ps.bind(e.proxy)),
    $watch: (e) => Tu.bind(e)
  })
), xr = (e) => e === "_" || e === "$", xo = (e, t) => e !== Oe && !e.__isScriptSetup && be(e, t), oa = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: o, props: r, accessCache: a, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const _ = a[t];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (xo(s, t))
          return a[t] = 1, s[t];
        if (o !== Oe && be(o, t))
          return a[t] = 2, o[t];
        if (be(r, t))
          return a[t] = 3, r[t];
        if (n !== Oe && be(n, t))
          return a[t] = 4, n[t];
        Wo && (a[t] = 0);
      }
    }
    const p = $n[t];
    let h, f;
    if (p)
      return t === "$attrs" ? (Fe(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && so()) : process.env.NODE_ENV !== "production" && t === "$slots" && Fe(e, "get", t), p(e);
    if (
      // css module (injected by vue-loader)
      (h = c.__cssModules) && (h = h[t])
    )
      return h;
    if (n !== Oe && be(n, t))
      return a[t] = 4, n[t];
    if (
      // global properties
      f = u.config.globalProperties, be(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && je && (!Te(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== Oe && xr(t[0]) && be(o, t) ? B(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === je && B(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return xo(o, t) ? (o[t] = n, !0) : process.env.NODE_ENV !== "production" && o.__isScriptSetup && be(o, t) ? (B(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== Oe && be(s, t) ? (s[t] = n, !0) : be(e.props, t) ? (process.env.NODE_ENV !== "production" && B(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && B(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, props: r, type: a }
  }, c) {
    let u;
    return !!(n[c] || e !== Oe && c[0] !== "$" && be(e, c) || xo(t, c) || be(r, c) || be(s, c) || be($n, c) || be(o.config.globalProperties, c) || (u = a.__cssModules) && u[c]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : be(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (oa.ownKeys = (e) => (B(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function qu(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys($n).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => $n[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Le
    });
  }), t;
}
function zu(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((s) => {
    Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[s],
      set: Le
    });
  });
}
function Ju(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(/* @__PURE__ */ de(n)).forEach((s) => {
    if (!n.__isScriptSetup) {
      if (xr(s[0])) {
        B(
          `setup() return property ${JSON.stringify(
            s
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, s, {
        enumerable: !0,
        configurable: !0,
        get: () => n[s],
        set: Le
      });
    }
  });
}
function ii(e) {
  return ee(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Qu() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? B(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Wo = !0;
function Yu(e) {
  const t = ia(e), n = e.proxy, s = e.ctx;
  Wo = !1, t.beforeCreate && li(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: a,
    watch: c,
    provide: u,
    inject: p,
    // lifecycle
    created: h,
    beforeMount: f,
    mounted: _,
    beforeUpdate: g,
    updated: k,
    activated: O,
    deactivated: W,
    beforeDestroy: V,
    beforeUnmount: I,
    destroyed: L,
    unmounted: te,
    render: D,
    renderTracked: T,
    renderTriggered: b,
    errorCaptured: S,
    serverPrefetch: x,
    // public API
    expose: M,
    inheritAttrs: A,
    // assets
    components: Q,
    directives: he,
    filters: Re
  } = t, Se = process.env.NODE_ENV !== "production" ? Qu() : null;
  if (process.env.NODE_ENV !== "production") {
    const [ue] = e.propsOptions;
    if (ue)
      for (const se in ue)
        Se("Props", se);
  }
  if (p && Xu(p, s, Se), a)
    for (const ue in a) {
      const se = a[ue];
      ae(se) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(s, ue, {
        value: se.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : s[ue] = se.bind(n), process.env.NODE_ENV !== "production" && Se("Methods", ue)) : process.env.NODE_ENV !== "production" && B(
        `Method "${ue}" has type "${typeof se}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (o) {
    process.env.NODE_ENV !== "production" && !ae(o) && B(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const ue = o.call(n, n);
    if (process.env.NODE_ENV !== "production" && hr(ue) && B(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !ve(ue))
      process.env.NODE_ENV !== "production" && B("data() should return an object.");
    else if (e.data = /* @__PURE__ */ cn(ue), process.env.NODE_ENV !== "production")
      for (const se in ue)
        Se("Data", se), xr(se[0]) || Object.defineProperty(s, se, {
          configurable: !0,
          enumerable: !0,
          get: () => ue[se],
          set: Le
        });
  }
  if (Wo = !0, r)
    for (const ue in r) {
      const se = r[ue], Ee = ae(se) ? se.bind(n, n) : ae(se.get) ? se.get.bind(n, n) : Le;
      process.env.NODE_ENV !== "production" && Ee === Le && B(`Computed property "${ue}" has no getter.`);
      const lt = !ae(se) && ae(se.set) ? se.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        B(
          `Write operation failed: computed property "${ue}" is readonly.`
        );
      } : Le, Ct = ne({
        get: Ee,
        set: lt
      });
      Object.defineProperty(s, ue, {
        enumerable: !0,
        configurable: !0,
        get: () => Ct.value,
        set: (et) => Ct.value = et
      }), process.env.NODE_ENV !== "production" && Se("Computed", ue);
    }
  if (c)
    for (const ue in c)
      ra(c[ue], s, n, ue);
  if (u) {
    const ue = ae(u) ? u.call(n) : u;
    Reflect.ownKeys(ue).forEach((se) => {
      Ls(se, ue[se]);
    });
  }
  h && li(h, e, "c");
  function fe(ue, se) {
    ee(se) ? se.forEach((Ee) => ue(Ee.bind(n))) : se && ue(se.bind(n));
  }
  if (fe(Fu, f), fe($s, _), fe(Lu, g), fe(ju, k), fe(Vu, O), fe(Iu, W), fe(Ku, S), fe(Bu, T), fe(Gu, b), fe(Uu, I), fe(na, te), fe(Hu, x), ee(M))
    if (M.length) {
      const ue = e.exposed || (e.exposed = {});
      M.forEach((se) => {
        Object.defineProperty(ue, se, {
          get: () => n[se],
          set: (Ee) => n[se] = Ee,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === Le && (e.render = D), A != null && (e.inheritAttrs = A), Q && (e.components = Q), he && (e.directives = he), x && ea(e);
}
function Xu(e, t, n = Le) {
  ee(e) && (e = qo(e));
  for (const s in e) {
    const o = e[s];
    let r;
    ve(o) ? "default" in o ? r = _t(
      o.from || s,
      o.default,
      !0
    ) : r = _t(o.from || s) : r = _t(o), /* @__PURE__ */ ke(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (a) => r.value = a
    }) : t[s] = r, process.env.NODE_ENV !== "production" && n("Inject", s);
  }
}
function li(e, t, n) {
  Ut(
    ee(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ra(e, t, n, s) {
  let o = s.includes(".") ? Zl(n, s) : () => n[s];
  if (Te(e)) {
    const r = t[e];
    ae(r) ? qe(o, r) : process.env.NODE_ENV !== "production" && B(`Invalid watch handler specified by key "${e}"`, r);
  } else if (ae(e))
    qe(o, e.bind(n));
  else if (ve(e))
    if (ee(e))
      e.forEach((r) => ra(r, t, n, s));
    else {
      const r = ae(e.handler) ? e.handler.bind(n) : t[e.handler];
      ae(r) ? qe(o, r, e) : process.env.NODE_ENV !== "production" && B(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && B(`Invalid watch option: "${s}"`, e);
}
function ia(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: a }
  } = e.appContext, c = r.get(t);
  let u;
  return c ? u = c : !o.length && !n && !s ? u = t : (u = {}, o.length && o.forEach(
    (p) => no(u, p, a, !0)
  ), no(u, t, a)), ve(t) && r.set(t, u), u;
}
function no(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && no(e, r, n, !0), o && o.forEach(
    (a) => no(e, a, n, !0)
  );
  for (const a in t)
    if (s && a === "expose")
      process.env.NODE_ENV !== "production" && B(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Zu[a] || n && n[a];
      e[a] = c ? c(e[a], t[a]) : t[a];
    }
  return e;
}
const Zu = {
  data: ai,
  props: ci,
  emits: ci,
  // objects
  methods: ns,
  computed: ns,
  // lifecycle
  beforeCreate: Je,
  created: Je,
  beforeMount: Je,
  mounted: Je,
  beforeUpdate: Je,
  updated: Je,
  beforeDestroy: Je,
  beforeUnmount: Je,
  destroyed: Je,
  unmounted: Je,
  activated: Je,
  deactivated: Je,
  errorCaptured: Je,
  serverPrefetch: Je,
  // assets
  components: ns,
  directives: ns,
  // watch
  watch: td,
  // provide / inject
  provide: ai,
  inject: ed
};
function ai(e, t) {
  return t ? e ? function() {
    return Ae(
      ae(e) ? e.call(this, this) : e,
      ae(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ed(e, t) {
  return ns(qo(e), qo(t));
}
function qo(e) {
  if (ee(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ns(e, t) {
  return e ? Ae(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ci(e, t) {
  return e ? ee(e) && ee(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ae(
    /* @__PURE__ */ Object.create(null),
    ii(e),
    ii(t ?? {})
  ) : t;
}
function td(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ae(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Je(e[s], t[s]);
  return n;
}
function la() {
  return {
    app: null,
    config: {
      isNativeTag: pl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let nd = 0;
function sd(e, t) {
  return function(s, o = null) {
    ae(s) || (s = Ae({}, s)), o != null && !ve(o) && (process.env.NODE_ENV !== "production" && B("root props passed to app.mount() must be an object."), o = null);
    const r = la(), a = /* @__PURE__ */ new WeakSet(), c = [];
    let u = !1;
    const p = r.app = {
      _uid: nd++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: yi,
      get config() {
        return r.config;
      },
      set config(h) {
        process.env.NODE_ENV !== "production" && B(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(h, ...f) {
        return a.has(h) ? process.env.NODE_ENV !== "production" && B("Plugin has already been applied to target app.") : h && ae(h.install) ? (a.add(h), h.install(p, ...f)) : ae(h) ? (a.add(h), h(p, ...f)) : process.env.NODE_ENV !== "production" && B(
          'A plugin must either be a function or an object with an "install" function.'
        ), p;
      },
      mixin(h) {
        return r.mixins.includes(h) ? process.env.NODE_ENV !== "production" && B(
          "Mixin has already been applied to target app" + (h.name ? `: ${h.name}` : "")
        ) : r.mixins.push(h), p;
      },
      component(h, f) {
        return process.env.NODE_ENV !== "production" && Xo(h, r.config), f ? (process.env.NODE_ENV !== "production" && r.components[h] && B(`Component "${h}" has already been registered in target app.`), r.components[h] = f, p) : r.components[h];
      },
      directive(h, f) {
        return process.env.NODE_ENV !== "production" && Xl(h), f ? (process.env.NODE_ENV !== "production" && r.directives[h] && B(`Directive "${h}" has already been registered in target app.`), r.directives[h] = f, p) : r.directives[h];
      },
      mount(h, f, _) {
        if (u)
          process.env.NODE_ENV !== "production" && B(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && h.__vue_app__ && B(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const g = p._ceVNode || X(s, o);
          return g.appContext = r, _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const k = dn(g);
            k.el = null, e(k, h, _);
          }), e(g, h, _), u = !0, p._container = h, h.__vue_app__ = p, process.env.NODE_ENV !== "production" && (p._instance = g.component, bu(p, yi)), yo(g.component);
        }
      },
      onUnmount(h) {
        process.env.NODE_ENV !== "production" && typeof h != "function" && B(
          `Expected function as first argument to app.onUnmount(), but got ${typeof h}`
        ), c.push(h);
      },
      unmount() {
        u ? (Ut(
          c,
          p._instance,
          16
        ), e(null, p._container), process.env.NODE_ENV !== "production" && (p._instance = null, yu(p)), delete p._container.__vue_app__) : process.env.NODE_ENV !== "production" && B("Cannot unmount an app that is not mounted.");
      },
      provide(h, f) {
        return process.env.NODE_ENV !== "production" && h in r.provides && (be(r.provides, h) ? B(
          `App already provides property with key "${String(h)}". It will be overwritten with the new value.`
        ) : B(
          `App already provides property with key "${String(h)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[h] = f, p;
      },
      runWithContext(h) {
        const f = On;
        On = p;
        try {
          return h();
        } finally {
          On = f;
        }
      }
    };
    return p;
  };
}
let On = null;
const od = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${rt(t)}Modifiers`] || e[`${Xt(t)}Modifiers`];
function rd(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Oe;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: h,
      propsOptions: [f]
    } = e;
    if (h)
      if (!(t in h))
        (!f || !(gn(rt(t)) in f)) && B(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${gn(rt(t))}" prop.`
        );
      else {
        const _ = h[t];
        ae(_) && (_(...n) || B(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let o = n;
  const r = t.startsWith("update:"), a = r && od(s, t.slice(7));
  if (a && (a.trim && (o = n.map((h) => Te(h) ? h.trim() : h)), a.number && (o = n.map(po))), process.env.NODE_ENV !== "production" && Su(e, t, o), process.env.NODE_ENV !== "production") {
    const h = t.toLowerCase();
    h !== t && s[gn(h)] && B(
      `Event "${h}" is emitted in component ${ks(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Xt(
        t
      )}" instead of "${t}".`
    );
  }
  let c, u = s[c = gn(t)] || // also try camelCase event handler (#2249)
  s[c = gn(rt(t))];
  !u && r && (u = s[c = gn(Xt(t))]), u && Ut(
    u,
    e,
    6,
    o
  );
  const p = s[c + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, Ut(
      p,
      e,
      6,
      o
    );
  }
}
const id = /* @__PURE__ */ new WeakMap();
function aa(e, t, n = !1) {
  const s = n ? id : t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let a = {}, c = !1;
  if (!ae(e)) {
    const u = (p) => {
      const h = aa(p, t, !0);
      h && (c = !0, Ae(a, h));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !c ? (ve(e) && s.set(e, null), null) : (ee(r) ? r.forEach((u) => a[u] = null) : Ae(a, r), ve(e) && s.set(e, a), a);
}
function bo(e, t) {
  return !e || !bs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), be(e, t[0].toLowerCase() + t.slice(1)) || be(e, Xt(t)) || be(e, t));
}
let zo = !1;
function so() {
  zo = !0;
}
function ui(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    propsOptions: [r],
    slots: a,
    attrs: c,
    emit: u,
    render: p,
    renderCache: h,
    props: f,
    data: _,
    setupState: g,
    ctx: k,
    inheritAttrs: O
  } = e, W = eo(e);
  let V, I;
  process.env.NODE_ENV !== "production" && (zo = !1);
  try {
    if (n.shapeFlag & 4) {
      const D = o || s, T = process.env.NODE_ENV !== "production" && g.__isScriptSetup ? new Proxy(D, {
        get(b, S, x) {
          return B(
            `Property '${String(
              S
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(b, S, x);
        }
      }) : D;
      V = vt(
        p.call(
          T,
          D,
          h,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(f) : f,
          g,
          _,
          k
        )
      ), I = c;
    } else {
      const D = t;
      process.env.NODE_ENV !== "production" && c === f && so(), V = vt(
        D.length > 1 ? D(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(f) : f,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return so(), /* @__PURE__ */ Mt(c);
            },
            slots: a,
            emit: u
          } : { attrs: c, slots: a, emit: u }
        ) : D(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(f) : f,
          null
        )
      ), I = t.props ? c : ld(c);
    }
  } catch (D) {
    as.length = 0, ws(D, e, 1), V = X(it);
  }
  let L = V, te;
  if (process.env.NODE_ENV !== "production" && V.patchFlag > 0 && V.patchFlag & 2048 && ([L, te] = ca(V)), I && O !== !1) {
    const D = Object.keys(I), { shapeFlag: T } = L;
    if (D.length) {
      if (T & 7)
        r && D.some(zs) && (I = ad(
          I,
          r
        )), L = dn(L, I, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !zo && L.type !== it) {
        const b = Object.keys(c), S = [], x = [];
        for (let M = 0, A = b.length; M < A; M++) {
          const Q = b[M];
          bs(Q) ? zs(Q) || S.push(Q[2].toLowerCase() + Q.slice(3)) : x.push(Q);
        }
        x.length && B(
          `Extraneous non-props attributes (${x.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), S.length && B(
          `Extraneous non-emits event listeners (${S.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !di(L) && B(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), L = dn(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !di(L) && B(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), kr(L, n.transition)), process.env.NODE_ENV !== "production" && te ? te(L) : V = L, eo(W), V;
}
const ca = (e) => {
  const t = e.children, n = e.dynamicChildren, s = Dr(t, !1);
  if (s) {
    if (process.env.NODE_ENV !== "production" && s.patchFlag > 0 && s.patchFlag & 2048)
      return ca(s);
  } else return [e, void 0];
  const o = t.indexOf(s), r = n ? n.indexOf(s) : -1, a = (c) => {
    t[o] = c, n && (r > -1 ? n[r] = c : c.patchFlag > 0 && (e.dynamicChildren = [...n, c]));
  };
  return [vt(s), a];
};
function Dr(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    if (kn(o)) {
      if (o.type !== it || o.children === "v-if") {
        if (n)
          return;
        if (n = o, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Dr(n.children);
      }
    } else
      return;
  }
  return n;
}
const ld = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || bs(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ad = (e, t) => {
  const n = {};
  for (const s in e)
    (!zs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
}, di = (e) => e.shapeFlag & 7 || e.type === it;
function cd(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: a, children: c, patchFlag: u } = t, p = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (o || c) && Ft || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? fi(s, a, p) : !!a;
    if (u & 8) {
      const h = t.dynamicProps;
      for (let f = 0; f < h.length; f++) {
        const _ = h[f];
        if (ua(a, s, _) && !bo(p, _))
          return !0;
      }
    }
  } else
    return (o || c) && (!c || !c.$stable) ? !0 : s === a ? !1 : s ? a ? fi(s, a, p) : !0 : !!a;
  return !1;
}
function fi(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (ua(t, e, r) && !bo(n, r))
      return !0;
  }
  return !1;
}
function ua(e, t, n) {
  const s = e[n], o = t[n];
  return n === "style" && ve(s) && ve(o) ? !an(s, o) : s !== o;
}
function ud({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const da = {}, fa = () => Object.create(da), pa = (e) => Object.getPrototypeOf(e) === da;
function dd(e, t, n, s = !1) {
  const o = {}, r = fa();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ha(e, t, o, r);
  for (const a in e.propsOptions[0])
    a in o || (o[a] = void 0);
  process.env.NODE_ENV !== "production" && ma(t || {}, o, e), n ? e.props = s ? o : /* @__PURE__ */ Fl(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function fd(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function pd(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: a }
  } = e, c = /* @__PURE__ */ de(o), [u] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && fd(e)) && (s || a > 0) && !(a & 16)
  ) {
    if (a & 8) {
      const h = e.vnode.dynamicProps;
      for (let f = 0; f < h.length; f++) {
        let _ = h[f];
        if (bo(e.emitsOptions, _))
          continue;
        const g = t[_];
        if (u)
          if (be(r, _))
            g !== r[_] && (r[_] = g, p = !0);
          else {
            const k = rt(_);
            o[k] = Jo(
              u,
              c,
              k,
              g,
              e,
              !1
            );
          }
        else
          g !== r[_] && (r[_] = g, p = !0);
      }
    }
  } else {
    ha(e, t, o, r) && (p = !0);
    let h;
    for (const f in c)
      (!t || // for camelCase
      !be(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = Xt(f)) === f || !be(t, h))) && (u ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[h] !== void 0) && (o[f] = Jo(
        u,
        c,
        f,
        void 0,
        e,
        !0
      )) : delete o[f]);
    if (r !== c)
      for (const f in r)
        (!t || !be(t, f)) && (delete r[f], p = !0);
  }
  p && It(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && ma(t || {}, o, e);
}
function ha(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let a = !1, c;
  if (t)
    for (let u in t) {
      if (os(u))
        continue;
      const p = t[u];
      let h;
      o && be(o, h = rt(u)) ? !r || !r.includes(h) ? n[h] = p : (c || (c = {}))[h] = p : bo(e.emitsOptions, u) || (!(u in s) || p !== s[u]) && (s[u] = p, a = !0);
    }
  if (r) {
    const u = /* @__PURE__ */ de(n), p = c || Oe;
    for (let h = 0; h < r.length; h++) {
      const f = r[h];
      n[f] = Jo(
        o,
        u,
        f,
        p[f],
        e,
        !be(p, f)
      );
    }
  }
  return a;
}
function Jo(e, t, n, s, o, r) {
  const a = e[n];
  if (a != null) {
    const c = be(a, "default");
    if (c && s === void 0) {
      const u = a.default;
      if (a.type !== Function && !a.skipFactory && ae(u)) {
        const { propsDefaults: p } = o;
        if (n in p)
          s = p[n];
        else {
          const h = Ss(o);
          s = p[n] = u.call(
            null,
            t
          ), h();
        }
      } else
        s = u;
      o.ce && o.ce._setProp(n, s);
    }
    a[
      0
      /* shouldCast */
    ] && (r && !c ? s = !1 : a[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Xt(n)) && (s = !0));
  }
  return s;
}
const hd = /* @__PURE__ */ new WeakMap();
function _a(e, t, n = !1) {
  const s = n ? hd : t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, a = {}, c = [];
  let u = !1;
  if (!ae(e)) {
    const h = (f) => {
      u = !0;
      const [_, g] = _a(f, t, !0);
      Ae(a, _), g && c.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !u)
    return ve(e) && s.set(e, Fn), Fn;
  if (ee(r))
    for (let h = 0; h < r.length; h++) {
      process.env.NODE_ENV !== "production" && !Te(r[h]) && B("props must be strings when using array syntax.", r[h]);
      const f = rt(r[h]);
      pi(f) && (a[f] = Oe);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !ve(r) && B("invalid props options", r);
    for (const h in r) {
      const f = rt(h);
      if (pi(f)) {
        const _ = r[h], g = a[f] = ee(_) || ae(_) ? { type: _ } : Ae({}, _), k = g.type;
        let O = !1, W = !0;
        if (ee(k))
          for (let V = 0; V < k.length; ++V) {
            const I = k[V], L = ae(I) && I.name;
            if (L === "Boolean") {
              O = !0;
              break;
            } else L === "String" && (W = !1);
          }
        else
          O = ae(k) && k.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = O, g[
          1
          /* shouldCastTrue */
        ] = W, (O || be(g, "default")) && c.push(f);
      }
    }
  }
  const p = [a, c];
  return ve(e) && s.set(e, p), p;
}
function pi(e) {
  return e[0] !== "$" && !os(e) ? !0 : (process.env.NODE_ENV !== "production" && B(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function _d(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function ma(e, t, n) {
  const s = /* @__PURE__ */ de(t), o = n.propsOptions[0], r = Object.keys(e).map((a) => rt(a));
  for (const a in o) {
    let c = o[a];
    c != null && md(
      a,
      s[a],
      c,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(s) : s,
      !r.includes(a)
    );
  }
}
function md(e, t, n, s, o) {
  const { type: r, required: a, validator: c, skipCheck: u } = n;
  if (a && o) {
    B('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !a)) {
    if (r != null && r !== !0 && !u) {
      let p = !1;
      const h = ee(r) ? r : [r], f = [];
      for (let _ = 0; _ < h.length && !p; _++) {
        const { valid: g, expectedType: k } = vd(t, h[_]);
        f.push(k || ""), p = g;
      }
      if (!p) {
        B(bd(e, t, f));
        return;
      }
    }
    c && !c(t, s) && B('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const gd = /* @__PURE__ */ Zt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function vd(e, t) {
  let n;
  const s = _d(t);
  if (s === "null")
    n = e === null;
  else if (gd(s)) {
    const o = typeof e;
    n = o === s.toLowerCase(), !n && o === "object" && (n = e instanceof t);
  } else s === "Object" ? n = ve(e) : s === "Array" ? n = ee(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: s
  };
}
function bd(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let s = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(fo).join(" | ")}`;
  const o = n[0], r = _r(t), a = hi(t, o), c = hi(t, r);
  return n.length === 1 && _i(o) && !yd(o, r) && (s += ` with value ${a}`), s += `, got ${r} `, _i(r) && (s += `with value ${c}.`), s;
}
function hi(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function _i(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function yd(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Tr = (e) => e === "_" || e === "_ctx" || e === "$stable", Pr = (e) => ee(e) ? e.map(vt) : [vt(e)], Ed = (e, t, n) => {
  if (t._n)
    return t;
  const s = ie((...o) => (process.env.NODE_ENV !== "production" && Me && !(n === null && je) && !(n && n.root !== Me.root) && B(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Pr(t(...o))), n);
  return s._c = !1, s;
}, ga = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (Tr(o)) continue;
    const r = e[o];
    if (ae(r))
      t[o] = Ed(o, r, s);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && B(
        `Non-function value encountered for slot "${o}". Prefer function slots for better performance.`
      );
      const a = Pr(r);
      t[o] = () => a;
    }
  }
}, va = (e, t) => {
  process.env.NODE_ENV !== "production" && !Cr(e.vnode) && B(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Pr(t);
  e.slots.default = () => n;
}, Qo = (e, t, n) => {
  for (const s in t)
    (n || !Tr(s)) && (e[s] = t[s]);
}, wd = (e, t, n) => {
  const s = e.slots = fa();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Qo(s, t, n), n && Js(s, "_", o, !0)) : ga(t, s);
  } else t && va(e, t);
}, Nd = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, a = Oe;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? process.env.NODE_ENV !== "production" && Ft ? (Qo(o, t, n), It(e, "set", "$slots")) : n && c === 1 ? r = !1 : Qo(o, t, n) : (r = !t.$stable, ga(t, o)), a = t;
  } else t && (va(e, t), a = { default: 1 });
  if (r)
    for (const c in o)
      !Tr(c) && a[c] == null && delete o[c];
};
let Yn, Wt;
function Dn(e, t) {
  e.appContext.config.performance && oo() && Wt.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && $u(e, t, oo() ? Wt.now() : Date.now());
}
function Tn(e, t) {
  if (e.appContext.config.performance && oo()) {
    const n = `vue-${t}-${e.uid}`, s = n + ":end", o = `<${ks(e, e.type)}> ${t}`;
    Wt.mark(s), Wt.measure(o, n, s), Wt.clearMeasures(o), Wt.clearMarks(n), Wt.clearMarks(s);
  }
  process.env.NODE_ENV !== "production" && Ou(e, t, oo() ? Wt.now() : Date.now());
}
function oo() {
  return Yn !== void 0 || (typeof window < "u" && window.performance ? (Yn = !0, Wt = window.performance) : Yn = !1), Yn;
}
function $d() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const ot = xd;
function Od(e) {
  return Sd(e);
}
function Sd(e, t) {
  $d();
  const n = Es();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && $r(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: s,
    remove: o,
    patchProp: r,
    createElement: a,
    createText: c,
    createComment: u,
    setText: p,
    setElementText: h,
    parentNode: f,
    nextSibling: _,
    setScopeId: g = Le,
    insertStaticContent: k
  } = e, O = (m, v, $, F = null, R = null, j = null, K = void 0, G = null, H = process.env.NODE_ENV !== "production" && Ft ? !1 : !!v.dynamicChildren) => {
    if (m === v)
      return;
    m && !Xn(m, v) && (F = z(m), tt(m, R, j, !0), m = null), v.patchFlag === -2 && (H = !1, v.dynamicChildren = null);
    const { type: U, ref: re, shapeFlag: y } = v;
    switch (U) {
      case Os:
        W(m, v, $, F);
        break;
      case it:
        V(m, v, $, F);
        break;
      case Us:
        m == null ? I(v, $, F, K) : process.env.NODE_ENV !== "production" && L(m, v, $, K);
        break;
      case Y:
        he(
          m,
          v,
          $,
          F,
          R,
          j,
          K,
          G,
          H
        );
        break;
      default:
        y & 1 ? T(
          m,
          v,
          $,
          F,
          R,
          j,
          K,
          G,
          H
        ) : y & 6 ? Re(
          m,
          v,
          $,
          F,
          R,
          j,
          K,
          G,
          H
        ) : y & 64 || y & 128 ? U.process(
          m,
          v,
          $,
          F,
          R,
          j,
          K,
          G,
          H,
          le
        ) : process.env.NODE_ENV !== "production" && B("Invalid VNode type:", U, `(${typeof U})`);
    }
    re != null && R ? ls(re, m && m.ref, j, v || m, !v) : re == null && m && m.ref != null && ls(m.ref, null, j, m, !0);
  }, W = (m, v, $, F) => {
    if (m == null)
      s(
        v.el = c(v.children),
        $,
        F
      );
    else {
      const R = v.el = m.el;
      v.children !== m.children && p(R, v.children);
    }
  }, V = (m, v, $, F) => {
    m == null ? s(
      v.el = u(v.children || ""),
      $,
      F
    ) : v.el = m.el;
  }, I = (m, v, $, F) => {
    [m.el, m.anchor] = k(
      m.children,
      v,
      $,
      F,
      m.el,
      m.anchor
    );
  }, L = (m, v, $, F) => {
    if (v.children !== m.children) {
      const R = _(m.anchor);
      D(m), [v.el, v.anchor] = k(
        v.children,
        $,
        R,
        F
      );
    } else
      v.el = m.el, v.anchor = m.anchor;
  }, te = ({ el: m, anchor: v }, $, F) => {
    let R;
    for (; m && m !== v; )
      R = _(m), s(m, $, F), m = R;
    s(v, $, F);
  }, D = ({ el: m, anchor: v }) => {
    let $;
    for (; m && m !== v; )
      $ = _(m), o(m), m = $;
    o(v);
  }, T = (m, v, $, F, R, j, K, G, H) => {
    if (v.type === "svg" ? K = "svg" : v.type === "math" && (K = "mathml"), m == null)
      b(
        v,
        $,
        F,
        R,
        j,
        K,
        G,
        H
      );
    else {
      const U = m.el && m.el._isVueCE ? m.el : null;
      try {
        U && U._beginPatch(), M(
          m,
          v,
          R,
          j,
          K,
          G,
          H
        );
      } finally {
        U && U._endPatch();
      }
    }
  }, b = (m, v, $, F, R, j, K, G) => {
    let H, U;
    const { props: re, shapeFlag: y, transition: P, dirs: N } = m;
    if (H = m.el = a(
      m.type,
      j,
      re && re.is,
      re
    ), y & 8 ? h(H, m.children) : y & 16 && x(
      m.children,
      H,
      null,
      F,
      R,
      Do(m, j),
      K,
      G
    ), N && _n(m, null, F, "created"), S(H, m, m.scopeId, K, F), re) {
      for (const pe in re)
        pe !== "value" && !os(pe) && r(H, pe, null, re[pe], j, F);
      "value" in re && r(H, "value", null, re.value, j), (U = re.onVnodeBeforeMount) && Pt(U, F, m);
    }
    process.env.NODE_ENV !== "production" && (Js(H, "__vnode", m, !0), Js(H, "__vueParentComponent", F, !0)), N && _n(m, null, F, "beforeMount");
    const q = kd(R, P);
    q && P.beforeEnter(H), s(H, v, $), ((U = re && re.onVnodeMounted) || q || N) && ot(() => {
      U && Pt(U, F, m), q && P.enter(H), N && _n(m, null, F, "mounted");
    }, R);
  }, S = (m, v, $, F, R) => {
    if ($ && g(m, $), F)
      for (let j = 0; j < F.length; j++)
        g(m, F[j]);
    if (R) {
      let j = R.subTree;
      if (process.env.NODE_ENV !== "production" && j.patchFlag > 0 && j.patchFlag & 2048 && (j = Dr(j.children) || j), v === j || Ea(j.type) && (j.ssContent === v || j.ssFallback === v)) {
        const K = R.vnode;
        S(
          m,
          K,
          K.scopeId,
          K.slotScopeIds,
          R.parent
        );
      }
    }
  }, x = (m, v, $, F, R, j, K, G, H = 0) => {
    for (let U = H; U < m.length; U++) {
      const re = m[U] = G ? qt(m[U]) : vt(m[U]);
      O(
        null,
        re,
        v,
        $,
        F,
        R,
        j,
        K,
        G
      );
    }
  }, M = (m, v, $, F, R, j, K) => {
    const G = v.el = m.el;
    process.env.NODE_ENV !== "production" && (G.__vnode = v);
    let { patchFlag: H, dynamicChildren: U, dirs: re } = v;
    H |= m.patchFlag & 16;
    const y = m.props || Oe, P = v.props || Oe;
    let N;
    if ($ && mn($, !1), (N = P.onVnodeBeforeUpdate) && Pt(N, $, v, m), re && _n(v, m, $, "beforeUpdate"), $ && mn($, !0), process.env.NODE_ENV !== "production" && Ft && (H = 0, K = !1, U = null), (y.innerHTML && P.innerHTML == null || y.textContent && P.textContent == null) && h(G, ""), U ? (A(
      m.dynamicChildren,
      U,
      G,
      $,
      F,
      Do(v, R),
      j
    ), process.env.NODE_ENV !== "production" && js(m, v)) : K || Ee(
      m,
      v,
      G,
      null,
      $,
      F,
      Do(v, R),
      j,
      !1
    ), H > 0) {
      if (H & 16)
        Q(G, y, P, $, R);
      else if (H & 2 && y.class !== P.class && r(G, "class", null, P.class, R), H & 4 && r(G, "style", y.style, P.style, R), H & 8) {
        const q = v.dynamicProps;
        for (let pe = 0; pe < q.length; pe++) {
          const Ne = q[pe], nt = y[Ne], st = P[Ne];
          (st !== nt || Ne === "value") && r(G, Ne, nt, st, R, $);
        }
      }
      H & 1 && m.children !== v.children && h(G, v.children);
    } else !K && U == null && Q(G, y, P, $, R);
    ((N = P.onVnodeUpdated) || re) && ot(() => {
      N && Pt(N, $, v, m), re && _n(v, m, $, "updated");
    }, F);
  }, A = (m, v, $, F, R, j, K) => {
    for (let G = 0; G < v.length; G++) {
      const H = m[G], U = v[G], re = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        H.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (H.type === Y || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Xn(H, U) || // - In the case of a component, it could contain anything.
        H.shapeFlag & 198) ? f(H.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          $
        )
      );
      O(
        H,
        U,
        re,
        null,
        F,
        R,
        j,
        K,
        !0
      );
    }
  }, Q = (m, v, $, F, R) => {
    if (v !== $) {
      if (v !== Oe)
        for (const j in v)
          !os(j) && !(j in $) && r(
            m,
            j,
            v[j],
            null,
            R,
            F
          );
      for (const j in $) {
        if (os(j)) continue;
        const K = $[j], G = v[j];
        K !== G && j !== "value" && r(m, j, G, K, R, F);
      }
      "value" in $ && r(m, "value", v.value, $.value, R);
    }
  }, he = (m, v, $, F, R, j, K, G, H) => {
    const U = v.el = m ? m.el : c(""), re = v.anchor = m ? m.anchor : c("");
    let { patchFlag: y, dynamicChildren: P, slotScopeIds: N } = v;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Ft || y & 2048) && (y = 0, H = !1, P = null), N && (G = G ? G.concat(N) : N), m == null ? (s(U, $, F), s(re, $, F), x(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      v.children || [],
      $,
      re,
      R,
      j,
      K,
      G,
      H
    )) : y > 0 && y & 64 && P && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    m.dynamicChildren && m.dynamicChildren.length === P.length ? (A(
      m.dynamicChildren,
      P,
      $,
      R,
      j,
      K,
      G
    ), process.env.NODE_ENV !== "production" ? js(m, v) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (v.key != null || R && v === R.subTree) && js(
        m,
        v,
        !0
        /* shallow */
      )
    )) : Ee(
      m,
      v,
      $,
      re,
      R,
      j,
      K,
      G,
      H
    );
  }, Re = (m, v, $, F, R, j, K, G, H) => {
    v.slotScopeIds = G, m == null ? v.shapeFlag & 512 ? R.ctx.activate(
      v,
      $,
      F,
      K,
      H
    ) : Se(
      v,
      $,
      F,
      R,
      j,
      K,
      H
    ) : fe(m, v, H);
  }, Se = (m, v, $, F, R, j, K) => {
    const G = m.component = Id(
      m,
      F,
      R
    );
    if (process.env.NODE_ENV !== "production" && G.type.__hmrId && _u(G), process.env.NODE_ENV !== "production" && (Is(m), Dn(G, "mount")), Cr(m) && (G.ctx.renderer = le), process.env.NODE_ENV !== "production" && Dn(G, "init"), Fd(G, !1, K), process.env.NODE_ENV !== "production" && Tn(G, "init"), process.env.NODE_ENV !== "production" && Ft && (m.el = null), G.asyncDep) {
      if (R && R.registerDep(G, ue, K), !m.el) {
        const H = G.subTree = X(it);
        V(null, H, v, $), m.placeholder = H.el;
      }
    } else
      ue(
        G,
        m,
        v,
        $,
        R,
        j,
        K
      );
    process.env.NODE_ENV !== "production" && (Ms(), Tn(G, "mount"));
  }, fe = (m, v, $) => {
    const F = v.component = m.component;
    if (cd(m, v, $))
      if (F.asyncDep && !F.asyncResolved) {
        process.env.NODE_ENV !== "production" && Is(v), se(F, v, $), process.env.NODE_ENV !== "production" && Ms();
        return;
      } else
        F.next = v, F.update();
    else
      v.el = m.el, F.vnode = v;
  }, ue = (m, v, $, F, R, j, K) => {
    const G = () => {
      if (m.isMounted) {
        let { next: y, bu: P, u: N, parent: q, vnode: pe } = m;
        {
          const Dt = ba(m);
          if (Dt) {
            y && (y.el = pe.el, se(m, y, K)), Dt.asyncDep.then(() => {
              ot(() => {
                m.isUnmounted || U();
              }, R);
            });
            return;
          }
        }
        let Ne = y, nt;
        process.env.NODE_ENV !== "production" && Is(y || m.vnode), mn(m, !1), y ? (y.el = pe.el, se(m, y, K)) : y = pe, P && Vn(P), (nt = y.props && y.props.onVnodeBeforeUpdate) && Pt(nt, q, y, pe), mn(m, !0), process.env.NODE_ENV !== "production" && Dn(m, "render");
        const st = ui(m);
        process.env.NODE_ENV !== "production" && Tn(m, "render");
        const xt = m.subTree;
        m.subTree = st, process.env.NODE_ENV !== "production" && Dn(m, "patch"), O(
          xt,
          st,
          // parent may have changed if it's in a teleport
          f(xt.el),
          // anchor may have changed if it's in a fragment
          z(xt),
          m,
          R,
          j
        ), process.env.NODE_ENV !== "production" && Tn(m, "patch"), y.el = st.el, Ne === null && ud(m, st.el), N && ot(N, R), (nt = y.props && y.props.onVnodeUpdated) && ot(
          () => Pt(nt, q, y, pe),
          R
        ), process.env.NODE_ENV !== "production" && Jl(m), process.env.NODE_ENV !== "production" && Ms();
      } else {
        let y;
        const { el: P, props: N } = v, { bm: q, m: pe, parent: Ne, root: nt, type: st } = m, xt = jn(v);
        mn(m, !1), q && Vn(q), !xt && (y = N && N.onVnodeBeforeMount) && Pt(y, Ne, v), mn(m, !0);
        {
          nt.ce && nt.ce._hasShadowRoot() && nt.ce._injectChildStyle(
            st,
            m.parent ? m.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && Dn(m, "render");
          const Dt = m.subTree = ui(m);
          process.env.NODE_ENV !== "production" && Tn(m, "render"), process.env.NODE_ENV !== "production" && Dn(m, "patch"), O(
            null,
            Dt,
            $,
            F,
            m,
            R,
            j
          ), process.env.NODE_ENV !== "production" && Tn(m, "patch"), v.el = Dt.el;
        }
        if (pe && ot(pe, R), !xt && (y = N && N.onVnodeMounted)) {
          const Dt = v;
          ot(
            () => Pt(y, Ne, Dt),
            R
          );
        }
        (v.shapeFlag & 256 || Ne && jn(Ne.vnode) && Ne.vnode.shapeFlag & 256) && m.a && ot(m.a, R), m.isMounted = !0, process.env.NODE_ENV !== "production" && Eu(m), v = $ = F = null;
      }
    };
    m.scope.on();
    const H = m.effect = new wl(G);
    m.scope.off();
    const U = m.update = H.run.bind(H), re = m.job = H.runIfDirty.bind(H);
    re.i = m, re.id = m.uid, H.scheduler = () => go(re), mn(m, !0), process.env.NODE_ENV !== "production" && (H.onTrack = m.rtc ? (y) => Vn(m.rtc, y) : void 0, H.onTrigger = m.rtg ? (y) => Vn(m.rtg, y) : void 0), U();
  }, se = (m, v, $) => {
    v.component = m;
    const F = m.vnode.props;
    m.vnode = v, m.next = null, pd(m, v.props, F, $), Nd(m, v.children, $), $t(), ei(m), Ot();
  }, Ee = (m, v, $, F, R, j, K, G, H = !1) => {
    const U = m && m.children, re = m ? m.shapeFlag : 0, y = v.children, { patchFlag: P, shapeFlag: N } = v;
    if (P > 0) {
      if (P & 128) {
        Ct(
          U,
          y,
          $,
          F,
          R,
          j,
          K,
          G,
          H
        );
        return;
      } else if (P & 256) {
        lt(
          U,
          y,
          $,
          F,
          R,
          j,
          K,
          G,
          H
        );
        return;
      }
    }
    N & 8 ? (re & 16 && C(U, R, j), y !== U && h($, y)) : re & 16 ? N & 16 ? Ct(
      U,
      y,
      $,
      F,
      R,
      j,
      K,
      G,
      H
    ) : C(U, R, j, !0) : (re & 8 && h($, ""), N & 16 && x(
      y,
      $,
      F,
      R,
      j,
      K,
      G,
      H
    ));
  }, lt = (m, v, $, F, R, j, K, G, H) => {
    m = m || Fn, v = v || Fn;
    const U = m.length, re = v.length, y = Math.min(U, re);
    let P;
    for (P = 0; P < y; P++) {
      const N = v[P] = H ? qt(v[P]) : vt(v[P]);
      O(
        m[P],
        N,
        $,
        null,
        R,
        j,
        K,
        G,
        H
      );
    }
    U > re ? C(
      m,
      R,
      j,
      !0,
      !1,
      y
    ) : x(
      v,
      $,
      F,
      R,
      j,
      K,
      G,
      H,
      y
    );
  }, Ct = (m, v, $, F, R, j, K, G, H) => {
    let U = 0;
    const re = v.length;
    let y = m.length - 1, P = re - 1;
    for (; U <= y && U <= P; ) {
      const N = m[U], q = v[U] = H ? qt(v[U]) : vt(v[U]);
      if (Xn(N, q))
        O(
          N,
          q,
          $,
          null,
          R,
          j,
          K,
          G,
          H
        );
      else
        break;
      U++;
    }
    for (; U <= y && U <= P; ) {
      const N = m[y], q = v[P] = H ? qt(v[P]) : vt(v[P]);
      if (Xn(N, q))
        O(
          N,
          q,
          $,
          null,
          R,
          j,
          K,
          G,
          H
        );
      else
        break;
      y--, P--;
    }
    if (U > y) {
      if (U <= P) {
        const N = P + 1, q = N < re ? v[N].el : F;
        for (; U <= P; )
          O(
            null,
            v[U] = H ? qt(v[U]) : vt(v[U]),
            $,
            q,
            R,
            j,
            K,
            G,
            H
          ), U++;
      }
    } else if (U > P)
      for (; U <= y; )
        tt(m[U], R, j, !0), U++;
    else {
      const N = U, q = U, pe = /* @__PURE__ */ new Map();
      for (U = q; U <= P; U++) {
        const ze = v[U] = H ? qt(v[U]) : vt(v[U]);
        ze.key != null && (process.env.NODE_ENV !== "production" && pe.has(ze.key) && B(
          "Duplicate keys found during update:",
          JSON.stringify(ze.key),
          "Make sure keys are unique."
        ), pe.set(ze.key, U));
      }
      let Ne, nt = 0;
      const st = P - q + 1;
      let xt = !1, Dt = 0;
      const Jn = new Array(st);
      for (U = 0; U < st; U++) Jn[U] = 0;
      for (U = N; U <= y; U++) {
        const ze = m[U];
        if (nt >= st) {
          tt(ze, R, j, !0);
          continue;
        }
        let Tt;
        if (ze.key != null)
          Tt = pe.get(ze.key);
        else
          for (Ne = q; Ne <= P; Ne++)
            if (Jn[Ne - q] === 0 && Xn(ze, v[Ne])) {
              Tt = Ne;
              break;
            }
        Tt === void 0 ? tt(ze, R, j, !0) : (Jn[Tt - q] = U + 1, Tt >= Dt ? Dt = Tt : xt = !0, O(
          ze,
          v[Tt],
          $,
          null,
          R,
          j,
          K,
          G,
          H
        ), nt++);
      }
      const Kr = xt ? Cd(Jn) : Fn;
      for (Ne = Kr.length - 1, U = st - 1; U >= 0; U--) {
        const ze = q + U, Tt = v[ze], Wr = v[ze + 1], qr = ze + 1 < re ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Wr.el || ya(Wr)
        ) : F;
        Jn[U] === 0 ? O(
          null,
          Tt,
          $,
          qr,
          R,
          j,
          K,
          G,
          H
        ) : xt && (Ne < 0 || U !== Kr[Ne] ? et(Tt, $, qr, 2) : Ne--);
      }
    }
  }, et = (m, v, $, F, R = null) => {
    const { el: j, type: K, transition: G, children: H, shapeFlag: U } = m;
    if (U & 6) {
      et(m.component.subTree, v, $, F);
      return;
    }
    if (U & 128) {
      m.suspense.move(v, $, F);
      return;
    }
    if (U & 64) {
      K.move(m, v, $, le);
      return;
    }
    if (K === Y) {
      s(j, v, $);
      for (let y = 0; y < H.length; y++)
        et(H[y], v, $, F);
      s(m.anchor, v, $);
      return;
    }
    if (K === Us) {
      te(m, v, $);
      return;
    }
    if (F !== 2 && U & 1 && G)
      if (F === 0)
        G.beforeEnter(j), s(j, v, $), ot(() => G.enter(j), R);
      else {
        const { leave: y, delayLeave: P, afterLeave: N } = G, q = () => {
          m.ctx.isUnmounted ? o(j) : s(j, v, $);
        }, pe = () => {
          j._isLeaving && j[Au](
            !0
            /* cancelled */
          ), y(j, () => {
            q(), N && N();
          });
        };
        P ? P(j, q, pe) : pe();
      }
    else
      s(j, v, $);
  }, tt = (m, v, $, F = !1, R = !1) => {
    const {
      type: j,
      props: K,
      ref: G,
      children: H,
      dynamicChildren: U,
      shapeFlag: re,
      patchFlag: y,
      dirs: P,
      cacheIndex: N
    } = m;
    if (y === -2 && (R = !1), G != null && ($t(), ls(G, null, $, m, !0), Ot()), N != null && (v.renderCache[N] = void 0), re & 256) {
      v.ctx.deactivate(m);
      return;
    }
    const q = re & 1 && P, pe = !jn(m);
    let Ne;
    if (pe && (Ne = K && K.onVnodeBeforeUnmount) && Pt(Ne, v, m), re & 6)
      at(m.component, $, F);
    else {
      if (re & 128) {
        m.suspense.unmount($, F);
        return;
      }
      q && _n(m, null, v, "beforeUnmount"), re & 64 ? m.type.remove(
        m,
        v,
        $,
        le,
        F
      ) : U && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !U.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (j !== Y || y > 0 && y & 64) ? C(
        U,
        v,
        $,
        !1,
        !0
      ) : (j === Y && y & 384 || !R && re & 16) && C(H, v, $), F && Ge(m);
    }
    (pe && (Ne = K && K.onVnodeUnmounted) || q) && ot(() => {
      Ne && Pt(Ne, v, m), q && _n(m, null, v, "unmounted");
    }, $);
  }, Ge = (m) => {
    const { type: v, el: $, anchor: F, transition: R } = m;
    if (v === Y) {
      process.env.NODE_ENV !== "production" && m.patchFlag > 0 && m.patchFlag & 2048 && R && !R.persisted ? m.children.forEach((K) => {
        K.type === it ? o(K.el) : Ge(K);
      }) : Ue($, F);
      return;
    }
    if (v === Us) {
      D(m);
      return;
    }
    const j = () => {
      o($), R && !R.persisted && R.afterLeave && R.afterLeave();
    };
    if (m.shapeFlag & 1 && R && !R.persisted) {
      const { leave: K, delayLeave: G } = R, H = () => K($, j);
      G ? G(m.el, j, H) : H();
    } else
      j();
  }, Ue = (m, v) => {
    let $;
    for (; m !== v; )
      $ = _(m), o(m), m = $;
    o(v);
  }, at = (m, v, $) => {
    process.env.NODE_ENV !== "production" && m.type.__hmrId && mu(m);
    const { bum: F, scope: R, job: j, subTree: K, um: G, m: H, a: U } = m;
    mi(H), mi(U), F && Vn(F), R.stop(), j && (j.flags |= 8, tt(K, m, v, $)), G && ot(G, v), ot(() => {
      m.isUnmounted = !0;
    }, v), process.env.NODE_ENV !== "production" && Nu(m);
  }, C = (m, v, $, F = !1, R = !1, j = 0) => {
    for (let K = j; K < m.length; K++)
      tt(m[K], v, $, F, R);
  }, z = (m) => {
    if (m.shapeFlag & 6)
      return z(m.component.subTree);
    if (m.shapeFlag & 128)
      return m.suspense.next();
    const v = _(m.anchor || m.el), $ = v && v[Pu];
    return $ ? _($) : v;
  };
  let J = !1;
  const oe = (m, v, $) => {
    let F;
    m == null ? v._vnode && (tt(v._vnode, null, null, !0), F = v._vnode.component) : O(
      v._vnode || null,
      m,
      v,
      null,
      null,
      null,
      $
    ), v._vnode = m, J || (J = !0, ei(F), Wl(), J = !1);
  }, le = {
    p: O,
    um: tt,
    m: et,
    r: Ge,
    mt: Se,
    mc: x,
    pc: Ee,
    pbc: A,
    n: z,
    o: e
  };
  return {
    render: oe,
    hydrate: void 0,
    createApp: sd(oe)
  };
}
function Do({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function mn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function js(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (ee(s) && ee(o))
    for (let r = 0; r < s.length; r++) {
      const a = s[r];
      let c = o[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = o[r] = qt(o[r]), c.el = a.el), !n && c.patchFlag !== -2 && js(a, c)), c.type === Os && (c.patchFlag === -1 && (c = o[r] = qt(c)), c.el = a.el), c.type === it && !c.el && (c.el = a.el), process.env.NODE_ENV !== "production" && c.el && (c.el.__vnode = c);
    }
}
function Cd(e) {
  const t = e.slice(), n = [0];
  let s, o, r, a, c;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const p = e[s];
    if (p !== 0) {
      if (o = n[n.length - 1], e[o] < p) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, a = n.length - 1; r < a; )
        c = r + a >> 1, e[n[c]] < p ? r = c + 1 : a = c;
      p < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, a = n[r - 1]; r-- > 0; )
    n[r] = a, a = t[a];
  return n;
}
function ba(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ba(t);
}
function mi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function ya(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? ya(t.subTree) : null;
}
const Ea = (e) => e.__isSuspense;
function xd(e, t) {
  t && t.pendingBranch ? ee(e) ? t.effects.push(...e) : t.effects.push(e) : Kl(e);
}
const Y = /* @__PURE__ */ Symbol.for("v-fgt"), Os = /* @__PURE__ */ Symbol.for("v-txt"), it = /* @__PURE__ */ Symbol.for("v-cmt"), Us = /* @__PURE__ */ Symbol.for("v-stc"), as = [];
let ct = null;
function E(e = !1) {
  as.push(ct = e ? null : []);
}
function Dd() {
  as.pop(), ct = as[as.length - 1] || null;
}
let _s = 1;
function ro(e, t = !1) {
  _s += e, e < 0 && ct && t && (ct.hasOnce = !0);
}
function wa(e) {
  return e.dynamicChildren = _s > 0 ? ct || Fn : null, Dd(), _s > 0 && ct && ct.push(e), e;
}
function w(e, t, n, s, o, r) {
  return wa(
    i(
      e,
      t,
      n,
      s,
      o,
      r,
      !0
    )
  );
}
function un(e, t, n, s, o) {
  return wa(
    X(
      e,
      t,
      n,
      s,
      o,
      !0
    )
  );
}
function kn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Xn(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = Fs.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Td = (...e) => $a(
  ...e
), Na = ({ key: e }) => e ?? null, Hs = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Te(e) || /* @__PURE__ */ ke(e) || ae(e) ? { i: je, r: e, k: t, f: !!n } : e : null);
function i(e, t = null, n = null, s = 0, o = null, r = e === Y ? 0 : 1, a = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Na(t),
    ref: t && Hs(t),
    scopeId: Yl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: je
  };
  return c ? (Ar(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= Te(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && B("VNode created with invalid key (NaN). VNode type:", u.type), _s > 0 && // avoid a block node from tracking itself
  !a && // has current parent block
  ct && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ct.push(u), u;
}
const X = process.env.NODE_ENV !== "production" ? Td : $a;
function $a(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === Wu) && (process.env.NODE_ENV !== "production" && !e && B(`Invalid vnode type when creating vnode: ${e}.`), e = it), kn(e)) {
    const c = dn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ar(c, n), _s > 0 && !r && ct && (c.shapeFlag & 6 ? ct[ct.indexOf(e)] = c : ct.push(c)), c.patchFlag = -2, c;
  }
  if (xa(e) && (e = e.__vccOpts), t) {
    t = Pd(t);
    let { class: c, style: u } = t;
    c && !Te(c) && (t.class = ge(c)), ve(u) && (/* @__PURE__ */ Un(u) && !ee(u) && (u = Ae({}, u)), t.style = mr(u));
  }
  const a = Te(e) ? 1 : Ea(e) ? 128 : Ru(e) ? 64 : ve(e) ? 4 : ae(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && a & 4 && /* @__PURE__ */ Un(e) && (e = /* @__PURE__ */ de(e), B(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), i(
    e,
    t,
    n,
    s,
    o,
    a,
    r,
    !0
  );
}
function Pd(e) {
  return e ? /* @__PURE__ */ Un(e) || pa(e) ? Ae({}, e) : e : null;
}
function dn(e, t, n = !1, s = !1) {
  const { props: o, ref: r, patchFlag: a, children: c, transition: u } = e, p = t ? Rd(o || {}, t) : o, h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && Na(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? ee(r) ? r.concat(Hs(t)) : [r, Hs(t)] : Hs(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && a === -1 && ee(c) ? c.map(Oa) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Y ? a === -1 ? 16 : a | 16 : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && dn(e.ssContent),
    ssFallback: e.ssFallback && dn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && s && kr(
    h,
    u.clone(h)
  ), h;
}
function Oa(e) {
  const t = dn(e);
  return ee(e.children) && (t.children = e.children.map(Oa)), t;
}
function Rr(e = " ", t = 0) {
  return X(Os, null, e, t);
}
function Ce(e = "", t = !1) {
  return t ? (E(), un(it, null, e)) : X(it, null, e);
}
function vt(e) {
  return e == null || typeof e == "boolean" ? X(it) : ee(e) ? X(
    Y,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : kn(e) ? qt(e) : X(Os, null, String(e));
}
function qt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : dn(e);
}
function Ar(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (ee(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ar(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !pa(t) ? t._ctx = je : o === 3 && je && (je.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ae(t) ? (t = { default: t, _ctx: je }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Rr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Rd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = ge([t.class, s.class]));
      else if (o === "style")
        t.style = mr([t.style, s.style]);
      else if (bs(o)) {
        const r = t[o], a = s[o];
        a && r !== a && !(ee(r) && r.includes(a)) && (t[o] = r ? [].concat(r, a) : a);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function Pt(e, t, n, s = null) {
  Ut(e, t, 7, [
    n,
    s
  ]);
}
const Ad = la();
let Vd = 0;
function Id(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || Ad, r = {
    uid: Vd++,
    vnode: e,
    type: s,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new bl(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: _a(s, o),
    emitsOptions: aa(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Oe,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Oe,
    data: Oe,
    props: Oe,
    attrs: Oe,
    slots: Oe,
    refs: Oe,
    setupState: Oe,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = qu(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = rd.bind(null, r), e.ce && e.ce(r), r;
}
let Me = null;
const zn = () => Me || je;
let io, Yo;
{
  const e = Es(), t = (n, s) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(s), (r) => {
      o.length > 1 ? o.forEach((a) => a(r)) : o[0](r);
    };
  };
  io = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Me = n
  ), Yo = t(
    "__VUE_SSR_SETTERS__",
    (n) => ms = n
  );
}
const Ss = (e) => {
  const t = Me;
  return io(e), e.scope.on(), () => {
    e.scope.off(), io(t);
  };
}, gi = () => {
  Me && Me.scope.off(), io(null);
}, Md = /* @__PURE__ */ Zt("slot,component");
function Xo(e, { isNativeTag: t }) {
  (Md(e) || t(e)) && B(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Sa(e) {
  return e.vnode.shapeFlag & 4;
}
let ms = !1;
function Fd(e, t = !1, n = !1) {
  t && Yo(t);
  const { props: s, children: o } = e.vnode, r = Sa(e);
  dd(e, s, r, t), wd(e, o, n || t);
  const a = r ? Ld(e, t) : void 0;
  return t && Yo(!1), a;
}
function Ld(e, t) {
  const n = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (n.name && Xo(n.name, e.appContext.config), n.components) {
      const o = Object.keys(n.components);
      for (let r = 0; r < o.length; r++)
        Xo(o[r], e.appContext.config);
    }
    if (n.directives) {
      const o = Object.keys(n.directives);
      for (let r = 0; r < o.length; r++)
        Xl(o[r]);
    }
    n.compilerOptions && jd() && B(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, oa), process.env.NODE_ENV !== "production" && zu(e);
  const { setup: s } = n;
  if (s) {
    $t();
    const o = e.setupContext = s.length > 1 ? Hd(e) : null, r = Ss(e), a = qn(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Mt(e.props) : e.props,
        o
      ]
    ), c = hr(a);
    if (Ot(), r(), (c || e.sp) && !jn(e) && ea(e), c) {
      if (a.then(gi, gi), t)
        return a.then((u) => {
          vi(e, u, t);
        }).catch((u) => {
          ws(u, e, 0);
        });
      if (e.asyncDep = a, process.env.NODE_ENV !== "production" && !e.suspense) {
        const u = ks(e, n);
        B(
          `Component <${u}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      vi(e, a, t);
  } else
    ka(e, t);
}
function vi(e, t, n) {
  ae(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ve(t) ? (process.env.NODE_ENV !== "production" && kn(t) && B(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = jl(t), process.env.NODE_ENV !== "production" && Ju(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && B(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), ka(e, n);
}
const jd = () => !0;
function ka(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Le);
  {
    const o = Ss(e);
    $t();
    try {
      Yu(e);
    } finally {
      Ot(), o();
    }
  }
  process.env.NODE_ENV !== "production" && !s.render && e.render === Le && !t && (s.template ? B(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : B("Component is missing template or render function: ", s));
}
const bi = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return so(), Fe(e, "get", ""), e[t];
  },
  set() {
    return B("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return B("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Fe(e, "get", ""), e[t];
  }
};
function Ud(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return Fe(e, "get", "$slots"), t[n];
    }
  });
}
function Hd(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && B("expose() should be called only once per setup()."), n != null)) {
      let s = typeof n;
      s === "object" && (ee(n) ? s = "array" : /* @__PURE__ */ ke(n) && (s = "ref")), s !== "object" && B(
        `expose() should be passed a plain object, received ${s}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, s;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, bi));
      },
      get slots() {
        return s || (s = Ud(e));
      },
      get emit() {
        return (o, ...r) => e.emit(o, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, bi),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function yo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(jl(on(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in $n)
        return $n[n](e);
    },
    has(t, n) {
      return n in t || n in $n;
    }
  })) : e.proxy;
}
const Gd = /(?:^|[-_])\w/g, Bd = (e) => e.replace(Gd, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ca(e, t = !0) {
  return ae(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function ks(e, t, n = !1) {
  let s = Ca(t);
  if (!s && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (s = o[1]);
  }
  if (!s && e) {
    const o = (r) => {
      for (const a in r)
        if (r[a] === t)
          return a;
    };
    s = o(e.components) || e.parent && o(
      e.parent.type.components
    ) || o(e.appContext.components);
  }
  return s ? Bd(s) : n ? "App" : "Anonymous";
}
function xa(e) {
  return ae(e) && "__vccOpts" in e;
}
const ne = (e, t) => {
  const n = /* @__PURE__ */ ru(e, t, ms);
  if (process.env.NODE_ENV !== "production") {
    const s = zn();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Da(e, t, n) {
  try {
    ro(-1);
    const s = arguments.length;
    return s === 2 ? ve(t) && !ee(t) ? kn(t) ? X(e, null, [t]) : X(e, t) : X(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && kn(n) && (n = [n]), X(e, t, n));
  } finally {
    ro(1);
  }
}
function Kd() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, o = {
    __vue_custom_formatter: !0,
    header(f) {
      if (!ve(f))
        return null;
      if (f.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ ke(f)) {
        $t();
        const _ = f.value;
        return Ot(), [
          "div",
          {},
          ["span", e, h(f)],
          "<",
          c(_),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ ht(f))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ We(f) ? "ShallowReactive" : "Reactive"],
            "<",
            c(f),
            `>${/* @__PURE__ */ St(f) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ St(f))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ We(f) ? "ShallowReadonly" : "Readonly"],
            "<",
            c(f),
            ">"
          ];
      }
      return null;
    },
    hasBody(f) {
      return f && f.__isVue;
    },
    body(f) {
      if (f && f.__isVue)
        return [
          "div",
          {},
          ...r(f.$)
        ];
    }
  };
  function r(f) {
    const _ = [];
    f.type.props && f.props && _.push(a("props", /* @__PURE__ */ de(f.props))), f.setupState !== Oe && _.push(a("setup", f.setupState)), f.data !== Oe && _.push(a("data", /* @__PURE__ */ de(f.data)));
    const g = u(f, "computed");
    g && _.push(a("computed", g));
    const k = u(f, "inject");
    return k && _.push(a("injected", k)), _.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: f }]
    ]), _;
  }
  function a(f, _) {
    return _ = Ae({}, _), Object.keys(_).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        f
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(_).map((g) => [
          "div",
          {},
          ["span", s, g + ": "],
          c(_[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(f, _ = !0) {
    return typeof f == "number" ? ["span", t, f] : typeof f == "string" ? ["span", n, JSON.stringify(f)] : typeof f == "boolean" ? ["span", s, f] : ve(f) ? ["object", { object: _ ? /* @__PURE__ */ de(f) : f }] : ["span", n, String(f)];
  }
  function u(f, _) {
    const g = f.type;
    if (ae(g))
      return;
    const k = {};
    for (const O in f.ctx)
      p(g, O, _) && (k[O] = f.ctx[O]);
    return k;
  }
  function p(f, _, g) {
    const k = f[g];
    if (ee(k) && k.includes(_) || ve(k) && _ in k || f.extends && p(f.extends, _, g) || f.mixins && f.mixins.some((O) => p(O, _, g)))
      return !0;
  }
  function h(f) {
    return /* @__PURE__ */ We(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const yi = "3.5.30", Lt = process.env.NODE_ENV !== "production" ? B : Le;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Zo;
const Ei = typeof window < "u" && window.trustedTypes;
if (Ei)
  try {
    Zo = /* @__PURE__ */ Ei.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Lt(`Error creating trusted types policy: ${e}`);
  }
const Ta = Zo ? (e) => Zo.createHTML(e) : (e) => e, Wd = "http://www.w3.org/2000/svg", qd = "http://www.w3.org/1998/Math/MathML", Kt = typeof document < "u" ? document : null, wi = Kt && /* @__PURE__ */ Kt.createElement("template"), zd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t === "svg" ? Kt.createElementNS(Wd, e) : t === "mathml" ? Kt.createElementNS(qd, e) : n ? Kt.createElement(e, { is: n }) : Kt.createElement(e);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => Kt.createTextNode(e),
  createComment: (e) => Kt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Kt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, r) {
    const a = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      wi.innerHTML = Ta(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const c = wi.content;
      if (s === "svg" || s === "mathml") {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      a ? a.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Jd = /* @__PURE__ */ Symbol("_vtc");
function Qd(e, t, n) {
  const s = e[Jd];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ni = /* @__PURE__ */ Symbol("_vod"), Yd = /* @__PURE__ */ Symbol("_vsh"), Xd = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Zd = /(?:^|;)\s*display\s*:/;
function ef(e, t, n) {
  const s = e.style, o = Te(n);
  let r = !1;
  if (n && !o) {
    if (t)
      if (Te(t))
        for (const a of t.split(";")) {
          const c = a.slice(0, a.indexOf(":")).trim();
          n[c] == null && Gs(s, c, "");
        }
      else
        for (const a in t)
          n[a] == null && Gs(s, a, "");
    for (const a in n)
      a === "display" && (r = !0), Gs(s, a, n[a]);
  } else if (o) {
    if (t !== n) {
      const a = s[Xd];
      a && (n += ";" + a), s.cssText = n, r = Zd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ni in e && (e[Ni] = r ? s.display : "", e[Yd] && (s.display = "none"));
}
const tf = /[^\\];\s*$/, $i = /\s*!important$/;
function Gs(e, t, n) {
  if (ee(n))
    n.forEach((s) => Gs(e, t, s));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && tf.test(n) && Lt(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = nf(e, t);
    $i.test(n) ? e.setProperty(
      Xt(s),
      n.replace($i, ""),
      "important"
    ) : e[s] = n;
  }
}
const Oi = ["Webkit", "Moz", "ms"], To = {};
function nf(e, t) {
  const n = To[t];
  if (n)
    return n;
  let s = rt(t);
  if (s !== "filter" && s in e)
    return To[t] = s;
  s = fo(s);
  for (let o = 0; o < Oi.length; o++) {
    const r = Oi[o] + s;
    if (r in e)
      return To[t] = r;
  }
  return t;
}
const Si = "http://www.w3.org/1999/xlink";
function ki(e, t, n, s, o, r = Tc(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Si, t.slice(6, t.length)) : e.setAttributeNS(Si, t, n) : n == null || r && !ml(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Nt(n) ? String(n) : n
  );
}
function Ci(e, t, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ta(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const c = r === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (c !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = ml(n) : n == null && c === "string" ? (n = "", a = !0) : c === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch (c) {
    process.env.NODE_ENV !== "production" && !a && Lt(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      c
    );
  }
  a && e.removeAttribute(o || t);
}
function Qt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function sf(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const xi = /* @__PURE__ */ Symbol("_vei");
function of(e, t, n, s, o = null) {
  const r = e[xi] || (e[xi] = {}), a = r[t];
  if (s && a)
    a.value = process.env.NODE_ENV !== "production" ? Ti(s, t) : s;
  else {
    const [c, u] = rf(t);
    if (s) {
      const p = r[t] = cf(
        process.env.NODE_ENV !== "production" ? Ti(s, t) : s,
        o
      );
      Qt(e, c, p, u);
    } else a && (sf(e, c, a, u), r[t] = void 0);
  }
}
const Di = /(?:Once|Passive|Capture)$/;
function rf(e) {
  let t;
  if (Di.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Di); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Xt(e.slice(2)), t];
}
let Po = 0;
const lf = /* @__PURE__ */ Promise.resolve(), af = () => Po || (lf.then(() => Po = 0), Po = Date.now());
function cf(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Ut(
      uf(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = af(), n;
}
function Ti(e, t) {
  return ae(e) || ee(e) ? e : (Lt(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Le);
}
function uf(e, t) {
  if (ee(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (o) => !o._stopped && s && s(o)
    );
  } else
    return t;
}
const Pi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, df = (e, t, n, s, o, r) => {
  const a = o === "svg";
  t === "class" ? Qd(e, s, a) : t === "style" ? ef(e, n, s) : bs(t) ? zs(t) || of(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ff(e, t, s, a)) ? (Ci(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ki(e, t, s, a, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (pf(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Te(s))) ? Ci(e, rt(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), ki(e, t, s, a));
};
function ff(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Pi(t) && ae(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Pi(t) && Te(n) ? !1 : t in e;
}
function pf(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = rt(t);
  return Array.isArray(n) ? n.some((o) => rt(o) === s) : Object.keys(n).some((o) => rt(o) === s);
}
const fn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ee(t) ? (n) => Vn(t, n) : t;
};
function hf(e) {
  e.target.composing = !0;
}
function Ri(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const mt = /* @__PURE__ */ Symbol("_assign");
function Ai(e, t, n) {
  return t && (e = e.trim()), n && (e = po(e)), e;
}
const yt = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
    e[mt] = fn(o);
    const r = s || o.props && o.props.type === "number";
    Qt(e, t ? "change" : "input", (a) => {
      a.target.composing || e[mt](Ai(e.value, n, r));
    }), (n || r) && Qt(e, "change", () => {
      e.value = Ai(e.value, n, r);
    }), t || (Qt(e, "compositionstart", hf), Qt(e, "compositionend", Ri), Qt(e, "change", Ri));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: o, number: r } }, a) {
    if (e[mt] = fn(a), e.composing) return;
    const c = (r || e.type === "number") && !/^0\d/.test(e.value) ? po(e.value) : e.value, u = t ?? "";
    c !== u && (document.activeElement === e && e.type !== "range" && (s && t === n || o && e.value.trim() === u) || (e.value = u));
  }
}, Pa = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[mt] = fn(n), Qt(e, "change", () => {
      const s = e._modelValue, o = Gn(e), r = e.checked, a = e[mt];
      if (ee(s)) {
        const c = gr(s, o), u = c !== -1;
        if (r && !u)
          a(s.concat(o));
        else if (!r && u) {
          const p = [...s];
          p.splice(c, 1), a(p);
        }
      } else if (Wn(s)) {
        const c = new Set(s);
        r ? c.add(o) : c.delete(o), a(c);
      } else
        a(Ra(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Vi,
  beforeUpdate(e, t, n) {
    e[mt] = fn(n), Vi(e, t, n);
  }
};
function Vi(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let o;
  if (ee(t))
    o = gr(t, s.props.value) > -1;
  else if (Wn(t))
    o = t.has(s.props.value);
  else {
    if (t === n) return;
    o = an(t, Ra(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
const _f = {
  created(e, { value: t }, n) {
    e.checked = an(t, n.props.value), e[mt] = fn(n), Qt(e, "change", () => {
      e[mt](Gn(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[mt] = fn(s), t !== n && (e.checked = an(t, s.props.value));
  }
}, gs = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    const o = Wn(t);
    Qt(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? po(Gn(a)) : Gn(a)
      );
      e[mt](
        e.multiple ? o ? new Set(r) : r : r[0]
      ), e._assigning = !0, ps(() => {
        e._assigning = !1;
      });
    }), e[mt] = fn(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Ii(e, t);
  },
  beforeUpdate(e, t, n) {
    e[mt] = fn(n);
  },
  updated(e, { value: t }) {
    e._assigning || Ii(e, t);
  }
};
function Ii(e, t) {
  const n = e.multiple, s = ee(t);
  if (n && !s && !Wn(t)) {
    process.env.NODE_ENV !== "production" && Lt(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`
    );
    return;
  }
  for (let o = 0, r = e.options.length; o < r; o++) {
    const a = e.options[o], c = Gn(a);
    if (n)
      if (s) {
        const u = typeof c;
        u === "string" || u === "number" ? a.selected = t.some((p) => String(p) === String(c)) : a.selected = gr(t, c) > -1;
      } else
        a.selected = t.has(c);
    else if (an(Gn(a), t)) {
      e.selectedIndex !== o && (e.selectedIndex = o);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function Gn(e) {
  return "_value" in e ? e._value : e.value;
}
function Ra(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const mf = {
  created(e, t, n) {
    Ts(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    Ts(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    Ts(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    Ts(e, t, n, s, "updated");
  }
};
function gf(e, t) {
  switch (e) {
    case "SELECT":
      return gs;
    case "TEXTAREA":
      return yt;
    default:
      switch (t) {
        case "checkbox":
          return Pa;
        case "radio":
          return _f;
        default:
          return yt;
      }
  }
}
function Ts(e, t, n, s, o) {
  const a = gf(
    e.tagName,
    n.props && n.props.type
  )[o];
  a && a(e, t, n, s);
}
const vf = ["ctrl", "shift", "alt", "meta"], bf = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => vf.some((n) => e[`${n}Key`] && !t.includes(n))
}, Vr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (o, ...r) => {
    for (let a = 0; a < t.length; a++) {
      const c = bf[t[a]];
      if (c && c(o, t)) return;
    }
    return e(o, ...r);
  });
}, yf = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ef = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (o) => {
    if (!("key" in o))
      return;
    const r = Xt(o.key);
    if (t.some(
      (a) => a === r || yf[a] === r
    ))
      return e(o);
  });
}, wf = /* @__PURE__ */ Ae({ patchProp: df }, zd);
let Mi;
function Nf() {
  return Mi || (Mi = Od(wf));
}
const $f = (...e) => {
  const t = Nf().createApp(...e);
  process.env.NODE_ENV !== "production" && (Sf(t), kf(t));
  const { mount: n } = t;
  return t.mount = (s) => {
    const o = Cf(s);
    if (!o) return;
    const r = t._component;
    !ae(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const a = n(o, !1, Of(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), a;
  }, t;
};
function Of(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Sf(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => kc(t) || Cc(t) || xc(t),
    writable: !1
  });
}
function kf(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        Lt(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, s = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Lt(s), n;
      },
      set() {
        Lt(s);
      }
    });
  }
}
function Cf(e) {
  if (Te(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Lt(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Lt(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function xf() {
  Kd();
}
process.env.NODE_ENV !== "production" && xf();
function Ps(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Ro(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Df() {
  return Aa().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Aa() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Tf = typeof Proxy == "function", Pf = "devtools-plugin:setup", Rf = "plugin:settings:set";
let Pn, er;
function Af() {
  var e;
  return Pn !== void 0 || (typeof window < "u" && window.performance ? (Pn = !0, er = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Pn = !0, er = globalThis.perf_hooks.performance) : Pn = !1), Pn;
}
function Vf() {
  return Af() ? er.now() : Date.now();
}
let If = class {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const a in t.settings) {
        const c = t.settings[a];
        s[a] = c.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, s);
    try {
      const a = localStorage.getItem(o), c = JSON.parse(a);
      Object.assign(r, c);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(a) {
        try {
          localStorage.setItem(o, JSON.stringify(a));
        } catch {
        }
        r = a;
      },
      now() {
        return Vf();
      }
    }, n && n.on(Rf, (a, c) => {
      a === this.plugin.id && this.fallbacks.setSettings(c);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, c) => this.target ? this.target.on[c] : (...u) => {
        this.onQueue.push({
          method: c,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (...u) => (this.targetQueue.push({
        method: c,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[c](...u)) : (...u) => new Promise((p) => {
        this.targetQueue.push({
          method: c,
          args: u,
          resolve: p
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
};
function Va(e, t) {
  const n = e, s = Aa(), o = Df(), r = Tf && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    o.emit(Pf, e, t);
  else {
    const a = r ? new If(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ss;
const vs = (e) => ss = e, Ia = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Cn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var jt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(jt || (jt = {}));
const rn = typeof window < "u", Fi = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Mf(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ir(e, t, n) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    La(s.response, t, n);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function Ma(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Bs(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const Ks = typeof navigator == "object" ? navigator : { userAgent: "" }, Fa = /Macintosh/.test(Ks.userAgent) && /AppleWebKit/.test(Ks.userAgent) && !/Safari/.test(Ks.userAgent), La = rn ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Fa ? Ff : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Ks ? Lf : (
      // Fallback to using FileReader and a popup
      jf
    )
  )
) : () => {
};
function Ff(e, t = "download", n) {
  const s = document.createElement("a");
  s.download = t, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? Ma(s.href) ? Ir(e, t, n) : (s.target = "_blank", Bs(s)) : Bs(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    Bs(s);
  }, 0));
}
function Lf(e, t = "download", n) {
  if (typeof e == "string")
    if (Ma(e))
      Ir(e, t, n);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        Bs(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Mf(e, n), t);
}
function jf(e, t, n, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return Ir(e, t, n);
  const o = e.type === "application/octet-stream", r = /constructor/i.test(String(Fi.HTMLElement)) || "safari" in Fi, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || o && r || Fa) && typeof FileReader < "u") {
    const c = new FileReader();
    c.onloadend = function() {
      let u = c.result;
      if (typeof u != "string")
        throw s = null, new Error("Wrong reader.result type");
      u = a ? u : u.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = u : location.assign(u), s = null;
    }, c.readAsDataURL(e);
  } else {
    const c = URL.createObjectURL(e);
    s ? s.location.assign(c) : location.href = c, s = null, setTimeout(function() {
      URL.revokeObjectURL(c);
    }, 4e4);
  }
}
function He(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Mr(e) {
  return "_a" in e && "install" in e;
}
function ja() {
  if (!("clipboard" in navigator))
    return He("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Ua(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (He('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Uf(e) {
  if (!ja())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), He("Global state copied to clipboard.");
    } catch (t) {
      if (Ua(t))
        return;
      He("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Hf(e) {
  if (!ja())
    try {
      Ha(e, JSON.parse(await navigator.clipboard.readText())), He("Global state pasted from clipboard.");
    } catch (t) {
      if (Ua(t))
        return;
      He("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Gf(e) {
  try {
    La(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    He("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Gt;
function Bf() {
  Gt || (Gt = document.createElement("input"), Gt.type = "file", Gt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      Gt.onchange = async () => {
        const s = Gt.files;
        if (!s)
          return t(null);
        const o = s.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, Gt.oncancel = () => t(null), Gt.onerror = n, Gt.click();
    });
  }
  return e;
}
async function Kf(e) {
  try {
    const n = await Bf()();
    if (!n)
      return;
    const { text: s, file: o } = n;
    Ha(e, JSON.parse(s)), He(`Global state imported from "${o.name}".`);
  } catch (t) {
    He("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Ha(e, t) {
  for (const n in t) {
    const s = e.state.value[n];
    s ? Object.assign(s, t[n]) : e.state.value[n] = t[n];
  }
}
function gt(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Ga = "🍍 Pinia (root)", Ws = "_root";
function Wf(e) {
  return Mr(e) ? {
    id: Ws,
    label: Ga
  } : {
    id: e.$id,
    label: e.$id
  };
}
function qf(e) {
  if (Mr(e)) {
    const n = Array.from(e._s.keys()), s = e._s;
    return {
      state: n.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: n.filter((r) => s.get(r)._getters).map((r) => {
        const a = s.get(r);
        return {
          editable: !1,
          key: r,
          value: a._getters.reduce((c, u) => (c[u] = a[u], c), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function zf(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: gt(e.type),
    key: gt(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Jf(e) {
  switch (e) {
    case jt.direct:
      return "mutation";
    case jt.patchFunction:
      return "$patch";
    case jt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Mn = !0;
const qs = [], bn = "pinia:mutations", Ke = "pinia", { assign: Qf } = Object, lo = (e) => "🍍 " + e;
function Yf(e, t) {
  Va({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: qs,
    app: e
  }, (n) => {
    typeof n.now != "function" && He("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: bn,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: Ke,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Uf(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Hf(t), n.sendInspectorTree(Ke), n.sendInspectorState(Ke);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Gf(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Kf(t), n.sendInspectorTree(Ke), n.sendInspectorState(Ke);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (s) => {
            const o = t._s.get(s);
            o ? typeof o.$reset != "function" ? He(`Cannot reset "${s}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), He(`Store "${s}" reset.`)) : He(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((s, o) => {
      const r = s.componentInstance && s.componentInstance.proxy;
      if (r && r._pStores) {
        const a = s.componentInstance.proxy._pStores;
        Object.values(a).forEach((c) => {
          s.instanceData.state.push({
            type: lo(c.$id),
            key: "state",
            editable: !0,
            value: c._isOptionsAPI ? {
              _custom: {
                value: /* @__PURE__ */ de(c.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => c.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(c.$state).reduce((u, p) => (u[p] = c.$state[p], u), {})
            )
          }), c._getters && c._getters.length && s.instanceData.state.push({
            type: lo(c.$id),
            key: "getters",
            editable: !1,
            value: c._getters.reduce((u, p) => {
              try {
                u[p] = c[p];
              } catch (h) {
                u[p] = h;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === Ke) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), s.rootNodes = (s.filter ? o.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(s.filter.toLowerCase()) : Ga.toLowerCase().includes(s.filter.toLowerCase())) : o).map(Wf);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === Ke) {
        const o = s.nodeId === Ws ? t : t._s.get(s.nodeId);
        if (!o)
          return;
        o && (s.nodeId !== Ws && (globalThis.$store = /* @__PURE__ */ de(o)), s.state = qf(o));
      }
    }), n.on.editInspectorState((s, o) => {
      if (s.app === e && s.inspectorId === Ke) {
        const r = s.nodeId === Ws ? t : t._s.get(s.nodeId);
        if (!r)
          return He(`store "${s.nodeId}" not found`, "error");
        const { path: a } = s;
        Mr(r) ? a.unshift("state") : (a.length !== 1 || !r._customProperties.has(a[0]) || a[0] in r.$state) && a.unshift("$state"), Mn = !1, s.set(r, a, s.state.value), Mn = !0;
      }
    }), n.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const o = s.type.replace(/^🍍\s*/, ""), r = t._s.get(o);
        if (!r)
          return He(`store "${o}" not found`, "error");
        const { path: a } = s;
        if (a[0] !== "state")
          return He(`Invalid path for store "${o}":
${a}
Only state can be modified.`);
        a[0] = "$state", Mn = !1, s.set(r, a, s.state.value), Mn = !0;
      }
    });
  });
}
function Xf(e, t) {
  qs.includes(lo(t.$id)) || qs.push(lo(t.$id)), Va({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: qs,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const s = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: a, onError: c, name: u, args: p }) => {
      const h = Ba++;
      n.addTimelineEvent({
        layerId: bn,
        event: {
          time: s(),
          title: "🛫 " + u,
          subtitle: "start",
          data: {
            store: gt(t.$id),
            action: gt(u),
            args: p
          },
          groupId: h
        }
      }), a((f) => {
        ln = void 0, n.addTimelineEvent({
          layerId: bn,
          event: {
            time: s(),
            title: "🛬 " + u,
            subtitle: "end",
            data: {
              store: gt(t.$id),
              action: gt(u),
              args: p,
              result: f
            },
            groupId: h
          }
        });
      }), c((f) => {
        ln = void 0, n.addTimelineEvent({
          layerId: bn,
          event: {
            time: s(),
            logType: "error",
            title: "💥 " + u,
            subtitle: "end",
            data: {
              store: gt(t.$id),
              action: gt(u),
              args: p,
              error: f
            },
            groupId: h
          }
        });
      });
    }, !0), t._customProperties.forEach((a) => {
      qe(() => l(t[a]), (c, u) => {
        n.notifyComponentUpdate(), n.sendInspectorState(Ke), Mn && n.addTimelineEvent({
          layerId: bn,
          event: {
            time: s(),
            title: "Change",
            subtitle: a,
            data: {
              newValue: c,
              oldValue: u
            },
            groupId: ln
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: a, type: c }, u) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(Ke), !Mn)
        return;
      const p = {
        time: s(),
        title: Jf(c),
        data: Qf({ store: gt(t.$id) }, zf(a)),
        groupId: ln
      };
      c === jt.patchFunction ? p.subtitle = "⤵️" : c === jt.patchObject ? p.subtitle = "🧩" : a && !Array.isArray(a) && (p.subtitle = a.type), a && (p.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: a
        }
      }), n.addTimelineEvent({
        layerId: bn,
        event: p
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = on((a) => {
      o(a), n.addTimelineEvent({
        layerId: bn,
        event: {
          time: s(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: gt(t.$id),
            info: gt("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(Ke), n.sendInspectorState(Ke);
    });
    const { $dispose: r } = t;
    t.$dispose = () => {
      r(), n.notifyComponentUpdate(), n.sendInspectorTree(Ke), n.sendInspectorState(Ke), n.getSettings().logStoreChanges && He(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(Ke), n.sendInspectorState(Ke), n.getSettings().logStoreChanges && He(`"${t.$id}" store installed 🆕`);
  });
}
let Ba = 0, ln;
function Li(e, t, n) {
  const s = t.reduce((o, r) => (o[r] = (/* @__PURE__ */ de(e))[r], o), {});
  for (const o in s)
    e[o] = function() {
      const r = Ba, a = n ? new Proxy(e, {
        get(...u) {
          return ln = r, Reflect.get(...u);
        },
        set(...u) {
          return ln = r, Reflect.set(...u);
        }
      }) : e;
      ln = r;
      const c = s[o].apply(a, arguments);
      return ln = void 0, c;
    };
}
function Zf({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      Li(t, Object.keys(n.actions), t._isOptionsAPI);
      const s = t._hotUpdate;
      (/* @__PURE__ */ de(t))._hotUpdate = function(o) {
        s.apply(this, arguments), Li(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    Xf(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function ep() {
  const e = yl(!0), t = e.run(() => /* @__PURE__ */ Z({}));
  let n = [], s = [];
  const o = on({
    install(r) {
      vs(o), o._a = r, r.provide(Ia, o), r.config.globalProperties.$pinia = o, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && rn && Yf(r, o), s.forEach((a) => n.push(a)), s = [];
    },
    use(r) {
      return this._a ? n.push(r) : s.push(r), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && rn && typeof Proxy < "u" && o.use(Zf), o;
}
function Ka(e, t) {
  for (const n in t) {
    const s = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    Cn(o) && Cn(s) && !/* @__PURE__ */ ke(s) && !/* @__PURE__ */ ht(s) ? e[n] = Ka(o, s) : e[n] = s;
  }
  return e;
}
const Wa = () => {
};
function ji(e, t, n, s = Wa) {
  e.push(t);
  const o = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), s());
  };
  return !n && El() && Rc(o), o;
}
function Rn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const tp = (e) => e(), Ui = Symbol(), Ao = Symbol();
function tr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], o = e[n];
    Cn(o) && Cn(s) && e.hasOwnProperty(n) && !/* @__PURE__ */ ke(s) && !/* @__PURE__ */ ht(s) ? e[n] = tr(o, s) : e[n] = s;
  }
  return e;
}
const np = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function sp(e) {
  return !Cn(e) || !e.hasOwnProperty(np);
}
const { assign: pt } = Object;
function Hi(e) {
  return !!(/* @__PURE__ */ ke(e) && e.effect);
}
function Gi(e, t, n, s) {
  const { state: o, actions: r, getters: a } = t, c = n.state.value[e];
  let u;
  function p() {
    !c && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = o ? o() : {});
    const h = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      /* @__PURE__ */ Zr((/* @__PURE__ */ Z(o ? o() : {})).value)
    ) : /* @__PURE__ */ Zr(n.state.value[e]);
    return pt(h, r, Object.keys(a || {}).reduce((f, _) => (process.env.NODE_ENV !== "production" && _ in h && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${_}" in store "${e}".`), f[_] = on(ne(() => {
      vs(n);
      const g = n._s.get(e);
      return a[_].call(g, g);
    })), f), {}));
  }
  return u = nr(e, p, t, n, s, !0), u;
}
function nr(e, t, n = {}, s, o, r) {
  let a;
  const c = pt({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const u = { deep: !0 };
  process.env.NODE_ENV !== "production" && (u.onTrigger = (M) => {
    p ? g = M : p == !1 && !b._hotUpdating && (Array.isArray(g) ? g.push(M) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let p, h, f = [], _ = [], g;
  const k = s.state.value[e];
  !r && !k && (process.env.NODE_ENV === "production" || !o) && (s.state.value[e] = {});
  const O = /* @__PURE__ */ Z({});
  let W;
  function V(M) {
    let A;
    p = h = !1, process.env.NODE_ENV !== "production" && (g = []), typeof M == "function" ? (M(s.state.value[e]), A = {
      type: jt.patchFunction,
      storeId: e,
      events: g
    }) : (tr(s.state.value[e], M), A = {
      type: jt.patchObject,
      payload: M,
      storeId: e,
      events: g
    });
    const Q = W = Symbol();
    ps().then(() => {
      W === Q && (p = !0);
    }), h = !0, Rn(f, A, s.state.value[e]);
  }
  const I = r ? function() {
    const { state: A } = n, Q = A ? A() : {};
    this.$patch((he) => {
      pt(he, Q);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Wa
  );
  function L() {
    a.stop(), f = [], _ = [], s._s.delete(e);
  }
  const te = (M, A = "") => {
    if (Ui in M)
      return M[Ao] = A, M;
    const Q = function() {
      vs(s);
      const he = Array.from(arguments), Re = [], Se = [];
      function fe(Ee) {
        Re.push(Ee);
      }
      function ue(Ee) {
        Se.push(Ee);
      }
      Rn(_, {
        args: he,
        name: Q[Ao],
        store: b,
        after: fe,
        onError: ue
      });
      let se;
      try {
        se = M.apply(this && this.$id === e ? this : b, he);
      } catch (Ee) {
        throw Rn(Se, Ee), Ee;
      }
      return se instanceof Promise ? se.then((Ee) => (Rn(Re, Ee), Ee)).catch((Ee) => (Rn(Se, Ee), Promise.reject(Ee))) : (Rn(Re, se), se);
    };
    return Q[Ui] = !0, Q[Ao] = A, Q;
  }, D = /* @__PURE__ */ on({
    actions: {},
    getters: {},
    state: [],
    hotState: O
  }), T = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: ji.bind(null, _),
    $patch: V,
    $reset: I,
    $subscribe(M, A = {}) {
      const Q = ji(f, M, A.detached, () => he()), he = a.run(() => qe(() => s.state.value[e], (Re) => {
        (A.flush === "sync" ? h : p) && M({
          storeId: e,
          type: jt.direct,
          events: g
        }, Re);
      }, pt({}, u, A)));
      return Q;
    },
    $dispose: L
  }, b = /* @__PURE__ */ cn(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && rn ? pt(
    {
      _hmrPayload: D,
      _customProperties: on(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    T
    // must be added later
    // setupStore
  ) : T);
  s._s.set(e, b);
  const x = (s._a && s._a.runWithContext || tp)(() => s._e.run(() => (a = yl()).run(() => t({ action: te }))));
  for (const M in x) {
    const A = x[M];
    if (/* @__PURE__ */ ke(A) && !Hi(A) || /* @__PURE__ */ ht(A))
      process.env.NODE_ENV !== "production" && o ? Ps(O.value, M, /* @__PURE__ */ Vs(x, M)) : r || (k && sp(A) && (/* @__PURE__ */ ke(A) ? A.value = k[M] : tr(A, k[M])), s.state.value[e][M] = A), process.env.NODE_ENV !== "production" && D.state.push(M);
    else if (typeof A == "function") {
      const Q = process.env.NODE_ENV !== "production" && o ? A : te(A, M);
      x[M] = Q, process.env.NODE_ENV !== "production" && (D.actions[M] = A), c.actions[M] = A;
    } else process.env.NODE_ENV !== "production" && Hi(A) && (D.getters[M] = r ? (
      // @ts-expect-error
      n.getters[M]
    ) : A, rn && (x._getters || // @ts-expect-error: same
    (x._getters = on([]))).push(M));
  }
  if (pt(b, x), pt(/* @__PURE__ */ de(b), x), Object.defineProperty(b, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? O.value : s.state.value[e],
    set: (M) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      V((A) => {
        pt(A, M);
      });
    }
  }), process.env.NODE_ENV !== "production" && (b._hotUpdate = on((M) => {
    b._hotUpdating = !0, M._hmrPayload.state.forEach((A) => {
      if (A in b.$state) {
        const Q = M.$state[A], he = b.$state[A];
        typeof Q == "object" && Cn(Q) && Cn(he) ? Ka(Q, he) : M.$state[A] = he;
      }
      Ps(b, A, /* @__PURE__ */ Vs(M.$state, A));
    }), Object.keys(b.$state).forEach((A) => {
      A in M.$state || Ro(b, A);
    }), p = !1, h = !1, s.state.value[e] = /* @__PURE__ */ Vs(M._hmrPayload, "hotState"), h = !0, ps().then(() => {
      p = !0;
    });
    for (const A in M._hmrPayload.actions) {
      const Q = M[A];
      Ps(b, A, te(Q, A));
    }
    for (const A in M._hmrPayload.getters) {
      const Q = M._hmrPayload.getters[A], he = r ? (
        // special handling of options api
        ne(() => (vs(s), Q.call(b, b)))
      ) : Q;
      Ps(b, A, he);
    }
    Object.keys(b._hmrPayload.getters).forEach((A) => {
      A in M._hmrPayload.getters || Ro(b, A);
    }), Object.keys(b._hmrPayload.actions).forEach((A) => {
      A in M._hmrPayload.actions || Ro(b, A);
    }), b._hmrPayload = M._hmrPayload, b._getters = M._getters, b._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && rn) {
    const M = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((A) => {
      Object.defineProperty(b, A, pt({ value: b[A] }, M));
    });
  }
  return s._p.forEach((M) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && rn) {
      const A = a.run(() => M({
        store: b,
        app: s._a,
        pinia: s,
        options: c
      }));
      Object.keys(A || {}).forEach((Q) => b._customProperties.add(Q)), pt(b, A);
    } else
      pt(b, a.run(() => M({
        store: b,
        app: s._a,
        pinia: s,
        options: c
      })));
  }), process.env.NODE_ENV !== "production" && b.$state && typeof b.$state == "object" && typeof b.$state.constructor == "function" && !b.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${b.$id}".`), k && r && n.hydrate && n.hydrate(b.$state, k), p = !0, h = !0, b;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Fr(e, t, n) {
  let s, o;
  const r = typeof t == "function";
  if (typeof e == "string")
    s = e, o = r ? n : t;
  else if (o = e, s = e.id, process.env.NODE_ENV !== "production" && typeof s != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function a(c, u) {
    const p = ku();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ss && ss._testing ? null : c) || (p ? _t(Ia, null) : null), c && vs(c), process.env.NODE_ENV !== "production" && !ss)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = ss, c._s.has(s) || (r ? nr(s, t, o, c) : Gi(s, o, c), process.env.NODE_ENV !== "production" && (a._pinia = c));
    const h = c._s.get(s);
    if (process.env.NODE_ENV !== "production" && u) {
      const f = "__hot:" + s, _ = r ? nr(f, t, o, c, !0) : Gi(f, pt({}, o), c, !0);
      u._hotUpdate(_), delete c.state.value[f], c._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && rn) {
      const f = zn();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const _ = f.proxy, g = "_pStores" in _ ? _._pStores : _._pStores = {};
        g[s] = h;
      }
    }
    return h;
  }
  return a.$id = s, a;
}
function qa(e) {
  {
    const t = /* @__PURE__ */ de(e), n = {};
    for (const s in t) {
      const o = t[s];
      o.effect ? n[s] = // ...
      ne({
        get: () => e[s],
        set(r) {
          e[s] = r;
        }
      }) : (/* @__PURE__ */ ke(o) || /* @__PURE__ */ ht(o)) && (n[s] = // ---
      /* @__PURE__ */ Vs(e, s));
    }
    return n;
  }
}
let op = 0;
const hn = /* @__PURE__ */ Fr("feedback", () => {
  const e = /* @__PURE__ */ Z([]), t = /* @__PURE__ */ Z(null);
  let n = null;
  function s(c) {
    const u = {
      id: ++op,
      title: c.title,
      message: c.message,
      tone: c.tone || "info"
    };
    e.value.push(u);
    const p = typeof c.durationMs == "number" ? c.durationMs : 3600;
    return typeof window < "u" && p > 0 && window.setTimeout(() => o(u.id), p), u.id;
  }
  function o(c) {
    e.value = e.value.filter((u) => u.id !== c);
  }
  function r(c) {
    return n && (n(!1), n = null), t.value = {
      title: c.title,
      message: c.message,
      confirmLabel: c.confirmLabel || "Confirm",
      cancelLabel: c.cancelLabel || "Cancel",
      tone: c.tone || "default"
    }, new Promise((u) => {
      n = u;
    });
  }
  function a(c) {
    const u = n;
    n = null, t.value = null, u == null || u(c);
  }
  return {
    toasts: e,
    confirmRequest: t,
    pushToast: s,
    dismissToast: o,
    confirm: r,
    resolveConfirm: a
  };
}), rp = { class: "confirm-dialog__header" }, ip = { class: "page-card__title" }, lp = { class: "confirm-dialog__body" }, ap = { class: "confirm-dialog__footer" }, cp = /* @__PURE__ */ Ve({
  __name: "ConfirmDialog",
  setup(e) {
    const t = hn(), { confirmRequest: n } = qa(t), s = ne(() => !!n.value);
    return (o, r) => {
      var a, c, u, p, h, f;
      return s.value ? (E(), w("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = Vr((_) => l(t).resolveConfirm(!1), ["self"]))
      }, [
        i("section", {
          class: ge(["confirm-dialog", { "confirm-dialog--danger": ((a = l(n)) == null ? void 0 : a.tone) === "danger" }])
        }, [
          i("header", rp, [
            r[3] || (r[3] = i("p", { class: "page-card__eyebrow" }, "Confirm", -1)),
            i("h2", ip, d((c = l(n)) == null ? void 0 : c.title), 1)
          ]),
          i("p", lp, d((u = l(n)) == null ? void 0 : u.message), 1),
          i("footer", ap, [
            i("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (_) => l(t).resolveConfirm(!1))
            }, d((p = l(n)) == null ? void 0 : p.cancelLabel), 1),
            i("button", {
              class: ge(["inline-link", { "inline-link--danger": ((h = l(n)) == null ? void 0 : h.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (_) => l(t).resolveConfirm(!0))
            }, d((f = l(n)) == null ? void 0 : f.confirmLabel), 3)
          ])
        ], 2)
      ])) : Ce("", !0);
    };
  }
}), up = {
  class: "toast-viewport",
  "aria-live": "polite",
  "aria-atomic": "true"
}, dp = { class: "toast-card__content" }, fp = { key: 0 }, pp = ["onClick"], hp = /* @__PURE__ */ Ve({
  __name: "ToastViewport",
  setup(e) {
    const t = hn(), { toasts: n } = qa(t);
    return (s, o) => (E(), w("div", up, [
      (E(!0), w(Y, null, ye(l(n), (r) => (E(), w("article", {
        key: r.id,
        class: ge(["toast-card", `toast-card--${r.tone}`])
      }, [
        i("div", dp, [
          r.title ? (E(), w("strong", fp, d(r.title), 1)) : Ce("", !0),
          i("p", null, d(r.message), 1)
        ]),
        i("button", {
          class: "toast-card__close",
          type: "button",
          onClick: (a) => l(t).dismissToast(r.id)
        }, " × ", 8, pp)
      ], 2))), 128))
    ]));
  }
});
function _p() {
  return za().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function za() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const mp = typeof Proxy == "function", gp = "devtools-plugin:setup", vp = "plugin:settings:set";
let An, sr;
function bp() {
  var e;
  return An !== void 0 || (typeof window < "u" && window.performance ? (An = !0, sr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (An = !0, sr = globalThis.perf_hooks.performance) : An = !1), An;
}
function yp() {
  return bp() ? sr.now() : Date.now();
}
class Ep {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const a in t.settings) {
        const c = t.settings[a];
        s[a] = c.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, s);
    try {
      const a = localStorage.getItem(o), c = JSON.parse(a);
      Object.assign(r, c);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(a) {
        try {
          localStorage.setItem(o, JSON.stringify(a));
        } catch {
        }
        r = a;
      },
      now() {
        return yp();
      }
    }, n && n.on(vp, (a, c) => {
      a === this.plugin.id && this.fallbacks.setSettings(c);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, c) => this.target ? this.target.on[c] : (...u) => {
        this.onQueue.push({
          method: c,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (...u) => (this.targetQueue.push({
        method: c,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[c](...u)) : (...u) => new Promise((p) => {
        this.targetQueue.push({
          method: c,
          args: u,
          resolve: p
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function wp(e, t) {
  const n = e, s = za(), o = _p(), r = mp && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    o.emit(gp, e, t);
  else {
    const a = r ? new Ep(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const zt = typeof document < "u";
function Ja(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Np(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && Ja(e.default);
}
const we = Object.assign;
function Vo(e, t) {
  const n = {};
  for (const s in t) {
    const o = t[s];
    n[s] = dt(o) ? o.map(e) : e(o);
  }
  return n;
}
const cs = () => {
}, dt = Array.isArray;
function Bi(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function _e(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Qa = /#/g, $p = /&/g, Op = /\//g, Sp = /=/g, kp = /\?/g, Ya = /\+/g, Cp = /%5B/g, xp = /%5D/g, Xa = /%5E/g, Dp = /%60/g, Za = /%7B/g, Tp = /%7C/g, ec = /%7D/g, Pp = /%20/g;
function Lr(e) {
  return e == null ? "" : encodeURI("" + e).replace(Tp, "|").replace(Cp, "[").replace(xp, "]");
}
function Rp(e) {
  return Lr(e).replace(Za, "{").replace(ec, "}").replace(Xa, "^");
}
function or(e) {
  return Lr(e).replace(Ya, "%2B").replace(Pp, "+").replace(Qa, "%23").replace($p, "%26").replace(Dp, "`").replace(Za, "{").replace(ec, "}").replace(Xa, "^");
}
function Ap(e) {
  return or(e).replace(Sp, "%3D");
}
function Vp(e) {
  return Lr(e).replace(Qa, "%23").replace(kp, "%3F");
}
function Ip(e) {
  return Vp(e).replace(Op, "%2F");
}
function Bn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && _e(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const Mp = /\/$/, Fp = (e) => e.replace(Mp, "");
function Io(e, t, n = "/") {
  let s, o = {}, r = "", a = "";
  const c = t.indexOf("#");
  let u = t.indexOf("?");
  return u = c >= 0 && u > c ? -1 : u, u >= 0 && (s = t.slice(0, u), r = t.slice(u, c > 0 ? c : t.length), o = e(r.slice(1))), c >= 0 && (s = s || t.slice(0, c), a = t.slice(c, t.length)), s = Up(s ?? t, n), {
    fullPath: s + r + a,
    path: s,
    query: o,
    hash: Bn(a)
  };
}
function Lp(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ki(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Wi(e, t, n) {
  const s = t.matched.length - 1, o = n.matched.length - 1;
  return s > -1 && s === o && pn(t.matched[s], n.matched[o]) && tc(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function pn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function tc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!jp(e[n], t[n])) return !1;
  return !0;
}
function jp(e, t) {
  return dt(e) ? qi(e, t) : dt(t) ? qi(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function qi(e, t) {
  return dt(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function Up(e, t) {
  if (e.startsWith("/")) return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return _e(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e) return t;
  const n = t.split("/"), s = e.split("/"), o = s[s.length - 1];
  (o === ".." || o === ".") && s.push("");
  let r = n.length - 1, a, c;
  for (a = 0; a < s.length; a++)
    if (c = s[a], c !== ".")
      if (c === "..")
        r > 1 && r--;
      else break;
  return n.slice(0, r).join("/") + "/" + s.slice(a).join("/");
}
const tn = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let rr = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), Mo = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function Hp(e) {
  if (!e) if (zt) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Fp(e);
}
const Gp = /^[^#]+#/;
function Bp(e, t) {
  return e.replace(Gp, "#") + t;
}
function Kp(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const Eo = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Wp(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!s || !document.getElementById(e.el.slice(1))))
      try {
        const r = document.querySelector(e.el);
        if (s && r) {
          _e(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        _e(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const o = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o) {
      process.env.NODE_ENV !== "production" && _e(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Kp(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function zi(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ir = /* @__PURE__ */ new Map();
function qp(e, t) {
  ir.set(e, t);
}
function zp(e) {
  const t = ir.get(e);
  return ir.delete(e), t;
}
function ao(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function nc(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let Pe = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const lr = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : ""), Jp = {
  [Pe.MATCHER_NOT_FOUND]({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  [Pe.NAVIGATION_GUARD_REDIRECT]({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Yp(t)}" via a navigation guard.`;
  },
  [Pe.NAVIGATION_ABORTED]({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  [Pe.NAVIGATION_CANCELLED]({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  [Pe.NAVIGATION_DUPLICATED]({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function Kn(e, t) {
  return process.env.NODE_ENV !== "production" ? we(new Error(Jp[e](t)), {
    type: e,
    [lr]: !0
  }, t) : we(/* @__PURE__ */ new Error(), {
    type: e,
    [lr]: !0
  }, t);
}
function Bt(e, t) {
  return e instanceof Error && lr in e && (t == null || !!(e.type & t));
}
const Qp = [
  "params",
  "query",
  "hash"
];
function Yp(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Qp) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Xp(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const o = n[s].replace(Ya, " "), r = o.indexOf("="), a = Bn(r < 0 ? o : o.slice(0, r)), c = r < 0 ? null : Bn(o.slice(r + 1));
    if (a in t) {
      let u = t[a];
      dt(u) || (u = t[a] = [u]), u.push(c);
    } else t[a] = c;
  }
  return t;
}
function Ji(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Ap(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (dt(s) ? s.map((o) => o && or(o)) : [s && or(s)]).forEach((o) => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function Zp(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = dt(s) ? s.map((o) => o == null ? null : "" + o) : s == null ? s : "" + s);
  }
  return t;
}
const eh = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), Qi = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), wo = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), jr = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), ar = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function Zn() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const o = e.indexOf(s);
      o > -1 && e.splice(o, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function sn(e, t, n, s, o, r = (a) => a()) {
  const a = s && (s.enterCallbacks[o] = s.enterCallbacks[o] || []);
  return () => new Promise((c, u) => {
    const p = (_) => {
      _ === !1 ? u(Kn(Pe.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : _ instanceof Error ? u(_) : ao(_) ? u(Kn(Pe.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: _
      })) : (a && s.enterCallbacks[o] === a && typeof _ == "function" && a.push(_), c());
    }, h = r(() => e.call(s && s.instances[o], t, n, process.env.NODE_ENV !== "production" ? th(p, t, n) : p));
    let f = Promise.resolve(h);
    if (e.length < 3 && (f = f.then(p)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const _ = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof h == "object" && "then" in h) f = f.then((g) => p._called ? g : (_e(_), Promise.reject(/* @__PURE__ */ new Error("Invalid navigation guard"))));
      else if (h !== void 0 && !p._called) {
        _e(_), u(/* @__PURE__ */ new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((_) => u(_));
  });
}
function th(e, t, n) {
  let s = 0;
  return function() {
    s++ === 1 && _e(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, s === 1 && e.apply(null, arguments);
  };
}
function Fo(e, t, n, s, o = (r) => r()) {
  const r = [];
  for (const a of e) {
    process.env.NODE_ENV !== "production" && !a.components && a.children && !a.children.length && _e(`Record with path "${a.path}" is either missing a "component(s)" or "children" property.`);
    for (const c in a.components) {
      let u = a.components[c];
      if (process.env.NODE_ENV !== "production") {
        if (!u || typeof u != "object" && typeof u != "function")
          throw _e(`Component "${c}" in record with path "${a.path}" is not a valid component. Received "${String(u)}".`), new Error("Invalid route component");
        if ("then" in u) {
          _e(`Component "${c}" in record with path "${a.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const p = u;
          u = () => p;
        } else u.__asyncLoader && !u.__warnedDefineAsync && (u.__warnedDefineAsync = !0, _e(`Component "${c}" in record with path "${a.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !a.instances[c]))
        if (Ja(u)) {
          const p = (u.__vccOpts || u)[t];
          p && r.push(sn(p, n, s, a, c, o));
        } else {
          let p = u();
          process.env.NODE_ENV !== "production" && !("catch" in p) && (_e(`Component "${c}" in record with path "${a.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), p = Promise.resolve(p)), r.push(() => p.then((h) => {
            if (!h) throw new Error(`Couldn't resolve component "${c}" at "${a.path}"`);
            const f = Np(h) ? h.default : h;
            a.mods[c] = h, a.components[c] = f;
            const _ = (f.__vccOpts || f)[t];
            return _ && sn(_, n, s, a, c, o)();
          }));
        }
    }
  }
  return r;
}
function nh(e, t) {
  const n = [], s = [], o = [], r = Math.max(t.matched.length, e.matched.length);
  for (let a = 0; a < r; a++) {
    const c = t.matched[a];
    c && (e.matched.find((p) => pn(p, c)) ? s.push(c) : n.push(c));
    const u = e.matched[a];
    u && (t.matched.find((p) => pn(p, u)) || o.push(u));
  }
  return [
    n,
    s,
    o
  ];
}
function es(e, t) {
  const n = we({}, e, { matched: e.matched.map((s) => ph(s, [
    "instances",
    "children",
    "aliasOf"
  ])) });
  return { _custom: {
    type: null,
    readOnly: !0,
    display: e.fullPath,
    tooltip: t,
    value: n
  } };
}
function Rs(e) {
  return { _custom: { display: e } };
}
let sh = 0;
function oh(e, t, n) {
  if (t.__hasDevtools) return;
  t.__hasDevtools = !0;
  const s = sh++;
  wp({
    id: "org.vuejs.router" + (s ? "." + s : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (o) => {
    typeof o.now != "function" && _e("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.on.inspectComponent((h, f) => {
      h.instanceData && h.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: es(t.currentRoute.value, "Current Route")
      });
    }), o.on.visitComponentTree(({ treeNode: h, componentInstance: f }) => {
      if (f.__vrv_devtools) {
        const _ = f.__vrv_devtools;
        h.tags.push({
          label: (_.name ? `${_.name.toString()}: ` : "") + _.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: sc
        });
      }
      dt(f.__vrl_devtools) && (f.__devtoolsApi = o, f.__vrl_devtools.forEach((_) => {
        let g = _.route.path, k = ic, O = "", W = 0;
        _.error ? (g = _.error, k = ch, W = uh) : _.isExactActive ? (k = rc, O = "This is exactly active") : _.isActive && (k = oc, O = "This link is active"), h.tags.push({
          label: g,
          textColor: W,
          tooltip: O,
          backgroundColor: k
        });
      }));
    }), qe(t.currentRoute, () => {
      u(), o.notifyComponentUpdate(), o.sendInspectorTree(c), o.sendInspectorState(c);
    });
    const r = "router:navigations:" + s;
    o.addTimelineLayer({
      id: r,
      label: `Router${s ? " " + s : ""} Navigations`,
      color: 4237508
    }), t.onError((h, f) => {
      o.addTimelineEvent({
        layerId: r,
        event: {
          title: "Error during Navigation",
          subtitle: f.fullPath,
          logType: "error",
          time: o.now(),
          data: { error: h },
          groupId: f.meta.__navigationId
        }
      });
    });
    let a = 0;
    t.beforeEach((h, f) => {
      const _ = {
        guard: Rs("beforeEach"),
        from: es(f, "Current Location during this navigation"),
        to: es(h, "Target location")
      };
      Object.defineProperty(h.meta, "__navigationId", { value: a++ }), o.addTimelineEvent({
        layerId: r,
        event: {
          time: o.now(),
          title: "Start of navigation",
          subtitle: h.fullPath,
          data: _,
          groupId: h.meta.__navigationId
        }
      });
    }), t.afterEach((h, f, _) => {
      const g = { guard: Rs("afterEach") };
      _ ? (g.failure = { _custom: {
        type: Error,
        readOnly: !0,
        display: _ ? _.message : "",
        tooltip: "Navigation Failure",
        value: _
      } }, g.status = Rs("❌")) : g.status = Rs("✅"), g.from = es(f, "Current Location during this navigation"), g.to = es(h, "Target location"), o.addTimelineEvent({
        layerId: r,
        event: {
          title: "End of navigation",
          subtitle: h.fullPath,
          time: o.now(),
          data: g,
          logType: _ ? "warning" : "default",
          groupId: h.meta.__navigationId
        }
      });
    });
    const c = "router-inspector:" + s;
    o.addInspector({
      id: c,
      label: "Routes" + (s ? " " + s : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function u() {
      if (!p) return;
      const h = p;
      let f = n.getRoutes().filter((_) => !_.parent || !_.parent.record.components);
      f.forEach(cc), h.filter && (f = f.filter((_) => cr(_, h.filter.toLowerCase()))), f.forEach((_) => ac(_, t.currentRoute.value)), h.rootNodes = f.map(lc);
    }
    let p;
    o.on.getInspectorTree((h) => {
      p = h, h.app === e && h.inspectorId === c && u();
    }), o.on.getInspectorState((h) => {
      if (h.app === e && h.inspectorId === c) {
        const f = n.getRoutes().find((_) => _.record.__vd_id === h.nodeId);
        f && (h.state = { options: ih(f) });
      }
    }), o.sendInspectorTree(c), o.sendInspectorState(c);
  });
}
function rh(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function ih(e) {
  const { record: t } = e, n = [{
    editable: !1,
    key: "path",
    value: t.path
  }];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({
    editable: !1,
    key: "regexp",
    value: e.re
  }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: { _custom: {
      type: null,
      readOnly: !0,
      display: e.keys.map((s) => `${s.name}${rh(s)}`).join(" "),
      tooltip: "Param keys",
      value: e.keys
    } }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((s) => s.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: { _custom: {
      type: null,
      readOnly: !0,
      display: e.score.map((s) => s.join(", ")).join(" | "),
      tooltip: "Score used to sort routes",
      value: e.score
    } }
  }), n;
}
const sc = 15485081, oc = 2450411, rc = 8702998, lh = 2282478, ic = 16486972, ah = 6710886, ch = 16704226, uh = 12131356;
function lc(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: lh
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: ic
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: sc
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: rc
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: oc
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: ah
  });
  let s = n.__vd_id;
  return s == null && (s = String(dh++), n.__vd_id = s), {
    id: s,
    label: n.path,
    tags: t,
    children: e.children.map(lc)
  };
}
let dh = 0;
const fh = /^\/(.*)\/([a-z]*)$/;
function ac(e, t) {
  const n = t.matched.length && pn(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((s) => pn(s, e.record))), e.children.forEach((s) => ac(s, t));
}
function cc(e) {
  e.__vd_match = !1, e.children.forEach(cc);
}
function cr(e, t) {
  const n = String(e.re).match(fh);
  if (e.__vd_match = !1, !n || n.length < 3) return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((r) => cr(r, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const s = e.record.path.toLowerCase(), o = Bn(s);
  return !t.startsWith("/") && (o.includes(t) || s.includes(t)) || o.startsWith(t) || s.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((r) => cr(r, t));
}
function ph(e, t) {
  const n = {};
  for (const s in e) t.includes(s) || (n[s] = e[s]);
  return n;
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let hh = () => location.protocol + "//" + location.host;
function uc(e, t) {
  const { pathname: n, search: s, hash: o } = t, r = e.indexOf("#");
  if (r > -1) {
    let a = o.includes(e.slice(r)) ? e.slice(r).length : 1, c = o.slice(a);
    return c[0] !== "/" && (c = "/" + c), Ki(c, "");
  }
  return Ki(n, e) + s + o;
}
function _h(e, t, n, s) {
  let o = [], r = [], a = null;
  const c = ({ state: _ }) => {
    const g = uc(e, location), k = n.value, O = t.value;
    let W = 0;
    if (_) {
      if (n.value = g, t.value = _, a && a === k) {
        a = null;
        return;
      }
      W = O ? _.position - O.position : 0;
    } else s(g);
    o.forEach((V) => {
      V(n.value, k, {
        delta: W,
        type: rr.pop,
        direction: W ? W > 0 ? Mo.forward : Mo.back : Mo.unknown
      });
    });
  };
  function u() {
    a = n.value;
  }
  function p(_) {
    o.push(_);
    const g = () => {
      const k = o.indexOf(_);
      k > -1 && o.splice(k, 1);
    };
    return r.push(g), g;
  }
  function h() {
    if (document.visibilityState === "hidden") {
      const { history: _ } = window;
      if (!_.state) return;
      _.replaceState(we({}, _.state, { scroll: Eo() }), "");
    }
  }
  function f() {
    for (const _ of r) _();
    r = [], window.removeEventListener("popstate", c), window.removeEventListener("pagehide", h), document.removeEventListener("visibilitychange", h);
  }
  return window.addEventListener("popstate", c), window.addEventListener("pagehide", h), document.addEventListener("visibilitychange", h), {
    pauseListeners: u,
    listen: p,
    destroy: f
  };
}
function Yi(e, t, n, s = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: o ? Eo() : null
  };
}
function mh(e) {
  const { history: t, location: n } = window, s = { value: uc(e, n) }, o = { value: t.state };
  o.value || r(s.value, {
    back: null,
    current: s.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(u, p, h) {
    const f = e.indexOf("#"), _ = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + u : hh() + e + u;
    try {
      t[h ? "replaceState" : "pushState"](p, "", _), o.value = p;
    } catch (g) {
      process.env.NODE_ENV !== "production" ? _e("Error with push/replace State", g) : console.error(g), n[h ? "replace" : "assign"](_);
    }
  }
  function a(u, p) {
    r(u, we({}, t.state, Yi(o.value.back, u, o.value.forward, !0), p, { position: o.value.position }), !0), s.value = u;
  }
  function c(u, p) {
    const h = we({}, o.value, t.state, {
      forward: u,
      scroll: Eo()
    });
    process.env.NODE_ENV !== "production" && !t.state && _e(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state`), r(h.current, h, !0), r(u, we({}, Yi(s.value, u, null), { position: h.position + 1 }, p), !1), s.value = u;
  }
  return {
    location: s,
    state: o,
    push: c,
    replace: a
  };
}
function gh(e) {
  e = Hp(e);
  const t = mh(e), n = _h(e, t.state, t.location, t.replace);
  function s(r, a = !0) {
    a || n.pauseListeners(), history.go(r);
  }
  const o = we({
    location: "",
    base: e,
    go: s,
    createHref: Bp.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function vh(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), process.env.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && _e(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), gh(e);
}
let yn = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var Ie = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(Ie || {});
const bh = {
  type: yn.Static,
  value: ""
}, yh = /[a-zA-Z0-9_]/;
function Eh(e) {
  if (!e) return [[]];
  if (e === "/") return [[bh]];
  if (!e.startsWith("/")) throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${p}": ${g}`);
  }
  let n = Ie.Static, s = n;
  const o = [];
  let r;
  function a() {
    r && o.push(r), r = [];
  }
  let c = 0, u, p = "", h = "";
  function f() {
    p && (n === Ie.Static ? r.push({
      type: yn.Static,
      value: p
    }) : n === Ie.Param || n === Ie.ParamRegExp || n === Ie.ParamRegExpEnd ? (r.length > 1 && (u === "*" || u === "+") && t(`A repeatable param (${p}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: yn.Param,
      value: p,
      regexp: h,
      repeatable: u === "*" || u === "+",
      optional: u === "*" || u === "?"
    })) : t("Invalid state to consume buffer"), p = "");
  }
  function _() {
    p += u;
  }
  for (; c < e.length; ) {
    if (u = e[c++], u === "\\" && n !== Ie.ParamRegExp) {
      s = n, n = Ie.EscapeNext;
      continue;
    }
    switch (n) {
      case Ie.Static:
        u === "/" ? (p && f(), a()) : u === ":" ? (f(), n = Ie.Param) : _();
        break;
      case Ie.EscapeNext:
        _(), n = s;
        break;
      case Ie.Param:
        u === "(" ? n = Ie.ParamRegExp : yh.test(u) ? _() : (f(), n = Ie.Static, u !== "*" && u !== "?" && u !== "+" && c--);
        break;
      case Ie.ParamRegExp:
        u === ")" ? h[h.length - 1] == "\\" ? h = h.slice(0, -1) + u : n = Ie.ParamRegExpEnd : h += u;
        break;
      case Ie.ParamRegExpEnd:
        f(), n = Ie.Static, u !== "*" && u !== "?" && u !== "+" && c--, h = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === Ie.ParamRegExp && t(`Unfinished custom RegExp for param "${p}"`), f(), a(), o;
}
const Xi = "[^/]+?", wh = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var Qe = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(Qe || {});
const Nh = /[.+*?^${}()[\]/\\]/g;
function $h(e, t) {
  const n = we({}, wh, t), s = [];
  let o = n.start ? "^" : "";
  const r = [];
  for (const p of e) {
    const h = p.length ? [] : [Qe.Root];
    n.strict && !p.length && (o += "/");
    for (let f = 0; f < p.length; f++) {
      const _ = p[f];
      let g = Qe.Segment + (n.sensitive ? Qe.BonusCaseSensitive : 0);
      if (_.type === yn.Static)
        f || (o += "/"), o += _.value.replace(Nh, "\\$&"), g += Qe.Static;
      else if (_.type === yn.Param) {
        const { value: k, repeatable: O, optional: W, regexp: V } = _;
        r.push({
          name: k,
          repeatable: O,
          optional: W
        });
        const I = V || Xi;
        if (I !== Xi) {
          g += Qe.BonusCustomRegExp;
          try {
            `${I}`;
          } catch (te) {
            throw new Error(`Invalid custom RegExp for param "${k}" (${I}): ` + te.message);
          }
        }
        let L = O ? `((?:${I})(?:/(?:${I}))*)` : `(${I})`;
        f || (L = W && p.length < 2 ? `(?:/${L})` : "/" + L), W && (L += "?"), o += L, g += Qe.Dynamic, W && (g += Qe.BonusOptional), O && (g += Qe.BonusRepeatable), I === ".*" && (g += Qe.BonusWildcard);
      }
      h.push(g);
    }
    s.push(h);
  }
  if (n.strict && n.end) {
    const p = s.length - 1;
    s[p][s[p].length - 1] += Qe.BonusStrict;
  }
  n.strict || (o += "/?"), n.end ? o += "$" : n.strict && !o.endsWith("/") && (o += "(?:/|$)");
  const a = new RegExp(o, n.sensitive ? "" : "i");
  function c(p) {
    const h = p.match(a), f = {};
    if (!h) return null;
    for (let _ = 1; _ < h.length; _++) {
      const g = h[_] || "", k = r[_ - 1];
      f[k.name] = g && k.repeatable ? g.split("/") : g;
    }
    return f;
  }
  function u(p) {
    let h = "", f = !1;
    for (const _ of e) {
      (!f || !h.endsWith("/")) && (h += "/"), f = !1;
      for (const g of _) if (g.type === yn.Static) h += g.value;
      else if (g.type === yn.Param) {
        const { value: k, repeatable: O, optional: W } = g, V = k in p ? p[k] : "";
        if (dt(V) && !O) throw new Error(`Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`);
        const I = dt(V) ? V.join("/") : V;
        if (!I) if (W)
          _.length < 2 && (h.endsWith("/") ? h = h.slice(0, -1) : f = !0);
        else throw new Error(`Missing required param "${k}"`);
        h += I;
      }
    }
    return h || "/";
  }
  return {
    re: a,
    score: s,
    keys: r,
    parse: c,
    stringify: u
  };
}
function Oh(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === Qe.Static + Qe.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === Qe.Static + Qe.Segment ? 1 : -1 : 0;
}
function dc(e, t) {
  let n = 0;
  const s = e.score, o = t.score;
  for (; n < s.length && n < o.length; ) {
    const r = Oh(s[n], o[n]);
    if (r) return r;
    n++;
  }
  if (Math.abs(o.length - s.length) === 1) {
    if (Zi(s)) return 1;
    if (Zi(o)) return -1;
  }
  return o.length - s.length;
}
function Zi(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Sh = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function kh(e, t, n) {
  const s = $h(Eh(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const r = /* @__PURE__ */ new Set();
    for (const a of s.keys)
      r.has(a.name) && _e(`Found duplicated params with name "${a.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), r.add(a.name);
  }
  const o = we(s, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function Ch(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = Bi(Sh, t);
  function o(f) {
    return s.get(f);
  }
  function r(f, _, g) {
    const k = !g, O = tl(f);
    process.env.NODE_ENV !== "production" && Ph(O, _), O.aliasOf = g && g.record;
    const W = Bi(t, f), V = [O];
    if ("alias" in f) {
      const te = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const D of te) V.push(tl(we({}, O, {
        components: g ? g.record.components : O.components,
        path: D,
        aliasOf: g ? g.record : O
      })));
    }
    let I, L;
    for (const te of V) {
      const { path: D } = te;
      if (_ && D[0] !== "/") {
        const T = _.record.path, b = T[T.length - 1] === "/" ? "" : "/";
        te.path = _.record.path + (D && b + D);
      }
      if (process.env.NODE_ENV !== "production" && te.path === "*") throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.`);
      if (I = kh(te, _, W), process.env.NODE_ENV !== "production" && _ && D[0] === "/" && Ah(I, _), g ? (g.alias.push(I), process.env.NODE_ENV !== "production" && Th(g, I)) : (L = L || I, L !== I && L.alias.push(I), k && f.name && !nl(I) && (process.env.NODE_ENV !== "production" && Rh(f, _), a(f.name))), fc(I) && u(I), O.children) {
        const T = O.children;
        for (let b = 0; b < T.length; b++) r(T[b], I, g && g.children[b]);
      }
      g = g || I;
    }
    return L ? () => {
      a(L);
    } : cs;
  }
  function a(f) {
    if (nc(f)) {
      const _ = s.get(f);
      _ && (s.delete(f), n.splice(n.indexOf(_), 1), _.children.forEach(a), _.alias.forEach(a));
    } else {
      const _ = n.indexOf(f);
      _ > -1 && (n.splice(_, 1), f.record.name && s.delete(f.record.name), f.children.forEach(a), f.alias.forEach(a));
    }
  }
  function c() {
    return n;
  }
  function u(f) {
    const _ = Vh(f, n);
    n.splice(_, 0, f), f.record.name && !nl(f) && s.set(f.record.name, f);
  }
  function p(f, _) {
    let g, k = {}, O, W;
    if ("name" in f && f.name) {
      if (g = s.get(f.name), !g) throw Kn(Pe.MATCHER_NOT_FOUND, { location: f });
      if (process.env.NODE_ENV !== "production") {
        const L = Object.keys(f.params || {}).filter((te) => !g.keys.find((D) => D.name === te));
        L.length && _e(`Discarded invalid param(s) "${L.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      W = g.record.name, k = we(el(_.params, g.keys.filter((L) => !L.optional).concat(g.parent ? g.parent.keys.filter((L) => L.optional) : []).map((L) => L.name)), f.params && el(f.params, g.keys.map((L) => L.name))), O = g.stringify(k);
    } else if (f.path != null)
      O = f.path, process.env.NODE_ENV !== "production" && !O.startsWith("/") && _e(`The Matcher cannot resolve relative paths but received "${O}". Unless you directly called \`matcher.resolve("${O}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), g = n.find((L) => L.re.test(O)), g && (k = g.parse(O), W = g.record.name);
    else {
      if (g = _.name ? s.get(_.name) : n.find((L) => L.re.test(_.path)), !g) throw Kn(Pe.MATCHER_NOT_FOUND, {
        location: f,
        currentLocation: _
      });
      W = g.record.name, k = we({}, _.params, f.params), O = g.stringify(k);
    }
    const V = [];
    let I = g;
    for (; I; )
      V.unshift(I.record), I = I.parent;
    return {
      name: W,
      path: O,
      params: k,
      matched: V,
      meta: Dh(V)
    };
  }
  e.forEach((f) => r(f));
  function h() {
    n.length = 0, s.clear();
  }
  return {
    addRoute: r,
    resolve: p,
    removeRoute: a,
    clearRoutes: h,
    getRoutes: c,
    getRecordMatcher: o
  };
}
function el(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function tl(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: xh(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function xh(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function nl(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Dh(e) {
  return e.reduce((t, n) => we(t, n.meta), {});
}
function ur(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Th(e, t) {
  for (const n of e.keys) if (!n.optional && !t.keys.find(ur.bind(null, n))) return _e(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys) if (!n.optional && !e.keys.find(ur.bind(null, n))) return _e(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Ph(e, t) {
  t && t.record.name && !e.name && !e.path && _e(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Rh(e, t) {
  for (let n = t; n; n = n.parent) if (n.record.name === e.name) throw new Error(`A route named "${String(e.name)}" has been added as a ${t === n ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function Ah(e, t) {
  for (const n of t.keys) if (!e.keys.find(ur.bind(null, n))) return _e(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Vh(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const r = n + s >> 1;
    dc(e, t[r]) < 0 ? s = r : n = r + 1;
  }
  const o = Ih(e);
  return o && (s = t.lastIndexOf(o, s - 1), process.env.NODE_ENV !== "production" && s < 0 && _e(`Finding ancestor route "${o.record.path}" failed for "${e.record.path}"`)), s;
}
function Ih(e) {
  let t = e;
  for (; t = t.parent; ) if (fc(t) && dc(e, t) === 0) return t;
}
function fc({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function sl(e) {
  const t = _t(wo), n = _t(jr);
  let s = !1, o = null;
  const r = ne(() => {
    const h = l(e.to);
    return process.env.NODE_ENV !== "production" && (!s || h !== o) && (ao(h) || (s ? _e(`Invalid value for prop "to" in useLink()
- to:`, h, `
- previous to:`, o, `
- props:`, e) : _e(`Invalid value for prop "to" in useLink()
- to:`, h, `
- props:`, e)), o = h, s = !0), t.resolve(h);
  }), a = ne(() => {
    const { matched: h } = r.value, { length: f } = h, _ = h[f - 1], g = n.matched;
    if (!_ || !g.length) return -1;
    const k = g.findIndex(pn.bind(null, _));
    if (k > -1) return k;
    const O = ol(h[f - 2]);
    return f > 1 && ol(_) === O && g[g.length - 1].path !== O ? g.findIndex(pn.bind(null, h[f - 2])) : k;
  }), c = ne(() => a.value > -1 && jh(n.params, r.value.params)), u = ne(() => a.value > -1 && a.value === n.matched.length - 1 && tc(n.params, r.value.params));
  function p(h = {}) {
    if (Lh(h)) {
      const f = t[l(e.replace) ? "replace" : "push"](l(e.to)).catch(cs);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => f), f;
    }
    return Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && zt) {
    const h = zn();
    if (h) {
      const f = {
        route: r.value,
        isActive: c.value,
        isExactActive: u.value,
        error: null
      };
      h.__vrl_devtools = h.__vrl_devtools || [], h.__vrl_devtools.push(f), Du(() => {
        f.route = r.value, f.isActive = c.value, f.isExactActive = u.value, f.error = ao(l(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: r,
    href: ne(() => r.value.href),
    isActive: c,
    isExactActive: u,
    navigate: p
  };
}
function Mh(e) {
  return e.length === 1 ? e[0] : e;
}
const Fh = /* @__PURE__ */ Ve({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: sl,
  setup(e, { slots: t }) {
    const n = /* @__PURE__ */ cn(sl(e)), { options: s } = _t(wo), o = ne(() => ({
      [rl(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      [rl(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const r = t.default && Mh(t.default(n));
      return e.custom ? r : Da("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: o.value
      }, r);
    };
  }
}), Ur = Fh;
function Lh(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function jh(e, t) {
  for (const n in t) {
    const s = t[n], o = e[n];
    if (typeof s == "string") {
      if (s !== o) return !1;
    } else if (!dt(o) || o.length !== s.length || s.some((r, a) => r.valueOf() !== o[a].valueOf())) return !1;
  }
  return !0;
}
function ol(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const rl = (e, t, n) => e ?? t ?? n, Uh = /* @__PURE__ */ Ve({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    process.env.NODE_ENV !== "production" && Hh();
    const s = _t(ar), o = ne(() => e.route || s.value), r = _t(Qi, 0), a = ne(() => {
      let p = l(r);
      const { matched: h } = o.value;
      let f;
      for (; (f = h[p]) && !f.components; ) p++;
      return p;
    }), c = ne(() => o.value.matched[a.value]);
    Ls(Qi, ne(() => a.value + 1)), Ls(eh, c), Ls(ar, o);
    const u = /* @__PURE__ */ Z();
    return qe(() => [
      u.value,
      c.value,
      e.name
    ], ([p, h, f], [_, g, k]) => {
      h && (h.instances[f] = p, g && g !== h && p && p === _ && (h.leaveGuards.size || (h.leaveGuards = g.leaveGuards), h.updateGuards.size || (h.updateGuards = g.updateGuards))), p && h && (!g || !pn(h, g) || !_) && (h.enterCallbacks[f] || []).forEach((O) => O(p));
    }, { flush: "post" }), () => {
      const p = o.value, h = e.name, f = c.value, _ = f && f.components[h];
      if (!_) return il(n.default, {
        Component: _,
        route: p
      });
      const g = f.props[h], k = g ? g === !0 ? p.params : typeof g == "function" ? g(p) : g : null, W = Da(_, we({}, k, t, {
        onVnodeUnmounted: (V) => {
          V.component.isUnmounted && (f.instances[h] = null);
        },
        ref: u
      }));
      if (process.env.NODE_ENV !== "production" && zt && W.ref) {
        const V = {
          depth: a.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (dt(W.ref) ? W.ref.map((I) => I.i) : [W.ref.i]).forEach((I) => {
          I.__vrv_devtools = V;
        });
      }
      return il(n.default, {
        Component: W,
        route: p
      }) || W;
    };
  }
});
function il(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const pc = Uh;
function Hh() {
  const e = zn(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const s = t === "KeepAlive" ? "keep-alive" : "transition";
    _e(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${s}>
    <component :is="Component" />
  </${s}>
</router-view>`);
  }
}
function Gh(e) {
  const t = Ch(e.routes, e), n = e.parseQuery || Xp, s = e.stringifyQuery || Ji, o = e.history;
  if (process.env.NODE_ENV !== "production" && !o) throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const r = Zn(), a = Zn(), c = Zn(), u = /* @__PURE__ */ Zc(tn);
  let p = tn;
  zt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const h = Vo.bind(null, (C) => "" + C), f = Vo.bind(null, Ip), _ = Vo.bind(null, Bn);
  function g(C, z) {
    let J, oe;
    return nc(C) ? (J = t.getRecordMatcher(C), process.env.NODE_ENV !== "production" && !J && _e(`Parent route "${String(C)}" not found when adding child route`, z), oe = z) : oe = C, t.addRoute(oe, J);
  }
  function k(C) {
    const z = t.getRecordMatcher(C);
    z ? t.removeRoute(z) : process.env.NODE_ENV !== "production" && _e(`Cannot remove non-existent route "${String(C)}"`);
  }
  function O() {
    return t.getRoutes().map((C) => C.record);
  }
  function W(C) {
    return !!t.getRecordMatcher(C);
  }
  function V(C, z) {
    if (z = we({}, z || u.value), typeof C == "string") {
      const v = Io(n, C, z.path), $ = t.resolve({ path: v.path }, z), F = o.createHref(v.fullPath);
      return process.env.NODE_ENV !== "production" && (F.startsWith("//") ? _e(`Location "${C}" resolved to "${F}". A resolved location cannot start with multiple slashes.`) : $.matched.length || _e(`No match found for location with path "${C}"`)), we(v, $, {
        params: _($.params),
        hash: Bn(v.hash),
        redirectedFrom: void 0,
        href: F
      });
    }
    if (process.env.NODE_ENV !== "production" && !ao(C))
      return _e(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, C), V({});
    let J;
    if (C.path != null)
      process.env.NODE_ENV !== "production" && "params" in C && !("name" in C) && Object.keys(C.params).length && _e(`Path "${C.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), J = we({}, C, { path: Io(n, C.path, z.path).path });
    else {
      const v = we({}, C.params);
      for (const $ in v) v[$] == null && delete v[$];
      J = we({}, C, { params: f(v) }), z.params = f(z.params);
    }
    const oe = t.resolve(J, z), le = C.hash || "";
    process.env.NODE_ENV !== "production" && le && !le.startsWith("#") && _e(`A \`hash\` should always start with the character "#". Replace "${le}" with "#${le}".`), oe.params = h(_(oe.params));
    const De = Lp(s, we({}, C, {
      hash: Rp(le),
      path: oe.path
    })), m = o.createHref(De);
    return process.env.NODE_ENV !== "production" && (m.startsWith("//") ? _e(`Location "${C}" resolved to "${m}". A resolved location cannot start with multiple slashes.`) : oe.matched.length || _e(`No match found for location with path "${C.path != null ? C.path : C}"`)), we({
      fullPath: De,
      hash: le,
      query: s === Ji ? Zp(C.query) : C.query || {}
    }, oe, {
      redirectedFrom: void 0,
      href: m
    });
  }
  function I(C) {
    return typeof C == "string" ? Io(n, C, u.value.path) : we({}, C);
  }
  function L(C, z) {
    if (p !== C) return Kn(Pe.NAVIGATION_CANCELLED, {
      from: z,
      to: C
    });
  }
  function te(C) {
    return b(C);
  }
  function D(C) {
    return te(we(I(C), { replace: !0 }));
  }
  function T(C, z) {
    const J = C.matched[C.matched.length - 1];
    if (J && J.redirect) {
      const { redirect: oe } = J;
      let le = typeof oe == "function" ? oe(C, z) : oe;
      if (typeof le == "string" && (le = le.includes("?") || le.includes("#") ? le = I(le) : { path: le }, le.params = {}), process.env.NODE_ENV !== "production" && le.path == null && !("name" in le))
        throw _e(`Invalid redirect found:
${JSON.stringify(le, null, 2)}
 when navigating to "${C.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return we({
        query: C.query,
        hash: C.hash,
        params: le.path != null ? {} : C.params
      }, le);
    }
  }
  function b(C, z) {
    const J = p = V(C), oe = u.value, le = C.state, De = C.force, m = C.replace === !0, v = T(J, oe);
    if (v) return b(we(I(v), {
      state: typeof v == "object" ? we({}, le, v.state) : le,
      force: De,
      replace: m
    }), z || J);
    const $ = J;
    $.redirectedFrom = z;
    let F;
    return !De && Wi(s, oe, J) && (F = Kn(Pe.NAVIGATION_DUPLICATED, {
      to: $,
      from: oe
    }), Ct(oe, oe, !0, !1)), (F ? Promise.resolve(F) : M($, oe)).catch((R) => Bt(R) ? Bt(R, Pe.NAVIGATION_GUARD_REDIRECT) ? R : lt(R) : se(R, $, oe)).then((R) => {
      if (R) {
        if (Bt(R, Pe.NAVIGATION_GUARD_REDIRECT))
          return process.env.NODE_ENV !== "production" && Wi(s, V(R.to), $) && z && (z._count = z._count ? z._count + 1 : 1) > 30 ? (_e(`Detected a possibly infinite redirection in a navigation guard when going from "${oe.fullPath}" to "${$.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(/* @__PURE__ */ new Error("Infinite redirect in navigation guard"))) : b(we({ replace: m }, I(R.to), {
            state: typeof R.to == "object" ? we({}, le, R.to.state) : le,
            force: De
          }), z || $);
      } else R = Q($, oe, !0, m, le);
      return A($, oe, R), R;
    });
  }
  function S(C, z) {
    const J = L(C, z);
    return J ? Promise.reject(J) : Promise.resolve();
  }
  function x(C) {
    const z = Ge.values().next().value;
    return z && typeof z.runWithContext == "function" ? z.runWithContext(C) : C();
  }
  function M(C, z) {
    let J;
    const [oe, le, De] = nh(C, z);
    J = Fo(oe.reverse(), "beforeRouteLeave", C, z);
    for (const v of oe) v.leaveGuards.forEach(($) => {
      J.push(sn($, C, z));
    });
    const m = S.bind(null, C, z);
    return J.push(m), at(J).then(() => {
      J = [];
      for (const v of r.list()) J.push(sn(v, C, z));
      return J.push(m), at(J);
    }).then(() => {
      J = Fo(le, "beforeRouteUpdate", C, z);
      for (const v of le) v.updateGuards.forEach(($) => {
        J.push(sn($, C, z));
      });
      return J.push(m), at(J);
    }).then(() => {
      J = [];
      for (const v of De) if (v.beforeEnter) if (dt(v.beforeEnter)) for (const $ of v.beforeEnter) J.push(sn($, C, z));
      else J.push(sn(v.beforeEnter, C, z));
      return J.push(m), at(J);
    }).then(() => (C.matched.forEach((v) => v.enterCallbacks = {}), J = Fo(De, "beforeRouteEnter", C, z, x), J.push(m), at(J))).then(() => {
      J = [];
      for (const v of a.list()) J.push(sn(v, C, z));
      return J.push(m), at(J);
    }).catch((v) => Bt(v, Pe.NAVIGATION_CANCELLED) ? v : Promise.reject(v));
  }
  function A(C, z, J) {
    c.list().forEach((oe) => x(() => oe(C, z, J)));
  }
  function Q(C, z, J, oe, le) {
    const De = L(C, z);
    if (De) return De;
    const m = z === tn, v = zt ? history.state : {};
    J && (oe || m ? o.replace(C.fullPath, we({ scroll: m && v && v.scroll }, le)) : o.push(C.fullPath, le)), u.value = C, Ct(C, z, J, m), lt();
  }
  let he;
  function Re() {
    he || (he = o.listen((C, z, J) => {
      if (!Ue.listening) return;
      const oe = V(C), le = T(oe, Ue.currentRoute.value);
      if (le) {
        b(we(le, {
          replace: !0,
          force: !0
        }), oe).catch(cs);
        return;
      }
      p = oe;
      const De = u.value;
      zt && qp(zi(De.fullPath, J.delta), Eo()), M(oe, De).catch((m) => Bt(m, Pe.NAVIGATION_ABORTED | Pe.NAVIGATION_CANCELLED) ? m : Bt(m, Pe.NAVIGATION_GUARD_REDIRECT) ? (b(we(I(m.to), { force: !0 }), oe).then((v) => {
        Bt(v, Pe.NAVIGATION_ABORTED | Pe.NAVIGATION_DUPLICATED) && !J.delta && J.type === rr.pop && o.go(-1, !1);
      }).catch(cs), Promise.reject()) : (J.delta && o.go(-J.delta, !1), se(m, oe, De))).then((m) => {
        m = m || Q(oe, De, !1), m && (J.delta && !Bt(m, Pe.NAVIGATION_CANCELLED) ? o.go(-J.delta, !1) : J.type === rr.pop && Bt(m, Pe.NAVIGATION_ABORTED | Pe.NAVIGATION_DUPLICATED) && o.go(-1, !1)), A(oe, De, m);
      }).catch(cs);
    }));
  }
  let Se = Zn(), fe = Zn(), ue;
  function se(C, z, J) {
    lt(C);
    const oe = fe.list();
    return oe.length ? oe.forEach((le) => le(C, z, J)) : (process.env.NODE_ENV !== "production" && _e("uncaught error during route navigation:"), console.error(C)), Promise.reject(C);
  }
  function Ee() {
    return ue && u.value !== tn ? Promise.resolve() : new Promise((C, z) => {
      Se.add([C, z]);
    });
  }
  function lt(C) {
    return ue || (ue = !C, Re(), Se.list().forEach(([z, J]) => C ? J(C) : z()), Se.reset()), C;
  }
  function Ct(C, z, J, oe) {
    const { scrollBehavior: le } = e;
    if (!zt || !le) return Promise.resolve();
    const De = !J && zp(zi(C.fullPath, 0)) || (oe || !J) && history.state && history.state.scroll || null;
    return ps().then(() => le(C, z, De)).then((m) => m && Wp(m)).catch((m) => se(m, C, z));
  }
  const et = (C) => o.go(C);
  let tt;
  const Ge = /* @__PURE__ */ new Set(), Ue = {
    currentRoute: u,
    listening: !0,
    addRoute: g,
    removeRoute: k,
    clearRoutes: t.clearRoutes,
    hasRoute: W,
    getRoutes: O,
    resolve: V,
    options: e,
    push: te,
    replace: D,
    go: et,
    back: () => et(-1),
    forward: () => et(1),
    beforeEach: r.add,
    beforeResolve: a.add,
    afterEach: c.add,
    onError: fe.add,
    isReady: Ee,
    install(C) {
      C.component("RouterLink", Ur), C.component("RouterView", pc), C.config.globalProperties.$router = Ue, Object.defineProperty(C.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => l(u)
      }), zt && !tt && u.value === tn && (tt = !0, te(o.location).catch((oe) => {
        process.env.NODE_ENV !== "production" && _e("Unexpected error when starting the router:", oe);
      }));
      const z = {};
      for (const oe in tn) Object.defineProperty(z, oe, {
        get: () => u.value[oe],
        enumerable: !0
      });
      C.provide(wo, Ue), C.provide(jr, /* @__PURE__ */ Fl(z)), C.provide(ar, u);
      const J = C.unmount;
      Ge.add(C), C.unmount = function() {
        Ge.delete(C), Ge.size < 1 && (p = tn, he && he(), he = null, u.value = tn, tt = !1, ue = !1), J();
      }, process.env.NODE_ENV !== "production" && zt && oh(C, Ue, t);
    }
  };
  function at(C) {
    return C.reduce((z, J) => z.then(() => x(J)), Promise.resolve());
  }
  return Ue;
}
function hc() {
  return _t(wo);
}
function Bh(e) {
  return _t(jr);
}
const ll = "openclaw-guard.theme", al = "openclaw-guard.lang";
function Kh() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const ft = /* @__PURE__ */ Fr("ui", () => {
  const e = /* @__PURE__ */ Z("auto"), t = /* @__PURE__ */ Z("zh"), n = /* @__PURE__ */ Z(!1), s = ne(() => e.value === "auto" ? Kh() : e.value);
  function o() {
    typeof document > "u" || (document.documentElement.dataset.theme = s.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en");
  }
  function r() {
    if (n.value || typeof window > "u") {
      o();
      return;
    }
    const p = window.localStorage.getItem(ll), h = window.localStorage.getItem(al);
    (p === "auto" || p === "light" || p === "dark") && (e.value = p), (h === "zh" || h === "en") && (t.value = h), n.value = !0, o();
  }
  function a(p) {
    e.value = p, typeof window < "u" && window.localStorage.setItem(ll, p), o();
  }
  function c(p) {
    t.value = p, typeof window < "u" && window.localStorage.setItem(al, p), o();
  }
  function u(p, h) {
    return t.value === "zh" ? p : h;
  }
  return {
    themePreference: e,
    language: t,
    resolvedTheme: s,
    hydrate: r,
    setThemePreference: a,
    setLanguage: c,
    applyDocumentState: o,
    label: u
  };
}), Wh = { class: "guard-shell" }, qh = { class: "guard-shell__topbar" }, zh = { class: "topbar-actions" }, Jh = { class: "toolbar-menu" }, Qh = ["title"], Yh = { class: "toolbar-popover" }, Xh = ["onClick"], Zh = { class: "toolbar-menu" }, e_ = ["title"], t_ = { class: "toolbar-popover" }, n_ = {
  class: "toolbar-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, s_ = { class: "guard-shell__body" }, o_ = { class: "guard-shell__sidebar" }, r_ = { class: "sidebar-current" }, i_ = { class: "sidebar-current__label" }, l_ = { class: "sidebar-current__title" }, a_ = { class: "sidebar-current__meta" }, c_ = { class: "sidebar-nav" }, u_ = { class: "sidebar-group__title" }, d_ = { class: "guard-shell__content" }, f_ = "/ui/logo.png", p_ = /* @__PURE__ */ Ve({
  __name: "GuardShell",
  setup(e) {
    const t = ft(), n = Bh(), s = [
      {
        id: "core",
        zh: "核心控制台",
        en: "Core Control",
        items: [
          { to: "/", zh: "首页", en: "Home" },
          { to: "/operations", zh: "运维", en: "Operations" },
          { to: "/openclaw", zh: "OpenClaw", en: "OpenClaw" },
          { to: "/channels", zh: "渠道", en: "Channels" },
          { to: "/models", zh: "模型", en: "Models" },
          { to: "/security", zh: "安全", en: "Security" },
          { to: "/recovery", zh: "备份与恢复", en: "Backup & Recovery" }
        ]
      },
      {
        id: "workspace",
        zh: "工作区与角色",
        en: "Workspace & Roles",
        items: [
          { to: "/roles", zh: "角色", en: "Roles" },
          { to: "/files", zh: "文件", en: "Files" },
          { to: "/search", zh: "搜索", en: "Search" }
        ]
      },
      {
        id: "runtime",
        zh: "运行与排查",
        en: "Runtime & Troubleshooting",
        items: [
          { to: "/sessions", zh: "会话", en: "Sessions" },
          { to: "/logs", zh: "日志", en: "Logs" },
          { to: "/notifications", zh: "通知", en: "Notifications" }
        ]
      },
      {
        id: "automation",
        zh: "自动化",
        en: "Automation",
        items: [
          { to: "/cron", zh: "Cron", en: "Cron" }
        ]
      }
    ], o = [
      { value: "auto", icon: "⌘", zh: "跟随系统", en: "Auto" },
      { value: "light", icon: "☀", zh: "浅色", en: "Light" },
      { value: "dark", icon: "☾", zh: "深色", en: "Dark" }
    ], r = ne(() => t.themePreference === "light" ? "☀" : t.themePreference === "dark" ? "☾" : "⌘"), a = ne(() => {
      const c = s.flatMap((u) => u.items).find((u) => u.to === n.path);
      return c ? t.label(c.zh, c.en) : t.label("首页", "Home");
    });
    return $s(() => {
      t.hydrate();
    }), qe(() => t.themePreference, () => t.applyDocumentState()), qe(() => t.language, () => t.applyDocumentState()), (c, u) => (E(), w("div", Wh, [
      i("header", qh, [
        i("div", { class: "brand-lockup" }, [
          i("img", {
            class: "brand-lockup__logo",
            src: f_,
            alt: "OpenClaw Guard"
          }),
          u[2] || (u[2] = i("div", null, [
            i("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            i("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        i("div", zh, [
          i("div", Jh, [
            i("button", {
              class: "toolbar-icon",
              type: "button",
              title: l(t).label("主题", "Theme")
            }, d(r.value), 9, Qh),
            i("div", Yh, [
              (E(), w(Y, null, ye(o, (p) => i("button", {
                key: p.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (h) => l(t).setThemePreference(p.value)
              }, [
                i("span", null, d(p.icon), 1),
                i("span", null, d(l(t).label(p.zh, p.en)), 1)
              ], 8, Xh)), 64))
            ])
          ]),
          i("div", Zh, [
            i("button", {
              class: "toolbar-icon",
              type: "button",
              title: l(t).label("语言", "Language")
            }, " 🌐 ", 8, e_),
            i("div", t_, [
              i("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: u[0] || (u[0] = (p) => l(t).setLanguage("zh"))
              }, [...u[3] || (u[3] = [
                i("span", null, "中", -1),
                i("span", null, "中文", -1)
              ])]),
              i("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: u[1] || (u[1] = (p) => l(t).setLanguage("en"))
              }, [...u[4] || (u[4] = [
                i("span", null, "EN", -1),
                i("span", null, "English", -1)
              ])])
            ])
          ]),
          i("a", n_, d(l(t).label("打开当前正式控制台", "Open current production console")), 1)
        ])
      ]),
      i("div", s_, [
        i("aside", o_, [
          i("div", r_, [
            i("p", i_, d(l(t).label("当前页面", "Current page")), 1),
            i("p", l_, d(a.value), 1),
            i("p", a_, d(l(t).label("这里是 dev-rust 分支上的模块化预览壳层。当前继续迁移真实业务页面，但不会替换正式运行时。", "This is the modular preview shell on the dev-rust line. We keep migrating real product pages here without replacing the production runtime yet.")), 1)
          ]),
          i("nav", c_, [
            (E(), w(Y, null, ye(s, (p) => i("section", {
              key: p.id,
              class: "sidebar-group"
            }, [
              i("p", u_, d(l(t).label(p.zh, p.en)), 1),
              (E(!0), w(Y, null, ye(p.items, (h) => (E(), un(l(Ur), {
                key: h.to,
                to: h.to,
                class: ge(["sidebar-link", { "sidebar-link--active": l(n).path === h.to }])
              }, {
                default: ie(() => [
                  Rr(d(l(t).label(h.zh, h.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ])
        ]),
        i("main", d_, [
          X(l(pc))
        ])
      ])
    ]));
  }
}), h_ = /* @__PURE__ */ Ve({
  __name: "App",
  setup(e) {
    return (t, n) => (E(), w(Y, null, [
      X(p_),
      X(hp),
      X(cp)
    ], 64));
  }
});
function wt(e, t = null, n = {}) {
  const s = /* @__PURE__ */ Z(t), o = n.immediate !== !1, r = /* @__PURE__ */ Z(o && t === null), a = /* @__PURE__ */ Z(!1), c = /* @__PURE__ */ Z(null);
  async function u(p = {}) {
    p.silent === !0 ? a.value = !0 : r.value = !0, c.value = null;
    try {
      s.value = await e();
    } catch (f) {
      c.value = f instanceof Error ? f.message : String(f);
    } finally {
      r.value = !1, a.value = !1;
    }
  }
  return $s(() => {
    o && u();
  }), {
    data: s,
    loading: r,
    refreshing: a,
    error: c,
    execute: u
  };
}
function Yt(e) {
  if (!e) return "-";
  const t = Date.parse(e);
  return Number.isFinite(t) ? new Intl.DateTimeFormat(void 0, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(t)) : e;
}
function me(e) {
  return e == null || !Number.isFinite(e) ? "-" : new Intl.NumberFormat(void 0).format(e);
}
function __(e) {
  return e == null || !Number.isFinite(e) ? "-" : `${e.toFixed(e >= 10 ? 0 : 1)}%`;
}
function m_(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "-";
  if (e < 1024) return `${me(e)} B`;
  const t = ["KB", "MB", "GB", "TB"];
  let n = e / 1024, s = 0;
  for (; n >= 1024 && s < t.length - 1; )
    n /= 1024, s += 1;
  return `${n.toFixed(n >= 10 ? 1 : 2)} ${t[s]}`;
}
function cl(e, t = "USD") {
  if (e == null || !Number.isFinite(e)) return "-";
  if (/^[A-Z]{3}$/.test(t)) {
    const s = e >= 1 ? 2 : 4;
    return new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: t,
      minimumFractionDigits: s,
      maximumFractionDigits: s
    }).format(e);
  }
  const n = e >= 1 ? 2 : 4;
  return `${e.toFixed(n)} ${t}`.trim();
}
function ul(e) {
  return e ? e.slice(0, 7) : "-";
}
function As(e) {
  const t = {
    appId: "App ID",
    appSecret: "App Secret",
    encryptKey: "Encrypt Key",
    verificationToken: "Verification Token",
    domain: "Domain",
    connectionMode: "Connection Mode",
    webhookPath: "Webhook Path",
    webhookHost: "Webhook Host",
    webhookPort: "Webhook Port",
    dmPolicy: "DM Policy",
    groupPolicy: "Group Policy",
    requireMention: "Require Mention",
    streaming: "Streaming Reply",
    renderMode: "Render Mode",
    whisperModel: "Whisper Model",
    botToken: "Bot Token",
    appToken: "App Token",
    baseUrl: "Base URL",
    apiType: "API Type",
    apiKey: "API Key",
    modelId: "Model ID"
  };
  return t[e] ? t[e] : e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\b\w/g, (n) => n.toUpperCase());
}
function g_(e) {
  return typeof e == "boolean" ? e : typeof e == "string" ? ["true", "1", "yes", "on"].includes(e.trim().toLowerCase()) : !1;
}
function dr(e) {
  const t = e.trim();
  if (!t) return;
  const n = Number(t);
  return Number.isFinite(n) ? n : void 0;
}
function dl(e) {
  return /token|secret|key|password/i.test(e);
}
const v_ = { class: "page-card" }, b_ = { class: "page-card__header" }, y_ = {
  key: 0,
  class: "page-card__eyebrow"
}, E_ = { class: "page-card__title" }, w_ = { class: "page-card__body" }, ce = /* @__PURE__ */ Ve({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, n) => (E(), w("section", v_, [
      i("header", b_, [
        i("div", null, [
          e.eyebrow ? (E(), w("p", y_, d(e.eyebrow), 1)) : Ce("", !0),
          i("h2", E_, d(e.title), 1)
        ]),
        ri(t.$slots, "actions")
      ]),
      i("div", w_, [
        ri(t.$slots, "default")
      ])
    ]));
  }
});
async function N_(e) {
  if ((e.headers.get("content-type") || "").includes("application/json"))
    try {
      const s = await e.json();
      return s.message || s.error || `Request failed with ${e.status}`;
    } catch {
      return `Request failed with ${e.status}`;
    }
  return await e.text() || `Request failed with ${e.status}`;
}
async function Hr(e, t = {}) {
  const n = new Headers(t.headers);
  n.set("Accept", "application/json");
  let s = t.body;
  s && typeof s == "object" && !(s instanceof FormData) && !(s instanceof URLSearchParams) && !(s instanceof Blob) && (n.set("Content-Type", "application/json"), s = JSON.stringify(s));
  const o = await fetch(e, {
    ...t,
    headers: n,
    body: s
  });
  if (!o.ok)
    throw new Error(await N_(o));
  return o.json();
}
function xe(e) {
  return Hr(e);
}
function Ze(e, t) {
  return Hr(e, {
    method: "POST",
    body: t
  });
}
function _c(e) {
  return Hr(e, {
    method: "DELETE"
  });
}
async function $_() {
  const [e, t, n] = await Promise.all([
    xe("/api/channels"),
    xe("/api/channels/meta"),
    xe("/api/feishu/plugin").catch(() => ({ installed: !1 }))
  ]);
  return {
    channels: e,
    definitions: t,
    feishuPlugin: n
  };
}
function O_(e, t) {
  return Ze(`/api/channels/${encodeURIComponent(e)}`, t);
}
function S_(e) {
  return _c(`/api/channels/${encodeURIComponent(e)}`);
}
const k_ = { class: "page-stack" }, C_ = { class: "page-header" }, x_ = { class: "page-header__eyebrow" }, D_ = { class: "page-header__title" }, T_ = { class: "page-header__description" }, P_ = {
  key: 0,
  class: "page-empty"
}, R_ = {
  key: 1,
  class: "page-empty page-empty--error"
}, A_ = { class: "stat-grid" }, V_ = { class: "stat-card" }, I_ = { class: "stat-card__label" }, M_ = { class: "stat-card" }, F_ = { class: "stat-card__label" }, L_ = { class: "stat-card" }, j_ = { class: "stat-card__label" }, U_ = { class: "stat-card" }, H_ = { class: "stat-card__label" }, G_ = { class: "page-two-column" }, B_ = { class: "catalog-list" }, K_ = ["onClick"], W_ = { class: "catalog-list__title" }, q_ = { class: "pill-row" }, z_ = { class: "page-stack" }, J_ = { class: "page-inline-status" }, Q_ = { class: "muted-copy" }, Y_ = { class: "settings-grid" }, X_ = { key: 0 }, Z_ = ["onUpdate:modelValue", "type"], em = ["onUpdate:modelValue"], tm = ["value"], nm = {
  key: 3,
  class: "checkbox-row"
}, sm = ["onUpdate:modelValue"], om = { class: "page-actions" }, rm = ["disabled"], im = ["disabled"], lm = { class: "list-stack" }, am = { class: "action-row" }, cm = { class: "action-row" }, um = { class: "action-row" }, dm = { class: "code-panel" }, fm = /* @__PURE__ */ Ve({
  __name: "ChannelsPage",
  setup(e) {
    const t = {
      connectionMode: ["websocket", "webhook"],
      dmPolicy: ["open", "allowlist", "closed"],
      groupPolicy: ["open", "allowlist", "closed"],
      renderMode: ["auto", "rich", "compact"]
    }, n = ft(), s = hn(), o = wt(() => $_()), r = /* @__PURE__ */ Z(""), a = /* @__PURE__ */ Z(!1), c = /* @__PURE__ */ Z(!1), u = /* @__PURE__ */ cn({}), p = /* @__PURE__ */ cn({}), h = ne(() => {
      var b;
      return new Map((((b = o.data) == null ? void 0 : b.channels) || []).map((S) => [S.id, S]));
    }), f = ne(() => {
      var b;
      return new Map((((b = o.data) == null ? void 0 : b.definitions) || []).map((S) => [S.id, S]));
    }), _ = ne(() => {
      var b, S;
      return f.value.get(r.value) || ((S = (b = o.data) == null ? void 0 : b.definitions) == null ? void 0 : S[0]) || null;
    }), g = ne(() => {
      const b = _.value;
      return b ? h.value.get(b.id) || {
        id: b.id,
        name: b.name,
        icon: b.icon,
        enabled: !1,
        configured: !1,
        config: {}
      } : null;
    }), k = ne(() => {
      var b;
      return (((b = o.data) == null ? void 0 : b.channels) || []).filter((S) => S.enabled).length;
    }), O = ne(() => {
      var b;
      return (((b = o.data) == null ? void 0 : b.channels) || []).filter((S) => S.configured).length;
    }), W = ne(() => {
      const b = _.value, S = [
        {
          key: "enabled",
          label: n.label("启用这个渠道", "Enable this channel"),
          kind: "boolean",
          help: n.label("关闭后保留配置，但运行态不会接收这个入口的消息。", "Keep the config but stop receiving traffic from this channel.")
        }
      ];
      for (const x of (b == null ? void 0 : b.fields) || []) {
        if (x === "requireMention" || x === "streaming") {
          S.push({
            key: x,
            label: As(x),
            kind: "boolean",
            help: n.label("勾选即启用。", "Checked means enabled.")
          });
          continue;
        }
        if (t[x]) {
          S.push({
            key: x,
            label: As(x),
            kind: "text",
            inputType: "select",
            options: t[x].map((M) => ({ value: M, label: M }))
          });
          continue;
        }
        S.push({
          key: x,
          label: As(x),
          kind: "text",
          inputType: /port/i.test(x) ? "number" : dl(x) ? "password" : "text"
        });
      }
      for (const x of (b == null ? void 0 : b.envFields) || [])
        S.push({
          key: `env:${x}`,
          label: `${As(x)} (${x})`,
          kind: "text",
          inputType: "password",
          env: !0,
          help: n.label("留空会清除这个本机环境变量。", "Leave blank to clear this local environment variable.")
        });
      return S;
    });
    function V() {
      for (const b of Object.keys(u)) delete u[b];
      for (const b of Object.keys(p)) delete p[b];
    }
    function I() {
      var x, M;
      V();
      const b = g.value, S = _.value;
      if (!(!b || !S)) {
        p.enabled = b.enabled === !0;
        for (const A of S.fields) {
          const Q = (x = b.config) == null ? void 0 : x[A];
          A === "requireMention" || A === "streaming" ? p[A] = g_(Q) : u[A] = Q == null ? "" : String(Q);
        }
        for (const A of S.envFields) {
          const Q = `env:${A}`;
          u[Q] = ((M = b.config) == null ? void 0 : M[Q]) == null ? "" : String(b.config[Q]);
        }
      }
    }
    qe(
      () => o.data,
      (b) => {
        const S = (b == null ? void 0 : b.definitions) || [];
        if (S.length) {
          if (!r.value || !f.value.has(r.value)) {
            r.value = S[0].id;
            return;
          }
          I();
        }
      },
      { immediate: !0 }
    ), qe(r, () => {
      I();
    });
    function L() {
      const b = g.value;
      return b ? b.id === "feishu" ? b.enabled ? n.label(
        "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
        "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
      ) : n.label(
        "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
        "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
      ) : b.enabled ? n.label("保存后会直接更新当前消息入口配置。", "Saving here updates the live channel configuration immediately.") : n.label("这个消息入口当前停用中。可以先补齐配置，再决定是否启用。", "This channel is currently disabled. Finish the settings first, then decide whether to enable it.") : "";
    }
    async function te() {
      const b = g.value, S = _.value;
      if (!(!b || !S)) {
        a.value = !0;
        try {
          const x = {
            enabled: p.enabled === !0
          };
          for (const A of S.fields) {
            if (A === "requireMention" || A === "streaming") {
              x[A] = p[A] === !0;
              continue;
            }
            const Q = u[A] ?? "";
            /port/i.test(A) ? x[A] = dr(Q) ?? "" : x[A] = Q;
          }
          for (const A of S.envFields)
            x[`env:${A}`] = u[`env:${A}`] ?? "";
          const M = await O_(b.id, x);
          s.pushToast({
            tone: M.success ? "success" : "error",
            message: M.message
          }), await o.execute({ silent: !0 });
        } catch (x) {
          s.pushToast({
            tone: "error",
            message: x instanceof Error ? x.message : String(x)
          });
        } finally {
          a.value = !1;
        }
      }
    }
    async function D() {
      const b = g.value;
      if (!(!b || !await s.confirm({
        title: n.label("清空渠道配置", "Clear channel configuration"),
        message: n.label(
          `确认清空 ${b.name || b.id} 的配置吗？这会移除本机保存的字段和值。`,
          `Clear the configuration for ${b.name || b.id}? This removes the saved local values for this channel.`
        ),
        confirmLabel: n.label("确认清空", "Clear configuration"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        c.value = !0;
        try {
          const x = await S_(b.id);
          s.pushToast({
            tone: x.success ? "success" : "error",
            message: x.message
          }), await o.execute({ silent: !0 });
        } catch (x) {
          s.pushToast({
            tone: "error",
            message: x instanceof Error ? x.message : String(x)
          });
        } finally {
          c.value = !1;
        }
      }
    }
    function T(b) {
      return u[b] ?? "";
    }
    return (b, S) => (E(), w("div", k_, [
      i("header", C_, [
        i("div", null, [
          i("p", x_, d(l(n).label("渠道 / Second slice", "Channels / Second slice")), 1),
          i("h2", D_, d(l(n).label("渠道管理", "Channel management")), 1),
          i("p", T_, d(l(n).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: S[0] || (S[0] = (x) => l(o).execute({ silent: !0 }))
        }, d(l(o).refreshing ? l(n).label("刷新中…", "Refreshing…") : l(n).label("刷新", "Refresh")), 1)
      ]),
      l(o).loading ? (E(), w("div", P_, d(l(n).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : l(o).error ? (E(), w("div", R_, d(l(o).error), 1)) : l(o).data && g.value ? (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(n).label("当前概览", "Current overview"),
          eyebrow: "Summary"
        }, {
          default: ie(() => [
            i("div", A_, [
              i("article", V_, [
                i("p", I_, d(l(n).label("可管理渠道", "Channels")), 1),
                i("strong", null, d(l(o).data.definitions.length), 1),
                i("span", null, d(l(n).label("当前内置和官方入口总数", "Built-in and official entry points available now")), 1)
              ]),
              i("article", M_, [
                i("p", F_, d(l(n).label("已启用", "Enabled")), 1),
                i("strong", null, d(k.value), 1),
                i("span", null, d(l(n).label("运行态会接收消息", "Receives traffic at runtime")), 1)
              ]),
              i("article", L_, [
                i("p", j_, d(l(n).label("已配置", "Configured")), 1),
                i("strong", null, d(O.value), 1),
                i("span", null, d(l(n).label("已经填写了字段或本机变量", "Fields or local values already exist")), 1)
              ]),
              i("article", U_, [
                i("p", H_, d(l(n).label("飞书插件", "Feishu plugin")), 1),
                i("strong", null, d(l(o).data.feishuPlugin.installed ? l(n).label("已识别", "Detected") : l(n).label("未识别", "Not detected")), 1),
                i("span", null, d(l(o).data.feishuPlugin.version || l(n).label("官方渠道仍可直接维护", "Official channel still remains manageable")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        i("div", G_, [
          X(ce, {
            title: l(n).label("渠道目录", "Channel catalog"),
            eyebrow: "Catalog"
          }, {
            default: ie(() => [
              i("div", B_, [
                (E(!0), w(Y, null, ye(l(o).data.definitions, (x) => {
                  var M, A, Q, he;
                  return E(), w("button", {
                    key: x.id,
                    class: ge(["catalog-list__item", { "catalog-list__item--active": r.value === x.id }]),
                    type: "button",
                    onClick: (Re) => r.value = x.id
                  }, [
                    i("div", W_, [
                      i("strong", null, d(`${x.icon} ${x.name}`), 1)
                    ]),
                    i("div", q_, [
                      i("span", {
                        class: ge(["pill", (M = h.value.get(x.id)) != null && M.enabled ? "pill--success" : "pill--warning"])
                      }, d((A = h.value.get(x.id)) != null && A.enabled ? l(n).label("已启用", "Enabled") : l(n).label("停用", "Disabled")), 3),
                      i("span", {
                        class: ge(["pill", (Q = h.value.get(x.id)) != null && Q.configured ? "pill--success" : "pill--muted"])
                      }, d((he = h.value.get(x.id)) != null && he.configured ? l(n).label("已配置", "Configured") : l(n).label("未配置", "Empty")), 3)
                    ])
                  ], 10, K_);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          i("div", z_, [
            X(ce, {
              title: g.value.name,
              eyebrow: "Editor"
            }, {
              default: ie(() => [
                i("div", J_, [
                  i("span", {
                    class: ge(["pill", g.value.enabled ? "pill--success" : "pill--warning"])
                  }, d(g.value.enabled ? l(n).label("正在接收消息", "Receiving traffic") : l(n).label("当前停用", "Currently disabled")), 3),
                  i("span", {
                    class: ge(["pill", g.value.configured ? "pill--success" : "pill--muted"])
                  }, d(g.value.configured ? l(n).label("配置已完成", "Configured") : l(n).label("还未配置", "Not configured")), 3)
                ]),
                i("p", Q_, d(L()), 1),
                i("div", Y_, [
                  (E(!0), w(Y, null, ye(W.value, (x) => (E(), w("label", {
                    key: x.key,
                    class: "settings-field"
                  }, [
                    i("span", null, d(x.label), 1),
                    x.help ? (E(), w("small", X_, d(x.help), 1)) : Ce("", !0),
                    x.kind === "text" && x.inputType !== "select" ? Xe((E(), w("input", {
                      key: 1,
                      "onUpdate:modelValue": (M) => u[x.key] = M,
                      class: "settings-input",
                      type: x.inputType || "text"
                    }, null, 8, Z_)), [
                      [mf, u[x.key]]
                    ]) : x.kind === "text" && x.inputType === "select" ? Xe((E(), w("select", {
                      key: 2,
                      "onUpdate:modelValue": (M) => u[x.key] = M,
                      class: "settings-input"
                    }, [
                      (E(!0), w(Y, null, ye(x.options, (M) => (E(), w("option", {
                        key: M.value,
                        value: M.value
                      }, d(M.label), 9, tm))), 128))
                    ], 8, em)), [
                      [gs, u[x.key]]
                    ]) : (E(), w("label", nm, [
                      Xe(i("input", {
                        "onUpdate:modelValue": (M) => p[x.key] = M,
                        type: "checkbox"
                      }, null, 8, sm), [
                        [Pa, p[x.key]]
                      ]),
                      i("span", null, d(x.help || l(n).label("勾选即启用。", "Checked means enabled.")), 1)
                    ]))
                  ]))), 128))
                ]),
                i("div", om, [
                  i("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: a.value,
                    onClick: te
                  }, d(a.value ? l(n).label("保存中…", "Saving…") : l(n).label("保存渠道配置", "Save channel configuration")), 9, rm),
                  i("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: I
                  }, d(l(n).label("恢复当前值", "Reset draft")), 1),
                  i("button", {
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: c.value,
                    onClick: D
                  }, d(c.value ? l(n).label("清空中…", "Clearing…") : l(n).label("清空配置", "Clear configuration")), 9, im)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            X(ce, {
              title: l(n).label("配置摘要", "Configuration summary"),
              eyebrow: "Summary"
            }, {
              default: ie(() => {
                var x, M;
                return [
                  i("div", lm, [
                    i("article", am, [
                      i("div", null, [
                        i("h3", null, d(l(n).label("普通字段", "Regular fields")), 1),
                        i("p", null, d(l(n).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                      ]),
                      i("strong", null, d(((x = _.value) == null ? void 0 : x.fields.length) || 0), 1)
                    ]),
                    i("article", cm, [
                      i("div", null, [
                        i("h3", null, d(l(n).label("本机变量", "Local secrets")), 1),
                        i("p", null, d(l(n).label("敏感值优先以本机变量方式保存，便于后续替换或清空。", "Sensitive values are best stored as local variables so they can be rotated or cleared later.")), 1)
                      ]),
                      i("strong", null, d(((M = _.value) == null ? void 0 : M.envFields.length) || 0), 1)
                    ]),
                    i("article", um, [
                      i("div", null, [
                        i("h3", null, d(l(n).label("当前草稿", "Current draft")), 1),
                        i("p", null, d(l(n).label("这里只显示你现在编辑中的内容，不会自动写入运行态。", "This only shows the values you are editing now. Nothing reaches runtime until you save.")), 1)
                      ]),
                      i("strong", null, d(g.value.id), 1)
                    ])
                  ]),
                  i("pre", dm, d(JSON.stringify({
                    enabled: p.enabled,
                    fields: Object.fromEntries(Object.keys(u).filter((A) => !A.startsWith("env:")).map((A) => [A, l(dl)(A) && T(A) ? "******" : T(A)])),
                    envFields: Object.fromEntries(Object.keys(u).filter((A) => A.startsWith("env:")).map((A) => [A, T(A) ? "******" : ""]))
                  }, null, 2)), 1)
                ];
              }),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : Ce("", !0)
    ]));
  }
});
async function pm() {
  const [e, t, n, s] = await Promise.all([
    xe("/api/info"),
    xe("/api/dashboard/overview"),
    xe("/api/service/status"),
    xe("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: n, openclaw: s };
}
async function hm() {
  const [e, t] = await Promise.all([
    xe("/api/service/status"),
    xe("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function _m() {
  const [e, t] = await Promise.all([
    xe("/api/openclaw/status"),
    xe("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const mm = { class: "page-stack" }, gm = { class: "page-header" }, vm = { class: "page-header__eyebrow" }, bm = { class: "page-header__title" }, ym = { class: "page-header__description" }, Em = {
  key: 0,
  class: "page-empty"
}, wm = {
  key: 1,
  class: "page-empty page-empty--error"
}, Nm = { class: "stat-grid" }, $m = { class: "stat-card" }, Om = { class: "stat-card" }, Sm = { class: "stat-card" }, km = { class: "stat-card__label" }, Cm = { class: "list-stack" }, xm = { class: "action-row" }, Dm = { class: "action-row" }, Tm = {
  class: "inline-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, Pm = {
  key: 0,
  class: "list-stack"
}, Rm = {
  key: 1,
  class: "muted-copy"
}, Am = /* @__PURE__ */ Ve({
  __name: "DashboardPage",
  setup(e) {
    const t = ft(), n = wt(() => pm()), s = ne(() => {
      var r, a;
      const o = (a = (r = n.data) == null ? void 0 : r.overview) == null ? void 0 : a.risks;
      return Array.isArray(o) ? o : [];
    });
    return (o, r) => (E(), w("div", mm, [
      i("header", gm, [
        i("div", null, [
          i("p", vm, d(l(t).label("首页 / First slice", "Home / First slice")), 1),
          i("h2", bm, d(l(t).label("带路首页", "Guided Home")), 1),
          i("p", ym, d(l(t).label("先回答现在能不能用、下一步该做什么，以及哪里可能有风险。", "Answer what works now, what to do next, and where risk still exists.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (a) => l(n).execute({ silent: !0 }))
        }, d(l(n).refreshing ? l(t).label("刷新中…", "Refreshing…") : l(t).label("刷新", "Refresh")), 1)
      ]),
      l(n).loading ? (E(), w("div", Em, d(l(t).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : l(n).error ? (E(), w("div", wm, d(l(n).error), 1)) : l(n).data ? (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(t).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: ie(() => {
            var a, c, u, p, h, f, _, g, k, O;
            return [
              i("div", Nm, [
                i("article", $m, [
                  r[1] || (r[1] = i("p", { class: "stat-card__label" }, "Guard", -1)),
                  i("strong", null, d(((a = l(n).data.info) == null ? void 0 : a.guardVersion) || "unknown"), 1),
                  i("span", null, d(((c = l(n).data.info) == null ? void 0 : c.platform) || "unknown platform"), 1)
                ]),
                i("article", Om, [
                  r[2] || (r[2] = i("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  i("strong", null, d((p = (u = l(n).data.info) == null ? void 0 : u.openclaw) != null && p.installed ? ((f = (h = l(n).data.info) == null ? void 0 : h.openclaw) == null ? void 0 : f.version) || "installed" : l(t).label("未安装", "Not installed")), 1),
                  i("span", null, d(((g = (_ = l(n).data.info) == null ? void 0 : _.openclaw) == null ? void 0 : g.detectedSource) || l(t).label("待检测", "Pending detection")), 1)
                ]),
                i("article", Sm, [
                  i("p", km, d(l(t).label("Node 运行时", "Node runtime")), 1),
                  i("strong", null, d(((k = l(n).data.info) == null ? void 0 : k.nodeVersion) || "unknown"), 1),
                  i("span", null, d(((O = l(n).data.info) == null ? void 0 : O.user) || l(t).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(t).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: ie(() => [
            i("div", Cm, [
              i("article", xm, [
                i("div", null, [
                  i("h3", null, d(l(t).label("继续迁移首页 / 运维 / OpenClaw", "Keep migrating Home / Operations / OpenClaw")), 1),
                  i("p", null, d(l(t).label("这一版 Vue 壳层已经接上真实 API，下一批继续迁移渠道、模型、安全、备份与恢复。", "This Vue shell already talks to real APIs; next we migrate Channels, Models, Security, and Recovery.")), 1)
                ]),
                X(l(Ur), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: ie(() => [
                    Rr(d(l(t).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              i("article", Dm, [
                i("div", null, [
                  i("h3", null, d(l(t).label("保持旧控制台可用", "Keep the legacy console available")), 1),
                  i("p", null, d(l(t).label("新壳层目前是开发线入口，不替换正式运行时。需要完整能力时仍可打开当前正式控制台。", "The new shell is a dev-line entry for now and does not replace the production runtime yet.")), 1)
                ]),
                i("a", Tm, d(l(t).label("打开正式控制台", "Open production console")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(t).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: ie(() => [
            s.value.length ? (E(), w("div", Pm, [
              (E(!0), w(Y, null, ye(s.value, (a, c) => (E(), w("article", {
                key: `${a.title}-${c}`,
                class: "risk-row"
              }, [
                i("strong", null, d(a.title || l(t).label("未命名风险", "Unnamed risk")), 1),
                i("span", null, d(a.detail || l(t).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (E(), w("p", Rm, d(l(t).label("当前 API 未返回结构化风险列表，因此这里先显示为安全占位。后续页面迁移时会继续精炼。", "The current API did not return structured risks, so this section stays intentionally lightweight for the first scaffold.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : Ce("", !0)
    ]));
  }
}), Vm = {
  class: "page-tabs",
  role: "tablist"
}, Im = ["aria-selected", "onClick"], Mm = { key: 0 }, Gr = /* @__PURE__ */ Ve({
  __name: "PageTabs",
  props: {
    items: {},
    activeId: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, o) => (E(), w("div", Vm, [
      (E(!0), w(Y, null, ye(e.items, (r) => (E(), w("button", {
        key: r.id,
        class: ge(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
        type: "button",
        role: "tab",
        "aria-selected": r.id === e.activeId,
        onClick: (a) => n("change", r.id)
      }, [
        i("span", null, d(r.label), 1),
        r.hint ? (E(), w("small", Mm, d(r.hint), 1)) : Ce("", !0)
      ], 10, Im))), 128))
    ]));
  }
});
function Fm(e) {
  const t = new URLSearchParams();
  e && t.set("path", e);
  const n = t.size ? `?${t.toString()}` : "";
  return xe(`/api/files${n}`);
}
function fl(e) {
  const t = new URLSearchParams({ path: e });
  return xe(`/api/files/content?${t.toString()}`);
}
function Lm(e, t) {
  return Ze("/api/files/content", {
    path: e,
    content: t
  });
}
function jm(e, t, n) {
  return Ze("/api/files/create", {
    parentPath: e,
    name: t,
    kind: n
  });
}
function Um() {
  return xe("/api/memory");
}
function fr(e) {
  const t = String(e || "").replace(/\\/g, "/"), n = t.split("/").pop() || "";
  return ["SOUL.md", "USER.md", "AGENTS.md", "MEMORY.md"].includes(n) ? !0 : /\/memory\/.+\.md$/i.test(t);
}
function us(e) {
  const t = String(e || "").replace(/[\\/]+$/, "");
  if (!t) return "";
  const n = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return n >= 0 ? t.slice(0, n) : "";
}
const Br = /* @__PURE__ */ Fr("workspace", () => {
  const e = /* @__PURE__ */ Z("all"), t = /* @__PURE__ */ Z(""), n = /* @__PURE__ */ Z(""), s = /* @__PURE__ */ Z(""), o = /* @__PURE__ */ Z("all"), r = /* @__PURE__ */ Z(""), a = /* @__PURE__ */ Z(""), c = /* @__PURE__ */ Z(null);
  function u(V) {
    e.value = V;
  }
  function p(V) {
    t.value = V;
  }
  function h(V) {
    n.value = V, V && (t.value = us(V) || t.value);
  }
  function f(V) {
    s.value = V;
  }
  function _(V) {
    o.value = V;
  }
  function g(V) {
    r.value = V;
  }
  function k(V) {
    a.value = V;
  }
  function O(V) {
    const I = fr(V) ? "memory" : "all";
    c.value = {
      path: V,
      mode: I,
      parentPath: us(V)
    }, e.value = I, I === "memory" ? s.value = V : (n.value = V, t.value = us(V) || t.value);
  }
  function W() {
    const V = c.value;
    return c.value = null, V;
  }
  return {
    mode: e,
    currentPath: t,
    selectedFilePath: n,
    selectedMemoryFilePath: s,
    memoryKindFilter: o,
    memoryFilterQuery: r,
    searchQuery: a,
    pendingReveal: c,
    setMode: u,
    setCurrentPath: p,
    setSelectedFilePath: h,
    setSelectedMemoryFilePath: f,
    setMemoryKindFilter: _,
    setMemoryFilterQuery: g,
    setSearchQuery: k,
    requestReveal: O,
    consumeReveal: W
  };
}), Hm = { class: "page-stack" }, Gm = { class: "page-header" }, Bm = { class: "page-header__eyebrow" }, Km = { class: "page-header__title" }, Wm = { class: "page-header__description" }, qm = {
  key: 0,
  class: "page-empty"
}, zm = {
  key: 1,
  class: "page-empty page-empty--error"
}, Jm = { class: "stat-grid" }, Qm = { class: "stat-card" }, Ym = { class: "stat-card__label" }, Xm = { class: "stat-card" }, Zm = { class: "stat-card__label" }, eg = { class: "stat-card" }, tg = { class: "stat-card__label" }, ng = { class: "stat-card" }, sg = { class: "stat-card__label" }, og = { class: "page-two-column" }, rg = { class: "list-stack" }, ig = { class: "catalog-list" }, lg = ["onClick"], ag = { class: "catalog-list__title" }, cg = { class: "pill-row" }, ug = { class: "pill pill--info" }, dg = { class: "mini-list" }, fg = { class: "mini-list__item mini-list__item--stack" }, pg = { class: "page-actions" }, hg = ["disabled"], _g = { class: "create-row" }, mg = { value: "file" }, gg = { value: "directory" }, vg = ["placeholder", "onKeydown"], bg = ["disabled"], yg = {
  key: 0,
  class: "directory-list"
}, Eg = ["onClick"], wg = { class: "entry-button__title" }, Ng = { class: "pill-row" }, $g = { class: "pill pill--muted" }, Og = {
  key: 1,
  class: "page-empty"
}, Sg = {
  key: 0,
  class: "page-empty"
}, kg = { class: "mini-list" }, Cg = { class: "mini-list__item mini-list__item--stack" }, xg = { key: 0 }, Dg = { class: "page-actions" }, Tg = ["disabled"], Pg = {
  key: 2,
  class: "page-empty"
}, Rg = { class: "stat-grid" }, Ag = { class: "stat-card" }, Vg = { class: "stat-card__label" }, Ig = { class: "stat-card" }, Mg = { class: "stat-card__label" }, Fg = { class: "stat-card" }, Lg = { class: "stat-card__label" }, jg = { class: "stat-card" }, Ug = { class: "stat-card__label" }, Hg = { class: "page-two-column" }, Gg = { class: "settings-field" }, Bg = ["value", "placeholder"], Kg = { class: "pill-row" }, Wg = ["onClick"], qg = { class: "muted-copy" }, zg = {
  key: 0,
  class: "page-empty"
}, Jg = {
  key: 1,
  class: "provider-stack"
}, Qg = { class: "provider-card__header" }, Yg = { key: 0 }, Xg = { class: "pill-row" }, Zg = { class: "pill pill--info" }, ev = { class: "pill pill--muted" }, tv = { class: "pill pill--muted" }, nv = { class: "directory-list" }, sv = ["onClick"], ov = { class: "entry-button__title" }, rv = { class: "pill-row" }, iv = { class: "pill pill--muted" }, lv = {
  key: 2,
  class: "page-empty"
}, av = {
  key: 0,
  class: "page-empty"
}, cv = { class: "mini-list" }, uv = { class: "mini-list__item mini-list__item--stack" }, dv = { class: "page-actions" }, fv = ["disabled"], pv = {
  key: 2,
  class: "page-empty"
}, hv = /* @__PURE__ */ Ve({
  __name: "FilesPage",
  setup(e) {
    const t = ft(), n = hn(), s = Br(), o = /* @__PURE__ */ Z(!0), r = /* @__PURE__ */ Z(!1), a = /* @__PURE__ */ Z(!1), c = /* @__PURE__ */ Z(!1), u = /* @__PURE__ */ Z(null), p = /* @__PURE__ */ Z(null), h = /* @__PURE__ */ Z(null), f = /* @__PURE__ */ Z([]), _ = /* @__PURE__ */ Z(null), g = /* @__PURE__ */ Z(""), k = /* @__PURE__ */ Z(""), O = /* @__PURE__ */ Z(null), W = /* @__PURE__ */ Z(""), V = /* @__PURE__ */ Z(""), I = /* @__PURE__ */ Z(!1), L = /* @__PURE__ */ Z(!1), te = /* @__PURE__ */ Z("file"), D = /* @__PURE__ */ Z(""), T = ne(() => [
      {
        id: "all",
        label: t.label("全部文件", "All files"),
        hint: t.label("浏览受 Guard 管理的工作区目录", "Browse Guard-managed workspace directories")
      },
      {
        id: "memory",
        label: t.label("核心记忆", "Core memory"),
        hint: t.label("集中查看 SOUL / USER / AGENTS / MEMORY 与 memory/", "Focus on SOUL / USER / AGENTS / MEMORY and memory/")
      }
    ]), b = ne(() => s.mode === "memory" ? p.value : u.value), S = ne(() => {
      var y;
      return ((y = h.value) == null ? void 0 : y.roots) || [];
    }), x = ne(() => {
      var y;
      return ((y = h.value) == null ? void 0 : y.entries) || [];
    }), M = ne(() => {
      var y;
      return ((y = h.value) == null ? void 0 : y.currentPath) || s.currentPath;
    }), A = ne(() => {
      var y;
      return ((y = h.value) == null ? void 0 : y.parentPath) || null;
    }), Q = ne(() => S.value.filter((y) => M.value === y.path || M.value.startsWith(`${y.path}\\`) || M.value.startsWith(`${y.path}/`)).sort((y, P) => P.path.length - y.path.length)[0] || null), he = ne(() => x.value.filter((y) => y.isDirectory).length), Re = ne(() => x.value.length - he.value), Se = ne(() => f.value), fe = ne(() => {
      const y = s.memoryFilterQuery.trim().toLowerCase();
      return Se.value.filter((P) => s.memoryKindFilter !== "all" && Ee(P) !== s.memoryKindFilter ? !1 : y ? [
        P.agentId,
        P.type,
        P.relativePath,
        P.path
      ].join(" ").toLowerCase().includes(y) : !0).sort((P, N) => {
        const q = String(P.agentId || "").localeCompare(String(N.agentId || ""));
        if (q !== 0) return q;
        const pe = Ee(P).localeCompare(Ee(N));
        return pe !== 0 ? pe : et(P).localeCompare(et(N));
      });
    }), ue = ne(() => {
      var P;
      const y = /* @__PURE__ */ new Map();
      for (const N of fe.value) {
        const q = String(N.agentId || "");
        y.has(q) || y.set(q, []), (P = y.get(q)) == null || P.push(N);
      }
      return Array.from(y.entries()).map(([N, q]) => ({
        agentId: N,
        label: Ct(N),
        files: q,
        docsCount: q.filter((pe) => Ee(pe) === "docs").length,
        notesCount: q.filter((pe) => Ee(pe) === "notes").length
      })).sort((N, q) => N.label.localeCompare(q.label));
    });
    function se(y) {
      return y.replace(/\r\n/g, `
`);
    }
    function Ee(y) {
      return y.type === "memory" ? "notes" : "docs";
    }
    function lt(y) {
      return y === "docs" ? t.label("核心文档", "Core docs") : y === "notes" ? t.label("记忆片段", "Memory notes") : t.label("全部", "All");
    }
    function Ct(y) {
      if (!y) return t.label("未分组", "Ungrouped");
      if (!y.startsWith("detected:")) return y;
      const P = y.slice(9) || "workspace";
      return t.label(`自动发现：${P}`, `Auto-detected: ${P}`);
    }
    function et(y) {
      if (y.type === "memory") {
        const P = y.relativePath.split(/[\\/]/);
        return P[P.length - 1] || y.relativePath;
      }
      return y.type;
    }
    function tt(y) {
      return y === "file" ? _.value !== null && se(g.value) !== k.value : O.value !== null && se(W.value) !== V.value;
    }
    async function Ge(y) {
      if (!tt(y)) return !0;
      const P = y === "memory";
      return n.confirm({
        title: t.label(P ? "切换记忆文件" : "切换文件", P ? "Switch memory file" : "Switch file"),
        message: t.label(
          P ? "当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。" : "当前文件编辑器里有未保存修改，继续切换会丢失这些内容。",
          P ? "There are unsaved changes in the memory editor. Switching now discards them." : "There are unsaved changes in the file editor. Switching now discards them."
        ),
        confirmLabel: t.label("放弃并继续", "Discard and continue"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      });
    }
    async function Ue(y, P = !1) {
      P || (r.value = !0), u.value = null;
      try {
        const N = await Fm(y);
        h.value = N, s.setCurrentPath(N.currentPath);
      } catch (N) {
        u.value = N instanceof Error ? N.message : String(N);
      } finally {
        r.value = !1;
      }
    }
    async function at(y = !1) {
      y || (a.value = !0), p.value = null;
      try {
        const P = await Um();
        f.value = P.files || [];
      } catch (P) {
        p.value = P instanceof Error ? P.message : String(P);
      } finally {
        a.value = !1;
      }
    }
    async function C(y, P = !0) {
      if (P && !await Ge("file")) return !1;
      c.value = !0;
      try {
        const N = await fl(y);
        return _.value = N, g.value = N.content || "", k.value = se(N.content || ""), s.setSelectedFilePath(y), !0;
      } catch (N) {
        return n.pushToast({
          tone: "error",
          message: N instanceof Error ? N.message : String(N)
        }), !1;
      } finally {
        c.value = !1;
      }
    }
    async function z(y, P = !0) {
      if (P && !await Ge("memory")) return !1;
      c.value = !0;
      try {
        const N = await fl(y);
        return O.value = N, W.value = N.content || "", V.value = se(N.content || ""), s.setSelectedMemoryFilePath(y), !0;
      } catch (N) {
        return n.pushToast({
          tone: "error",
          message: N instanceof Error ? N.message : String(N)
        }), !1;
      } finally {
        c.value = !1;
      }
    }
    async function J() {
      const y = s.currentPath || us(s.selectedFilePath) || void 0;
      await Ue(y, !0), s.selectedFilePath && await C(s.selectedFilePath, !1);
    }
    async function oe() {
      await at(!0), s.selectedMemoryFilePath && await z(s.selectedMemoryFilePath, !1);
    }
    async function le(y, P, N = !0) {
      if (P === "memory") {
        if (s.mode === "all" && N && !await Ge("file")) return;
        s.setMode("memory"), await at(!0), y && await z(y, !1);
        return;
      }
      s.mode === "memory" && N && !await Ge("memory") || (s.setMode("all"), await Ue(us(y) || s.currentPath || void 0, !0), y && await C(y, !1));
    }
    async function De(y) {
      var q, pe;
      const P = y === "memory" ? "memory" : "all";
      if (P === s.mode) return;
      const N = P === "memory" ? s.selectedMemoryFilePath || ((q = O.value) == null ? void 0 : q.path) || "" : s.selectedFilePath || ((pe = _.value) == null ? void 0 : pe.path) || "";
      await le(N, P, !0), P === "all" && !N && (s.setMode("all"), await Ue(s.currentPath || void 0, !0)), P === "memory" && !N && (s.setMode("memory"), await at(!0));
    }
    async function m(y) {
      if (y.isDirectory) {
        if (!await Ge("file")) return;
        _.value = null, g.value = "", k.value = "", s.setSelectedFilePath(""), await Ue(y.path);
        return;
      }
      await C(y.path, !0);
    }
    async function v(y) {
      await Ge("file") && (_.value = null, g.value = "", k.value = "", s.setSelectedFilePath(""), await Ue(y));
    }
    async function $() {
      A.value && await Ge("file") && (_.value = null, g.value = "", k.value = "", s.setSelectedFilePath(""), await Ue(A.value));
    }
    async function F() {
      await Ue(M.value || void 0, !0);
    }
    async function R() {
      var y;
      (y = _.value) != null && y.path && await C(_.value.path, !0);
    }
    async function j() {
      var y;
      (y = O.value) != null && y.path && await z(O.value.path, !0);
    }
    async function K(y) {
      const P = y === "file" ? _.value : O.value, N = y === "file" ? g.value : W.value;
      if (P != null && P.path) {
        I.value = !0;
        try {
          const q = await Lm(P.path, N);
          n.pushToast({
            tone: q.success ? "success" : "error",
            message: q.message
          }), q.success && (y === "file" ? (k.value = se(N), _.value && (_.value.content = N), await Ue(M.value || void 0, !0)) : (V.value = se(N), O.value && (O.value.content = N), await at(!0)));
        } catch (q) {
          n.pushToast({
            tone: "error",
            message: q instanceof Error ? q.message : String(q)
          });
        } finally {
          I.value = !1;
        }
      }
    }
    async function G() {
      const y = M.value;
      if (!y) return;
      const P = D.value.trim();
      if (!P) {
        n.pushToast({
          tone: "warning",
          message: t.label("请输入要创建的文件名或目录名。", "Enter the file or directory name first.")
        });
        return;
      }
      L.value = !0;
      try {
        const N = await jm(y, P, te.value);
        n.pushToast({
          tone: N.success ? "success" : "error",
          message: N.message
        }), N.success && (D.value = "", await Ue(y, !0), te.value === "file" && N.path && await C(N.path, !1));
      } catch (N) {
        n.pushToast({
          tone: "error",
          message: N instanceof Error ? N.message : String(N)
        });
      } finally {
        L.value = !1;
      }
    }
    function H(y) {
      s.setMemoryKindFilter(y === "docs" || y === "notes" ? y : "all");
    }
    async function U() {
      var y;
      (y = O.value) != null && y.path && await le(O.value.path, "all", !0);
    }
    async function re() {
      o.value = !0;
      const y = s.consumeReveal();
      if (y != null && y.path) {
        await le(y.path, y.mode, !1), o.value = !1;
        return;
      }
      s.mode === "memory" ? await oe() : await J(), o.value = !1;
    }
    return $s(() => {
      re();
    }), (y, P) => (E(), w("div", Hm, [
      i("header", Gm, [
        i("div", null, [
          i("p", Bm, d(l(t).label("文件 / Third slice", "Files / Third slice")), 1),
          i("h2", Km, d(l(t).label("文件与记忆", "Files and memory")), 1),
          i("p", Wm, d(l(t).label("保留“全部文件”和“核心记忆”双视图，让搜索、角色工作区和实际编辑动作都能在新壳层里接得上。", "Keep both the All Files and Core Memory views so search results, role workspaces, and real editing actions can all land cleanly in the new shell.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: re
        }, d(o.value || r.value || a.value ? l(t).label("刷新中…", "Refreshing…") : l(t).label("Refresh", "Refresh")), 1)
      ]),
      X(Gr, {
        items: T.value,
        "active-id": l(s).mode,
        onChange: De
      }, null, 8, ["items", "active-id"]),
      o.value ? (E(), w("div", qm, d(l(t).label("正在恢复文件视图…", "Restoring the workspace view…")), 1)) : b.value && (l(s).mode === "all" && !h.value || l(s).mode === "memory" && !f.value.length) ? (E(), w("div", zm, d(b.value), 1)) : l(s).mode === "all" ? (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(t).label("当前目录概览", "Current directory overview"),
          eyebrow: "Summary"
        }, {
          default: ie(() => {
            var N, q, pe;
            return [
              i("div", Jm, [
                i("article", Qm, [
                  i("p", Ym, d(l(t).label("受控根目录", "Managed roots")), 1),
                  i("strong", null, d(l(me)(S.value.length)), 1),
                  i("span", null, d(((N = Q.value) == null ? void 0 : N.label) || l(t).label("当前正在受控范围内浏览", "Browsing inside the managed scope now")), 1)
                ]),
                i("article", Xm, [
                  i("p", Zm, d(l(t).label("当前目录内容", "Current entries")), 1),
                  i("strong", null, d(l(me)(x.value.length)), 1),
                  i("span", null, d(`${l(me)(he.value)} ${l(t).label("个目录", "dirs")} / ${l(me)(Re.value)} ${l(t).label("个文件", "files")}`), 1)
                ]),
                i("article", eg, [
                  i("p", tg, d(l(t).label("当前打开文件", "Open file")), 1),
                  i("strong", null, d(_.value ? "1" : "0"), 1),
                  i("span", null, d(((q = _.value) == null ? void 0 : q.relativePath) || l(t).label("还没有打开文件", "No file opened yet")), 1)
                ]),
                i("article", ng, [
                  i("p", sg, d(l(t).label("当前路径", "Current path")), 1),
                  i("strong", null, d(((pe = Q.value) == null ? void 0 : pe.type) === "detected-workspace" ? l(t).label("自动发现", "Auto-detected") : l(t).label("受控目录", "Managed")), 1),
                  i("span", null, d(M.value || l(t).label("等待路径返回", "Waiting for a resolved path")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        i("div", og, [
          X(ce, {
            title: l(t).label("工作区浏览器", "Workspace browser"),
            eyebrow: "Browser"
          }, {
            default: ie(() => [
              i("div", rg, [
                i("div", ig, [
                  (E(!0), w(Y, null, ye(S.value, (N) => (E(), w("button", {
                    key: N.id,
                    class: ge(["catalog-list__item", { "catalog-list__item--active": M.value === N.path || M.value.startsWith(`${N.path}\\`) || M.value.startsWith(`${N.path}/`) }]),
                    type: "button",
                    onClick: (q) => v(N.path)
                  }, [
                    i("div", ag, [
                      i("strong", null, d(N.label), 1)
                    ]),
                    i("div", cg, [
                      i("span", ug, d(N.type), 1)
                    ])
                  ], 10, lg))), 128))
                ]),
                i("div", dg, [
                  i("div", fg, [
                    i("strong", null, d(l(t).label("当前路径", "Current path")), 1),
                    i("p", null, d(M.value || "-"), 1)
                  ])
                ]),
                i("div", pg, [
                  i("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: !A.value,
                    onClick: $
                  }, d(l(t).label("返回上一级", "Go up")), 9, hg),
                  i("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: F
                  }, d(r.value ? l(t).label("刷新中…", "Refreshing…") : l(t).label("刷新目录", "Reload list")), 1)
                ]),
                i("div", _g, [
                  Xe(i("select", {
                    "onUpdate:modelValue": P[0] || (P[0] = (N) => te.value = N),
                    class: "settings-input create-row__kind"
                  }, [
                    i("option", mg, d(l(t).label("文件", "File")), 1),
                    i("option", gg, d(l(t).label("目录", "Directory")), 1)
                  ], 512), [
                    [gs, te.value]
                  ]),
                  Xe(i("input", {
                    "onUpdate:modelValue": P[1] || (P[1] = (N) => D.value = N),
                    class: "settings-input",
                    type: "text",
                    placeholder: l(t).label("例如：README-local.md 或 drafts", "Example: README-local.md or drafts"),
                    onKeydown: Ef(Vr(G, ["prevent"]), ["enter"])
                  }, null, 40, vg), [
                    [yt, D.value]
                  ]),
                  i("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: L.value,
                    onClick: G
                  }, d(L.value ? l(t).label("创建中…", "Creating…") : l(t).label("创建", "Create")), 9, bg)
                ]),
                x.value.length ? (E(), w("div", yg, [
                  (E(!0), w(Y, null, ye(x.value, (N) => {
                    var q;
                    return E(), w("button", {
                      key: N.path,
                      class: ge(["entry-button", { "entry-button--active": ((q = _.value) == null ? void 0 : q.path) === N.path }]),
                      type: "button",
                      onClick: (pe) => m(N)
                    }, [
                      i("div", wg, [
                        i("strong", null, d(N.isDirectory ? `${l(t).label("[目录]", "[DIR]")} ${N.name}` : N.name), 1)
                      ]),
                      i("p", null, d(N.relativePath || N.path), 1),
                      i("div", Ng, [
                        i("span", {
                          class: ge(["pill", N.isDirectory ? "pill--info" : "pill--muted"])
                        }, d(N.isDirectory ? l(t).label("目录", "Directory") : l(m_)(N.size)), 3),
                        i("span", $g, d(l(Yt)(N.modifiedAt)), 1)
                      ])
                    ], 10, Eg);
                  }), 128))
                ])) : (E(), w("div", Og, d(l(t).label("当前目录下还没有可展示内容。", "The current directory does not contain any visible entries yet.")), 1))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("文件编辑器", "File editor"),
            eyebrow: "Editor"
          }, {
            default: ie(() => [
              c.value ? (E(), w("div", Sg, d(l(t).label("正在读取文件内容…", "Loading file content…")), 1)) : _.value ? (E(), w(Y, { key: 1 }, [
                i("div", kg, [
                  i("div", Cg, [
                    i("strong", null, d(_.value.relativePath || _.value.path), 1),
                    i("p", null, d(_.value.path), 1),
                    _.value.truncated ? (E(), w("p", xg, d(l(t).label("文件内容过长，当前只预览了前一部分。", "This file is large, so only the first portion is loaded for preview and editing.")), 1)) : Ce("", !0)
                  ])
                ]),
                i("div", Dg, [
                  i("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: R
                  }, d(l(t).label("重新读取", "Reload")), 1),
                  i("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: I.value,
                    onClick: P[2] || (P[2] = (N) => K("file"))
                  }, d(I.value ? l(t).label("保存中…", "Saving…") : l(t).label("保存文件", "Save file")), 9, Tg)
                ]),
                Xe(i("textarea", {
                  "onUpdate:modelValue": P[3] || (P[3] = (N) => g.value = N),
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [yt, g.value]
                ])
              ], 64)) : (E(), w("div", Pg, d(l(t).label("先从左侧选择一个文件，再在这里查看或编辑。", "Select a file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64)) : (E(), w(Y, { key: 3 }, [
        X(ce, {
          title: l(t).label("核心记忆概览", "Core memory overview"),
          eyebrow: "Summary"
        }, {
          default: ie(() => {
            var N;
            return [
              i("div", Rg, [
                i("article", Ag, [
                  i("p", Vg, d(l(t).label("记忆文件数", "Memory files")), 1),
                  i("strong", null, d(l(me)(Se.value.length)), 1),
                  i("span", null, d(`${l(me)(Se.value.filter((q) => q.type !== "memory").length)} ${l(t).label("个核心文档", "core docs")} / ${l(me)(Se.value.filter((q) => q.type === "memory").length)} ${l(t).label("个记忆片段", "memory notes")}`), 1)
                ]),
                i("article", Ig, [
                  i("p", Mg, d(l(t).label("覆盖角色", "Covered roles")), 1),
                  i("strong", null, d(l(me)(ue.value.length)), 1),
                  i("span", null, d(l(t).label("包含可管理记忆文件的角色或工作区", "Roles or workspaces that already have managed memory files")), 1)
                ]),
                i("article", Fg, [
                  i("p", Lg, d(l(t).label("当前显示", "Visible now")), 1),
                  i("strong", null, d(l(me)(fe.value.length)), 1),
                  i("span", null, d(`${lt(l(s).memoryKindFilter)} / ${l(s).memoryFilterQuery || l(t).label("未设置搜索词", "No search query")}`), 1)
                ]),
                i("article", jg, [
                  i("p", Ug, d(l(t).label("当前打开", "Current file")), 1),
                  i("strong", null, d(O.value ? "1" : "0"), 1),
                  i("span", null, d(((N = O.value) == null ? void 0 : N.relativePath) || l(t).label("还没有打开记忆文件", "No memory file opened yet")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        i("div", Hg, [
          X(ce, {
            title: l(t).label("记忆目录", "Memory catalog"),
            eyebrow: "Catalog"
          }, {
            default: ie(() => [
              i("div", Gg, [
                i("span", null, d(l(t).label("筛选", "Filter")), 1),
                i("input", {
                  value: l(s).memoryFilterQuery,
                  class: "settings-input",
                  type: "text",
                  placeholder: l(t).label("搜索 Agent / 文件名 / 路径", "Filter by agent / file / path"),
                  onInput: P[4] || (P[4] = (N) => l(s).setMemoryFilterQuery(N.target.value))
                }, null, 40, Bg)
              ]),
              i("div", Kg, [
                (E(), w(Y, null, ye(["all", "docs", "notes"], (N) => i("button", {
                  key: N,
                  class: ge(["pill-button", { "pill-button--active": l(s).memoryKindFilter === N }]),
                  type: "button",
                  onClick: (q) => H(N)
                }, [
                  i("span", null, d(lt(N)), 1)
                ], 10, Wg)), 64))
              ]),
              i("p", qg, d(l(t).label(`当前显示 ${l(me)(fe.value.length)} / ${l(me)(Se.value.length)} 个记忆文件。`, `Showing ${l(me)(fe.value.length)} of ${l(me)(Se.value.length)} memory files.`)), 1),
              a.value ? (E(), w("div", zg, d(l(t).label("正在读取记忆目录…", "Loading the memory catalog…")), 1)) : ue.value.length ? (E(), w("div", Jg, [
                (E(!0), w(Y, null, ye(ue.value, (N) => (E(), w("article", {
                  key: N.agentId,
                  class: "provider-card"
                }, [
                  i("header", Qg, [
                    i("div", null, [
                      i("strong", null, d(N.label), 1),
                      N.label !== N.agentId ? (E(), w("p", Yg, d(N.agentId), 1)) : Ce("", !0)
                    ]),
                    i("div", Xg, [
                      i("span", Zg, d(l(me)(N.files.length)), 1),
                      i("span", ev, d(`${lt("docs")} ${l(me)(N.docsCount)}`), 1),
                      i("span", tv, d(`${lt("notes")} ${l(me)(N.notesCount)}`), 1)
                    ])
                  ]),
                  i("div", nv, [
                    (E(!0), w(Y, null, ye(N.files, (q) => {
                      var pe;
                      return E(), w("button", {
                        key: q.path,
                        class: ge(["entry-button", { "entry-button--active": ((pe = O.value) == null ? void 0 : pe.path) === q.path }]),
                        type: "button",
                        onClick: (Ne) => z(q.path)
                      }, [
                        i("div", ov, [
                          i("strong", null, d(et(q)), 1)
                        ]),
                        i("p", null, d(q.relativePath || q.path), 1),
                        i("div", rv, [
                          i("span", {
                            class: ge(["pill", Ee(q) === "docs" ? "pill--info" : "pill--success"])
                          }, d(lt(Ee(q))), 3),
                          i("span", iv, d(l(Yt)(q.modifiedAt)), 1)
                        ])
                      ], 10, sv);
                    }), 128))
                  ])
                ]))), 128))
              ])) : (E(), w("div", lv, d(l(t).label("当前筛选条件下没有匹配的核心记忆文件。", "No core memory files match the current filter.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("记忆编辑器", "Memory editor"),
            eyebrow: "Editor"
          }, {
            default: ie(() => [
              c.value ? (E(), w("div", av, d(l(t).label("正在读取记忆文件…", "Loading the memory file…")), 1)) : O.value ? (E(), w(Y, { key: 1 }, [
                i("div", cv, [
                  i("div", uv, [
                    i("strong", null, d(O.value.relativePath || O.value.path), 1),
                    i("p", null, d(O.value.path), 1),
                    i("p", null, d(l(t).label("修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。", "Save after editing. These files directly affect role behavior, persona, and long-term memory.")), 1)
                  ])
                ]),
                i("div", dv, [
                  i("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: j
                  }, d(l(t).label("重新读取", "Reload")), 1),
                  i("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: U
                  }, d(l(t).label("在全部文件中定位", "Reveal in all files")), 1),
                  i("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: I.value,
                    onClick: P[5] || (P[5] = (N) => K("memory"))
                  }, d(I.value ? l(t).label("保存中…", "Saving…") : l(t).label("保存记忆文件", "Save memory file")), 9, fv)
                ]),
                Xe(i("textarea", {
                  "onUpdate:modelValue": P[6] || (P[6] = (N) => W.value = N),
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [yt, W.value]
                ])
              ], 64)) : (E(), w("div", pv, d(l(t).label("先从左侧选择一个记忆文件，再在这里查看或编辑。", "Select a memory file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64))
    ]));
  }
});
async function _v() {
  const [e, t] = await Promise.all([
    xe("/api/ai/config"),
    xe("/api/ai/providers")
  ]);
  return { config: e, catalog: t };
}
function mv(e) {
  return Ze("/api/ai/provider", e);
}
function gv(e) {
  return _c(`/api/ai/provider/${encodeURIComponent(e)}`);
}
function vv(e) {
  return Ze("/api/ai/primary", { modelId: e });
}
function bv(e) {
  return Ze("/api/ai/fallbacks", { modelIds: e });
}
const yv = { class: "page-stack" }, Ev = { class: "page-header" }, wv = { class: "page-header__eyebrow" }, Nv = { class: "page-header__title" }, $v = { class: "page-header__description" }, Ov = {
  key: 0,
  class: "page-empty"
}, Sv = {
  key: 1,
  class: "page-empty page-empty--error"
}, kv = { class: "stat-grid" }, Cv = { class: "stat-card" }, xv = { class: "stat-card__label" }, Dv = { class: "stat-card" }, Tv = { class: "stat-card__label" }, Pv = { class: "stat-card" }, Rv = { class: "stat-card__label" }, Av = { class: "stat-card" }, Vv = { class: "stat-card__label" }, Iv = { class: "settings-grid settings-grid--wide" }, Mv = { class: "settings-field" }, Fv = { value: "" }, Lv = ["value"], jv = { class: "checkbox-grid" }, Uv = ["checked", "onChange"], Hv = { class: "page-actions" }, Gv = ["disabled"], Bv = { class: "page-two-column" }, Kv = { class: "catalog-list" }, Wv = ["onClick"], qv = { class: "catalog-list__title" }, zv = { class: "pill-row" }, Jv = { class: "page-stack" }, Qv = { class: "muted-copy" }, Yv = { class: "settings-grid settings-grid--wide" }, Xv = { class: "settings-field" }, Zv = { class: "settings-field" }, eb = { class: "settings-field" }, tb = ["value"], nb = { class: "settings-field" }, sb = { class: "settings-field settings-field--full" }, ob = { class: "page-actions" }, rb = ["disabled"], ib = ["disabled"], lb = { class: "provider-stack" }, ab = { class: "provider-card__header" }, cb = { class: "pill-row" }, ub = {
  key: 0,
  class: "pill pill--success"
}, db = {
  key: 1,
  class: "pill pill--muted"
}, fb = { class: "mini-list" }, pb = { class: "pill-row" }, hb = {
  key: 0,
  class: "pill pill--success"
}, _b = {
  key: 1,
  class: "pill pill--info"
}, mb = /* @__PURE__ */ Ve({
  __name: "ModelsPage",
  setup(e) {
    const t = ["openai-completions", "anthropic-messages", "openai-responses"], n = ft(), s = hn(), o = wt(() => _v()), r = /* @__PURE__ */ Z("__new__"), a = /* @__PURE__ */ Z(!1), c = /* @__PURE__ */ Z(!1), u = /* @__PURE__ */ Z(!1), p = /* @__PURE__ */ Z(""), h = /* @__PURE__ */ Z([]), f = /* @__PURE__ */ cn({
      mode: "new",
      title: "",
      canDelete: !1,
      name: "",
      baseUrl: "",
      apiType: "openai-completions",
      apiKey: "",
      apiKeyHelp: "",
      modelsText: ""
    }), _ = ne(() => {
      const T = o.data, b = (T == null ? void 0 : T.config.providers) || [], S = (T == null ? void 0 : T.catalog.presets) || [];
      return [
        { value: "__new__", label: n.label("新建空白 Provider", "Create blank provider"), kind: "new" },
        ...b.map((x) => ({
          value: x.name,
          label: `${x.name} · ${n.label("已配置", "configured")}`,
          kind: "custom"
        })),
        ...S.filter((x) => !b.some((M) => M.name === x.id)).map((x) => ({
          value: x.id,
          label: `${x.id} · ${n.label("预设", "preset")}`,
          kind: "preset"
        }))
      ];
    }), g = ne(() => {
      var b;
      return (((b = o.data) == null ? void 0 : b.config.providers) || []).flatMap((S) => S.models.map((x) => ({
        providerName: S.name,
        fullId: x.fullId,
        name: x.name,
        api: x.api
      })));
    });
    function k(T, b) {
      return T.map((S) => [
        S.id || "",
        S.name || S.id || "",
        S.contextWindow || "",
        S.maxTokens || "",
        S.api || b || ""
      ].join("|")).join(`
`);
    }
    function O(T, b) {
      return T.split(/\r?\n/).map((S) => S.trim()).filter(Boolean).map((S) => {
        const [x, M, A, Q, he] = S.split("|").map((Re) => Re.trim());
        return {
          id: x,
          name: M || x,
          contextWindow: dr(A),
          maxTokens: dr(Q),
          api: he || b || void 0
        };
      }).filter((S) => S.id);
    }
    function W(T) {
      var Re, Se;
      const b = o.data;
      if (!b) return;
      const S = b.config.providers, x = new Map(S.map((fe) => [fe.name, fe])), M = new Map((b.catalog.custom || []).map((fe) => [fe.name, fe])), A = new Map((b.catalog.presets || []).map((fe) => [fe.id, fe]));
      if (!T || T === "__new__") {
        f.mode = "new", f.title = n.label("新建 Provider", "Create provider"), f.canDelete = !1, f.name = "", f.baseUrl = "", f.apiType = "openai-completions", f.apiKey = "", f.apiKeyHelp = n.label("保存后写入 openclaw.json。", "Saved into openclaw.json after you confirm."), f.modelsText = "";
        return;
      }
      const Q = M.get(T);
      if (Q) {
        const fe = x.get(T);
        f.mode = "custom", f.title = n.label("编辑已配置 Provider", "Edit configured provider"), f.canDelete = !0, f.name = T, f.baseUrl = Q.baseUrl || "", f.apiType = Q.apiType || Q.api || ((Se = (Re = Q.models) == null ? void 0 : Re[0]) == null ? void 0 : Se.api) || "openai-completions", f.apiKey = "", f.apiKeyHelp = fe != null && fe.apiKeyMasked ? n.label(`留空会保留现有密钥：${fe.apiKeyMasked}`, `Leave blank to keep the current key: ${fe.apiKeyMasked}`) : n.label("填写后会覆盖当前密钥。", "A filled value replaces the current key."), f.modelsText = k(Q.models || [], f.apiType);
        return;
      }
      const he = A.get(T);
      if (he) {
        f.mode = "preset", f.title = n.label("从预设带入 Provider", "Bootstrap provider from preset"), f.canDelete = !1, f.name = he.id, f.baseUrl = he.defaultBaseUrl || "", f.apiType = he.apiType || "openai-completions", f.apiKey = "", f.apiKeyHelp = he.requiresApiKey ? n.label("保存前请填写 API Key。", "Fill in the API key before saving.") : n.label("这个 Provider 通常不需要 API Key。", "This provider usually does not require an API key."), f.modelsText = k(
          (he.suggestedModels || []).map((fe) => ({
            id: fe.id,
            name: fe.name,
            api: he.apiType
          })),
          he.apiType
        );
        return;
      }
      r.value = "__new__";
    }
    qe(
      () => o.data,
      (T) => {
        var S;
        if (!T) return;
        p.value = T.config.primaryModel || "", h.value = [...T.config.fallbackModels || []];
        const b = _.value;
        if (!b.some((x) => x.value === r.value)) {
          r.value = ((S = b[1]) == null ? void 0 : S.value) || "__new__";
          return;
        }
        W(r.value);
      },
      { immediate: !0 }
    ), qe(r, (T) => {
      W(T);
    });
    async function V() {
      a.value = !0;
      try {
        const T = await vv(p.value);
        if (!T.success)
          throw new Error(T.message);
        const b = await bv(h.value.filter((S) => S !== p.value));
        if (!b.success)
          throw new Error(b.message);
        s.pushToast({
          tone: "success",
          message: n.label("模型路由已更新。", "Model routing was updated.")
        }), await o.execute({ silent: !0 });
      } catch (T) {
        s.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        a.value = !1;
      }
    }
    async function I() {
      c.value = !0;
      try {
        const T = await mv({
          name: f.name.trim(),
          baseUrl: f.baseUrl.trim(),
          apiKey: f.apiKey.trim() || void 0,
          apiType: f.apiType,
          models: O(f.modelsText, f.apiType)
        });
        s.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), T.success && (r.value = f.name.trim() || "__new__", await o.execute({ silent: !0 }));
      } catch (T) {
        s.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        c.value = !1;
      }
    }
    async function L() {
      if (!(!f.canDelete || !f.name || !await s.confirm({
        title: n.label("删除 Provider", "Delete provider"),
        message: n.label(
          `确认删除 ${f.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
          `Delete ${f.name}? This also removes its model definitions, primary selection, and fallback references.`
        ),
        confirmLabel: n.label("确认删除", "Delete provider"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        u.value = !0;
        try {
          const b = await gv(f.name);
          s.pushToast({
            tone: b.success ? "success" : "error",
            message: b.message
          }), b.success && (r.value = "__new__", await o.execute({ silent: !0 }));
        } catch (b) {
          s.pushToast({
            tone: "error",
            message: b instanceof Error ? b.message : String(b)
          });
        } finally {
          u.value = !1;
        }
      }
    }
    function te(T) {
      if (h.value.includes(T)) {
        h.value = h.value.filter((b) => b !== T);
        return;
      }
      h.value = [...h.value, T];
    }
    function D(T, b) {
      var S;
      return T ? n.label(`预设入口：${T.name}`, `Preset source: ${T.name}`) : (S = b == null ? void 0 : b.models) != null && S.length ? n.label(`当前已录入 ${b.models.length} 个模型`, `${b.models.length} model entries are recorded now`) : n.label("保存后就会写入当前 openclaw.json。", "Saving writes the provider into the active openclaw.json.");
    }
    return (T, b) => (E(), w("div", yv, [
      i("header", Ev, [
        i("div", null, [
          i("p", wv, d(l(n).label("模型 / Second slice", "Models / Second slice")), 1),
          i("h2", Nv, d(l(n).label("模型策略", "Model strategy")), 1),
          i("p", $v, d(l(n).label("把 Provider、主模型和 fallback 链迁到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: b[0] || (b[0] = (S) => l(o).execute({ silent: !0 }))
        }, d(l(o).refreshing ? l(n).label("刷新中…", "Refreshing…") : l(n).label("刷新", "Refresh")), 1)
      ]),
      l(o).loading ? (E(), w("div", Ov, d(l(n).label("正在读取模型配置…", "Loading model configuration…")), 1)) : l(o).error ? (E(), w("div", Sv, d(l(o).error), 1)) : l(o).data ? (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(n).label("当前路由概览", "Current routing overview"),
          eyebrow: "Routing"
        }, {
          default: ie(() => [
            i("div", kv, [
              i("article", Cv, [
                i("p", xv, d(l(n).label("主模型", "Primary model")), 1),
                i("strong", null, d(l(o).data.config.primaryModel || l(n).label("待设置", "Not configured")), 1),
                i("span", null, d(l(n).label("默认执行路径", "Default execution route")), 1)
              ]),
              i("article", Dv, [
                i("p", Tv, d(l(n).label("Provider 数量", "Providers")), 1),
                i("strong", null, d(l(o).data.config.providers.length), 1),
                i("span", null, d(l(n).label("已经进入运行配置", "Already present in runtime config")), 1)
              ]),
              i("article", Pv, [
                i("p", Rv, d(l(n).label("备用模型", "Fallbacks")), 1),
                i("strong", null, d(l(o).data.config.fallbackModels.length), 1),
                i("span", null, d(l(n).label("主模型失败时按顺序尝试", "Tried in sequence when the primary route fails")), 1)
              ]),
              i("article", Av, [
                i("p", Vv, d(l(n).label("可选模型", "Available models")), 1),
                i("strong", null, d(g.value.length), 1),
                i("span", null, d(l(n).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(n).label("主模型与备用链路", "Primary and fallback chain"),
          eyebrow: "Routing editor"
        }, {
          default: ie(() => [
            i("div", Iv, [
              i("label", Mv, [
                i("span", null, d(l(n).label("主模型", "Primary model")), 1),
                i("small", null, d(l(n).label("Guard 默认先走这一条模型路径。", "Guard routes here first by default.")), 1),
                Xe(i("select", {
                  "onUpdate:modelValue": b[1] || (b[1] = (S) => p.value = S),
                  class: "settings-input"
                }, [
                  i("option", Fv, d(l(n).label("暂不设置", "Leave unset")), 1),
                  (E(!0), w(Y, null, ye(g.value, (S) => (E(), w("option", {
                    key: S.fullId,
                    value: S.fullId
                  }, d(`${S.providerName} / ${S.name}`), 9, Lv))), 128))
                ], 512), [
                  [gs, p.value]
                ])
              ])
            ]),
            i("div", jv, [
              (E(!0), w(Y, null, ye(g.value, (S) => (E(), w("label", {
                key: S.fullId,
                class: "checkbox-card"
              }, [
                i("input", {
                  checked: h.value.includes(S.fullId),
                  type: "checkbox",
                  onChange: (x) => te(S.fullId)
                }, null, 40, Uv),
                i("div", null, [
                  i("strong", null, d(`${S.providerName} / ${S.name}`), 1),
                  i("p", null, d(S.api || l(n).label("未声明 API 类型", "API type is not declared")), 1)
                ])
              ]))), 128))
            ]),
            i("div", Hv, [
              i("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: a.value,
                onClick: V
              }, d(a.value ? l(n).label("保存中…", "Saving…") : l(n).label("保存路由策略", "Save routing strategy")), 9, Gv)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        i("div", Bv, [
          X(ce, {
            title: l(n).label("Provider 选择器", "Provider picker"),
            eyebrow: "Provider"
          }, {
            default: ie(() => [
              i("div", Kv, [
                (E(!0), w(Y, null, ye(_.value, (S) => (E(), w("button", {
                  key: S.value,
                  class: ge(["catalog-list__item", { "catalog-list__item--active": r.value === S.value }]),
                  type: "button",
                  onClick: (x) => r.value = S.value
                }, [
                  i("div", qv, [
                    i("strong", null, d(S.label), 1)
                  ]),
                  i("div", zv, [
                    i("span", {
                      class: ge(["pill", S.kind === "custom" ? "pill--success" : S.kind === "preset" ? "pill--info" : "pill--muted"])
                    }, d(S.kind === "custom" ? l(n).label("已配置", "Configured") : S.kind === "preset" ? l(n).label("预设", "Preset") : l(n).label("空白", "Blank")), 3)
                  ])
                ], 10, Wv))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          i("div", Jv, [
            X(ce, {
              title: f.title,
              eyebrow: "Editor"
            }, {
              default: ie(() => [
                i("p", Qv, d(D(l(o).data.catalog.presets.find((S) => S.id === r.value), l(o).data.catalog.custom.find((S) => S.name === r.value))), 1),
                i("div", Yv, [
                  i("label", Xv, [
                    i("span", null, d(l(n).label("Provider 名称", "Provider name")), 1),
                    Xe(i("input", {
                      "onUpdate:modelValue": b[2] || (b[2] = (S) => f.name = S),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [yt, f.name]
                    ])
                  ]),
                  i("label", Zv, [
                    b[8] || (b[8] = i("span", null, "Base URL", -1)),
                    Xe(i("input", {
                      "onUpdate:modelValue": b[3] || (b[3] = (S) => f.baseUrl = S),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [yt, f.baseUrl]
                    ])
                  ]),
                  i("label", eb, [
                    i("span", null, d(l(n).label("默认 API 类型", "Default API type")), 1),
                    Xe(i("select", {
                      "onUpdate:modelValue": b[4] || (b[4] = (S) => f.apiType = S),
                      class: "settings-input"
                    }, [
                      (E(), w(Y, null, ye(t, (S) => i("option", {
                        key: S,
                        value: S
                      }, d(S), 9, tb)), 64))
                    ], 512), [
                      [gs, f.apiType]
                    ])
                  ]),
                  i("label", nb, [
                    b[9] || (b[9] = i("span", null, "API Key", -1)),
                    i("small", null, d(f.apiKeyHelp), 1),
                    Xe(i("input", {
                      "onUpdate:modelValue": b[5] || (b[5] = (S) => f.apiKey = S),
                      class: "settings-input",
                      type: "password"
                    }, null, 512), [
                      [yt, f.apiKey]
                    ])
                  ]),
                  i("label", sb, [
                    i("span", null, d(l(n).label("模型列表", "Model list")), 1),
                    i("small", null, d(l(n).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                    Xe(i("textarea", {
                      "onUpdate:modelValue": b[6] || (b[6] = (S) => f.modelsText = S),
                      class: "settings-textarea",
                      rows: "8"
                    }, null, 512), [
                      [yt, f.modelsText]
                    ])
                  ])
                ]),
                i("div", ob, [
                  i("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: c.value,
                    onClick: I
                  }, d(c.value ? l(n).label("保存中…", "Saving…") : l(n).label("保存 Provider", "Save provider")), 9, rb),
                  i("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: b[7] || (b[7] = (S) => W(r.value))
                  }, d(l(n).label("恢复当前内容", "Reset draft")), 1),
                  f.canDelete ? (E(), w("button", {
                    key: 0,
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: u.value,
                    onClick: L
                  }, d(u.value ? l(n).label("删除中…", "Deleting…") : l(n).label("删除 Provider", "Delete provider")), 9, ib)) : Ce("", !0)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            X(ce, {
              title: l(n).label("已配置 Provider", "Configured providers"),
              eyebrow: "Overview"
            }, {
              default: ie(() => [
                i("div", lb, [
                  (E(!0), w(Y, null, ye(l(o).data.config.providers, (S) => (E(), w("article", {
                    key: S.name,
                    class: "provider-card"
                  }, [
                    i("header", ab, [
                      i("div", null, [
                        i("strong", null, d(S.name), 1),
                        i("p", null, d(S.baseUrl), 1)
                      ]),
                      i("div", cb, [
                        S.hasApiKey ? (E(), w("span", ub, d(l(n).label("有密钥", "Has key")), 1)) : (E(), w("span", db, d(l(n).label("无密钥", "No key")), 1))
                      ])
                    ]),
                    i("div", fb, [
                      (E(!0), w(Y, null, ye(S.models, (x) => (E(), w("div", {
                        key: x.fullId,
                        class: "mini-list__item"
                      }, [
                        i("div", null, [
                          i("strong", null, d(x.name), 1),
                          i("p", null, d(x.fullId), 1)
                        ]),
                        i("div", pb, [
                          x.isPrimary ? (E(), w("span", hb, d(l(n).label("主模型", "Primary")), 1)) : Ce("", !0),
                          x.isFallback ? (E(), w("span", _b, d(l(n).label("备用", "Fallback")), 1)) : Ce("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]))), 128))
                ])
              ]),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : Ce("", !0)
    ]));
  }
}), gb = { class: "page-stack" }, vb = { class: "page-header" }, bb = { class: "page-header__eyebrow" }, yb = { class: "page-header__title" }, Eb = { class: "page-header__description" }, wb = {
  key: 0,
  class: "page-empty"
}, Nb = {
  key: 1,
  class: "page-empty page-empty--error"
}, $b = { class: "code-panel" }, Ob = { class: "code-panel" }, Sb = /* @__PURE__ */ Ve({
  __name: "OpenClawPage",
  setup(e) {
    const t = ft(), n = wt(() => _m());
    function s(o) {
      return JSON.stringify(o, null, 2);
    }
    return (o, r) => (E(), w("div", gb, [
      i("header", vb, [
        i("div", null, [
          i("p", bb, d(l(t).label("OpenClaw / First slice", "OpenClaw / First slice")), 1),
          i("h2", yb, d(l(t).label("OpenClaw 生命周期面板", "OpenClaw lifecycle panel")), 1),
          i("p", Eb, d(l(t).label("保留现有后端接口，只把读取、结构和高级区分层迁到 Vue 壳层。", "Keep the current backend API and move its reads, structure, and advanced layout into the Vue shell.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (a) => l(n).execute({ silent: !0 }))
        }, d(l(n).refreshing ? l(t).label("刷新中…", "Refreshing…") : l(t).label("刷新", "Refresh")), 1)
      ]),
      l(n).loading ? (E(), w("div", wb, d(l(t).label("正在加载 OpenClaw 状态…", "Loading the OpenClaw status…")), 1)) : l(n).error ? (E(), w("div", Nb, d(l(n).error), 1)) : l(n).data ? (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(t).label("状态快照", "Status snapshot"),
          eyebrow: "Status"
        }, {
          default: ie(() => [
            i("pre", $b, d(s(l(n).data.status)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(t).label("可选目标与回退目录", "Targets and rollback catalog"),
          eyebrow: "Targets"
        }, {
          default: ie(() => [
            i("pre", Ob, d(s(l(n).data.targets)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : Ce("", !0)
    ]));
  }
}), kb = { class: "page-stack" }, Cb = { class: "page-header" }, xb = { class: "page-header__eyebrow" }, Db = { class: "page-header__title" }, Tb = { class: "page-header__description" }, Pb = {
  key: 0,
  class: "page-empty"
}, Rb = {
  key: 1,
  class: "page-empty page-empty--error"
}, Ab = { class: "code-panel" }, Vb = { class: "code-panel" }, Ib = /* @__PURE__ */ Ve({
  __name: "OperationsPage",
  setup(e) {
    const t = ft(), n = wt(() => hm());
    function s(o) {
      return JSON.stringify(o, null, 2);
    }
    return (o, r) => (E(), w("div", kb, [
      i("header", Cb, [
        i("div", null, [
          i("p", xb, d(l(t).label("运维 / First slice", "Operations / First slice")), 1),
          i("h2", Db, d(l(t).label("运行态与后台服务", "Runtime and background services")), 1),
          i("p", Tb, d(l(t).label("先把状态读取、最小刷新和结构化信息展示模块化。后续再逐步迁移交互按钮。", "Modularize status reads, light refresh, and structured rendering first. Button interactions can follow in later slices.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (a) => l(n).execute({ silent: !0 }))
        }, d(l(n).refreshing ? l(t).label("刷新中…", "Refreshing…") : l(t).label("刷新", "Refresh")), 1)
      ]),
      l(n).loading ? (E(), w("div", Pb, d(l(t).label("正在加载运维状态…", "Loading operations status…")), 1)) : l(n).error ? (E(), w("div", Rb, d(l(n).error), 1)) : l(n).data ? (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(t).label("后台 Web 报告", "Background web report"),
          eyebrow: "Web report"
        }, {
          default: ie(() => [
            i("pre", Ab, d(s(l(n).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(t).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Services"
        }, {
          default: ie(() => [
            i("pre", Vb, d(s(l(n).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : Ce("", !0)
    ]));
  }
}), Mb = { class: "page-stack" }, Fb = { class: "page-header" }, Lb = { class: "page-header__eyebrow" }, jb = { class: "page-header__title" }, Ub = { class: "page-header__description" }, Hb = ["href"], Gb = { class: "muted-copy" }, Bb = /* @__PURE__ */ Ve({
  __name: "PlaceholderPage",
  props: {
    titleZh: {},
    titleEn: {},
    descriptionZh: {},
    descriptionEn: {},
    legacyHash: {}
  },
  setup(e) {
    const t = e, n = ft(), s = ne(() => n.label(t.titleZh, t.titleEn)), o = ne(() => n.label(t.descriptionZh, t.descriptionEn)), r = ne(() => n.label("打开当前正式控制台中的这一页", "Open this page in the current production console"));
    return (a, c) => (E(), w("div", Mb, [
      i("header", Fb, [
        i("div", null, [
          i("p", Lb, d(l(n).label("迁移排队中", "Queued for migration")), 1),
          i("h2", jb, d(s.value), 1),
          i("p", Ub, d(o.value), 1)
        ]),
        i("a", {
          class: "page-header__action page-header__action--link",
          href: `/${e.legacyHash}`,
          target: "_blank",
          rel: "noreferrer"
        }, d(r.value), 9, Hb)
      ]),
      X(ce, {
        title: l(n).label("当前阶段说明", "Current phase")
      }, {
        default: ie(() => [
          i("p", Gb, d(l(n).label("这一页已经纳入新的 Vue + Pinia + Router 骨架，但业务区块还没从旧版原生脚本完全迁过来。保留直接跳转旧控制台，是为了让迁移期间的实际操作不中断。", "This page is already part of the new Vue + Pinia + Router skeleton, but its business modules have not fully moved over from the native script yet. The legacy shortcut keeps real operations uninterrupted during the migration window.")), 1)
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
async function Kb() {
  const [e, t, n, s] = await Promise.all([
    xe("/api/recovery/overview"),
    xe("/api/recovery/points?limit=20"),
    xe("/api/git-sync/status"),
    xe("/api/git-sync/gitignore-preview?mode=smart")
  ]);
  return {
    overview: e,
    points: t.items || [],
    gitStatus: n,
    gitIgnorePreview: s
  };
}
function Wb(e) {
  return Ze("/api/recovery/save", { label: e || "" });
}
function qb(e) {
  return Ze("/api/recovery/restore", { commitSha: e });
}
function zb() {
  return Ze("/api/git-sync/init", {});
}
function Jb() {
  return Ze("/api/git-sync/check-private", {});
}
function Qb(e) {
  return Ze("/api/git-sync/commit", { message: "" });
}
function Yb() {
  return Ze("/api/git-sync/push", {});
}
function Xb(e) {
  return Ze("/api/git-sync/sync", { message: "" });
}
function Zb(e = "smart") {
  return Ze("/api/git-sync/gitignore-apply", { mode: e });
}
const ey = { class: "page-stack" }, ty = { class: "page-header" }, ny = { class: "page-header__eyebrow" }, sy = { class: "page-header__title" }, oy = { class: "page-header__description" }, ry = {
  key: 0,
  class: "page-empty"
}, iy = {
  key: 1,
  class: "page-empty page-empty--error"
}, ly = { class: "provider-card__header" }, ay = { class: "muted-copy" }, cy = { class: "stat-grid" }, uy = { class: "stat-card" }, dy = { class: "stat-card__label" }, fy = { class: "stat-card" }, py = { class: "stat-card__label" }, hy = { class: "stat-card" }, _y = { class: "stat-card__label" }, my = { class: "stat-card" }, gy = { class: "stat-card__label" }, vy = { class: "list-stack" }, by = { class: "action-row" }, yy = { class: "pill pill--info" }, Ey = { class: "action-row" }, wy = { class: "pill pill--success" }, Ny = { class: "settings-grid settings-grid--wide" }, $y = { class: "settings-field settings-field--full" }, Oy = { class: "page-actions" }, Sy = ["disabled"], ky = {
  key: 0,
  class: "provider-stack"
}, Cy = { class: "provider-card__header" }, xy = { class: "pill-row" }, Dy = { class: "pill pill--info" }, Ty = {
  key: 0,
  class: "muted-copy"
}, Py = { class: "page-actions" }, Ry = ["onClick"], Ay = ["disabled", "onClick"], Vy = {
  key: 1,
  class: "page-empty"
}, Iy = { class: "muted-copy" }, My = { class: "page-actions" }, Fy = {
  class: "inline-link",
  href: "/#recovery",
  target: "_blank",
  rel: "noreferrer"
}, Ly = { class: "stat-grid" }, jy = { class: "stat-card" }, Uy = { class: "stat-card__label" }, Hy = { class: "stat-card" }, Gy = { class: "stat-card__label" }, By = { class: "stat-card" }, Ky = { class: "stat-card__label" }, Wy = { class: "stat-card" }, qy = { class: "stat-card__label" }, zy = { class: "page-actions" }, Jy = ["disabled"], Qy = ["disabled"], Yy = ["disabled"], Xy = ["disabled"], Zy = ["disabled"], eE = {
  key: 0,
  class: "muted-copy"
}, tE = { class: "list-stack" }, nE = { class: "action-row" }, sE = { class: "action-row" }, oE = { class: "action-row" }, rE = { class: "code-panel" }, iE = { class: "muted-copy" }, lE = { class: "stat-grid" }, aE = { class: "stat-card" }, cE = { class: "stat-card__label" }, uE = { class: "stat-card" }, dE = { class: "stat-card__label" }, fE = { class: "code-panel" }, pE = { class: "page-actions" }, hE = ["disabled"], _E = /* @__PURE__ */ Ve({
  __name: "RecoveryPage",
  setup(e) {
    const t = ft(), n = hn(), s = /* @__PURE__ */ Z("center"), o = /* @__PURE__ */ Z(""), r = /* @__PURE__ */ Z(""), a = /* @__PURE__ */ Z(!1), c = /* @__PURE__ */ Z(""), u = /* @__PURE__ */ Z(""), p = wt(() => Kb()), h = ne(() => [
      { id: "center", label: t.label("恢复中心", "Recovery center") },
      { id: "advanced", label: t.label("高级 Git", "Advanced Git") }
    ]), f = ne(() => {
      var T;
      const D = (T = p.data) == null ? void 0 : T.overview;
      return D ? !D.repoReady || D.warnings.length > 0 ? "pill--warning" : D.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
    });
    function _() {
      var T;
      const D = (T = p.data) == null ? void 0 : T.overview;
      return D ? D.protected ? D.remoteReady ? t.label("已上云保护", "Cloud protection ready") : t.label("当前仅本机可恢复", "Local recovery only") : t.label("尚未建立保护", "Protection not set up") : t.label("读取中", "Loading");
    }
    function g(D) {
      const b = {
        "install-git": { zh: "先安装 Git", en: "Install Git first" },
        "setup-protection": { zh: "先完成保护设置", en: "Complete protection setup first" },
        "save-first-point": { zh: "创建首个恢复点", en: "Create the first recovery point" },
        "save-current-state": { zh: "先保存当前状态", en: "Save the current state first" },
        "review-restored-state": { zh: "检查刚恢复的状态", en: "Review the restored state" },
        "connect-private-remote": { zh: "连接私有仓库", en: "Connect a private remote" },
        "sync-latest-point": { zh: "把最新保护点同步到云端", en: "Sync the latest point to the cloud" },
        protected: { zh: "当前已经受保护", en: "Protection is already in place" }
      }[D || ""];
      return b ? t.label(b.zh, b.en) : D || "-";
    }
    function k(D) {
      return D.kind === "auto" ? t.label("自动保护", "Auto protection") : D.kind === "restore" ? t.label("已恢复到此状态", "Restore point") : t.label("手动保存", "Manual save");
    }
    async function O() {
      await p.execute({ silent: !!p.data });
    }
    async function W() {
      a.value = !0;
      try {
        const D = await Wb(o.value.trim() || void 0);
        n.pushToast({
          tone: D.success ? "success" : "error",
          message: D.message
        }), D.success && (o.value = "", await O());
      } catch (D) {
        n.pushToast({
          tone: "error",
          message: D instanceof Error ? D.message : String(D)
        });
      } finally {
        a.value = !1;
      }
    }
    async function V(D) {
      if (await n.confirm({
        title: t.label("恢复到这个状态", "Restore this state"),
        message: t.label(
          `确认回到 ${D.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
          `Restore ${D.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`
        ),
        confirmLabel: t.label("确认恢复", "Restore now"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      })) {
        c.value = D.commitSha;
        try {
          const b = await qb(D.commitSha);
          n.pushToast({
            tone: b.success ? "success" : "error",
            message: b.message
          }), await O();
        } catch (b) {
          n.pushToast({
            tone: "error",
            message: b instanceof Error ? b.message : String(b)
          });
        } finally {
          c.value = "";
        }
      }
    }
    async function I(D) {
      u.value = D, r.value = "";
      try {
        const T = D === "init" ? await zb() : D === "private" ? await Jb() : D === "checkpoint" ? await Qb() : D === "push" ? await Yb() : D === "sync" ? await Xb() : await Zb("smart");
        r.value = T.message, n.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), await O();
      } catch (T) {
        const b = T instanceof Error ? T.message : String(T);
        r.value = b, n.pushToast({
          tone: "error",
          message: b
        });
      } finally {
        u.value = "";
      }
    }
    function L(D) {
      s.value = D;
    }
    async function te(D) {
      var T;
      typeof navigator > "u" || !((T = navigator.clipboard) != null && T.writeText) || (await navigator.clipboard.writeText(D), n.pushToast({
        tone: "success",
        message: t.label("恢复点哈希已复制。", "Recovery point hash copied.")
      }));
    }
    return (D, T) => (E(), w("div", ey, [
      i("header", ty, [
        i("div", null, [
          i("p", ny, d(l(t).label("备份与恢复 / Second slice", "Backup & Recovery / Second slice")), 1),
          i("h2", sy, d(l(t).label("备份与恢复", "Backup & Recovery")), 1),
          i("p", oy, d(l(t).label("默认先讲“保存现在、回到某个状态、然后继续往前走”，把 Git 细节下沉到高级视图。", "Start with save now, go back to a protected state, then keep moving forward, while pushing raw Git details into the advanced view.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: O
        }, d(l(p).refreshing ? l(t).label("刷新中…", "Refreshing…") : l(t).label("刷新", "Refresh")), 1)
      ]),
      X(Gr, {
        items: h.value,
        "active-id": s.value,
        onChange: L
      }, null, 8, ["items", "active-id"]),
      l(p).loading ? (E(), w("div", ry, d(l(t).label("正在读取保护状态…", "Loading protection status…")), 1)) : l(p).error ? (E(), w("div", iy, d(l(p).error), 1)) : l(p).data ? (E(), w(Y, { key: 2 }, [
        s.value === "center" ? (E(), w(Y, { key: 0 }, [
          X(ce, {
            title: l(t).label("当前保护状态", "Current protection state"),
            eyebrow: "Overview"
          }, {
            default: ie(() => {
              var b;
              return [
                i("div", ly, [
                  i("p", ay, d(l(t).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
                  i("span", {
                    class: ge(["pill", f.value])
                  }, d(_()), 3)
                ]),
                i("div", cy, [
                  i("article", uy, [
                    i("p", dy, d(l(t).label("当前主线", "Current branch")), 1),
                    i("strong", null, d(l(p).data.overview.currentBranch || "-"), 1),
                    i("span", null, d(l(t).label("恢复后仍会继续写在这条主线上", "Future saves continue on the same main line after a restore")), 1)
                  ]),
                  i("article", fy, [
                    i("p", py, d(l(t).label("最近保存", "Last saved")), 1),
                    i("strong", null, d(l(Yt)(l(p).data.overview.lastSavedAt)), 1),
                    i("span", null, d(((b = l(p).data.overview.latestPoint) == null ? void 0 : b.title) || l(t).label("还没有恢复点", "No recovery point yet")), 1)
                  ]),
                  i("article", hy, [
                    i("p", _y, d(l(t).label("最近上云", "Last pushed")), 1),
                    i("strong", null, d(l(Yt)(l(p).data.overview.lastPushedAt)), 1),
                    i("span", null, d(l(p).data.overview.remoteReady ? l(t).label("云端保护已就绪", "Cloud protection is ready") : l(t).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
                  ]),
                  i("article", my, [
                    i("p", gy, d(l(t).label("下一步建议", "Recommended next step")), 1),
                    i("strong", null, d(g(l(p).data.overview.nextAction)), 1),
                    i("span", null, d(l(p).data.overview.unsyncedChanges ? l(t).label("当前存在未同步变化", "There are unsynced changes right now") : l(t).label("当前没有额外待处理变化", "No extra pending changes right now")), 1)
                  ])
                ])
              ];
            }),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("下一步建议", "Recommended next actions"),
            eyebrow: "Guide"
          }, {
            default: ie(() => [
              i("div", vy, [
                i("article", by, [
                  i("div", null, [
                    i("h3", null, d(l(t).label("先保住现在", "Protect the current state")), 1),
                    i("p", null, d(l(t).label("当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。", "Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.")), 1)
                  ]),
                  i("span", yy, d(g(l(p).data.overview.nextAction)), 1)
                ]),
                i("article", Ey, [
                  i("div", null, [
                    i("h3", null, d(l(t).label("回退不会删历史", "Restoring does not delete history")), 1),
                    i("p", null, d(l(t).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
                  ]),
                  i("span", wy, d(l(t).label("同一主线继续", "Continue on the same main line")), 1)
                ]),
                (E(!0), w(Y, null, ye(l(p).data.overview.warnings, (b) => (E(), w("article", {
                  key: b,
                  class: "risk-row"
                }, [
                  i("strong", null, d(l(t).label("注意事项", "Warning")), 1),
                  i("span", null, d(b), 1)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("立即保存", "Save now"),
            eyebrow: "Checkpoint"
          }, {
            default: ie(() => [
              i("div", Ny, [
                i("label", $y, [
                  i("span", null, d(l(t).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
                  i("small", null, d(l(t).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
                  Xe(i("input", {
                    "onUpdate:modelValue": T[0] || (T[0] = (b) => o.value = b),
                    class: "settings-input",
                    type: "text"
                  }, null, 512), [
                    [yt, o.value]
                  ])
                ])
              ]),
              i("div", Oy, [
                i("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: a.value,
                  onClick: W
                }, d(a.value ? l(t).label("保存中…", "Saving…") : l(t).label("保存当前状态", "Save current state")), 9, Sy)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("恢复点时间线", "Recovery point timeline"),
            eyebrow: "Timeline"
          }, {
            default: ie(() => [
              l(p).data.points.length ? (E(), w("div", ky, [
                (E(!0), w(Y, null, ye(l(p).data.points, (b) => (E(), w("article", {
                  key: b.id,
                  class: "provider-card"
                }, [
                  i("header", Cy, [
                    i("div", null, [
                      i("strong", null, d(b.title), 1),
                      i("p", null, d(l(Yt)(b.createdAt)) + " · " + d(l(ul)(b.commitSha)), 1)
                    ]),
                    i("div", xy, [
                      i("span", Dy, d(k(b)), 1),
                      i("span", {
                        class: ge(["pill", b.pushed ? "pill--success" : "pill--warning"])
                      }, d(b.pushed ? l(t).label("已上云", "Synced") : l(t).label("仅本机", "Local only")), 3)
                    ])
                  ]),
                  i("p", null, d(b.summary), 1),
                  b.sourceCommitSha ? (E(), w("p", Ty, d(l(t).label("来源节点：", "Source commit: ")) + d(l(ul)(b.sourceCommitSha)), 1)) : Ce("", !0),
                  i("div", Py, [
                    i("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (S) => te(b.commitSha)
                    }, d(l(t).label("复制节点", "Copy point")), 9, Ry),
                    i("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: !b.restorable || c.value === b.commitSha,
                      onClick: (S) => V(b)
                    }, d(c.value === b.commitSha ? l(t).label("恢复中…", "Restoring…") : l(t).label("回到这个状态", "Restore this state")), 9, Ay)
                  ])
                ]))), 128))
              ])) : (E(), w("div", Vy, d(l(t).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (E(), w(Y, { key: 1 }, [
          X(ce, {
            title: l(t).label("高级 Git 入口", "Advanced Git entry"),
            eyebrow: "Advanced"
          }, {
            default: ie(() => [
              i("p", Iy, d(l(t).label("这里先接入最常用的高级动作和状态读取；更复杂的远端绑定、OAuth 和专家级操作，当前阶段仍保留在正式控制台。", "This view already brings in the most common advanced actions and status reads. More complex remote binding, OAuth, and expert-level operations still stay in the production console for now.")), 1),
              i("div", My, [
                i("a", Fy, d(l(t).label("打开正式控制台中的高级 Git", "Open advanced Git in the production console")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("当前仓库状态", "Current repository status"),
            eyebrow: "Status"
          }, {
            default: ie(() => [
              i("div", Ly, [
                i("article", jy, [
                  i("p", Uy, d(l(t).label("仓库初始化", "Repository")), 1),
                  i("strong", null, d(l(p).data.gitStatus.repoInitialized ? l(t).label("已初始化", "Initialized") : l(t).label("未初始化", "Not initialized")), 1),
                  i("span", null, d(l(p).data.gitStatus.repoPath), 1)
                ]),
                i("article", Hy, [
                  i("p", Gy, d(l(t).label("远端仓库", "Remote")), 1),
                  i("strong", null, d(l(p).data.gitStatus.remoteName || "-"), 1),
                  i("span", null, d(l(p).data.gitStatus.remoteUrl || l(t).label("还没绑定远端", "No remote connected yet")), 1)
                ]),
                i("article", By, [
                  i("p", Ky, d(l(t).label("认证方式", "Auth mode")), 1),
                  i("strong", null, d(l(p).data.gitStatus.authMode || "-"), 1),
                  i("span", null, d(l(p).data.gitStatus.authConfigured ? l(t).label("当前已配置认证", "Authentication is configured") : l(t).label("当前还没配置认证", "Authentication is not configured yet")), 1)
                ]),
                i("article", Wy, [
                  i("p", qy, d(l(t).label("私有检查", "Private check")), 1),
                  i("strong", null, d(l(p).data.gitStatus.repoPrivate === !0 ? l(t).label("已通过", "Passed") : l(p).data.gitStatus.repoPrivate === !1 ? l(t).label("未通过", "Failed") : l(t).label("未检查", "Pending")), 1),
                  i("span", null, d(l(p).data.gitStatus.state.lastSyncAt ? `${l(t).label("最近同步", "Last sync")} ${l(Yt)(l(p).data.gitStatus.state.lastSyncAt)}` : l(t).label("还没有成功同步记录", "No successful sync record yet")), 1)
                ])
              ]),
              i("div", zy, [
                i("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: u.value === "init",
                  onClick: T[1] || (T[1] = (b) => I("init"))
                }, d(u.value === "init" ? l(t).label("初始化中…", "Initializing…") : l(t).label("初始化保护仓库", "Initialize protection repo")), 9, Jy),
                i("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: u.value === "private",
                  onClick: T[2] || (T[2] = (b) => I("private"))
                }, d(u.value === "private" ? l(t).label("检查中…", "Checking…") : l(t).label("检查私有仓库", "Check private remote")), 9, Qy),
                i("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: u.value === "checkpoint",
                  onClick: T[3] || (T[3] = (b) => I("checkpoint"))
                }, d(u.value === "checkpoint" ? l(t).label("提交中…", "Committing…") : l(t).label("创建本地 checkpoint", "Create local checkpoint")), 9, Yy),
                i("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: u.value === "push",
                  onClick: T[4] || (T[4] = (b) => I("push"))
                }, d(u.value === "push" ? l(t).label("推送中…", "Pushing…") : l(t).label("推送到云端", "Push to cloud")), 9, Xy),
                i("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: u.value === "sync",
                  onClick: T[5] || (T[5] = (b) => I("sync"))
                }, d(u.value === "sync" ? l(t).label("同步中…", "Syncing…") : l(t).label("提交并同步", "Commit and sync")), 9, Zy)
              ]),
              r.value ? (E(), w("p", eE, d(r.value), 1)) : Ce("", !0)
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("保护范围摘要", "Protection scope summary"),
            eyebrow: "Scope"
          }, {
            default: ie(() => [
              i("div", tE, [
                i("article", nE, [
                  i("div", null, [
                    i("h3", null, d(l(t).label("当前工作树变化", "Current worktree changes")), 1),
                    i("p", null, d(l(t).label("这些文件会进入根保护线；嵌套仓库会被单独标记，不会被误提交到根线。", "These files enter the root protection line, while nested repositories are marked separately so they are not committed into the root line by mistake.")), 1)
                  ]),
                  i("strong", null, d(l(p).data.gitStatus.changedFiles.length), 1)
                ]),
                i("article", sE, [
                  i("div", null, [
                    i("h3", null, d(l(t).label("可直接纳入保护", "Stageable in root line")), 1),
                    i("p", null, d(l(t).label("这些改动可以直接由 Guard 提交为恢复点。", "These changes can be committed directly by Guard as recovery points.")), 1)
                  ]),
                  i("strong", null, d(l(p).data.gitStatus.stageableChangedFiles.length), 1)
                ]),
                i("article", oE, [
                  i("div", null, [
                    i("h3", null, d(l(t).label("嵌套仓库", "Nested repositories")), 1),
                    i("p", null, d(l(t).label("这些目录更适合单独维护，Guard 不会在根保护线里直接接管。", "These directories are better maintained separately. Guard does not take them over inside the root protection line.")), 1)
                  ]),
                  i("strong", null, d(l(p).data.gitStatus.skippedEmbeddedRepos.length), 1)
                ])
              ]),
              i("pre", rE, d(JSON.stringify({
                changedFiles: l(p).data.gitStatus.changedFiles,
                stageableChangedFiles: l(p).data.gitStatus.stageableChangedFiles,
                skippedEmbeddedRepos: l(p).data.gitStatus.skippedEmbeddedRepos
              }, null, 2)), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label(".gitignore 建议", ".gitignore suggestions"),
            eyebrow: "Ignore rules"
          }, {
            default: ie(() => [
              i("p", iE, d(l(t).label("当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。", "When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.")), 1),
              i("div", lE, [
                i("article", aE, [
                  i("p", cE, d(l(t).label("嵌套仓库", "Embedded repos")), 1),
                  i("strong", null, d(l(p).data.gitIgnorePreview.embeddedRepos.length), 1),
                  i("span", null, d(l(t).label("需要单独维护的子仓库", "Child repositories that should be maintained separately")), 1)
                ]),
                i("article", uE, [
                  i("p", dE, d(l(t).label("待追加规则", "Missing rules")), 1),
                  i("strong", null, d(l(p).data.gitIgnorePreview.missingEntries.length), 1),
                  i("span", null, d(l(p).data.gitIgnorePreview.gitignorePath), 1)
                ])
              ]),
              i("pre", fE, d(l(p).data.gitIgnorePreview.appendBlock || l(t).label("当前没有需要追加的规则。", "There are no extra rules to append right now.")), 1),
              i("div", pE, [
                i("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: u.value === "gitignore",
                  onClick: T[6] || (T[6] = (b) => I("gitignore"))
                }, d(u.value === "gitignore" ? l(t).label("写入中…", "Applying…") : l(t).label("追加推荐规则", "Append recommended rules")), 9, hE)
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64))
      ], 64)) : Ce("", !0)
    ]));
  }
});
function mE() {
  return xe("/api/agents");
}
const gE = { class: "page-stack" }, vE = { class: "page-header" }, bE = { class: "page-header__eyebrow" }, yE = { class: "page-header__title" }, EE = { class: "page-header__description" }, wE = {
  key: 0,
  class: "page-empty"
}, NE = {
  key: 1,
  class: "page-empty page-empty--error"
}, $E = { class: "stat-grid" }, OE = { class: "stat-card" }, SE = { class: "stat-card__label" }, kE = { class: "stat-card" }, CE = { class: "stat-card__label" }, xE = { class: "stat-card" }, DE = { class: "stat-card__label" }, TE = { class: "stat-card" }, PE = { class: "stat-card__label" }, RE = {
  key: 0,
  class: "provider-stack"
}, AE = { class: "provider-card__header" }, VE = { class: "pill-row" }, IE = {
  key: 0,
  class: "pill pill--success"
}, ME = {
  key: 1,
  class: "pill pill--muted"
}, FE = { class: "mini-list" }, LE = { class: "mini-list__item mini-list__item--stack" }, jE = { class: "mini-list__item mini-list__item--stack" }, UE = { class: "pill-row" }, HE = { class: "page-actions" }, GE = ["onClick"], BE = {
  key: 1,
  class: "page-empty"
}, KE = /* @__PURE__ */ Ve({
  __name: "RolesPage",
  setup(e) {
    const t = ft(), n = hc(), s = Br(), o = wt(() => mE()), r = ne(() => {
      var f;
      return ((f = o.data) == null ? void 0 : f.agents) || [];
    }), a = ne(() => r.value.filter((f) => f.isDefault).length), c = ne(() => r.value.filter((f) => f.workspaceExists).length), u = ne(() => r.value.filter((f) => p(f)).length);
    function p(f) {
      return f.docStatus.soul && f.docStatus.user && f.docStatus.agents && f.docStatus.memory;
    }
    function h(f) {
      s.setMode("all"), s.setCurrentPath(f.resolvedWorkspace), s.setSelectedFilePath(""), s.setSelectedMemoryFilePath(""), n.push("/files");
    }
    return (f, _) => (E(), w("div", gE, [
      i("header", vE, [
        i("div", null, [
          i("p", bE, d(l(t).label("角色 / Third slice", "Roles / Third slice")), 1),
          i("h2", yE, d(l(t).label("角色目录", "Role catalog")), 1),
          i("p", EE, d(l(t).label("先把 Agent 目录、默认角色和工作区文档健康度迁进新壳层里，方便后续与文件视图和会话视图打通。", "Move the agent catalog, default role state, and workspace doc health into the new shell so it can connect naturally with Files and Sessions next.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: _[0] || (_[0] = (g) => l(o).execute({ silent: !0 }))
        }, d(l(o).refreshing ? l(t).label("刷新中…", "Refreshing…") : l(t).label("Refresh", "Refresh")), 1)
      ]),
      l(o).loading ? (E(), w("div", wE, d(l(t).label("正在读取角色目录…", "Loading the role catalog…")), 1)) : l(o).error ? (E(), w("div", NE, d(l(o).error), 1)) : (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(t).label("团队概览", "Team overview"),
          eyebrow: "Summary"
        }, {
          default: ie(() => [
            i("div", $E, [
              i("article", OE, [
                i("p", SE, d(l(t).label("角色总数", "Roles")), 1),
                i("strong", null, d(l(me)(r.value.length)), 1),
                i("span", null, d(l(t).label("当前已接入到 Guard 的角色目录", "Role entries currently discovered by Guard")), 1)
              ]),
              i("article", kE, [
                i("p", CE, d(l(t).label("默认角色", "Default role")), 1),
                i("strong", null, d(l(me)(a.value)), 1),
                i("span", null, d(a.value > 0 ? l(t).label("至少有一个默认角色", "At least one default role is configured") : l(t).label("还没有默认角色", "No default role is configured yet")), 1)
              ]),
              i("article", xE, [
                i("p", DE, d(l(t).label("工作区可用", "Workspaces ready")), 1),
                i("strong", null, d(l(me)(c.value)), 1),
                i("span", null, d(l(t).label("对应的工作区目录已经存在", "The mapped workspace directory already exists")), 1)
              ]),
              i("article", TE, [
                i("p", PE, d(l(t).label("关键文档齐全", "Core docs ready")), 1),
                i("strong", null, d(l(me)(u.value)), 1),
                _[1] || (_[1] = i("span", null, "SOUL / USER / AGENTS / MEMORY", -1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(t).label("角色成员", "Role entries"),
          eyebrow: "Catalog"
        }, {
          default: ie(() => [
            r.value.length ? (E(), w("div", RE, [
              (E(!0), w(Y, null, ye(r.value, (g) => (E(), w("article", {
                key: g.id,
                class: "provider-card"
              }, [
                i("header", AE, [
                  i("div", null, [
                    i("strong", null, d(g.name), 1),
                    i("p", null, d(g.resolvedWorkspace || g.workspace), 1)
                  ]),
                  i("div", VE, [
                    g.isDefault ? (E(), w("span", IE, d(l(t).label("默认", "Default")), 1)) : (E(), w("span", ME, d(g.id), 1)),
                    i("span", {
                      class: ge(["pill", g.workspaceExists ? "pill--success" : "pill--warning"])
                    }, d(g.workspaceExists ? l(t).label("工作区就绪", "Workspace ready") : l(t).label("工作区缺失", "Workspace missing")), 3)
                  ])
                ]),
                i("div", FE, [
                  i("div", LE, [
                    i("strong", null, d(l(t).label("模型路由", "Model route")), 1),
                    i("p", null, d(g.modelId || l(t).label("沿用默认模型", "Uses the default model route")), 1)
                  ]),
                  i("div", jE, [
                    i("strong", null, d(l(t).label("关键文档", "Core docs")), 1),
                    i("div", UE, [
                      i("span", {
                        class: ge(["pill", g.docStatus.soul ? "pill--success" : "pill--warning"])
                      }, "SOUL", 2),
                      i("span", {
                        class: ge(["pill", g.docStatus.user ? "pill--success" : "pill--warning"])
                      }, "USER", 2),
                      i("span", {
                        class: ge(["pill", g.docStatus.agents ? "pill--success" : "pill--warning"])
                      }, "AGENTS", 2),
                      i("span", {
                        class: ge(["pill", g.docStatus.memory ? "pill--success" : "pill--warning"])
                      }, "MEMORY", 2)
                    ])
                  ])
                ]),
                i("div", HE, [
                  i("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (k) => h(g)
                  }, d(l(t).label("打开对应工作区", "Open workspace")), 9, GE)
                ])
              ]))), 128))
            ])) : (E(), w("div", BE, d(l(t).label("还没有发现可用角色。请先检查 OpenClaw 配置和安装状态。", "No role entries were discovered yet. Check the OpenClaw configuration and installation state first.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64))
    ]));
  }
});
function WE(e, t = 100) {
  const n = new URLSearchParams({
    q: e,
    limit: String(t)
  });
  return xe(`/api/search?${n.toString()}`);
}
const qE = { class: "page-stack" }, zE = { class: "page-header" }, JE = { class: "page-header__eyebrow" }, QE = { class: "page-header__title" }, YE = { class: "page-header__description" }, XE = {
  class: "inline-link inline-link--primary",
  type: "submit"
}, ZE = {
  key: 0,
  class: "page-empty page-empty--error"
}, ew = { class: "stat-grid" }, tw = { class: "stat-card" }, nw = { class: "stat-card__label" }, sw = { class: "stat-card" }, ow = { class: "stat-card__label" }, rw = { class: "stat-card" }, iw = { class: "stat-card__label" }, lw = { class: "stat-card" }, aw = { class: "stat-card__label" }, cw = {
  key: 0,
  class: "page-empty"
}, uw = {
  key: 1,
  class: "provider-stack"
}, dw = { class: "provider-card__header" }, fw = { class: "pill-row" }, pw = { class: "page-actions" }, hw = ["onClick"], _w = {
  key: 2,
  class: "page-empty"
}, mw = /* @__PURE__ */ Ve({
  __name: "SearchPage",
  setup(e) {
    const t = ft(), n = hc(), s = hn(), o = Br(), r = /* @__PURE__ */ Z(o.searchQuery), a = /* @__PURE__ */ Z(!1), c = /* @__PURE__ */ Z(null), u = /* @__PURE__ */ Z(!1), p = /* @__PURE__ */ Z([]), h = ne(() => new Set(p.value.map((g) => g.path)).size);
    qe(r, (g) => {
      o.setSearchQuery(g);
    });
    async function f() {
      const g = r.value.trim();
      if (o.setSearchQuery(g), u.value = !0, c.value = null, !g) {
        p.value = [];
        return;
      }
      a.value = !0;
      try {
        const k = await WE(g, 100);
        p.value = k.results || [];
      } catch (k) {
        c.value = k instanceof Error ? k.message : String(k);
      } finally {
        a.value = !1;
      }
    }
    function _(g) {
      o.requestReveal(g.path), s.pushToast({
        tone: "info",
        message: t.label("已切到文件页并定位结果。", "Switched to Files and queued the selected result."),
        durationMs: 2200
      }), n.push("/files");
    }
    return $s(() => {
      o.searchQuery.trim() && f();
    }), (g, k) => (E(), w("div", qE, [
      i("header", zE, [
        i("div", null, [
          i("p", JE, d(l(t).label("搜索 / Third slice", "Search / Third slice")), 1),
          i("h2", QE, d(l(t).label("工作区搜索", "Workspace search")), 1),
          i("p", YE, d(l(t).label("先让搜索直接覆盖 Guard 管理的工作区与核心记忆，并且可以一跳回到文件页继续编辑。", "Start with search across Guard-managed workspaces and core memory, then jump straight back into Files to continue editing.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: f
        }, d(a.value ? l(t).label("搜索中…", "Searching…") : l(t).label("Search", "Search")), 1)
      ]),
      X(ce, {
        title: l(t).label("搜索条件", "Search query"),
        eyebrow: "Query"
      }, {
        default: ie(() => [
          i("form", {
            class: "search-form",
            onSubmit: Vr(f, ["prevent"])
          }, [
            Xe(i("input", {
              "onUpdate:modelValue": k[0] || (k[0] = (O) => r.value = O),
              class: "settings-input",
              type: "text",
              placeholder: "SOUL.md / qwen / fallback / cron"
            }, null, 512), [
              [yt, r.value]
            ]),
            i("button", XE, d(a.value ? l(t).label("搜索中…", "Searching…") : l(t).label("开始搜索", "Run search")), 1)
          ], 32)
        ]),
        _: 1
      }, 8, ["title"]),
      c.value ? (E(), w("div", ZE, d(c.value), 1)) : Ce("", !0),
      X(ce, {
        title: l(t).label("结果概览", "Result overview"),
        eyebrow: "Summary"
      }, {
        default: ie(() => [
          i("div", ew, [
            i("article", tw, [
              i("p", nw, d(l(t).label("命中条数", "Matches")), 1),
              i("strong", null, d(l(me)(p.value.length)), 1),
              i("span", null, d(l(t).label("当前查询返回的匹配行数", "Matched lines returned for the current query")), 1)
            ]),
            i("article", sw, [
              i("p", ow, d(l(t).label("涉及文件", "Files")), 1),
              i("strong", null, d(l(me)(h.value)), 1),
              i("span", null, d(l(t).label("至少命中一次的文件数量", "Files that matched at least once")), 1)
            ]),
            i("article", rw, [
              i("p", iw, d(l(t).label("当前查询", "Current query")), 1),
              i("strong", null, d(r.value.trim() || "-"), 1),
              i("span", null, d(r.value.trim() ? l(t).label("结果来自当前搜索词", "Results are based on the current query") : l(t).label("还没有输入搜索词", "No search query yet")), 1)
            ]),
            i("article", lw, [
              i("p", aw, d(l(t).label("打开方式", "Open flow")), 1),
              i("strong", null, d(l(t).label("一跳到文件页", "Jump into Files")), 1),
              i("span", null, d(l(t).label("搜索结果会按文件或核心记忆模式自动定位", "Results automatically open in file or core-memory mode")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      X(ce, {
        title: l(t).label("搜索结果", "Results"),
        eyebrow: "Results"
      }, {
        default: ie(() => [
          a.value ? (E(), w("div", cw, d(l(t).label("正在查找匹配结果…", "Searching for matching results…")), 1)) : p.value.length ? (E(), w("div", uw, [
            (E(!0), w(Y, null, ye(p.value, (O) => (E(), w("article", {
              key: `${O.path}:${O.line}:${O.preview}`,
              class: "provider-card"
            }, [
              i("header", dw, [
                i("div", null, [
                  i("strong", null, d(O.relativePath || O.path), 1),
                  i("p", null, d(`L${O.line}`), 1)
                ]),
                i("div", fw, [
                  i("span", {
                    class: ge(["pill", l(fr)(O.path) ? "pill--success" : "pill--info"])
                  }, d(l(fr)(O.path) ? l(t).label("核心记忆", "Core memory") : l(t).label("文件", "File")), 3)
                ])
              ]),
              i("p", null, d(O.preview), 1),
              i("div", pw, [
                i("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  onClick: (W) => _(O)
                }, d(l(t).label("在文件页打开", "Open in Files")), 9, hw)
              ])
            ]))), 128))
          ])) : (E(), w("div", _w, d(u.value ? l(t).label("当前搜索词没有命中任何文件。", "The current query did not match any files.") : l(t).label("输入关键词后开始搜索。", "Enter a query to start searching.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
function gw() {
  return xe("/api/audit");
}
function vw() {
  return xe("/api/profiles");
}
function bw(e) {
  return Ze("/api/profiles/apply", { profile: e });
}
function yw(e) {
  return xe(`/api/harden/steps?platform=${encodeURIComponent(e)}`);
}
const Ew = { class: "page-stack" }, ww = { class: "page-header" }, Nw = { class: "page-header__eyebrow" }, $w = { class: "page-header__title" }, Ow = { class: "page-header__description" }, Sw = {
  key: 0,
  class: "page-empty"
}, kw = {
  key: 1,
  class: "page-empty page-empty--error"
}, Cw = { class: "muted-copy" }, xw = { class: "stat-grid" }, Dw = { class: "stat-card" }, Tw = { class: "stat-card__label" }, Pw = { class: "stat-card" }, Rw = { class: "stat-card__label" }, Aw = { class: "stat-card" }, Vw = { class: "stat-card__label" }, Iw = { class: "provider-stack" }, Mw = { class: "provider-card__header" }, Fw = { class: "pill pill--muted" }, Lw = { class: "mini-list" }, jw = { class: "provider-card__header" }, Uw = {
  key: 0,
  class: "muted-copy"
}, Hw = {
  key: 0,
  class: "page-empty"
}, Gw = {
  key: 1,
  class: "page-empty page-empty--error"
}, Bw = { class: "muted-copy" }, Kw = { class: "provider-stack" }, Ww = { class: "provider-card__header" }, qw = { class: "muted-copy" }, zw = { class: "pill pill--info" }, Jw = { class: "settings-grid settings-grid--wide" }, Qw = { class: "settings-field" }, Yw = { class: "mini-list" }, Xw = { class: "settings-field" }, Zw = { class: "code-panel" }, e1 = { class: "settings-field" }, t1 = { class: "code-panel" }, n1 = { class: "page-actions" }, s1 = ["disabled", "onClick"], o1 = {
  key: 0,
  class: "page-empty"
}, r1 = {
  key: 1,
  class: "page-empty page-empty--error"
}, i1 = { class: "muted-copy" }, l1 = { class: "pill-row" }, a1 = ["href"], c1 = { class: "provider-stack" }, u1 = { class: "provider-card__header" }, d1 = { class: "muted-copy" }, f1 = { class: "code-panel" }, p1 = /* @__PURE__ */ Ve({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const V = navigator.platform.toLowerCase();
      return V.includes("win") ? "windows" : V.includes("mac") ? "macos" : "linux";
    }
    const n = ft(), s = hn(), o = /* @__PURE__ */ Z("audit"), r = /* @__PURE__ */ Z(t()), a = /* @__PURE__ */ Z(""), c = wt(() => gw(), null, { immediate: !1 }), u = wt(() => vw(), null, { immediate: !1 }), p = wt(() => yw(r.value), null, { immediate: !1 }), h = ne(() => [
      { id: "audit", label: n.label("安全检查", "Security checks") },
      { id: "profiles", label: n.label("权限模式", "Permission modes") },
      { id: "hardening", label: n.label("主机加固", "Host hardening") }
    ]), f = ne(() => {
      var I, L;
      const V = /* @__PURE__ */ new Map();
      for (const te of ((I = c.data) == null ? void 0 : I.results) || [])
        V.has(te.category) || V.set(te.category, []), (L = V.get(te.category)) == null || L.push(te);
      return Array.from(V.entries());
    });
    qe(
      o,
      (V) => {
        V === "audit" && !c.data && !c.loading && c.execute(), V === "profiles" && !u.data && !u.loading && u.execute(), V === "hardening" && !p.data && !p.loading && p.execute();
      },
      { immediate: !0 }
    ), qe(r, () => {
      o.value === "hardening" && p.execute({ silent: !!p.data });
    });
    function _(V) {
      return V === "pass" ? "pill--success" : V === "warn" ? "pill--warning" : "pill--danger";
    }
    function g(V) {
      return V === "pass" ? n.label("通过", "Pass") : V === "warn" ? n.label("警告", "Warning") : n.label("失败", "Fail");
    }
    async function k() {
      if (o.value === "audit") {
        await c.execute({ silent: !!c.data });
        return;
      }
      if (o.value === "profiles") {
        await u.execute({ silent: !!u.data });
        return;
      }
      await p.execute({ silent: !!p.data });
    }
    async function O(V) {
      a.value = V;
      try {
        const I = await bw(V);
        s.pushToast({
          tone: I.success ? "success" : "error",
          message: I.message
        });
      } catch (I) {
        s.pushToast({
          tone: "error",
          message: I instanceof Error ? I.message : String(I)
        });
      } finally {
        a.value = "";
      }
    }
    function W(V) {
      o.value = V;
    }
    return (V, I) => (E(), w("div", Ew, [
      i("header", ww, [
        i("div", null, [
          i("p", Nw, d(l(n).label("安全 / Second slice", "Security / Second slice")), 1),
          i("h2", $w, d(l(n).label("安全基线", "Security baseline")), 1),
          i("p", Ow, d(l(n).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页面更像决策面板而不是说明书。", "Split the long screen into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: k
        }, d(o.value === "audit" && l(c).refreshing || o.value === "profiles" && l(u).refreshing || o.value === "hardening" && l(p).refreshing ? l(n).label("刷新中…", "Refreshing…") : l(n).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      X(Gr, {
        items: h.value,
        "active-id": o.value,
        onChange: W
      }, null, 8, ["items", "active-id"]),
      o.value === "audit" ? (E(), w(Y, { key: 0 }, [
        l(c).loading ? (E(), w("div", Sw, d(l(n).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : l(c).error ? (E(), w("div", kw, d(l(c).error), 1)) : l(c).data ? (E(), w(Y, { key: 2 }, [
          X(ce, {
            title: l(n).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: ie(() => [
              i("p", Cw, d(l(n).label("这一部分更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              i("div", xw, [
                i("article", Dw, [
                  i("p", Tw, d(l(n).label("通过项", "Pass")), 1),
                  i("strong", null, d(l(c).data.summary.pass), 1),
                  i("span", null, d(l(n).label("当前无需处理", "No action needed right now")), 1)
                ]),
                i("article", Pw, [
                  i("p", Rw, d(l(n).label("警告项", "Warning")), 1),
                  i("strong", null, d(l(c).data.summary.warn), 1),
                  i("span", null, d(l(n).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                i("article", Aw, [
                  i("p", Vw, d(l(n).label("失败项", "Fail")), 1),
                  i("strong", null, d(l(c).data.summary.fail), 1),
                  i("span", null, d(l(n).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(n).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: ie(() => [
              i("div", Iw, [
                (E(!0), w(Y, null, ye(f.value, ([L, te]) => (E(), w("article", {
                  key: L,
                  class: "provider-card"
                }, [
                  i("header", Mw, [
                    i("strong", null, d(L), 1),
                    i("span", Fw, d(te.length), 1)
                  ]),
                  i("div", Lw, [
                    (E(!0), w(Y, null, ye(te, (D) => (E(), w("div", {
                      key: `${L}-${D.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      i("div", jw, [
                        i("strong", null, d(D.item), 1),
                        i("span", {
                          class: ge(["pill", _(D.status)])
                        }, d(g(D.status)), 3)
                      ]),
                      i("p", null, d(D.message), 1),
                      D.fix ? (E(), w("p", Uw, d(l(n).label("建议处理：", "Suggested fix: ")) + d(D.fix), 1)) : Ce("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : Ce("", !0)
      ], 64)) : o.value === "profiles" ? (E(), w(Y, { key: 1 }, [
        l(u).loading ? (E(), w("div", Hw, d(l(n).label("正在读取权限模式…", "Loading permission modes…")), 1)) : l(u).error ? (E(), w("div", Gw, d(l(u).error), 1)) : l(u).data ? (E(), w(Y, { key: 2 }, [
          X(ce, {
            title: l(n).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: ie(() => [
              i("p", Bw, d(l(n).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          i("div", Kw, [
            (E(!0), w(Y, null, ye(l(u).data, (L) => (E(), un(ce, {
              key: L.key,
              title: L.name,
              eyebrow: "Profile"
            }, {
              default: ie(() => {
                var te, D;
                return [
                  i("div", Ww, [
                    i("p", qw, d(L.description), 1),
                    i("span", zw, d(L.riskLevel || l(n).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  i("div", Jw, [
                    i("div", Qw, [
                      i("span", null, d(l(n).label("建议使用场景", "Recommended use cases")), 1),
                      i("div", Yw, [
                        (E(!0), w(Y, null, ye(L.recommendations || [], (T) => (E(), w("div", {
                          key: T,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          i("p", null, d(T), 1)
                        ]))), 128))
                      ])
                    ]),
                    i("div", Xw, [
                      i("span", null, d(l(n).label("允许规则", "Allow rules")), 1),
                      i("pre", Zw, d((((te = L.tools) == null ? void 0 : te.allow) || []).join(`
`) || "(none)"), 1)
                    ]),
                    i("div", e1, [
                      i("span", null, d(l(n).label("拒绝规则", "Deny rules")), 1),
                      i("pre", t1, d((((D = L.tools) == null ? void 0 : D.deny) || []).join(`
`) || "(none)"), 1)
                    ])
                  ]),
                  i("div", n1, [
                    i("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: a.value === L.key,
                      onClick: (T) => O(L.key)
                    }, d(a.value === L.key ? l(n).label("应用中…", "Applying…") : l(n).label("应用权限模式", "Apply permission mode")), 9, s1)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : Ce("", !0)
      ], 64)) : (E(), w(Y, { key: 2 }, [
        l(p).loading ? (E(), w("div", o1, d(l(n).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : l(p).error ? (E(), w("div", r1, d(l(p).error), 1)) : l(p).data ? (E(), w(Y, { key: 2 }, [
          X(ce, {
            title: l(n).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: ie(() => [
              i("p", i1, d(l(n).label("基础建议在所有平台上都一样：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              i("div", l1, [
                i("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: I[0] || (I[0] = (L) => r.value = "windows")
                }, "Windows", 2),
                i("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: I[1] || (I[1] = (L) => r.value = "macos")
                }, "macOS", 2),
                i("button", {
                  class: ge(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: I[2] || (I[2] = (L) => r.value = "linux")
                }, "Linux", 2),
                i("a", {
                  class: "inline-link",
                  href: `/api/harden/script?platform=${r.value}`
                }, d(l(n).label("下载脚本", "Download script")), 9, a1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          i("div", c1, [
            (E(!0), w(Y, null, ye(l(p).data.steps, (L) => (E(), un(ce, {
              key: L.id,
              title: L.title,
              eyebrow: "Step"
            }, {
              default: ie(() => [
                i("div", u1, [
                  i("p", d1, d(L.description), 1),
                  i("span", {
                    class: ge(["pill", L.optional ? "pill--muted" : "pill--warning"])
                  }, d(L.optional ? l(n).label("可选", "Optional") : l(n).label("建议", "Recommended")), 3)
                ]),
                i("pre", f1, d((L.commands || []).join(`
`) || l(n).label("当前没有附带命令。", "No commands are attached to this step.")), 1)
              ]),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : Ce("", !0)
      ], 64))
    ]));
  }
});
function h1() {
  return xe("/api/sessions");
}
const _1 = { class: "page-stack" }, m1 = { class: "page-header" }, g1 = { class: "page-header__eyebrow" }, v1 = { class: "page-header__title" }, b1 = { class: "page-header__description" }, y1 = {
  key: 0,
  class: "page-empty"
}, E1 = {
  key: 1,
  class: "page-empty page-empty--error"
}, w1 = { class: "stat-grid" }, N1 = { class: "stat-card" }, $1 = { class: "stat-card__label" }, O1 = { class: "stat-card" }, S1 = { class: "stat-card__label" }, k1 = { class: "stat-card" }, C1 = { class: "stat-card__label" }, x1 = { class: "stat-card" }, D1 = { class: "stat-card__label" }, T1 = { class: "stat-card" }, P1 = { class: "stat-card__label" }, R1 = { class: "stat-card" }, A1 = { class: "stat-card__label" }, V1 = { class: "stat-grid" }, I1 = { class: "stat-card" }, M1 = { class: "stat-card" }, F1 = { class: "stat-card__label" }, L1 = { class: "stat-card" }, j1 = { class: "stat-card__label" }, U1 = { class: "stat-card" }, H1 = { class: "stat-card__label" }, G1 = { class: "stat-card" }, B1 = { class: "stat-card__label" }, K1 = { class: "stat-card" }, W1 = { class: "stat-card__label" }, q1 = {
  key: 0,
  class: "provider-stack"
}, z1 = { class: "provider-card__header" }, J1 = { class: "pill-row" }, Q1 = { class: "pill pill--info" }, Y1 = { class: "mini-list" }, X1 = { class: "mini-list__item mini-list__item--stack" }, Z1 = { class: "mini-list__item mini-list__item--stack" }, eN = { class: "mini-list__item mini-list__item--stack" }, tN = { class: "mini-list__item mini-list__item--stack" }, nN = {
  key: 1,
  class: "page-empty"
}, sN = { class: "page-two-column" }, oN = {
  key: 0,
  class: "provider-stack"
}, rN = { class: "provider-card__header" }, iN = { class: "pill pill--info" }, lN = { class: "mini-list" }, aN = {
  key: 1,
  class: "page-empty"
}, cN = {
  key: 0,
  class: "provider-stack"
}, uN = { class: "provider-card__header" }, dN = { class: "pill pill--muted" }, fN = {
  key: 1,
  class: "page-empty"
}, pN = { class: "list-stack" }, hN = { class: "stat-grid" }, _N = { class: "stat-card" }, mN = { class: "stat-card__label" }, gN = { class: "stat-card" }, vN = { class: "stat-card__label" }, bN = { class: "stat-card" }, yN = { class: "stat-card__label" }, EN = { class: "stat-card" }, wN = { class: "stat-card__label" }, NN = /* @__PURE__ */ Ve({
  __name: "SessionsPage",
  setup(e) {
    const t = ft(), n = wt(() => h1()), s = ne(() => {
      var f;
      return (f = n.data) == null ? void 0 : f.snapshot;
    }), o = ne(() => {
      var f;
      return ((f = s.value) == null ? void 0 : f.sessions) || [];
    }), r = ne(() => {
      var f, _;
      return ((_ = (f = s.value) == null ? void 0 : f.sessionsMeta) == null ? void 0 : _.byAgent) || [];
    }), a = ne(() => o.value.filter((f) => !["ended", "finished", "closed"].includes(f.status))), c = ne(() => {
      var _;
      const f = (_ = n.data) == null ? void 0 : _.costSummary;
      return f ? Number.isFinite(f.totalEstimatedCost) && (!!f.pricingUnit || f.totalEstimatedCost > 0) : !1;
    });
    function u() {
      var _;
      const f = (_ = n.data) == null ? void 0 : _.costSummary;
      return !f || !c.value ? t.label("无法估算", "Unavailable") : cl(f.totalEstimatedCost, f.pricingUnit || "USD");
    }
    function p() {
      return c.value ? t.label("仅供本地观察，不代表官方账单", "For local observation only, not an official bill") : t.label("缺少可靠单价或用量数据，当前不显示金额", "Pricing or usage data is incomplete, so no amount is shown");
    }
    function h(f) {
      return ["ended", "finished", "closed"].includes(f.status) ? "pill--muted" : ["error", "failed", "aborted"].includes(f.status) ? "pill--danger" : "pill--success";
    }
    return (f, _) => (E(), w("div", _1, [
      i("header", m1, [
        i("div", null, [
          i("p", g1, d(l(t).label("会话 / Third slice", "Sessions / Third slice")), 1),
          i("h2", v1, d(l(t).label("会话观察台", "Session observer")), 1),
          i("p", b1, d(l(t).label("把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。", "Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.")), 1)
        ]),
        i("button", {
          class: "page-header__action",
          type: "button",
          onClick: _[0] || (_[0] = (g) => l(n).execute({ silent: !0 }))
        }, d(l(n).refreshing ? l(t).label("刷新中…", "Refreshing…") : l(t).label("Refresh", "Refresh")), 1)
      ]),
      l(n).loading ? (E(), w("div", y1, d(l(t).label("正在读取会话快照…", "Loading the session snapshot…")), 1)) : l(n).error ? (E(), w("div", E1, d(l(n).error), 1)) : l(n).data && s.value ? (E(), w(Y, { key: 2 }, [
        X(ce, {
          title: l(t).label("会话总览", "Session overview"),
          eyebrow: "Summary"
        }, {
          default: ie(() => {
            var g, k, O, W;
            return [
              i("div", w1, [
                i("article", N1, [
                  i("p", $1, d(l(t).label("会话总数", "Sessions")), 1),
                  i("strong", null, d(l(me)(((g = s.value.summary) == null ? void 0 : g.sessionCount) ?? o.value.length)), 1),
                  i("span", null, d(((k = s.value.summary) == null ? void 0 : k.defaultModel) || l(t).label("默认模型未知", "Default model is unknown")), 1)
                ]),
                i("article", O1, [
                  i("p", S1, d(l(t).label("活跃会话", "Active now")), 1),
                  i("strong", null, d(l(me)(a.value.length)), 1),
                  i("span", null, d(l(t).label("当前仍在运行或待执行的会话", "Sessions that are still running or waiting now")), 1)
                ]),
                i("article", k1, [
                  i("p", C1, d(l(t).label("累计 Tokens", "Total tokens")), 1),
                  i("strong", null, d(l(me)(l(n).data.costSummary.totalTokens)), 1),
                  i("span", null, d(l(t).label("基于共享运行时快照统计", "Counted from the shared runtime snapshot")), 1)
                ]),
                i("article", x1, [
                  i("p", D1, d(l(t).label("用量估算", "Usage estimate")), 1),
                  i("strong", null, d(u()), 1),
                  i("span", null, d(p()), 1)
                ]),
                i("article", T1, [
                  i("p", P1, d(l(t).label("会话索引路径", "Session paths")), 1),
                  i("strong", null, d(l(me)(((O = s.value.sessionsMeta) == null ? void 0 : O.paths.length) || 0)), 1),
                  i("span", null, d(l(t).label("被 Guard 识别到的会话目录", "Session directories detected by Guard")), 1)
                ]),
                i("article", R1, [
                  i("p", A1, d(l(t).label("待处理系统事件", "Queued events")), 1),
                  i("strong", null, d(l(me)(((W = s.value.summary) == null ? void 0 : W.queuedSystemEvents) || 0)), 1),
                  i("span", null, d(l(t).label("等待处理的系统级事件", "System events that are still waiting")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(t).label("运行环境", "Runtime context"),
          eyebrow: "Runtime"
        }, {
          default: ie(() => {
            var g, k, O, W, V, I, L, te, D, T, b, S, x, M, A, Q, he, Re, Se, fe, ue, se;
            return [
              i("div", V1, [
                i("article", I1, [
                  _[1] || (_[1] = i("p", { class: "stat-card__label" }, "OS", -1)),
                  i("strong", null, d(((g = s.value.os) == null ? void 0 : g.label) || "-"), 1),
                  i("span", null, d([(k = s.value.os) == null ? void 0 : k.platform, (O = s.value.os) == null ? void 0 : O.arch, (W = s.value.os) == null ? void 0 : W.release].filter(Boolean).join(" / ") || l(t).label("系统信息暂缺", "OS details are missing")), 1)
                ]),
                i("article", M1, [
                  i("p", F1, d(l(t).label("记忆检索", "Memory search")), 1),
                  i("strong", null, d(((V = s.value.memory) == null ? void 0 : V.provider) || ((I = s.value.memory) == null ? void 0 : I.backend) || "-"), 1),
                  i("span", null, d([(L = s.value.memory) == null ? void 0 : L.searchMode, ((te = s.value.memory) == null ? void 0 : te.dbPath) || ((D = s.value.memory) == null ? void 0 : D.workspaceDir)].filter(Boolean).join(" / ") || l(t).label("记忆运行态信息暂缺", "Memory runtime details are missing")), 1)
                ]),
                i("article", L1, [
                  i("p", j1, d(l(t).label("Gateway 服务", "Gateway service")), 1),
                  i("strong", null, d(((T = s.value.gatewayService) == null ? void 0 : T.label) || "-"), 1),
                  i("span", null, d([(b = s.value.gatewayService) == null ? void 0 : b.loadedText, (S = s.value.gatewayService) == null ? void 0 : S.runtimeShort].filter(Boolean).join(" / ") || l(t).label("Gateway 服务信息暂缺", "Gateway service details are missing")), 1)
                ]),
                i("article", U1, [
                  i("p", H1, d(l(t).label("Node 服务", "Node service")), 1),
                  i("strong", null, d(((x = s.value.nodeService) == null ? void 0 : x.label) || "-"), 1),
                  i("span", null, d([(M = s.value.nodeService) == null ? void 0 : M.loadedText, (A = s.value.nodeService) == null ? void 0 : A.runtimeShort].filter(Boolean).join(" / ") || l(t).label("Node 服务信息暂缺", "Node service details are missing")), 1)
                ]),
                i("article", G1, [
                  i("p", B1, d(l(t).label("更新轨道", "Update track")), 1),
                  i("strong", null, d(((Q = s.value.update) == null ? void 0 : Q.channel) || ((he = s.value.update) == null ? void 0 : he.installKind) || "-"), 1),
                  i("span", null, d([(Re = s.value.update) == null ? void 0 : Re.packageManager, (Se = s.value.update) == null ? void 0 : Se.latestVersion].filter(Boolean).join(" / ") || l(t).label("更新信息暂缺", "Update details are missing")), 1)
                ]),
                i("article", K1, [
                  i("p", W1, d(l(t).label("安全审计", "Security audit")), 1),
                  i("strong", null, d(l(me)(((fe = s.value.securityAudit) == null ? void 0 : fe.findingsCount) || 0)), 1),
                  i("span", null, d(`${l(me)(((ue = s.value.securityAudit) == null ? void 0 : ue.critical) || 0)} critical / ${l(me)(((se = s.value.securityAudit) == null ? void 0 : se.warn) || 0)} warn`), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(ce, {
          title: l(t).label("当前会话", "Current sessions"),
          eyebrow: "Sessions"
        }, {
          default: ie(() => [
            o.value.length ? (E(), w("div", q1, [
              (E(!0), w(Y, null, ye(o.value, (g) => (E(), w("article", {
                key: g.id,
                class: "provider-card"
              }, [
                i("header", z1, [
                  i("div", null, [
                    i("strong", null, d(g.id), 1),
                    i("p", null, d(`${g.agentId} / ${g.modelId}`), 1)
                  ]),
                  i("div", J1, [
                    i("span", {
                      class: ge(["pill", h(g)])
                    }, d(g.status || "-"), 3),
                    i("span", Q1, d(g.channel || "-"), 1)
                  ])
                ]),
                i("div", Y1, [
                  i("div", X1, [
                    i("strong", null, d(l(t).label("时间轴", "Timeline")), 1),
                    i("p", null, d(l(t).label("开始：", "Started: ")) + d(l(Yt)(g.startedAt)), 1),
                    i("p", null, d(l(t).label("更新：", "Updated: ")) + d(l(Yt)(g.updatedAt)), 1)
                  ]),
                  i("div", Z1, [
                    i("strong", null, d(l(t).label("Token 使用", "Token usage")), 1),
                    i("p", null, d(`${l(me)(g.usage.totalTokens)} tokens`), 1),
                    i("p", null, d(`${l(t).label("输入", "Input")} ${l(me)(g.usage.inputTokens)} / ${l(t).label("输出", "Output")} ${l(me)(g.usage.outputTokens)}`), 1)
                  ]),
                  i("div", eN, [
                    i("strong", null, d(l(t).label("上下文窗口", "Context window")), 1),
                    i("p", null, d(g.contextTokens != null ? l(me)(g.contextTokens) : "-"), 1),
                    i("p", null, d(l(t).label("剩余：", "Remaining: ")) + d(g.remainingTokens != null ? l(me)(g.remainingTokens) : "-"), 1)
                  ]),
                  i("div", tN, [
                    i("strong", null, d(l(t).label("用量估算", "Usage estimate")), 1),
                    i("p", null, d(l(cl)(g.estimatedCost, l(n).data.costSummary.pricingUnit || "USD")), 1),
                    i("p", null, d(l(t).label("上下文占比：", "Context used: ")) + d(l(__)(g.percentUsed)), 1)
                  ])
                ])
              ]))), 128))
            ])) : (E(), w("div", nN, d(l(t).label("当前还没有会话记录。", "There are no session records right now.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        i("div", sN, [
          X(ce, {
            title: l(t).label("按角色分布", "By role"),
            eyebrow: "Roles"
          }, {
            default: ie(() => [
              r.value.length ? (E(), w("div", oN, [
                (E(!0), w(Y, null, ye(r.value, (g) => (E(), w("article", {
                  key: g.agentId,
                  class: "provider-card"
                }, [
                  i("header", rN, [
                    i("div", null, [
                      i("strong", null, d(g.agentId), 1),
                      i("p", null, d(g.path || l(t).label("没有返回路径信息", "No path information returned")), 1)
                    ]),
                    i("span", iN, d(l(me)(g.count)), 1)
                  ]),
                  i("div", lN, [
                    (E(!0), w(Y, null, ye(g.recent.slice(0, 3), (k) => (E(), w("div", {
                      key: k.id,
                      class: "mini-list__item"
                    }, [
                      i("div", null, [
                        i("strong", null, d(k.modelId), 1),
                        i("p", null, d(k.channel), 1)
                      ]),
                      i("span", {
                        class: ge(["pill", h(k)])
                      }, d(k.status), 3)
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (E(), w("div", aN, d(l(t).label("当前没有按角色聚合的会话数据。", "No per-role session summary is available right now.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(ce, {
            title: l(t).label("最近活动", "Recent activity"),
            eyebrow: "Timeline"
          }, {
            default: ie(() => [
              l(n).data.recentActivity.length ? (E(), w("div", cN, [
                (E(!0), w(Y, null, ye(l(n).data.recentActivity.slice(0, 10), (g) => (E(), w("article", {
                  key: g.id,
                  class: "provider-card"
                }, [
                  i("header", uN, [
                    i("div", null, [
                      i("strong", null, d(g.title), 1),
                      i("p", null, d(l(Yt)(g.createdAt)), 1)
                    ]),
                    i("span", dN, d(g.type), 1)
                  ]),
                  i("p", null, d(g.description), 1)
                ]))), 128))
              ])) : (E(), w("div", fN, d(l(t).label("当前还没有最近活动记录。", "There is no recent activity yet.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        s.value.warnings.length ? (E(), un(ce, {
          key: 0,
          title: l(t).label("运行提醒", "Runtime warnings"),
          eyebrow: "Warning"
        }, {
          default: ie(() => [
            i("div", pN, [
              (E(!0), w(Y, null, ye(s.value.warnings, (g) => (E(), w("article", {
                key: g,
                class: "risk-row"
              }, [
                i("strong", null, d(l(t).label("注意事项", "Warning")), 1),
                i("span", null, d(g), 1)
              ]))), 128))
            ])
          ]),
          _: 1
        }, 8, ["title"])) : Ce("", !0),
        s.value.memory ? (E(), un(ce, {
          key: 1,
          title: l(t).label("记忆运行态补充", "Memory runtime details"),
          eyebrow: "Memory"
        }, {
          default: ie(() => [
            i("div", hN, [
              i("article", _N, [
                i("p", mN, d(l(t).label("记忆文件", "Memory files")), 1),
                i("strong", null, d(l(me)(s.value.memory.files)), 1),
                i("span", null, d(l(t).label("当前已接入的记忆文件数量", "Managed memory files detected now")), 1)
              ]),
              i("article", gN, [
                i("p", vN, d(l(t).label("记忆分块", "Chunks")), 1),
                i("strong", null, d(l(me)(s.value.memory.chunks)), 1),
                i("span", null, d(l(t).label("用于搜索的记忆分块数", "Memory chunks available for search")), 1)
              ]),
              i("article", bN, [
                i("p", yN, d(l(t).label("索引状态", "Index state")), 1),
                i("strong", null, d(s.value.memory.dirty === !0 ? l(t).label("待刷新", "Dirty") : s.value.memory.dirty === !1 ? l(t).label("已同步", "Clean") : "-"), 1),
                i("span", null, d(s.value.memory.dbPath || s.value.memory.workspaceDir || l(t).label("没有返回索引路径", "No index path returned")), 1)
              ]),
              i("article", EN, [
                i("p", wN, d(l(t).label("索引目录", "Index location")), 1),
                i("strong", null, d(s.value.memory.dbPath ? l(t).label("已返回路径", "Path returned") : l(t).label("暂无路径", "No path")), 1),
                i("span", null, d(s.value.memory.dbPath || s.value.memory.workspaceDir || l(t).label("没有返回目录信息", "No directory information returned")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"])) : Ce("", !0)
      ], 64)) : Ce("", !0)
    ]));
  }
});
function Lo(e, t, n, s, o, r) {
  return {
    path: e,
    component: Bb,
    props: {
      titleZh: t,
      titleEn: n,
      descriptionZh: s,
      descriptionEn: o,
      legacyHash: r
    }
  };
}
const $N = Gh({
  history: vh(),
  routes: [
    { path: "/", name: "overview", component: Am },
    { path: "/operations", name: "operations", component: Ib },
    { path: "/openclaw", name: "openclaw", component: Sb },
    { path: "/channels", name: "channels", component: fm },
    { path: "/models", name: "models", component: mb },
    { path: "/security", name: "security", component: p1 },
    { path: "/recovery", name: "recovery", component: _E },
    { path: "/roles", name: "roles", component: KE },
    { path: "/files", name: "files", component: hv },
    { path: "/search", name: "search", component: mw },
    { path: "/sessions", name: "sessions", component: NN },
    Lo(
      "/logs",
      "日志",
      "Logs",
      "继续保留原有日志与排障能力，下一批会把分页、筛选和详情读取迁进新壳层。",
      "Keep the current logging and troubleshooting flow for now. Pagination, filtering, and detail reads move into the new shell in a later slice.",
      "#logs"
    ),
    Lo(
      "/notifications",
      "通知",
      "Notifications",
      "提醒和时间线会在后续切片里继续迁移，目前仍可通过正式控制台完成完整查看。",
      "Alerts and timeline views move over in a later slice. The production console still provides the full experience for now.",
      "#notifications"
    ),
    Lo(
      "/cron",
      "Cron",
      "Cron",
      "自动化任务编辑器还保留在正式控制台里，等工作区与排查视图稳定后再迁移。",
      "The automation editor remains in the production console for now and moves later once the workspace and troubleshooting views are stable.",
      "#cron"
    ),
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
$f(h_).use(ep()).use($N).mount("#guard-next-app");
