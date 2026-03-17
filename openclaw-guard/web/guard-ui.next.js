/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Bt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const be = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Rn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Ie = () => {
}, ol = () => !1, ms = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ws = (e) => e.startsWith("onUpdate:"), De = Object.assign, ar = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ac = Object.prototype.hasOwnProperty, pe = (e, t) => ac.call(e, t), q = Array.isArray, vn = (e) => _s(e) === "[object Map]", Gn = (e) => _s(e) === "[object Set]", Ur = (e) => _s(e) === "[object Date]", ee = (e) => typeof e == "function", Oe = (e) => typeof e == "string", pt = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", cr = (e) => (de(e) || ee(e)) && ee(e.then) && ee(e.catch), rl = Object.prototype.toString, _s = (e) => rl.call(e), ur = (e) => _s(e).slice(8, -1), il = (e) => _s(e) === "[object Object]", lo = (e) => Oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ss = /* @__PURE__ */ Bt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), cc = /* @__PURE__ */ Bt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), ao = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, uc = /-\w/g, Xe = ao(
  (e) => e.replace(uc, (t) => t.slice(1).toUpperCase())
), dc = /\B([A-Z])/g, nn = ao(
  (e) => e.replace(dc, "-$1").toLowerCase()
), co = ao((e) => e.charAt(0).toUpperCase() + e.slice(1)), pn = ao(
  (e) => e ? `on${co(e)}` : ""
), kt = (e, t) => !Object.is(e, t), Pn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ks = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, uo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Hr;
const vs = () => Hr || (Hr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function dr(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = Oe(s) ? gc(s) : dr(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (Oe(e) || de(e))
    return e;
}
const fc = /;(?![^(]*\))/g, pc = /:([^]+)/, hc = /\/\*[^]*?\*\//g;
function gc(e) {
  const t = {};
  return e.replace(hc, "").split(fc).forEach((n) => {
    if (n) {
      const s = n.split(pc);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function $e(e) {
  let t = "";
  if (Oe(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const s = $e(e[n]);
      s && (t += s + " ");
    }
  else if (de(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const mc = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", _c = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", vc = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", bc = /* @__PURE__ */ Bt(mc), yc = /* @__PURE__ */ Bt(_c), Ec = /* @__PURE__ */ Bt(vc), wc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Nc = /* @__PURE__ */ Bt(wc);
function ll(e) {
  return !!e || e === "";
}
function Oc(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = sn(e[s], t[s]);
  return n;
}
function sn(e, t) {
  if (e === t) return !0;
  let n = Ur(e), s = Ur(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = pt(e), s = pt(t), n || s)
    return e === t;
  if (n = q(e), s = q(t), n || s)
    return n && s ? Oc(e, t) : !1;
  if (n = de(e), s = de(t), n || s) {
    if (!n || !s)
      return !1;
    const o = Object.keys(e).length, r = Object.keys(t).length;
    if (o !== r)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !sn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function fr(e, t) {
  return e.findIndex((n) => sn(n, t));
}
const al = (e) => !!(e && e.__v_isRef === !0), g = (e) => Oe(e) ? e : e == null ? "" : q(e) || de(e) && (e.toString === rl || !ee(e.toString)) ? al(e) ? g(e.value) : JSON.stringify(e, cl, 2) : String(e), cl = (e, t) => al(t) ? cl(e, t.value) : vn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, o], r) => (n[yo(s, r) + " =>"] = o, n),
    {}
  )
} : Gn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => yo(n))
} : pt(t) ? yo(t) : de(t) && !q(t) && !il(t) ? String(t) : t, yo = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    pt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function tt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Fe;
class ul {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Fe, !t && Fe && (this.index = (Fe.scopes || (Fe.scopes = [])).push(
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
      const n = Fe;
      try {
        return Fe = this, t();
      } finally {
        Fe = n;
      }
    } else process.env.NODE_ENV !== "production" && tt("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Fe, Fe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Fe = this.prevScope, this.prevScope = void 0);
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
function dl(e) {
  return new ul(e);
}
function fl() {
  return Fe;
}
function Sc(e, t = !1) {
  Fe ? Fe.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && tt(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let ve;
const Eo = /* @__PURE__ */ new WeakSet();
class pl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Fe && Fe.active && Fe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Eo.has(this) && (Eo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || gl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Br(this), ml(this);
    const t = ve, n = dt;
    ve = this, dt = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && ve !== this && tt(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), _l(this), ve = t, dt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        gr(t);
      this.deps = this.depsTail = void 0, Br(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Eo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Io(this) && this.run();
  }
  get dirty() {
    return Io(this);
  }
}
let hl = 0, os, rs;
function gl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = rs, rs = e;
    return;
  }
  e.next = os, os = e;
}
function pr() {
  hl++;
}
function hr() {
  if (--hl > 0)
    return;
  if (rs) {
    let t = rs;
    for (rs = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; os; ) {
    let t = os;
    for (os = void 0; t; ) {
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
function ml(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function _l(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), gr(s), kc(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  e.deps = t, e.depsTail = n;
}
function Io(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (vl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function vl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === cs) || (e.globalVersion = cs, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Io(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ve, s = dt;
  ve = e, dt = !0;
  try {
    ml(e);
    const o = e.fn(e._value);
    (t.version === 0 || kt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ve = n, dt = s, _l(e), e.flags &= -3;
  }
}
function gr(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: o } = e;
  if (s && (s.nextSub = o, e.prevSub = void 0), o && (o.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = o), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      gr(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function kc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let dt = !0;
const bl = [];
function ht() {
  bl.push(dt), dt = !1;
}
function gt() {
  const e = bl.pop();
  dt = e === void 0 ? !0 : e;
}
function Br(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ve;
    ve = void 0;
    try {
      t();
    } finally {
      ve = n;
    }
  }
}
let cs = 0;
class $c {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class mr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!ve || !dt || ve === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ve)
      n = this.activeLink = new $c(ve, this), ve.deps ? (n.prevDep = ve.depsTail, ve.depsTail.nextDep = n, ve.depsTail = n) : ve.deps = ve.depsTail = n, yl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ve.depsTail, n.nextDep = void 0, ve.depsTail.nextDep = n, ve.depsTail = n, ve.deps === n && (ve.deps = s);
    }
    return process.env.NODE_ENV !== "production" && ve.onTrack && ve.onTrack(
      De(
        {
          effect: ve
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, cs++, this.notify(t);
  }
  notify(t) {
    pr();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            De(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      hr();
    }
  }
}
function yl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        yl(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const zs = /* @__PURE__ */ new WeakMap(), bn = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Mo = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), us = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Re(e, t, n) {
  if (dt && ve) {
    let s = zs.get(e);
    s || zs.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new mr()), o.map = s, o.key = n), process.env.NODE_ENV !== "production" ? o.track({
      target: e,
      type: t,
      key: n
    }) : o.track();
  }
}
function $t(e, t, n, s, o, r) {
  const i = zs.get(e);
  if (!i) {
    cs++;
    return;
  }
  const l = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: o,
      oldTarget: r
    }) : a.trigger());
  };
  if (pr(), t === "clear")
    i.forEach(l);
  else {
    const a = q(e), f = a && lo(n);
    if (a && n === "length") {
      const p = Number(s);
      i.forEach((u, m) => {
        (m === "length" || m === us || !pt(m) && m >= p) && l(u);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), f && l(i.get(us)), t) {
        case "add":
          a ? f && l(i.get("length")) : (l(i.get(bn)), vn(e) && l(i.get(Mo)));
          break;
        case "delete":
          a || (l(i.get(bn)), vn(e) && l(i.get(Mo)));
          break;
        case "set":
          vn(e) && l(i.get(bn));
          break;
      }
  }
  hr();
}
function Cc(e, t) {
  const n = zs.get(e);
  return n && n.get(t);
}
function kn(e) {
  const t = /* @__PURE__ */ ne(e);
  return t === e ? t : (Re(t, "iterate", us), /* @__PURE__ */ He(e) ? t : t.map(_t));
}
function fo(e) {
  return Re(e = /* @__PURE__ */ ne(e), "iterate", us), e;
}
function Ot(e, t) {
  return /* @__PURE__ */ mt(e) ? jn(/* @__PURE__ */ it(e) ? _t(t) : t) : _t(t);
}
const Dc = {
  __proto__: null,
  [Symbol.iterator]() {
    return wo(this, Symbol.iterator, (e) => Ot(this, e));
  },
  concat(...e) {
    return kn(this).concat(
      ...e.map((t) => q(t) ? kn(t) : t)
    );
  },
  entries() {
    return wo(this, "entries", (e) => (e[1] = Ot(this, e[1]), e));
  },
  every(e, t) {
    return Vt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Vt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ot(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Vt(
      this,
      "find",
      e,
      t,
      (n) => Ot(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Vt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Vt(
      this,
      "findLast",
      e,
      t,
      (n) => Ot(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Vt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Vt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return No(this, "includes", e);
  },
  indexOf(...e) {
    return No(this, "indexOf", e);
  },
  join(e) {
    return kn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return No(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Vt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Jn(this, "pop");
  },
  push(...e) {
    return Jn(this, "push", e);
  },
  reduce(e, ...t) {
    return Gr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Gr(this, "reduceRight", e, t);
  },
  shift() {
    return Jn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Vt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Jn(this, "splice", e);
  },
  toReversed() {
    return kn(this).toReversed();
  },
  toSorted(e) {
    return kn(this).toSorted(e);
  },
  toSpliced(...e) {
    return kn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Jn(this, "unshift", e);
  },
  values() {
    return wo(this, "values", (e) => Ot(this, e));
  }
};
function wo(e, t, n) {
  const s = fo(e), o = s[t]();
  return s !== e && !/* @__PURE__ */ He(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.done || (r.value = n(r.value)), r;
  }), o;
}
const xc = Array.prototype;
function Vt(e, t, n, s, o, r) {
  const i = fo(e), l = i !== e && !/* @__PURE__ */ He(e), a = i[t];
  if (a !== xc[t]) {
    const u = a.apply(e, r);
    return l ? _t(u) : u;
  }
  let f = n;
  i !== e && (l ? f = function(u, m) {
    return n.call(this, Ot(e, u), m, e);
  } : n.length > 2 && (f = function(u, m) {
    return n.call(this, u, m, e);
  }));
  const p = a.call(i, f, s);
  return l && o ? o(p) : p;
}
function Gr(e, t, n, s) {
  const o = fo(e), r = o !== e && !/* @__PURE__ */ He(e);
  let i = n, l = !1;
  o !== e && (r ? (l = s.length === 0, i = function(f, p, u) {
    return l && (l = !1, f = Ot(e, f)), n.call(this, f, Ot(e, p), u, e);
  }) : n.length > 3 && (i = function(f, p, u) {
    return n.call(this, f, p, u, e);
  }));
  const a = o[t](i, ...s);
  return l ? Ot(e, a) : a;
}
function No(e, t, n) {
  const s = /* @__PURE__ */ ne(e);
  Re(s, "iterate", us);
  const o = s[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Ln(n[0]) ? (n[0] = /* @__PURE__ */ ne(n[0]), s[t](...n)) : o;
}
function Jn(e, t, n = []) {
  ht(), pr();
  const s = (/* @__PURE__ */ ne(e))[t].apply(e, n);
  return hr(), gt(), s;
}
const Tc = /* @__PURE__ */ Bt("__proto__,__v_isRef,__isVue"), El = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(pt)
);
function Pc(e) {
  pt(e) || (e = String(e));
  const t = /* @__PURE__ */ ne(this);
  return Re(t, "has", e), t.hasOwnProperty(e);
}
class wl {
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
      return s === (o ? r ? Cl : $l : r ? kl : Sl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = q(t);
    if (!o) {
      let a;
      if (i && (a = Dc[n]))
        return a;
      if (n === "hasOwnProperty")
        return Pc;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ee(t) ? t : s
    );
    if ((pt(n) ? El.has(n) : Tc(n)) || (o || Re(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ Ee(l)) {
      const a = i && lo(n) ? l : l.value;
      return o && de(a) ? /* @__PURE__ */ jo(a) : a;
    }
    return de(l) ? o ? /* @__PURE__ */ jo(l) : /* @__PURE__ */ on(l) : l;
  }
}
class Nl extends wl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let r = t[n];
    const i = q(t) && lo(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ mt(r);
      if (!/* @__PURE__ */ He(s) && !/* @__PURE__ */ mt(s) && (r = /* @__PURE__ */ ne(r), s = /* @__PURE__ */ ne(s)), !i && /* @__PURE__ */ Ee(r) && !/* @__PURE__ */ Ee(s))
        return f ? (process.env.NODE_ENV !== "production" && tt(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = s, !0);
    }
    const l = i ? Number(n) < t.length : pe(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Ee(t) ? t : o
    );
    return t === /* @__PURE__ */ ne(o) && (l ? kt(s, r) && $t(t, "set", n, s, r) : $t(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = pe(t, n), o = t[n], r = Reflect.deleteProperty(t, n);
    return r && s && $t(t, "delete", n, void 0, o), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!pt(n) || !El.has(n)) && Re(t, "has", n), s;
  }
  ownKeys(t) {
    return Re(
      t,
      "iterate",
      q(t) ? "length" : bn
    ), Reflect.ownKeys(t);
  }
}
class Ol extends wl {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && tt(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && tt(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Vc = /* @__PURE__ */ new Nl(), Ac = /* @__PURE__ */ new Ol(), Rc = /* @__PURE__ */ new Nl(!0), Ic = /* @__PURE__ */ new Ol(!0), Lo = (e) => e, Os = (e) => Reflect.getPrototypeOf(e);
function Mc(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = /* @__PURE__ */ ne(o), i = vn(r), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = o[e](...s), p = n ? Lo : t ? jn : _t;
    return !t && Re(
      r,
      "iterate",
      a ? Mo : bn
    ), De(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: u, done: m } = f.next();
          return m ? { value: u, done: m } : {
            value: l ? [p(u[0]), p(u[1])] : p(u),
            done: m
          };
        }
      }
    );
  };
}
function Ss(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      tt(
        `${co(e)} operation ${n}failed: target is readonly.`,
        /* @__PURE__ */ ne(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Lc(e, t) {
  const n = {
    get(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ ne(r), l = /* @__PURE__ */ ne(o);
      e || (kt(o, l) && Re(i, "get", o), Re(i, "get", l));
      const { has: a } = Os(i), f = t ? Lo : e ? jn : _t;
      if (a.call(i, o))
        return f(r.get(o));
      if (a.call(i, l))
        return f(r.get(l));
      r !== i && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Re(/* @__PURE__ */ ne(o), "iterate", bn), o.size;
    },
    has(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ ne(r), l = /* @__PURE__ */ ne(o);
      return e || (kt(o, l) && Re(i, "has", o), Re(i, "has", l)), o === l ? r.has(o) : r.has(o) || r.has(l);
    },
    forEach(o, r) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ ne(l), f = t ? Lo : e ? jn : _t;
      return !e && Re(a, "iterate", bn), l.forEach((p, u) => o.call(r, f(p), f(u), i));
    }
  };
  return De(
    n,
    e ? {
      add: Ss("add"),
      set: Ss("set"),
      delete: Ss("delete"),
      clear: Ss("clear")
    } : {
      add(o) {
        const r = /* @__PURE__ */ ne(this), i = Os(r), l = /* @__PURE__ */ ne(o), a = !t && !/* @__PURE__ */ He(o) && !/* @__PURE__ */ mt(o) ? l : o;
        return i.has.call(r, a) || kt(o, a) && i.has.call(r, o) || kt(l, a) && i.has.call(r, l) || (r.add(a), $t(r, "add", a, a)), this;
      },
      set(o, r) {
        !t && !/* @__PURE__ */ He(r) && !/* @__PURE__ */ mt(r) && (r = /* @__PURE__ */ ne(r));
        const i = /* @__PURE__ */ ne(this), { has: l, get: a } = Os(i);
        let f = l.call(i, o);
        f ? process.env.NODE_ENV !== "production" && Wr(i, l, o) : (o = /* @__PURE__ */ ne(o), f = l.call(i, o));
        const p = a.call(i, o);
        return i.set(o, r), f ? kt(r, p) && $t(i, "set", o, r, p) : $t(i, "add", o, r), this;
      },
      delete(o) {
        const r = /* @__PURE__ */ ne(this), { has: i, get: l } = Os(r);
        let a = i.call(r, o);
        a ? process.env.NODE_ENV !== "production" && Wr(r, i, o) : (o = /* @__PURE__ */ ne(o), a = i.call(r, o));
        const f = l ? l.call(r, o) : void 0, p = r.delete(o);
        return a && $t(r, "delete", o, void 0, f), p;
      },
      clear() {
        const o = /* @__PURE__ */ ne(this), r = o.size !== 0, i = process.env.NODE_ENV !== "production" ? vn(o) ? new Map(o) : new Set(o) : void 0, l = o.clear();
        return r && $t(
          o,
          "clear",
          void 0,
          void 0,
          i
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = Mc(o, e, t);
  }), n;
}
function po(e, t) {
  const n = Lc(e, t);
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    pe(n, o) && o in s ? n : s,
    o,
    r
  );
}
const jc = {
  get: /* @__PURE__ */ po(!1, !1)
}, Fc = {
  get: /* @__PURE__ */ po(!1, !0)
}, Uc = {
  get: /* @__PURE__ */ po(!0, !1)
}, Hc = {
  get: /* @__PURE__ */ po(!0, !0)
};
function Wr(e, t, n) {
  const s = /* @__PURE__ */ ne(n);
  if (s !== n && t.call(e, s)) {
    const o = ur(e);
    tt(
      `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Sl = /* @__PURE__ */ new WeakMap(), kl = /* @__PURE__ */ new WeakMap(), $l = /* @__PURE__ */ new WeakMap(), Cl = /* @__PURE__ */ new WeakMap();
function Bc(e) {
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
function Gc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Bc(ur(e));
}
// @__NO_SIDE_EFFECTS__
function on(e) {
  return /* @__PURE__ */ mt(e) ? e : ho(
    e,
    !1,
    Vc,
    jc,
    Sl
  );
}
// @__NO_SIDE_EFFECTS__
function Dl(e) {
  return ho(
    e,
    !1,
    Rc,
    Fc,
    kl
  );
}
// @__NO_SIDE_EFFECTS__
function jo(e) {
  return ho(
    e,
    !0,
    Ac,
    Uc,
    $l
  );
}
// @__NO_SIDE_EFFECTS__
function Ct(e) {
  return ho(
    e,
    !0,
    Ic,
    Hc,
    Cl
  );
}
function ho(e, t, n, s, o) {
  if (!de(e))
    return process.env.NODE_ENV !== "production" && tt(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Gc(e);
  if (r === 0)
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    r === 2 ? s : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function it(e) {
  return /* @__PURE__ */ mt(e) ? /* @__PURE__ */ it(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function mt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ln(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ne(t) : e;
}
function Zt(e) {
  return !pe(e, "__v_skip") && Object.isExtensible(e) && Ks(e, "__v_skip", !0), e;
}
const _t = (e) => de(e) ? /* @__PURE__ */ on(e) : e, jn = (e) => de(e) ? /* @__PURE__ */ jo(e) : e;
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function me(e) {
  return xl(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Wc(e) {
  return xl(e, !0);
}
function xl(e, t) {
  return /* @__PURE__ */ Ee(e) ? e : new Kc(e, t);
}
class Kc {
  constructor(t, n) {
    this.dep = new mr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ne(t), this._value = n ? t : _t(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ mt(t);
    t = s ? t : /* @__PURE__ */ ne(t), kt(t, n) && (this._rawValue = t, this._value = s ? t : _t(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function d(e) {
  return /* @__PURE__ */ Ee(e) ? e.value : e;
}
const zc = {
  get: (e, t, n) => t === "__v_raw" ? e : d(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return /* @__PURE__ */ Ee(o) && !/* @__PURE__ */ Ee(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Tl(e) {
  return /* @__PURE__ */ it(e) ? e : new Proxy(e, zc);
}
// @__NO_SIDE_EFFECTS__
function Kr(e) {
  process.env.NODE_ENV !== "production" && !/* @__PURE__ */ Ln(e) && tt("toRefs() expects a reactive object but received a plain one.");
  const t = q(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Pl(e, n);
  return t;
}
class qc {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ ne(t);
    let o = !0, r = t;
    if (!q(t) || !lo(String(n)))
      do
        o = !/* @__PURE__ */ Ln(r) || /* @__PURE__ */ He(r);
      while (o && (r = r.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = d(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ Ee(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ Ee(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Cc(this._raw, this._key);
  }
}
class Jc {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Ps(e, t, n) {
  return /* @__PURE__ */ Ee(e) ? e : ee(e) ? new Jc(e) : de(e) && arguments.length > 1 ? Pl(e, t, n) : /* @__PURE__ */ me(e);
}
function Pl(e, t, n) {
  return new qc(e, t, n);
}
class Yc {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new mr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = cs - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ve !== this)
      return gl(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return vl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && tt("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function Qc(e, t, n = !1) {
  let s, o;
  ee(e) ? s = e : (s = e.get, o = e.set);
  const r = new Yc(s, o, n);
  return process.env.NODE_ENV, r;
}
const ks = {}, qs = /* @__PURE__ */ new WeakMap();
let hn;
function Xc(e, t = !1, n = hn) {
  if (n) {
    let s = qs.get(n);
    s || qs.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && tt(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Zc(e, t, n = be) {
  const { immediate: s, deep: o, once: r, scheduler: i, augmentJob: l, call: a } = n, f = (O) => {
    (n.onWarn || tt)(
      "Invalid watch source: ",
      O,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = (O) => o ? O : /* @__PURE__ */ He(O) || o === !1 || o === 0 ? Ft(O, 1) : Ft(O);
  let u, m, b, T, $ = !1, K = !1;
  if (/* @__PURE__ */ Ee(e) ? (m = () => e.value, $ = /* @__PURE__ */ He(e)) : /* @__PURE__ */ it(e) ? (m = () => p(e), $ = !0) : q(e) ? (K = !0, $ = e.some((O) => /* @__PURE__ */ it(O) || /* @__PURE__ */ He(O)), m = () => e.map((O) => {
    if (/* @__PURE__ */ Ee(O))
      return O.value;
    if (/* @__PURE__ */ it(O))
      return p(O);
    if (ee(O))
      return a ? a(O, 2) : O();
    process.env.NODE_ENV !== "production" && f(O);
  })) : ee(e) ? t ? m = a ? () => a(e, 2) : e : m = () => {
    if (b) {
      ht();
      try {
        b();
      } finally {
        gt();
      }
    }
    const O = hn;
    hn = u;
    try {
      return a ? a(e, 3, [T]) : e(T);
    } finally {
      hn = O;
    }
  } : (m = Ie, process.env.NODE_ENV !== "production" && f(e)), t && o) {
    const O = m, S = o === !0 ? 1 / 0 : o;
    m = () => Ft(O(), S);
  }
  const F = fl(), A = () => {
    u.stop(), F && F.active && ar(F.effects, u);
  };
  if (r && t) {
    const O = t;
    t = (...S) => {
      O(...S), A();
    };
  }
  let I = K ? new Array(e.length).fill(ks) : ks;
  const te = (O) => {
    if (!(!(u.flags & 1) || !u.dirty && !O))
      if (t) {
        const S = u.run();
        if (o || $ || (K ? S.some((v, E) => kt(v, I[E])) : kt(S, I))) {
          b && b();
          const v = hn;
          hn = u;
          try {
            const E = [
              S,
              // pass undefined as the old value when it's changed for the first time
              I === ks ? void 0 : K && I[0] === ks ? [] : I,
              T
            ];
            I = S, a ? a(t, 3, E) : (
              // @ts-expect-error
              t(...E)
            );
          } finally {
            hn = v;
          }
        }
      } else
        u.run();
  };
  return l && l(te), u = new pl(m), u.scheduler = i ? () => i(te, !1) : te, T = (O) => Xc(O, !1, u), b = u.onStop = () => {
    const O = qs.get(u);
    if (O) {
      if (a)
        a(O, 4);
      else
        for (const S of O) S();
      qs.delete(u);
    }
  }, process.env.NODE_ENV !== "production" && (u.onTrack = n.onTrack, u.onTrigger = n.onTrigger), t ? s ? te(!0) : I = u.run() : i ? i(te.bind(null, !0), !0) : u.run(), A.pause = u.pause.bind(u), A.resume = u.resume.bind(u), A.stop = A, A;
}
function Ft(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ee(e))
    Ft(e.value, t, n);
  else if (q(e))
    for (let s = 0; s < e.length; s++)
      Ft(e[s], t, n);
  else if (Gn(e) || vn(e))
    e.forEach((s) => {
      Ft(s, t, n);
    });
  else if (il(e)) {
    for (const s in e)
      Ft(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Ft(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const yn = [];
function Vs(e) {
  yn.push(e);
}
function As() {
  yn.pop();
}
let Oo = !1;
function j(e, ...t) {
  if (Oo) return;
  Oo = !0, ht();
  const n = yn.length ? yn[yn.length - 1].component : null, s = n && n.appContext.config.warnHandler, o = eu();
  if (s)
    Wn(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var i, l;
          return (l = (i = r.toString) == null ? void 0 : i.call(r)) != null ? l : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        o.map(
          ({ vnode: r }) => `at <${Ns(n, r.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    o.length && r.push(`
`, ...tu(o)), console.warn(...r);
  }
  gt(), Oo = !1;
}
function eu() {
  let e = yn[yn.length - 1];
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
function tu(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...nu(n));
  }), t;
}
function nu({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, o = ` at <${Ns(
    e.component,
    e.type,
    s
  )}`, r = ">" + n;
  return e.props ? [o, ...su(e.props), r] : [o + r];
}
function su(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Vl(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Vl(e, t, n) {
  return Oe(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ Ee(t) ? (t = Vl(e, /* @__PURE__ */ ne(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : ee(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ ne(t), n ? t : [`${e}=`, t]);
}
const _r = {
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
function Wn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (o) {
    bs(o, t, n);
  }
}
function Pt(e, t, n, s) {
  if (ee(e)) {
    const o = Wn(e, t, n, s);
    return o && cr(o) && o.catch((r) => {
      bs(r, t, n);
    }), o;
  }
  if (q(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(Pt(e[r], t, n, s));
    return o;
  } else process.env.NODE_ENV !== "production" && j(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function bs(e, t, n, s = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || be;
  if (t) {
    let l = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? _r[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const p = l.ec;
      if (p) {
        for (let u = 0; u < p.length; u++)
          if (p[u](e, a, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      ht(), Wn(r, null, 10, [
        e,
        a,
        f
      ]), gt();
      return;
    }
  }
  ou(e, n, o, s, i);
}
function ou(e, t, n, s = !0, o = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = _r[t];
    if (n && Vs(n), j(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && As(), s)
      throw e;
    console.error(e);
  } else {
    if (o)
      throw e;
    console.error(e);
  }
}
const ze = [];
let Nt = -1;
const In = [];
let Qt = null, Vn = 0;
const Al = /* @__PURE__ */ Promise.resolve();
let Js = null;
const ru = 100;
function ds(e) {
  const t = Js || Al;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function iu(e) {
  let t = Nt + 1, n = ze.length;
  for (; t < n; ) {
    const s = t + n >>> 1, o = ze[s], r = fs(o);
    r < e || r === e && o.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function go(e) {
  if (!(e.flags & 1)) {
    const t = fs(e), n = ze[ze.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= fs(n) ? ze.push(e) : ze.splice(iu(t), 0, e), e.flags |= 1, Rl();
  }
}
function Rl() {
  Js || (Js = Al.then(Ll));
}
function Il(e) {
  q(e) ? In.push(...e) : Qt && e.id === -1 ? Qt.splice(Vn + 1, 0, e) : e.flags & 1 || (In.push(e), e.flags |= 1), Rl();
}
function zr(e, t, n = Nt + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < ze.length; n++) {
    const s = ze[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid || process.env.NODE_ENV !== "production" && vr(t, s))
        continue;
      ze.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Ml(e) {
  if (In.length) {
    const t = [...new Set(In)].sort(
      (n, s) => fs(n) - fs(s)
    );
    if (In.length = 0, Qt) {
      Qt.push(...t);
      return;
    }
    for (Qt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Vn = 0; Vn < Qt.length; Vn++) {
      const n = Qt[Vn];
      process.env.NODE_ENV !== "production" && vr(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Qt = null, Vn = 0;
  }
}
const fs = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ll(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => vr(e, n) : Ie;
  try {
    for (Nt = 0; Nt < ze.length; Nt++) {
      const n = ze[Nt];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Wn(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Nt < ze.length; Nt++) {
      const n = ze[Nt];
      n && (n.flags &= -2);
    }
    Nt = -1, ze.length = 0, Ml(e), Js = null, (ze.length || In.length) && Ll(e);
  }
}
function vr(e, t) {
  const n = e.get(t) || 0;
  if (n > ru) {
    const s = t.i, o = s && ba(s.type);
    return bs(
      `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Dt = !1;
const Rs = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (vs().__VUE_HMR_RUNTIME__ = {
  createRecord: So(jl),
  rerender: So(cu),
  reload: So(uu)
});
const Nn = /* @__PURE__ */ new Map();
function lu(e) {
  const t = e.type.__hmrId;
  let n = Nn.get(t);
  n || (jl(t, e.type), n = Nn.get(t)), n.instances.add(e);
}
function au(e) {
  Nn.get(e.type.__hmrId).instances.delete(e);
}
function jl(e, t) {
  return Nn.has(e) ? !1 : (Nn.set(e, {
    initialDef: Ys(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Ys(e) {
  return ya(e) ? e.__vccOpts : e;
}
function cu(e, t) {
  const n = Nn.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Ys(s.type).render = t), s.renderCache = [], Dt = !0, s.job.flags & 8 || s.update(), Dt = !1;
  }));
}
function uu(e, t) {
  const n = Nn.get(e);
  if (!n) return;
  t = Ys(t), qr(n.initialDef, t);
  const s = [...n.instances];
  for (let o = 0; o < s.length; o++) {
    const r = s[o], i = Ys(r.type);
    let l = Rs.get(i);
    l || (i !== n.initialDef && qr(i, t), Rs.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? go(() => {
      r.job.flags & 8 || (Dt = !0, r.parent.update(), Dt = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  Il(() => {
    Rs.clear();
  });
}
function qr(e, t) {
  De(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function So(e) {
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
let ut, es = [], Fo = !1;
function ys(e, ...t) {
  ut ? ut.emit(e, ...t) : Fo || es.push({ event: e, args: t });
}
function br(e, t) {
  var n, s;
  ut = e, ut ? (ut.enabled = !0, es.forEach(({ event: o, args: r }) => ut.emit(o, ...r)), es = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    br(r, t);
  }), setTimeout(() => {
    ut || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Fo = !0, es = []);
  }, 3e3)) : (Fo = !0, es = []);
}
function du(e, t) {
  ys("app:init", e, t, {
    Fragment: X,
    Text: Es,
    Comment: Ze,
    Static: Ls
  });
}
function fu(e) {
  ys("app:unmount", e);
}
const pu = /* @__PURE__ */ yr(
  "component:added"
  /* COMPONENT_ADDED */
), Fl = /* @__PURE__ */ yr(
  "component:updated"
  /* COMPONENT_UPDATED */
), hu = /* @__PURE__ */ yr(
  "component:removed"
  /* COMPONENT_REMOVED */
), gu = (e) => {
  ut && typeof ut.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ut.cleanupBuffer(e) && hu(e);
};
// @__NO_SIDE_EFFECTS__
function yr(e) {
  return (t) => {
    ys(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const mu = /* @__PURE__ */ Ul(
  "perf:start"
  /* PERFORMANCE_START */
), _u = /* @__PURE__ */ Ul(
  "perf:end"
  /* PERFORMANCE_END */
);
function Ul(e) {
  return (t, n, s) => {
    ys(e, t.appContext.app, t.uid, t, n, s);
  };
}
function vu(e, t, n) {
  ys(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let Me = null, Hl = null;
function Qs(e) {
  const t = Me;
  return Me = e, Hl = e && e.type.__scopeId || null, t;
}
function he(e, t = Me, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && no(-1);
    const r = Qs(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Qs(r), s._d && no(1);
    }
    return process.env.NODE_ENV !== "production" && Fl(t), i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Bl(e) {
  cc(e) && j("Do not use built-in directive ids as custom directive id: " + e);
}
function St(e, t) {
  if (Me === null)
    return process.env.NODE_ENV !== "production" && j("withDirectives can only be used inside render functions."), e;
  const n = vo(Me), s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, i, l, a = be] = t[o];
    r && (ee(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Ft(i), s.push({
      dir: r,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function un(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let a = l.dir[s];
    a && (ht(), Pt(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), gt());
  }
}
function Is(e, t) {
  if (process.env.NODE_ENV !== "production" && (!Ae || Ae.isMounted) && j("provide() can only be used inside setup()."), Ae) {
    let n = Ae.provides;
    const s = Ae.parent && Ae.parent.provides;
    s === n && (n = Ae.provides = Object.create(s)), n[e] = t;
  }
}
function ft(e, t, n = !1) {
  const s = Kn();
  if (s || wn) {
    let o = wn ? wn._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && ee(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && j(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && j("inject() can only be used inside setup() or functional components.");
}
function bu() {
  return !!(Kn() || wn);
}
const yu = /* @__PURE__ */ Symbol.for("v-scx"), Eu = () => {
  {
    const e = ft(yu);
    return e || process.env.NODE_ENV !== "production" && j(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function wu(e, t) {
  return Er(e, null, t);
}
function qe(e, t, n) {
  return process.env.NODE_ENV !== "production" && !ee(t) && j(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Er(e, t, n);
}
function Er(e, t, n = be) {
  const { immediate: s, deep: o, flush: r, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && j(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && j(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && j(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = De({}, n);
  process.env.NODE_ENV !== "production" && (l.onWarn = j);
  const a = t && s || !t && r !== "post";
  let f;
  if (hs) {
    if (r === "sync") {
      const b = Eu();
      f = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!a) {
      const b = () => {
      };
      return b.stop = Ie, b.resume = Ie, b.pause = Ie, b;
    }
  }
  const p = Ae;
  l.call = (b, T, $) => Pt(b, p, T, $);
  let u = !1;
  r === "post" ? l.scheduler = (b) => {
    Qe(b, p && p.suspense);
  } : r !== "sync" && (u = !0, l.scheduler = (b, T) => {
    T ? b() : go(b);
  }), l.augmentJob = (b) => {
    t && (b.flags |= 4), u && (b.flags |= 2, p && (b.id = p.uid, b.i = p));
  };
  const m = Zc(e, t, l);
  return hs && (f ? f.push(m) : a && m()), m;
}
function Nu(e, t, n) {
  const s = this.proxy, o = Oe(e) ? e.includes(".") ? Gl(s, e) : () => s[e] : e.bind(s, s);
  let r;
  ee(t) ? r = t : (r = t.handler, n = t);
  const i = ws(this), l = Er(o, r.bind(s), n);
  return i(), l;
}
function Gl(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
const Ou = /* @__PURE__ */ Symbol("_vte"), Su = (e) => e.__isTeleport, ku = /* @__PURE__ */ Symbol("_leaveCb");
function wr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, wr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Be(e, t) {
  return ee(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    De({ name: e.name }, t, { setup: e })
  ) : e;
}
function Wl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Jr = /* @__PURE__ */ new WeakSet();
function Yr(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Xs = /* @__PURE__ */ new WeakMap();
function is(e, t, n, s, o = !1) {
  if (q(e)) {
    e.forEach(
      ($, K) => is(
        $,
        t && (q(t) ? t[K] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Mn(s) && !o) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && is(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? vo(s.component) : s.el, i = o ? null : r, { i: l, r: a } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    j(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const f = t && t.r, p = l.refs === be ? l.refs = {} : l.refs, u = l.setupState, m = /* @__PURE__ */ ne(u), b = u === be ? ol : ($) => process.env.NODE_ENV !== "production" && (pe(m, $) && !/* @__PURE__ */ Ee(m[$]) && j(
    `Template ref "${$}" used on a non-ref value. It will not work in the production build.`
  ), Jr.has(m[$])) || Yr(p, $) ? !1 : pe(m, $), T = ($, K) => !(process.env.NODE_ENV !== "production" && Jr.has($) || K && Yr(p, K));
  if (f != null && f !== a) {
    if (Qr(t), Oe(f))
      p[f] = null, b(f) && (u[f] = null);
    else if (/* @__PURE__ */ Ee(f)) {
      const $ = t;
      T(f, $.k) && (f.value = null), $.k && (p[$.k] = null);
    }
  }
  if (ee(a))
    Wn(a, l, 12, [i, p]);
  else {
    const $ = Oe(a), K = /* @__PURE__ */ Ee(a);
    if ($ || K) {
      const F = () => {
        if (e.f) {
          const A = $ ? b(a) ? u[a] : p[a] : T(a) || !e.k ? a.value : p[e.k];
          if (o)
            q(A) && ar(A, r);
          else if (q(A))
            A.includes(r) || A.push(r);
          else if ($)
            p[a] = [r], b(a) && (u[a] = p[a]);
          else {
            const I = [r];
            T(a, e.k) && (a.value = I), e.k && (p[e.k] = I);
          }
        } else $ ? (p[a] = i, b(a) && (u[a] = i)) : K ? (T(a, e.k) && (a.value = i), e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && j("Invalid template ref type:", a, `(${typeof a})`);
      };
      if (i) {
        const A = () => {
          F(), Xs.delete(e);
        };
        A.id = -1, Xs.set(e, A), Qe(A, n);
      } else
        Qr(e), F();
    } else process.env.NODE_ENV !== "production" && j("Invalid template ref type:", a, `(${typeof a})`);
  }
}
function Qr(e) {
  const t = Xs.get(e);
  t && (t.flags |= 8, Xs.delete(e));
}
vs().requestIdleCallback;
vs().cancelIdleCallback;
const Mn = (e) => !!e.type.__asyncLoader, Nr = (e) => e.type.__isKeepAlive;
function $u(e, t) {
  Kl(e, "a", t);
}
function Cu(e, t) {
  Kl(e, "da", t);
}
function Kl(e, t, n = Ae) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (mo(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Nr(o.parent.vnode) && Du(s, t, n, o), o = o.parent;
  }
}
function Du(e, t, n, s) {
  const o = mo(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  zl(() => {
    ar(s[t], o);
  }, n);
}
function mo(e, t, n = Ae, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      ht();
      const l = ws(n), a = Pt(t, n, e, i);
      return l(), gt(), a;
    });
    return s ? o.unshift(r) : o.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const o = pn(_r[e].replace(/ hook$/, ""));
    j(
      `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Gt = (e) => (t, n = Ae) => {
  (!hs || e === "sp") && mo(e, (...s) => t(...s), n);
}, xu = Gt("bm"), Or = Gt("m"), Tu = Gt(
  "bu"
), Pu = Gt("u"), Vu = Gt(
  "bum"
), zl = Gt("um"), Au = Gt(
  "sp"
), Ru = Gt("rtg"), Iu = Gt("rtc");
function Mu(e, t = Ae) {
  mo("ec", e, t);
}
const Lu = /* @__PURE__ */ Symbol.for("v-ndc");
function ke(e, t, n, s) {
  let o;
  const r = n, i = q(e);
  if (i || Oe(e)) {
    const l = i && /* @__PURE__ */ it(e);
    let a = !1, f = !1;
    l && (a = !/* @__PURE__ */ He(e), f = /* @__PURE__ */ mt(e), e = fo(e)), o = new Array(e.length);
    for (let p = 0, u = e.length; p < u; p++)
      o[p] = t(
        a ? f ? jn(_t(e[p])) : _t(e[p]) : e[p],
        p,
        void 0,
        r
      );
  } else if (typeof e == "number")
    if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0))
      j(
        `The v-for range expects a positive integer value but got ${e}.`
      ), o = [];
    else {
      o = new Array(e);
      for (let l = 0; l < e; l++)
        o[l] = t(l + 1, l, void 0, r);
    }
  else if (de(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, a) => t(l, a, void 0, r)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let a = 0, f = l.length; a < f; a++) {
        const p = l[a];
        o[a] = t(e[p], p, a, r);
      }
    }
  else
    o = [];
  return o;
}
function Xr(e, t, n = {}, s, o) {
  if (Me.ce || Me.parent && Mn(Me.parent) && Me.parent.ce) {
    const f = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), D(), Fn(
      X,
      null,
      [Z("slot", n, s)],
      f ? -2 : 64
    );
  }
  let r = e[t];
  process.env.NODE_ENV !== "production" && r && r.length > 1 && (j(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), r = () => []), r && r._c && (r._d = !1), D();
  const i = r && ql(r(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, a = Fn(
    X,
    {
      key: (l && !pt(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && s ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), r && r._c && (r._d = !0), a;
}
function ql(e) {
  return e.some((t) => On(t) ? !(t.type === Ze || t.type === X && !ql(t.children)) : !0) ? e : null;
}
const Uo = (e) => e ? _a(e) ? vo(e) : Uo(e.parent) : null, En = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ De(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(e.refs) : e.refs,
    $parent: (e) => Uo(e.parent),
    $root: (e) => Uo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ql(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      go(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ds.bind(e.proxy)),
    $watch: (e) => Nu.bind(e)
  })
), Sr = (e) => e === "_" || e === "$", ko = (e, t) => e !== be && !e.__isScriptSetup && pe(e, t), Jl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: l, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
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
        if (ko(s, t))
          return i[t] = 1, s[t];
        if (o !== be && pe(o, t))
          return i[t] = 2, o[t];
        if (pe(r, t))
          return i[t] = 3, r[t];
        if (n !== be && pe(n, t))
          return i[t] = 4, n[t];
        Ho && (i[t] = 0);
      }
    }
    const f = En[t];
    let p, u;
    if (f)
      return t === "$attrs" ? (Re(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && eo()) : process.env.NODE_ENV !== "production" && t === "$slots" && Re(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[t])
    )
      return p;
    if (n !== be && pe(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, pe(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && Me && (!Oe(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== be && Sr(t[0]) && pe(o, t) ? j(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Me && j(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return ko(o, t) ? (o[t] = n, !0) : process.env.NODE_ENV !== "production" && o.__isScriptSetup && pe(o, t) ? (j(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== be && pe(s, t) ? (s[t] = n, !0) : pe(e.props, t) ? (process.env.NODE_ENV !== "production" && j(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && j(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, props: r, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== be && l[0] !== "$" && pe(e, l) || ko(t, l) || pe(r, l) || pe(s, l) || pe(En, l) || pe(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : pe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Jl.ownKeys = (e) => (j(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function ju(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(En).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => En[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Ie
    });
  }), t;
}
function Fu(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((s) => {
    Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[s],
      set: Ie
    });
  });
}
function Uu(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(/* @__PURE__ */ ne(n)).forEach((s) => {
    if (!n.__isScriptSetup) {
      if (Sr(s[0])) {
        j(
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
        set: Ie
      });
    }
  });
}
function Zr(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Hu() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? j(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Ho = !0;
function Bu(e) {
  const t = Ql(e), n = e.proxy, s = e.ctx;
  Ho = !1, t.beforeCreate && ei(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: a,
    inject: f,
    // lifecycle
    created: p,
    beforeMount: u,
    mounted: m,
    beforeUpdate: b,
    updated: T,
    activated: $,
    deactivated: K,
    beforeDestroy: F,
    beforeUnmount: A,
    destroyed: I,
    unmounted: te,
    render: O,
    renderTracked: S,
    renderTriggered: v,
    errorCaptured: E,
    serverPrefetch: N,
    // public API
    expose: M,
    inheritAttrs: C,
    // assets
    components: z,
    directives: ae,
    filters: je
  } = t, Pe = process.env.NODE_ENV !== "production" ? Hu() : null;
  if (process.env.NODE_ENV !== "production") {
    const [ie] = e.propsOptions;
    if (ie)
      for (const oe in ie)
        Pe("Props", oe);
  }
  if (f && Gu(f, s, Pe), i)
    for (const ie in i) {
      const oe = i[ie];
      ee(oe) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(s, ie, {
        value: oe.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : s[ie] = oe.bind(n), process.env.NODE_ENV !== "production" && Pe("Methods", ie)) : process.env.NODE_ENV !== "production" && j(
        `Method "${ie}" has type "${typeof oe}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (o) {
    process.env.NODE_ENV !== "production" && !ee(o) && j(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const ie = o.call(n, n);
    if (process.env.NODE_ENV !== "production" && cr(ie) && j(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !de(ie))
      process.env.NODE_ENV !== "production" && j("data() should return an object.");
    else if (e.data = /* @__PURE__ */ on(ie), process.env.NODE_ENV !== "production")
      for (const oe in ie)
        Pe("Data", oe), Sr(oe[0]) || Object.defineProperty(s, oe, {
          configurable: !0,
          enumerable: !0,
          get: () => ie[oe],
          set: Ie
        });
  }
  if (Ho = !0, r)
    for (const ie in r) {
      const oe = r[ie], Ne = ee(oe) ? oe.bind(n, n) : ee(oe.get) ? oe.get.bind(n, n) : Ie;
      process.env.NODE_ENV !== "production" && Ne === Ie && j(`Computed property "${ie}" has no getter.`);
      const cn = !ee(oe) && ee(oe.set) ? oe.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        j(
          `Write operation failed: computed property "${ie}" is readonly.`
        );
      } : Ie, Kt = ue({
        get: Ne,
        set: cn
      });
      Object.defineProperty(s, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => Kt.value,
        set: (vt) => Kt.value = vt
      }), process.env.NODE_ENV !== "production" && Pe("Computed", ie);
    }
  if (l)
    for (const ie in l)
      Yl(l[ie], s, n, ie);
  if (a) {
    const ie = ee(a) ? a.call(n) : a;
    Reflect.ownKeys(ie).forEach((oe) => {
      Is(oe, ie[oe]);
    });
  }
  p && ei(p, e, "c");
  function ce(ie, oe) {
    q(oe) ? oe.forEach((Ne) => ie(Ne.bind(n))) : oe && ie(oe.bind(n));
  }
  if (ce(xu, u), ce(Or, m), ce(Tu, b), ce(Pu, T), ce($u, $), ce(Cu, K), ce(Mu, E), ce(Iu, S), ce(Ru, v), ce(Vu, A), ce(zl, te), ce(Au, N), q(M))
    if (M.length) {
      const ie = e.exposed || (e.exposed = {});
      M.forEach((oe) => {
        Object.defineProperty(ie, oe, {
          get: () => n[oe],
          set: (Ne) => n[oe] = Ne,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === Ie && (e.render = O), C != null && (e.inheritAttrs = C), z && (e.components = z), ae && (e.directives = ae), N && Wl(e);
}
function Gu(e, t, n = Ie) {
  q(e) && (e = Bo(e));
  for (const s in e) {
    const o = e[s];
    let r;
    de(o) ? "default" in o ? r = ft(
      o.from || s,
      o.default,
      !0
    ) : r = ft(o.from || s) : r = ft(o), /* @__PURE__ */ Ee(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[s] = r, process.env.NODE_ENV !== "production" && n("Inject", s);
  }
}
function ei(e, t, n) {
  Pt(
    q(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Yl(e, t, n, s) {
  let o = s.includes(".") ? Gl(n, s) : () => n[s];
  if (Oe(e)) {
    const r = t[e];
    ee(r) ? qe(o, r) : process.env.NODE_ENV !== "production" && j(`Invalid watch handler specified by key "${e}"`, r);
  } else if (ee(e))
    qe(o, e.bind(n));
  else if (de(e))
    if (q(e))
      e.forEach((r) => Yl(r, t, n, s));
    else {
      const r = ee(e.handler) ? e.handler.bind(n) : t[e.handler];
      ee(r) ? qe(o, r, e) : process.env.NODE_ENV !== "production" && j(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && j(`Invalid watch option: "${s}"`, e);
}
function Ql(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let a;
  return l ? a = l : !o.length && !n && !s ? a = t : (a = {}, o.length && o.forEach(
    (f) => Zs(a, f, i, !0)
  ), Zs(a, t, i)), de(t) && r.set(t, a), a;
}
function Zs(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && Zs(e, r, n, !0), o && o.forEach(
    (i) => Zs(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && j(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Wu[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Wu = {
  data: ti,
  props: ni,
  emits: ni,
  // objects
  methods: ts,
  computed: ts,
  // lifecycle
  beforeCreate: We,
  created: We,
  beforeMount: We,
  mounted: We,
  beforeUpdate: We,
  updated: We,
  beforeDestroy: We,
  beforeUnmount: We,
  destroyed: We,
  unmounted: We,
  activated: We,
  deactivated: We,
  errorCaptured: We,
  serverPrefetch: We,
  // assets
  components: ts,
  directives: ts,
  // watch
  watch: zu,
  // provide / inject
  provide: ti,
  inject: Ku
};
function ti(e, t) {
  return t ? e ? function() {
    return De(
      ee(e) ? e.call(this, this) : e,
      ee(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ku(e, t) {
  return ts(Bo(e), Bo(t));
}
function Bo(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function We(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ts(e, t) {
  return e ? De(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ni(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : De(
    /* @__PURE__ */ Object.create(null),
    Zr(e),
    Zr(t ?? {})
  ) : t;
}
function zu(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = De(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = We(e[s], t[s]);
  return n;
}
function Xl() {
  return {
    app: null,
    config: {
      isNativeTag: ol,
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
let qu = 0;
function Ju(e, t) {
  return function(s, o = null) {
    ee(s) || (s = De({}, s)), o != null && !de(o) && (process.env.NODE_ENV !== "production" && j("root props passed to app.mount() must be an object."), o = null);
    const r = Xl(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = r.app = {
      _uid: qu++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: pi,
      get config() {
        return r.config;
      },
      set config(p) {
        process.env.NODE_ENV !== "production" && j(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(p, ...u) {
        return i.has(p) ? process.env.NODE_ENV !== "production" && j("Plugin has already been applied to target app.") : p && ee(p.install) ? (i.add(p), p.install(f, ...u)) : ee(p) ? (i.add(p), p(f, ...u)) : process.env.NODE_ENV !== "production" && j(
          'A plugin must either be a function or an object with an "install" function.'
        ), f;
      },
      mixin(p) {
        return r.mixins.includes(p) ? process.env.NODE_ENV !== "production" && j(
          "Mixin has already been applied to target app" + (p.name ? `: ${p.name}` : "")
        ) : r.mixins.push(p), f;
      },
      component(p, u) {
        return process.env.NODE_ENV !== "production" && qo(p, r.config), u ? (process.env.NODE_ENV !== "production" && r.components[p] && j(`Component "${p}" has already been registered in target app.`), r.components[p] = u, f) : r.components[p];
      },
      directive(p, u) {
        return process.env.NODE_ENV !== "production" && Bl(p), u ? (process.env.NODE_ENV !== "production" && r.directives[p] && j(`Directive "${p}" has already been registered in target app.`), r.directives[p] = u, f) : r.directives[p];
      },
      mount(p, u, m) {
        if (a)
          process.env.NODE_ENV !== "production" && j(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && p.__vue_app__ && j(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const b = f._ceVNode || Z(s, o);
          return b.appContext = r, m === !0 ? m = "svg" : m === !1 && (m = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const T = rn(b);
            T.el = null, e(T, p, m);
          }), e(b, p, m), a = !0, f._container = p, p.__vue_app__ = f, process.env.NODE_ENV !== "production" && (f._instance = b.component, du(f, pi)), vo(b.component);
        }
      },
      onUnmount(p) {
        process.env.NODE_ENV !== "production" && typeof p != "function" && j(
          `Expected function as first argument to app.onUnmount(), but got ${typeof p}`
        ), l.push(p);
      },
      unmount() {
        a ? (Pt(
          l,
          f._instance,
          16
        ), e(null, f._container), process.env.NODE_ENV !== "production" && (f._instance = null, fu(f)), delete f._container.__vue_app__) : process.env.NODE_ENV !== "production" && j("Cannot unmount an app that is not mounted.");
      },
      provide(p, u) {
        return process.env.NODE_ENV !== "production" && p in r.provides && (pe(r.provides, p) ? j(
          `App already provides property with key "${String(p)}". It will be overwritten with the new value.`
        ) : j(
          `App already provides property with key "${String(p)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[p] = u, f;
      },
      runWithContext(p) {
        const u = wn;
        wn = f;
        try {
          return p();
        } finally {
          wn = u;
        }
      }
    };
    return f;
  };
}
let wn = null;
const Yu = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Xe(t)}Modifiers`] || e[`${nn(t)}Modifiers`];
function Qu(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || be;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: p,
      propsOptions: [u]
    } = e;
    if (p)
      if (!(t in p))
        (!u || !(pn(Xe(t)) in u)) && j(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${pn(Xe(t))}" prop.`
        );
      else {
        const m = p[t];
        ee(m) && (m(...n) || j(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let o = n;
  const r = t.startsWith("update:"), i = r && Yu(s, t.slice(7));
  if (i && (i.trim && (o = n.map((p) => Oe(p) ? p.trim() : p)), i.number && (o = n.map(uo))), process.env.NODE_ENV !== "production" && vu(e, t, o), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && s[pn(p)] && j(
      `Event "${p}" is emitted in component ${Ns(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${nn(
        t
      )}" instead of "${t}".`
    );
  }
  let l, a = s[l = pn(t)] || // also try camelCase event handler (#2249)
  s[l = pn(Xe(t))];
  !a && r && (a = s[l = pn(nn(t))]), a && Pt(
    a,
    e,
    6,
    o
  );
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Pt(
      f,
      e,
      6,
      o
    );
  }
}
const Xu = /* @__PURE__ */ new WeakMap();
function Zl(e, t, n = !1) {
  const s = n ? Xu : t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, l = !1;
  if (!ee(e)) {
    const a = (f) => {
      const p = Zl(f, t, !0);
      p && (l = !0, De(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !r && !l ? (de(e) && s.set(e, null), null) : (q(r) ? r.forEach((a) => i[a] = null) : De(i, r), de(e) && s.set(e, i), i);
}
function _o(e, t) {
  return !e || !ms(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), pe(e, t[0].toLowerCase() + t.slice(1)) || pe(e, nn(t)) || pe(e, t));
}
let Go = !1;
function eo() {
  Go = !0;
}
function si(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: a,
    render: f,
    renderCache: p,
    props: u,
    data: m,
    setupState: b,
    ctx: T,
    inheritAttrs: $
  } = e, K = Qs(e);
  let F, A;
  process.env.NODE_ENV !== "production" && (Go = !1);
  try {
    if (n.shapeFlag & 4) {
      const O = o || s, S = process.env.NODE_ENV !== "production" && b.__isScriptSetup ? new Proxy(O, {
        get(v, E, N) {
          return j(
            `Property '${String(
              E
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(v, E, N);
        }
      }) : O;
      F = ct(
        f.call(
          S,
          O,
          p,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(u) : u,
          b,
          m,
          T
        )
      ), A = l;
    } else {
      const O = t;
      process.env.NODE_ENV !== "production" && l === u && eo(), F = ct(
        O.length > 1 ? O(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(u) : u,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return eo(), /* @__PURE__ */ Ct(l);
            },
            slots: i,
            emit: a
          } : { attrs: l, slots: i, emit: a }
        ) : O(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(u) : u,
          null
        )
      ), A = t.props ? l : Zu(l);
    }
  } catch (O) {
    ls.length = 0, bs(O, e, 1), F = Z(Ze);
  }
  let I = F, te;
  if (process.env.NODE_ENV !== "production" && F.patchFlag > 0 && F.patchFlag & 2048 && ([I, te] = ea(F)), A && $ !== !1) {
    const O = Object.keys(A), { shapeFlag: S } = I;
    if (O.length) {
      if (S & 7)
        r && O.some(Ws) && (A = ed(
          A,
          r
        )), I = rn(I, A, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !Go && I.type !== Ze) {
        const v = Object.keys(l), E = [], N = [];
        for (let M = 0, C = v.length; M < C; M++) {
          const z = v[M];
          ms(z) ? Ws(z) || E.push(z[2].toLowerCase() + z.slice(3)) : N.push(z);
        }
        N.length && j(
          `Extraneous non-props attributes (${N.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), E.length && j(
          `Extraneous non-emits event listeners (${E.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !oi(I) && j(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), I = rn(I, null, !1, !0), I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !oi(I) && j(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), wr(I, n.transition)), process.env.NODE_ENV !== "production" && te ? te(I) : F = I, Qs(K), F;
}
const ea = (e) => {
  const t = e.children, n = e.dynamicChildren, s = kr(t, !1);
  if (s) {
    if (process.env.NODE_ENV !== "production" && s.patchFlag > 0 && s.patchFlag & 2048)
      return ea(s);
  } else return [e, void 0];
  const o = t.indexOf(s), r = n ? n.indexOf(s) : -1, i = (l) => {
    t[o] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [ct(s), i];
};
function kr(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    if (On(o)) {
      if (o.type !== Ze || o.children === "v-if") {
        if (n)
          return;
        if (n = o, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return kr(n.children);
      }
    } else
      return;
  }
  return n;
}
const Zu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ms(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ed = (e, t) => {
  const n = {};
  for (const s in e)
    (!Ws(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
}, oi = (e) => e.shapeFlag & 7 || e.type === Ze;
function td(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: i, children: l, patchFlag: a } = t, f = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (o || l) && Dt || t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? ri(s, i, f) : !!i;
    if (a & 8) {
      const p = t.dynamicProps;
      for (let u = 0; u < p.length; u++) {
        const m = p[u];
        if (ta(i, s, m) && !_o(f, m))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? ri(s, i, f) : !0 : !!i;
  return !1;
}
function ri(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (ta(t, e, r) && !_o(n, r))
      return !0;
  }
  return !1;
}
function ta(e, t, n) {
  const s = e[n], o = t[n];
  return n === "style" && de(s) && de(o) ? !sn(s, o) : s !== o;
}
function nd({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const na = {}, sa = () => Object.create(na), oa = (e) => Object.getPrototypeOf(e) === na;
function sd(e, t, n, s = !1) {
  const o = {}, r = sa();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ra(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  process.env.NODE_ENV !== "production" && la(t || {}, o, e), n ? e.props = s ? o : /* @__PURE__ */ Dl(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function od(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function rd(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ ne(o), [a] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && od(e)) && (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let u = 0; u < p.length; u++) {
        let m = p[u];
        if (_o(e.emitsOptions, m))
          continue;
        const b = t[m];
        if (a)
          if (pe(r, m))
            b !== r[m] && (r[m] = b, f = !0);
          else {
            const T = Xe(m);
            o[T] = Wo(
              a,
              l,
              T,
              b,
              e,
              !1
            );
          }
        else
          b !== r[m] && (r[m] = b, f = !0);
      }
    }
  } else {
    ra(e, t, o, r) && (f = !0);
    let p;
    for (const u in l)
      (!t || // for camelCase
      !pe(t, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = nn(u)) === u || !pe(t, p))) && (a ? n && // for camelCase
      (n[u] !== void 0 || // for kebab-case
      n[p] !== void 0) && (o[u] = Wo(
        a,
        l,
        u,
        void 0,
        e,
        !0
      )) : delete o[u]);
    if (r !== l)
      for (const u in r)
        (!t || !pe(t, u)) && (delete r[u], f = !0);
  }
  f && $t(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && la(t || {}, o, e);
}
function ra(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (ss(a))
        continue;
      const f = t[a];
      let p;
      o && pe(o, p = Xe(a)) ? !r || !r.includes(p) ? n[p] = f : (l || (l = {}))[p] = f : _o(e.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, i = !0);
    }
  if (r) {
    const a = /* @__PURE__ */ ne(n), f = l || be;
    for (let p = 0; p < r.length; p++) {
      const u = r[p];
      n[u] = Wo(
        o,
        a,
        u,
        f[u],
        e,
        !pe(f, u)
      );
    }
  }
  return i;
}
function Wo(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = pe(i, "default");
    if (l && s === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && ee(a)) {
        const { propsDefaults: f } = o;
        if (n in f)
          s = f[n];
        else {
          const p = ws(o);
          s = f[n] = a.call(
            null,
            t
          ), p();
        }
      } else
        s = a;
      o.ce && o.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === nn(n)) && (s = !0));
  }
  return s;
}
const id = /* @__PURE__ */ new WeakMap();
function ia(e, t, n = !1) {
  const s = n ? id : t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, l = [];
  let a = !1;
  if (!ee(e)) {
    const p = (u) => {
      a = !0;
      const [m, b] = ia(u, t, !0);
      De(i, m), b && l.push(...b);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !a)
    return de(e) && s.set(e, Rn), Rn;
  if (q(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !Oe(r[p]) && j("props must be strings when using array syntax.", r[p]);
      const u = Xe(r[p]);
      ii(u) && (i[u] = be);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !de(r) && j("invalid props options", r);
    for (const p in r) {
      const u = Xe(p);
      if (ii(u)) {
        const m = r[p], b = i[u] = q(m) || ee(m) ? { type: m } : De({}, m), T = b.type;
        let $ = !1, K = !0;
        if (q(T))
          for (let F = 0; F < T.length; ++F) {
            const A = T[F], I = ee(A) && A.name;
            if (I === "Boolean") {
              $ = !0;
              break;
            } else I === "String" && (K = !1);
          }
        else
          $ = ee(T) && T.name === "Boolean";
        b[
          0
          /* shouldCast */
        ] = $, b[
          1
          /* shouldCastTrue */
        ] = K, ($ || pe(b, "default")) && l.push(u);
      }
    }
  }
  const f = [i, l];
  return de(e) && s.set(e, f), f;
}
function ii(e) {
  return e[0] !== "$" && !ss(e) ? !0 : (process.env.NODE_ENV !== "production" && j(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function ld(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function la(e, t, n) {
  const s = /* @__PURE__ */ ne(t), o = n.propsOptions[0], r = Object.keys(e).map((i) => Xe(i));
  for (const i in o) {
    let l = o[i];
    l != null && ad(
      i,
      s[i],
      l,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(s) : s,
      !r.includes(i)
    );
  }
}
function ad(e, t, n, s, o) {
  const { type: r, required: i, validator: l, skipCheck: a } = n;
  if (i && o) {
    j('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !a) {
      let f = !1;
      const p = q(r) ? r : [r], u = [];
      for (let m = 0; m < p.length && !f; m++) {
        const { valid: b, expectedType: T } = ud(t, p[m]);
        u.push(T || ""), f = b;
      }
      if (!f) {
        j(dd(e, t, u));
        return;
      }
    }
    l && !l(t, s) && j('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const cd = /* @__PURE__ */ Bt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function ud(e, t) {
  let n;
  const s = ld(t);
  if (s === "null")
    n = e === null;
  else if (cd(s)) {
    const o = typeof e;
    n = o === s.toLowerCase(), !n && o === "object" && (n = e instanceof t);
  } else s === "Object" ? n = de(e) : s === "Array" ? n = q(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: s
  };
}
function dd(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let s = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(co).join(" | ")}`;
  const o = n[0], r = ur(t), i = li(t, o), l = li(t, r);
  return n.length === 1 && ai(o) && !fd(o, r) && (s += ` with value ${i}`), s += `, got ${r} `, ai(r) && (s += `with value ${l}.`), s;
}
function li(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function ai(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function fd(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const $r = (e) => e === "_" || e === "_ctx" || e === "$stable", Cr = (e) => q(e) ? e.map(ct) : [ct(e)], pd = (e, t, n) => {
  if (t._n)
    return t;
  const s = he((...o) => (process.env.NODE_ENV !== "production" && Ae && !(n === null && Me) && !(n && n.root !== Ae.root) && j(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Cr(t(...o))), n);
  return s._c = !1, s;
}, aa = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if ($r(o)) continue;
    const r = e[o];
    if (ee(r))
      t[o] = pd(o, r, s);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && j(
        `Non-function value encountered for slot "${o}". Prefer function slots for better performance.`
      );
      const i = Cr(r);
      t[o] = () => i;
    }
  }
}, ca = (e, t) => {
  process.env.NODE_ENV !== "production" && !Nr(e.vnode) && j(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Cr(t);
  e.slots.default = () => n;
}, Ko = (e, t, n) => {
  for (const s in t)
    (n || !$r(s)) && (e[s] = t[s]);
}, hd = (e, t, n) => {
  const s = e.slots = sa();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Ko(s, t, n), n && Ks(s, "_", o, !0)) : aa(t, s);
  } else t && ca(e, t);
}, gd = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = be;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Dt ? (Ko(o, t, n), $t(e, "set", "$slots")) : n && l === 1 ? r = !1 : Ko(o, t, n) : (r = !t.$stable, aa(t, o)), i = t;
  } else t && (ca(e, t), i = { default: 1 });
  if (r)
    for (const l in o)
      !$r(l) && i[l] == null && delete o[l];
};
let Yn, Mt;
function $n(e, t) {
  e.appContext.config.performance && to() && Mt.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && mu(e, t, to() ? Mt.now() : Date.now());
}
function Cn(e, t) {
  if (e.appContext.config.performance && to()) {
    const n = `vue-${t}-${e.uid}`, s = n + ":end", o = `<${Ns(e, e.type)}> ${t}`;
    Mt.mark(s), Mt.measure(o, n, s), Mt.clearMeasures(o), Mt.clearMarks(n), Mt.clearMarks(s);
  }
  process.env.NODE_ENV !== "production" && _u(e, t, to() ? Mt.now() : Date.now());
}
function to() {
  return Yn !== void 0 || (typeof window < "u" && window.performance ? (Yn = !0, Mt = window.performance) : Yn = !1), Yn;
}
function md() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Qe = Ed;
function _d(e) {
  return vd(e);
}
function vd(e, t) {
  md();
  const n = vs();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && br(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: s,
    remove: o,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: a,
    setText: f,
    setElementText: p,
    parentNode: u,
    nextSibling: m,
    setScopeId: b = Ie,
    insertStaticContent: T
  } = e, $ = (h, _, y, x = null, k = null, P = null, H = void 0, U = null, L = process.env.NODE_ENV !== "production" && Dt ? !1 : !!_.dynamicChildren) => {
    if (h === _)
      return;
    h && !Qn(h, _) && (x = W(h), ot(h, k, P, !0), h = null), _.patchFlag === -2 && (L = !1, _.dynamicChildren = null);
    const { type: R, ref: Q, shapeFlag: B } = _;
    switch (R) {
      case Es:
        K(h, _, y, x);
        break;
      case Ze:
        F(h, _, y, x);
        break;
      case Ls:
        h == null ? A(_, y, x, H) : process.env.NODE_ENV !== "production" && I(h, _, y, H);
        break;
      case X:
        ae(
          h,
          _,
          y,
          x,
          k,
          P,
          H,
          U,
          L
        );
        break;
      default:
        B & 1 ? S(
          h,
          _,
          y,
          x,
          k,
          P,
          H,
          U,
          L
        ) : B & 6 ? je(
          h,
          _,
          y,
          x,
          k,
          P,
          H,
          U,
          L
        ) : B & 64 || B & 128 ? R.process(
          h,
          _,
          y,
          x,
          k,
          P,
          H,
          U,
          L,
          se
        ) : process.env.NODE_ENV !== "production" && j("Invalid VNode type:", R, `(${typeof R})`);
    }
    Q != null && k ? is(Q, h && h.ref, P, _ || h, !_) : Q == null && h && h.ref != null && is(h.ref, null, P, h, !0);
  }, K = (h, _, y, x) => {
    if (h == null)
      s(
        _.el = l(_.children),
        y,
        x
      );
    else {
      const k = _.el = h.el;
      _.children !== h.children && f(k, _.children);
    }
  }, F = (h, _, y, x) => {
    h == null ? s(
      _.el = a(_.children || ""),
      y,
      x
    ) : _.el = h.el;
  }, A = (h, _, y, x) => {
    [h.el, h.anchor] = T(
      h.children,
      _,
      y,
      x,
      h.el,
      h.anchor
    );
  }, I = (h, _, y, x) => {
    if (_.children !== h.children) {
      const k = m(h.anchor);
      O(h), [_.el, _.anchor] = T(
        _.children,
        y,
        k,
        x
      );
    } else
      _.el = h.el, _.anchor = h.anchor;
  }, te = ({ el: h, anchor: _ }, y, x) => {
    let k;
    for (; h && h !== _; )
      k = m(h), s(h, y, x), h = k;
    s(_, y, x);
  }, O = ({ el: h, anchor: _ }) => {
    let y;
    for (; h && h !== _; )
      y = m(h), o(h), h = y;
    o(_);
  }, S = (h, _, y, x, k, P, H, U, L) => {
    if (_.type === "svg" ? H = "svg" : _.type === "math" && (H = "mathml"), h == null)
      v(
        _,
        y,
        x,
        k,
        P,
        H,
        U,
        L
      );
    else {
      const R = h.el && h.el._isVueCE ? h.el : null;
      try {
        R && R._beginPatch(), M(
          h,
          _,
          k,
          P,
          H,
          U,
          L
        );
      } finally {
        R && R._endPatch();
      }
    }
  }, v = (h, _, y, x, k, P, H, U) => {
    let L, R;
    const { props: Q, shapeFlag: B, transition: J, dirs: re } = h;
    if (L = h.el = i(
      h.type,
      P,
      Q && Q.is,
      Q
    ), B & 8 ? p(L, h.children) : B & 16 && N(
      h.children,
      L,
      null,
      x,
      k,
      $o(h, P),
      H,
      U
    ), re && un(h, null, x, "created"), E(L, h, h.scopeId, H, x), Q) {
      for (const we in Q)
        we !== "value" && !ss(we) && r(L, we, null, Q[we], P, x);
      "value" in Q && r(L, "value", null, Q.value, P), (R = Q.onVnodeBeforeMount) && wt(R, x, h);
    }
    process.env.NODE_ENV !== "production" && (Ks(L, "__vnode", h, !0), Ks(L, "__vueParentComponent", x, !0)), re && un(h, null, x, "beforeMount");
    const fe = bd(k, J);
    fe && J.beforeEnter(L), s(L, _, y), ((R = Q && Q.onVnodeMounted) || fe || re) && Qe(() => {
      R && wt(R, x, h), fe && J.enter(L), re && un(h, null, x, "mounted");
    }, k);
  }, E = (h, _, y, x, k) => {
    if (y && b(h, y), x)
      for (let P = 0; P < x.length; P++)
        b(h, x[P]);
    if (k) {
      let P = k.subTree;
      if (process.env.NODE_ENV !== "production" && P.patchFlag > 0 && P.patchFlag & 2048 && (P = kr(P.children) || P), _ === P || fa(P.type) && (P.ssContent === _ || P.ssFallback === _)) {
        const H = k.vnode;
        E(
          h,
          H,
          H.scopeId,
          H.slotScopeIds,
          k.parent
        );
      }
    }
  }, N = (h, _, y, x, k, P, H, U, L = 0) => {
    for (let R = L; R < h.length; R++) {
      const Q = h[R] = U ? Lt(h[R]) : ct(h[R]);
      $(
        null,
        Q,
        _,
        y,
        x,
        k,
        P,
        H,
        U
      );
    }
  }, M = (h, _, y, x, k, P, H) => {
    const U = _.el = h.el;
    process.env.NODE_ENV !== "production" && (U.__vnode = _);
    let { patchFlag: L, dynamicChildren: R, dirs: Q } = _;
    L |= h.patchFlag & 16;
    const B = h.props || be, J = _.props || be;
    let re;
    if (y && dn(y, !1), (re = J.onVnodeBeforeUpdate) && wt(re, y, _, h), Q && un(_, h, y, "beforeUpdate"), y && dn(y, !0), process.env.NODE_ENV !== "production" && Dt && (L = 0, H = !1, R = null), (B.innerHTML && J.innerHTML == null || B.textContent && J.textContent == null) && p(U, ""), R ? (C(
      h.dynamicChildren,
      R,
      U,
      y,
      x,
      $o(_, k),
      P
    ), process.env.NODE_ENV !== "production" && Ms(h, _)) : H || Ne(
      h,
      _,
      U,
      null,
      y,
      x,
      $o(_, k),
      P,
      !1
    ), L > 0) {
      if (L & 16)
        z(U, B, J, y, k);
      else if (L & 2 && B.class !== J.class && r(U, "class", null, J.class, k), L & 4 && r(U, "style", B.style, J.style, k), L & 8) {
        const fe = _.dynamicProps;
        for (let we = 0; we < fe.length; we++) {
          const ye = fe[we], Je = B[ye], Ye = J[ye];
          (Ye !== Je || ye === "value") && r(U, ye, Je, Ye, k, y);
        }
      }
      L & 1 && h.children !== _.children && p(U, _.children);
    } else !H && R == null && z(U, B, J, y, k);
    ((re = J.onVnodeUpdated) || Q) && Qe(() => {
      re && wt(re, y, _, h), Q && un(_, h, y, "updated");
    }, x);
  }, C = (h, _, y, x, k, P, H) => {
    for (let U = 0; U < _.length; U++) {
      const L = h[U], R = _[U], Q = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        L.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (L.type === X || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Qn(L, R) || // - In the case of a component, it could contain anything.
        L.shapeFlag & 198) ? u(L.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      $(
        L,
        R,
        Q,
        null,
        x,
        k,
        P,
        H,
        !0
      );
    }
  }, z = (h, _, y, x, k) => {
    if (_ !== y) {
      if (_ !== be)
        for (const P in _)
          !ss(P) && !(P in y) && r(
            h,
            P,
            _[P],
            null,
            k,
            x
          );
      for (const P in y) {
        if (ss(P)) continue;
        const H = y[P], U = _[P];
        H !== U && P !== "value" && r(h, P, U, H, k, x);
      }
      "value" in y && r(h, "value", _.value, y.value, k);
    }
  }, ae = (h, _, y, x, k, P, H, U, L) => {
    const R = _.el = h ? h.el : l(""), Q = _.anchor = h ? h.anchor : l("");
    let { patchFlag: B, dynamicChildren: J, slotScopeIds: re } = _;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Dt || B & 2048) && (B = 0, L = !1, J = null), re && (U = U ? U.concat(re) : re), h == null ? (s(R, y, x), s(Q, y, x), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      _.children || [],
      y,
      Q,
      k,
      P,
      H,
      U,
      L
    )) : B > 0 && B & 64 && J && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren && h.dynamicChildren.length === J.length ? (C(
      h.dynamicChildren,
      J,
      y,
      k,
      P,
      H,
      U
    ), process.env.NODE_ENV !== "production" ? Ms(h, _) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (_.key != null || k && _ === k.subTree) && Ms(
        h,
        _,
        !0
        /* shallow */
      )
    )) : Ne(
      h,
      _,
      y,
      Q,
      k,
      P,
      H,
      U,
      L
    );
  }, je = (h, _, y, x, k, P, H, U, L) => {
    _.slotScopeIds = U, h == null ? _.shapeFlag & 512 ? k.ctx.activate(
      _,
      y,
      x,
      H,
      L
    ) : Pe(
      _,
      y,
      x,
      k,
      P,
      H,
      L
    ) : ce(h, _, L);
  }, Pe = (h, _, y, x, k, P, H) => {
    const U = h.component = Cd(
      h,
      x,
      k
    );
    if (process.env.NODE_ENV !== "production" && U.type.__hmrId && lu(U), process.env.NODE_ENV !== "production" && (Vs(h), $n(U, "mount")), Nr(h) && (U.ctx.renderer = se), process.env.NODE_ENV !== "production" && $n(U, "init"), xd(U, !1, H), process.env.NODE_ENV !== "production" && Cn(U, "init"), process.env.NODE_ENV !== "production" && Dt && (h.el = null), U.asyncDep) {
      if (k && k.registerDep(U, ie, H), !h.el) {
        const L = U.subTree = Z(Ze);
        F(null, L, _, y), h.placeholder = L.el;
      }
    } else
      ie(
        U,
        h,
        _,
        y,
        k,
        P,
        H
      );
    process.env.NODE_ENV !== "production" && (As(), Cn(U, "mount"));
  }, ce = (h, _, y) => {
    const x = _.component = h.component;
    if (td(h, _, y))
      if (x.asyncDep && !x.asyncResolved) {
        process.env.NODE_ENV !== "production" && Vs(_), oe(x, _, y), process.env.NODE_ENV !== "production" && As();
        return;
      } else
        x.next = _, x.update();
    else
      _.el = h.el, x.vnode = _;
  }, ie = (h, _, y, x, k, P, H) => {
    const U = () => {
      if (h.isMounted) {
        let { next: B, bu: J, u: re, parent: fe, vnode: we } = h;
        {
          const yt = ua(h);
          if (yt) {
            B && (B.el = we.el, oe(h, B, H)), yt.asyncDep.then(() => {
              Qe(() => {
                h.isUnmounted || R();
              }, k);
            });
            return;
          }
        }
        let ye = B, Je;
        process.env.NODE_ENV !== "production" && Vs(B || h.vnode), dn(h, !1), B ? (B.el = we.el, oe(h, B, H)) : B = we, J && Pn(J), (Je = B.props && B.props.onVnodeBeforeUpdate) && wt(Je, fe, B, we), dn(h, !0), process.env.NODE_ENV !== "production" && $n(h, "render");
        const Ye = si(h);
        process.env.NODE_ENV !== "production" && Cn(h, "render");
        const bt = h.subTree;
        h.subTree = Ye, process.env.NODE_ENV !== "production" && $n(h, "patch"), $(
          bt,
          Ye,
          // parent may have changed if it's in a teleport
          u(bt.el),
          // anchor may have changed if it's in a fragment
          W(bt),
          h,
          k,
          P
        ), process.env.NODE_ENV !== "production" && Cn(h, "patch"), B.el = Ye.el, ye === null && nd(h, Ye.el), re && Qe(re, k), (Je = B.props && B.props.onVnodeUpdated) && Qe(
          () => wt(Je, fe, B, we),
          k
        ), process.env.NODE_ENV !== "production" && Fl(h), process.env.NODE_ENV !== "production" && As();
      } else {
        let B;
        const { el: J, props: re } = _, { bm: fe, m: we, parent: ye, root: Je, type: Ye } = h, bt = Mn(_);
        dn(h, !1), fe && Pn(fe), !bt && (B = re && re.onVnodeBeforeMount) && wt(B, ye, _), dn(h, !0);
        {
          Je.ce && Je.ce._hasShadowRoot() && Je.ce._injectChildStyle(
            Ye,
            h.parent ? h.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && $n(h, "render");
          const yt = h.subTree = si(h);
          process.env.NODE_ENV !== "production" && Cn(h, "render"), process.env.NODE_ENV !== "production" && $n(h, "patch"), $(
            null,
            yt,
            y,
            x,
            h,
            k,
            P
          ), process.env.NODE_ENV !== "production" && Cn(h, "patch"), _.el = yt.el;
        }
        if (we && Qe(we, k), !bt && (B = re && re.onVnodeMounted)) {
          const yt = _;
          Qe(
            () => wt(B, ye, yt),
            k
          );
        }
        (_.shapeFlag & 256 || ye && Mn(ye.vnode) && ye.vnode.shapeFlag & 256) && h.a && Qe(h.a, k), h.isMounted = !0, process.env.NODE_ENV !== "production" && pu(h), _ = y = x = null;
      }
    };
    h.scope.on();
    const L = h.effect = new pl(U);
    h.scope.off();
    const R = h.update = L.run.bind(L), Q = h.job = L.runIfDirty.bind(L);
    Q.i = h, Q.id = h.uid, L.scheduler = () => go(Q), dn(h, !0), process.env.NODE_ENV !== "production" && (L.onTrack = h.rtc ? (B) => Pn(h.rtc, B) : void 0, L.onTrigger = h.rtg ? (B) => Pn(h.rtg, B) : void 0), R();
  }, oe = (h, _, y) => {
    _.component = h;
    const x = h.vnode.props;
    h.vnode = _, h.next = null, rd(h, _.props, x, y), gd(h, _.children, y), ht(), zr(h), gt();
  }, Ne = (h, _, y, x, k, P, H, U, L = !1) => {
    const R = h && h.children, Q = h ? h.shapeFlag : 0, B = _.children, { patchFlag: J, shapeFlag: re } = _;
    if (J > 0) {
      if (J & 128) {
        Kt(
          R,
          B,
          y,
          x,
          k,
          P,
          H,
          U,
          L
        );
        return;
      } else if (J & 256) {
        cn(
          R,
          B,
          y,
          x,
          k,
          P,
          H,
          U,
          L
        );
        return;
      }
    }
    re & 8 ? (Q & 16 && w(R, k, P), B !== R && p(y, B)) : Q & 16 ? re & 16 ? Kt(
      R,
      B,
      y,
      x,
      k,
      P,
      H,
      U,
      L
    ) : w(R, k, P, !0) : (Q & 8 && p(y, ""), re & 16 && N(
      B,
      y,
      x,
      k,
      P,
      H,
      U,
      L
    ));
  }, cn = (h, _, y, x, k, P, H, U, L) => {
    h = h || Rn, _ = _ || Rn;
    const R = h.length, Q = _.length, B = Math.min(R, Q);
    let J;
    for (J = 0; J < B; J++) {
      const re = _[J] = L ? Lt(_[J]) : ct(_[J]);
      $(
        h[J],
        re,
        y,
        null,
        k,
        P,
        H,
        U,
        L
      );
    }
    R > Q ? w(
      h,
      k,
      P,
      !0,
      !1,
      B
    ) : N(
      _,
      y,
      x,
      k,
      P,
      H,
      U,
      L,
      B
    );
  }, Kt = (h, _, y, x, k, P, H, U, L) => {
    let R = 0;
    const Q = _.length;
    let B = h.length - 1, J = Q - 1;
    for (; R <= B && R <= J; ) {
      const re = h[R], fe = _[R] = L ? Lt(_[R]) : ct(_[R]);
      if (Qn(re, fe))
        $(
          re,
          fe,
          y,
          null,
          k,
          P,
          H,
          U,
          L
        );
      else
        break;
      R++;
    }
    for (; R <= B && R <= J; ) {
      const re = h[B], fe = _[J] = L ? Lt(_[J]) : ct(_[J]);
      if (Qn(re, fe))
        $(
          re,
          fe,
          y,
          null,
          k,
          P,
          H,
          U,
          L
        );
      else
        break;
      B--, J--;
    }
    if (R > B) {
      if (R <= J) {
        const re = J + 1, fe = re < Q ? _[re].el : x;
        for (; R <= J; )
          $(
            null,
            _[R] = L ? Lt(_[R]) : ct(_[R]),
            y,
            fe,
            k,
            P,
            H,
            U,
            L
          ), R++;
      }
    } else if (R > J)
      for (; R <= B; )
        ot(h[R], k, P, !0), R++;
    else {
      const re = R, fe = R, we = /* @__PURE__ */ new Map();
      for (R = fe; R <= J; R++) {
        const Ge = _[R] = L ? Lt(_[R]) : ct(_[R]);
        Ge.key != null && (process.env.NODE_ENV !== "production" && we.has(Ge.key) && j(
          "Duplicate keys found during update:",
          JSON.stringify(Ge.key),
          "Make sure keys are unique."
        ), we.set(Ge.key, R));
      }
      let ye, Je = 0;
      const Ye = J - fe + 1;
      let bt = !1, yt = 0;
      const qn = new Array(Ye);
      for (R = 0; R < Ye; R++) qn[R] = 0;
      for (R = re; R <= B; R++) {
        const Ge = h[R];
        if (Je >= Ye) {
          ot(Ge, k, P, !0);
          continue;
        }
        let Et;
        if (Ge.key != null)
          Et = we.get(Ge.key);
        else
          for (ye = fe; ye <= J; ye++)
            if (qn[ye - fe] === 0 && Qn(Ge, _[ye])) {
              Et = ye;
              break;
            }
        Et === void 0 ? ot(Ge, k, P, !0) : (qn[Et - fe] = R + 1, Et >= yt ? yt = Et : bt = !0, $(
          Ge,
          _[Et],
          y,
          null,
          k,
          P,
          H,
          U,
          L
        ), Je++);
      }
      const Lr = bt ? yd(qn) : Rn;
      for (ye = Lr.length - 1, R = Ye - 1; R >= 0; R--) {
        const Ge = fe + R, Et = _[Ge], jr = _[Ge + 1], Fr = Ge + 1 < Q ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          jr.el || da(jr)
        ) : x;
        qn[R] === 0 ? $(
          null,
          Et,
          y,
          Fr,
          k,
          P,
          H,
          U,
          L
        ) : bt && (ye < 0 || R !== Lr[ye] ? vt(Et, y, Fr, 2) : ye--);
      }
    }
  }, vt = (h, _, y, x, k = null) => {
    const { el: P, type: H, transition: U, children: L, shapeFlag: R } = h;
    if (R & 6) {
      vt(h.component.subTree, _, y, x);
      return;
    }
    if (R & 128) {
      h.suspense.move(_, y, x);
      return;
    }
    if (R & 64) {
      H.move(h, _, y, se);
      return;
    }
    if (H === X) {
      s(P, _, y);
      for (let B = 0; B < L.length; B++)
        vt(L[B], _, y, x);
      s(h.anchor, _, y);
      return;
    }
    if (H === Ls) {
      te(h, _, y);
      return;
    }
    if (x !== 2 && R & 1 && U)
      if (x === 0)
        U.beforeEnter(P), s(P, _, y), Qe(() => U.enter(P), k);
      else {
        const { leave: B, delayLeave: J, afterLeave: re } = U, fe = () => {
          h.ctx.isUnmounted ? o(P) : s(P, _, y);
        }, we = () => {
          P._isLeaving && P[ku](
            !0
            /* cancelled */
          ), B(P, () => {
            fe(), re && re();
          });
        };
        J ? J(P, fe, we) : we();
      }
    else
      s(P, _, y);
  }, ot = (h, _, y, x = !1, k = !1) => {
    const {
      type: P,
      props: H,
      ref: U,
      children: L,
      dynamicChildren: R,
      shapeFlag: Q,
      patchFlag: B,
      dirs: J,
      cacheIndex: re
    } = h;
    if (B === -2 && (k = !1), U != null && (ht(), is(U, null, y, h, !0), gt()), re != null && (_.renderCache[re] = void 0), Q & 256) {
      _.ctx.deactivate(h);
      return;
    }
    const fe = Q & 1 && J, we = !Mn(h);
    let ye;
    if (we && (ye = H && H.onVnodeBeforeUnmount) && wt(ye, _, h), Q & 6)
      Jt(h.component, y, x);
    else {
      if (Q & 128) {
        h.suspense.unmount(y, x);
        return;
      }
      fe && un(h, null, _, "beforeUnmount"), Q & 64 ? h.type.remove(
        h,
        _,
        y,
        se,
        x
      ) : R && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !R.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (P !== X || B > 0 && B & 64) ? w(
        R,
        _,
        y,
        !1,
        !0
      ) : (P === X && B & 384 || !k && Q & 16) && w(L, _, y), x && zt(h);
    }
    (we && (ye = H && H.onVnodeUnmounted) || fe) && Qe(() => {
      ye && wt(ye, _, h), fe && un(h, null, _, "unmounted");
    }, y);
  }, zt = (h) => {
    const { type: _, el: y, anchor: x, transition: k } = h;
    if (_ === X) {
      process.env.NODE_ENV !== "production" && h.patchFlag > 0 && h.patchFlag & 2048 && k && !k.persisted ? h.children.forEach((H) => {
        H.type === Ze ? o(H.el) : zt(H);
      }) : qt(y, x);
      return;
    }
    if (_ === Ls) {
      O(h);
      return;
    }
    const P = () => {
      o(y), k && !k.persisted && k.afterLeave && k.afterLeave();
    };
    if (h.shapeFlag & 1 && k && !k.persisted) {
      const { leave: H, delayLeave: U } = k, L = () => H(y, P);
      U ? U(h.el, P, L) : L();
    } else
      P();
  }, qt = (h, _) => {
    let y;
    for (; h !== _; )
      y = m(h), o(h), h = y;
    o(_);
  }, Jt = (h, _, y) => {
    process.env.NODE_ENV !== "production" && h.type.__hmrId && au(h);
    const { bum: x, scope: k, job: P, subTree: H, um: U, m: L, a: R } = h;
    ci(L), ci(R), x && Pn(x), k.stop(), P && (P.flags |= 8, ot(H, h, _, y)), U && Qe(U, _), Qe(() => {
      h.isUnmounted = !0;
    }, _), process.env.NODE_ENV !== "production" && gu(h);
  }, w = (h, _, y, x = !1, k = !1, P = 0) => {
    for (let H = P; H < h.length; H++)
      ot(h[H], _, y, x, k);
  }, W = (h) => {
    if (h.shapeFlag & 6)
      return W(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const _ = m(h.anchor || h.el), y = _ && _[Ou];
    return y ? m(y) : _;
  };
  let G = !1;
  const Y = (h, _, y) => {
    let x;
    h == null ? _._vnode && (ot(_._vnode, null, null, !0), x = _._vnode.component) : $(
      _._vnode || null,
      h,
      _,
      null,
      null,
      null,
      y
    ), _._vnode = h, G || (G = !0, zr(x), Ml(), G = !1);
  }, se = {
    p: $,
    um: ot,
    m: vt,
    r: zt,
    mt: Pe,
    mc: N,
    pc: Ne,
    pbc: C,
    n: W,
    o: e
  };
  return {
    render: Y,
    hydrate: void 0,
    createApp: Ju(Y)
  };
}
function $o({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function dn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function bd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ms(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (q(s) && q(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = Lt(o[r]), l.el = i.el), !n && l.patchFlag !== -2 && Ms(i, l)), l.type === Es && (l.patchFlag === -1 && (l = o[r] = Lt(l)), l.el = i.el), l.type === Ze && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function yd(e) {
  const t = e.slice(), n = [0];
  let s, o, r, i, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const f = e[s];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < f ? r = l + 1 : i = l;
      f < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function ua(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ua(t);
}
function ci(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function da(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? da(t.subTree) : null;
}
const fa = (e) => e.__isSuspense;
function Ed(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Il(e);
}
const X = /* @__PURE__ */ Symbol.for("v-fgt"), Es = /* @__PURE__ */ Symbol.for("v-txt"), Ze = /* @__PURE__ */ Symbol.for("v-cmt"), Ls = /* @__PURE__ */ Symbol.for("v-stc"), ls = [];
let et = null;
function D(e = !1) {
  ls.push(et = e ? null : []);
}
function wd() {
  ls.pop(), et = ls[ls.length - 1] || null;
}
let ps = 1;
function no(e, t = !1) {
  ps += e, e < 0 && et && t && (et.hasOnce = !0);
}
function pa(e) {
  return e.dynamicChildren = ps > 0 ? et || Rn : null, wd(), ps > 0 && et && et.push(e), e;
}
function V(e, t, n, s, o, r) {
  return pa(
    c(
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
function Fn(e, t, n, s, o) {
  return pa(
    Z(
      e,
      t,
      n,
      s,
      o,
      !0
    )
  );
}
function On(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Qn(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = Rs.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Nd = (...e) => ga(
  ...e
), ha = ({ key: e }) => e ?? null, js = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Oe(e) || /* @__PURE__ */ Ee(e) || ee(e) ? { i: Me, r: e, k: t, f: !!n } : e : null);
function c(e, t = null, n = null, s = 0, o = null, r = e === X ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ha(t),
    ref: t && js(t),
    scopeId: Hl,
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
    ctx: Me
  };
  return l ? (xr(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= Oe(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && j("VNode created with invalid key (NaN). VNode type:", a.type), ps > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  et && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && et.push(a), a;
}
const Z = process.env.NODE_ENV !== "production" ? Nd : ga;
function ga(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === Lu) && (process.env.NODE_ENV !== "production" && !e && j(`Invalid vnode type when creating vnode: ${e}.`), e = Ze), On(e)) {
    const l = rn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && xr(l, n), ps > 0 && !r && et && (l.shapeFlag & 6 ? et[et.indexOf(e)] = l : et.push(l)), l.patchFlag = -2, l;
  }
  if (ya(e) && (e = e.__vccOpts), t) {
    t = Od(t);
    let { class: l, style: a } = t;
    l && !Oe(l) && (t.class = $e(l)), de(a) && (/* @__PURE__ */ Ln(a) && !q(a) && (a = De({}, a)), t.style = dr(a));
  }
  const i = Oe(e) ? 1 : fa(e) ? 128 : Su(e) ? 64 : de(e) ? 4 : ee(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && /* @__PURE__ */ Ln(e) && (e = /* @__PURE__ */ ne(e), j(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), c(
    e,
    t,
    n,
    s,
    o,
    i,
    r,
    !0
  );
}
function Od(e) {
  return e ? /* @__PURE__ */ Ln(e) || oa(e) ? De({}, e) : e : null;
}
function rn(e, t, n = !1, s = !1) {
  const { props: o, ref: r, patchFlag: i, children: l, transition: a } = e, f = t ? Sd(o || {}, t) : o, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && ha(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? q(r) ? r.concat(js(t)) : [r, js(t)] : js(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && q(l) ? l.map(ma) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== X ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && rn(e.ssContent),
    ssFallback: e.ssFallback && rn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && wr(
    p,
    a.clone(p)
  ), p;
}
function ma(e) {
  const t = rn(e);
  return q(e.children) && (t.children = e.children.map(ma)), t;
}
function Dr(e = " ", t = 0) {
  return Z(Es, null, e, t);
}
function xe(e = "", t = !1) {
  return t ? (D(), Fn(Ze, null, e)) : Z(Ze, null, e);
}
function ct(e) {
  return e == null || typeof e == "boolean" ? Z(Ze) : q(e) ? Z(
    X,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : On(e) ? Lt(e) : Z(Es, null, String(e));
}
function Lt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : rn(e);
}
function xr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), xr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !oa(t) ? t._ctx = Me : o === 3 && Me && (Me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ee(t) ? (t = { default: t, _ctx: Me }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Dr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Sd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = $e([t.class, s.class]));
      else if (o === "style")
        t.style = dr([t.style, s.style]);
      else if (ms(o)) {
        const r = t[o], i = s[o];
        i && r !== i && !(q(r) && r.includes(i)) && (t[o] = r ? [].concat(r, i) : i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function wt(e, t, n, s = null) {
  Pt(e, t, 7, [
    n,
    s
  ]);
}
const kd = Xl();
let $d = 0;
function Cd(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || kd, r = {
    uid: $d++,
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
    scope: new ul(
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
    propsOptions: ia(s, o),
    emitsOptions: Zl(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: be,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: be,
    data: be,
    props: be,
    attrs: be,
    slots: be,
    refs: be,
    setupState: be,
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
  return process.env.NODE_ENV !== "production" ? r.ctx = ju(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Qu.bind(null, r), e.ce && e.ce(r), r;
}
let Ae = null;
const Kn = () => Ae || Me;
let so, zo;
{
  const e = vs(), t = (n, s) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(s), (r) => {
      o.length > 1 ? o.forEach((i) => i(r)) : o[0](r);
    };
  };
  so = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ae = n
  ), zo = t(
    "__VUE_SSR_SETTERS__",
    (n) => hs = n
  );
}
const ws = (e) => {
  const t = Ae;
  return so(e), e.scope.on(), () => {
    e.scope.off(), so(t);
  };
}, ui = () => {
  Ae && Ae.scope.off(), so(null);
}, Dd = /* @__PURE__ */ Bt("slot,component");
function qo(e, { isNativeTag: t }) {
  (Dd(e) || t(e)) && j(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function _a(e) {
  return e.vnode.shapeFlag & 4;
}
let hs = !1;
function xd(e, t = !1, n = !1) {
  t && zo(t);
  const { props: s, children: o } = e.vnode, r = _a(e);
  sd(e, s, r, t), hd(e, o, n || t);
  const i = r ? Td(e, t) : void 0;
  return t && zo(!1), i;
}
function Td(e, t) {
  const n = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (n.name && qo(n.name, e.appContext.config), n.components) {
      const o = Object.keys(n.components);
      for (let r = 0; r < o.length; r++)
        qo(o[r], e.appContext.config);
    }
    if (n.directives) {
      const o = Object.keys(n.directives);
      for (let r = 0; r < o.length; r++)
        Bl(o[r]);
    }
    n.compilerOptions && Pd() && j(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Jl), process.env.NODE_ENV !== "production" && Fu(e);
  const { setup: s } = n;
  if (s) {
    ht();
    const o = e.setupContext = s.length > 1 ? Ad(e) : null, r = ws(e), i = Wn(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Ct(e.props) : e.props,
        o
      ]
    ), l = cr(i);
    if (gt(), r(), (l || e.sp) && !Mn(e) && Wl(e), l) {
      if (i.then(ui, ui), t)
        return i.then((a) => {
          di(e, a, t);
        }).catch((a) => {
          bs(a, e, 0);
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const a = Ns(e, n);
        j(
          `Component <${a}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      di(e, i, t);
  } else
    va(e, t);
}
function di(e, t, n) {
  ee(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) ? (process.env.NODE_ENV !== "production" && On(t) && j(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Tl(t), process.env.NODE_ENV !== "production" && Uu(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && j(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), va(e, n);
}
const Pd = () => !0;
function va(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Ie);
  {
    const o = ws(e);
    ht();
    try {
      Bu(e);
    } finally {
      gt(), o();
    }
  }
  process.env.NODE_ENV !== "production" && !s.render && e.render === Ie && !t && (s.template ? j(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : j("Component is missing template or render function: ", s));
}
const fi = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return eo(), Re(e, "get", ""), e[t];
  },
  set() {
    return j("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return j("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Re(e, "get", ""), e[t];
  }
};
function Vd(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return Re(e, "get", "$slots"), t[n];
    }
  });
}
function Ad(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && j("expose() should be called only once per setup()."), n != null)) {
      let s = typeof n;
      s === "object" && (q(n) ? s = "array" : /* @__PURE__ */ Ee(n) && (s = "ref")), s !== "object" && j(
        `expose() should be passed a plain object, received ${s}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, s;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, fi));
      },
      get slots() {
        return s || (s = Vd(e));
      },
      get emit() {
        return (o, ...r) => e.emit(o, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, fi),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function vo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Tl(Zt(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in En)
        return En[n](e);
    },
    has(t, n) {
      return n in t || n in En;
    }
  })) : e.proxy;
}
const Rd = /(?:^|[-_])\w/g, Id = (e) => e.replace(Rd, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function ba(e, t = !0) {
  return ee(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ns(e, t, n = !1) {
  let s = ba(t);
  if (!s && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (s = o[1]);
  }
  if (!s && e) {
    const o = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    s = o(e.components) || e.parent && o(
      e.parent.type.components
    ) || o(e.appContext.components);
  }
  return s ? Id(s) : n ? "App" : "Anonymous";
}
function ya(e) {
  return ee(e) && "__vccOpts" in e;
}
const ue = (e, t) => {
  const n = /* @__PURE__ */ Qc(e, t, hs);
  if (process.env.NODE_ENV !== "production") {
    const s = Kn();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Ea(e, t, n) {
  try {
    no(-1);
    const s = arguments.length;
    return s === 2 ? de(t) && !q(t) ? On(t) ? Z(e, null, [t]) : Z(e, t) : Z(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && On(n) && (n = [n]), Z(e, t, n));
  } finally {
    no(1);
  }
}
function Md() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, o = {
    __vue_custom_formatter: !0,
    header(u) {
      if (!de(u))
        return null;
      if (u.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ Ee(u)) {
        ht();
        const m = u.value;
        return gt(), [
          "div",
          {},
          ["span", e, p(u)],
          "<",
          l(m),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ it(u))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ He(u) ? "ShallowReactive" : "Reactive"],
            "<",
            l(u),
            `>${/* @__PURE__ */ mt(u) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ mt(u))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ He(u) ? "ShallowReadonly" : "Readonly"],
            "<",
            l(u),
            ">"
          ];
      }
      return null;
    },
    hasBody(u) {
      return u && u.__isVue;
    },
    body(u) {
      if (u && u.__isVue)
        return [
          "div",
          {},
          ...r(u.$)
        ];
    }
  };
  function r(u) {
    const m = [];
    u.type.props && u.props && m.push(i("props", /* @__PURE__ */ ne(u.props))), u.setupState !== be && m.push(i("setup", u.setupState)), u.data !== be && m.push(i("data", /* @__PURE__ */ ne(u.data)));
    const b = a(u, "computed");
    b && m.push(i("computed", b));
    const T = a(u, "inject");
    return T && m.push(i("injected", T)), m.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: u }]
    ]), m;
  }
  function i(u, m) {
    return m = De({}, m), Object.keys(m).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        u
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(m).map((b) => [
          "div",
          {},
          ["span", s, b + ": "],
          l(m[b], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(u, m = !0) {
    return typeof u == "number" ? ["span", t, u] : typeof u == "string" ? ["span", n, JSON.stringify(u)] : typeof u == "boolean" ? ["span", s, u] : de(u) ? ["object", { object: m ? /* @__PURE__ */ ne(u) : u }] : ["span", n, String(u)];
  }
  function a(u, m) {
    const b = u.type;
    if (ee(b))
      return;
    const T = {};
    for (const $ in u.ctx)
      f(b, $, m) && (T[$] = u.ctx[$]);
    return T;
  }
  function f(u, m, b) {
    const T = u[b];
    if (q(T) && T.includes(m) || de(T) && m in T || u.extends && f(u.extends, m, b) || u.mixins && u.mixins.some(($) => f($, m, b)))
      return !0;
  }
  function p(u) {
    return /* @__PURE__ */ He(u) ? "ShallowRef" : u.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const pi = "3.5.30", xt = process.env.NODE_ENV !== "production" ? j : Ie;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Jo;
const hi = typeof window < "u" && window.trustedTypes;
if (hi)
  try {
    Jo = /* @__PURE__ */ hi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && xt(`Error creating trusted types policy: ${e}`);
  }
const wa = Jo ? (e) => Jo.createHTML(e) : (e) => e, Ld = "http://www.w3.org/2000/svg", jd = "http://www.w3.org/1998/Math/MathML", It = typeof document < "u" ? document : null, gi = It && /* @__PURE__ */ It.createElement("template"), Fd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t === "svg" ? It.createElementNS(Ld, e) : t === "mathml" ? It.createElementNS(jd, e) : n ? It.createElement(e, { is: n }) : It.createElement(e);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => It.createTextNode(e),
  createComment: (e) => It.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => It.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      gi.innerHTML = wa(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = gi.content;
      if (s === "svg" || s === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Ud = /* @__PURE__ */ Symbol("_vtc");
function Hd(e, t, n) {
  const s = e[Ud];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const mi = /* @__PURE__ */ Symbol("_vod"), Bd = /* @__PURE__ */ Symbol("_vsh"), Gd = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Wd = /(?:^|;)\s*display\s*:/;
function Kd(e, t, n) {
  const s = e.style, o = Oe(n);
  let r = !1;
  if (n && !o) {
    if (t)
      if (Oe(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Fs(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Fs(s, i, "");
    for (const i in n)
      i === "display" && (r = !0), Fs(s, i, n[i]);
  } else if (o) {
    if (t !== n) {
      const i = s[Gd];
      i && (n += ";" + i), s.cssText = n, r = Wd.test(n);
    }
  } else t && e.removeAttribute("style");
  mi in e && (e[mi] = r ? s.display : "", e[Bd] && (s.display = "none"));
}
const zd = /[^\\];\s*$/, _i = /\s*!important$/;
function Fs(e, t, n) {
  if (q(n))
    n.forEach((s) => Fs(e, t, s));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && zd.test(n) && xt(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = qd(e, t);
    _i.test(n) ? e.setProperty(
      nn(s),
      n.replace(_i, ""),
      "important"
    ) : e[s] = n;
  }
}
const vi = ["Webkit", "Moz", "ms"], Co = {};
function qd(e, t) {
  const n = Co[t];
  if (n)
    return n;
  let s = Xe(t);
  if (s !== "filter" && s in e)
    return Co[t] = s;
  s = co(s);
  for (let o = 0; o < vi.length; o++) {
    const r = vi[o] + s;
    if (r in e)
      return Co[t] = r;
  }
  return t;
}
const bi = "http://www.w3.org/1999/xlink";
function yi(e, t, n, s, o, r = Nc(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(bi, t.slice(6, t.length)) : e.setAttributeNS(bi, t, n) : n == null || r && !ll(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : pt(n) ? String(n) : n
  );
}
function Ei(e, t, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? wa(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = ll(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !i && xt(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(o || t);
}
function Ut(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Jd(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const wi = /* @__PURE__ */ Symbol("_vei");
function Yd(e, t, n, s, o = null) {
  const r = e[wi] || (e[wi] = {}), i = r[t];
  if (s && i)
    i.value = process.env.NODE_ENV !== "production" ? Oi(s, t) : s;
  else {
    const [l, a] = Qd(t);
    if (s) {
      const f = r[t] = ef(
        process.env.NODE_ENV !== "production" ? Oi(s, t) : s,
        o
      );
      Ut(e, l, f, a);
    } else i && (Jd(e, l, i, a), r[t] = void 0);
  }
}
const Ni = /(?:Once|Passive|Capture)$/;
function Qd(e) {
  let t;
  if (Ni.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ni); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : nn(e.slice(2)), t];
}
let Do = 0;
const Xd = /* @__PURE__ */ Promise.resolve(), Zd = () => Do || (Xd.then(() => Do = 0), Do = Date.now());
function ef(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Pt(
      tf(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Zd(), n;
}
function Oi(e, t) {
  return ee(e) || q(e) ? e : (xt(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Ie);
}
function tf(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (o) => !o._stopped && s && s(o)
    );
  } else
    return t;
}
const Si = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, nf = (e, t, n, s, o, r) => {
  const i = o === "svg";
  t === "class" ? Hd(e, s, i) : t === "style" ? Kd(e, n, s) : ms(t) ? Ws(t) || Yd(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : sf(e, t, s, i)) ? (Ei(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && yi(e, t, s, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (of(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Oe(s))) ? Ei(e, Xe(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), yi(e, t, s, i));
};
function sf(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Si(t) && ee(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Si(t) && Oe(n) ? !1 : t in e;
}
function of(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Xe(t);
  return Array.isArray(n) ? n.some((o) => Xe(o) === s) : Object.keys(n).some((o) => Xe(o) === s);
}
const ln = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (n) => Pn(t, n) : t;
};
function rf(e) {
  e.target.composing = !0;
}
function ki(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const lt = /* @__PURE__ */ Symbol("_assign");
function $i(e, t, n) {
  return t && (e = e.trim()), n && (e = uo(e)), e;
}
const mn = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
    e[lt] = ln(o);
    const r = s || o.props && o.props.type === "number";
    Ut(e, t ? "change" : "input", (i) => {
      i.target.composing || e[lt]($i(e.value, n, r));
    }), (n || r) && Ut(e, "change", () => {
      e.value = $i(e.value, n, r);
    }), t || (Ut(e, "compositionstart", rf), Ut(e, "compositionend", ki), Ut(e, "change", ki));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: o, number: r } }, i) {
    if (e[lt] = ln(i), e.composing) return;
    const l = (r || e.type === "number") && !/^0\d/.test(e.value) ? uo(e.value) : e.value, a = t ?? "";
    l !== a && (document.activeElement === e && e.type !== "range" && (s && t === n || o && e.value.trim() === a) || (e.value = a));
  }
}, Na = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[lt] = ln(n), Ut(e, "change", () => {
      const s = e._modelValue, o = Un(e), r = e.checked, i = e[lt];
      if (q(s)) {
        const l = fr(s, o), a = l !== -1;
        if (r && !a)
          i(s.concat(o));
        else if (!r && a) {
          const f = [...s];
          f.splice(l, 1), i(f);
        }
      } else if (Gn(s)) {
        const l = new Set(s);
        r ? l.add(o) : l.delete(o), i(l);
      } else
        i(Oa(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Ci,
  beforeUpdate(e, t, n) {
    e[lt] = ln(n), Ci(e, t, n);
  }
};
function Ci(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let o;
  if (q(t))
    o = fr(t, s.props.value) > -1;
  else if (Gn(t))
    o = t.has(s.props.value);
  else {
    if (t === n) return;
    o = sn(t, Oa(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
const lf = {
  created(e, { value: t }, n) {
    e.checked = sn(t, n.props.value), e[lt] = ln(n), Ut(e, "change", () => {
      e[lt](Un(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[lt] = ln(s), t !== n && (e.checked = sn(t, s.props.value));
  }
}, oo = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    const o = Gn(t);
    Ut(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (i) => i.selected).map(
        (i) => n ? uo(Un(i)) : Un(i)
      );
      e[lt](
        e.multiple ? o ? new Set(r) : r : r[0]
      ), e._assigning = !0, ds(() => {
        e._assigning = !1;
      });
    }), e[lt] = ln(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Di(e, t);
  },
  beforeUpdate(e, t, n) {
    e[lt] = ln(n);
  },
  updated(e, { value: t }) {
    e._assigning || Di(e, t);
  }
};
function Di(e, t) {
  const n = e.multiple, s = q(t);
  if (n && !s && !Gn(t)) {
    process.env.NODE_ENV !== "production" && xt(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`
    );
    return;
  }
  for (let o = 0, r = e.options.length; o < r; o++) {
    const i = e.options[o], l = Un(i);
    if (n)
      if (s) {
        const a = typeof l;
        a === "string" || a === "number" ? i.selected = t.some((f) => String(f) === String(l)) : i.selected = fr(t, l) > -1;
      } else
        i.selected = t.has(l);
    else if (sn(Un(i), t)) {
      e.selectedIndex !== o && (e.selectedIndex = o);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function Un(e) {
  return "_value" in e ? e._value : e.value;
}
function Oa(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const af = {
  created(e, t, n) {
    $s(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    $s(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    $s(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    $s(e, t, n, s, "updated");
  }
};
function cf(e, t) {
  switch (e) {
    case "SELECT":
      return oo;
    case "TEXTAREA":
      return mn;
    default:
      switch (t) {
        case "checkbox":
          return Na;
        case "radio":
          return lf;
        default:
          return mn;
      }
  }
}
function $s(e, t, n, s, o) {
  const i = cf(
    e.tagName,
    n.props && n.props.type
  )[o];
  i && i(e, t, n, s);
}
const uf = ["ctrl", "shift", "alt", "meta"], df = {
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
  exact: (e, t) => uf.some((n) => e[`${n}Key`] && !t.includes(n))
}, ff = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (o, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = df[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...r);
  });
}, pf = /* @__PURE__ */ De({ patchProp: nf }, Fd);
let xi;
function hf() {
  return xi || (xi = _d(pf));
}
const gf = (...e) => {
  const t = hf().createApp(...e);
  process.env.NODE_ENV !== "production" && (_f(t), vf(t));
  const { mount: n } = t;
  return t.mount = (s) => {
    const o = bf(s);
    if (!o) return;
    const r = t._component;
    !ee(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, mf(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function mf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function _f(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => bc(t) || yc(t) || Ec(t),
    writable: !1
  });
}
function vf(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        xt(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, s = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return xt(s), n;
      },
      set() {
        xt(s);
      }
    });
  }
}
function bf(e) {
  if (Oe(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && xt(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && xt(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function yf() {
  Md();
}
process.env.NODE_ENV !== "production" && yf();
function Cs(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function xo(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Ef() {
  return Sa().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Sa() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const wf = typeof Proxy == "function", Nf = "devtools-plugin:setup", Of = "plugin:settings:set";
let Dn, Yo;
function Sf() {
  var e;
  return Dn !== void 0 || (typeof window < "u" && window.performance ? (Dn = !0, Yo = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Dn = !0, Yo = globalThis.perf_hooks.performance) : Dn = !1), Dn;
}
function kf() {
  return Sf() ? Yo.now() : Date.now();
}
let $f = class {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const i in t.settings) {
        const l = t.settings[i];
        s[i] = l.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, s);
    try {
      const i = localStorage.getItem(o), l = JSON.parse(i);
      Object.assign(r, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        r = i;
      },
      now() {
        return kf();
      }
    }, n && n.on(Of, (i, l) => {
      i === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, l) => this.target ? this.target.on[l] : (...a) => {
        this.onQueue.push({
          method: l,
          args: a
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...a) => (this.targetQueue.push({
        method: l,
        args: a,
        resolve: () => {
        }
      }), this.fallbacks[l](...a)) : (...a) => new Promise((f) => {
        this.targetQueue.push({
          method: l,
          args: a,
          resolve: f
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
function ka(e, t) {
  const n = e, s = Sa(), o = Ef(), r = wf && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    o.emit(Nf, e, t);
  else {
    const i = r ? new $f(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ns;
const gs = (e) => ns = e, $a = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Sn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Tt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Tt || (Tt = {}));
const en = typeof window < "u", Ti = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Cf(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Tr(e, t, n) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    xa(s.response, t, n);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function Ca(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Us(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const Hs = typeof navigator == "object" ? navigator : { userAgent: "" }, Da = /Macintosh/.test(Hs.userAgent) && /AppleWebKit/.test(Hs.userAgent) && !/Safari/.test(Hs.userAgent), xa = en ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Da ? Df : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Hs ? xf : (
      // Fallback to using FileReader and a popup
      Tf
    )
  )
) : () => {
};
function Df(e, t = "download", n) {
  const s = document.createElement("a");
  s.download = t, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? Ca(s.href) ? Tr(e, t, n) : (s.target = "_blank", Us(s)) : Us(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    Us(s);
  }, 0));
}
function xf(e, t = "download", n) {
  if (typeof e == "string")
    if (Ca(e))
      Tr(e, t, n);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        Us(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Cf(e, n), t);
}
function Tf(e, t, n, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return Tr(e, t, n);
  const o = e.type === "application/octet-stream", r = /constructor/i.test(String(Ti.HTMLElement)) || "safari" in Ti, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || o && r || Da) && typeof FileReader < "u") {
    const l = new FileReader();
    l.onloadend = function() {
      let a = l.result;
      if (typeof a != "string")
        throw s = null, new Error("Wrong reader.result type");
      a = i ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = a : location.assign(a), s = null;
    }, l.readAsDataURL(e);
  } else {
    const l = URL.createObjectURL(e);
    s ? s.location.assign(l) : location.href = l, s = null, setTimeout(function() {
      URL.revokeObjectURL(l);
    }, 4e4);
  }
}
function Le(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Pr(e) {
  return "_a" in e && "install" in e;
}
function Ta() {
  if (!("clipboard" in navigator))
    return Le("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Pa(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Le('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Pf(e) {
  if (!Ta())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Le("Global state copied to clipboard.");
    } catch (t) {
      if (Pa(t))
        return;
      Le("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Vf(e) {
  if (!Ta())
    try {
      Va(e, JSON.parse(await navigator.clipboard.readText())), Le("Global state pasted from clipboard.");
    } catch (t) {
      if (Pa(t))
        return;
      Le("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Af(e) {
  try {
    xa(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    Le("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let At;
function Rf() {
  At || (At = document.createElement("input"), At.type = "file", At.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      At.onchange = async () => {
        const s = At.files;
        if (!s)
          return t(null);
        const o = s.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, At.oncancel = () => t(null), At.onerror = n, At.click();
    });
  }
  return e;
}
async function If(e) {
  try {
    const n = await Rf()();
    if (!n)
      return;
    const { text: s, file: o } = n;
    Va(e, JSON.parse(s)), Le(`Global state imported from "${o.name}".`);
  } catch (t) {
    Le("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Va(e, t) {
  for (const n in t) {
    const s = e.state.value[n];
    s ? Object.assign(s, t[n]) : e.state.value[n] = t[n];
  }
}
function at(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Aa = "🍍 Pinia (root)", Bs = "_root";
function Mf(e) {
  return Pr(e) ? {
    id: Bs,
    label: Aa
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Lf(e) {
  if (Pr(e)) {
    const n = Array.from(e._s.keys()), s = e._s;
    return {
      state: n.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: n.filter((r) => s.get(r)._getters).map((r) => {
        const i = s.get(r);
        return {
          editable: !1,
          key: r,
          value: i._getters.reduce((l, a) => (l[a] = i[a], l), {})
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
function jf(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: at(e.type),
    key: at(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Ff(e) {
  switch (e) {
    case Tt.direct:
      return "mutation";
    case Tt.patchFunction:
      return "$patch";
    case Tt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let An = !0;
const Gs = [], gn = "pinia:mutations", Ue = "pinia", { assign: Uf } = Object, ro = (e) => "🍍 " + e;
function Hf(e, t) {
  ka({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Gs,
    app: e
  }, (n) => {
    typeof n.now != "function" && Le("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: gn,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: Ue,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Pf(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Vf(t), n.sendInspectorTree(Ue), n.sendInspectorState(Ue);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Af(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await If(t), n.sendInspectorTree(Ue), n.sendInspectorState(Ue);
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
            o ? typeof o.$reset != "function" ? Le(`Cannot reset "${s}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), Le(`Store "${s}" reset.`)) : Le(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((s, o) => {
      const r = s.componentInstance && s.componentInstance.proxy;
      if (r && r._pStores) {
        const i = s.componentInstance.proxy._pStores;
        Object.values(i).forEach((l) => {
          s.instanceData.state.push({
            type: ro(l.$id),
            key: "state",
            editable: !0,
            value: l._isOptionsAPI ? {
              _custom: {
                value: /* @__PURE__ */ ne(l.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => l.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(l.$state).reduce((a, f) => (a[f] = l.$state[f], a), {})
            )
          }), l._getters && l._getters.length && s.instanceData.state.push({
            type: ro(l.$id),
            key: "getters",
            editable: !1,
            value: l._getters.reduce((a, f) => {
              try {
                a[f] = l[f];
              } catch (p) {
                a[f] = p;
              }
              return a;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === Ue) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), s.rootNodes = (s.filter ? o.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(s.filter.toLowerCase()) : Aa.toLowerCase().includes(s.filter.toLowerCase())) : o).map(Mf);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === Ue) {
        const o = s.nodeId === Bs ? t : t._s.get(s.nodeId);
        if (!o)
          return;
        o && (s.nodeId !== Bs && (globalThis.$store = /* @__PURE__ */ ne(o)), s.state = Lf(o));
      }
    }), n.on.editInspectorState((s, o) => {
      if (s.app === e && s.inspectorId === Ue) {
        const r = s.nodeId === Bs ? t : t._s.get(s.nodeId);
        if (!r)
          return Le(`store "${s.nodeId}" not found`, "error");
        const { path: i } = s;
        Pr(r) ? i.unshift("state") : (i.length !== 1 || !r._customProperties.has(i[0]) || i[0] in r.$state) && i.unshift("$state"), An = !1, s.set(r, i, s.state.value), An = !0;
      }
    }), n.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const o = s.type.replace(/^🍍\s*/, ""), r = t._s.get(o);
        if (!r)
          return Le(`store "${o}" not found`, "error");
        const { path: i } = s;
        if (i[0] !== "state")
          return Le(`Invalid path for store "${o}":
${i}
Only state can be modified.`);
        i[0] = "$state", An = !1, s.set(r, i, s.state.value), An = !0;
      }
    });
  });
}
function Bf(e, t) {
  Gs.includes(ro(t.$id)) || Gs.push(ro(t.$id)), ka({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Gs,
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
    t.$onAction(({ after: i, onError: l, name: a, args: f }) => {
      const p = Ra++;
      n.addTimelineEvent({
        layerId: gn,
        event: {
          time: s(),
          title: "🛫 " + a,
          subtitle: "start",
          data: {
            store: at(t.$id),
            action: at(a),
            args: f
          },
          groupId: p
        }
      }), i((u) => {
        tn = void 0, n.addTimelineEvent({
          layerId: gn,
          event: {
            time: s(),
            title: "🛬 " + a,
            subtitle: "end",
            data: {
              store: at(t.$id),
              action: at(a),
              args: f,
              result: u
            },
            groupId: p
          }
        });
      }), l((u) => {
        tn = void 0, n.addTimelineEvent({
          layerId: gn,
          event: {
            time: s(),
            logType: "error",
            title: "💥 " + a,
            subtitle: "end",
            data: {
              store: at(t.$id),
              action: at(a),
              args: f,
              error: u
            },
            groupId: p
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      qe(() => d(t[i]), (l, a) => {
        n.notifyComponentUpdate(), n.sendInspectorState(Ue), An && n.addTimelineEvent({
          layerId: gn,
          event: {
            time: s(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: l,
              oldValue: a
            },
            groupId: tn
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: l }, a) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(Ue), !An)
        return;
      const f = {
        time: s(),
        title: Ff(l),
        data: Uf({ store: at(t.$id) }, jf(i)),
        groupId: tn
      };
      l === Tt.patchFunction ? f.subtitle = "⤵️" : l === Tt.patchObject ? f.subtitle = "🧩" : i && !Array.isArray(i) && (f.subtitle = i.type), i && (f.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: gn,
        event: f
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = Zt((i) => {
      o(i), n.addTimelineEvent({
        layerId: gn,
        event: {
          time: s(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: at(t.$id),
            info: at("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(Ue), n.sendInspectorState(Ue);
    });
    const { $dispose: r } = t;
    t.$dispose = () => {
      r(), n.notifyComponentUpdate(), n.sendInspectorTree(Ue), n.sendInspectorState(Ue), n.getSettings().logStoreChanges && Le(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(Ue), n.sendInspectorState(Ue), n.getSettings().logStoreChanges && Le(`"${t.$id}" store installed 🆕`);
  });
}
let Ra = 0, tn;
function Pi(e, t, n) {
  const s = t.reduce((o, r) => (o[r] = (/* @__PURE__ */ ne(e))[r], o), {});
  for (const o in s)
    e[o] = function() {
      const r = Ra, i = n ? new Proxy(e, {
        get(...a) {
          return tn = r, Reflect.get(...a);
        },
        set(...a) {
          return tn = r, Reflect.set(...a);
        }
      }) : e;
      tn = r;
      const l = s[o].apply(i, arguments);
      return tn = void 0, l;
    };
}
function Gf({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      Pi(t, Object.keys(n.actions), t._isOptionsAPI);
      const s = t._hotUpdate;
      (/* @__PURE__ */ ne(t))._hotUpdate = function(o) {
        s.apply(this, arguments), Pi(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    Bf(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function Wf() {
  const e = dl(!0), t = e.run(() => /* @__PURE__ */ me({}));
  let n = [], s = [];
  const o = Zt({
    install(r) {
      gs(o), o._a = r, r.provide($a, o), r.config.globalProperties.$pinia = o, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && en && Hf(r, o), s.forEach((i) => n.push(i)), s = [];
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
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && en && typeof Proxy < "u" && o.use(Gf), o;
}
function Ia(e, t) {
  for (const n in t) {
    const s = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    Sn(o) && Sn(s) && !/* @__PURE__ */ Ee(s) && !/* @__PURE__ */ it(s) ? e[n] = Ia(o, s) : e[n] = s;
  }
  return e;
}
const Ma = () => {
};
function Vi(e, t, n, s = Ma) {
  e.push(t);
  const o = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), s());
  };
  return !n && fl() && Sc(o), o;
}
function xn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Kf = (e) => e(), Ai = Symbol(), To = Symbol();
function Qo(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], o = e[n];
    Sn(o) && Sn(s) && e.hasOwnProperty(n) && !/* @__PURE__ */ Ee(s) && !/* @__PURE__ */ it(s) ? e[n] = Qo(o, s) : e[n] = s;
  }
  return e;
}
const zf = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function qf(e) {
  return !Sn(e) || !e.hasOwnProperty(zf);
}
const { assign: rt } = Object;
function Ri(e) {
  return !!(/* @__PURE__ */ Ee(e) && e.effect);
}
function Ii(e, t, n, s) {
  const { state: o, actions: r, getters: i } = t, l = n.state.value[e];
  let a;
  function f() {
    !l && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = o ? o() : {});
    const p = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      /* @__PURE__ */ Kr((/* @__PURE__ */ me(o ? o() : {})).value)
    ) : /* @__PURE__ */ Kr(n.state.value[e]);
    return rt(p, r, Object.keys(i || {}).reduce((u, m) => (process.env.NODE_ENV !== "production" && m in p && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${m}" in store "${e}".`), u[m] = Zt(ue(() => {
      gs(n);
      const b = n._s.get(e);
      return i[m].call(b, b);
    })), u), {}));
  }
  return a = Xo(e, f, t, n, s, !0), a;
}
function Xo(e, t, n = {}, s, o, r) {
  let i;
  const l = rt({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const a = { deep: !0 };
  process.env.NODE_ENV !== "production" && (a.onTrigger = (M) => {
    f ? b = M : f == !1 && !v._hotUpdating && (Array.isArray(b) ? b.push(M) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let f, p, u = [], m = [], b;
  const T = s.state.value[e];
  !r && !T && (process.env.NODE_ENV === "production" || !o) && (s.state.value[e] = {});
  const $ = /* @__PURE__ */ me({});
  let K;
  function F(M) {
    let C;
    f = p = !1, process.env.NODE_ENV !== "production" && (b = []), typeof M == "function" ? (M(s.state.value[e]), C = {
      type: Tt.patchFunction,
      storeId: e,
      events: b
    }) : (Qo(s.state.value[e], M), C = {
      type: Tt.patchObject,
      payload: M,
      storeId: e,
      events: b
    });
    const z = K = Symbol();
    ds().then(() => {
      K === z && (f = !0);
    }), p = !0, xn(u, C, s.state.value[e]);
  }
  const A = r ? function() {
    const { state: C } = n, z = C ? C() : {};
    this.$patch((ae) => {
      rt(ae, z);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Ma
  );
  function I() {
    i.stop(), u = [], m = [], s._s.delete(e);
  }
  const te = (M, C = "") => {
    if (Ai in M)
      return M[To] = C, M;
    const z = function() {
      gs(s);
      const ae = Array.from(arguments), je = [], Pe = [];
      function ce(Ne) {
        je.push(Ne);
      }
      function ie(Ne) {
        Pe.push(Ne);
      }
      xn(m, {
        args: ae,
        name: z[To],
        store: v,
        after: ce,
        onError: ie
      });
      let oe;
      try {
        oe = M.apply(this && this.$id === e ? this : v, ae);
      } catch (Ne) {
        throw xn(Pe, Ne), Ne;
      }
      return oe instanceof Promise ? oe.then((Ne) => (xn(je, Ne), Ne)).catch((Ne) => (xn(Pe, Ne), Promise.reject(Ne))) : (xn(je, oe), oe);
    };
    return z[Ai] = !0, z[To] = C, z;
  }, O = /* @__PURE__ */ Zt({
    actions: {},
    getters: {},
    state: [],
    hotState: $
  }), S = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Vi.bind(null, m),
    $patch: F,
    $reset: A,
    $subscribe(M, C = {}) {
      const z = Vi(u, M, C.detached, () => ae()), ae = i.run(() => qe(() => s.state.value[e], (je) => {
        (C.flush === "sync" ? p : f) && M({
          storeId: e,
          type: Tt.direct,
          events: b
        }, je);
      }, rt({}, a, C)));
      return z;
    },
    $dispose: I
  }, v = /* @__PURE__ */ on(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && en ? rt(
    {
      _hmrPayload: O,
      _customProperties: Zt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    S
    // must be added later
    // setupStore
  ) : S);
  s._s.set(e, v);
  const N = (s._a && s._a.runWithContext || Kf)(() => s._e.run(() => (i = dl()).run(() => t({ action: te }))));
  for (const M in N) {
    const C = N[M];
    if (/* @__PURE__ */ Ee(C) && !Ri(C) || /* @__PURE__ */ it(C))
      process.env.NODE_ENV !== "production" && o ? Cs($.value, M, /* @__PURE__ */ Ps(N, M)) : r || (T && qf(C) && (/* @__PURE__ */ Ee(C) ? C.value = T[M] : Qo(C, T[M])), s.state.value[e][M] = C), process.env.NODE_ENV !== "production" && O.state.push(M);
    else if (typeof C == "function") {
      const z = process.env.NODE_ENV !== "production" && o ? C : te(C, M);
      N[M] = z, process.env.NODE_ENV !== "production" && (O.actions[M] = C), l.actions[M] = C;
    } else process.env.NODE_ENV !== "production" && Ri(C) && (O.getters[M] = r ? (
      // @ts-expect-error
      n.getters[M]
    ) : C, en && (N._getters || // @ts-expect-error: same
    (N._getters = Zt([]))).push(M));
  }
  if (rt(v, N), rt(/* @__PURE__ */ ne(v), N), Object.defineProperty(v, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? $.value : s.state.value[e],
    set: (M) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      F((C) => {
        rt(C, M);
      });
    }
  }), process.env.NODE_ENV !== "production" && (v._hotUpdate = Zt((M) => {
    v._hotUpdating = !0, M._hmrPayload.state.forEach((C) => {
      if (C in v.$state) {
        const z = M.$state[C], ae = v.$state[C];
        typeof z == "object" && Sn(z) && Sn(ae) ? Ia(z, ae) : M.$state[C] = ae;
      }
      Cs(v, C, /* @__PURE__ */ Ps(M.$state, C));
    }), Object.keys(v.$state).forEach((C) => {
      C in M.$state || xo(v, C);
    }), f = !1, p = !1, s.state.value[e] = /* @__PURE__ */ Ps(M._hmrPayload, "hotState"), p = !0, ds().then(() => {
      f = !0;
    });
    for (const C in M._hmrPayload.actions) {
      const z = M[C];
      Cs(v, C, te(z, C));
    }
    for (const C in M._hmrPayload.getters) {
      const z = M._hmrPayload.getters[C], ae = r ? (
        // special handling of options api
        ue(() => (gs(s), z.call(v, v)))
      ) : z;
      Cs(v, C, ae);
    }
    Object.keys(v._hmrPayload.getters).forEach((C) => {
      C in M._hmrPayload.getters || xo(v, C);
    }), Object.keys(v._hmrPayload.actions).forEach((C) => {
      C in M._hmrPayload.actions || xo(v, C);
    }), v._hmrPayload = M._hmrPayload, v._getters = M._getters, v._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && en) {
    const M = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((C) => {
      Object.defineProperty(v, C, rt({ value: v[C] }, M));
    });
  }
  return s._p.forEach((M) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && en) {
      const C = i.run(() => M({
        store: v,
        app: s._a,
        pinia: s,
        options: l
      }));
      Object.keys(C || {}).forEach((z) => v._customProperties.add(z)), rt(v, C);
    } else
      rt(v, i.run(() => M({
        store: v,
        app: s._a,
        pinia: s,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && v.$state && typeof v.$state == "object" && typeof v.$state.constructor == "function" && !v.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${v.$id}".`), T && r && n.hydrate && n.hydrate(v.$state, T), f = !0, p = !0, v;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function La(e, t, n) {
  let s, o;
  const r = typeof t == "function";
  if (typeof e == "string")
    s = e, o = r ? n : t;
  else if (o = e, s = e.id, process.env.NODE_ENV !== "production" && typeof s != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(l, a) {
    const f = bu();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ns && ns._testing ? null : l) || (f ? ft($a, null) : null), l && gs(l), process.env.NODE_ENV !== "production" && !ns)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = ns, l._s.has(s) || (r ? Xo(s, t, o, l) : Ii(s, o, l), process.env.NODE_ENV !== "production" && (i._pinia = l));
    const p = l._s.get(s);
    if (process.env.NODE_ENV !== "production" && a) {
      const u = "__hot:" + s, m = r ? Xo(u, t, o, l, !0) : Ii(u, rt({}, o), l, !0);
      a._hotUpdate(m), delete l.state.value[u], l._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && en) {
      const u = Kn();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const m = u.proxy, b = "_pStores" in m ? m._pStores : m._pStores = {};
        b[s] = p;
      }
    }
    return p;
  }
  return i.$id = s, i;
}
function ja(e) {
  {
    const t = /* @__PURE__ */ ne(e), n = {};
    for (const s in t) {
      const o = t[s];
      o.effect ? n[s] = // ...
      ue({
        get: () => e[s],
        set(r) {
          e[s] = r;
        }
      }) : (/* @__PURE__ */ Ee(o) || /* @__PURE__ */ it(o)) && (n[s] = // ---
      /* @__PURE__ */ Ps(e, s));
    }
    return n;
  }
}
let Jf = 0;
const zn = /* @__PURE__ */ La("feedback", () => {
  const e = /* @__PURE__ */ me([]), t = /* @__PURE__ */ me(null);
  let n = null;
  function s(l) {
    const a = {
      id: ++Jf,
      title: l.title,
      message: l.message,
      tone: l.tone || "info"
    };
    e.value.push(a);
    const f = typeof l.durationMs == "number" ? l.durationMs : 3600;
    return typeof window < "u" && f > 0 && window.setTimeout(() => o(a.id), f), a.id;
  }
  function o(l) {
    e.value = e.value.filter((a) => a.id !== l);
  }
  function r(l) {
    return n && (n(!1), n = null), t.value = {
      title: l.title,
      message: l.message,
      confirmLabel: l.confirmLabel || "Confirm",
      cancelLabel: l.cancelLabel || "Cancel",
      tone: l.tone || "default"
    }, new Promise((a) => {
      n = a;
    });
  }
  function i(l) {
    const a = n;
    n = null, t.value = null, a == null || a(l);
  }
  return {
    toasts: e,
    confirmRequest: t,
    pushToast: s,
    dismissToast: o,
    confirm: r,
    resolveConfirm: i
  };
}), Yf = { class: "confirm-dialog__header" }, Qf = { class: "page-card__title" }, Xf = { class: "confirm-dialog__body" }, Zf = { class: "confirm-dialog__footer" }, ep = /* @__PURE__ */ Be({
  __name: "ConfirmDialog",
  setup(e) {
    const t = zn(), { confirmRequest: n } = ja(t), s = ue(() => !!n.value);
    return (o, r) => {
      var i, l, a, f, p, u;
      return s.value ? (D(), V("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = ff((m) => d(t).resolveConfirm(!1), ["self"]))
      }, [
        c("section", {
          class: $e(["confirm-dialog", { "confirm-dialog--danger": ((i = d(n)) == null ? void 0 : i.tone) === "danger" }])
        }, [
          c("header", Yf, [
            r[3] || (r[3] = c("p", { class: "page-card__eyebrow" }, "Confirm", -1)),
            c("h2", Qf, g((l = d(n)) == null ? void 0 : l.title), 1)
          ]),
          c("p", Xf, g((a = d(n)) == null ? void 0 : a.message), 1),
          c("footer", Zf, [
            c("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (m) => d(t).resolveConfirm(!1))
            }, g((f = d(n)) == null ? void 0 : f.cancelLabel), 1),
            c("button", {
              class: $e(["inline-link", { "inline-link--danger": ((p = d(n)) == null ? void 0 : p.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (m) => d(t).resolveConfirm(!0))
            }, g((u = d(n)) == null ? void 0 : u.confirmLabel), 3)
          ])
        ], 2)
      ])) : xe("", !0);
    };
  }
}), tp = {
  class: "toast-viewport",
  "aria-live": "polite",
  "aria-atomic": "true"
}, np = { class: "toast-card__content" }, sp = { key: 0 }, op = ["onClick"], rp = /* @__PURE__ */ Be({
  __name: "ToastViewport",
  setup(e) {
    const t = zn(), { toasts: n } = ja(t);
    return (s, o) => (D(), V("div", tp, [
      (D(!0), V(X, null, ke(d(n), (r) => (D(), V("article", {
        key: r.id,
        class: $e(["toast-card", `toast-card--${r.tone}`])
      }, [
        c("div", np, [
          r.title ? (D(), V("strong", sp, g(r.title), 1)) : xe("", !0),
          c("p", null, g(r.message), 1)
        ]),
        c("button", {
          class: "toast-card__close",
          type: "button",
          onClick: (i) => d(t).dismissToast(r.id)
        }, " × ", 8, op)
      ], 2))), 128))
    ]));
  }
});
function ip() {
  return Fa().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Fa() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const lp = typeof Proxy == "function", ap = "devtools-plugin:setup", cp = "plugin:settings:set";
let Tn, Zo;
function up() {
  var e;
  return Tn !== void 0 || (typeof window < "u" && window.performance ? (Tn = !0, Zo = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Tn = !0, Zo = globalThis.perf_hooks.performance) : Tn = !1), Tn;
}
function dp() {
  return up() ? Zo.now() : Date.now();
}
class fp {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const i in t.settings) {
        const l = t.settings[i];
        s[i] = l.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, s);
    try {
      const i = localStorage.getItem(o), l = JSON.parse(i);
      Object.assign(r, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        r = i;
      },
      now() {
        return dp();
      }
    }, n && n.on(cp, (i, l) => {
      i === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, l) => this.target ? this.target.on[l] : (...a) => {
        this.onQueue.push({
          method: l,
          args: a
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...a) => (this.targetQueue.push({
        method: l,
        args: a,
        resolve: () => {
        }
      }), this.fallbacks[l](...a)) : (...a) => new Promise((f) => {
        this.targetQueue.push({
          method: l,
          args: a,
          resolve: f
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
function pp(e, t) {
  const n = e, s = Fa(), o = ip(), r = lp && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    o.emit(ap, e, t);
  else {
    const i = r ? new fp(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const jt = typeof document < "u";
function Ua(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function hp(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && Ua(e.default);
}
const ge = Object.assign;
function Po(e, t) {
  const n = {};
  for (const s in t) {
    const o = t[s];
    n[s] = nt(o) ? o.map(e) : e(o);
  }
  return n;
}
const as = () => {
}, nt = Array.isArray;
function Mi(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function le(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Ha = /#/g, gp = /&/g, mp = /\//g, _p = /=/g, vp = /\?/g, Ba = /\+/g, bp = /%5B/g, yp = /%5D/g, Ga = /%5E/g, Ep = /%60/g, Wa = /%7B/g, wp = /%7C/g, Ka = /%7D/g, Np = /%20/g;
function Vr(e) {
  return e == null ? "" : encodeURI("" + e).replace(wp, "|").replace(bp, "[").replace(yp, "]");
}
function Op(e) {
  return Vr(e).replace(Wa, "{").replace(Ka, "}").replace(Ga, "^");
}
function er(e) {
  return Vr(e).replace(Ba, "%2B").replace(Np, "+").replace(Ha, "%23").replace(gp, "%26").replace(Ep, "`").replace(Wa, "{").replace(Ka, "}").replace(Ga, "^");
}
function Sp(e) {
  return er(e).replace(_p, "%3D");
}
function kp(e) {
  return Vr(e).replace(Ha, "%23").replace(vp, "%3F");
}
function $p(e) {
  return kp(e).replace(mp, "%2F");
}
function Hn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && le(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const Cp = /\/$/, Dp = (e) => e.replace(Cp, "");
function Vo(e, t, n = "/") {
  let s, o = {}, r = "", i = "";
  const l = t.indexOf("#");
  let a = t.indexOf("?");
  return a = l >= 0 && a > l ? -1 : a, a >= 0 && (s = t.slice(0, a), r = t.slice(a, l > 0 ? l : t.length), o = e(r.slice(1))), l >= 0 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = Pp(s ?? t, n), {
    fullPath: s + r + i,
    path: s,
    query: o,
    hash: Hn(i)
  };
}
function xp(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Li(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function ji(e, t, n) {
  const s = t.matched.length - 1, o = n.matched.length - 1;
  return s > -1 && s === o && an(t.matched[s], n.matched[o]) && za(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function an(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function za(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Tp(e[n], t[n])) return !1;
  return !0;
}
function Tp(e, t) {
  return nt(e) ? Fi(e, t) : nt(t) ? Fi(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function Fi(e, t) {
  return nt(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function Pp(e, t) {
  if (e.startsWith("/")) return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return le(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e) return t;
  const n = t.split("/"), s = e.split("/"), o = s[s.length - 1];
  (o === ".." || o === ".") && s.push("");
  let r = n.length - 1, i, l;
  for (i = 0; i < s.length; i++)
    if (l = s[i], l !== ".")
      if (l === "..")
        r > 1 && r--;
      else break;
  return n.slice(0, r).join("/") + "/" + s.slice(i).join("/");
}
const Yt = {
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
let tr = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), Ao = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function Vp(e) {
  if (!e) if (jt) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Dp(e);
}
const Ap = /^[^#]+#/;
function Rp(e, t) {
  return e.replace(Ap, "#") + t;
}
function Ip(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const bo = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Mp(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!s || !document.getElementById(e.el.slice(1))))
      try {
        const r = document.querySelector(e.el);
        if (s && r) {
          le(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        le(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const o = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o) {
      process.env.NODE_ENV !== "production" && le(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Ip(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Ui(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const nr = /* @__PURE__ */ new Map();
function Lp(e, t) {
  nr.set(e, t);
}
function jp(e) {
  const t = nr.get(e);
  return nr.delete(e), t;
}
function io(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function qa(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let Se = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const sr = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : ""), Fp = {
  [Se.MATCHER_NOT_FOUND]({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  [Se.NAVIGATION_GUARD_REDIRECT]({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Hp(t)}" via a navigation guard.`;
  },
  [Se.NAVIGATION_ABORTED]({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  [Se.NAVIGATION_CANCELLED]({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  [Se.NAVIGATION_DUPLICATED]({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function Bn(e, t) {
  return process.env.NODE_ENV !== "production" ? ge(new Error(Fp[e](t)), {
    type: e,
    [sr]: !0
  }, t) : ge(/* @__PURE__ */ new Error(), {
    type: e,
    [sr]: !0
  }, t);
}
function Rt(e, t) {
  return e instanceof Error && sr in e && (t == null || !!(e.type & t));
}
const Up = [
  "params",
  "query",
  "hash"
];
function Hp(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Up) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Bp(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const o = n[s].replace(Ba, " "), r = o.indexOf("="), i = Hn(r < 0 ? o : o.slice(0, r)), l = r < 0 ? null : Hn(o.slice(r + 1));
    if (i in t) {
      let a = t[i];
      nt(a) || (a = t[i] = [a]), a.push(l);
    } else t[i] = l;
  }
  return t;
}
function Hi(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Sp(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (nt(s) ? s.map((o) => o && er(o)) : [s && er(s)]).forEach((o) => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function Gp(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = nt(s) ? s.map((o) => o == null ? null : "" + o) : s == null ? s : "" + s);
  }
  return t;
}
const Wp = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), Bi = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Ar = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Rr = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), or = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function Xn() {
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
function Xt(e, t, n, s, o, r = (i) => i()) {
  const i = s && (s.enterCallbacks[o] = s.enterCallbacks[o] || []);
  return () => new Promise((l, a) => {
    const f = (m) => {
      m === !1 ? a(Bn(Se.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : m instanceof Error ? a(m) : io(m) ? a(Bn(Se.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: m
      })) : (i && s.enterCallbacks[o] === i && typeof m == "function" && i.push(m), l());
    }, p = r(() => e.call(s && s.instances[o], t, n, process.env.NODE_ENV !== "production" ? Kp(f, t, n) : f));
    let u = Promise.resolve(p);
    if (e.length < 3 && (u = u.then(f)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const m = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof p == "object" && "then" in p) u = u.then((b) => f._called ? b : (le(m), Promise.reject(/* @__PURE__ */ new Error("Invalid navigation guard"))));
      else if (p !== void 0 && !f._called) {
        le(m), a(/* @__PURE__ */ new Error("Invalid navigation guard"));
        return;
      }
    }
    u.catch((m) => a(m));
  });
}
function Kp(e, t, n) {
  let s = 0;
  return function() {
    s++ === 1 && le(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, s === 1 && e.apply(null, arguments);
  };
}
function Ro(e, t, n, s, o = (r) => r()) {
  const r = [];
  for (const i of e) {
    process.env.NODE_ENV !== "production" && !i.components && i.children && !i.children.length && le(`Record with path "${i.path}" is either missing a "component(s)" or "children" property.`);
    for (const l in i.components) {
      let a = i.components[l];
      if (process.env.NODE_ENV !== "production") {
        if (!a || typeof a != "object" && typeof a != "function")
          throw le(`Component "${l}" in record with path "${i.path}" is not a valid component. Received "${String(a)}".`), new Error("Invalid route component");
        if ("then" in a) {
          le(`Component "${l}" in record with path "${i.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const f = a;
          a = () => f;
        } else a.__asyncLoader && !a.__warnedDefineAsync && (a.__warnedDefineAsync = !0, le(`Component "${l}" in record with path "${i.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (Ua(a)) {
          const f = (a.__vccOpts || a)[t];
          f && r.push(Xt(f, n, s, i, l, o));
        } else {
          let f = a();
          process.env.NODE_ENV !== "production" && !("catch" in f) && (le(`Component "${l}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), f = Promise.resolve(f)), r.push(() => f.then((p) => {
            if (!p) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const u = hp(p) ? p.default : p;
            i.mods[l] = p, i.components[l] = u;
            const m = (u.__vccOpts || u)[t];
            return m && Xt(m, n, s, i, l, o)();
          }));
        }
    }
  }
  return r;
}
function zp(e, t) {
  const n = [], s = [], o = [], r = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < r; i++) {
    const l = t.matched[i];
    l && (e.matched.find((f) => an(f, l)) ? s.push(l) : n.push(l));
    const a = e.matched[i];
    a && (t.matched.find((f) => an(f, a)) || o.push(a));
  }
  return [
    n,
    s,
    o
  ];
}
function Zn(e, t) {
  const n = ge({}, e, { matched: e.matched.map((s) => oh(s, [
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
function Ds(e) {
  return { _custom: { display: e } };
}
let qp = 0;
function Jp(e, t, n) {
  if (t.__hasDevtools) return;
  t.__hasDevtools = !0;
  const s = qp++;
  pp({
    id: "org.vuejs.router" + (s ? "." + s : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (o) => {
    typeof o.now != "function" && le("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.on.inspectComponent((p, u) => {
      p.instanceData && p.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: Zn(t.currentRoute.value, "Current Route")
      });
    }), o.on.visitComponentTree(({ treeNode: p, componentInstance: u }) => {
      if (u.__vrv_devtools) {
        const m = u.__vrv_devtools;
        p.tags.push({
          label: (m.name ? `${m.name.toString()}: ` : "") + m.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Ja
        });
      }
      nt(u.__vrl_devtools) && (u.__devtoolsApi = o, u.__vrl_devtools.forEach((m) => {
        let b = m.route.path, T = Xa, $ = "", K = 0;
        m.error ? (b = m.error, T = eh, K = th) : m.isExactActive ? (T = Qa, $ = "This is exactly active") : m.isActive && (T = Ya, $ = "This link is active"), p.tags.push({
          label: b,
          textColor: K,
          tooltip: $,
          backgroundColor: T
        });
      }));
    }), qe(t.currentRoute, () => {
      a(), o.notifyComponentUpdate(), o.sendInspectorTree(l), o.sendInspectorState(l);
    });
    const r = "router:navigations:" + s;
    o.addTimelineLayer({
      id: r,
      label: `Router${s ? " " + s : ""} Navigations`,
      color: 4237508
    }), t.onError((p, u) => {
      o.addTimelineEvent({
        layerId: r,
        event: {
          title: "Error during Navigation",
          subtitle: u.fullPath,
          logType: "error",
          time: o.now(),
          data: { error: p },
          groupId: u.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((p, u) => {
      const m = {
        guard: Ds("beforeEach"),
        from: Zn(u, "Current Location during this navigation"),
        to: Zn(p, "Target location")
      };
      Object.defineProperty(p.meta, "__navigationId", { value: i++ }), o.addTimelineEvent({
        layerId: r,
        event: {
          time: o.now(),
          title: "Start of navigation",
          subtitle: p.fullPath,
          data: m,
          groupId: p.meta.__navigationId
        }
      });
    }), t.afterEach((p, u, m) => {
      const b = { guard: Ds("afterEach") };
      m ? (b.failure = { _custom: {
        type: Error,
        readOnly: !0,
        display: m ? m.message : "",
        tooltip: "Navigation Failure",
        value: m
      } }, b.status = Ds("❌")) : b.status = Ds("✅"), b.from = Zn(u, "Current Location during this navigation"), b.to = Zn(p, "Target location"), o.addTimelineEvent({
        layerId: r,
        event: {
          title: "End of navigation",
          subtitle: p.fullPath,
          time: o.now(),
          data: b,
          logType: m ? "warning" : "default",
          groupId: p.meta.__navigationId
        }
      });
    });
    const l = "router-inspector:" + s;
    o.addInspector({
      id: l,
      label: "Routes" + (s ? " " + s : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function a() {
      if (!f) return;
      const p = f;
      let u = n.getRoutes().filter((m) => !m.parent || !m.parent.record.components);
      u.forEach(tc), p.filter && (u = u.filter((m) => rr(m, p.filter.toLowerCase()))), u.forEach((m) => ec(m, t.currentRoute.value)), p.rootNodes = u.map(Za);
    }
    let f;
    o.on.getInspectorTree((p) => {
      f = p, p.app === e && p.inspectorId === l && a();
    }), o.on.getInspectorState((p) => {
      if (p.app === e && p.inspectorId === l) {
        const u = n.getRoutes().find((m) => m.record.__vd_id === p.nodeId);
        u && (p.state = { options: Qp(u) });
      }
    }), o.sendInspectorTree(l), o.sendInspectorState(l);
  });
}
function Yp(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function Qp(e) {
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
      display: e.keys.map((s) => `${s.name}${Yp(s)}`).join(" "),
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
const Ja = 15485081, Ya = 2450411, Qa = 8702998, Xp = 2282478, Xa = 16486972, Zp = 6710886, eh = 16704226, th = 12131356;
function Za(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Xp
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Xa
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Ja
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Qa
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Ya
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Zp
  });
  let s = n.__vd_id;
  return s == null && (s = String(nh++), n.__vd_id = s), {
    id: s,
    label: n.path,
    tags: t,
    children: e.children.map(Za)
  };
}
let nh = 0;
const sh = /^\/(.*)\/([a-z]*)$/;
function ec(e, t) {
  const n = t.matched.length && an(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((s) => an(s, e.record))), e.children.forEach((s) => ec(s, t));
}
function tc(e) {
  e.__vd_match = !1, e.children.forEach(tc);
}
function rr(e, t) {
  const n = String(e.re).match(sh);
  if (e.__vd_match = !1, !n || n.length < 3) return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((r) => rr(r, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const s = e.record.path.toLowerCase(), o = Hn(s);
  return !t.startsWith("/") && (o.includes(t) || s.includes(t)) || o.startsWith(t) || s.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((r) => rr(r, t));
}
function oh(e, t) {
  const n = {};
  for (const s in e) t.includes(s) || (n[s] = e[s]);
  return n;
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let rh = () => location.protocol + "//" + location.host;
function nc(e, t) {
  const { pathname: n, search: s, hash: o } = t, r = e.indexOf("#");
  if (r > -1) {
    let i = o.includes(e.slice(r)) ? e.slice(r).length : 1, l = o.slice(i);
    return l[0] !== "/" && (l = "/" + l), Li(l, "");
  }
  return Li(n, e) + s + o;
}
function ih(e, t, n, s) {
  let o = [], r = [], i = null;
  const l = ({ state: m }) => {
    const b = nc(e, location), T = n.value, $ = t.value;
    let K = 0;
    if (m) {
      if (n.value = b, t.value = m, i && i === T) {
        i = null;
        return;
      }
      K = $ ? m.position - $.position : 0;
    } else s(b);
    o.forEach((F) => {
      F(n.value, T, {
        delta: K,
        type: tr.pop,
        direction: K ? K > 0 ? Ao.forward : Ao.back : Ao.unknown
      });
    });
  };
  function a() {
    i = n.value;
  }
  function f(m) {
    o.push(m);
    const b = () => {
      const T = o.indexOf(m);
      T > -1 && o.splice(T, 1);
    };
    return r.push(b), b;
  }
  function p() {
    if (document.visibilityState === "hidden") {
      const { history: m } = window;
      if (!m.state) return;
      m.replaceState(ge({}, m.state, { scroll: bo() }), "");
    }
  }
  function u() {
    for (const m of r) m();
    r = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", p), document.removeEventListener("visibilitychange", p);
  }
  return window.addEventListener("popstate", l), window.addEventListener("pagehide", p), document.addEventListener("visibilitychange", p), {
    pauseListeners: a,
    listen: f,
    destroy: u
  };
}
function Gi(e, t, n, s = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: o ? bo() : null
  };
}
function lh(e) {
  const { history: t, location: n } = window, s = { value: nc(e, n) }, o = { value: t.state };
  o.value || r(s.value, {
    back: null,
    current: s.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(a, f, p) {
    const u = e.indexOf("#"), m = u > -1 ? (n.host && document.querySelector("base") ? e : e.slice(u)) + a : rh() + e + a;
    try {
      t[p ? "replaceState" : "pushState"](f, "", m), o.value = f;
    } catch (b) {
      process.env.NODE_ENV !== "production" ? le("Error with push/replace State", b) : console.error(b), n[p ? "replace" : "assign"](m);
    }
  }
  function i(a, f) {
    r(a, ge({}, t.state, Gi(o.value.back, a, o.value.forward, !0), f, { position: o.value.position }), !0), s.value = a;
  }
  function l(a, f) {
    const p = ge({}, o.value, t.state, {
      forward: a,
      scroll: bo()
    });
    process.env.NODE_ENV !== "production" && !t.state && le(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state`), r(p.current, p, !0), r(a, ge({}, Gi(s.value, a, null), { position: p.position + 1 }, f), !1), s.value = a;
  }
  return {
    location: s,
    state: o,
    push: l,
    replace: i
  };
}
function ah(e) {
  e = Vp(e);
  const t = lh(e), n = ih(e, t.state, t.location, t.replace);
  function s(r, i = !0) {
    i || n.pauseListeners(), history.go(r);
  }
  const o = ge({
    location: "",
    base: e,
    go: s,
    createHref: Rp.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function ch(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), process.env.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && le(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), ah(e);
}
let _n = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var Ve = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(Ve || {});
const uh = {
  type: _n.Static,
  value: ""
}, dh = /[a-zA-Z0-9_]/;
function fh(e) {
  if (!e) return [[]];
  if (e === "/") return [[uh]];
  if (!e.startsWith("/")) throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(b) {
    throw new Error(`ERR (${n})/"${f}": ${b}`);
  }
  let n = Ve.Static, s = n;
  const o = [];
  let r;
  function i() {
    r && o.push(r), r = [];
  }
  let l = 0, a, f = "", p = "";
  function u() {
    f && (n === Ve.Static ? r.push({
      type: _n.Static,
      value: f
    }) : n === Ve.Param || n === Ve.ParamRegExp || n === Ve.ParamRegExpEnd ? (r.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: _n.Param,
      value: f,
      regexp: p,
      repeatable: a === "*" || a === "+",
      optional: a === "*" || a === "?"
    })) : t("Invalid state to consume buffer"), f = "");
  }
  function m() {
    f += a;
  }
  for (; l < e.length; ) {
    if (a = e[l++], a === "\\" && n !== Ve.ParamRegExp) {
      s = n, n = Ve.EscapeNext;
      continue;
    }
    switch (n) {
      case Ve.Static:
        a === "/" ? (f && u(), i()) : a === ":" ? (u(), n = Ve.Param) : m();
        break;
      case Ve.EscapeNext:
        m(), n = s;
        break;
      case Ve.Param:
        a === "(" ? n = Ve.ParamRegExp : dh.test(a) ? m() : (u(), n = Ve.Static, a !== "*" && a !== "?" && a !== "+" && l--);
        break;
      case Ve.ParamRegExp:
        a === ")" ? p[p.length - 1] == "\\" ? p = p.slice(0, -1) + a : n = Ve.ParamRegExpEnd : p += a;
        break;
      case Ve.ParamRegExpEnd:
        u(), n = Ve.Static, a !== "*" && a !== "?" && a !== "+" && l--, p = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === Ve.ParamRegExp && t(`Unfinished custom RegExp for param "${f}"`), u(), i(), o;
}
const Wi = "[^/]+?", ph = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var Ke = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(Ke || {});
const hh = /[.+*?^${}()[\]/\\]/g;
function gh(e, t) {
  const n = ge({}, ph, t), s = [];
  let o = n.start ? "^" : "";
  const r = [];
  for (const f of e) {
    const p = f.length ? [] : [Ke.Root];
    n.strict && !f.length && (o += "/");
    for (let u = 0; u < f.length; u++) {
      const m = f[u];
      let b = Ke.Segment + (n.sensitive ? Ke.BonusCaseSensitive : 0);
      if (m.type === _n.Static)
        u || (o += "/"), o += m.value.replace(hh, "\\$&"), b += Ke.Static;
      else if (m.type === _n.Param) {
        const { value: T, repeatable: $, optional: K, regexp: F } = m;
        r.push({
          name: T,
          repeatable: $,
          optional: K
        });
        const A = F || Wi;
        if (A !== Wi) {
          b += Ke.BonusCustomRegExp;
          try {
            `${A}`;
          } catch (te) {
            throw new Error(`Invalid custom RegExp for param "${T}" (${A}): ` + te.message);
          }
        }
        let I = $ ? `((?:${A})(?:/(?:${A}))*)` : `(${A})`;
        u || (I = K && f.length < 2 ? `(?:/${I})` : "/" + I), K && (I += "?"), o += I, b += Ke.Dynamic, K && (b += Ke.BonusOptional), $ && (b += Ke.BonusRepeatable), A === ".*" && (b += Ke.BonusWildcard);
      }
      p.push(b);
    }
    s.push(p);
  }
  if (n.strict && n.end) {
    const f = s.length - 1;
    s[f][s[f].length - 1] += Ke.BonusStrict;
  }
  n.strict || (o += "/?"), n.end ? o += "$" : n.strict && !o.endsWith("/") && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function l(f) {
    const p = f.match(i), u = {};
    if (!p) return null;
    for (let m = 1; m < p.length; m++) {
      const b = p[m] || "", T = r[m - 1];
      u[T.name] = b && T.repeatable ? b.split("/") : b;
    }
    return u;
  }
  function a(f) {
    let p = "", u = !1;
    for (const m of e) {
      (!u || !p.endsWith("/")) && (p += "/"), u = !1;
      for (const b of m) if (b.type === _n.Static) p += b.value;
      else if (b.type === _n.Param) {
        const { value: T, repeatable: $, optional: K } = b, F = T in f ? f[T] : "";
        if (nt(F) && !$) throw new Error(`Provided param "${T}" is an array but it is not repeatable (* or + modifiers)`);
        const A = nt(F) ? F.join("/") : F;
        if (!A) if (K)
          m.length < 2 && (p.endsWith("/") ? p = p.slice(0, -1) : u = !0);
        else throw new Error(`Missing required param "${T}"`);
        p += A;
      }
    }
    return p || "/";
  }
  return {
    re: i,
    score: s,
    keys: r,
    parse: l,
    stringify: a
  };
}
function mh(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === Ke.Static + Ke.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === Ke.Static + Ke.Segment ? 1 : -1 : 0;
}
function sc(e, t) {
  let n = 0;
  const s = e.score, o = t.score;
  for (; n < s.length && n < o.length; ) {
    const r = mh(s[n], o[n]);
    if (r) return r;
    n++;
  }
  if (Math.abs(o.length - s.length) === 1) {
    if (Ki(s)) return 1;
    if (Ki(o)) return -1;
  }
  return o.length - s.length;
}
function Ki(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const _h = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function vh(e, t, n) {
  const s = gh(fh(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const r = /* @__PURE__ */ new Set();
    for (const i of s.keys)
      r.has(i.name) && le(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), r.add(i.name);
  }
  const o = ge(s, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function bh(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = Mi(_h, t);
  function o(u) {
    return s.get(u);
  }
  function r(u, m, b) {
    const T = !b, $ = qi(u);
    process.env.NODE_ENV !== "production" && Nh($, m), $.aliasOf = b && b.record;
    const K = Mi(t, u), F = [$];
    if ("alias" in u) {
      const te = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const O of te) F.push(qi(ge({}, $, {
        components: b ? b.record.components : $.components,
        path: O,
        aliasOf: b ? b.record : $
      })));
    }
    let A, I;
    for (const te of F) {
      const { path: O } = te;
      if (m && O[0] !== "/") {
        const S = m.record.path, v = S[S.length - 1] === "/" ? "" : "/";
        te.path = m.record.path + (O && v + O);
      }
      if (process.env.NODE_ENV !== "production" && te.path === "*") throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.`);
      if (A = vh(te, m, K), process.env.NODE_ENV !== "production" && m && O[0] === "/" && Sh(A, m), b ? (b.alias.push(A), process.env.NODE_ENV !== "production" && wh(b, A)) : (I = I || A, I !== A && I.alias.push(A), T && u.name && !Ji(A) && (process.env.NODE_ENV !== "production" && Oh(u, m), i(u.name))), oc(A) && a(A), $.children) {
        const S = $.children;
        for (let v = 0; v < S.length; v++) r(S[v], A, b && b.children[v]);
      }
      b = b || A;
    }
    return I ? () => {
      i(I);
    } : as;
  }
  function i(u) {
    if (qa(u)) {
      const m = s.get(u);
      m && (s.delete(u), n.splice(n.indexOf(m), 1), m.children.forEach(i), m.alias.forEach(i));
    } else {
      const m = n.indexOf(u);
      m > -1 && (n.splice(m, 1), u.record.name && s.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function a(u) {
    const m = kh(u, n);
    n.splice(m, 0, u), u.record.name && !Ji(u) && s.set(u.record.name, u);
  }
  function f(u, m) {
    let b, T = {}, $, K;
    if ("name" in u && u.name) {
      if (b = s.get(u.name), !b) throw Bn(Se.MATCHER_NOT_FOUND, { location: u });
      if (process.env.NODE_ENV !== "production") {
        const I = Object.keys(u.params || {}).filter((te) => !b.keys.find((O) => O.name === te));
        I.length && le(`Discarded invalid param(s) "${I.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      K = b.record.name, T = ge(zi(m.params, b.keys.filter((I) => !I.optional).concat(b.parent ? b.parent.keys.filter((I) => I.optional) : []).map((I) => I.name)), u.params && zi(u.params, b.keys.map((I) => I.name))), $ = b.stringify(T);
    } else if (u.path != null)
      $ = u.path, process.env.NODE_ENV !== "production" && !$.startsWith("/") && le(`The Matcher cannot resolve relative paths but received "${$}". Unless you directly called \`matcher.resolve("${$}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), b = n.find((I) => I.re.test($)), b && (T = b.parse($), K = b.record.name);
    else {
      if (b = m.name ? s.get(m.name) : n.find((I) => I.re.test(m.path)), !b) throw Bn(Se.MATCHER_NOT_FOUND, {
        location: u,
        currentLocation: m
      });
      K = b.record.name, T = ge({}, m.params, u.params), $ = b.stringify(T);
    }
    const F = [];
    let A = b;
    for (; A; )
      F.unshift(A.record), A = A.parent;
    return {
      name: K,
      path: $,
      params: T,
      matched: F,
      meta: Eh(F)
    };
  }
  e.forEach((u) => r(u));
  function p() {
    n.length = 0, s.clear();
  }
  return {
    addRoute: r,
    resolve: f,
    removeRoute: i,
    clearRoutes: p,
    getRoutes: l,
    getRecordMatcher: o
  };
}
function zi(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function qi(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: yh(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function yh(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Ji(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Eh(e) {
  return e.reduce((t, n) => ge(t, n.meta), {});
}
function ir(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function wh(e, t) {
  for (const n of e.keys) if (!n.optional && !t.keys.find(ir.bind(null, n))) return le(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys) if (!n.optional && !e.keys.find(ir.bind(null, n))) return le(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Nh(e, t) {
  t && t.record.name && !e.name && !e.path && le(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Oh(e, t) {
  for (let n = t; n; n = n.parent) if (n.record.name === e.name) throw new Error(`A route named "${String(e.name)}" has been added as a ${t === n ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function Sh(e, t) {
  for (const n of t.keys) if (!e.keys.find(ir.bind(null, n))) return le(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function kh(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const r = n + s >> 1;
    sc(e, t[r]) < 0 ? s = r : n = r + 1;
  }
  const o = $h(e);
  return o && (s = t.lastIndexOf(o, s - 1), process.env.NODE_ENV !== "production" && s < 0 && le(`Finding ancestor route "${o.record.path}" failed for "${e.record.path}"`)), s;
}
function $h(e) {
  let t = e;
  for (; t = t.parent; ) if (oc(t) && sc(e, t) === 0) return t;
}
function oc({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Yi(e) {
  const t = ft(Ar), n = ft(Rr);
  let s = !1, o = null;
  const r = ue(() => {
    const p = d(e.to);
    return process.env.NODE_ENV !== "production" && (!s || p !== o) && (io(p) || (s ? le(`Invalid value for prop "to" in useLink()
- to:`, p, `
- previous to:`, o, `
- props:`, e) : le(`Invalid value for prop "to" in useLink()
- to:`, p, `
- props:`, e)), o = p, s = !0), t.resolve(p);
  }), i = ue(() => {
    const { matched: p } = r.value, { length: u } = p, m = p[u - 1], b = n.matched;
    if (!m || !b.length) return -1;
    const T = b.findIndex(an.bind(null, m));
    if (T > -1) return T;
    const $ = Qi(p[u - 2]);
    return u > 1 && Qi(m) === $ && b[b.length - 1].path !== $ ? b.findIndex(an.bind(null, p[u - 2])) : T;
  }), l = ue(() => i.value > -1 && Th(n.params, r.value.params)), a = ue(() => i.value > -1 && i.value === n.matched.length - 1 && za(n.params, r.value.params));
  function f(p = {}) {
    if (xh(p)) {
      const u = t[d(e.replace) ? "replace" : "push"](d(e.to)).catch(as);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && jt) {
    const p = Kn();
    if (p) {
      const u = {
        route: r.value,
        isActive: l.value,
        isExactActive: a.value,
        error: null
      };
      p.__vrl_devtools = p.__vrl_devtools || [], p.__vrl_devtools.push(u), wu(() => {
        u.route = r.value, u.isActive = l.value, u.isExactActive = a.value, u.error = io(d(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: r,
    href: ue(() => r.value.href),
    isActive: l,
    isExactActive: a,
    navigate: f
  };
}
function Ch(e) {
  return e.length === 1 ? e[0] : e;
}
const Dh = /* @__PURE__ */ Be({
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
  useLink: Yi,
  setup(e, { slots: t }) {
    const n = /* @__PURE__ */ on(Yi(e)), { options: s } = ft(Ar), o = ue(() => ({
      [Xi(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      [Xi(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const r = t.default && Ch(t.default(n));
      return e.custom ? r : Ea("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: o.value
      }, r);
    };
  }
}), Ir = Dh;
function xh(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Th(e, t) {
  for (const n in t) {
    const s = t[n], o = e[n];
    if (typeof s == "string") {
      if (s !== o) return !1;
    } else if (!nt(o) || o.length !== s.length || s.some((r, i) => r.valueOf() !== o[i].valueOf())) return !1;
  }
  return !0;
}
function Qi(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Xi = (e, t, n) => e ?? t ?? n, Ph = /* @__PURE__ */ Be({
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
    process.env.NODE_ENV !== "production" && Vh();
    const s = ft(or), o = ue(() => e.route || s.value), r = ft(Bi, 0), i = ue(() => {
      let f = d(r);
      const { matched: p } = o.value;
      let u;
      for (; (u = p[f]) && !u.components; ) f++;
      return f;
    }), l = ue(() => o.value.matched[i.value]);
    Is(Bi, ue(() => i.value + 1)), Is(Wp, l), Is(or, o);
    const a = /* @__PURE__ */ me();
    return qe(() => [
      a.value,
      l.value,
      e.name
    ], ([f, p, u], [m, b, T]) => {
      p && (p.instances[u] = f, b && b !== p && f && f === m && (p.leaveGuards.size || (p.leaveGuards = b.leaveGuards), p.updateGuards.size || (p.updateGuards = b.updateGuards))), f && p && (!b || !an(p, b) || !m) && (p.enterCallbacks[u] || []).forEach(($) => $(f));
    }, { flush: "post" }), () => {
      const f = o.value, p = e.name, u = l.value, m = u && u.components[p];
      if (!m) return Zi(n.default, {
        Component: m,
        route: f
      });
      const b = u.props[p], T = b ? b === !0 ? f.params : typeof b == "function" ? b(f) : b : null, K = Ea(m, ge({}, T, t, {
        onVnodeUnmounted: (F) => {
          F.component.isUnmounted && (u.instances[p] = null);
        },
        ref: a
      }));
      if (process.env.NODE_ENV !== "production" && jt && K.ref) {
        const F = {
          depth: i.value,
          name: u.name,
          path: u.path,
          meta: u.meta
        };
        (nt(K.ref) ? K.ref.map((A) => A.i) : [K.ref.i]).forEach((A) => {
          A.__vrv_devtools = F;
        });
      }
      return Zi(n.default, {
        Component: K,
        route: f
      }) || K;
    };
  }
});
function Zi(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const rc = Ph;
function Vh() {
  const e = Kn(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const s = t === "KeepAlive" ? "keep-alive" : "transition";
    le(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${s}>
    <component :is="Component" />
  </${s}>
</router-view>`);
  }
}
function Ah(e) {
  const t = bh(e.routes, e), n = e.parseQuery || Bp, s = e.stringifyQuery || Hi, o = e.history;
  if (process.env.NODE_ENV !== "production" && !o) throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const r = Xn(), i = Xn(), l = Xn(), a = /* @__PURE__ */ Wc(Yt);
  let f = Yt;
  jt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const p = Po.bind(null, (w) => "" + w), u = Po.bind(null, $p), m = Po.bind(null, Hn);
  function b(w, W) {
    let G, Y;
    return qa(w) ? (G = t.getRecordMatcher(w), process.env.NODE_ENV !== "production" && !G && le(`Parent route "${String(w)}" not found when adding child route`, W), Y = W) : Y = w, t.addRoute(Y, G);
  }
  function T(w) {
    const W = t.getRecordMatcher(w);
    W ? t.removeRoute(W) : process.env.NODE_ENV !== "production" && le(`Cannot remove non-existent route "${String(w)}"`);
  }
  function $() {
    return t.getRoutes().map((w) => w.record);
  }
  function K(w) {
    return !!t.getRecordMatcher(w);
  }
  function F(w, W) {
    if (W = ge({}, W || a.value), typeof w == "string") {
      const _ = Vo(n, w, W.path), y = t.resolve({ path: _.path }, W), x = o.createHref(_.fullPath);
      return process.env.NODE_ENV !== "production" && (x.startsWith("//") ? le(`Location "${w}" resolved to "${x}". A resolved location cannot start with multiple slashes.`) : y.matched.length || le(`No match found for location with path "${w}"`)), ge(_, y, {
        params: m(y.params),
        hash: Hn(_.hash),
        redirectedFrom: void 0,
        href: x
      });
    }
    if (process.env.NODE_ENV !== "production" && !io(w))
      return le(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, w), F({});
    let G;
    if (w.path != null)
      process.env.NODE_ENV !== "production" && "params" in w && !("name" in w) && Object.keys(w.params).length && le(`Path "${w.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), G = ge({}, w, { path: Vo(n, w.path, W.path).path });
    else {
      const _ = ge({}, w.params);
      for (const y in _) _[y] == null && delete _[y];
      G = ge({}, w, { params: u(_) }), W.params = u(W.params);
    }
    const Y = t.resolve(G, W), se = w.hash || "";
    process.env.NODE_ENV !== "production" && se && !se.startsWith("#") && le(`A \`hash\` should always start with the character "#". Replace "${se}" with "#${se}".`), Y.params = p(m(Y.params));
    const Ce = xp(s, ge({}, w, {
      hash: Op(se),
      path: Y.path
    })), h = o.createHref(Ce);
    return process.env.NODE_ENV !== "production" && (h.startsWith("//") ? le(`Location "${w}" resolved to "${h}". A resolved location cannot start with multiple slashes.`) : Y.matched.length || le(`No match found for location with path "${w.path != null ? w.path : w}"`)), ge({
      fullPath: Ce,
      hash: se,
      query: s === Hi ? Gp(w.query) : w.query || {}
    }, Y, {
      redirectedFrom: void 0,
      href: h
    });
  }
  function A(w) {
    return typeof w == "string" ? Vo(n, w, a.value.path) : ge({}, w);
  }
  function I(w, W) {
    if (f !== w) return Bn(Se.NAVIGATION_CANCELLED, {
      from: W,
      to: w
    });
  }
  function te(w) {
    return v(w);
  }
  function O(w) {
    return te(ge(A(w), { replace: !0 }));
  }
  function S(w, W) {
    const G = w.matched[w.matched.length - 1];
    if (G && G.redirect) {
      const { redirect: Y } = G;
      let se = typeof Y == "function" ? Y(w, W) : Y;
      if (typeof se == "string" && (se = se.includes("?") || se.includes("#") ? se = A(se) : { path: se }, se.params = {}), process.env.NODE_ENV !== "production" && se.path == null && !("name" in se))
        throw le(`Invalid redirect found:
${JSON.stringify(se, null, 2)}
 when navigating to "${w.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return ge({
        query: w.query,
        hash: w.hash,
        params: se.path != null ? {} : w.params
      }, se);
    }
  }
  function v(w, W) {
    const G = f = F(w), Y = a.value, se = w.state, Ce = w.force, h = w.replace === !0, _ = S(G, Y);
    if (_) return v(ge(A(_), {
      state: typeof _ == "object" ? ge({}, se, _.state) : se,
      force: Ce,
      replace: h
    }), W || G);
    const y = G;
    y.redirectedFrom = W;
    let x;
    return !Ce && ji(s, Y, G) && (x = Bn(Se.NAVIGATION_DUPLICATED, {
      to: y,
      from: Y
    }), Kt(Y, Y, !0, !1)), (x ? Promise.resolve(x) : M(y, Y)).catch((k) => Rt(k) ? Rt(k, Se.NAVIGATION_GUARD_REDIRECT) ? k : cn(k) : oe(k, y, Y)).then((k) => {
      if (k) {
        if (Rt(k, Se.NAVIGATION_GUARD_REDIRECT))
          return process.env.NODE_ENV !== "production" && ji(s, F(k.to), y) && W && (W._count = W._count ? W._count + 1 : 1) > 30 ? (le(`Detected a possibly infinite redirection in a navigation guard when going from "${Y.fullPath}" to "${y.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(/* @__PURE__ */ new Error("Infinite redirect in navigation guard"))) : v(ge({ replace: h }, A(k.to), {
            state: typeof k.to == "object" ? ge({}, se, k.to.state) : se,
            force: Ce
          }), W || y);
      } else k = z(y, Y, !0, h, se);
      return C(y, Y, k), k;
    });
  }
  function E(w, W) {
    const G = I(w, W);
    return G ? Promise.reject(G) : Promise.resolve();
  }
  function N(w) {
    const W = zt.values().next().value;
    return W && typeof W.runWithContext == "function" ? W.runWithContext(w) : w();
  }
  function M(w, W) {
    let G;
    const [Y, se, Ce] = zp(w, W);
    G = Ro(Y.reverse(), "beforeRouteLeave", w, W);
    for (const _ of Y) _.leaveGuards.forEach((y) => {
      G.push(Xt(y, w, W));
    });
    const h = E.bind(null, w, W);
    return G.push(h), Jt(G).then(() => {
      G = [];
      for (const _ of r.list()) G.push(Xt(_, w, W));
      return G.push(h), Jt(G);
    }).then(() => {
      G = Ro(se, "beforeRouteUpdate", w, W);
      for (const _ of se) _.updateGuards.forEach((y) => {
        G.push(Xt(y, w, W));
      });
      return G.push(h), Jt(G);
    }).then(() => {
      G = [];
      for (const _ of Ce) if (_.beforeEnter) if (nt(_.beforeEnter)) for (const y of _.beforeEnter) G.push(Xt(y, w, W));
      else G.push(Xt(_.beforeEnter, w, W));
      return G.push(h), Jt(G);
    }).then(() => (w.matched.forEach((_) => _.enterCallbacks = {}), G = Ro(Ce, "beforeRouteEnter", w, W, N), G.push(h), Jt(G))).then(() => {
      G = [];
      for (const _ of i.list()) G.push(Xt(_, w, W));
      return G.push(h), Jt(G);
    }).catch((_) => Rt(_, Se.NAVIGATION_CANCELLED) ? _ : Promise.reject(_));
  }
  function C(w, W, G) {
    l.list().forEach((Y) => N(() => Y(w, W, G)));
  }
  function z(w, W, G, Y, se) {
    const Ce = I(w, W);
    if (Ce) return Ce;
    const h = W === Yt, _ = jt ? history.state : {};
    G && (Y || h ? o.replace(w.fullPath, ge({ scroll: h && _ && _.scroll }, se)) : o.push(w.fullPath, se)), a.value = w, Kt(w, W, G, h), cn();
  }
  let ae;
  function je() {
    ae || (ae = o.listen((w, W, G) => {
      if (!qt.listening) return;
      const Y = F(w), se = S(Y, qt.currentRoute.value);
      if (se) {
        v(ge(se, {
          replace: !0,
          force: !0
        }), Y).catch(as);
        return;
      }
      f = Y;
      const Ce = a.value;
      jt && Lp(Ui(Ce.fullPath, G.delta), bo()), M(Y, Ce).catch((h) => Rt(h, Se.NAVIGATION_ABORTED | Se.NAVIGATION_CANCELLED) ? h : Rt(h, Se.NAVIGATION_GUARD_REDIRECT) ? (v(ge(A(h.to), { force: !0 }), Y).then((_) => {
        Rt(_, Se.NAVIGATION_ABORTED | Se.NAVIGATION_DUPLICATED) && !G.delta && G.type === tr.pop && o.go(-1, !1);
      }).catch(as), Promise.reject()) : (G.delta && o.go(-G.delta, !1), oe(h, Y, Ce))).then((h) => {
        h = h || z(Y, Ce, !1), h && (G.delta && !Rt(h, Se.NAVIGATION_CANCELLED) ? o.go(-G.delta, !1) : G.type === tr.pop && Rt(h, Se.NAVIGATION_ABORTED | Se.NAVIGATION_DUPLICATED) && o.go(-1, !1)), C(Y, Ce, h);
      }).catch(as);
    }));
  }
  let Pe = Xn(), ce = Xn(), ie;
  function oe(w, W, G) {
    cn(w);
    const Y = ce.list();
    return Y.length ? Y.forEach((se) => se(w, W, G)) : (process.env.NODE_ENV !== "production" && le("uncaught error during route navigation:"), console.error(w)), Promise.reject(w);
  }
  function Ne() {
    return ie && a.value !== Yt ? Promise.resolve() : new Promise((w, W) => {
      Pe.add([w, W]);
    });
  }
  function cn(w) {
    return ie || (ie = !w, je(), Pe.list().forEach(([W, G]) => w ? G(w) : W()), Pe.reset()), w;
  }
  function Kt(w, W, G, Y) {
    const { scrollBehavior: se } = e;
    if (!jt || !se) return Promise.resolve();
    const Ce = !G && jp(Ui(w.fullPath, 0)) || (Y || !G) && history.state && history.state.scroll || null;
    return ds().then(() => se(w, W, Ce)).then((h) => h && Mp(h)).catch((h) => oe(h, w, W));
  }
  const vt = (w) => o.go(w);
  let ot;
  const zt = /* @__PURE__ */ new Set(), qt = {
    currentRoute: a,
    listening: !0,
    addRoute: b,
    removeRoute: T,
    clearRoutes: t.clearRoutes,
    hasRoute: K,
    getRoutes: $,
    resolve: F,
    options: e,
    push: te,
    replace: O,
    go: vt,
    back: () => vt(-1),
    forward: () => vt(1),
    beforeEach: r.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: ce.add,
    isReady: Ne,
    install(w) {
      w.component("RouterLink", Ir), w.component("RouterView", rc), w.config.globalProperties.$router = qt, Object.defineProperty(w.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => d(a)
      }), jt && !ot && a.value === Yt && (ot = !0, te(o.location).catch((Y) => {
        process.env.NODE_ENV !== "production" && le("Unexpected error when starting the router:", Y);
      }));
      const W = {};
      for (const Y in Yt) Object.defineProperty(W, Y, {
        get: () => a.value[Y],
        enumerable: !0
      });
      w.provide(Ar, qt), w.provide(Rr, /* @__PURE__ */ Dl(W)), w.provide(or, a);
      const G = w.unmount;
      zt.add(w), w.unmount = function() {
        zt.delete(w), zt.size < 1 && (f = Yt, ae && ae(), ae = null, a.value = Yt, ot = !1, ie = !1), G();
      }, process.env.NODE_ENV !== "production" && jt && Jp(w, qt, t);
    }
  };
  function Jt(w) {
    return w.reduce((W, G) => W.then(() => N(G)), Promise.resolve());
  }
  return qt;
}
function Rh(e) {
  return ft(Rr);
}
const el = "openclaw-guard.theme", tl = "openclaw-guard.lang";
function Ih() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const Wt = /* @__PURE__ */ La("ui", () => {
  const e = /* @__PURE__ */ me("auto"), t = /* @__PURE__ */ me("zh"), n = /* @__PURE__ */ me(!1), s = ue(() => e.value === "auto" ? Ih() : e.value);
  function o() {
    typeof document > "u" || (document.documentElement.dataset.theme = s.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en");
  }
  function r() {
    if (n.value || typeof window > "u") {
      o();
      return;
    }
    const f = window.localStorage.getItem(el), p = window.localStorage.getItem(tl);
    (f === "auto" || f === "light" || f === "dark") && (e.value = f), (p === "zh" || p === "en") && (t.value = p), n.value = !0, o();
  }
  function i(f) {
    e.value = f, typeof window < "u" && window.localStorage.setItem(el, f), o();
  }
  function l(f) {
    t.value = f, typeof window < "u" && window.localStorage.setItem(tl, f), o();
  }
  function a(f, p) {
    return t.value === "zh" ? f : p;
  }
  return {
    themePreference: e,
    language: t,
    resolvedTheme: s,
    hydrate: r,
    setThemePreference: i,
    setLanguage: l,
    applyDocumentState: o,
    label: a
  };
}), Mh = { class: "guard-shell" }, Lh = { class: "guard-shell__topbar" }, jh = { class: "topbar-actions" }, Fh = { class: "toolbar-menu" }, Uh = ["title"], Hh = { class: "toolbar-popover" }, Bh = ["onClick"], Gh = { class: "toolbar-menu" }, Wh = ["title"], Kh = { class: "toolbar-popover" }, zh = {
  class: "toolbar-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, qh = { class: "guard-shell__body" }, Jh = { class: "guard-shell__sidebar" }, Yh = { class: "sidebar-current" }, Qh = { class: "sidebar-current__label" }, Xh = { class: "sidebar-current__title" }, Zh = { class: "sidebar-current__meta" }, eg = { class: "sidebar-nav" }, tg = { class: "sidebar-group__title" }, ng = { class: "guard-shell__content" }, sg = "/ui/logo.png", og = /* @__PURE__ */ Be({
  __name: "GuardShell",
  setup(e) {
    const t = Wt(), n = Rh(), s = [
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
    ], r = ue(() => t.themePreference === "light" ? "☀" : t.themePreference === "dark" ? "☾" : "⌘"), i = ue(() => {
      const l = s.flatMap((a) => a.items).find((a) => a.to === n.path);
      return l ? t.label(l.zh, l.en) : t.label("首页", "Home");
    });
    return Or(() => {
      t.hydrate();
    }), qe(() => t.themePreference, () => t.applyDocumentState()), qe(() => t.language, () => t.applyDocumentState()), (l, a) => (D(), V("div", Mh, [
      c("header", Lh, [
        c("div", { class: "brand-lockup" }, [
          c("img", {
            class: "brand-lockup__logo",
            src: sg,
            alt: "OpenClaw Guard"
          }),
          a[2] || (a[2] = c("div", null, [
            c("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            c("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        c("div", jh, [
          c("div", Fh, [
            c("button", {
              class: "toolbar-icon",
              type: "button",
              title: d(t).label("主题", "Theme")
            }, g(r.value), 9, Uh),
            c("div", Hh, [
              (D(), V(X, null, ke(o, (f) => c("button", {
                key: f.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (p) => d(t).setThemePreference(f.value)
              }, [
                c("span", null, g(f.icon), 1),
                c("span", null, g(d(t).label(f.zh, f.en)), 1)
              ], 8, Bh)), 64))
            ])
          ]),
          c("div", Gh, [
            c("button", {
              class: "toolbar-icon",
              type: "button",
              title: d(t).label("语言", "Language")
            }, " 🌐 ", 8, Wh),
            c("div", Kh, [
              c("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: a[0] || (a[0] = (f) => d(t).setLanguage("zh"))
              }, [...a[3] || (a[3] = [
                c("span", null, "中", -1),
                c("span", null, "中文", -1)
              ])]),
              c("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: a[1] || (a[1] = (f) => d(t).setLanguage("en"))
              }, [...a[4] || (a[4] = [
                c("span", null, "EN", -1),
                c("span", null, "English", -1)
              ])])
            ])
          ]),
          c("a", zh, g(d(t).label("打开当前正式控制台", "Open current production console")), 1)
        ])
      ]),
      c("div", qh, [
        c("aside", Jh, [
          c("div", Yh, [
            c("p", Qh, g(d(t).label("当前页面", "Current page")), 1),
            c("p", Xh, g(i.value), 1),
            c("p", Zh, g(d(t).label("这里是 dev-rust 分支上的模块化预览壳层。当前继续迁移真实业务页面，但不会替换正式运行时。", "This is the modular preview shell on the dev-rust line. We keep migrating real product pages here without replacing the production runtime yet.")), 1)
          ]),
          c("nav", eg, [
            (D(), V(X, null, ke(s, (f) => c("section", {
              key: f.id,
              class: "sidebar-group"
            }, [
              c("p", tg, g(d(t).label(f.zh, f.en)), 1),
              (D(!0), V(X, null, ke(f.items, (p) => (D(), Fn(d(Ir), {
                key: p.to,
                to: p.to,
                class: $e(["sidebar-link", { "sidebar-link--active": d(n).path === p.to }])
              }, {
                default: he(() => [
                  Dr(g(d(t).label(p.zh, p.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ])
        ]),
        c("main", ng, [
          Z(d(rc))
        ])
      ])
    ]));
  }
}), rg = /* @__PURE__ */ Be({
  __name: "App",
  setup(e) {
    return (t, n) => (D(), V(X, null, [
      Z(og),
      Z(rp),
      Z(ep)
    ], 64));
  }
});
function Ht(e, t = null, n = {}) {
  const s = /* @__PURE__ */ me(t), o = n.immediate !== !1, r = /* @__PURE__ */ me(o && t === null), i = /* @__PURE__ */ me(!1), l = /* @__PURE__ */ me(null);
  async function a(f = {}) {
    f.silent === !0 ? i.value = !0 : r.value = !0, l.value = null;
    try {
      s.value = await e();
    } catch (u) {
      l.value = u instanceof Error ? u.message : String(u);
    } finally {
      r.value = !1, i.value = !1;
    }
  }
  return Or(() => {
    o && a();
  }), {
    data: s,
    loading: r,
    refreshing: i,
    error: l,
    execute: a
  };
}
const ig = { class: "page-card" }, lg = { class: "page-card__header" }, ag = {
  key: 0,
  class: "page-card__eyebrow"
}, cg = { class: "page-card__title" }, ug = { class: "page-card__body" }, _e = /* @__PURE__ */ Be({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, n) => (D(), V("section", ig, [
      c("header", lg, [
        c("div", null, [
          e.eyebrow ? (D(), V("p", ag, g(e.eyebrow), 1)) : xe("", !0),
          c("h2", cg, g(e.title), 1)
        ]),
        Xr(t.$slots, "actions")
      ]),
      c("div", ug, [
        Xr(t.$slots, "default")
      ])
    ]));
  }
});
async function dg(e) {
  if ((e.headers.get("content-type") || "").includes("application/json"))
    try {
      const s = await e.json();
      return s.message || s.error || `Request failed with ${e.status}`;
    } catch {
      return `Request failed with ${e.status}`;
    }
  return await e.text() || `Request failed with ${e.status}`;
}
async function Mr(e, t = {}) {
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
    throw new Error(await dg(o));
  return o.json();
}
function Te(e) {
  return Mr(e);
}
function st(e, t) {
  return Mr(e, {
    method: "POST",
    body: t
  });
}
function ic(e) {
  return Mr(e, {
    method: "DELETE"
  });
}
async function fg() {
  const [e, t, n, s] = await Promise.all([
    Te("/api/info"),
    Te("/api/dashboard/overview"),
    Te("/api/service/status"),
    Te("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: n, openclaw: s };
}
async function pg() {
  const [e, t] = await Promise.all([
    Te("/api/service/status"),
    Te("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function hg() {
  const [e, t] = await Promise.all([
    Te("/api/openclaw/status"),
    Te("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const gg = { class: "page-stack" }, mg = { class: "page-header" }, _g = { class: "page-header__eyebrow" }, vg = { class: "page-header__title" }, bg = { class: "page-header__description" }, yg = {
  key: 0,
  class: "page-empty"
}, Eg = {
  key: 1,
  class: "page-empty page-empty--error"
}, wg = { class: "stat-grid" }, Ng = { class: "stat-card" }, Og = { class: "stat-card" }, Sg = { class: "stat-card" }, kg = { class: "stat-card__label" }, $g = { class: "list-stack" }, Cg = { class: "action-row" }, Dg = { class: "action-row" }, xg = {
  class: "inline-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, Tg = {
  key: 0,
  class: "list-stack"
}, Pg = {
  key: 1,
  class: "muted-copy"
}, Vg = /* @__PURE__ */ Be({
  __name: "DashboardPage",
  setup(e) {
    const t = Wt(), n = Ht(() => fg()), s = ue(() => {
      var r, i;
      const o = (i = (r = n.data) == null ? void 0 : r.overview) == null ? void 0 : i.risks;
      return Array.isArray(o) ? o : [];
    });
    return (o, r) => (D(), V("div", gg, [
      c("header", mg, [
        c("div", null, [
          c("p", _g, g(d(t).label("首页 / First slice", "Home / First slice")), 1),
          c("h2", vg, g(d(t).label("带路首页", "Guided Home")), 1),
          c("p", bg, g(d(t).label("先回答现在能不能用、下一步该做什么，以及哪里可能有风险。", "Answer what works now, what to do next, and where risk still exists.")), 1)
        ]),
        c("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (i) => d(n).execute({ silent: !0 }))
        }, g(d(n).refreshing ? d(t).label("刷新中…", "Refreshing…") : d(t).label("刷新", "Refresh")), 1)
      ]),
      d(n).loading ? (D(), V("div", yg, g(d(t).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : d(n).error ? (D(), V("div", Eg, g(d(n).error), 1)) : d(n).data ? (D(), V(X, { key: 2 }, [
        Z(_e, {
          title: d(t).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: he(() => {
            var i, l, a, f, p, u, m, b, T, $;
            return [
              c("div", wg, [
                c("article", Ng, [
                  r[1] || (r[1] = c("p", { class: "stat-card__label" }, "Guard", -1)),
                  c("strong", null, g(((i = d(n).data.info) == null ? void 0 : i.guardVersion) || "unknown"), 1),
                  c("span", null, g(((l = d(n).data.info) == null ? void 0 : l.platform) || "unknown platform"), 1)
                ]),
                c("article", Og, [
                  r[2] || (r[2] = c("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  c("strong", null, g((f = (a = d(n).data.info) == null ? void 0 : a.openclaw) != null && f.installed ? ((u = (p = d(n).data.info) == null ? void 0 : p.openclaw) == null ? void 0 : u.version) || "installed" : d(t).label("未安装", "Not installed")), 1),
                  c("span", null, g(((b = (m = d(n).data.info) == null ? void 0 : m.openclaw) == null ? void 0 : b.detectedSource) || d(t).label("待检测", "Pending detection")), 1)
                ]),
                c("article", Sg, [
                  c("p", kg, g(d(t).label("Node 运行时", "Node runtime")), 1),
                  c("strong", null, g(((T = d(n).data.info) == null ? void 0 : T.nodeVersion) || "unknown"), 1),
                  c("span", null, g((($ = d(n).data.info) == null ? void 0 : $.user) || d(t).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        Z(_e, {
          title: d(t).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: he(() => [
            c("div", $g, [
              c("article", Cg, [
                c("div", null, [
                  c("h3", null, g(d(t).label("继续迁移首页 / 运维 / OpenClaw", "Keep migrating Home / Operations / OpenClaw")), 1),
                  c("p", null, g(d(t).label("这一版 Vue 壳层已经接上真实 API，下一批继续迁移渠道、模型、安全、备份与恢复。", "This Vue shell already talks to real APIs; next we migrate Channels, Models, Security, and Recovery.")), 1)
                ]),
                Z(d(Ir), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: he(() => [
                    Dr(g(d(t).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              c("article", Dg, [
                c("div", null, [
                  c("h3", null, g(d(t).label("保持旧控制台可用", "Keep the legacy console available")), 1),
                  c("p", null, g(d(t).label("新壳层目前是开发线入口，不替换正式运行时。需要完整能力时仍可打开当前正式控制台。", "The new shell is a dev-line entry for now and does not replace the production runtime yet.")), 1)
                ]),
                c("a", xg, g(d(t).label("打开正式控制台", "Open production console")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        Z(_e, {
          title: d(t).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: he(() => [
            s.value.length ? (D(), V("div", Tg, [
              (D(!0), V(X, null, ke(s.value, (i, l) => (D(), V("article", {
                key: `${i.title}-${l}`,
                class: "risk-row"
              }, [
                c("strong", null, g(i.title || d(t).label("未命名风险", "Unnamed risk")), 1),
                c("span", null, g(i.detail || d(t).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (D(), V("p", Pg, g(d(t).label("当前 API 未返回结构化风险列表，因此这里先显示为安全占位。后续页面迁移时会继续精炼。", "The current API did not return structured risks, so this section stays intentionally lightweight for the first scaffold.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : xe("", !0)
    ]));
  }
});
function xs(e) {
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
function nl(e) {
  return e ? e.slice(0, 7) : "-";
}
function Ts(e) {
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
function Ag(e) {
  return typeof e == "boolean" ? e : typeof e == "string" ? ["true", "1", "yes", "on"].includes(e.trim().toLowerCase()) : !1;
}
function lr(e) {
  const t = e.trim();
  if (!t) return;
  const n = Number(t);
  return Number.isFinite(n) ? n : void 0;
}
function sl(e) {
  return /token|secret|key|password/i.test(e);
}
async function Rg() {
  const [e, t, n] = await Promise.all([
    Te("/api/channels"),
    Te("/api/channels/meta"),
    Te("/api/feishu/plugin").catch(() => ({ installed: !1 }))
  ]);
  return {
    channels: e,
    definitions: t,
    feishuPlugin: n
  };
}
function Ig(e, t) {
  return st(`/api/channels/${encodeURIComponent(e)}`, t);
}
function Mg(e) {
  return ic(`/api/channels/${encodeURIComponent(e)}`);
}
const Lg = { class: "page-stack" }, jg = { class: "page-header" }, Fg = { class: "page-header__eyebrow" }, Ug = { class: "page-header__title" }, Hg = { class: "page-header__description" }, Bg = {
  key: 0,
  class: "page-empty"
}, Gg = {
  key: 1,
  class: "page-empty page-empty--error"
}, Wg = { class: "stat-grid" }, Kg = { class: "stat-card" }, zg = { class: "stat-card__label" }, qg = { class: "stat-card" }, Jg = { class: "stat-card__label" }, Yg = { class: "stat-card" }, Qg = { class: "stat-card__label" }, Xg = { class: "stat-card" }, Zg = { class: "stat-card__label" }, em = { class: "page-two-column" }, tm = { class: "catalog-list" }, nm = ["onClick"], sm = { class: "catalog-list__title" }, om = { class: "pill-row" }, rm = { class: "page-stack" }, im = { class: "page-inline-status" }, lm = { class: "muted-copy" }, am = { class: "settings-grid" }, cm = { key: 0 }, um = ["onUpdate:modelValue", "type"], dm = ["onUpdate:modelValue"], fm = ["value"], pm = {
  key: 3,
  class: "checkbox-row"
}, hm = ["onUpdate:modelValue"], gm = { class: "page-actions" }, mm = ["disabled"], _m = ["disabled"], vm = { class: "list-stack" }, bm = { class: "action-row" }, ym = { class: "action-row" }, Em = { class: "action-row" }, wm = { class: "code-panel" }, Nm = /* @__PURE__ */ Be({
  __name: "ChannelsPage",
  setup(e) {
    const t = {
      connectionMode: ["websocket", "webhook"],
      dmPolicy: ["open", "allowlist", "closed"],
      groupPolicy: ["open", "allowlist", "closed"],
      renderMode: ["auto", "rich", "compact"]
    }, n = Wt(), s = zn(), o = Ht(() => Rg()), r = /* @__PURE__ */ me(""), i = /* @__PURE__ */ me(!1), l = /* @__PURE__ */ me(!1), a = /* @__PURE__ */ on({}), f = /* @__PURE__ */ on({}), p = ue(() => {
      var v;
      return new Map((((v = o.data) == null ? void 0 : v.channels) || []).map((E) => [E.id, E]));
    }), u = ue(() => {
      var v;
      return new Map((((v = o.data) == null ? void 0 : v.definitions) || []).map((E) => [E.id, E]));
    }), m = ue(() => {
      var v, E;
      return u.value.get(r.value) || ((E = (v = o.data) == null ? void 0 : v.definitions) == null ? void 0 : E[0]) || null;
    }), b = ue(() => {
      const v = m.value;
      return v ? p.value.get(v.id) || {
        id: v.id,
        name: v.name,
        icon: v.icon,
        enabled: !1,
        configured: !1,
        config: {}
      } : null;
    }), T = ue(() => {
      var v;
      return (((v = o.data) == null ? void 0 : v.channels) || []).filter((E) => E.enabled).length;
    }), $ = ue(() => {
      var v;
      return (((v = o.data) == null ? void 0 : v.channels) || []).filter((E) => E.configured).length;
    }), K = ue(() => {
      const v = m.value, E = [
        {
          key: "enabled",
          label: n.label("启用这个渠道", "Enable this channel"),
          kind: "boolean",
          help: n.label("关闭后保留配置，但运行态不会接收这个入口的消息。", "Keep the config but stop receiving traffic from this channel.")
        }
      ];
      for (const N of (v == null ? void 0 : v.fields) || []) {
        if (N === "requireMention" || N === "streaming") {
          E.push({
            key: N,
            label: Ts(N),
            kind: "boolean",
            help: n.label("勾选即启用。", "Checked means enabled.")
          });
          continue;
        }
        if (t[N]) {
          E.push({
            key: N,
            label: Ts(N),
            kind: "text",
            inputType: "select",
            options: t[N].map((M) => ({ value: M, label: M }))
          });
          continue;
        }
        E.push({
          key: N,
          label: Ts(N),
          kind: "text",
          inputType: /port/i.test(N) ? "number" : sl(N) ? "password" : "text"
        });
      }
      for (const N of (v == null ? void 0 : v.envFields) || [])
        E.push({
          key: `env:${N}`,
          label: `${Ts(N)} (${N})`,
          kind: "text",
          inputType: "password",
          env: !0,
          help: n.label("留空会清除这个本机环境变量。", "Leave blank to clear this local environment variable.")
        });
      return E;
    });
    function F() {
      for (const v of Object.keys(a)) delete a[v];
      for (const v of Object.keys(f)) delete f[v];
    }
    function A() {
      var N, M;
      F();
      const v = b.value, E = m.value;
      if (!(!v || !E)) {
        f.enabled = v.enabled === !0;
        for (const C of E.fields) {
          const z = (N = v.config) == null ? void 0 : N[C];
          C === "requireMention" || C === "streaming" ? f[C] = Ag(z) : a[C] = z == null ? "" : String(z);
        }
        for (const C of E.envFields) {
          const z = `env:${C}`;
          a[z] = ((M = v.config) == null ? void 0 : M[z]) == null ? "" : String(v.config[z]);
        }
      }
    }
    qe(
      () => o.data,
      (v) => {
        const E = (v == null ? void 0 : v.definitions) || [];
        if (E.length) {
          if (!r.value || !u.value.has(r.value)) {
            r.value = E[0].id;
            return;
          }
          A();
        }
      },
      { immediate: !0 }
    ), qe(r, () => {
      A();
    });
    function I() {
      const v = b.value;
      return v ? v.id === "feishu" ? v.enabled ? n.label(
        "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
        "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
      ) : n.label(
        "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
        "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
      ) : v.enabled ? n.label("保存后会直接更新当前消息入口配置。", "Saving here updates the live channel configuration immediately.") : n.label("这个消息入口当前停用中。可以先补齐配置，再决定是否启用。", "This channel is currently disabled. Finish the settings first, then decide whether to enable it.") : "";
    }
    async function te() {
      const v = b.value, E = m.value;
      if (!(!v || !E)) {
        i.value = !0;
        try {
          const N = {
            enabled: f.enabled === !0
          };
          for (const C of E.fields) {
            if (C === "requireMention" || C === "streaming") {
              N[C] = f[C] === !0;
              continue;
            }
            const z = a[C] ?? "";
            /port/i.test(C) ? N[C] = lr(z) ?? "" : N[C] = z;
          }
          for (const C of E.envFields)
            N[`env:${C}`] = a[`env:${C}`] ?? "";
          const M = await Ig(v.id, N);
          s.pushToast({
            tone: M.success ? "success" : "error",
            message: M.message
          }), await o.execute({ silent: !0 });
        } catch (N) {
          s.pushToast({
            tone: "error",
            message: N instanceof Error ? N.message : String(N)
          });
        } finally {
          i.value = !1;
        }
      }
    }
    async function O() {
      const v = b.value;
      if (!(!v || !await s.confirm({
        title: n.label("清空渠道配置", "Clear channel configuration"),
        message: n.label(
          `确认清空 ${v.name || v.id} 的配置吗？这会移除本机保存的字段和值。`,
          `Clear the configuration for ${v.name || v.id}? This removes the saved local values for this channel.`
        ),
        confirmLabel: n.label("确认清空", "Clear configuration"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        l.value = !0;
        try {
          const N = await Mg(v.id);
          s.pushToast({
            tone: N.success ? "success" : "error",
            message: N.message
          }), await o.execute({ silent: !0 });
        } catch (N) {
          s.pushToast({
            tone: "error",
            message: N instanceof Error ? N.message : String(N)
          });
        } finally {
          l.value = !1;
        }
      }
    }
    function S(v) {
      return a[v] ?? "";
    }
    return (v, E) => (D(), V("div", Lg, [
      c("header", jg, [
        c("div", null, [
          c("p", Fg, g(d(n).label("渠道 / Second slice", "Channels / Second slice")), 1),
          c("h2", Ug, g(d(n).label("渠道管理", "Channel management")), 1),
          c("p", Hg, g(d(n).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        c("button", {
          class: "page-header__action",
          type: "button",
          onClick: E[0] || (E[0] = (N) => d(o).execute({ silent: !0 }))
        }, g(d(o).refreshing ? d(n).label("刷新中…", "Refreshing…") : d(n).label("刷新", "Refresh")), 1)
      ]),
      d(o).loading ? (D(), V("div", Bg, g(d(n).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : d(o).error ? (D(), V("div", Gg, g(d(o).error), 1)) : d(o).data && b.value ? (D(), V(X, { key: 2 }, [
        Z(_e, {
          title: d(n).label("当前概览", "Current overview"),
          eyebrow: "Summary"
        }, {
          default: he(() => [
            c("div", Wg, [
              c("article", Kg, [
                c("p", zg, g(d(n).label("可管理渠道", "Channels")), 1),
                c("strong", null, g(d(o).data.definitions.length), 1),
                c("span", null, g(d(n).label("当前内置和官方入口总数", "Built-in and official entry points available now")), 1)
              ]),
              c("article", qg, [
                c("p", Jg, g(d(n).label("已启用", "Enabled")), 1),
                c("strong", null, g(T.value), 1),
                c("span", null, g(d(n).label("运行态会接收消息", "Receives traffic at runtime")), 1)
              ]),
              c("article", Yg, [
                c("p", Qg, g(d(n).label("已配置", "Configured")), 1),
                c("strong", null, g($.value), 1),
                c("span", null, g(d(n).label("已经填写了字段或本机变量", "Fields or local values already exist")), 1)
              ]),
              c("article", Xg, [
                c("p", Zg, g(d(n).label("飞书插件", "Feishu plugin")), 1),
                c("strong", null, g(d(o).data.feishuPlugin.installed ? d(n).label("已识别", "Detected") : d(n).label("未识别", "Not detected")), 1),
                c("span", null, g(d(o).data.feishuPlugin.version || d(n).label("官方渠道仍可直接维护", "Official channel still remains manageable")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        c("div", em, [
          Z(_e, {
            title: d(n).label("渠道目录", "Channel catalog"),
            eyebrow: "Catalog"
          }, {
            default: he(() => [
              c("div", tm, [
                (D(!0), V(X, null, ke(d(o).data.definitions, (N) => {
                  var M, C, z, ae;
                  return D(), V("button", {
                    key: N.id,
                    class: $e(["catalog-list__item", { "catalog-list__item--active": r.value === N.id }]),
                    type: "button",
                    onClick: (je) => r.value = N.id
                  }, [
                    c("div", sm, [
                      c("strong", null, g(`${N.icon} ${N.name}`), 1)
                    ]),
                    c("div", om, [
                      c("span", {
                        class: $e(["pill", (M = p.value.get(N.id)) != null && M.enabled ? "pill--success" : "pill--warning"])
                      }, g((C = p.value.get(N.id)) != null && C.enabled ? d(n).label("已启用", "Enabled") : d(n).label("停用", "Disabled")), 3),
                      c("span", {
                        class: $e(["pill", (z = p.value.get(N.id)) != null && z.configured ? "pill--success" : "pill--muted"])
                      }, g((ae = p.value.get(N.id)) != null && ae.configured ? d(n).label("已配置", "Configured") : d(n).label("未配置", "Empty")), 3)
                    ])
                  ], 10, nm);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          c("div", rm, [
            Z(_e, {
              title: b.value.name,
              eyebrow: "Editor"
            }, {
              default: he(() => [
                c("div", im, [
                  c("span", {
                    class: $e(["pill", b.value.enabled ? "pill--success" : "pill--warning"])
                  }, g(b.value.enabled ? d(n).label("正在接收消息", "Receiving traffic") : d(n).label("当前停用", "Currently disabled")), 3),
                  c("span", {
                    class: $e(["pill", b.value.configured ? "pill--success" : "pill--muted"])
                  }, g(b.value.configured ? d(n).label("配置已完成", "Configured") : d(n).label("还未配置", "Not configured")), 3)
                ]),
                c("p", lm, g(I()), 1),
                c("div", am, [
                  (D(!0), V(X, null, ke(K.value, (N) => (D(), V("label", {
                    key: N.key,
                    class: "settings-field"
                  }, [
                    c("span", null, g(N.label), 1),
                    N.help ? (D(), V("small", cm, g(N.help), 1)) : xe("", !0),
                    N.kind === "text" && N.inputType !== "select" ? St((D(), V("input", {
                      key: 1,
                      "onUpdate:modelValue": (M) => a[N.key] = M,
                      class: "settings-input",
                      type: N.inputType || "text"
                    }, null, 8, um)), [
                      [af, a[N.key]]
                    ]) : N.kind === "text" && N.inputType === "select" ? St((D(), V("select", {
                      key: 2,
                      "onUpdate:modelValue": (M) => a[N.key] = M,
                      class: "settings-input"
                    }, [
                      (D(!0), V(X, null, ke(N.options, (M) => (D(), V("option", {
                        key: M.value,
                        value: M.value
                      }, g(M.label), 9, fm))), 128))
                    ], 8, dm)), [
                      [oo, a[N.key]]
                    ]) : (D(), V("label", pm, [
                      St(c("input", {
                        "onUpdate:modelValue": (M) => f[N.key] = M,
                        type: "checkbox"
                      }, null, 8, hm), [
                        [Na, f[N.key]]
                      ]),
                      c("span", null, g(N.help || d(n).label("勾选即启用。", "Checked means enabled.")), 1)
                    ]))
                  ]))), 128))
                ]),
                c("div", gm, [
                  c("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: i.value,
                    onClick: te
                  }, g(i.value ? d(n).label("保存中…", "Saving…") : d(n).label("保存渠道配置", "Save channel configuration")), 9, mm),
                  c("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: A
                  }, g(d(n).label("恢复当前值", "Reset draft")), 1),
                  c("button", {
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: l.value,
                    onClick: O
                  }, g(l.value ? d(n).label("清空中…", "Clearing…") : d(n).label("清空配置", "Clear configuration")), 9, _m)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            Z(_e, {
              title: d(n).label("配置摘要", "Configuration summary"),
              eyebrow: "Summary"
            }, {
              default: he(() => {
                var N, M;
                return [
                  c("div", vm, [
                    c("article", bm, [
                      c("div", null, [
                        c("h3", null, g(d(n).label("普通字段", "Regular fields")), 1),
                        c("p", null, g(d(n).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                      ]),
                      c("strong", null, g(((N = m.value) == null ? void 0 : N.fields.length) || 0), 1)
                    ]),
                    c("article", ym, [
                      c("div", null, [
                        c("h3", null, g(d(n).label("本机变量", "Local secrets")), 1),
                        c("p", null, g(d(n).label("敏感值优先以本机变量方式保存，便于后续替换或清空。", "Sensitive values are best stored as local variables so they can be rotated or cleared later.")), 1)
                      ]),
                      c("strong", null, g(((M = m.value) == null ? void 0 : M.envFields.length) || 0), 1)
                    ]),
                    c("article", Em, [
                      c("div", null, [
                        c("h3", null, g(d(n).label("当前草稿", "Current draft")), 1),
                        c("p", null, g(d(n).label("这里只显示你现在编辑中的内容，不会自动写入运行态。", "This only shows the values you are editing now. Nothing reaches runtime until you save.")), 1)
                      ]),
                      c("strong", null, g(b.value.id), 1)
                    ])
                  ]),
                  c("pre", wm, g(JSON.stringify({
                    enabled: f.enabled,
                    fields: Object.fromEntries(Object.keys(a).filter((C) => !C.startsWith("env:")).map((C) => [C, d(sl)(C) && S(C) ? "******" : S(C)])),
                    envFields: Object.fromEntries(Object.keys(a).filter((C) => C.startsWith("env:")).map((C) => [C, S(C) ? "******" : ""]))
                  }, null, 2)), 1)
                ];
              }),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : xe("", !0)
    ]));
  }
});
async function Om() {
  const [e, t] = await Promise.all([
    Te("/api/ai/config"),
    Te("/api/ai/providers")
  ]);
  return { config: e, catalog: t };
}
function Sm(e) {
  return st("/api/ai/provider", e);
}
function km(e) {
  return ic(`/api/ai/provider/${encodeURIComponent(e)}`);
}
function $m(e) {
  return st("/api/ai/primary", { modelId: e });
}
function Cm(e) {
  return st("/api/ai/fallbacks", { modelIds: e });
}
const Dm = { class: "page-stack" }, xm = { class: "page-header" }, Tm = { class: "page-header__eyebrow" }, Pm = { class: "page-header__title" }, Vm = { class: "page-header__description" }, Am = {
  key: 0,
  class: "page-empty"
}, Rm = {
  key: 1,
  class: "page-empty page-empty--error"
}, Im = { class: "stat-grid" }, Mm = { class: "stat-card" }, Lm = { class: "stat-card__label" }, jm = { class: "stat-card" }, Fm = { class: "stat-card__label" }, Um = { class: "stat-card" }, Hm = { class: "stat-card__label" }, Bm = { class: "stat-card" }, Gm = { class: "stat-card__label" }, Wm = { class: "settings-grid settings-grid--wide" }, Km = { class: "settings-field" }, zm = { value: "" }, qm = ["value"], Jm = { class: "checkbox-grid" }, Ym = ["checked", "onChange"], Qm = { class: "page-actions" }, Xm = ["disabled"], Zm = { class: "page-two-column" }, e_ = { class: "catalog-list" }, t_ = ["onClick"], n_ = { class: "catalog-list__title" }, s_ = { class: "pill-row" }, o_ = { class: "page-stack" }, r_ = { class: "muted-copy" }, i_ = { class: "settings-grid settings-grid--wide" }, l_ = { class: "settings-field" }, a_ = { class: "settings-field" }, c_ = { class: "settings-field" }, u_ = ["value"], d_ = { class: "settings-field" }, f_ = { class: "settings-field settings-field--full" }, p_ = { class: "page-actions" }, h_ = ["disabled"], g_ = ["disabled"], m_ = { class: "provider-stack" }, __ = { class: "provider-card__header" }, v_ = { class: "pill-row" }, b_ = {
  key: 0,
  class: "pill pill--success"
}, y_ = {
  key: 1,
  class: "pill pill--muted"
}, E_ = { class: "mini-list" }, w_ = { class: "pill-row" }, N_ = {
  key: 0,
  class: "pill pill--success"
}, O_ = {
  key: 1,
  class: "pill pill--info"
}, S_ = /* @__PURE__ */ Be({
  __name: "ModelsPage",
  setup(e) {
    const t = ["openai-completions", "anthropic-messages", "openai-responses"], n = Wt(), s = zn(), o = Ht(() => Om()), r = /* @__PURE__ */ me("__new__"), i = /* @__PURE__ */ me(!1), l = /* @__PURE__ */ me(!1), a = /* @__PURE__ */ me(!1), f = /* @__PURE__ */ me(""), p = /* @__PURE__ */ me([]), u = /* @__PURE__ */ on({
      mode: "new",
      title: "",
      canDelete: !1,
      name: "",
      baseUrl: "",
      apiType: "openai-completions",
      apiKey: "",
      apiKeyHelp: "",
      modelsText: ""
    }), m = ue(() => {
      const S = o.data, v = (S == null ? void 0 : S.config.providers) || [], E = (S == null ? void 0 : S.catalog.presets) || [];
      return [
        { value: "__new__", label: n.label("新建空白 Provider", "Create blank provider"), kind: "new" },
        ...v.map((N) => ({
          value: N.name,
          label: `${N.name} · ${n.label("已配置", "configured")}`,
          kind: "custom"
        })),
        ...E.filter((N) => !v.some((M) => M.name === N.id)).map((N) => ({
          value: N.id,
          label: `${N.id} · ${n.label("预设", "preset")}`,
          kind: "preset"
        }))
      ];
    }), b = ue(() => {
      var v;
      return (((v = o.data) == null ? void 0 : v.config.providers) || []).flatMap((E) => E.models.map((N) => ({
        providerName: E.name,
        fullId: N.fullId,
        name: N.name,
        api: N.api
      })));
    });
    function T(S, v) {
      return S.map((E) => [
        E.id || "",
        E.name || E.id || "",
        E.contextWindow || "",
        E.maxTokens || "",
        E.api || v || ""
      ].join("|")).join(`
`);
    }
    function $(S, v) {
      return S.split(/\r?\n/).map((E) => E.trim()).filter(Boolean).map((E) => {
        const [N, M, C, z, ae] = E.split("|").map((je) => je.trim());
        return {
          id: N,
          name: M || N,
          contextWindow: lr(C),
          maxTokens: lr(z),
          api: ae || v || void 0
        };
      }).filter((E) => E.id);
    }
    function K(S) {
      var je, Pe;
      const v = o.data;
      if (!v) return;
      const E = v.config.providers, N = new Map(E.map((ce) => [ce.name, ce])), M = new Map((v.catalog.custom || []).map((ce) => [ce.name, ce])), C = new Map((v.catalog.presets || []).map((ce) => [ce.id, ce]));
      if (!S || S === "__new__") {
        u.mode = "new", u.title = n.label("新建 Provider", "Create provider"), u.canDelete = !1, u.name = "", u.baseUrl = "", u.apiType = "openai-completions", u.apiKey = "", u.apiKeyHelp = n.label("保存后写入 openclaw.json。", "Saved into openclaw.json after you confirm."), u.modelsText = "";
        return;
      }
      const z = M.get(S);
      if (z) {
        const ce = N.get(S);
        u.mode = "custom", u.title = n.label("编辑已配置 Provider", "Edit configured provider"), u.canDelete = !0, u.name = S, u.baseUrl = z.baseUrl || "", u.apiType = z.apiType || z.api || ((Pe = (je = z.models) == null ? void 0 : je[0]) == null ? void 0 : Pe.api) || "openai-completions", u.apiKey = "", u.apiKeyHelp = ce != null && ce.apiKeyMasked ? n.label(`留空会保留现有密钥：${ce.apiKeyMasked}`, `Leave blank to keep the current key: ${ce.apiKeyMasked}`) : n.label("填写后会覆盖当前密钥。", "A filled value replaces the current key."), u.modelsText = T(z.models || [], u.apiType);
        return;
      }
      const ae = C.get(S);
      if (ae) {
        u.mode = "preset", u.title = n.label("从预设带入 Provider", "Bootstrap provider from preset"), u.canDelete = !1, u.name = ae.id, u.baseUrl = ae.defaultBaseUrl || "", u.apiType = ae.apiType || "openai-completions", u.apiKey = "", u.apiKeyHelp = ae.requiresApiKey ? n.label("保存前请填写 API Key。", "Fill in the API key before saving.") : n.label("这个 Provider 通常不需要 API Key。", "This provider usually does not require an API key."), u.modelsText = T(
          (ae.suggestedModels || []).map((ce) => ({
            id: ce.id,
            name: ce.name,
            api: ae.apiType
          })),
          ae.apiType
        );
        return;
      }
      r.value = "__new__";
    }
    qe(
      () => o.data,
      (S) => {
        var E;
        if (!S) return;
        f.value = S.config.primaryModel || "", p.value = [...S.config.fallbackModels || []];
        const v = m.value;
        if (!v.some((N) => N.value === r.value)) {
          r.value = ((E = v[1]) == null ? void 0 : E.value) || "__new__";
          return;
        }
        K(r.value);
      },
      { immediate: !0 }
    ), qe(r, (S) => {
      K(S);
    });
    async function F() {
      i.value = !0;
      try {
        const S = await $m(f.value);
        if (!S.success)
          throw new Error(S.message);
        const v = await Cm(p.value.filter((E) => E !== f.value));
        if (!v.success)
          throw new Error(v.message);
        s.pushToast({
          tone: "success",
          message: n.label("模型路由已更新。", "Model routing was updated.")
        }), await o.execute({ silent: !0 });
      } catch (S) {
        s.pushToast({
          tone: "error",
          message: S instanceof Error ? S.message : String(S)
        });
      } finally {
        i.value = !1;
      }
    }
    async function A() {
      l.value = !0;
      try {
        const S = await Sm({
          name: u.name.trim(),
          baseUrl: u.baseUrl.trim(),
          apiKey: u.apiKey.trim() || void 0,
          apiType: u.apiType,
          models: $(u.modelsText, u.apiType)
        });
        s.pushToast({
          tone: S.success ? "success" : "error",
          message: S.message
        }), S.success && (r.value = u.name.trim() || "__new__", await o.execute({ silent: !0 }));
      } catch (S) {
        s.pushToast({
          tone: "error",
          message: S instanceof Error ? S.message : String(S)
        });
      } finally {
        l.value = !1;
      }
    }
    async function I() {
      if (!(!u.canDelete || !u.name || !await s.confirm({
        title: n.label("删除 Provider", "Delete provider"),
        message: n.label(
          `确认删除 ${u.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
          `Delete ${u.name}? This also removes its model definitions, primary selection, and fallback references.`
        ),
        confirmLabel: n.label("确认删除", "Delete provider"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        a.value = !0;
        try {
          const v = await km(u.name);
          s.pushToast({
            tone: v.success ? "success" : "error",
            message: v.message
          }), v.success && (r.value = "__new__", await o.execute({ silent: !0 }));
        } catch (v) {
          s.pushToast({
            tone: "error",
            message: v instanceof Error ? v.message : String(v)
          });
        } finally {
          a.value = !1;
        }
      }
    }
    function te(S) {
      if (p.value.includes(S)) {
        p.value = p.value.filter((v) => v !== S);
        return;
      }
      p.value = [...p.value, S];
    }
    function O(S, v) {
      var E;
      return S ? n.label(`预设入口：${S.name}`, `Preset source: ${S.name}`) : (E = v == null ? void 0 : v.models) != null && E.length ? n.label(`当前已录入 ${v.models.length} 个模型`, `${v.models.length} model entries are recorded now`) : n.label("保存后就会写入当前 openclaw.json。", "Saving writes the provider into the active openclaw.json.");
    }
    return (S, v) => (D(), V("div", Dm, [
      c("header", xm, [
        c("div", null, [
          c("p", Tm, g(d(n).label("模型 / Second slice", "Models / Second slice")), 1),
          c("h2", Pm, g(d(n).label("模型策略", "Model strategy")), 1),
          c("p", Vm, g(d(n).label("把 Provider、主模型和 fallback 链迁到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        c("button", {
          class: "page-header__action",
          type: "button",
          onClick: v[0] || (v[0] = (E) => d(o).execute({ silent: !0 }))
        }, g(d(o).refreshing ? d(n).label("刷新中…", "Refreshing…") : d(n).label("刷新", "Refresh")), 1)
      ]),
      d(o).loading ? (D(), V("div", Am, g(d(n).label("正在读取模型配置…", "Loading model configuration…")), 1)) : d(o).error ? (D(), V("div", Rm, g(d(o).error), 1)) : d(o).data ? (D(), V(X, { key: 2 }, [
        Z(_e, {
          title: d(n).label("当前路由概览", "Current routing overview"),
          eyebrow: "Routing"
        }, {
          default: he(() => [
            c("div", Im, [
              c("article", Mm, [
                c("p", Lm, g(d(n).label("主模型", "Primary model")), 1),
                c("strong", null, g(d(o).data.config.primaryModel || d(n).label("待设置", "Not configured")), 1),
                c("span", null, g(d(n).label("默认执行路径", "Default execution route")), 1)
              ]),
              c("article", jm, [
                c("p", Fm, g(d(n).label("Provider 数量", "Providers")), 1),
                c("strong", null, g(d(o).data.config.providers.length), 1),
                c("span", null, g(d(n).label("已经进入运行配置", "Already present in runtime config")), 1)
              ]),
              c("article", Um, [
                c("p", Hm, g(d(n).label("备用模型", "Fallbacks")), 1),
                c("strong", null, g(d(o).data.config.fallbackModels.length), 1),
                c("span", null, g(d(n).label("主模型失败时按顺序尝试", "Tried in sequence when the primary route fails")), 1)
              ]),
              c("article", Bm, [
                c("p", Gm, g(d(n).label("可选模型", "Available models")), 1),
                c("strong", null, g(b.value.length), 1),
                c("span", null, g(d(n).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        Z(_e, {
          title: d(n).label("主模型与备用链路", "Primary and fallback chain"),
          eyebrow: "Routing editor"
        }, {
          default: he(() => [
            c("div", Wm, [
              c("label", Km, [
                c("span", null, g(d(n).label("主模型", "Primary model")), 1),
                c("small", null, g(d(n).label("Guard 默认先走这一条模型路径。", "Guard routes here first by default.")), 1),
                St(c("select", {
                  "onUpdate:modelValue": v[1] || (v[1] = (E) => f.value = E),
                  class: "settings-input"
                }, [
                  c("option", zm, g(d(n).label("暂不设置", "Leave unset")), 1),
                  (D(!0), V(X, null, ke(b.value, (E) => (D(), V("option", {
                    key: E.fullId,
                    value: E.fullId
                  }, g(`${E.providerName} / ${E.name}`), 9, qm))), 128))
                ], 512), [
                  [oo, f.value]
                ])
              ])
            ]),
            c("div", Jm, [
              (D(!0), V(X, null, ke(b.value, (E) => (D(), V("label", {
                key: E.fullId,
                class: "checkbox-card"
              }, [
                c("input", {
                  checked: p.value.includes(E.fullId),
                  type: "checkbox",
                  onChange: (N) => te(E.fullId)
                }, null, 40, Ym),
                c("div", null, [
                  c("strong", null, g(`${E.providerName} / ${E.name}`), 1),
                  c("p", null, g(E.api || d(n).label("未声明 API 类型", "API type is not declared")), 1)
                ])
              ]))), 128))
            ]),
            c("div", Qm, [
              c("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: i.value,
                onClick: F
              }, g(i.value ? d(n).label("保存中…", "Saving…") : d(n).label("保存路由策略", "Save routing strategy")), 9, Xm)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        c("div", Zm, [
          Z(_e, {
            title: d(n).label("Provider 选择器", "Provider picker"),
            eyebrow: "Provider"
          }, {
            default: he(() => [
              c("div", e_, [
                (D(!0), V(X, null, ke(m.value, (E) => (D(), V("button", {
                  key: E.value,
                  class: $e(["catalog-list__item", { "catalog-list__item--active": r.value === E.value }]),
                  type: "button",
                  onClick: (N) => r.value = E.value
                }, [
                  c("div", n_, [
                    c("strong", null, g(E.label), 1)
                  ]),
                  c("div", s_, [
                    c("span", {
                      class: $e(["pill", E.kind === "custom" ? "pill--success" : E.kind === "preset" ? "pill--info" : "pill--muted"])
                    }, g(E.kind === "custom" ? d(n).label("已配置", "Configured") : E.kind === "preset" ? d(n).label("预设", "Preset") : d(n).label("空白", "Blank")), 3)
                  ])
                ], 10, t_))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          c("div", o_, [
            Z(_e, {
              title: u.title,
              eyebrow: "Editor"
            }, {
              default: he(() => [
                c("p", r_, g(O(d(o).data.catalog.presets.find((E) => E.id === r.value), d(o).data.catalog.custom.find((E) => E.name === r.value))), 1),
                c("div", i_, [
                  c("label", l_, [
                    c("span", null, g(d(n).label("Provider 名称", "Provider name")), 1),
                    St(c("input", {
                      "onUpdate:modelValue": v[2] || (v[2] = (E) => u.name = E),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [mn, u.name]
                    ])
                  ]),
                  c("label", a_, [
                    v[8] || (v[8] = c("span", null, "Base URL", -1)),
                    St(c("input", {
                      "onUpdate:modelValue": v[3] || (v[3] = (E) => u.baseUrl = E),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [mn, u.baseUrl]
                    ])
                  ]),
                  c("label", c_, [
                    c("span", null, g(d(n).label("默认 API 类型", "Default API type")), 1),
                    St(c("select", {
                      "onUpdate:modelValue": v[4] || (v[4] = (E) => u.apiType = E),
                      class: "settings-input"
                    }, [
                      (D(), V(X, null, ke(t, (E) => c("option", {
                        key: E,
                        value: E
                      }, g(E), 9, u_)), 64))
                    ], 512), [
                      [oo, u.apiType]
                    ])
                  ]),
                  c("label", d_, [
                    v[9] || (v[9] = c("span", null, "API Key", -1)),
                    c("small", null, g(u.apiKeyHelp), 1),
                    St(c("input", {
                      "onUpdate:modelValue": v[5] || (v[5] = (E) => u.apiKey = E),
                      class: "settings-input",
                      type: "password"
                    }, null, 512), [
                      [mn, u.apiKey]
                    ])
                  ]),
                  c("label", f_, [
                    c("span", null, g(d(n).label("模型列表", "Model list")), 1),
                    c("small", null, g(d(n).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                    St(c("textarea", {
                      "onUpdate:modelValue": v[6] || (v[6] = (E) => u.modelsText = E),
                      class: "settings-textarea",
                      rows: "8"
                    }, null, 512), [
                      [mn, u.modelsText]
                    ])
                  ])
                ]),
                c("div", p_, [
                  c("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: l.value,
                    onClick: A
                  }, g(l.value ? d(n).label("保存中…", "Saving…") : d(n).label("保存 Provider", "Save provider")), 9, h_),
                  c("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: v[7] || (v[7] = (E) => K(r.value))
                  }, g(d(n).label("恢复当前内容", "Reset draft")), 1),
                  u.canDelete ? (D(), V("button", {
                    key: 0,
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: a.value,
                    onClick: I
                  }, g(a.value ? d(n).label("删除中…", "Deleting…") : d(n).label("删除 Provider", "Delete provider")), 9, g_)) : xe("", !0)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            Z(_e, {
              title: d(n).label("已配置 Provider", "Configured providers"),
              eyebrow: "Overview"
            }, {
              default: he(() => [
                c("div", m_, [
                  (D(!0), V(X, null, ke(d(o).data.config.providers, (E) => (D(), V("article", {
                    key: E.name,
                    class: "provider-card"
                  }, [
                    c("header", __, [
                      c("div", null, [
                        c("strong", null, g(E.name), 1),
                        c("p", null, g(E.baseUrl), 1)
                      ]),
                      c("div", v_, [
                        E.hasApiKey ? (D(), V("span", b_, g(d(n).label("有密钥", "Has key")), 1)) : (D(), V("span", y_, g(d(n).label("无密钥", "No key")), 1))
                      ])
                    ]),
                    c("div", E_, [
                      (D(!0), V(X, null, ke(E.models, (N) => (D(), V("div", {
                        key: N.fullId,
                        class: "mini-list__item"
                      }, [
                        c("div", null, [
                          c("strong", null, g(N.name), 1),
                          c("p", null, g(N.fullId), 1)
                        ]),
                        c("div", w_, [
                          N.isPrimary ? (D(), V("span", N_, g(d(n).label("主模型", "Primary")), 1)) : xe("", !0),
                          N.isFallback ? (D(), V("span", O_, g(d(n).label("备用", "Fallback")), 1)) : xe("", !0)
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
      ], 64)) : xe("", !0)
    ]));
  }
}), k_ = { class: "page-stack" }, $_ = { class: "page-header" }, C_ = { class: "page-header__eyebrow" }, D_ = { class: "page-header__title" }, x_ = { class: "page-header__description" }, T_ = {
  key: 0,
  class: "page-empty"
}, P_ = {
  key: 1,
  class: "page-empty page-empty--error"
}, V_ = { class: "code-panel" }, A_ = { class: "code-panel" }, R_ = /* @__PURE__ */ Be({
  __name: "OpenClawPage",
  setup(e) {
    const t = Wt(), n = Ht(() => hg());
    function s(o) {
      return JSON.stringify(o, null, 2);
    }
    return (o, r) => (D(), V("div", k_, [
      c("header", $_, [
        c("div", null, [
          c("p", C_, g(d(t).label("OpenClaw / First slice", "OpenClaw / First slice")), 1),
          c("h2", D_, g(d(t).label("OpenClaw 生命周期面板", "OpenClaw lifecycle panel")), 1),
          c("p", x_, g(d(t).label("保留现有后端接口，只把读取、结构和高级区分层迁到 Vue 壳层。", "Keep the current backend API and move its reads, structure, and advanced layout into the Vue shell.")), 1)
        ]),
        c("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (i) => d(n).execute({ silent: !0 }))
        }, g(d(n).refreshing ? d(t).label("刷新中…", "Refreshing…") : d(t).label("刷新", "Refresh")), 1)
      ]),
      d(n).loading ? (D(), V("div", T_, g(d(t).label("正在加载 OpenClaw 状态…", "Loading the OpenClaw status…")), 1)) : d(n).error ? (D(), V("div", P_, g(d(n).error), 1)) : d(n).data ? (D(), V(X, { key: 2 }, [
        Z(_e, {
          title: d(t).label("状态快照", "Status snapshot"),
          eyebrow: "Status"
        }, {
          default: he(() => [
            c("pre", V_, g(s(d(n).data.status)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        Z(_e, {
          title: d(t).label("可选目标与回退目录", "Targets and rollback catalog"),
          eyebrow: "Targets"
        }, {
          default: he(() => [
            c("pre", A_, g(s(d(n).data.targets)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : xe("", !0)
    ]));
  }
}), I_ = { class: "page-stack" }, M_ = { class: "page-header" }, L_ = { class: "page-header__eyebrow" }, j_ = { class: "page-header__title" }, F_ = { class: "page-header__description" }, U_ = {
  key: 0,
  class: "page-empty"
}, H_ = {
  key: 1,
  class: "page-empty page-empty--error"
}, B_ = { class: "code-panel" }, G_ = { class: "code-panel" }, W_ = /* @__PURE__ */ Be({
  __name: "OperationsPage",
  setup(e) {
    const t = Wt(), n = Ht(() => pg());
    function s(o) {
      return JSON.stringify(o, null, 2);
    }
    return (o, r) => (D(), V("div", I_, [
      c("header", M_, [
        c("div", null, [
          c("p", L_, g(d(t).label("运维 / First slice", "Operations / First slice")), 1),
          c("h2", j_, g(d(t).label("运行态与后台服务", "Runtime and background services")), 1),
          c("p", F_, g(d(t).label("先把状态读取、最小刷新和结构化信息展示模块化。后续再逐步迁移交互按钮。", "Modularize status reads, light refresh, and structured rendering first. Button interactions can follow in later slices.")), 1)
        ]),
        c("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (i) => d(n).execute({ silent: !0 }))
        }, g(d(n).refreshing ? d(t).label("刷新中…", "Refreshing…") : d(t).label("刷新", "Refresh")), 1)
      ]),
      d(n).loading ? (D(), V("div", U_, g(d(t).label("正在加载运维状态…", "Loading operations status…")), 1)) : d(n).error ? (D(), V("div", H_, g(d(n).error), 1)) : d(n).data ? (D(), V(X, { key: 2 }, [
        Z(_e, {
          title: d(t).label("后台 Web 报告", "Background web report"),
          eyebrow: "Web report"
        }, {
          default: he(() => [
            c("pre", B_, g(s(d(n).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        Z(_e, {
          title: d(t).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Services"
        }, {
          default: he(() => [
            c("pre", G_, g(s(d(n).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : xe("", !0)
    ]));
  }
}), K_ = { class: "page-stack" }, z_ = { class: "page-header" }, q_ = { class: "page-header__eyebrow" }, J_ = { class: "page-header__title" }, Y_ = { class: "page-header__description" }, Q_ = ["href"], X_ = { class: "muted-copy" }, Z_ = /* @__PURE__ */ Be({
  __name: "PlaceholderPage",
  props: {
    titleZh: {},
    titleEn: {},
    descriptionZh: {},
    descriptionEn: {},
    legacyHash: {}
  },
  setup(e) {
    const t = e, n = Wt(), s = ue(() => n.label(t.titleZh, t.titleEn)), o = ue(() => n.label(t.descriptionZh, t.descriptionEn)), r = ue(() => n.label("打开当前正式控制台中的这一页", "Open this page in the current production console"));
    return (i, l) => (D(), V("div", K_, [
      c("header", z_, [
        c("div", null, [
          c("p", q_, g(d(n).label("迁移排队中", "Queued for migration")), 1),
          c("h2", J_, g(s.value), 1),
          c("p", Y_, g(o.value), 1)
        ]),
        c("a", {
          class: "page-header__action page-header__action--link",
          href: `/${e.legacyHash}`,
          target: "_blank",
          rel: "noreferrer"
        }, g(r.value), 9, Q_)
      ]),
      Z(_e, {
        title: d(n).label("当前阶段说明", "Current phase")
      }, {
        default: he(() => [
          c("p", X_, g(d(n).label("这一页已经纳入新的 Vue + Pinia + Router 骨架，但业务区块还没从旧版原生脚本完全迁过来。保留直接跳转旧控制台，是为了让迁移期间的实际操作不中断。", "This page is already part of the new Vue + Pinia + Router skeleton, but its business modules have not fully moved over from the native script yet. The legacy shortcut keeps real operations uninterrupted during the migration window.")), 1)
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
}), ev = {
  class: "page-tabs",
  role: "tablist"
}, tv = ["aria-selected", "onClick"], nv = { key: 0 }, lc = /* @__PURE__ */ Be({
  __name: "PageTabs",
  props: {
    items: {},
    activeId: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, o) => (D(), V("div", ev, [
      (D(!0), V(X, null, ke(e.items, (r) => (D(), V("button", {
        key: r.id,
        class: $e(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
        type: "button",
        role: "tab",
        "aria-selected": r.id === e.activeId,
        onClick: (i) => n("change", r.id)
      }, [
        c("span", null, g(r.label), 1),
        r.hint ? (D(), V("small", nv, g(r.hint), 1)) : xe("", !0)
      ], 10, tv))), 128))
    ]));
  }
});
async function sv() {
  const [e, t, n, s] = await Promise.all([
    Te("/api/recovery/overview"),
    Te("/api/recovery/points?limit=20"),
    Te("/api/git-sync/status"),
    Te("/api/git-sync/gitignore-preview?mode=smart")
  ]);
  return {
    overview: e,
    points: t.items || [],
    gitStatus: n,
    gitIgnorePreview: s
  };
}
function ov(e) {
  return st("/api/recovery/save", { label: e || "" });
}
function rv(e) {
  return st("/api/recovery/restore", { commitSha: e });
}
function iv() {
  return st("/api/git-sync/init", {});
}
function lv() {
  return st("/api/git-sync/check-private", {});
}
function av(e) {
  return st("/api/git-sync/commit", { message: "" });
}
function cv() {
  return st("/api/git-sync/push", {});
}
function uv(e) {
  return st("/api/git-sync/sync", { message: "" });
}
function dv(e = "smart") {
  return st("/api/git-sync/gitignore-apply", { mode: e });
}
const fv = { class: "page-stack" }, pv = { class: "page-header" }, hv = { class: "page-header__eyebrow" }, gv = { class: "page-header__title" }, mv = { class: "page-header__description" }, _v = {
  key: 0,
  class: "page-empty"
}, vv = {
  key: 1,
  class: "page-empty page-empty--error"
}, bv = { class: "provider-card__header" }, yv = { class: "muted-copy" }, Ev = { class: "stat-grid" }, wv = { class: "stat-card" }, Nv = { class: "stat-card__label" }, Ov = { class: "stat-card" }, Sv = { class: "stat-card__label" }, kv = { class: "stat-card" }, $v = { class: "stat-card__label" }, Cv = { class: "stat-card" }, Dv = { class: "stat-card__label" }, xv = { class: "list-stack" }, Tv = { class: "action-row" }, Pv = { class: "pill pill--info" }, Vv = { class: "action-row" }, Av = { class: "pill pill--success" }, Rv = { class: "settings-grid settings-grid--wide" }, Iv = { class: "settings-field settings-field--full" }, Mv = { class: "page-actions" }, Lv = ["disabled"], jv = {
  key: 0,
  class: "provider-stack"
}, Fv = { class: "provider-card__header" }, Uv = { class: "pill-row" }, Hv = { class: "pill pill--info" }, Bv = {
  key: 0,
  class: "muted-copy"
}, Gv = { class: "page-actions" }, Wv = ["onClick"], Kv = ["disabled", "onClick"], zv = {
  key: 1,
  class: "page-empty"
}, qv = { class: "muted-copy" }, Jv = { class: "page-actions" }, Yv = {
  class: "inline-link",
  href: "/#recovery",
  target: "_blank",
  rel: "noreferrer"
}, Qv = { class: "stat-grid" }, Xv = { class: "stat-card" }, Zv = { class: "stat-card__label" }, eb = { class: "stat-card" }, tb = { class: "stat-card__label" }, nb = { class: "stat-card" }, sb = { class: "stat-card__label" }, ob = { class: "stat-card" }, rb = { class: "stat-card__label" }, ib = { class: "page-actions" }, lb = ["disabled"], ab = ["disabled"], cb = ["disabled"], ub = ["disabled"], db = ["disabled"], fb = {
  key: 0,
  class: "muted-copy"
}, pb = { class: "list-stack" }, hb = { class: "action-row" }, gb = { class: "action-row" }, mb = { class: "action-row" }, _b = { class: "code-panel" }, vb = { class: "muted-copy" }, bb = { class: "stat-grid" }, yb = { class: "stat-card" }, Eb = { class: "stat-card__label" }, wb = { class: "stat-card" }, Nb = { class: "stat-card__label" }, Ob = { class: "code-panel" }, Sb = { class: "page-actions" }, kb = ["disabled"], $b = /* @__PURE__ */ Be({
  __name: "RecoveryPage",
  setup(e) {
    const t = Wt(), n = zn(), s = /* @__PURE__ */ me("center"), o = /* @__PURE__ */ me(""), r = /* @__PURE__ */ me(""), i = /* @__PURE__ */ me(!1), l = /* @__PURE__ */ me(""), a = /* @__PURE__ */ me(""), f = Ht(() => sv()), p = ue(() => [
      { id: "center", label: t.label("恢复中心", "Recovery center") },
      { id: "advanced", label: t.label("高级 Git", "Advanced Git") }
    ]), u = ue(() => {
      var S;
      const O = (S = f.data) == null ? void 0 : S.overview;
      return O ? !O.repoReady || O.warnings.length > 0 ? "pill--warning" : O.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
    });
    function m() {
      var S;
      const O = (S = f.data) == null ? void 0 : S.overview;
      return O ? O.protected ? O.remoteReady ? t.label("已上云保护", "Cloud protection ready") : t.label("当前仅本机可恢复", "Local recovery only") : t.label("尚未建立保护", "Protection not set up") : t.label("读取中", "Loading");
    }
    function b(O) {
      const v = {
        "install-git": { zh: "先安装 Git", en: "Install Git first" },
        "setup-protection": { zh: "先完成保护设置", en: "Complete protection setup first" },
        "save-first-point": { zh: "创建首个恢复点", en: "Create the first recovery point" },
        "save-current-state": { zh: "先保存当前状态", en: "Save the current state first" },
        "review-restored-state": { zh: "检查刚恢复的状态", en: "Review the restored state" },
        "connect-private-remote": { zh: "连接私有仓库", en: "Connect a private remote" },
        "sync-latest-point": { zh: "把最新保护点同步到云端", en: "Sync the latest point to the cloud" },
        protected: { zh: "当前已经受保护", en: "Protection is already in place" }
      }[O || ""];
      return v ? t.label(v.zh, v.en) : O || "-";
    }
    function T(O) {
      return O.kind === "auto" ? t.label("自动保护", "Auto protection") : O.kind === "restore" ? t.label("已恢复到此状态", "Restore point") : t.label("手动保存", "Manual save");
    }
    async function $() {
      await f.execute({ silent: !!f.data });
    }
    async function K() {
      i.value = !0;
      try {
        const O = await ov(o.value.trim() || void 0);
        n.pushToast({
          tone: O.success ? "success" : "error",
          message: O.message
        }), O.success && (o.value = "", await $());
      } catch (O) {
        n.pushToast({
          tone: "error",
          message: O instanceof Error ? O.message : String(O)
        });
      } finally {
        i.value = !1;
      }
    }
    async function F(O) {
      if (await n.confirm({
        title: t.label("恢复到这个状态", "Restore this state"),
        message: t.label(
          `确认回到 ${O.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
          `Restore ${O.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`
        ),
        confirmLabel: t.label("确认恢复", "Restore now"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      })) {
        l.value = O.commitSha;
        try {
          const v = await rv(O.commitSha);
          n.pushToast({
            tone: v.success ? "success" : "error",
            message: v.message
          }), await $();
        } catch (v) {
          n.pushToast({
            tone: "error",
            message: v instanceof Error ? v.message : String(v)
          });
        } finally {
          l.value = "";
        }
      }
    }
    async function A(O) {
      a.value = O, r.value = "";
      try {
        const S = O === "init" ? await iv() : O === "private" ? await lv() : O === "checkpoint" ? await av() : O === "push" ? await cv() : O === "sync" ? await uv() : await dv("smart");
        r.value = S.message, n.pushToast({
          tone: S.success ? "success" : "error",
          message: S.message
        }), await $();
      } catch (S) {
        const v = S instanceof Error ? S.message : String(S);
        r.value = v, n.pushToast({
          tone: "error",
          message: v
        });
      } finally {
        a.value = "";
      }
    }
    function I(O) {
      s.value = O;
    }
    async function te(O) {
      var S;
      typeof navigator > "u" || !((S = navigator.clipboard) != null && S.writeText) || (await navigator.clipboard.writeText(O), n.pushToast({
        tone: "success",
        message: t.label("恢复点哈希已复制。", "Recovery point hash copied.")
      }));
    }
    return (O, S) => (D(), V("div", fv, [
      c("header", pv, [
        c("div", null, [
          c("p", hv, g(d(t).label("备份与恢复 / Second slice", "Backup & Recovery / Second slice")), 1),
          c("h2", gv, g(d(t).label("备份与恢复", "Backup & Recovery")), 1),
          c("p", mv, g(d(t).label("默认先讲“保存现在、回到某个状态、然后继续往前走”，把 Git 细节下沉到高级视图。", "Start with save now, go back to a protected state, then keep moving forward, while pushing raw Git details into the advanced view.")), 1)
        ]),
        c("button", {
          class: "page-header__action",
          type: "button",
          onClick: $
        }, g(d(f).refreshing ? d(t).label("刷新中…", "Refreshing…") : d(t).label("刷新", "Refresh")), 1)
      ]),
      Z(lc, {
        items: p.value,
        "active-id": s.value,
        onChange: I
      }, null, 8, ["items", "active-id"]),
      d(f).loading ? (D(), V("div", _v, g(d(t).label("正在读取保护状态…", "Loading protection status…")), 1)) : d(f).error ? (D(), V("div", vv, g(d(f).error), 1)) : d(f).data ? (D(), V(X, { key: 2 }, [
        s.value === "center" ? (D(), V(X, { key: 0 }, [
          Z(_e, {
            title: d(t).label("当前保护状态", "Current protection state"),
            eyebrow: "Overview"
          }, {
            default: he(() => {
              var v;
              return [
                c("div", bv, [
                  c("p", yv, g(d(t).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
                  c("span", {
                    class: $e(["pill", u.value])
                  }, g(m()), 3)
                ]),
                c("div", Ev, [
                  c("article", wv, [
                    c("p", Nv, g(d(t).label("当前主线", "Current branch")), 1),
                    c("strong", null, g(d(f).data.overview.currentBranch || "-"), 1),
                    c("span", null, g(d(t).label("恢复后仍会继续写在这条主线上", "Future saves continue on the same main line after a restore")), 1)
                  ]),
                  c("article", Ov, [
                    c("p", Sv, g(d(t).label("最近保存", "Last saved")), 1),
                    c("strong", null, g(d(xs)(d(f).data.overview.lastSavedAt)), 1),
                    c("span", null, g(((v = d(f).data.overview.latestPoint) == null ? void 0 : v.title) || d(t).label("还没有恢复点", "No recovery point yet")), 1)
                  ]),
                  c("article", kv, [
                    c("p", $v, g(d(t).label("最近上云", "Last pushed")), 1),
                    c("strong", null, g(d(xs)(d(f).data.overview.lastPushedAt)), 1),
                    c("span", null, g(d(f).data.overview.remoteReady ? d(t).label("云端保护已就绪", "Cloud protection is ready") : d(t).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
                  ]),
                  c("article", Cv, [
                    c("p", Dv, g(d(t).label("下一步建议", "Recommended next step")), 1),
                    c("strong", null, g(b(d(f).data.overview.nextAction)), 1),
                    c("span", null, g(d(f).data.overview.unsyncedChanges ? d(t).label("当前存在未同步变化", "There are unsynced changes right now") : d(t).label("当前没有额外待处理变化", "No extra pending changes right now")), 1)
                  ])
                ])
              ];
            }),
            _: 1
          }, 8, ["title"]),
          Z(_e, {
            title: d(t).label("下一步建议", "Recommended next actions"),
            eyebrow: "Guide"
          }, {
            default: he(() => [
              c("div", xv, [
                c("article", Tv, [
                  c("div", null, [
                    c("h3", null, g(d(t).label("先保住现在", "Protect the current state")), 1),
                    c("p", null, g(d(t).label("当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。", "Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.")), 1)
                  ]),
                  c("span", Pv, g(b(d(f).data.overview.nextAction)), 1)
                ]),
                c("article", Vv, [
                  c("div", null, [
                    c("h3", null, g(d(t).label("回退不会删历史", "Restoring does not delete history")), 1),
                    c("p", null, g(d(t).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
                  ]),
                  c("span", Av, g(d(t).label("同一主线继续", "Continue on the same main line")), 1)
                ]),
                (D(!0), V(X, null, ke(d(f).data.overview.warnings, (v) => (D(), V("article", {
                  key: v,
                  class: "risk-row"
                }, [
                  c("strong", null, g(d(t).label("注意事项", "Warning")), 1),
                  c("span", null, g(v), 1)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(_e, {
            title: d(t).label("立即保存", "Save now"),
            eyebrow: "Checkpoint"
          }, {
            default: he(() => [
              c("div", Rv, [
                c("label", Iv, [
                  c("span", null, g(d(t).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
                  c("small", null, g(d(t).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
                  St(c("input", {
                    "onUpdate:modelValue": S[0] || (S[0] = (v) => o.value = v),
                    class: "settings-input",
                    type: "text"
                  }, null, 512), [
                    [mn, o.value]
                  ])
                ])
              ]),
              c("div", Mv, [
                c("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: i.value,
                  onClick: K
                }, g(i.value ? d(t).label("保存中…", "Saving…") : d(t).label("保存当前状态", "Save current state")), 9, Lv)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(_e, {
            title: d(t).label("恢复点时间线", "Recovery point timeline"),
            eyebrow: "Timeline"
          }, {
            default: he(() => [
              d(f).data.points.length ? (D(), V("div", jv, [
                (D(!0), V(X, null, ke(d(f).data.points, (v) => (D(), V("article", {
                  key: v.id,
                  class: "provider-card"
                }, [
                  c("header", Fv, [
                    c("div", null, [
                      c("strong", null, g(v.title), 1),
                      c("p", null, g(d(xs)(v.createdAt)) + " · " + g(d(nl)(v.commitSha)), 1)
                    ]),
                    c("div", Uv, [
                      c("span", Hv, g(T(v)), 1),
                      c("span", {
                        class: $e(["pill", v.pushed ? "pill--success" : "pill--warning"])
                      }, g(v.pushed ? d(t).label("已上云", "Synced") : d(t).label("仅本机", "Local only")), 3)
                    ])
                  ]),
                  c("p", null, g(v.summary), 1),
                  v.sourceCommitSha ? (D(), V("p", Bv, g(d(t).label("来源节点：", "Source commit: ")) + g(d(nl)(v.sourceCommitSha)), 1)) : xe("", !0),
                  c("div", Gv, [
                    c("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (E) => te(v.commitSha)
                    }, g(d(t).label("复制节点", "Copy point")), 9, Wv),
                    c("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: !v.restorable || l.value === v.commitSha,
                      onClick: (E) => F(v)
                    }, g(l.value === v.commitSha ? d(t).label("恢复中…", "Restoring…") : d(t).label("回到这个状态", "Restore this state")), 9, Kv)
                  ])
                ]))), 128))
              ])) : (D(), V("div", zv, g(d(t).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (D(), V(X, { key: 1 }, [
          Z(_e, {
            title: d(t).label("高级 Git 入口", "Advanced Git entry"),
            eyebrow: "Advanced"
          }, {
            default: he(() => [
              c("p", qv, g(d(t).label("这里先接入最常用的高级动作和状态读取；更复杂的远端绑定、OAuth 和专家级操作，当前阶段仍保留在正式控制台。", "This view already brings in the most common advanced actions and status reads. More complex remote binding, OAuth, and expert-level operations still stay in the production console for now.")), 1),
              c("div", Jv, [
                c("a", Yv, g(d(t).label("打开正式控制台中的高级 Git", "Open advanced Git in the production console")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(_e, {
            title: d(t).label("当前仓库状态", "Current repository status"),
            eyebrow: "Status"
          }, {
            default: he(() => [
              c("div", Qv, [
                c("article", Xv, [
                  c("p", Zv, g(d(t).label("仓库初始化", "Repository")), 1),
                  c("strong", null, g(d(f).data.gitStatus.repoInitialized ? d(t).label("已初始化", "Initialized") : d(t).label("未初始化", "Not initialized")), 1),
                  c("span", null, g(d(f).data.gitStatus.repoPath), 1)
                ]),
                c("article", eb, [
                  c("p", tb, g(d(t).label("远端仓库", "Remote")), 1),
                  c("strong", null, g(d(f).data.gitStatus.remoteName || "-"), 1),
                  c("span", null, g(d(f).data.gitStatus.remoteUrl || d(t).label("还没绑定远端", "No remote connected yet")), 1)
                ]),
                c("article", nb, [
                  c("p", sb, g(d(t).label("认证方式", "Auth mode")), 1),
                  c("strong", null, g(d(f).data.gitStatus.authMode || "-"), 1),
                  c("span", null, g(d(f).data.gitStatus.authConfigured ? d(t).label("当前已配置认证", "Authentication is configured") : d(t).label("当前还没配置认证", "Authentication is not configured yet")), 1)
                ]),
                c("article", ob, [
                  c("p", rb, g(d(t).label("私有检查", "Private check")), 1),
                  c("strong", null, g(d(f).data.gitStatus.repoPrivate === !0 ? d(t).label("已通过", "Passed") : d(f).data.gitStatus.repoPrivate === !1 ? d(t).label("未通过", "Failed") : d(t).label("未检查", "Pending")), 1),
                  c("span", null, g(d(f).data.gitStatus.state.lastSyncAt ? `${d(t).label("最近同步", "Last sync")} ${d(xs)(d(f).data.gitStatus.state.lastSyncAt)}` : d(t).label("还没有成功同步记录", "No successful sync record yet")), 1)
                ])
              ]),
              c("div", ib, [
                c("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: a.value === "init",
                  onClick: S[1] || (S[1] = (v) => A("init"))
                }, g(a.value === "init" ? d(t).label("初始化中…", "Initializing…") : d(t).label("初始化保护仓库", "Initialize protection repo")), 9, lb),
                c("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: a.value === "private",
                  onClick: S[2] || (S[2] = (v) => A("private"))
                }, g(a.value === "private" ? d(t).label("检查中…", "Checking…") : d(t).label("检查私有仓库", "Check private remote")), 9, ab),
                c("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: a.value === "checkpoint",
                  onClick: S[3] || (S[3] = (v) => A("checkpoint"))
                }, g(a.value === "checkpoint" ? d(t).label("提交中…", "Committing…") : d(t).label("创建本地 checkpoint", "Create local checkpoint")), 9, cb),
                c("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: a.value === "push",
                  onClick: S[4] || (S[4] = (v) => A("push"))
                }, g(a.value === "push" ? d(t).label("推送中…", "Pushing…") : d(t).label("推送到云端", "Push to cloud")), 9, ub),
                c("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: a.value === "sync",
                  onClick: S[5] || (S[5] = (v) => A("sync"))
                }, g(a.value === "sync" ? d(t).label("同步中…", "Syncing…") : d(t).label("提交并同步", "Commit and sync")), 9, db)
              ]),
              r.value ? (D(), V("p", fb, g(r.value), 1)) : xe("", !0)
            ]),
            _: 1
          }, 8, ["title"]),
          Z(_e, {
            title: d(t).label("保护范围摘要", "Protection scope summary"),
            eyebrow: "Scope"
          }, {
            default: he(() => [
              c("div", pb, [
                c("article", hb, [
                  c("div", null, [
                    c("h3", null, g(d(t).label("当前工作树变化", "Current worktree changes")), 1),
                    c("p", null, g(d(t).label("这些文件会进入根保护线；嵌套仓库会被单独标记，不会被误提交到根线。", "These files enter the root protection line, while nested repositories are marked separately so they are not committed into the root line by mistake.")), 1)
                  ]),
                  c("strong", null, g(d(f).data.gitStatus.changedFiles.length), 1)
                ]),
                c("article", gb, [
                  c("div", null, [
                    c("h3", null, g(d(t).label("可直接纳入保护", "Stageable in root line")), 1),
                    c("p", null, g(d(t).label("这些改动可以直接由 Guard 提交为恢复点。", "These changes can be committed directly by Guard as recovery points.")), 1)
                  ]),
                  c("strong", null, g(d(f).data.gitStatus.stageableChangedFiles.length), 1)
                ]),
                c("article", mb, [
                  c("div", null, [
                    c("h3", null, g(d(t).label("嵌套仓库", "Nested repositories")), 1),
                    c("p", null, g(d(t).label("这些目录更适合单独维护，Guard 不会在根保护线里直接接管。", "These directories are better maintained separately. Guard does not take them over inside the root protection line.")), 1)
                  ]),
                  c("strong", null, g(d(f).data.gitStatus.skippedEmbeddedRepos.length), 1)
                ])
              ]),
              c("pre", _b, g(JSON.stringify({
                changedFiles: d(f).data.gitStatus.changedFiles,
                stageableChangedFiles: d(f).data.gitStatus.stageableChangedFiles,
                skippedEmbeddedRepos: d(f).data.gitStatus.skippedEmbeddedRepos
              }, null, 2)), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          Z(_e, {
            title: d(t).label(".gitignore 建议", ".gitignore suggestions"),
            eyebrow: "Ignore rules"
          }, {
            default: he(() => [
              c("p", vb, g(d(t).label("当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。", "When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.")), 1),
              c("div", bb, [
                c("article", yb, [
                  c("p", Eb, g(d(t).label("嵌套仓库", "Embedded repos")), 1),
                  c("strong", null, g(d(f).data.gitIgnorePreview.embeddedRepos.length), 1),
                  c("span", null, g(d(t).label("需要单独维护的子仓库", "Child repositories that should be maintained separately")), 1)
                ]),
                c("article", wb, [
                  c("p", Nb, g(d(t).label("待追加规则", "Missing rules")), 1),
                  c("strong", null, g(d(f).data.gitIgnorePreview.missingEntries.length), 1),
                  c("span", null, g(d(f).data.gitIgnorePreview.gitignorePath), 1)
                ])
              ]),
              c("pre", Ob, g(d(f).data.gitIgnorePreview.appendBlock || d(t).label("当前没有需要追加的规则。", "There are no extra rules to append right now.")), 1),
              c("div", Sb, [
                c("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: a.value === "gitignore",
                  onClick: S[6] || (S[6] = (v) => A("gitignore"))
                }, g(a.value === "gitignore" ? d(t).label("写入中…", "Applying…") : d(t).label("追加推荐规则", "Append recommended rules")), 9, kb)
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64))
      ], 64)) : xe("", !0)
    ]));
  }
});
function Cb() {
  return Te("/api/audit");
}
function Db() {
  return Te("/api/profiles");
}
function xb(e) {
  return st("/api/profiles/apply", { profile: e });
}
function Tb(e) {
  return Te(`/api/harden/steps?platform=${encodeURIComponent(e)}`);
}
const Pb = { class: "page-stack" }, Vb = { class: "page-header" }, Ab = { class: "page-header__eyebrow" }, Rb = { class: "page-header__title" }, Ib = { class: "page-header__description" }, Mb = {
  key: 0,
  class: "page-empty"
}, Lb = {
  key: 1,
  class: "page-empty page-empty--error"
}, jb = { class: "muted-copy" }, Fb = { class: "stat-grid" }, Ub = { class: "stat-card" }, Hb = { class: "stat-card__label" }, Bb = { class: "stat-card" }, Gb = { class: "stat-card__label" }, Wb = { class: "stat-card" }, Kb = { class: "stat-card__label" }, zb = { class: "provider-stack" }, qb = { class: "provider-card__header" }, Jb = { class: "pill pill--muted" }, Yb = { class: "mini-list" }, Qb = { class: "provider-card__header" }, Xb = {
  key: 0,
  class: "muted-copy"
}, Zb = {
  key: 0,
  class: "page-empty"
}, ey = {
  key: 1,
  class: "page-empty page-empty--error"
}, ty = { class: "muted-copy" }, ny = { class: "provider-stack" }, sy = { class: "provider-card__header" }, oy = { class: "muted-copy" }, ry = { class: "pill pill--info" }, iy = { class: "settings-grid settings-grid--wide" }, ly = { class: "settings-field" }, ay = { class: "mini-list" }, cy = { class: "settings-field" }, uy = { class: "code-panel" }, dy = { class: "settings-field" }, fy = { class: "code-panel" }, py = { class: "page-actions" }, hy = ["disabled", "onClick"], gy = {
  key: 0,
  class: "page-empty"
}, my = {
  key: 1,
  class: "page-empty page-empty--error"
}, _y = { class: "muted-copy" }, vy = { class: "pill-row" }, by = ["href"], yy = { class: "provider-stack" }, Ey = { class: "provider-card__header" }, wy = { class: "muted-copy" }, Ny = { class: "code-panel" }, Oy = /* @__PURE__ */ Be({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const F = navigator.platform.toLowerCase();
      return F.includes("win") ? "windows" : F.includes("mac") ? "macos" : "linux";
    }
    const n = Wt(), s = zn(), o = /* @__PURE__ */ me("audit"), r = /* @__PURE__ */ me(t()), i = /* @__PURE__ */ me(""), l = Ht(() => Cb(), null, { immediate: !1 }), a = Ht(() => Db(), null, { immediate: !1 }), f = Ht(() => Tb(r.value), null, { immediate: !1 }), p = ue(() => [
      { id: "audit", label: n.label("安全检查", "Security checks") },
      { id: "profiles", label: n.label("权限模式", "Permission modes") },
      { id: "hardening", label: n.label("主机加固", "Host hardening") }
    ]), u = ue(() => {
      var A, I;
      const F = /* @__PURE__ */ new Map();
      for (const te of ((A = l.data) == null ? void 0 : A.results) || [])
        F.has(te.category) || F.set(te.category, []), (I = F.get(te.category)) == null || I.push(te);
      return Array.from(F.entries());
    });
    qe(
      o,
      (F) => {
        F === "audit" && !l.data && !l.loading && l.execute(), F === "profiles" && !a.data && !a.loading && a.execute(), F === "hardening" && !f.data && !f.loading && f.execute();
      },
      { immediate: !0 }
    ), qe(r, () => {
      o.value === "hardening" && f.execute({ silent: !!f.data });
    });
    function m(F) {
      return F === "pass" ? "pill--success" : F === "warn" ? "pill--warning" : "pill--danger";
    }
    function b(F) {
      return F === "pass" ? n.label("通过", "Pass") : F === "warn" ? n.label("警告", "Warning") : n.label("失败", "Fail");
    }
    async function T() {
      if (o.value === "audit") {
        await l.execute({ silent: !!l.data });
        return;
      }
      if (o.value === "profiles") {
        await a.execute({ silent: !!a.data });
        return;
      }
      await f.execute({ silent: !!f.data });
    }
    async function $(F) {
      i.value = F;
      try {
        const A = await xb(F);
        s.pushToast({
          tone: A.success ? "success" : "error",
          message: A.message
        });
      } catch (A) {
        s.pushToast({
          tone: "error",
          message: A instanceof Error ? A.message : String(A)
        });
      } finally {
        i.value = "";
      }
    }
    function K(F) {
      o.value = F;
    }
    return (F, A) => (D(), V("div", Pb, [
      c("header", Vb, [
        c("div", null, [
          c("p", Ab, g(d(n).label("安全 / Second slice", "Security / Second slice")), 1),
          c("h2", Rb, g(d(n).label("安全基线", "Security baseline")), 1),
          c("p", Ib, g(d(n).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页面更像决策面板而不是说明书。", "Split the long screen into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        c("button", {
          class: "page-header__action",
          type: "button",
          onClick: T
        }, g(o.value === "audit" && d(l).refreshing || o.value === "profiles" && d(a).refreshing || o.value === "hardening" && d(f).refreshing ? d(n).label("刷新中…", "Refreshing…") : d(n).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      Z(lc, {
        items: p.value,
        "active-id": o.value,
        onChange: K
      }, null, 8, ["items", "active-id"]),
      o.value === "audit" ? (D(), V(X, { key: 0 }, [
        d(l).loading ? (D(), V("div", Mb, g(d(n).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : d(l).error ? (D(), V("div", Lb, g(d(l).error), 1)) : d(l).data ? (D(), V(X, { key: 2 }, [
          Z(_e, {
            title: d(n).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: he(() => [
              c("p", jb, g(d(n).label("这一部分更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              c("div", Fb, [
                c("article", Ub, [
                  c("p", Hb, g(d(n).label("通过项", "Pass")), 1),
                  c("strong", null, g(d(l).data.summary.pass), 1),
                  c("span", null, g(d(n).label("当前无需处理", "No action needed right now")), 1)
                ]),
                c("article", Bb, [
                  c("p", Gb, g(d(n).label("警告项", "Warning")), 1),
                  c("strong", null, g(d(l).data.summary.warn), 1),
                  c("span", null, g(d(n).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                c("article", Wb, [
                  c("p", Kb, g(d(n).label("失败项", "Fail")), 1),
                  c("strong", null, g(d(l).data.summary.fail), 1),
                  c("span", null, g(d(n).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          Z(_e, {
            title: d(n).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: he(() => [
              c("div", zb, [
                (D(!0), V(X, null, ke(u.value, ([I, te]) => (D(), V("article", {
                  key: I,
                  class: "provider-card"
                }, [
                  c("header", qb, [
                    c("strong", null, g(I), 1),
                    c("span", Jb, g(te.length), 1)
                  ]),
                  c("div", Yb, [
                    (D(!0), V(X, null, ke(te, (O) => (D(), V("div", {
                      key: `${I}-${O.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      c("div", Qb, [
                        c("strong", null, g(O.item), 1),
                        c("span", {
                          class: $e(["pill", m(O.status)])
                        }, g(b(O.status)), 3)
                      ]),
                      c("p", null, g(O.message), 1),
                      O.fix ? (D(), V("p", Xb, g(d(n).label("建议处理：", "Suggested fix: ")) + g(O.fix), 1)) : xe("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : xe("", !0)
      ], 64)) : o.value === "profiles" ? (D(), V(X, { key: 1 }, [
        d(a).loading ? (D(), V("div", Zb, g(d(n).label("正在读取权限模式…", "Loading permission modes…")), 1)) : d(a).error ? (D(), V("div", ey, g(d(a).error), 1)) : d(a).data ? (D(), V(X, { key: 2 }, [
          Z(_e, {
            title: d(n).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: he(() => [
              c("p", ty, g(d(n).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          c("div", ny, [
            (D(!0), V(X, null, ke(d(a).data, (I) => (D(), Fn(_e, {
              key: I.key,
              title: I.name,
              eyebrow: "Profile"
            }, {
              default: he(() => {
                var te, O;
                return [
                  c("div", sy, [
                    c("p", oy, g(I.description), 1),
                    c("span", ry, g(I.riskLevel || d(n).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  c("div", iy, [
                    c("div", ly, [
                      c("span", null, g(d(n).label("建议使用场景", "Recommended use cases")), 1),
                      c("div", ay, [
                        (D(!0), V(X, null, ke(I.recommendations || [], (S) => (D(), V("div", {
                          key: S,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          c("p", null, g(S), 1)
                        ]))), 128))
                      ])
                    ]),
                    c("div", cy, [
                      c("span", null, g(d(n).label("允许规则", "Allow rules")), 1),
                      c("pre", uy, g((((te = I.tools) == null ? void 0 : te.allow) || []).join(`
`) || "(none)"), 1)
                    ]),
                    c("div", dy, [
                      c("span", null, g(d(n).label("拒绝规则", "Deny rules")), 1),
                      c("pre", fy, g((((O = I.tools) == null ? void 0 : O.deny) || []).join(`
`) || "(none)"), 1)
                    ])
                  ]),
                  c("div", py, [
                    c("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: i.value === I.key,
                      onClick: (S) => $(I.key)
                    }, g(i.value === I.key ? d(n).label("应用中…", "Applying…") : d(n).label("应用权限模式", "Apply permission mode")), 9, hy)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : xe("", !0)
      ], 64)) : (D(), V(X, { key: 2 }, [
        d(f).loading ? (D(), V("div", gy, g(d(n).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : d(f).error ? (D(), V("div", my, g(d(f).error), 1)) : d(f).data ? (D(), V(X, { key: 2 }, [
          Z(_e, {
            title: d(n).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: he(() => [
              c("p", _y, g(d(n).label("基础建议在所有平台上都一样：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              c("div", vy, [
                c("button", {
                  class: $e(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: A[0] || (A[0] = (I) => r.value = "windows")
                }, "Windows", 2),
                c("button", {
                  class: $e(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: A[1] || (A[1] = (I) => r.value = "macos")
                }, "macOS", 2),
                c("button", {
                  class: $e(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: A[2] || (A[2] = (I) => r.value = "linux")
                }, "Linux", 2),
                c("a", {
                  class: "inline-link",
                  href: `/api/harden/script?platform=${r.value}`
                }, g(d(n).label("下载脚本", "Download script")), 9, by)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          c("div", yy, [
            (D(!0), V(X, null, ke(d(f).data.steps, (I) => (D(), Fn(_e, {
              key: I.id,
              title: I.title,
              eyebrow: "Step"
            }, {
              default: he(() => [
                c("div", Ey, [
                  c("p", wy, g(I.description), 1),
                  c("span", {
                    class: $e(["pill", I.optional ? "pill--muted" : "pill--warning"])
                  }, g(I.optional ? d(n).label("可选", "Optional") : d(n).label("建议", "Recommended")), 3)
                ]),
                c("pre", Ny, g((I.commands || []).join(`
`) || d(n).label("当前没有附带命令。", "No commands are attached to this step.")), 1)
              ]),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : xe("", !0)
      ], 64))
    ]));
  }
});
function fn(e, t, n, s, o, r) {
  return {
    path: e,
    component: Z_,
    props: {
      titleZh: t,
      titleEn: n,
      descriptionZh: s,
      descriptionEn: o,
      legacyHash: r
    }
  };
}
const Sy = Ah({
  history: ch(),
  routes: [
    { path: "/", name: "overview", component: Vg },
    { path: "/operations", name: "operations", component: W_ },
    { path: "/openclaw", name: "openclaw", component: R_ },
    { path: "/channels", name: "channels", component: Nm },
    { path: "/models", name: "models", component: S_ },
    { path: "/security", name: "security", component: Oy },
    { path: "/recovery", name: "recovery", component: $b },
    fn("/roles", "角色", "Roles", "浏览角色配置与工作区角色视图。", "Browse role definitions and workspace role views.", "#agents"),
    fn("/files", "文件", "Files", "管理记忆、文件与当前工作区内容。", "Manage memory files, documents, and workspace content.", "#files"),
    fn("/search", "搜索", "Search", "统一搜索工作区中的关键信息与记忆。", "Search across workspace documents and memory files.", "#search"),
    fn("/sessions", "会话", "Sessions", "查看会话状态与用量估算。", "Inspect session health and usage estimates.", "#sessions"),
    fn("/logs", "日志", "Logs", "查看运行日志与排障信息。", "Inspect runtime logs and troubleshooting output.", "#logs"),
    fn("/notifications", "通知", "Notifications", "查看提醒与时间线事件。", "Review alerts and timeline activity.", "#notifications"),
    fn("/cron", "Cron", "Cron", "管理自动化任务与定时执行计划。", "Manage automation tasks and scheduled execution.", "#cron"),
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
gf(rg).use(Wf()).use(Sy).mount("#guard-next-app");
