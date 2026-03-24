/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Cl(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Fe = {}, fn = [], Pt = () => {
}, So = () => !1, bs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Sl = (e) => e.startsWith("onUpdate:"), Ze = Object.assign, Al = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, cr = Object.prototype.hasOwnProperty, Me = (e, t) => cr.call(e, t), ye = Array.isArray, pn = (e) => Hn(e) === "[object Map]", wn = (e) => Hn(e) === "[object Set]", sa = (e) => Hn(e) === "[object Date]", we = (e) => typeof e == "function", Ke = (e) => typeof e == "string", yt = (e) => typeof e == "symbol", Ie = (e) => e !== null && typeof e == "object", Ao = (e) => (Ie(e) || we(e)) && we(e.then) && we(e.catch), Ro = Object.prototype.toString, Hn = (e) => Ro.call(e), ur = (e) => Hn(e).slice(8, -1), xo = (e) => Hn(e) === "[object Object]", vs = (e) => Ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pn = /* @__PURE__ */ Cl(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ys = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, dr = /-\w/g, ot = ys(
  (e) => e.replace(dr, (t) => t.slice(1).toUpperCase())
), fr = /\B([A-Z])/g, Zt = ys(
  (e) => e.replace(fr, "-$1").toLowerCase()
), _s = ys((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ns = ys(
  (e) => e ? `on${_s(e)}` : ""
), Rt = (e, t) => !Object.is(e, t), ls = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Po = (e, t, n, l = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: l,
    value: n
  });
}, ws = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let la;
const ks = () => la || (la = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Un(e) {
  if (ye(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const l = e[n], o = Ke(l) ? mr(l) : Un(l);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (Ke(e) || Ie(e))
    return e;
}
const pr = /;(?![^(]*\))/g, hr = /:([^]+)/, gr = /\/\*[^]*?\*\//g;
function mr(e) {
  const t = {};
  return e.replace(gr, "").split(pr).forEach((n) => {
    if (n) {
      const l = n.split(hr);
      l.length > 1 && (t[l[0].trim()] = l[1].trim());
    }
  }), t;
}
function re(e) {
  let t = "";
  if (Ke(e))
    t = e;
  else if (ye(e))
    for (let n = 0; n < e.length; n++) {
      const l = re(e[n]);
      l && (t += l + " ");
    }
  else if (Ie(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const br = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", vr = /* @__PURE__ */ Cl(br);
function To(e) {
  return !!e || e === "";
}
function yr(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let l = 0; n && l < e.length; l++)
    n = Qt(e[l], t[l]);
  return n;
}
function Qt(e, t) {
  if (e === t) return !0;
  let n = sa(e), l = sa(t);
  if (n || l)
    return n && l ? e.getTime() === t.getTime() : !1;
  if (n = yt(e), l = yt(t), n || l)
    return e === t;
  if (n = ye(e), l = ye(t), n || l)
    return n && l ? yr(e, t) : !1;
  if (n = Ie(e), l = Ie(t), n || l) {
    if (!n || !l)
      return !1;
    const o = Object.keys(e).length, r = Object.keys(t).length;
    if (o !== r)
      return !1;
    for (const c in e) {
      const u = e.hasOwnProperty(c), d = t.hasOwnProperty(c);
      if (u && !d || !u && d || !Qt(e[c], t[c]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Rl(e, t) {
  return e.findIndex((n) => Qt(n, t));
}
const Eo = (e) => !!(e && e.__v_isRef === !0), i = (e) => Ke(e) ? e : e == null ? "" : ye(e) || Ie(e) && (e.toString === Ro || !we(e.toString)) ? Eo(e) ? i(e.value) : JSON.stringify(e, Do, 2) : String(e), Do = (e, t) => Eo(t) ? Do(e, t.value) : pn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [l, o], r) => (n[Us(l, r) + " =>"] = o, n),
    {}
  )
} : wn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Us(n))
} : yt(t) ? Us(t) : Ie(t) && !ye(t) && !xo(t) ? String(t) : t, Us = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    yt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Xe;
class Mo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Xe, !t && Xe && (this.index = (Xe.scopes || (Xe.scopes = [])).push(
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
      const n = Xe;
      try {
        return Xe = this, t();
      } finally {
        Xe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Xe, Xe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Xe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, l;
      for (n = 0, l = this.effects.length; n < l; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, l = this.cleanups.length; n < l; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, l = this.scopes.length; n < l; n++)
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
function Io(e) {
  return new Mo(e);
}
function Oo() {
  return Xe;
}
function _r(e, t = !1) {
  Xe && Xe.cleanups.push(e);
}
let Ge;
const Fs = /* @__PURE__ */ new WeakSet();
class Lo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Xe && Xe.active && Xe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Fs.has(this) && (Fs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Uo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, aa(this), Fo(this);
    const t = Ge, n = vt;
    Ge = this, vt = !0;
    try {
      return this.fn();
    } finally {
      Go(this), Ge = t, vt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Tl(t);
      this.deps = this.depsTail = void 0, aa(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Fs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    tl(this) && this.run();
  }
  get dirty() {
    return tl(this);
  }
}
let No = 0, Tn, En;
function Uo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = En, En = e;
    return;
  }
  e.next = Tn, Tn = e;
}
function xl() {
  No++;
}
function Pl() {
  if (--No > 0)
    return;
  if (En) {
    let t = En;
    for (En = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Tn; ) {
    let t = Tn;
    for (Tn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (l) {
          e || (e = l);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Fo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Go(e) {
  let t, n = e.depsTail, l = n;
  for (; l; ) {
    const o = l.prevDep;
    l.version === -1 ? (l === n && (n = o), Tl(l), wr(l)) : t = l, l.dep.activeLink = l.prevActiveLink, l.prevActiveLink = void 0, l = o;
  }
  e.deps = t, e.depsTail = n;
}
function tl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Bo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Bo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Fn) || (e.globalVersion = Fn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !tl(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Ge, l = vt;
  Ge = e, vt = !0;
  try {
    Fo(e);
    const o = e.fn(e._value);
    (t.version === 0 || Rt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Ge = n, vt = l, Go(e), e.flags &= -3;
  }
}
function Tl(e, t = !1) {
  const { dep: n, prevSub: l, nextSub: o } = e;
  if (l && (l.nextSub = o, e.prevSub = void 0), o && (o.prevSub = l, e.nextSub = void 0), n.subs === e && (n.subs = l, !l && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Tl(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function wr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let vt = !0;
const Vo = [];
function Bt() {
  Vo.push(vt), vt = !1;
}
function Vt() {
  const e = Vo.pop();
  vt = e === void 0 ? !0 : e;
}
function aa(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Ge;
    Ge = void 0;
    try {
      t();
    } finally {
      Ge = n;
    }
  }
}
let Fn = 0;
class kr {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class El {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Ge || !vt || Ge === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ge)
      n = this.activeLink = new kr(Ge, this), Ge.deps ? (n.prevDep = Ge.depsTail, Ge.depsTail.nextDep = n, Ge.depsTail = n) : Ge.deps = Ge.depsTail = n, jo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const l = n.nextDep;
      l.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = l), n.prevDep = Ge.depsTail, n.nextDep = void 0, Ge.depsTail.nextDep = n, Ge.depsTail = n, Ge.deps === n && (Ge.deps = l);
    }
    return n;
  }
  trigger(t) {
    this.version++, Fn++, this.notify(t);
  }
  notify(t) {
    xl();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Pl();
    }
  }
}
function jo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let l = t.deps; l; l = l.nextDep)
        jo(l);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const rs = /* @__PURE__ */ new WeakMap(), ln = /* @__PURE__ */ Symbol(
  ""
), nl = /* @__PURE__ */ Symbol(
  ""
), Gn = /* @__PURE__ */ Symbol(
  ""
);
function et(e, t, n) {
  if (vt && Ge) {
    let l = rs.get(e);
    l || rs.set(e, l = /* @__PURE__ */ new Map());
    let o = l.get(n);
    o || (l.set(n, o = new El()), o.map = l, o.key = n), o.track();
  }
}
function Nt(e, t, n, l, o, r) {
  const c = rs.get(e);
  if (!c) {
    Fn++;
    return;
  }
  const u = (d) => {
    d && d.trigger();
  };
  if (xl(), t === "clear")
    c.forEach(u);
  else {
    const d = ye(e), f = d && vs(n);
    if (d && n === "length") {
      const p = Number(l);
      c.forEach((h, v) => {
        (v === "length" || v === Gn || !yt(v) && v >= p) && u(h);
      });
    } else
      switch ((n !== void 0 || c.has(void 0)) && u(c.get(n)), f && u(c.get(Gn)), t) {
        case "add":
          d ? f && u(c.get("length")) : (u(c.get(ln)), pn(e) && u(c.get(nl)));
          break;
        case "delete":
          d || (u(c.get(ln)), pn(e) && u(c.get(nl)));
          break;
        case "set":
          pn(e) && u(c.get(ln));
          break;
      }
  }
  Pl();
}
function $r(e, t) {
  const n = rs.get(e);
  return n && n.get(t);
}
function on(e) {
  const t = /* @__PURE__ */ Pe(e);
  return t === e ? t : (et(t, "iterate", Gn), /* @__PURE__ */ ht(e) ? t : t.map(_t));
}
function $s(e) {
  return et(e = /* @__PURE__ */ Pe(e), "iterate", Gn), e;
}
function St(e, t) {
  return /* @__PURE__ */ jt(e) ? mn(/* @__PURE__ */ Tt(e) ? _t(t) : t) : _t(t);
}
const Cr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Gs(this, Symbol.iterator, (e) => St(this, e));
  },
  concat(...e) {
    return on(this).concat(
      ...e.map((t) => ye(t) ? on(t) : t)
    );
  },
  entries() {
    return Gs(this, "entries", (e) => (e[1] = St(this, e[1]), e));
  },
  every(e, t) {
    return Dt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Dt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((l) => St(this, l)),
      arguments
    );
  },
  find(e, t) {
    return Dt(
      this,
      "find",
      e,
      t,
      (n) => St(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Dt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Dt(
      this,
      "findLast",
      e,
      t,
      (n) => St(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Dt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Dt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Bs(this, "includes", e);
  },
  indexOf(...e) {
    return Bs(this, "indexOf", e);
  },
  join(e) {
    return on(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Bs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Dt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Cn(this, "pop");
  },
  push(...e) {
    return Cn(this, "push", e);
  },
  reduce(e, ...t) {
    return oa(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return oa(this, "reduceRight", e, t);
  },
  shift() {
    return Cn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Dt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Cn(this, "splice", e);
  },
  toReversed() {
    return on(this).toReversed();
  },
  toSorted(e) {
    return on(this).toSorted(e);
  },
  toSpliced(...e) {
    return on(this).toSpliced(...e);
  },
  unshift(...e) {
    return Cn(this, "unshift", e);
  },
  values() {
    return Gs(this, "values", (e) => St(this, e));
  }
};
function Gs(e, t, n) {
  const l = $s(e), o = l[t]();
  return l !== e && !/* @__PURE__ */ ht(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.done || (r.value = n(r.value)), r;
  }), o;
}
const Sr = Array.prototype;
function Dt(e, t, n, l, o, r) {
  const c = $s(e), u = c !== e && !/* @__PURE__ */ ht(e), d = c[t];
  if (d !== Sr[t]) {
    const h = d.apply(e, r);
    return u ? _t(h) : h;
  }
  let f = n;
  c !== e && (u ? f = function(h, v) {
    return n.call(this, St(e, h), v, e);
  } : n.length > 2 && (f = function(h, v) {
    return n.call(this, h, v, e);
  }));
  const p = d.call(c, f, l);
  return u && o ? o(p) : p;
}
function oa(e, t, n, l) {
  const o = $s(e), r = o !== e && !/* @__PURE__ */ ht(e);
  let c = n, u = !1;
  o !== e && (r ? (u = l.length === 0, c = function(f, p, h) {
    return u && (u = !1, f = St(e, f)), n.call(this, f, St(e, p), h, e);
  }) : n.length > 3 && (c = function(f, p, h) {
    return n.call(this, f, p, h, e);
  }));
  const d = o[t](c, ...l);
  return u ? St(e, d) : d;
}
function Bs(e, t, n) {
  const l = /* @__PURE__ */ Pe(e);
  et(l, "iterate", Gn);
  const o = l[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Cs(n[0]) ? (n[0] = /* @__PURE__ */ Pe(n[0]), l[t](...n)) : o;
}
function Cn(e, t, n = []) {
  Bt(), xl();
  const l = (/* @__PURE__ */ Pe(e))[t].apply(e, n);
  return Pl(), Vt(), l;
}
const Ar = /* @__PURE__ */ Cl("__proto__,__v_isRef,__isVue"), zo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(yt)
);
function Rr(e) {
  yt(e) || (e = String(e));
  const t = /* @__PURE__ */ Pe(this);
  return et(t, "has", e), t.hasOwnProperty(e);
}
class Wo {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, l) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return l === (o ? r ? Nr : Jo : r ? qo : Ko).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(l) ? t : void 0;
    const c = ye(t);
    if (!o) {
      let d;
      if (c && (d = Cr[n]))
        return d;
      if (n === "hasOwnProperty")
        return Rr;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Be(t) ? t : l
    );
    if ((yt(n) ? zo.has(n) : Ar(n)) || (o || et(t, "get", n), r))
      return u;
    if (/* @__PURE__ */ Be(u)) {
      const d = c && vs(n) ? u : u.value;
      return o && Ie(d) ? /* @__PURE__ */ ll(d) : d;
    }
    return Ie(u) ? o ? /* @__PURE__ */ ll(u) : /* @__PURE__ */ pt(u) : u;
  }
}
class Ho extends Wo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, l, o) {
    let r = t[n];
    const c = ye(t) && vs(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ jt(r);
      if (!/* @__PURE__ */ ht(l) && !/* @__PURE__ */ jt(l) && (r = /* @__PURE__ */ Pe(r), l = /* @__PURE__ */ Pe(l)), !c && /* @__PURE__ */ Be(r) && !/* @__PURE__ */ Be(l))
        return f || (r.value = l), !0;
    }
    const u = c ? Number(n) < t.length : Me(t, n), d = Reflect.set(
      t,
      n,
      l,
      /* @__PURE__ */ Be(t) ? t : o
    );
    return t === /* @__PURE__ */ Pe(o) && (u ? Rt(l, r) && Nt(t, "set", n, l) : Nt(t, "add", n, l)), d;
  }
  deleteProperty(t, n) {
    const l = Me(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && l && Nt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const l = Reflect.has(t, n);
    return (!yt(n) || !zo.has(n)) && et(t, "has", n), l;
  }
  ownKeys(t) {
    return et(
      t,
      "iterate",
      ye(t) ? "length" : ln
    ), Reflect.ownKeys(t);
  }
}
class xr extends Wo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Pr = /* @__PURE__ */ new Ho(), Tr = /* @__PURE__ */ new xr(), Er = /* @__PURE__ */ new Ho(!0);
const sl = (e) => e, Zn = (e) => Reflect.getPrototypeOf(e);
function Dr(e, t, n) {
  return function(...l) {
    const o = this.__v_raw, r = /* @__PURE__ */ Pe(o), c = pn(r), u = e === "entries" || e === Symbol.iterator && c, d = e === "keys" && c, f = o[e](...l), p = n ? sl : t ? mn : _t;
    return !t && et(
      r,
      "iterate",
      d ? nl : ln
    ), Ze(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: v } = f.next();
          return v ? { value: h, done: v } : {
            value: u ? [p(h[0]), p(h[1])] : p(h),
            done: v
          };
        }
      }
    );
  };
}
function Xn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Mr(e, t) {
  const n = {
    get(o) {
      const r = this.__v_raw, c = /* @__PURE__ */ Pe(r), u = /* @__PURE__ */ Pe(o);
      e || (Rt(o, u) && et(c, "get", o), et(c, "get", u));
      const { has: d } = Zn(c), f = t ? sl : e ? mn : _t;
      if (d.call(c, o))
        return f(r.get(o));
      if (d.call(c, u))
        return f(r.get(u));
      r !== c && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && et(/* @__PURE__ */ Pe(o), "iterate", ln), o.size;
    },
    has(o) {
      const r = this.__v_raw, c = /* @__PURE__ */ Pe(r), u = /* @__PURE__ */ Pe(o);
      return e || (Rt(o, u) && et(c, "has", o), et(c, "has", u)), o === u ? r.has(o) : r.has(o) || r.has(u);
    },
    forEach(o, r) {
      const c = this, u = c.__v_raw, d = /* @__PURE__ */ Pe(u), f = t ? sl : e ? mn : _t;
      return !e && et(d, "iterate", ln), u.forEach((p, h) => o.call(r, f(p), f(h), c));
    }
  };
  return Ze(
    n,
    e ? {
      add: Xn("add"),
      set: Xn("set"),
      delete: Xn("delete"),
      clear: Xn("clear")
    } : {
      add(o) {
        const r = /* @__PURE__ */ Pe(this), c = Zn(r), u = /* @__PURE__ */ Pe(o), d = !t && !/* @__PURE__ */ ht(o) && !/* @__PURE__ */ jt(o) ? u : o;
        return c.has.call(r, d) || Rt(o, d) && c.has.call(r, o) || Rt(u, d) && c.has.call(r, u) || (r.add(d), Nt(r, "add", d, d)), this;
      },
      set(o, r) {
        !t && !/* @__PURE__ */ ht(r) && !/* @__PURE__ */ jt(r) && (r = /* @__PURE__ */ Pe(r));
        const c = /* @__PURE__ */ Pe(this), { has: u, get: d } = Zn(c);
        let f = u.call(c, o);
        f || (o = /* @__PURE__ */ Pe(o), f = u.call(c, o));
        const p = d.call(c, o);
        return c.set(o, r), f ? Rt(r, p) && Nt(c, "set", o, r) : Nt(c, "add", o, r), this;
      },
      delete(o) {
        const r = /* @__PURE__ */ Pe(this), { has: c, get: u } = Zn(r);
        let d = c.call(r, o);
        d || (o = /* @__PURE__ */ Pe(o), d = c.call(r, o)), u && u.call(r, o);
        const f = r.delete(o);
        return d && Nt(r, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ Pe(this), r = o.size !== 0, c = o.clear();
        return r && Nt(
          o,
          "clear",
          void 0,
          void 0
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = Dr(o, e, t);
  }), n;
}
function Dl(e, t) {
  const n = Mr(e, t);
  return (l, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? l : Reflect.get(
    Me(n, o) && o in l ? n : l,
    o,
    r
  );
}
const Ir = {
  get: /* @__PURE__ */ Dl(!1, !1)
}, Or = {
  get: /* @__PURE__ */ Dl(!1, !0)
}, Lr = {
  get: /* @__PURE__ */ Dl(!0, !1)
};
const Ko = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap();
function Ur(e) {
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
function Fr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ur(ur(e));
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return /* @__PURE__ */ jt(e) ? e : Ml(
    e,
    !1,
    Pr,
    Ir,
    Ko
  );
}
// @__NO_SIDE_EFFECTS__
function Qo(e) {
  return Ml(
    e,
    !1,
    Er,
    Or,
    qo
  );
}
// @__NO_SIDE_EFFECTS__
function ll(e) {
  return Ml(
    e,
    !0,
    Tr,
    Lr,
    Jo
  );
}
function Ml(e, t, n, l, o) {
  if (!Ie(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Fr(e);
  if (r === 0)
    return e;
  const c = o.get(e);
  if (c)
    return c;
  const u = new Proxy(
    e,
    r === 2 ? l : n
  );
  return o.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  return /* @__PURE__ */ jt(e) ? /* @__PURE__ */ Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function jt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ht(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Cs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Pe(t) : e;
}
function Il(e) {
  return !Me(e, "__v_skip") && Object.isExtensible(e) && Po(e, "__v_skip", !0), e;
}
const _t = (e) => Ie(e) ? /* @__PURE__ */ pt(e) : e, mn = (e) => Ie(e) ? /* @__PURE__ */ ll(e) : e;
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
  return Yo(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Gr(e) {
  return Yo(e, !0);
}
function Yo(e, t) {
  return /* @__PURE__ */ Be(e) ? e : new Br(e, t);
}
class Br {
  constructor(t, n) {
    this.dep = new El(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Pe(t), this._value = n ? t : _t(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, l = this.__v_isShallow || /* @__PURE__ */ ht(t) || /* @__PURE__ */ jt(t);
    t = l ? t : /* @__PURE__ */ Pe(t), Rt(t, n) && (this._rawValue = t, this._value = l ? t : _t(t), this.dep.trigger());
  }
}
function s(e) {
  return /* @__PURE__ */ Be(e) ? e.value : e;
}
const Vr = {
  get: (e, t, n) => t === "__v_raw" ? e : s(Reflect.get(e, t, n)),
  set: (e, t, n, l) => {
    const o = e[t];
    return /* @__PURE__ */ Be(o) && !/* @__PURE__ */ Be(n) ? (o.value = n, !0) : Reflect.set(e, t, n, l);
  }
};
function Ol(e) {
  return /* @__PURE__ */ Tt(e) ? e : new Proxy(e, Vr);
}
// @__NO_SIDE_EFFECTS__
function jr(e) {
  const t = ye(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Zo(e, n);
  return t;
}
class zr {
  constructor(t, n, l) {
    this._object = t, this._key = n, this._defaultValue = l, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ Pe(t);
    let o = !0, r = t;
    if (!ye(t) || !vs(String(n)))
      do
        o = !/* @__PURE__ */ Cs(r) || /* @__PURE__ */ ht(r);
      while (o && (r = r.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = s(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ Be(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ Be(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return $r(this._raw, this._key);
  }
}
class Wr {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Hr(e, t, n) {
  return /* @__PURE__ */ Be(e) ? e : we(e) ? new Wr(e) : Ie(e) && arguments.length > 1 ? Zo(e, t, n) : /* @__PURE__ */ F(e);
}
function Zo(e, t, n) {
  return new zr(e, t, n);
}
class Kr {
  constructor(t, n, l) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new El(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Fn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = l;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ge !== this)
      return Uo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Bo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function qr(e, t, n = !1) {
  let l, o;
  return we(e) ? l = e : (l = e.get, o = e.set), new Kr(l, o, n);
}
const es = {}, cs = /* @__PURE__ */ new WeakMap();
let nn;
function Jr(e, t = !1, n = nn) {
  if (n) {
    let l = cs.get(n);
    l || cs.set(n, l = []), l.push(e);
  }
}
function Qr(e, t, n = Fe) {
  const { immediate: l, deep: o, once: r, scheduler: c, augmentJob: u, call: d } = n, f = (U) => o ? U : /* @__PURE__ */ ht(U) || o === !1 || o === 0 ? Ut(U, 1) : Ut(U);
  let p, h, v, b, C = !1, E = !1;
  if (/* @__PURE__ */ Be(e) ? (h = () => e.value, C = /* @__PURE__ */ ht(e)) : /* @__PURE__ */ Tt(e) ? (h = () => f(e), C = !0) : ye(e) ? (E = !0, C = e.some((U) => /* @__PURE__ */ Tt(U) || /* @__PURE__ */ ht(U)), h = () => e.map((U) => {
    if (/* @__PURE__ */ Be(U))
      return U.value;
    if (/* @__PURE__ */ Tt(U))
      return f(U);
    if (we(U))
      return d ? d(U, 2) : U();
  })) : we(e) ? t ? h = d ? () => d(e, 2) : e : h = () => {
    if (v) {
      Bt();
      try {
        v();
      } finally {
        Vt();
      }
    }
    const U = nn;
    nn = p;
    try {
      return d ? d(e, 3, [b]) : e(b);
    } finally {
      nn = U;
    }
  } : h = Pt, t && o) {
    const U = h, I = o === !0 ? 1 / 0 : o;
    h = () => Ut(U(), I);
  }
  const R = Oo(), P = () => {
    p.stop(), R && R.active && Al(R.effects, p);
  };
  if (r && t) {
    const U = t;
    t = (...I) => {
      U(...I), P();
    };
  }
  let $ = E ? new Array(e.length).fill(es) : es;
  const T = (U) => {
    if (!(!(p.flags & 1) || !p.dirty && !U))
      if (t) {
        const I = p.run();
        if (o || C || (E ? I.some((ee, _) => Rt(ee, $[_])) : Rt(I, $))) {
          v && v();
          const ee = nn;
          nn = p;
          try {
            const _ = [
              I,
              // pass undefined as the old value when it's changed for the first time
              $ === es ? void 0 : E && $[0] === es ? [] : $,
              b
            ];
            $ = I, d ? d(t, 3, _) : (
              // @ts-expect-error
              t(..._)
            );
          } finally {
            nn = ee;
          }
        }
      } else
        p.run();
  };
  return u && u(T), p = new Lo(h), p.scheduler = c ? () => c(T, !1) : T, b = (U) => Jr(U, !1, p), v = p.onStop = () => {
    const U = cs.get(p);
    if (U) {
      if (d)
        d(U, 4);
      else
        for (const I of U) I();
      cs.delete(p);
    }
  }, t ? l ? T(!0) : $ = p.run() : c ? c(T.bind(null, !0), !0) : p.run(), P.pause = p.pause.bind(p), P.resume = p.resume.bind(p), P.stop = P, P;
}
function Ut(e, t = 1 / 0, n) {
  if (t <= 0 || !Ie(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Be(e))
    Ut(e.value, t, n);
  else if (ye(e))
    for (let l = 0; l < e.length; l++)
      Ut(e[l], t, n);
  else if (wn(e) || pn(e))
    e.forEach((l) => {
      Ut(l, t, n);
    });
  else if (xo(e)) {
    for (const l in e)
      Ut(e[l], t, n);
    for (const l of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, l) && Ut(e[l], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Kn(e, t, n, l) {
  try {
    return l ? e(...l) : e();
  } catch (o) {
    Ss(o, t, n);
  }
}
function Et(e, t, n, l) {
  if (we(e)) {
    const o = Kn(e, t, n, l);
    return o && Ao(o) && o.catch((r) => {
      Ss(r, t, n);
    }), o;
  }
  if (ye(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(Et(e[r], t, n, l));
    return o;
  }
}
function Ss(e, t, n, l = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: c } = t && t.appContext.config || Fe;
  if (t) {
    let u = t.parent;
    const d = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; u; ) {
      const p = u.ec;
      if (p) {
        for (let h = 0; h < p.length; h++)
          if (p[h](e, d, f) === !1)
            return;
      }
      u = u.parent;
    }
    if (r) {
      Bt(), Kn(r, null, 10, [
        e,
        d,
        f
      ]), Vt();
      return;
    }
  }
  Yr(e, n, o, l, c);
}
function Yr(e, t, n, l = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const at = [];
let Ct = -1;
const hn = [];
let qt = null, un = 0;
const Xo = /* @__PURE__ */ Promise.resolve();
let us = null;
function As(e) {
  const t = us || Xo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zr(e) {
  let t = Ct + 1, n = at.length;
  for (; t < n; ) {
    const l = t + n >>> 1, o = at[l], r = Bn(o);
    r < e || r === e && o.flags & 2 ? t = l + 1 : n = l;
  }
  return t;
}
function Ll(e) {
  if (!(e.flags & 1)) {
    const t = Bn(e), n = at[at.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Bn(n) ? at.push(e) : at.splice(Zr(t), 0, e), e.flags |= 1, ei();
  }
}
function ei() {
  us || (us = Xo.then(ni));
}
function Xr(e) {
  ye(e) ? hn.push(...e) : qt && e.id === -1 ? qt.splice(un + 1, 0, e) : e.flags & 1 || (hn.push(e), e.flags |= 1), ei();
}
function ia(e, t, n = Ct + 1) {
  for (; n < at.length; n++) {
    const l = at[n];
    if (l && l.flags & 2) {
      if (e && l.id !== e.uid)
        continue;
      at.splice(n, 1), n--, l.flags & 4 && (l.flags &= -2), l(), l.flags & 4 || (l.flags &= -2);
    }
  }
}
function ti(e) {
  if (hn.length) {
    const t = [...new Set(hn)].sort(
      (n, l) => Bn(n) - Bn(l)
    );
    if (hn.length = 0, qt) {
      qt.push(...t);
      return;
    }
    for (qt = t, un = 0; un < qt.length; un++) {
      const n = qt[un];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    qt = null, un = 0;
  }
}
const Bn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ni(e) {
  try {
    for (Ct = 0; Ct < at.length; Ct++) {
      const t = at[Ct];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Kn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ct < at.length; Ct++) {
      const t = at[Ct];
      t && (t.flags &= -2);
    }
    Ct = -1, at.length = 0, ti(), us = null, (at.length || hn.length) && ni();
  }
}
let Ye = null, si = null;
function ds(e) {
  const t = Ye;
  return Ye = e, si = e && e.type.__scopeId || null, t;
}
function Y(e, t = Ye, n) {
  if (!t || e._n)
    return e;
  const l = (...o) => {
    l._d && hs(-1);
    const r = ds(t);
    let c;
    try {
      c = e(...o);
    } finally {
      ds(r), l._d && hs(1);
    }
    return c;
  };
  return l._n = !0, l._c = !0, l._d = !0, l;
}
function be(e, t) {
  if (Ye === null)
    return e;
  const n = Ts(Ye), l = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, c, u, d = Fe] = t[o];
    r && (we(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Ut(c), l.push({
      dir: r,
      instance: n,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: d
    }));
  }
  return e;
}
function Xt(e, t, n, l) {
  const o = e.dirs, r = t && t.dirs;
  for (let c = 0; c < o.length; c++) {
    const u = o[c];
    r && (u.oldValue = r[c].value);
    let d = u.dir[l];
    d && (Bt(), Et(d, n, 8, [
      e.el,
      u,
      e,
      t
    ]), Vt());
  }
}
function as(e, t) {
  if (tt) {
    let n = tt.provides;
    const l = tt.parent && tt.parent.provides;
    l === n && (n = tt.provides = Object.create(l)), n[e] = t;
  }
}
function gt(e, t, n = !1) {
  const l = Ei();
  if (l || an) {
    let o = an ? an._context.provides : l ? l.parent == null || l.ce ? l.vnode.appContext && l.vnode.appContext.provides : l.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && we(t) ? t.call(l && l.proxy) : t;
  }
}
function ec() {
  return !!(Ei() || an);
}
const tc = /* @__PURE__ */ Symbol.for("v-scx"), nc = () => gt(tc);
function Te(e, t, n) {
  return li(e, t, n);
}
function li(e, t, n = Fe) {
  const { immediate: l, deep: o, flush: r, once: c } = n, u = Ze({}, n), d = t && l || !t && r !== "post";
  let f;
  if (zn) {
    if (r === "sync") {
      const b = nc();
      f = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!d) {
      const b = () => {
      };
      return b.stop = Pt, b.resume = Pt, b.pause = Pt, b;
    }
  }
  const p = tt;
  u.call = (b, C, E) => Et(b, p, C, E);
  let h = !1;
  r === "post" ? u.scheduler = (b) => {
    rt(b, p && p.suspense);
  } : r !== "sync" && (h = !0, u.scheduler = (b, C) => {
    C ? b() : Ll(b);
  }), u.augmentJob = (b) => {
    t && (b.flags |= 4), h && (b.flags |= 2, p && (b.id = p.uid, b.i = p));
  };
  const v = Qr(e, t, u);
  return zn && (f ? f.push(v) : d && v()), v;
}
function sc(e, t, n) {
  const l = this.proxy, o = Ke(e) ? e.includes(".") ? ai(l, e) : () => l[e] : e.bind(l, l);
  let r;
  we(t) ? r = t : (r = t.handler, n = t);
  const c = qn(this), u = li(o, r.bind(l), n);
  return c(), u;
}
function ai(e, t) {
  const n = t.split(".");
  return () => {
    let l = e;
    for (let o = 0; o < n.length && l; o++)
      l = l[n[o]];
    return l;
  };
}
const lc = /* @__PURE__ */ Symbol("_vte"), ac = (e) => e.__isTeleport, oc = /* @__PURE__ */ Symbol("_leaveCb");
function Nl(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Nl(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function $e(e, t) {
  return we(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ze({ name: e.name }, t, { setup: e })
  ) : e;
}
function oi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ra(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const fs = /* @__PURE__ */ new WeakMap();
function Dn(e, t, n, l, o = !1) {
  if (ye(e)) {
    e.forEach(
      (E, R) => Dn(
        E,
        t && (ye(t) ? t[R] : t),
        n,
        l,
        o
      )
    );
    return;
  }
  if (gn(l) && !o) {
    l.shapeFlag & 512 && l.type.__asyncResolved && l.component.subTree.component && Dn(e, t, n, l.component.subTree);
    return;
  }
  const r = l.shapeFlag & 4 ? Ts(l.component) : l.el, c = o ? null : r, { i: u, r: d } = e, f = t && t.r, p = u.refs === Fe ? u.refs = {} : u.refs, h = u.setupState, v = /* @__PURE__ */ Pe(h), b = h === Fe ? So : (E) => ra(p, E) ? !1 : Me(v, E), C = (E, R) => !(R && ra(p, R));
  if (f != null && f !== d) {
    if (ca(t), Ke(f))
      p[f] = null, b(f) && (h[f] = null);
    else if (/* @__PURE__ */ Be(f)) {
      const E = t;
      C(f, E.k) && (f.value = null), E.k && (p[E.k] = null);
    }
  }
  if (we(d))
    Kn(d, u, 12, [c, p]);
  else {
    const E = Ke(d), R = /* @__PURE__ */ Be(d);
    if (E || R) {
      const P = () => {
        if (e.f) {
          const $ = E ? b(d) ? h[d] : p[d] : C() || !e.k ? d.value : p[e.k];
          if (o)
            ye($) && Al($, r);
          else if (ye($))
            $.includes(r) || $.push(r);
          else if (E)
            p[d] = [r], b(d) && (h[d] = p[d]);
          else {
            const T = [r];
            C(d, e.k) && (d.value = T), e.k && (p[e.k] = T);
          }
        } else E ? (p[d] = c, b(d) && (h[d] = c)) : R && (C(d, e.k) && (d.value = c), e.k && (p[e.k] = c));
      };
      if (c) {
        const $ = () => {
          P(), fs.delete(e);
        };
        $.id = -1, fs.set(e, $), rt($, n);
      } else
        ca(e), P();
    }
  }
}
function ca(e) {
  const t = fs.get(e);
  t && (t.flags |= 8, fs.delete(e));
}
ks().requestIdleCallback;
ks().cancelIdleCallback;
const gn = (e) => !!e.type.__asyncLoader, ii = (e) => e.type.__isKeepAlive;
function ri(e, t) {
  ui(e, "a", t);
}
function ci(e, t) {
  ui(e, "da", t);
}
function ui(e, t, n = tt) {
  const l = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Rs(t, l, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ii(o.parent.vnode) && ic(l, t, n, o), o = o.parent;
  }
}
function ic(e, t, n, l) {
  const o = Rs(
    t,
    e,
    l,
    !0
    /* prepend */
  );
  Fl(() => {
    Al(l[t], o);
  }, n);
}
function Rs(e, t, n = tt, l = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...c) => {
      Bt();
      const u = qn(n), d = Et(t, n, e, c);
      return u(), Vt(), d;
    });
    return l ? o.unshift(r) : o.push(r), r;
  }
}
const Wt = (e) => (t, n = tt) => {
  (!zn || e === "sp") && Rs(e, (...l) => t(...l), n);
}, rc = Wt("bm"), nt = Wt("m"), cc = Wt(
  "bu"
), uc = Wt("u"), Ul = Wt(
  "bum"
), Fl = Wt("um"), dc = Wt(
  "sp"
), fc = Wt("rtg"), pc = Wt("rtc");
function hc(e, t = tt) {
  Rs("ec", e, t);
}
const gc = "components";
function mc(e, t) {
  return vc(gc, e, !0, t) || e;
}
const bc = /* @__PURE__ */ Symbol.for("v-ndc");
function vc(e, t, n = !0, l = !1) {
  const o = Ye || tt;
  if (o) {
    const r = o.type;
    {
      const u = nu(
        r,
        !1
      );
      if (u && (u === t || u === ot(t) || u === _s(ot(t))))
        return r;
    }
    const c = (
      // local registration
      // check instance[type] first which is resolved for options API
      ua(o[e] || r[e], t) || // global registration
      ua(o.appContext[e], t)
    );
    return !c && l ? r : c;
  }
}
function ua(e, t) {
  return e && (e[t] || e[ot(t)] || e[_s(ot(t))]);
}
function fe(e, t, n, l) {
  let o;
  const r = n, c = ye(e);
  if (c || Ke(e)) {
    const u = c && /* @__PURE__ */ Tt(e);
    let d = !1, f = !1;
    u && (d = !/* @__PURE__ */ ht(e), f = /* @__PURE__ */ jt(e), e = $s(e)), o = new Array(e.length);
    for (let p = 0, h = e.length; p < h; p++)
      o[p] = t(
        d ? f ? mn(_t(e[p])) : _t(e[p]) : e[p],
        p,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let u = 0; u < e; u++)
      o[u] = t(u + 1, u, void 0, r);
  } else if (Ie(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (u, d) => t(u, d, void 0, r)
      );
    else {
      const u = Object.keys(e);
      o = new Array(u.length);
      for (let d = 0, f = u.length; d < f; d++) {
        const p = u[d];
        o[d] = t(e[p], p, d, r);
      }
    }
  else
    o = [];
  return o;
}
function da(e, t, n = {}, l, o) {
  if (Ye.ce || Ye.parent && gn(Ye.parent) && Ye.parent.ce) {
    const f = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), g(), Ne(
      j,
      null,
      [H("slot", n, l)],
      f ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1), g();
  const c = r && di(r(n)), u = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  c && c.key, d = Ne(
    j,
    {
      key: (u && !yt(u) ? u : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!c && l ? "_fb" : "")
    },
    c || [],
    c && e._ === 1 ? 64 : -2
  );
  return d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]), r && r._c && (r._d = !0), d;
}
function di(e) {
  return e.some((t) => jn(t) ? !(t.type === zt || t.type === j && !di(t.children)) : !0) ? e : null;
}
const al = (e) => e ? Di(e) ? Ts(e) : al(e.parent) : null, Mn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ze(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => al(e.parent),
    $root: (e) => al(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => pi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ll(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = As.bind(e.proxy)),
    $watch: (e) => sc.bind(e)
  })
), Vs = (e, t) => e !== Fe && !e.__isScriptSetup && Me(e, t), yc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: l, data: o, props: r, accessCache: c, type: u, appContext: d } = e;
    if (t[0] !== "$") {
      const v = c[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return l[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Vs(l, t))
          return c[t] = 1, l[t];
        if (o !== Fe && Me(o, t))
          return c[t] = 2, o[t];
        if (Me(r, t))
          return c[t] = 3, r[t];
        if (n !== Fe && Me(n, t))
          return c[t] = 4, n[t];
        ol && (c[t] = 0);
      }
    }
    const f = Mn[t];
    let p, h;
    if (f)
      return t === "$attrs" && et(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (p = u.__cssModules) && (p = p[t])
    )
      return p;
    if (n !== Fe && Me(n, t))
      return c[t] = 4, n[t];
    if (
      // global properties
      h = d.config.globalProperties, Me(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: l, setupState: o, ctx: r } = e;
    return Vs(o, t) ? (o[t] = n, !0) : l !== Fe && Me(l, t) ? (l[t] = n, !0) : Me(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: l, appContext: o, props: r, type: c }
  }, u) {
    let d;
    return !!(n[u] || e !== Fe && u[0] !== "$" && Me(e, u) || Vs(t, u) || Me(r, u) || Me(l, u) || Me(Mn, u) || Me(o.config.globalProperties, u) || (d = c.__cssModules) && d[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Me(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function fa(e) {
  return ye(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ol = !0;
function _c(e) {
  const t = pi(e), n = e.proxy, l = e.ctx;
  ol = !1, t.beforeCreate && pa(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: c,
    watch: u,
    provide: d,
    inject: f,
    // lifecycle
    created: p,
    beforeMount: h,
    mounted: v,
    beforeUpdate: b,
    updated: C,
    activated: E,
    deactivated: R,
    beforeDestroy: P,
    beforeUnmount: $,
    destroyed: T,
    unmounted: U,
    render: I,
    renderTracked: ee,
    renderTriggered: _,
    errorCaptured: x,
    serverPrefetch: S,
    // public API
    expose: z,
    inheritAttrs: ue,
    // assets
    components: de,
    directives: le,
    filters: Z
  } = t;
  if (f && wc(f, l, null), c)
    for (const ge in c) {
      const ke = c[ge];
      we(ke) && (l[ge] = ke.bind(n));
    }
  if (o) {
    const ge = o.call(n, n);
    Ie(ge) && (e.data = /* @__PURE__ */ pt(ge));
  }
  if (ol = !0, r)
    for (const ge in r) {
      const ke = r[ge], Ve = we(ke) ? ke.bind(n, n) : we(ke.get) ? ke.get.bind(n, n) : Pt, Je = !we(ke) && we(ke.set) ? ke.set.bind(n) : Pt, W = D({
        get: Ve,
        set: Je
      });
      Object.defineProperty(l, ge, {
        enumerable: !0,
        configurable: !0,
        get: () => W.value,
        set: (K) => W.value = K
      });
    }
  if (u)
    for (const ge in u)
      fi(u[ge], l, n, ge);
  if (d) {
    const ge = we(d) ? d.call(n) : d;
    Reflect.ownKeys(ge).forEach((ke) => {
      as(ke, ge[ke]);
    });
  }
  p && pa(p, e, "c");
  function pe(ge, ke) {
    ye(ke) ? ke.forEach((Ve) => ge(Ve.bind(n))) : ke && ge(ke.bind(n));
  }
  if (pe(rc, h), pe(nt, v), pe(cc, b), pe(uc, C), pe(ri, E), pe(ci, R), pe(hc, x), pe(pc, ee), pe(fc, _), pe(Ul, $), pe(Fl, U), pe(dc, S), ye(z))
    if (z.length) {
      const ge = e.exposed || (e.exposed = {});
      z.forEach((ke) => {
        Object.defineProperty(ge, ke, {
          get: () => n[ke],
          set: (Ve) => n[ke] = Ve,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === Pt && (e.render = I), ue != null && (e.inheritAttrs = ue), de && (e.components = de), le && (e.directives = le), S && oi(e);
}
function wc(e, t, n = Pt) {
  ye(e) && (e = il(e));
  for (const l in e) {
    const o = e[l];
    let r;
    Ie(o) ? "default" in o ? r = gt(
      o.from || l,
      o.default,
      !0
    ) : r = gt(o.from || l) : r = gt(o), /* @__PURE__ */ Be(r) ? Object.defineProperty(t, l, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (c) => r.value = c
    }) : t[l] = r;
  }
}
function pa(e, t, n) {
  Et(
    ye(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function fi(e, t, n, l) {
  let o = l.includes(".") ? ai(n, l) : () => n[l];
  if (Ke(e)) {
    const r = t[e];
    we(r) && Te(o, r);
  } else if (we(e))
    Te(o, e.bind(n));
  else if (Ie(e))
    if (ye(e))
      e.forEach((r) => fi(r, t, n, l));
    else {
      const r = we(e.handler) ? e.handler.bind(n) : t[e.handler];
      we(r) && Te(o, r, e);
    }
}
function pi(e) {
  const t = e.type, { mixins: n, extends: l } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: c }
  } = e.appContext, u = r.get(t);
  let d;
  return u ? d = u : !o.length && !n && !l ? d = t : (d = {}, o.length && o.forEach(
    (f) => ps(d, f, c, !0)
  ), ps(d, t, c)), Ie(t) && r.set(t, d), d;
}
function ps(e, t, n, l = !1) {
  const { mixins: o, extends: r } = t;
  r && ps(e, r, n, !0), o && o.forEach(
    (c) => ps(e, c, n, !0)
  );
  for (const c in t)
    if (!(l && c === "expose")) {
      const u = kc[c] || n && n[c];
      e[c] = u ? u(e[c], t[c]) : t[c];
    }
  return e;
}
const kc = {
  data: ha,
  props: ga,
  emits: ga,
  // objects
  methods: xn,
  computed: xn,
  // lifecycle
  beforeCreate: st,
  created: st,
  beforeMount: st,
  mounted: st,
  beforeUpdate: st,
  updated: st,
  beforeDestroy: st,
  beforeUnmount: st,
  destroyed: st,
  unmounted: st,
  activated: st,
  deactivated: st,
  errorCaptured: st,
  serverPrefetch: st,
  // assets
  components: xn,
  directives: xn,
  // watch
  watch: Cc,
  // provide / inject
  provide: ha,
  inject: $c
};
function ha(e, t) {
  return t ? e ? function() {
    return Ze(
      we(e) ? e.call(this, this) : e,
      we(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function $c(e, t) {
  return xn(il(e), il(t));
}
function il(e) {
  if (ye(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function st(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function xn(e, t) {
  return e ? Ze(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ga(e, t) {
  return e ? ye(e) && ye(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ze(
    /* @__PURE__ */ Object.create(null),
    fa(e),
    fa(t ?? {})
  ) : t;
}
function Cc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ze(/* @__PURE__ */ Object.create(null), e);
  for (const l in t)
    n[l] = st(e[l], t[l]);
  return n;
}
function hi() {
  return {
    app: null,
    config: {
      isNativeTag: So,
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
let Sc = 0;
function Ac(e, t) {
  return function(l, o = null) {
    we(l) || (l = Ze({}, l)), o != null && !Ie(o) && (o = null);
    const r = hi(), c = /* @__PURE__ */ new WeakSet(), u = [];
    let d = !1;
    const f = r.app = {
      _uid: Sc++,
      _component: l,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: lu,
      get config() {
        return r.config;
      },
      set config(p) {
      },
      use(p, ...h) {
        return c.has(p) || (p && we(p.install) ? (c.add(p), p.install(f, ...h)) : we(p) && (c.add(p), p(f, ...h))), f;
      },
      mixin(p) {
        return r.mixins.includes(p) || r.mixins.push(p), f;
      },
      component(p, h) {
        return h ? (r.components[p] = h, f) : r.components[p];
      },
      directive(p, h) {
        return h ? (r.directives[p] = h, f) : r.directives[p];
      },
      mount(p, h, v) {
        if (!d) {
          const b = f._ceVNode || H(l, o);
          return b.appContext = r, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(b, p, v), d = !0, f._container = p, p.__vue_app__ = f, Ts(b.component);
        }
      },
      onUnmount(p) {
        u.push(p);
      },
      unmount() {
        d && (Et(
          u,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(p, h) {
        return r.provides[p] = h, f;
      },
      runWithContext(p) {
        const h = an;
        an = f;
        try {
          return p();
        } finally {
          an = h;
        }
      }
    };
    return f;
  };
}
let an = null;
const Rc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ot(t)}Modifiers`] || e[`${Zt(t)}Modifiers`];
function xc(e, t, ...n) {
  if (e.isUnmounted) return;
  const l = e.vnode.props || Fe;
  let o = n;
  const r = t.startsWith("update:"), c = r && Rc(l, t.slice(7));
  c && (c.trim && (o = n.map((p) => Ke(p) ? p.trim() : p)), c.number && (o = n.map(ws)));
  let u, d = l[u = Ns(t)] || // also try camelCase event handler (#2249)
  l[u = Ns(ot(t))];
  !d && r && (d = l[u = Ns(Zt(t))]), d && Et(
    d,
    e,
    6,
    o
  );
  const f = l[u + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, Et(
      f,
      e,
      6,
      o
    );
  }
}
const Pc = /* @__PURE__ */ new WeakMap();
function gi(e, t, n = !1) {
  const l = n ? Pc : t.emitsCache, o = l.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let c = {}, u = !1;
  if (!we(e)) {
    const d = (f) => {
      const p = gi(f, t, !0);
      p && (u = !0, Ze(c, p));
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !r && !u ? (Ie(e) && l.set(e, null), null) : (ye(r) ? r.forEach((d) => c[d] = null) : Ze(c, r), Ie(e) && l.set(e, c), c);
}
function xs(e, t) {
  return !e || !bs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Me(e, t[0].toLowerCase() + t.slice(1)) || Me(e, Zt(t)) || Me(e, t));
}
function ma(e) {
  const {
    type: t,
    vnode: n,
    proxy: l,
    withProxy: o,
    propsOptions: [r],
    slots: c,
    attrs: u,
    emit: d,
    render: f,
    renderCache: p,
    props: h,
    data: v,
    setupState: b,
    ctx: C,
    inheritAttrs: E
  } = e, R = ds(e);
  let P, $;
  try {
    if (n.shapeFlag & 4) {
      const U = o || l, I = U;
      P = At(
        f.call(
          I,
          U,
          p,
          h,
          b,
          v,
          C
        )
      ), $ = u;
    } else {
      const U = t;
      P = At(
        U.length > 1 ? U(
          h,
          { attrs: u, slots: c, emit: d }
        ) : U(
          h,
          null
        )
      ), $ = t.props ? u : Tc(u);
    }
  } catch (U) {
    In.length = 0, Ss(U, e, 1), P = H(zt);
  }
  let T = P;
  if ($ && E !== !1) {
    const U = Object.keys($), { shapeFlag: I } = T;
    U.length && I & 7 && (r && U.some(Sl) && ($ = Ec(
      $,
      r
    )), T = bn(T, $, !1, !0));
  }
  return n.dirs && (T = bn(T, null, !1, !0), T.dirs = T.dirs ? T.dirs.concat(n.dirs) : n.dirs), n.transition && Nl(T, n.transition), P = T, ds(R), P;
}
const Tc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || bs(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ec = (e, t) => {
  const n = {};
  for (const l in e)
    (!Sl(l) || !(l.slice(9) in t)) && (n[l] = e[l]);
  return n;
};
function Dc(e, t, n) {
  const { props: l, children: o, component: r } = e, { props: c, children: u, patchFlag: d } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return l ? ba(l, c, f) : !!c;
    if (d & 8) {
      const p = t.dynamicProps;
      for (let h = 0; h < p.length; h++) {
        const v = p[h];
        if (mi(c, l, v) && !xs(f, v))
          return !0;
      }
    }
  } else
    return (o || u) && (!u || !u.$stable) ? !0 : l === c ? !1 : l ? c ? ba(l, c, f) : !0 : !!c;
  return !1;
}
function ba(e, t, n) {
  const l = Object.keys(t);
  if (l.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < l.length; o++) {
    const r = l[o];
    if (mi(t, e, r) && !xs(n, r))
      return !0;
  }
  return !1;
}
function mi(e, t, n) {
  const l = e[n], o = t[n];
  return n === "style" && Ie(l) && Ie(o) ? !Qt(l, o) : l !== o;
}
function Mc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const l = t.subTree;
    if (l.suspense && l.suspense.activeBranch === e && (l.el = e.el), l === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const bi = {}, vi = () => Object.create(bi), yi = (e) => Object.getPrototypeOf(e) === bi;
function Ic(e, t, n, l = !1) {
  const o = {}, r = vi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), _i(e, t, o, r);
  for (const c in e.propsOptions[0])
    c in o || (o[c] = void 0);
  n ? e.props = l ? o : /* @__PURE__ */ Qo(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function Oc(e, t, n, l) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: c }
  } = e, u = /* @__PURE__ */ Pe(o), [d] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (l || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const p = e.vnode.dynamicProps;
      for (let h = 0; h < p.length; h++) {
        let v = p[h];
        if (xs(e.emitsOptions, v))
          continue;
        const b = t[v];
        if (d)
          if (Me(r, v))
            b !== r[v] && (r[v] = b, f = !0);
          else {
            const C = ot(v);
            o[C] = rl(
              d,
              u,
              C,
              b,
              e,
              !1
            );
          }
        else
          b !== r[v] && (r[v] = b, f = !0);
      }
    }
  } else {
    _i(e, t, o, r) && (f = !0);
    let p;
    for (const h in u)
      (!t || // for camelCase
      !Me(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = Zt(h)) === h || !Me(t, p))) && (d ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[p] !== void 0) && (o[h] = rl(
        d,
        u,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (r !== u)
      for (const h in r)
        (!t || !Me(t, h)) && (delete r[h], f = !0);
  }
  f && Nt(e.attrs, "set", "");
}
function _i(e, t, n, l) {
  const [o, r] = e.propsOptions;
  let c = !1, u;
  if (t)
    for (let d in t) {
      if (Pn(d))
        continue;
      const f = t[d];
      let p;
      o && Me(o, p = ot(d)) ? !r || !r.includes(p) ? n[p] = f : (u || (u = {}))[p] = f : xs(e.emitsOptions, d) || (!(d in l) || f !== l[d]) && (l[d] = f, c = !0);
    }
  if (r) {
    const d = /* @__PURE__ */ Pe(n), f = u || Fe;
    for (let p = 0; p < r.length; p++) {
      const h = r[p];
      n[h] = rl(
        o,
        d,
        h,
        f[h],
        e,
        !Me(f, h)
      );
    }
  }
  return c;
}
function rl(e, t, n, l, o, r) {
  const c = e[n];
  if (c != null) {
    const u = Me(c, "default");
    if (u && l === void 0) {
      const d = c.default;
      if (c.type !== Function && !c.skipFactory && we(d)) {
        const { propsDefaults: f } = o;
        if (n in f)
          l = f[n];
        else {
          const p = qn(o);
          l = f[n] = d.call(
            null,
            t
          ), p();
        }
      } else
        l = d;
      o.ce && o.ce._setProp(n, l);
    }
    c[
      0
      /* shouldCast */
    ] && (r && !u ? l = !1 : c[
      1
      /* shouldCastTrue */
    ] && (l === "" || l === Zt(n)) && (l = !0));
  }
  return l;
}
const Lc = /* @__PURE__ */ new WeakMap();
function wi(e, t, n = !1) {
  const l = n ? Lc : t.propsCache, o = l.get(e);
  if (o)
    return o;
  const r = e.props, c = {}, u = [];
  let d = !1;
  if (!we(e)) {
    const p = (h) => {
      d = !0;
      const [v, b] = wi(h, t, !0);
      Ze(c, v), b && u.push(...b);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !d)
    return Ie(e) && l.set(e, fn), fn;
  if (ye(r))
    for (let p = 0; p < r.length; p++) {
      const h = ot(r[p]);
      va(h) && (c[h] = Fe);
    }
  else if (r)
    for (const p in r) {
      const h = ot(p);
      if (va(h)) {
        const v = r[p], b = c[h] = ye(v) || we(v) ? { type: v } : Ze({}, v), C = b.type;
        let E = !1, R = !0;
        if (ye(C))
          for (let P = 0; P < C.length; ++P) {
            const $ = C[P], T = we($) && $.name;
            if (T === "Boolean") {
              E = !0;
              break;
            } else T === "String" && (R = !1);
          }
        else
          E = we(C) && C.name === "Boolean";
        b[
          0
          /* shouldCast */
        ] = E, b[
          1
          /* shouldCastTrue */
        ] = R, (E || Me(b, "default")) && u.push(h);
      }
    }
  const f = [c, u];
  return Ie(e) && l.set(e, f), f;
}
function va(e) {
  return e[0] !== "$" && !Pn(e);
}
const Gl = (e) => e === "_" || e === "_ctx" || e === "$stable", Bl = (e) => ye(e) ? e.map(At) : [At(e)], Nc = (e, t, n) => {
  if (t._n)
    return t;
  const l = Y((...o) => Bl(t(...o)), n);
  return l._c = !1, l;
}, ki = (e, t, n) => {
  const l = e._ctx;
  for (const o in e) {
    if (Gl(o)) continue;
    const r = e[o];
    if (we(r))
      t[o] = Nc(o, r, l);
    else if (r != null) {
      const c = Bl(r);
      t[o] = () => c;
    }
  }
}, $i = (e, t) => {
  const n = Bl(t);
  e.slots.default = () => n;
}, Ci = (e, t, n) => {
  for (const l in t)
    (n || !Gl(l)) && (e[l] = t[l]);
}, Uc = (e, t, n) => {
  const l = e.slots = vi();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Ci(l, t, n), n && Po(l, "_", o, !0)) : ki(t, l);
  } else t && $i(e, t);
}, Fc = (e, t, n) => {
  const { vnode: l, slots: o } = e;
  let r = !0, c = Fe;
  if (l.shapeFlag & 32) {
    const u = t._;
    u ? n && u === 1 ? r = !1 : Ci(o, t, n) : (r = !t.$stable, ki(t, o)), c = t;
  } else t && ($i(e, t), c = { default: 1 });
  if (r)
    for (const u in o)
      !Gl(u) && c[u] == null && delete o[u];
}, rt = zc;
function Gc(e) {
  return Bc(e);
}
function Bc(e, t) {
  const n = ks();
  n.__VUE__ = !0;
  const {
    insert: l,
    remove: o,
    patchProp: r,
    createElement: c,
    createText: u,
    createComment: d,
    setText: f,
    setElementText: p,
    parentNode: h,
    nextSibling: v,
    setScopeId: b = Pt,
    insertStaticContent: C
  } = e, E = (y, k, A, L = null, B = null, N = null, te = void 0, X = null, q = !!k.dynamicChildren) => {
    if (y === k)
      return;
    y && !Sn(y, k) && (L = O(y), K(y, B, N, !0), y = null), k.patchFlag === -2 && (q = !1, k.dynamicChildren = null);
    const { type: V, ref: ve, shapeFlag: ie } = k;
    switch (V) {
      case Ps:
        R(y, k, A, L);
        break;
      case zt:
        P(y, k, A, L);
        break;
      case zs:
        y == null && $(k, A, L, te);
        break;
      case j:
        de(
          y,
          k,
          A,
          L,
          B,
          N,
          te,
          X,
          q
        );
        break;
      default:
        ie & 1 ? I(
          y,
          k,
          A,
          L,
          B,
          N,
          te,
          X,
          q
        ) : ie & 6 ? le(
          y,
          k,
          A,
          L,
          B,
          N,
          te,
          X,
          q
        ) : (ie & 64 || ie & 128) && V.process(
          y,
          k,
          A,
          L,
          B,
          N,
          te,
          X,
          q,
          G
        );
    }
    ve != null && B ? Dn(ve, y && y.ref, N, k || y, !k) : ve == null && y && y.ref != null && Dn(y.ref, null, N, y, !0);
  }, R = (y, k, A, L) => {
    if (y == null)
      l(
        k.el = u(k.children),
        A,
        L
      );
    else {
      const B = k.el = y.el;
      k.children !== y.children && f(B, k.children);
    }
  }, P = (y, k, A, L) => {
    y == null ? l(
      k.el = d(k.children || ""),
      A,
      L
    ) : k.el = y.el;
  }, $ = (y, k, A, L) => {
    [y.el, y.anchor] = C(
      y.children,
      k,
      A,
      L,
      y.el,
      y.anchor
    );
  }, T = ({ el: y, anchor: k }, A, L) => {
    let B;
    for (; y && y !== k; )
      B = v(y), l(y, A, L), y = B;
    l(k, A, L);
  }, U = ({ el: y, anchor: k }) => {
    let A;
    for (; y && y !== k; )
      A = v(y), o(y), y = A;
    o(k);
  }, I = (y, k, A, L, B, N, te, X, q) => {
    if (k.type === "svg" ? te = "svg" : k.type === "math" && (te = "mathml"), y == null)
      ee(
        k,
        A,
        L,
        B,
        N,
        te,
        X,
        q
      );
    else {
      const V = y.el && y.el._isVueCE ? y.el : null;
      try {
        V && V._beginPatch(), S(
          y,
          k,
          B,
          N,
          te,
          X,
          q
        );
      } finally {
        V && V._endPatch();
      }
    }
  }, ee = (y, k, A, L, B, N, te, X) => {
    let q, V;
    const { props: ve, shapeFlag: ie, transition: me, dirs: _e } = y;
    if (q = y.el = c(
      y.type,
      N,
      ve && ve.is,
      ve
    ), ie & 8 ? p(q, y.children) : ie & 16 && x(
      y.children,
      q,
      null,
      L,
      B,
      js(y, N),
      te,
      X
    ), _e && Xt(y, null, L, "created"), _(q, y, y.scopeId, te, L), ve) {
      for (const Le in ve)
        Le !== "value" && !Pn(Le) && r(q, Le, null, ve[Le], N, L);
      "value" in ve && r(q, "value", null, ve.value, N), (V = ve.onVnodeBeforeMount) && $t(V, L, y);
    }
    _e && Xt(y, null, L, "beforeMount");
    const Re = Vc(B, me);
    Re && me.beforeEnter(q), l(q, k, A), ((V = ve && ve.onVnodeMounted) || Re || _e) && rt(() => {
      V && $t(V, L, y), Re && me.enter(q), _e && Xt(y, null, L, "mounted");
    }, B);
  }, _ = (y, k, A, L, B) => {
    if (A && b(y, A), L)
      for (let N = 0; N < L.length; N++)
        b(y, L[N]);
    if (B) {
      let N = B.subTree;
      if (k === N || xi(N.type) && (N.ssContent === k || N.ssFallback === k)) {
        const te = B.vnode;
        _(
          y,
          te,
          te.scopeId,
          te.slotScopeIds,
          B.parent
        );
      }
    }
  }, x = (y, k, A, L, B, N, te, X, q = 0) => {
    for (let V = q; V < y.length; V++) {
      const ve = y[V] = X ? Ot(y[V]) : At(y[V]);
      E(
        null,
        ve,
        k,
        A,
        L,
        B,
        N,
        te,
        X
      );
    }
  }, S = (y, k, A, L, B, N, te) => {
    const X = k.el = y.el;
    let { patchFlag: q, dynamicChildren: V, dirs: ve } = k;
    q |= y.patchFlag & 16;
    const ie = y.props || Fe, me = k.props || Fe;
    let _e;
    if (A && en(A, !1), (_e = me.onVnodeBeforeUpdate) && $t(_e, A, k, y), ve && Xt(k, y, A, "beforeUpdate"), A && en(A, !0), (ie.innerHTML && me.innerHTML == null || ie.textContent && me.textContent == null) && p(X, ""), V ? z(
      y.dynamicChildren,
      V,
      X,
      A,
      L,
      js(k, B),
      N
    ) : te || ke(
      y,
      k,
      X,
      null,
      A,
      L,
      js(k, B),
      N,
      !1
    ), q > 0) {
      if (q & 16)
        ue(X, ie, me, A, B);
      else if (q & 2 && ie.class !== me.class && r(X, "class", null, me.class, B), q & 4 && r(X, "style", ie.style, me.style, B), q & 8) {
        const Re = k.dynamicProps;
        for (let Le = 0; Le < Re.length; Le++) {
          const M = Re[Le], ce = ie[M], se = me[M];
          (se !== ce || M === "value") && r(X, M, ce, se, B, A);
        }
      }
      q & 1 && y.children !== k.children && p(X, k.children);
    } else !te && V == null && ue(X, ie, me, A, B);
    ((_e = me.onVnodeUpdated) || ve) && rt(() => {
      _e && $t(_e, A, k, y), ve && Xt(k, y, A, "updated");
    }, L);
  }, z = (y, k, A, L, B, N, te) => {
    for (let X = 0; X < k.length; X++) {
      const q = y[X], V = k[X], ve = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        q.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (q.type === j || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Sn(q, V) || // - In the case of a component, it could contain anything.
        q.shapeFlag & 198) ? h(q.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          A
        )
      );
      E(
        q,
        V,
        ve,
        null,
        L,
        B,
        N,
        te,
        !0
      );
    }
  }, ue = (y, k, A, L, B) => {
    if (k !== A) {
      if (k !== Fe)
        for (const N in k)
          !Pn(N) && !(N in A) && r(
            y,
            N,
            k[N],
            null,
            B,
            L
          );
      for (const N in A) {
        if (Pn(N)) continue;
        const te = A[N], X = k[N];
        te !== X && N !== "value" && r(y, N, X, te, B, L);
      }
      "value" in A && r(y, "value", k.value, A.value, B);
    }
  }, de = (y, k, A, L, B, N, te, X, q) => {
    const V = k.el = y ? y.el : u(""), ve = k.anchor = y ? y.anchor : u("");
    let { patchFlag: ie, dynamicChildren: me, slotScopeIds: _e } = k;
    _e && (X = X ? X.concat(_e) : _e), y == null ? (l(V, A, L), l(ve, A, L), x(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      k.children || [],
      A,
      ve,
      B,
      N,
      te,
      X,
      q
    )) : ie > 0 && ie & 64 && me && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    y.dynamicChildren && y.dynamicChildren.length === me.length ? (z(
      y.dynamicChildren,
      me,
      A,
      B,
      N,
      te,
      X
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (k.key != null || B && k === B.subTree) && Si(
      y,
      k,
      !0
      /* shallow */
    )) : ke(
      y,
      k,
      A,
      ve,
      B,
      N,
      te,
      X,
      q
    );
  }, le = (y, k, A, L, B, N, te, X, q) => {
    k.slotScopeIds = X, y == null ? k.shapeFlag & 512 ? B.ctx.activate(
      k,
      A,
      L,
      te,
      q
    ) : Z(
      k,
      A,
      L,
      B,
      N,
      te,
      q
    ) : Ue(y, k, q);
  }, Z = (y, k, A, L, B, N, te) => {
    const X = y.component = Yc(
      y,
      L,
      B
    );
    if (ii(y) && (X.ctx.renderer = G), Zc(X, !1, te), X.asyncDep) {
      if (B && B.registerDep(X, pe, te), !y.el) {
        const q = X.subTree = H(zt);
        P(null, q, k, A), y.placeholder = q.el;
      }
    } else
      pe(
        X,
        y,
        k,
        A,
        B,
        N,
        te
      );
  }, Ue = (y, k, A) => {
    const L = k.component = y.component;
    if (Dc(y, k, A))
      if (L.asyncDep && !L.asyncResolved) {
        ge(L, k, A);
        return;
      } else
        L.next = k, L.update();
    else
      k.el = y.el, L.vnode = k;
  }, pe = (y, k, A, L, B, N, te) => {
    const X = () => {
      if (y.isMounted) {
        let { next: ie, bu: me, u: _e, parent: Re, vnode: Le } = y;
        {
          const He = Ai(y);
          if (He) {
            ie && (ie.el = Le.el, ge(y, ie, te)), He.asyncDep.then(() => {
              rt(() => {
                y.isUnmounted || V();
              }, B);
            });
            return;
          }
        }
        let M = ie, ce;
        en(y, !1), ie ? (ie.el = Le.el, ge(y, ie, te)) : ie = Le, me && ls(me), (ce = ie.props && ie.props.onVnodeBeforeUpdate) && $t(ce, Re, ie, Le), en(y, !0);
        const se = ma(y), Ae = y.subTree;
        y.subTree = se, E(
          Ae,
          se,
          // parent may have changed if it's in a teleport
          h(Ae.el),
          // anchor may have changed if it's in a fragment
          O(Ae),
          y,
          B,
          N
        ), ie.el = se.el, M === null && Mc(y, se.el), _e && rt(_e, B), (ce = ie.props && ie.props.onVnodeUpdated) && rt(
          () => $t(ce, Re, ie, Le),
          B
        );
      } else {
        let ie;
        const { el: me, props: _e } = k, { bm: Re, m: Le, parent: M, root: ce, type: se } = y, Ae = gn(k);
        en(y, !1), Re && ls(Re), !Ae && (ie = _e && _e.onVnodeBeforeMount) && $t(ie, M, k), en(y, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            se,
            y.parent ? y.parent.type : void 0
          );
          const He = y.subTree = ma(y);
          E(
            null,
            He,
            A,
            L,
            y,
            B,
            N
          ), k.el = He.el;
        }
        if (Le && rt(Le, B), !Ae && (ie = _e && _e.onVnodeMounted)) {
          const He = k;
          rt(
            () => $t(ie, M, He),
            B
          );
        }
        (k.shapeFlag & 256 || M && gn(M.vnode) && M.vnode.shapeFlag & 256) && y.a && rt(y.a, B), y.isMounted = !0, k = A = L = null;
      }
    };
    y.scope.on();
    const q = y.effect = new Lo(X);
    y.scope.off();
    const V = y.update = q.run.bind(q), ve = y.job = q.runIfDirty.bind(q);
    ve.i = y, ve.id = y.uid, q.scheduler = () => Ll(ve), en(y, !0), V();
  }, ge = (y, k, A) => {
    k.component = y;
    const L = y.vnode.props;
    y.vnode = k, y.next = null, Oc(y, k.props, L, A), Fc(y, k.children, A), Bt(), ia(y), Vt();
  }, ke = (y, k, A, L, B, N, te, X, q = !1) => {
    const V = y && y.children, ve = y ? y.shapeFlag : 0, ie = k.children, { patchFlag: me, shapeFlag: _e } = k;
    if (me > 0) {
      if (me & 128) {
        Je(
          V,
          ie,
          A,
          L,
          B,
          N,
          te,
          X,
          q
        );
        return;
      } else if (me & 256) {
        Ve(
          V,
          ie,
          A,
          L,
          B,
          N,
          te,
          X,
          q
        );
        return;
      }
    }
    _e & 8 ? (ve & 16 && je(V, B, N), ie !== V && p(A, ie)) : ve & 16 ? _e & 16 ? Je(
      V,
      ie,
      A,
      L,
      B,
      N,
      te,
      X,
      q
    ) : je(V, B, N, !0) : (ve & 8 && p(A, ""), _e & 16 && x(
      ie,
      A,
      L,
      B,
      N,
      te,
      X,
      q
    ));
  }, Ve = (y, k, A, L, B, N, te, X, q) => {
    y = y || fn, k = k || fn;
    const V = y.length, ve = k.length, ie = Math.min(V, ve);
    let me;
    for (me = 0; me < ie; me++) {
      const _e = k[me] = q ? Ot(k[me]) : At(k[me]);
      E(
        y[me],
        _e,
        A,
        null,
        B,
        N,
        te,
        X,
        q
      );
    }
    V > ve ? je(
      y,
      B,
      N,
      !0,
      !1,
      ie
    ) : x(
      k,
      A,
      L,
      B,
      N,
      te,
      X,
      q,
      ie
    );
  }, Je = (y, k, A, L, B, N, te, X, q) => {
    let V = 0;
    const ve = k.length;
    let ie = y.length - 1, me = ve - 1;
    for (; V <= ie && V <= me; ) {
      const _e = y[V], Re = k[V] = q ? Ot(k[V]) : At(k[V]);
      if (Sn(_e, Re))
        E(
          _e,
          Re,
          A,
          null,
          B,
          N,
          te,
          X,
          q
        );
      else
        break;
      V++;
    }
    for (; V <= ie && V <= me; ) {
      const _e = y[ie], Re = k[me] = q ? Ot(k[me]) : At(k[me]);
      if (Sn(_e, Re))
        E(
          _e,
          Re,
          A,
          null,
          B,
          N,
          te,
          X,
          q
        );
      else
        break;
      ie--, me--;
    }
    if (V > ie) {
      if (V <= me) {
        const _e = me + 1, Re = _e < ve ? k[_e].el : L;
        for (; V <= me; )
          E(
            null,
            k[V] = q ? Ot(k[V]) : At(k[V]),
            A,
            Re,
            B,
            N,
            te,
            X,
            q
          ), V++;
      }
    } else if (V > me)
      for (; V <= ie; )
        K(y[V], B, N, !0), V++;
    else {
      const _e = V, Re = V, Le = /* @__PURE__ */ new Map();
      for (V = Re; V <= me; V++) {
        const ut = k[V] = q ? Ot(k[V]) : At(k[V]);
        ut.key != null && Le.set(ut.key, V);
      }
      let M, ce = 0;
      const se = me - Re + 1;
      let Ae = !1, He = 0;
      const $n = new Array(se);
      for (V = 0; V < se; V++) $n[V] = 0;
      for (V = _e; V <= ie; V++) {
        const ut = y[V];
        if (ce >= se) {
          K(ut, B, N, !0);
          continue;
        }
        let kt;
        if (ut.key != null)
          kt = Le.get(ut.key);
        else
          for (M = Re; M <= me; M++)
            if ($n[M - Re] === 0 && Sn(ut, k[M])) {
              kt = M;
              break;
            }
        kt === void 0 ? K(ut, B, N, !0) : ($n[kt - Re] = V + 1, kt >= He ? He = kt : Ae = !0, E(
          ut,
          k[kt],
          A,
          null,
          B,
          N,
          te,
          X,
          q
        ), ce++);
      }
      const ea = Ae ? jc($n) : fn;
      for (M = ea.length - 1, V = se - 1; V >= 0; V--) {
        const ut = Re + V, kt = k[ut], ta = k[ut + 1], na = ut + 1 < ve ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ta.el || Ri(ta)
        ) : L;
        $n[V] === 0 ? E(
          null,
          kt,
          A,
          na,
          B,
          N,
          te,
          X,
          q
        ) : Ae && (M < 0 || V !== ea[M] ? W(kt, A, na, 2) : M--);
      }
    }
  }, W = (y, k, A, L, B = null) => {
    const { el: N, type: te, transition: X, children: q, shapeFlag: V } = y;
    if (V & 6) {
      W(y.component.subTree, k, A, L);
      return;
    }
    if (V & 128) {
      y.suspense.move(k, A, L);
      return;
    }
    if (V & 64) {
      te.move(y, k, A, G);
      return;
    }
    if (te === j) {
      l(N, k, A);
      for (let ie = 0; ie < q.length; ie++)
        W(q[ie], k, A, L);
      l(y.anchor, k, A);
      return;
    }
    if (te === zs) {
      T(y, k, A);
      return;
    }
    if (L !== 2 && V & 1 && X)
      if (L === 0)
        X.beforeEnter(N), l(N, k, A), rt(() => X.enter(N), B);
      else {
        const { leave: ie, delayLeave: me, afterLeave: _e } = X, Re = () => {
          y.ctx.isUnmounted ? o(N) : l(N, k, A);
        }, Le = () => {
          N._isLeaving && N[oc](
            !0
            /* cancelled */
          ), ie(N, () => {
            Re(), _e && _e();
          });
        };
        me ? me(N, Re, Le) : Le();
      }
    else
      l(N, k, A);
  }, K = (y, k, A, L = !1, B = !1) => {
    const {
      type: N,
      props: te,
      ref: X,
      children: q,
      dynamicChildren: V,
      shapeFlag: ve,
      patchFlag: ie,
      dirs: me,
      cacheIndex: _e
    } = y;
    if (ie === -2 && (B = !1), X != null && (Bt(), Dn(X, null, A, y, !0), Vt()), _e != null && (k.renderCache[_e] = void 0), ve & 256) {
      k.ctx.deactivate(y);
      return;
    }
    const Re = ve & 1 && me, Le = !gn(y);
    let M;
    if (Le && (M = te && te.onVnodeBeforeUnmount) && $t(M, k, y), ve & 6)
      ze(y.component, A, L);
    else {
      if (ve & 128) {
        y.suspense.unmount(A, L);
        return;
      }
      Re && Xt(y, null, k, "beforeUnmount"), ve & 64 ? y.type.remove(
        y,
        k,
        A,
        G,
        L
      ) : V && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !V.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (N !== j || ie > 0 && ie & 64) ? je(
        V,
        k,
        A,
        !1,
        !0
      ) : (N === j && ie & 384 || !B && ve & 16) && je(q, k, A), L && Q(y);
    }
    (Le && (M = te && te.onVnodeUnmounted) || Re) && rt(() => {
      M && $t(M, k, y), Re && Xt(y, null, k, "unmounted");
    }, A);
  }, Q = (y) => {
    const { type: k, el: A, anchor: L, transition: B } = y;
    if (k === j) {
      Se(A, L);
      return;
    }
    if (k === zs) {
      U(y);
      return;
    }
    const N = () => {
      o(A), B && !B.persisted && B.afterLeave && B.afterLeave();
    };
    if (y.shapeFlag & 1 && B && !B.persisted) {
      const { leave: te, delayLeave: X } = B, q = () => te(A, N);
      X ? X(y.el, N, q) : q();
    } else
      N();
  }, Se = (y, k) => {
    let A;
    for (; y !== k; )
      A = v(y), o(y), y = A;
    o(k);
  }, ze = (y, k, A) => {
    const { bum: L, scope: B, job: N, subTree: te, um: X, m: q, a: V } = y;
    ya(q), ya(V), L && ls(L), B.stop(), N && (N.flags |= 8, K(te, y, k, A)), X && rt(X, k), rt(() => {
      y.isUnmounted = !0;
    }, k);
  }, je = (y, k, A, L = !1, B = !1, N = 0) => {
    for (let te = N; te < y.length; te++)
      K(y[te], k, A, L, B);
  }, O = (y) => {
    if (y.shapeFlag & 6)
      return O(y.component.subTree);
    if (y.shapeFlag & 128)
      return y.suspense.next();
    const k = v(y.anchor || y.el), A = k && k[lc];
    return A ? v(A) : k;
  };
  let ne = !1;
  const w = (y, k, A) => {
    let L;
    y == null ? k._vnode && (K(k._vnode, null, null, !0), L = k._vnode.component) : E(
      k._vnode || null,
      y,
      k,
      null,
      null,
      null,
      A
    ), k._vnode = y, ne || (ne = !0, ia(L), ti(), ne = !1);
  }, G = {
    p: E,
    um: K,
    m: W,
    r: Q,
    mt: Z,
    mc: x,
    pc: ke,
    pbc: z,
    n: O,
    o: e
  };
  return {
    render: w,
    hydrate: void 0,
    createApp: Ac(w)
  };
}
function js({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function en({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Vc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Si(e, t, n = !1) {
  const l = e.children, o = t.children;
  if (ye(l) && ye(o))
    for (let r = 0; r < l.length; r++) {
      const c = l[r];
      let u = o[r];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = o[r] = Ot(o[r]), u.el = c.el), !n && u.patchFlag !== -2 && Si(c, u)), u.type === Ps && (u.patchFlag === -1 && (u = o[r] = Ot(u)), u.el = c.el), u.type === zt && !u.el && (u.el = c.el);
    }
}
function jc(e) {
  const t = e.slice(), n = [0];
  let l, o, r, c, u;
  const d = e.length;
  for (l = 0; l < d; l++) {
    const f = e[l];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[l] = o, n.push(l);
        continue;
      }
      for (r = 0, c = n.length - 1; r < c; )
        u = r + c >> 1, e[n[u]] < f ? r = u + 1 : c = u;
      f < e[n[r]] && (r > 0 && (t[l] = n[r - 1]), n[r] = l);
    }
  }
  for (r = n.length, c = n[r - 1]; r-- > 0; )
    n[r] = c, c = t[c];
  return n;
}
function Ai(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ai(t);
}
function ya(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ri(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ri(t.subTree) : null;
}
const xi = (e) => e.__isSuspense;
function zc(e, t) {
  t && t.pendingBranch ? ye(e) ? t.effects.push(...e) : t.effects.push(e) : Xr(e);
}
const j = /* @__PURE__ */ Symbol.for("v-fgt"), Ps = /* @__PURE__ */ Symbol.for("v-txt"), zt = /* @__PURE__ */ Symbol.for("v-cmt"), zs = /* @__PURE__ */ Symbol.for("v-stc"), In = [];
let dt = null;
function g(e = !1) {
  In.push(dt = e ? null : []);
}
function Wc() {
  In.pop(), dt = In[In.length - 1] || null;
}
let Vn = 1;
function hs(e, t = !1) {
  Vn += e, e < 0 && dt && t && (dt.hasOnce = !0);
}
function Pi(e) {
  return e.dynamicChildren = Vn > 0 ? dt || fn : null, Wc(), Vn > 0 && dt && dt.push(e), e;
}
function m(e, t, n, l, o, r) {
  return Pi(
    a(
      e,
      t,
      n,
      l,
      o,
      r,
      !0
    )
  );
}
function Ne(e, t, n, l, o) {
  return Pi(
    H(
      e,
      t,
      n,
      l,
      o,
      !0
    )
  );
}
function jn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Sn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ti = ({ key: e }) => e ?? null, os = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ke(e) || /* @__PURE__ */ Be(e) || we(e) ? { i: Ye, r: e, k: t, f: !!n } : e : null);
function a(e, t = null, n = null, l = 0, o = null, r = e === j ? 0 : 1, c = !1, u = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ti(t),
    ref: t && os(t),
    scopeId: si,
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
    patchFlag: l,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ye
  };
  return u ? (Vl(d, n), r & 128 && e.normalize(d)) : n && (d.shapeFlag |= Ke(n) ? 8 : 16), Vn > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  dt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && dt.push(d), d;
}
const H = Hc;
function Hc(e, t = null, n = null, l = 0, o = null, r = !1) {
  if ((!e || e === bc) && (e = zt), jn(e)) {
    const u = bn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Vl(u, n), Vn > 0 && !r && dt && (u.shapeFlag & 6 ? dt[dt.indexOf(e)] = u : dt.push(u)), u.patchFlag = -2, u;
  }
  if (su(e) && (e = e.__vccOpts), t) {
    t = Kc(t);
    let { class: u, style: d } = t;
    u && !Ke(u) && (t.class = re(u)), Ie(d) && (/* @__PURE__ */ Cs(d) && !ye(d) && (d = Ze({}, d)), t.style = Un(d));
  }
  const c = Ke(e) ? 1 : xi(e) ? 128 : ac(e) ? 64 : Ie(e) ? 4 : we(e) ? 2 : 0;
  return a(
    e,
    t,
    n,
    l,
    o,
    c,
    r,
    !0
  );
}
function Kc(e) {
  return e ? /* @__PURE__ */ Cs(e) || yi(e) ? Ze({}, e) : e : null;
}
function bn(e, t, n = !1, l = !1) {
  const { props: o, ref: r, patchFlag: c, children: u, transition: d } = e, f = t ? qc(o || {}, t) : o, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Ti(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? ye(r) ? r.concat(os(t)) : [r, os(t)] : os(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== j ? c === -1 ? 16 : c | 16 : c,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: d,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && bn(e.ssContent),
    ssFallback: e.ssFallback && bn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return d && l && Nl(
    p,
    d.clone(p)
  ), p;
}
function ft(e = " ", t = 0) {
  return H(Ps, null, e, t);
}
function J(e = "", t = !1) {
  return t ? (g(), Ne(zt, null, e)) : H(zt, null, e);
}
function At(e) {
  return e == null || typeof e == "boolean" ? H(zt) : ye(e) ? H(
    j,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : jn(e) ? Ot(e) : H(Ps, null, String(e));
}
function Ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bn(e);
}
function Vl(e, t) {
  let n = 0;
  const { shapeFlag: l } = e;
  if (t == null)
    t = null;
  else if (ye(t))
    n = 16;
  else if (typeof t == "object")
    if (l & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Vl(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !yi(t) ? t._ctx = Ye : o === 3 && Ye && (Ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else we(t) ? (t = { default: t, _ctx: Ye }, n = 32) : (t = String(t), l & 64 ? (n = 16, t = [ft(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function qc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const l = e[n];
    for (const o in l)
      if (o === "class")
        t.class !== l.class && (t.class = re([t.class, l.class]));
      else if (o === "style")
        t.style = Un([t.style, l.style]);
      else if (bs(o)) {
        const r = t[o], c = l[o];
        c && r !== c && !(ye(r) && r.includes(c)) && (t[o] = r ? [].concat(r, c) : c);
      } else o !== "" && (t[o] = l[o]);
  }
  return t;
}
function $t(e, t, n, l = null) {
  Et(e, t, 7, [
    n,
    l
  ]);
}
const Jc = hi();
let Qc = 0;
function Yc(e, t, n) {
  const l = e.type, o = (t ? t.appContext : e.appContext) || Jc, r = {
    uid: Qc++,
    vnode: e,
    type: l,
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
    scope: new Mo(
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
    propsOptions: wi(l, o),
    emitsOptions: gi(l, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Fe,
    // inheritAttrs
    inheritAttrs: l.inheritAttrs,
    // state
    ctx: Fe,
    data: Fe,
    props: Fe,
    attrs: Fe,
    slots: Fe,
    refs: Fe,
    setupState: Fe,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = xc.bind(null, r), e.ce && e.ce(r), r;
}
let tt = null;
const Ei = () => tt || Ye;
let gs, cl;
{
  const e = ks(), t = (n, l) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(l), (r) => {
      o.length > 1 ? o.forEach((c) => c(r)) : o[0](r);
    };
  };
  gs = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => tt = n
  ), cl = t(
    "__VUE_SSR_SETTERS__",
    (n) => zn = n
  );
}
const qn = (e) => {
  const t = tt;
  return gs(e), e.scope.on(), () => {
    e.scope.off(), gs(t);
  };
}, _a = () => {
  tt && tt.scope.off(), gs(null);
};
function Di(e) {
  return e.vnode.shapeFlag & 4;
}
let zn = !1;
function Zc(e, t = !1, n = !1) {
  t && cl(t);
  const { props: l, children: o } = e.vnode, r = Di(e);
  Ic(e, l, r, t), Uc(e, o, n || t);
  const c = r ? Xc(e, t) : void 0;
  return t && cl(!1), c;
}
function Xc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, yc);
  const { setup: l } = n;
  if (l) {
    Bt();
    const o = e.setupContext = l.length > 1 ? tu(e) : null, r = qn(e), c = Kn(
      l,
      e,
      0,
      [
        e.props,
        o
      ]
    ), u = Ao(c);
    if (Vt(), r(), (u || e.sp) && !gn(e) && oi(e), u) {
      if (c.then(_a, _a), t)
        return c.then((d) => {
          wa(e, d);
        }).catch((d) => {
          Ss(d, e, 0);
        });
      e.asyncDep = c;
    } else
      wa(e, c);
  } else
    Mi(e);
}
function wa(e, t, n) {
  we(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ie(t) && (e.setupState = Ol(t)), Mi(e);
}
function Mi(e, t, n) {
  const l = e.type;
  e.render || (e.render = l.render || Pt);
  {
    const o = qn(e);
    Bt();
    try {
      _c(e);
    } finally {
      Vt(), o();
    }
  }
}
const eu = {
  get(e, t) {
    return et(e, "get", ""), e[t];
  }
};
function tu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, eu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ts(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ol(Il(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Mn)
        return Mn[n](e);
    },
    has(t, n) {
      return n in t || n in Mn;
    }
  })) : e.proxy;
}
function nu(e, t = !0) {
  return we(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function su(e) {
  return we(e) && "__vccOpts" in e;
}
const D = (e, t) => /* @__PURE__ */ qr(e, t, zn);
function Ii(e, t, n) {
  try {
    hs(-1);
    const l = arguments.length;
    return l === 2 ? Ie(t) && !ye(t) ? jn(t) ? H(e, null, [t]) : H(e, t) : H(e, null, t) : (l > 3 ? n = Array.prototype.slice.call(arguments, 2) : l === 3 && jn(n) && (n = [n]), H(e, t, n));
  } finally {
    hs(1);
  }
}
const lu = "3.5.30";
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ul;
const ka = typeof window < "u" && window.trustedTypes;
if (ka)
  try {
    ul = /* @__PURE__ */ ka.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Oi = ul ? (e) => ul.createHTML(e) : (e) => e, au = "http://www.w3.org/2000/svg", ou = "http://www.w3.org/1998/Math/MathML", It = typeof document < "u" ? document : null, $a = It && /* @__PURE__ */ It.createElement("template"), iu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, l) => {
    const o = t === "svg" ? It.createElementNS(au, e) : t === "mathml" ? It.createElementNS(ou, e) : n ? It.createElement(e, { is: n }) : It.createElement(e);
    return e === "select" && l && l.multiple != null && o.setAttribute("multiple", l.multiple), o;
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
  insertStaticContent(e, t, n, l, o, r) {
    const c = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      $a.innerHTML = Oi(
        l === "svg" ? `<svg>${e}</svg>` : l === "mathml" ? `<math>${e}</math>` : e
      );
      const u = $a.content;
      if (l === "svg" || l === "mathml") {
        const d = u.firstChild;
        for (; d.firstChild; )
          u.appendChild(d.firstChild);
        u.removeChild(d);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      c ? c.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, ru = /* @__PURE__ */ Symbol("_vtc");
function cu(e, t, n) {
  const l = e[ru];
  l && (t = (t ? [t, ...l] : [...l]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ca = /* @__PURE__ */ Symbol("_vod"), uu = /* @__PURE__ */ Symbol("_vsh"), du = /* @__PURE__ */ Symbol(""), fu = /(?:^|;)\s*display\s*:/;
function pu(e, t, n) {
  const l = e.style, o = Ke(n);
  let r = !1;
  if (n && !o) {
    if (t)
      if (Ke(t))
        for (const c of t.split(";")) {
          const u = c.slice(0, c.indexOf(":")).trim();
          n[u] == null && is(l, u, "");
        }
      else
        for (const c in t)
          n[c] == null && is(l, c, "");
    for (const c in n)
      c === "display" && (r = !0), is(l, c, n[c]);
  } else if (o) {
    if (t !== n) {
      const c = l[du];
      c && (n += ";" + c), l.cssText = n, r = fu.test(n);
    }
  } else t && e.removeAttribute("style");
  Ca in e && (e[Ca] = r ? l.display : "", e[uu] && (l.display = "none"));
}
const Sa = /\s*!important$/;
function is(e, t, n) {
  if (ye(n))
    n.forEach((l) => is(e, t, l));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const l = hu(e, t);
    Sa.test(n) ? e.setProperty(
      Zt(l),
      n.replace(Sa, ""),
      "important"
    ) : e[l] = n;
  }
}
const Aa = ["Webkit", "Moz", "ms"], Ws = {};
function hu(e, t) {
  const n = Ws[t];
  if (n)
    return n;
  let l = ot(t);
  if (l !== "filter" && l in e)
    return Ws[t] = l;
  l = _s(l);
  for (let o = 0; o < Aa.length; o++) {
    const r = Aa[o] + l;
    if (r in e)
      return Ws[t] = r;
  }
  return t;
}
const Ra = "http://www.w3.org/1999/xlink";
function xa(e, t, n, l, o, r = vr(t)) {
  l && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ra, t.slice(6, t.length)) : e.setAttributeNS(Ra, t, n) : n == null || r && !To(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : yt(n) ? String(n) : n
  );
}
function Pa(e, t, n, l, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Oi(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const u = r === "OPTION" ? e.getAttribute("value") || "" : e.value, d = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (u !== d || !("_value" in e)) && (e.value = d), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = To(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(o || t);
}
function Ft(e, t, n, l) {
  e.addEventListener(t, n, l);
}
function gu(e, t, n, l) {
  e.removeEventListener(t, n, l);
}
const Ta = /* @__PURE__ */ Symbol("_vei");
function mu(e, t, n, l, o = null) {
  const r = e[Ta] || (e[Ta] = {}), c = r[t];
  if (l && c)
    c.value = l;
  else {
    const [u, d] = bu(t);
    if (l) {
      const f = r[t] = _u(
        l,
        o
      );
      Ft(e, u, f, d);
    } else c && (gu(e, u, c, d), r[t] = void 0);
  }
}
const Ea = /(?:Once|Passive|Capture)$/;
function bu(e) {
  let t;
  if (Ea.test(e)) {
    t = {};
    let l;
    for (; l = e.match(Ea); )
      e = e.slice(0, e.length - l[0].length), t[l[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Zt(e.slice(2)), t];
}
let Hs = 0;
const vu = /* @__PURE__ */ Promise.resolve(), yu = () => Hs || (vu.then(() => Hs = 0), Hs = Date.now());
function _u(e, t) {
  const n = (l) => {
    if (!l._vts)
      l._vts = Date.now();
    else if (l._vts <= n.attached)
      return;
    Et(
      wu(l, n.value),
      t,
      5,
      [l]
    );
  };
  return n.value = e, n.attached = yu(), n;
}
function wu(e, t) {
  if (ye(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (l) => (o) => !o._stopped && l && l(o)
    );
  } else
    return t;
}
const Da = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ku = (e, t, n, l, o, r) => {
  const c = o === "svg";
  t === "class" ? cu(e, l, c) : t === "style" ? pu(e, n, l) : bs(t) ? Sl(t) || mu(e, t, n, l, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : $u(e, t, l, c)) ? (Pa(e, t, l), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && xa(e, t, l, c, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Cu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ke(l))) ? Pa(e, ot(t), l, r, t) : (t === "true-value" ? e._trueValue = l : t === "false-value" && (e._falseValue = l), xa(e, t, l, c));
};
function $u(e, t, n, l) {
  if (l)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Da(t) && we(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Da(t) && Ke(n) ? !1 : t in e;
}
function Cu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const l = ot(t);
  return Array.isArray(n) ? n.some((o) => ot(o) === l) : Object.keys(n).some((o) => ot(o) === l);
}
const Yt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ye(t) ? (n) => ls(t, n) : t;
};
function Su(e) {
  e.target.composing = !0;
}
function Ma(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const bt = /* @__PURE__ */ Symbol("_assign");
function Ia(e, t, n) {
  return t && (e = e.trim()), n && (e = ws(e)), e;
}
const xe = {
  created(e, { modifiers: { lazy: t, trim: n, number: l } }, o) {
    e[bt] = Yt(o);
    const r = l || o.props && o.props.type === "number";
    Ft(e, t ? "change" : "input", (c) => {
      c.target.composing || e[bt](Ia(e.value, n, r));
    }), (n || r) && Ft(e, "change", () => {
      e.value = Ia(e.value, n, r);
    }), t || (Ft(e, "compositionstart", Su), Ft(e, "compositionend", Ma), Ft(e, "change", Ma));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: l, trim: o, number: r } }, c) {
    if (e[bt] = Yt(c), e.composing) return;
    const u = (r || e.type === "number") && !/^0\d/.test(e.value) ? ws(e.value) : e.value, d = t ?? "";
    u !== d && (document.activeElement === e && e.type !== "range" && (l && t === n || o && e.value.trim() === d) || (e.value = d));
  }
}, Gt = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[bt] = Yt(n), Ft(e, "change", () => {
      const l = e._modelValue, o = vn(e), r = e.checked, c = e[bt];
      if (ye(l)) {
        const u = Rl(l, o), d = u !== -1;
        if (r && !d)
          c(l.concat(o));
        else if (!r && d) {
          const f = [...l];
          f.splice(u, 1), c(f);
        }
      } else if (wn(l)) {
        const u = new Set(l);
        r ? u.add(o) : u.delete(o), c(u);
      } else
        c(Li(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Oa,
  beforeUpdate(e, t, n) {
    e[bt] = Yt(n), Oa(e, t, n);
  }
};
function Oa(e, { value: t, oldValue: n }, l) {
  e._modelValue = t;
  let o;
  if (ye(t))
    o = Rl(t, l.props.value) > -1;
  else if (wn(t))
    o = t.has(l.props.value);
  else {
    if (t === n) return;
    o = Qt(t, Li(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
const Au = {
  created(e, { value: t }, n) {
    e.checked = Qt(t, n.props.value), e[bt] = Yt(n), Ft(e, "change", () => {
      e[bt](vn(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, l) {
    e[bt] = Yt(l), t !== n && (e.checked = Qt(t, l.props.value));
  }
}, mt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, l) {
    const o = wn(t);
    Ft(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? ws(vn(c)) : vn(c)
      );
      e[bt](
        e.multiple ? o ? new Set(r) : r : r[0]
      ), e._assigning = !0, As(() => {
        e._assigning = !1;
      });
    }), e[bt] = Yt(l);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    La(e, t);
  },
  beforeUpdate(e, t, n) {
    e[bt] = Yt(n);
  },
  updated(e, { value: t }) {
    e._assigning || La(e, t);
  }
};
function La(e, t) {
  const n = e.multiple, l = ye(t);
  if (!(n && !l && !wn(t))) {
    for (let o = 0, r = e.options.length; o < r; o++) {
      const c = e.options[o], u = vn(c);
      if (n)
        if (l) {
          const d = typeof u;
          d === "string" || d === "number" ? c.selected = t.some((f) => String(f) === String(u)) : c.selected = Rl(t, u) > -1;
        } else
          c.selected = t.has(u);
      else if (Qt(vn(c), t)) {
        e.selectedIndex !== o && (e.selectedIndex = o);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function vn(e) {
  return "_value" in e ? e._value : e.value;
}
function Li(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Ru = {
  created(e, t, n) {
    ts(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    ts(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, l) {
    ts(e, t, n, l, "beforeUpdate");
  },
  updated(e, t, n, l) {
    ts(e, t, n, l, "updated");
  }
};
function xu(e, t) {
  switch (e) {
    case "SELECT":
      return mt;
    case "TEXTAREA":
      return xe;
    default:
      switch (t) {
        case "checkbox":
          return Gt;
        case "radio":
          return Au;
        default:
          return xe;
      }
  }
}
function ts(e, t, n, l, o) {
  const c = xu(
    e.tagName,
    n.props && n.props.type
  )[o];
  c && c(e, t, n, l);
}
const Pu = ["ctrl", "shift", "alt", "meta"], Tu = {
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
  exact: (e, t) => Pu.some((n) => e[`${n}Key`] && !t.includes(n))
}, kn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), l = t.join(".");
  return n[l] || (n[l] = (o, ...r) => {
    for (let c = 0; c < t.length; c++) {
      const u = Tu[t[c]];
      if (u && u(o, t)) return;
    }
    return e(o, ...r);
  });
}, Eu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Du = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), l = t.join(".");
  return n[l] || (n[l] = (o) => {
    if (!("key" in o))
      return;
    const r = Zt(o.key);
    if (t.some(
      (c) => c === r || Eu[c] === r
    ))
      return e(o);
  });
}, Mu = /* @__PURE__ */ Ze({ patchProp: ku }, iu);
let Na;
function Iu() {
  return Na || (Na = Gc(Mu));
}
const Ou = (...e) => {
  const t = Iu().createApp(...e), { mount: n } = t;
  return t.mount = (l) => {
    const o = Nu(l);
    if (!o) return;
    const r = t._component;
    !we(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const c = n(o, !1, Lu(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), c;
  }, t;
};
function Lu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Nu(e) {
  return Ke(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Ni;
const Es = (e) => Ni = e, Ui = (
  /* istanbul ignore next */
  Symbol()
);
function dl(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var On;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(On || (On = {}));
function Uu() {
  const e = Io(!0), t = e.run(() => /* @__PURE__ */ F({}));
  let n = [], l = [];
  const o = Il({
    install(r) {
      Es(o), o._a = r, r.provide(Ui, o), r.config.globalProperties.$pinia = o, l.forEach((c) => n.push(c)), l = [];
    },
    use(r) {
      return this._a ? n.push(r) : l.push(r), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return o;
}
const Fi = () => {
};
function Ua(e, t, n, l = Fi) {
  e.push(t);
  const o = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), l());
  };
  return !n && Oo() && _r(o), o;
}
function rn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Fu = (e) => e(), Fa = Symbol(), Ks = Symbol();
function fl(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, l) => e.set(l, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const l = t[n], o = e[n];
    dl(o) && dl(l) && e.hasOwnProperty(n) && !/* @__PURE__ */ Be(l) && !/* @__PURE__ */ Tt(l) ? e[n] = fl(o, l) : e[n] = l;
  }
  return e;
}
const Gu = (
  /* istanbul ignore next */
  Symbol()
);
function Bu(e) {
  return !dl(e) || !e.hasOwnProperty(Gu);
}
const { assign: Kt } = Object;
function Vu(e) {
  return !!(/* @__PURE__ */ Be(e) && e.effect);
}
function ju(e, t, n, l) {
  const { state: o, actions: r, getters: c } = t, u = n.state.value[e];
  let d;
  function f() {
    u || (n.state.value[e] = o ? o() : {});
    const p = /* @__PURE__ */ jr(n.state.value[e]);
    return Kt(p, r, Object.keys(c || {}).reduce((h, v) => (h[v] = Il(D(() => {
      Es(n);
      const b = n._s.get(e);
      return c[v].call(b, b);
    })), h), {}));
  }
  return d = Gi(e, f, t, n, l, !0), d;
}
function Gi(e, t, n = {}, l, o, r) {
  let c;
  const u = Kt({ actions: {} }, n), d = { deep: !0 };
  let f, p, h = [], v = [], b;
  const C = l.state.value[e];
  !r && !C && (l.state.value[e] = {});
  let E;
  function R(x) {
    let S;
    f = p = !1, typeof x == "function" ? (x(l.state.value[e]), S = {
      type: On.patchFunction,
      storeId: e,
      events: b
    }) : (fl(l.state.value[e], x), S = {
      type: On.patchObject,
      payload: x,
      storeId: e,
      events: b
    });
    const z = E = Symbol();
    As().then(() => {
      E === z && (f = !0);
    }), p = !0, rn(h, S, l.state.value[e]);
  }
  const P = r ? function() {
    const { state: S } = n, z = S ? S() : {};
    this.$patch((ue) => {
      Kt(ue, z);
    });
  } : (
    /* istanbul ignore next */
    Fi
  );
  function $() {
    c.stop(), h = [], v = [], l._s.delete(e);
  }
  const T = (x, S = "") => {
    if (Fa in x)
      return x[Ks] = S, x;
    const z = function() {
      Es(l);
      const ue = Array.from(arguments), de = [], le = [];
      function Z(ge) {
        de.push(ge);
      }
      function Ue(ge) {
        le.push(ge);
      }
      rn(v, {
        args: ue,
        name: z[Ks],
        store: I,
        after: Z,
        onError: Ue
      });
      let pe;
      try {
        pe = x.apply(this && this.$id === e ? this : I, ue);
      } catch (ge) {
        throw rn(le, ge), ge;
      }
      return pe instanceof Promise ? pe.then((ge) => (rn(de, ge), ge)).catch((ge) => (rn(le, ge), Promise.reject(ge))) : (rn(de, pe), pe);
    };
    return z[Fa] = !0, z[Ks] = S, z;
  }, U = {
    _p: l,
    // _s: scope,
    $id: e,
    $onAction: Ua.bind(null, v),
    $patch: R,
    $reset: P,
    $subscribe(x, S = {}) {
      const z = Ua(h, x, S.detached, () => ue()), ue = c.run(() => Te(() => l.state.value[e], (de) => {
        (S.flush === "sync" ? p : f) && x({
          storeId: e,
          type: On.direct,
          events: b
        }, de);
      }, Kt({}, d, S)));
      return z;
    },
    $dispose: $
  }, I = /* @__PURE__ */ pt(U);
  l._s.set(e, I);
  const _ = (l._a && l._a.runWithContext || Fu)(() => l._e.run(() => (c = Io()).run(() => t({ action: T }))));
  for (const x in _) {
    const S = _[x];
    if (/* @__PURE__ */ Be(S) && !Vu(S) || /* @__PURE__ */ Tt(S))
      r || (C && Bu(S) && (/* @__PURE__ */ Be(S) ? S.value = C[x] : fl(S, C[x])), l.state.value[e][x] = S);
    else if (typeof S == "function") {
      const z = T(S, x);
      _[x] = z, u.actions[x] = S;
    }
  }
  return Kt(I, _), Kt(/* @__PURE__ */ Pe(I), _), Object.defineProperty(I, "$state", {
    get: () => l.state.value[e],
    set: (x) => {
      R((S) => {
        Kt(S, x);
      });
    }
  }), l._p.forEach((x) => {
    Kt(I, c.run(() => x({
      store: I,
      app: l._a,
      pinia: l,
      options: u
    })));
  }), C && r && n.hydrate && n.hydrate(I.$state, C), f = !0, p = !0, I;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Jn(e, t, n) {
  let l, o;
  const r = typeof t == "function";
  typeof e == "string" ? (l = e, o = r ? n : t) : (o = e, l = e.id);
  function c(u, d) {
    const f = ec();
    return u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    u || (f ? gt(Ui, null) : null), u && Es(u), u = Ni, u._s.has(l) || (r ? Gi(l, t, o, u) : ju(l, o, u)), u._s.get(l);
  }
  return c.$id = l, c;
}
function Bi(e) {
  {
    const t = /* @__PURE__ */ Pe(e), n = {};
    for (const l in t) {
      const o = t[l];
      o.effect ? n[l] = // ...
      D({
        get: () => e[l],
        set(r) {
          e[l] = r;
        }
      }) : (/* @__PURE__ */ Be(o) || /* @__PURE__ */ Tt(o)) && (n[l] = // ---
      /* @__PURE__ */ Hr(e, l));
    }
    return n;
  }
}
const jl = "openclaw-guard.auth-token", pl = "openclaw-guard:unauthorized";
function Vi() {
  return typeof window > "u" ? null : window.localStorage.getItem(jl);
}
function zu(e) {
  typeof window > "u" || window.localStorage.setItem(jl, e);
}
function ji() {
  typeof window > "u" || window.localStorage.removeItem(jl);
}
function Wu() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(pl));
}
function Hu(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(pl, e), () => window.removeEventListener(pl, e));
}
const zl = "openclaw-guard.desktop.api-base-url", hl = "http://127.0.0.1:18088", Ku = "https://qingmiao-tech.github.io/openclaw-guard/getting-started";
function Wl(e) {
  return /^https?:\/\//i.test(e);
}
function qu(e) {
  return e.replace(/\/+$/, "");
}
function Ju(e) {
  return Wl(e) || typeof window > "u" ? e : new URL(e, window.location.href).toString();
}
function Qu() {
  var t;
  if (typeof window > "u")
    return null;
  const e = (t = window.__TAURI_INTERNALS__) == null ? void 0 : t.invoke;
  return typeof e == "function" ? e : null;
}
function Hl() {
  return typeof window > "u" ? { mode: "web" } : window.__OPENCLAW_GUARD_RUNTIME__ || { mode: "web" };
}
function Kl() {
  return Hl().mode === "desktop" ? "desktop" : "web";
}
function gl() {
  const e = Hl().defaultApiBaseUrl;
  if (!e)
    return hl;
  try {
    return Qn(e);
  } catch {
    return hl;
  }
}
function Ga() {
  return Hl().docsUrl || Ku;
}
function Qn(e) {
  const t = e.trim();
  if (!t)
    return hl;
  const n = Wl(t) ? t : `http://${t}`;
  let l;
  try {
    l = new URL(n);
  } catch {
    throw new Error("请输入有效的 http(s) 地址，例如 127.0.0.1:18088。");
  }
  if (l.protocol !== "http:" && l.protocol !== "https:")
    throw new Error("目前只支持 http(s) 地址。");
  return l.hash = "", l.search = "", qu(l.toString());
}
function zi() {
  if (typeof window > "u")
    return null;
  const e = window.localStorage.getItem(zl);
  if (!e)
    return null;
  try {
    return Qn(e);
  } catch {
    return null;
  }
}
function Yu(e) {
  typeof window > "u" || window.localStorage.setItem(zl, Qn(e));
}
function Zu() {
  typeof window > "u" || window.localStorage.removeItem(zl);
}
function Xu(e) {
  return Qn(
    e || zi() || gl()
  );
}
function ql(e, t) {
  if (Wl(e))
    return e;
  const n = e.startsWith("/") ? e : `/${e}`;
  if (Kl() !== "desktop" && !t)
    return n;
  const l = Xu(t);
  return new URL(n, `${l}/`).toString();
}
function Wi(e, t) {
  return ql(e, t);
}
async function ed(e) {
  const t = Ju(e);
  if (Kl() === "desktop") {
    const l = Qu();
    if (l) {
      await l("open_external_url", { url: t });
      return;
    }
  }
  if (typeof window > "u")
    return;
  window.open(t, "_blank", "noopener,noreferrer") || window.location.assign(t);
}
async function td(e) {
  if ((e.headers.get("content-type") || "").includes("application/json"))
    try {
      const l = await e.json();
      return l.message || l.error || `Request failed with ${e.status}`;
    } catch {
      return `Request failed with ${e.status}`;
    }
  return await e.text() || `Request failed with ${e.status}`;
}
async function Jl(e, t = {}) {
  const n = new Headers(t.headers);
  n.set("Accept", "application/json");
  let l = !1;
  if (!n.has("Authorization")) {
    const c = Vi();
    c && (n.set("Authorization", `Bearer ${c}`), l = !0);
  }
  let o = t.body;
  o && typeof o == "object" && !(o instanceof FormData) && !(o instanceof URLSearchParams) && !(o instanceof Blob) && (n.set("Content-Type", "application/json"), o = JSON.stringify(o));
  const r = await fetch(Wi(e), {
    ...t,
    headers: n,
    body: o
  });
  if (!r.ok)
    throw r.status === 401 && l && (ji(), Wu()), new Error(await td(r));
  return r.json();
}
function Ee(e) {
  return Jl(e);
}
function Oe(e, t) {
  return Jl(e, {
    method: "POST",
    body: t
  });
}
function Ql(e) {
  return Jl(e, {
    method: "DELETE"
  });
}
async function nd() {
  return Ee("/api/auth/status");
}
async function sd() {
  return Ee("/api/info");
}
async function ld(e) {
  return Oe("/api/auth/login", { password: e });
}
async function ad() {
  return Oe("/api/auth/logout", {});
}
async function od(e, t) {
  return Oe("/api/auth/change-password", {
    currentPassword: e,
    newPassword: t
  });
}
const Ds = /* @__PURE__ */ Jn("auth", () => {
  const e = /* @__PURE__ */ F(!1), t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!0), l = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F("openclaw-guard auth show-password"), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(!1), f = D(() => e.value && n.value && !u.value);
  function p() {
    ji(), u.value = !1, d.value = !1;
  }
  async function h() {
    if (!(t.value || e.value)) {
      t.value = !0;
      try {
        const $ = await nd();
        if (n.value = $.enabled, l.value = $.configured, o.value = $.initialPasswordAvailable, r.value = $.initialPasswordCreatedAt, c.value = $.revealCommand || c.value, !$.enabled) {
          u.value = !0;
          return;
        }
        if (!Vi()) {
          p();
          return;
        }
        try {
          await sd(), u.value = !0;
        } catch {
          p();
        }
      } finally {
        e.value = !0, t.value = !1;
      }
    }
  }
  async function v($) {
    const T = await ld($);
    return T.token && (zu(T.token), u.value = !0), T;
  }
  async function b() {
    try {
      await ad();
    } catch {
    } finally {
      p();
    }
  }
  async function C($, T) {
    const U = await od($, T);
    if (!U.success)
      throw new Error(U.error || "Password update failed");
    return p(), U;
  }
  function E() {
    d.value = !0;
  }
  function R() {
    d.value = !1;
  }
  function P() {
    n.value && p();
  }
  return {
    ready: e,
    bootstrapping: t,
    authEnabled: n,
    configured: l,
    initialPasswordAvailable: o,
    initialPasswordCreatedAt: r,
    revealCommand: c,
    authenticated: u,
    requiresLogin: f,
    changePasswordOpen: d,
    hydrate: h,
    login: v,
    logout: b,
    changePassword: C,
    openChangePassword: E,
    closeChangePassword: R,
    handleUnauthorized: P
  };
});
let id = 0;
const it = /* @__PURE__ */ Jn("feedback", () => {
  const e = /* @__PURE__ */ F([]), t = /* @__PURE__ */ F(null);
  let n = null;
  function l(u) {
    const d = {
      id: ++id,
      title: u.title,
      message: u.message,
      tone: u.tone || "info"
    };
    e.value.push(d);
    const f = typeof u.durationMs == "number" ? u.durationMs : 3600;
    return typeof window < "u" && f > 0 && window.setTimeout(() => o(d.id), f), d.id;
  }
  function o(u) {
    e.value = e.value.filter((d) => d.id !== u);
  }
  function r(u) {
    return n && (n(!1), n = null), t.value = {
      title: u.title,
      message: u.message,
      confirmLabel: u.confirmLabel || "Confirm",
      cancelLabel: u.cancelLabel || "Cancel",
      tone: u.tone || "default"
    }, new Promise((d) => {
      n = d;
    });
  }
  function c(u) {
    const d = n;
    n = null, t.value = null, d == null || d(u);
  }
  return {
    toasts: e,
    confirmRequest: t,
    pushToast: l,
    dismissToast: o,
    confirm: r,
    resolveConfirm: c
  };
}), Ba = "openclaw-guard.theme", Va = "openclaw-guard.lang", ja = "openclaw-guard.developer-mode";
function rd() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const Ce = /* @__PURE__ */ Jn("ui", () => {
  const e = /* @__PURE__ */ F("auto"), t = /* @__PURE__ */ F("zh"), n = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F(!1), o = D(() => e.value === "auto" ? rd() : e.value);
  function r() {
    typeof document > "u" || (document.documentElement.dataset.theme = o.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en", document.documentElement.dataset.developerMode = n.value ? "on" : "off");
  }
  function c() {
    if (l.value || typeof window > "u") {
      r();
      return;
    }
    const h = window.localStorage.getItem(Ba), v = window.localStorage.getItem(Va), b = window.localStorage.getItem(ja);
    (h === "auto" || h === "light" || h === "dark") && (e.value = h), (v === "zh" || v === "en") && (t.value = v), n.value = b === "1", l.value = !0, r();
  }
  function u(h) {
    e.value = h, typeof window < "u" && window.localStorage.setItem(Ba, h), r();
  }
  function d(h) {
    t.value = h, typeof window < "u" && window.localStorage.setItem(Va, h), r();
  }
  function f(h) {
    n.value = h, typeof window < "u" && window.localStorage.setItem(ja, h ? "1" : "0"), r();
  }
  function p(h, v) {
    return t.value === "zh" ? h : v;
  }
  return {
    themePreference: e,
    language: t,
    developerMode: n,
    resolvedTheme: o,
    hydrate: c,
    setThemePreference: u,
    setLanguage: d,
    setDeveloperMode: f,
    applyDocumentState: r,
    label: p
  };
}), cd = { class: "confirm-dialog auth-dialog" }, ud = { class: "confirm-dialog__header" }, dd = { class: "page-card__eyebrow" }, fd = { class: "page-card__title" }, pd = { class: "auth-dialog__body" }, hd = { class: "field-stack" }, gd = { class: "field-stack" }, md = { class: "field-stack" }, bd = { class: "login-note" }, vd = {
  key: 0,
  class: "login-error"
}, yd = { class: "confirm-dialog__footer" }, _d = ["disabled"], wd = /* @__PURE__ */ $e({
  __name: "ChangePasswordDialog",
  setup(e) {
    const t = Ce(), n = Ds(), l = it(), o = /* @__PURE__ */ F(""), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F("");
    function f() {
      o.value = "", r.value = "", c.value = "", d.value = "", u.value = !1;
    }
    function p() {
      f(), n.closeChangePassword();
    }
    async function h() {
      if (!o.value || !r.value) {
        d.value = t.label("请先填写当前密码和新密码。", "Enter the current password and the new password first.");
        return;
      }
      if (r.value.length < 6) {
        d.value = t.label("新密码至少需要 6 位。", "The new password must be at least 6 characters long.");
        return;
      }
      if (r.value !== c.value) {
        d.value = t.label("两次输入的新密码不一致。", "The new passwords do not match.");
        return;
      }
      u.value = !0, d.value = "";
      try {
        await n.changePassword(o.value, r.value), p(), l.pushToast({
          tone: "success",
          title: t.label("密码已更新", "Password updated"),
          message: t.label("当前会话已失效，请使用新密码重新登录。", "The current session has been cleared. Sign in again with the new password.")
        });
      } catch (v) {
        d.value = v instanceof Error ? v.message : String(v), u.value = !1;
      }
    }
    return (v, b) => s(n).changePasswordOpen ? (g(), m("div", {
      key: 0,
      class: "confirm-backdrop",
      onClick: kn(p, ["self"])
    }, [
      a("section", cd, [
        a("header", ud, [
          a("p", dd, i(s(t).label("账号安全", "Account security")), 1),
          a("h2", fd, i(s(t).label("修改访问密码", "Change access password")), 1)
        ]),
        a("div", pd, [
          a("label", hd, [
            a("span", null, i(s(t).label("当前密码", "Current password")), 1),
            be(a("input", {
              "onUpdate:modelValue": b[0] || (b[0] = (C) => o.value = C),
              class: "input-field",
              type: "password",
              autocomplete: "current-password"
            }, null, 512), [
              [xe, o.value]
            ])
          ]),
          a("label", gd, [
            a("span", null, i(s(t).label("新密码", "New password")), 1),
            be(a("input", {
              "onUpdate:modelValue": b[1] || (b[1] = (C) => r.value = C),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [xe, r.value]
            ])
          ]),
          a("label", md, [
            a("span", null, i(s(t).label("确认新密码", "Confirm new password")), 1),
            be(a("input", {
              "onUpdate:modelValue": b[2] || (b[2] = (C) => c.value = C),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [xe, c.value]
            ])
          ]),
          a("p", bd, i(s(t).label("修改成功后，Guard 会自动让当前登录会话失效，防止旧凭证继续可用。", "After the password changes, Guard automatically invalidates the current session so the old credential cannot keep running.")), 1),
          d.value ? (g(), m("p", vd, i(d.value), 1)) : J("", !0)
        ]),
        a("footer", yd, [
          a("button", {
            class: "inline-link",
            type: "button",
            onClick: p
          }, i(s(t).label("取消", "Cancel")), 1),
          a("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: u.value,
            onClick: h
          }, i(u.value ? s(t).label("更新中…", "Updating…") : s(t).label("确认修改", "Update password")), 9, _d)
        ])
      ])
    ])) : J("", !0);
  }
}), kd = 4e3;
async function $d(e) {
  const t = new AbortController(), n = setTimeout(() => t.abort(), kd);
  try {
    const l = await fetch(Wi("/api/auth/status", e), {
      headers: {
        Accept: "application/json"
      },
      signal: t.signal
    });
    if (!l.ok)
      throw new Error(`Guard 返回了 HTTP ${l.status}。`);
  } catch (l) {
    throw l instanceof Error && l.name === "AbortError" ? new Error("连接超时，请确认本地 Guard 已启动并可访问。") : l;
  } finally {
    clearTimeout(n);
  }
}
const Yn = /* @__PURE__ */ Jn("runtime", () => {
  const e = /* @__PURE__ */ F(!1), t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F("web"), o = /* @__PURE__ */ F(gl()), r = /* @__PURE__ */ F(o.value), c = /* @__PURE__ */ F(!0), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F(Ga()), f = /* @__PURE__ */ F(null), p = D(() => l.value === "desktop"), h = D(() => !p.value || c.value), v = D(() => p.value && !c.value);
  function b(T, U = {}) {
    const I = Qn(T || o.value);
    return r.value = I, p.value && U.persist !== !1 && Yu(I), I;
  }
  function C() {
    r.value = o.value, p.value && Zu();
  }
  function E(T) {
    return ql(T, p.value ? r.value : void 0);
  }
  async function R() {
    await ed(d.value);
  }
  async function P() {
    if (!p.value)
      return c.value = !0, u.value = "", f.value = (/* @__PURE__ */ new Date()).toISOString(), e.value = !0, t.value = !1, !0;
    n.value = !0;
    try {
      const T = b(r.value);
      return await $d(T), c.value = !0, u.value = "", f.value = (/* @__PURE__ */ new Date()).toISOString(), !0;
    } catch (T) {
      return c.value = !1, u.value = T instanceof Error ? T.message : String(T), f.value = (/* @__PURE__ */ new Date()).toISOString(), !1;
    } finally {
      n.value = !1, e.value = !0, t.value = !1;
    }
  }
  async function $() {
    if (!(t.value || e.value)) {
      if (t.value = !0, l.value = Kl(), o.value = gl(), d.value = Ga(), r.value = zi() || o.value, !p.value) {
        c.value = !0, u.value = "", f.value = (/* @__PURE__ */ new Date()).toISOString(), e.value = !0, t.value = !1;
        return;
      }
      await P();
    }
  }
  return {
    ready: e,
    hydrating: t,
    checking: n,
    mode: l,
    defaultApiBaseUrl: o,
    apiBaseUrl: r,
    connected: c,
    connectionError: u,
    docsUrl: d,
    lastCheckedAt: f,
    isDesktop: p,
    canUseApi: h,
    requiresConnection: v,
    hydrate: $,
    probeConnection: P,
    setApiBaseUrl: b,
    resetApiBaseUrl: C,
    resolveUrl: E,
    openSupportDocs: R
  };
}), Cd = { class: "login-screen" }, Sd = { class: "login-card" }, Ad = { class: "login-card__brand" }, Rd = ["src"], xd = { class: "brand-lockup__eyebrow" }, Pd = { class: "login-card__copy" }, Td = { class: "page-card__eyebrow" }, Ed = { class: "page-card__title" }, Dd = { class: "muted-copy" }, Md = {
  key: 0,
  class: "muted-copy"
}, Id = { class: "field-stack" }, Od = ["placeholder"], Ld = { class: "login-note" }, Nd = {
  key: 0,
  class: "login-command"
}, Ud = {
  key: 1,
  class: "login-error"
}, Fd = ["disabled"], Gd = /* @__PURE__ */ $e({
  __name: "LoginPage",
  setup(e) {
    const t = Ce(), n = Ds(), l = Yn(), o = D(() => l.resolveUrl("/ui/logo.png")), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(""), d = D(() => n.initialPasswordAvailable ? t.label(
      "如果你忘了当前密码，可以在同一台机器的本地终端重新回看。",
      "If you forget the current password, you can reveal it again from a local terminal on the same machine."
    ) : t.label(
      "如果这是较早版本初始化的环境，密码回看记录可能已经不存在；这时请直接使用你当前设置过的密码。",
      "If this environment was initialized by an older version, the password reveal record may no longer exist. In that case, use the current password you already set."
    ));
    async function f() {
      if (!r.value.trim()) {
        u.value = t.label("请输入访问密码。", "Enter the access password.");
        return;
      }
      c.value = !0, u.value = "";
      try {
        await n.login(r.value.trim()), r.value = "";
      } catch (p) {
        u.value = p instanceof Error ? p.message : String(p);
      } finally {
        c.value = !1;
      }
    }
    return (p, h) => (g(), m("div", Cd, [
      a("section", Sd, [
        a("div", Ad, [
          a("img", {
            class: "login-card__logo",
            src: o.value,
            alt: "OpenClaw Guard"
          }, null, 8, Rd),
          a("div", null, [
            a("p", xd, i(s(t).label("安全控制台", "Security console")), 1),
            h[1] || (h[1] = a("h1", { class: "brand-lockup__title" }, "OpenClaw Guard", -1))
          ])
        ]),
        a("div", Pd, [
          a("p", Td, i(s(t).label("安全登录", "Secure sign-in")), 1),
          a("h2", Ed, i(s(t).label("输入本机访问密码", "Enter the local access password")), 1),
          a("p", Dd, i(s(t).label(
            "登录后即可进入当前默认控制台。主题、语言、开发者模式等本地偏好会继续保留。",
            "Sign in to enter the default Guard console. Theme, language, and developer-mode preferences stay local to this device."
          )), 1),
          s(l).isDesktop ? (g(), m("p", Md, [
            ft(i(s(t).label("当前连接地址：", "Current target: ")), 1),
            a("code", null, i(s(l).apiBaseUrl), 1)
          ])) : J("", !0)
        ]),
        a("form", {
          class: "login-form",
          onSubmit: kn(f, ["prevent"])
        }, [
          a("label", Id, [
            a("span", null, i(s(t).label("访问密码", "Access password")), 1),
            be(a("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (v) => r.value = v),
              class: "input-field",
              type: "password",
              autocomplete: "current-password",
              placeholder: s(t).label("请输入 Guard 登录密码", "Enter the Guard password")
            }, null, 8, Od), [
              [xe, r.value]
            ])
          ]),
          a("p", Ld, i(d.value), 1),
          s(n).initialPasswordAvailable ? (g(), m("div", Nd, [
            a("span", null, i(s(t).label("回看命令", "Reveal command")), 1),
            a("code", null, i(s(n).revealCommand), 1)
          ])) : J("", !0),
          u.value ? (g(), m("p", Ud, i(u.value), 1)) : J("", !0),
          a("button", {
            class: "inline-link inline-link--primary login-submit",
            type: "submit",
            disabled: c.value
          }, i(c.value ? s(t).label("登录中…", "Signing in…") : s(t).label("进入控制台", "Open console")), 9, Fd)
        ], 32)
      ])
    ]));
  }
}), Bd = { class: "confirm-dialog__header" }, Vd = { class: "page-card__title" }, jd = { class: "confirm-dialog__body" }, zd = { class: "confirm-dialog__footer" }, Wd = /* @__PURE__ */ $e({
  __name: "ConfirmDialog",
  setup(e) {
    const t = it(), { confirmRequest: n } = Bi(t), l = D(() => !!n.value);
    return (o, r) => {
      var c, u, d, f, p, h;
      return l.value ? (g(), m("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = kn((v) => s(t).resolveConfirm(!1), ["self"]))
      }, [
        a("section", {
          class: re(["confirm-dialog", { "confirm-dialog--danger": ((c = s(n)) == null ? void 0 : c.tone) === "danger" }])
        }, [
          a("header", Bd, [
            r[3] || (r[3] = a("p", { class: "page-card__eyebrow" }, "Confirm", -1)),
            a("h2", Vd, i((u = s(n)) == null ? void 0 : u.title), 1)
          ]),
          a("p", jd, i((d = s(n)) == null ? void 0 : d.message), 1),
          a("footer", zd, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (v) => s(t).resolveConfirm(!1))
            }, i((f = s(n)) == null ? void 0 : f.cancelLabel), 1),
            a("button", {
              class: re(["inline-link", { "inline-link--danger": ((p = s(n)) == null ? void 0 : p.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (v) => s(t).resolveConfirm(!0))
            }, i((h = s(n)) == null ? void 0 : h.confirmLabel), 3)
          ])
        ], 2)
      ])) : J("", !0);
    };
  }
}), Hd = {
  class: "toast-viewport",
  "aria-live": "polite",
  "aria-atomic": "true"
}, Kd = { class: "toast-card__content" }, qd = { key: 0 }, Jd = ["onClick"], Qd = /* @__PURE__ */ $e({
  __name: "ToastViewport",
  setup(e) {
    const t = it(), { toasts: n } = Bi(t);
    return (l, o) => (g(), m("div", Hd, [
      (g(!0), m(j, null, fe(s(n), (r) => (g(), m("article", {
        key: r.id,
        class: re(["toast-card", `toast-card--${r.tone}`])
      }, [
        a("div", Kd, [
          r.title ? (g(), m("strong", qd, i(r.title), 1)) : J("", !0),
          a("p", null, i(r.message), 1)
        ]),
        a("button", {
          class: "toast-card__close",
          type: "button",
          onClick: (c) => s(t).dismissToast(r.id)
        }, " × ", 8, Jd)
      ], 2))), 128))
    ]));
  }
}), Yd = { class: "login-screen" }, Zd = { class: "login-card desktop-connection-card" }, Xd = { class: "login-card__copy" }, ef = { class: "page-card__eyebrow" }, tf = { class: "page-card__title" }, nf = { class: "muted-copy" }, sf = { class: "login-command" }, lf = { class: "field-stack" }, af = ["placeholder"], of = { class: "page-inline-status" }, rf = { class: "pill pill--info" }, cf = {
  key: 0,
  class: "login-error"
}, uf = { class: "page-actions" }, df = ["disabled"], ff = ["disabled"], pf = ["disabled"], hf = {
  key: 1,
  class: "list-stack"
}, gf = { class: "status-banner status-banner--warning" }, mf = { class: "muted-copy" }, bf = { class: "page-card__header" }, vf = { class: "page-card__title" }, yf = { class: "page-card__body" }, _f = { class: "settings-note" }, wf = /* @__PURE__ */ $e({
  __name: "DesktopConnectionPage",
  setup(e) {
    const t = Ce(), n = Yn(), l = /* @__PURE__ */ F(n.apiBaseUrl), o = /* @__PURE__ */ F(""), r = /* @__PURE__ */ F(!1), c = D(() => n.lastCheckedAt ? new Date(n.lastCheckedAt).toLocaleString() : t.label("尚未检测", "Not checked yet")), u = D(() => [
      {
        platform: "Windows PowerShell",
        commands: [
          "openclaw-guard web --port 18088",
          "openclaw-guard web-background start --port 18088"
        ]
      },
      {
        platform: "macOS / Linux",
        commands: [
          "openclaw-guard web --port 18088",
          "openclaw-guard web-background start --port 18088"
        ]
      }
    ]);
    Te(
      () => n.apiBaseUrl,
      (v) => {
        l.value = v;
      }
    );
    async function d() {
      o.value = "", await n.probeConnection();
    }
    async function f() {
      o.value = "";
      try {
        n.setApiBaseUrl(l.value), await n.probeConnection();
      } catch (v) {
        o.value = v instanceof Error ? v.message : String(v);
      }
    }
    function p() {
      o.value = "", n.resetApiBaseUrl(), l.value = n.defaultApiBaseUrl;
    }
    async function h() {
      o.value = "";
      try {
        await n.openSupportDocs();
      } catch (v) {
        o.value = v instanceof Error ? v.message : String(v);
      }
    }
    return (v, b) => (g(), m("div", Yd, [
      a("section", Zd, [
        a("div", Xd, [
          a("p", ef, i(s(t).label("桌面预览 / Desktop", "Desktop preview / Thin shell")), 1),
          a("h1", tf, i(s(t).label("连接本地 Guard", "Connect to a local Guard instance")), 1),
          a("p", nf, i(s(t).label(
            "桌面壳本身不会代你启动后端，它只连接一个已经运行中的 Guard Web / Guard API。先确认本机 Guard 已启动，再回到这里重新检测。",
            "The desktop shell does not start Guard for you. It only connects to an already running Guard Web / Guard API on this machine."
          )), 1)
        ]),
        a("div", sf, [
          a("span", null, i(s(t).label("当前目标地址", "Current target address")), 1),
          a("code", null, i(s(n).apiBaseUrl), 1)
        ]),
        a("label", lf, [
          a("span", null, i(s(t).label("连接设置", "Connection settings")), 1),
          be(a("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (C) => l.value = C),
            class: "input-field",
            type: "text",
            spellcheck: "false",
            placeholder: s(n).defaultApiBaseUrl
          }, null, 8, af), [
            [xe, l.value]
          ])
        ]),
        a("div", of, [
          a("span", {
            class: re(["pill", s(n).connected ? "pill--success" : "pill--warning"])
          }, i(s(n).connected ? s(t).label("Guard 可连接", "Guard reachable") : s(t).label("暂时无法连接", "Guard unavailable")), 3),
          a("span", rf, i(s(t).label("最近检测", "Last checked")) + ": " + i(c.value), 1)
        ]),
        s(n).connectionError || o.value ? (g(), m("p", cf, i(o.value || s(n).connectionError), 1)) : J("", !0),
        a("div", uf, [
          a("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: s(n).checking,
            onClick: d
          }, i(s(n).checking ? s(t).label("检测中…", "Checking…") : s(t).label("重新检测", "Retry connection")), 9, df),
          a("button", {
            class: "inline-link",
            type: "button",
            disabled: s(n).checking,
            onClick: f
          }, i(s(t).label("保存并重试", "Save and retry")), 9, ff),
          a("button", {
            class: "inline-link",
            type: "button",
            disabled: s(n).checking,
            onClick: p
          }, i(s(t).label("恢复默认地址", "Reset to default")), 9, pf),
          a("button", {
            class: "inline-link",
            type: "button",
            onClick: b[1] || (b[1] = (C) => r.value = !r.value)
          }, i(r.value ? s(t).label("收起启动说明", "Hide startup guide") : s(t).label("查看启动说明", "Open startup guide")), 1)
        ]),
        r.value ? (g(), m("div", hf, [
          a("div", gf, [
            a("div", null, [
              a("strong", null, i(s(t).label("先启动 Guard，再回到桌面壳", "Start Guard first, then come back here")), 1),
              a("p", mf, i(s(t).label(
                "下面给的是最常用的本地启动命令。默认端口是 18088；如果你改过端口，这里的地址也要一起改。",
                "These are the most common local startup commands. The default port is 18088, so change both places if you use another port."
              )), 1)
            ])
          ]),
          (g(!0), m(j, null, fe(u.value, (C) => (g(), m("article", {
            key: C.platform,
            class: "page-card"
          }, [
            a("header", bf, [
              a("div", null, [
                b[2] || (b[2] = a("p", { class: "page-card__eyebrow" }, "Startup", -1)),
                a("h2", vf, i(C.platform), 1)
              ])
            ]),
            a("div", yf, [
              (g(!0), m(j, null, fe(C.commands, (E) => (g(), m("div", {
                key: E,
                class: "login-command"
              }, [
                a("span", null, i(s(t).label("推荐命令", "Suggested command")), 1),
                a("code", null, i(E), 1)
              ]))), 128))
            ])
          ]))), 128)),
          a("div", _f, [
            a("strong", null, i(s(t).label("文档站", "Documentation")), 1),
            a("span", null, [
              ft(i(s(t).label(
                "如果你需要完整的首次启动步骤、密码回看、更新和恢复说明，可以直接打开官方文档站。",
                "Open the official documentation if you need the full first-run, password recovery, update, or restore guide."
              )) + " ", 1),
              a("button", {
                class: "inline-link",
                type: "button",
                onClick: h
              }, i(s(t).label("查看文档", "Open docs")), 1)
            ])
          ])
        ])) : J("", !0)
      ])
    ]));
  }
});
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const dn = typeof document < "u";
function Hi(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function kf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && Hi(e.default);
}
const De = Object.assign;
function qs(e, t) {
  const n = {};
  for (const l in t) {
    const o = t[l];
    n[l] = wt(o) ? o.map(e) : e(o);
  }
  return n;
}
const Ln = () => {
}, wt = Array.isArray;
function za(e, t) {
  const n = {};
  for (const l in e) n[l] = l in t ? t[l] : e[l];
  return n;
}
const Ki = /#/g, $f = /&/g, Cf = /\//g, Sf = /=/g, Af = /\?/g, qi = /\+/g, Rf = /%5B/g, xf = /%5D/g, Ji = /%5E/g, Pf = /%60/g, Qi = /%7B/g, Tf = /%7C/g, Yi = /%7D/g, Ef = /%20/g;
function Yl(e) {
  return e == null ? "" : encodeURI("" + e).replace(Tf, "|").replace(Rf, "[").replace(xf, "]");
}
function Df(e) {
  return Yl(e).replace(Qi, "{").replace(Yi, "}").replace(Ji, "^");
}
function ml(e) {
  return Yl(e).replace(qi, "%2B").replace(Ef, "+").replace(Ki, "%23").replace($f, "%26").replace(Pf, "`").replace(Qi, "{").replace(Yi, "}").replace(Ji, "^");
}
function Mf(e) {
  return ml(e).replace(Sf, "%3D");
}
function If(e) {
  return Yl(e).replace(Ki, "%23").replace(Af, "%3F");
}
function Of(e) {
  return If(e).replace(Cf, "%2F");
}
function Wn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Lf = /\/$/, Nf = (e) => e.replace(Lf, "");
function Js(e, t, n = "/") {
  let l, o = {}, r = "", c = "";
  const u = t.indexOf("#");
  let d = t.indexOf("?");
  return d = u >= 0 && d > u ? -1 : d, d >= 0 && (l = t.slice(0, d), r = t.slice(d, u > 0 ? u : t.length), o = e(r.slice(1))), u >= 0 && (l = l || t.slice(0, u), c = t.slice(u, t.length)), l = Bf(l ?? t, n), {
    fullPath: l + r + c,
    path: l,
    query: o,
    hash: Wn(c)
  };
}
function Uf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Wa(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Ff(e, t, n) {
  const l = t.matched.length - 1, o = n.matched.length - 1;
  return l > -1 && l === o && yn(t.matched[l], n.matched[o]) && Zi(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function yn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Zi(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Gf(e[n], t[n])) return !1;
  return !0;
}
function Gf(e, t) {
  return wt(e) ? Ha(e, t) : wt(t) ? Ha(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function Ha(e, t) {
  return wt(t) ? e.length === t.length && e.every((n, l) => n === t[l]) : e.length === 1 && e[0] === t;
}
function Bf(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), l = e.split("/"), o = l[l.length - 1];
  (o === ".." || o === ".") && l.push("");
  let r = n.length - 1, c, u;
  for (c = 0; c < l.length; c++)
    if (u = l[c], u !== ".")
      if (u === "..")
        r > 1 && r--;
      else break;
  return n.slice(0, r).join("/") + "/" + l.slice(c).join("/");
}
const Ht = {
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
let bl = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), Qs = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function Vf(e) {
  if (!e) if (dn) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Nf(e);
}
const jf = /^[^#]+#/;
function zf(e, t) {
  return e.replace(jf, "#") + t;
}
function Wf(e, t) {
  const n = document.documentElement.getBoundingClientRect(), l = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: l.left - n.left - (t.left || 0),
    top: l.top - n.top - (t.top || 0)
  };
}
const Ms = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Hf(e) {
  let t;
  if ("el" in e) {
    const n = e.el, l = typeof n == "string" && n.startsWith("#"), o = typeof n == "string" ? l ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o)
      return;
    t = Wf(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Ka(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const vl = /* @__PURE__ */ new Map();
function Kf(e, t) {
  vl.set(e, t);
}
function qf(e) {
  const t = vl.get(e);
  return vl.delete(e), t;
}
function Jf(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Xi(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let We = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const er = Symbol("");
We.MATCHER_NOT_FOUND + "", We.NAVIGATION_GUARD_REDIRECT + "", We.NAVIGATION_ABORTED + "", We.NAVIGATION_CANCELLED + "", We.NAVIGATION_DUPLICATED + "";
function _n(e, t) {
  return De(/* @__PURE__ */ new Error(), {
    type: e,
    [er]: !0
  }, t);
}
function Mt(e, t) {
  return e instanceof Error && er in e && (t == null || !!(e.type & t));
}
const Qf = [
  "params",
  "query",
  "hash"
];
function Yf(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Qf) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Zf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let l = 0; l < n.length; ++l) {
    const o = n[l].replace(qi, " "), r = o.indexOf("="), c = Wn(r < 0 ? o : o.slice(0, r)), u = r < 0 ? null : Wn(o.slice(r + 1));
    if (c in t) {
      let d = t[c];
      wt(d) || (d = t[c] = [d]), d.push(u);
    } else t[c] = u;
  }
  return t;
}
function qa(e) {
  let t = "";
  for (let n in e) {
    const l = e[n];
    if (n = Mf(n), l == null) {
      l !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (wt(l) ? l.map((o) => o && ml(o)) : [l && ml(l)]).forEach((o) => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function Xf(e) {
  const t = {};
  for (const n in e) {
    const l = e[n];
    l !== void 0 && (t[n] = wt(l) ? l.map((o) => o == null ? null : "" + o) : l == null ? l : "" + l);
  }
  return t;
}
const tr = Symbol(""), Ja = Symbol(""), Is = Symbol(""), Zl = Symbol(""), yl = Symbol("");
function An() {
  let e = [];
  function t(l) {
    return e.push(l), () => {
      const o = e.indexOf(l);
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
function ep(e, t, n) {
  const l = () => {
    e[t].delete(n);
  };
  Fl(l), ci(l), ri(() => {
    e[t].add(n);
  }), e[t].add(n);
}
function tp(e) {
  const t = gt(tr, {}).value;
  t && ep(t, "leaveGuards", e);
}
function Jt(e, t, n, l, o, r = (c) => c()) {
  const c = l && (l.enterCallbacks[o] = l.enterCallbacks[o] || []);
  return () => new Promise((u, d) => {
    const f = (v) => {
      v === !1 ? d(_n(We.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : v instanceof Error ? d(v) : Jf(v) ? d(_n(We.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: v
      })) : (c && l.enterCallbacks[o] === c && typeof v == "function" && c.push(v), u());
    }, p = r(() => e.call(l && l.instances[o], t, n, f));
    let h = Promise.resolve(p);
    e.length < 3 && (h = h.then(f)), h.catch((v) => d(v));
  });
}
function Ys(e, t, n, l, o = (r) => r()) {
  const r = [];
  for (const c of e)
    for (const u in c.components) {
      let d = c.components[u];
      if (!(t !== "beforeRouteEnter" && !c.instances[u]))
        if (Hi(d)) {
          const f = (d.__vccOpts || d)[t];
          f && r.push(Jt(f, n, l, c, u, o));
        } else {
          let f = d();
          r.push(() => f.then((p) => {
            if (!p) throw new Error(`Couldn't resolve component "${u}" at "${c.path}"`);
            const h = kf(p) ? p.default : p;
            c.mods[u] = p, c.components[u] = h;
            const v = (h.__vccOpts || h)[t];
            return v && Jt(v, n, l, c, u, o)();
          }));
        }
    }
  return r;
}
function np(e, t) {
  const n = [], l = [], o = [], r = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < r; c++) {
    const u = t.matched[c];
    u && (e.matched.find((f) => yn(f, u)) ? l.push(u) : n.push(u));
    const d = e.matched[c];
    d && (t.matched.find((f) => yn(f, d)) || o.push(d));
  }
  return [
    n,
    l,
    o
  ];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let sp = () => location.protocol + "//" + location.host;
function nr(e, t) {
  const { pathname: n, search: l, hash: o } = t, r = e.indexOf("#");
  if (r > -1) {
    let c = o.includes(e.slice(r)) ? e.slice(r).length : 1, u = o.slice(c);
    return u[0] !== "/" && (u = "/" + u), Wa(u, "");
  }
  return Wa(n, e) + l + o;
}
function lp(e, t, n, l) {
  let o = [], r = [], c = null;
  const u = ({ state: v }) => {
    const b = nr(e, location), C = n.value, E = t.value;
    let R = 0;
    if (v) {
      if (n.value = b, t.value = v, c && c === C) {
        c = null;
        return;
      }
      R = E ? v.position - E.position : 0;
    } else l(b);
    o.forEach((P) => {
      P(n.value, C, {
        delta: R,
        type: bl.pop,
        direction: R ? R > 0 ? Qs.forward : Qs.back : Qs.unknown
      });
    });
  };
  function d() {
    c = n.value;
  }
  function f(v) {
    o.push(v);
    const b = () => {
      const C = o.indexOf(v);
      C > -1 && o.splice(C, 1);
    };
    return r.push(b), b;
  }
  function p() {
    if (document.visibilityState === "hidden") {
      const { history: v } = window;
      if (!v.state) return;
      v.replaceState(De({}, v.state, { scroll: Ms() }), "");
    }
  }
  function h() {
    for (const v of r) v();
    r = [], window.removeEventListener("popstate", u), window.removeEventListener("pagehide", p), document.removeEventListener("visibilitychange", p);
  }
  return window.addEventListener("popstate", u), window.addEventListener("pagehide", p), document.addEventListener("visibilitychange", p), {
    pauseListeners: d,
    listen: f,
    destroy: h
  };
}
function Qa(e, t, n, l = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: l,
    position: window.history.length,
    scroll: o ? Ms() : null
  };
}
function ap(e) {
  const { history: t, location: n } = window, l = { value: nr(e, n) }, o = { value: t.state };
  o.value || r(l.value, {
    back: null,
    current: l.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(d, f, p) {
    const h = e.indexOf("#"), v = h > -1 ? (n.host && document.querySelector("base") ? e : e.slice(h)) + d : sp() + e + d;
    try {
      t[p ? "replaceState" : "pushState"](f, "", v), o.value = f;
    } catch (b) {
      console.error(b), n[p ? "replace" : "assign"](v);
    }
  }
  function c(d, f) {
    r(d, De({}, t.state, Qa(o.value.back, d, o.value.forward, !0), f, { position: o.value.position }), !0), l.value = d;
  }
  function u(d, f) {
    const p = De({}, o.value, t.state, {
      forward: d,
      scroll: Ms()
    });
    r(p.current, p, !0), r(d, De({}, Qa(l.value, d, null), { position: p.position + 1 }, f), !1), l.value = d;
  }
  return {
    location: l,
    state: o,
    push: u,
    replace: c
  };
}
function op(e) {
  e = Vf(e);
  const t = ap(e), n = lp(e, t.state, t.location, t.replace);
  function l(r, c = !0) {
    c || n.pauseListeners(), history.go(r);
  }
  const o = De({
    location: "",
    base: e,
    go: l,
    createHref: zf.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function ip(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), op(e);
}
let sn = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var qe = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(qe || {});
const rp = {
  type: sn.Static,
  value: ""
}, cp = /[a-zA-Z0-9_]/;
function up(e) {
  if (!e) return [[]];
  if (e === "/") return [[rp]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(b) {
    throw new Error(`ERR (${n})/"${f}": ${b}`);
  }
  let n = qe.Static, l = n;
  const o = [];
  let r;
  function c() {
    r && o.push(r), r = [];
  }
  let u = 0, d, f = "", p = "";
  function h() {
    f && (n === qe.Static ? r.push({
      type: sn.Static,
      value: f
    }) : n === qe.Param || n === qe.ParamRegExp || n === qe.ParamRegExpEnd ? (r.length > 1 && (d === "*" || d === "+") && t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: sn.Param,
      value: f,
      regexp: p,
      repeatable: d === "*" || d === "+",
      optional: d === "*" || d === "?"
    })) : t("Invalid state to consume buffer"), f = "");
  }
  function v() {
    f += d;
  }
  for (; u < e.length; ) {
    if (d = e[u++], d === "\\" && n !== qe.ParamRegExp) {
      l = n, n = qe.EscapeNext;
      continue;
    }
    switch (n) {
      case qe.Static:
        d === "/" ? (f && h(), c()) : d === ":" ? (h(), n = qe.Param) : v();
        break;
      case qe.EscapeNext:
        v(), n = l;
        break;
      case qe.Param:
        d === "(" ? n = qe.ParamRegExp : cp.test(d) ? v() : (h(), n = qe.Static, d !== "*" && d !== "?" && d !== "+" && u--);
        break;
      case qe.ParamRegExp:
        d === ")" ? p[p.length - 1] == "\\" ? p = p.slice(0, -1) + d : n = qe.ParamRegExpEnd : p += d;
        break;
      case qe.ParamRegExpEnd:
        h(), n = qe.Static, d !== "*" && d !== "?" && d !== "+" && u--, p = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === qe.ParamRegExp && t(`Unfinished custom RegExp for param "${f}"`), h(), c(), o;
}
const Ya = "[^/]+?", dp = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var lt = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(lt || {});
const fp = /[.+*?^${}()[\]/\\]/g;
function pp(e, t) {
  const n = De({}, dp, t), l = [];
  let o = n.start ? "^" : "";
  const r = [];
  for (const f of e) {
    const p = f.length ? [] : [lt.Root];
    n.strict && !f.length && (o += "/");
    for (let h = 0; h < f.length; h++) {
      const v = f[h];
      let b = lt.Segment + (n.sensitive ? lt.BonusCaseSensitive : 0);
      if (v.type === sn.Static)
        h || (o += "/"), o += v.value.replace(fp, "\\$&"), b += lt.Static;
      else if (v.type === sn.Param) {
        const { value: C, repeatable: E, optional: R, regexp: P } = v;
        r.push({
          name: C,
          repeatable: E,
          optional: R
        });
        const $ = P || Ya;
        if ($ !== Ya) {
          b += lt.BonusCustomRegExp;
          try {
            `${$}`;
          } catch (U) {
            throw new Error(`Invalid custom RegExp for param "${C}" (${$}): ` + U.message);
          }
        }
        let T = E ? `((?:${$})(?:/(?:${$}))*)` : `(${$})`;
        h || (T = R && f.length < 2 ? `(?:/${T})` : "/" + T), R && (T += "?"), o += T, b += lt.Dynamic, R && (b += lt.BonusOptional), E && (b += lt.BonusRepeatable), $ === ".*" && (b += lt.BonusWildcard);
      }
      p.push(b);
    }
    l.push(p);
  }
  if (n.strict && n.end) {
    const f = l.length - 1;
    l[f][l[f].length - 1] += lt.BonusStrict;
  }
  n.strict || (o += "/?"), n.end ? o += "$" : n.strict && !o.endsWith("/") && (o += "(?:/|$)");
  const c = new RegExp(o, n.sensitive ? "" : "i");
  function u(f) {
    const p = f.match(c), h = {};
    if (!p) return null;
    for (let v = 1; v < p.length; v++) {
      const b = p[v] || "", C = r[v - 1];
      h[C.name] = b && C.repeatable ? b.split("/") : b;
    }
    return h;
  }
  function d(f) {
    let p = "", h = !1;
    for (const v of e) {
      (!h || !p.endsWith("/")) && (p += "/"), h = !1;
      for (const b of v) if (b.type === sn.Static) p += b.value;
      else if (b.type === sn.Param) {
        const { value: C, repeatable: E, optional: R } = b, P = C in f ? f[C] : "";
        if (wt(P) && !E) throw new Error(`Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`);
        const $ = wt(P) ? P.join("/") : P;
        if (!$) if (R)
          v.length < 2 && (p.endsWith("/") ? p = p.slice(0, -1) : h = !0);
        else throw new Error(`Missing required param "${C}"`);
        p += $;
      }
    }
    return p || "/";
  }
  return {
    re: c,
    score: l,
    keys: r,
    parse: u,
    stringify: d
  };
}
function hp(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const l = t[n] - e[n];
    if (l) return l;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === lt.Static + lt.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === lt.Static + lt.Segment ? 1 : -1 : 0;
}
function sr(e, t) {
  let n = 0;
  const l = e.score, o = t.score;
  for (; n < l.length && n < o.length; ) {
    const r = hp(l[n], o[n]);
    if (r) return r;
    n++;
  }
  if (Math.abs(o.length - l.length) === 1) {
    if (Za(l)) return 1;
    if (Za(o)) return -1;
  }
  return o.length - l.length;
}
function Za(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const gp = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function mp(e, t, n) {
  const l = pp(up(e.path), n), o = De(l, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function bp(e, t) {
  const n = [], l = /* @__PURE__ */ new Map();
  t = za(gp, t);
  function o(h) {
    return l.get(h);
  }
  function r(h, v, b) {
    const C = !b, E = eo(h);
    E.aliasOf = b && b.record;
    const R = za(t, h), P = [E];
    if ("alias" in h) {
      const U = typeof h.alias == "string" ? [h.alias] : h.alias;
      for (const I of U) P.push(eo(De({}, E, {
        components: b ? b.record.components : E.components,
        path: I,
        aliasOf: b ? b.record : E
      })));
    }
    let $, T;
    for (const U of P) {
      const { path: I } = U;
      if (v && I[0] !== "/") {
        const ee = v.record.path, _ = ee[ee.length - 1] === "/" ? "" : "/";
        U.path = v.record.path + (I && _ + I);
      }
      if ($ = mp(U, v, R), b ? b.alias.push($) : (T = T || $, T !== $ && T.alias.push($), C && h.name && !to($) && c(h.name)), lr($) && d($), E.children) {
        const ee = E.children;
        for (let _ = 0; _ < ee.length; _++) r(ee[_], $, b && b.children[_]);
      }
      b = b || $;
    }
    return T ? () => {
      c(T);
    } : Ln;
  }
  function c(h) {
    if (Xi(h)) {
      const v = l.get(h);
      v && (l.delete(h), n.splice(n.indexOf(v), 1), v.children.forEach(c), v.alias.forEach(c));
    } else {
      const v = n.indexOf(h);
      v > -1 && (n.splice(v, 1), h.record.name && l.delete(h.record.name), h.children.forEach(c), h.alias.forEach(c));
    }
  }
  function u() {
    return n;
  }
  function d(h) {
    const v = _p(h, n);
    n.splice(v, 0, h), h.record.name && !to(h) && l.set(h.record.name, h);
  }
  function f(h, v) {
    let b, C = {}, E, R;
    if ("name" in h && h.name) {
      if (b = l.get(h.name), !b) throw _n(We.MATCHER_NOT_FOUND, { location: h });
      R = b.record.name, C = De(Xa(v.params, b.keys.filter((T) => !T.optional).concat(b.parent ? b.parent.keys.filter((T) => T.optional) : []).map((T) => T.name)), h.params && Xa(h.params, b.keys.map((T) => T.name))), E = b.stringify(C);
    } else if (h.path != null)
      E = h.path, b = n.find((T) => T.re.test(E)), b && (C = b.parse(E), R = b.record.name);
    else {
      if (b = v.name ? l.get(v.name) : n.find((T) => T.re.test(v.path)), !b) throw _n(We.MATCHER_NOT_FOUND, {
        location: h,
        currentLocation: v
      });
      R = b.record.name, C = De({}, v.params, h.params), E = b.stringify(C);
    }
    const P = [];
    let $ = b;
    for (; $; )
      P.unshift($.record), $ = $.parent;
    return {
      name: R,
      path: E,
      params: C,
      matched: P,
      meta: yp(P)
    };
  }
  e.forEach((h) => r(h));
  function p() {
    n.length = 0, l.clear();
  }
  return {
    addRoute: r,
    resolve: f,
    removeRoute: c,
    clearRoutes: p,
    getRoutes: u,
    getRecordMatcher: o
  };
}
function Xa(e, t) {
  const n = {};
  for (const l of t) l in e && (n[l] = e[l]);
  return n;
}
function eo(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: vp(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function vp(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const l in e.components) t[l] = typeof n == "object" ? n[l] : n;
  return t;
}
function to(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function yp(e) {
  return e.reduce((t, n) => De(t, n.meta), {});
}
function _p(e, t) {
  let n = 0, l = t.length;
  for (; n !== l; ) {
    const r = n + l >> 1;
    sr(e, t[r]) < 0 ? l = r : n = r + 1;
  }
  const o = wp(e);
  return o && (l = t.lastIndexOf(o, l - 1)), l;
}
function wp(e) {
  let t = e;
  for (; t = t.parent; ) if (lr(t) && sr(e, t) === 0) return t;
}
function lr({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function no(e) {
  const t = gt(Is), n = gt(Zl), l = D(() => {
    const d = s(e.to);
    return t.resolve(d);
  }), o = D(() => {
    const { matched: d } = l.value, { length: f } = d, p = d[f - 1], h = n.matched;
    if (!p || !h.length) return -1;
    const v = h.findIndex(yn.bind(null, p));
    if (v > -1) return v;
    const b = so(d[f - 2]);
    return f > 1 && so(p) === b && h[h.length - 1].path !== b ? h.findIndex(yn.bind(null, d[f - 2])) : v;
  }), r = D(() => o.value > -1 && Sp(n.params, l.value.params)), c = D(() => o.value > -1 && o.value === n.matched.length - 1 && Zi(n.params, l.value.params));
  function u(d = {}) {
    if (Cp(d)) {
      const f = t[s(e.replace) ? "replace" : "push"](s(e.to)).catch(Ln);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => f), f;
    }
    return Promise.resolve();
  }
  return {
    route: l,
    href: D(() => l.value.href),
    isActive: r,
    isExactActive: c,
    navigate: u
  };
}
function kp(e) {
  return e.length === 1 ? e[0] : e;
}
const $p = /* @__PURE__ */ $e({
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
  useLink: no,
  setup(e, { slots: t }) {
    const n = /* @__PURE__ */ pt(no(e)), { options: l } = gt(Is), o = D(() => ({
      [lo(e.activeClass, l.linkActiveClass, "router-link-active")]: n.isActive,
      [lo(e.exactActiveClass, l.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const r = t.default && kp(t.default(n));
      return e.custom ? r : Ii("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: o.value
      }, r);
    };
  }
}), xt = $p;
function Cp(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Sp(e, t) {
  for (const n in t) {
    const l = t[n], o = e[n];
    if (typeof l == "string") {
      if (l !== o) return !1;
    } else if (!wt(o) || o.length !== l.length || l.some((r, c) => r.valueOf() !== o[c].valueOf())) return !1;
  }
  return !0;
}
function so(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const lo = (e, t, n) => e ?? t ?? n, Ap = /* @__PURE__ */ $e({
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
    const l = gt(yl), o = D(() => e.route || l.value), r = gt(Ja, 0), c = D(() => {
      let f = s(r);
      const { matched: p } = o.value;
      let h;
      for (; (h = p[f]) && !h.components; ) f++;
      return f;
    }), u = D(() => o.value.matched[c.value]);
    as(Ja, D(() => c.value + 1)), as(tr, u), as(yl, o);
    const d = /* @__PURE__ */ F();
    return Te(() => [
      d.value,
      u.value,
      e.name
    ], ([f, p, h], [v, b, C]) => {
      p && (p.instances[h] = f, b && b !== p && f && f === v && (p.leaveGuards.size || (p.leaveGuards = b.leaveGuards), p.updateGuards.size || (p.updateGuards = b.updateGuards))), f && p && (!b || !yn(p, b) || !v) && (p.enterCallbacks[h] || []).forEach((E) => E(f));
    }, { flush: "post" }), () => {
      const f = o.value, p = e.name, h = u.value, v = h && h.components[p];
      if (!v) return ao(n.default, {
        Component: v,
        route: f
      });
      const b = h.props[p], C = b ? b === !0 ? f.params : typeof b == "function" ? b(f) : b : null, R = Ii(v, De({}, C, t, {
        onVnodeUnmounted: (P) => {
          P.component.isUnmounted && (h.instances[p] = null);
        },
        ref: d
      }));
      return ao(n.default, {
        Component: R,
        route: f
      }) || R;
    };
  }
});
function ao(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const ar = Ap;
function Rp(e) {
  const t = bp(e.routes, e), n = e.parseQuery || Zf, l = e.stringifyQuery || qa, o = e.history, r = An(), c = An(), u = An(), d = /* @__PURE__ */ Gr(Ht);
  let f = Ht;
  dn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const p = qs.bind(null, (O) => "" + O), h = qs.bind(null, Of), v = qs.bind(null, Wn);
  function b(O, ne) {
    let w, G;
    return Xi(O) ? (w = t.getRecordMatcher(O), G = ne) : G = O, t.addRoute(G, w);
  }
  function C(O) {
    const ne = t.getRecordMatcher(O);
    ne && t.removeRoute(ne);
  }
  function E() {
    return t.getRoutes().map((O) => O.record);
  }
  function R(O) {
    return !!t.getRecordMatcher(O);
  }
  function P(O, ne) {
    if (ne = De({}, ne || d.value), typeof O == "string") {
      const A = Js(n, O, ne.path), L = t.resolve({ path: A.path }, ne), B = o.createHref(A.fullPath);
      return De(A, L, {
        params: v(L.params),
        hash: Wn(A.hash),
        redirectedFrom: void 0,
        href: B
      });
    }
    let w;
    if (O.path != null)
      w = De({}, O, { path: Js(n, O.path, ne.path).path });
    else {
      const A = De({}, O.params);
      for (const L in A) A[L] == null && delete A[L];
      w = De({}, O, { params: h(A) }), ne.params = h(ne.params);
    }
    const G = t.resolve(w, ne), oe = O.hash || "";
    G.params = p(v(G.params));
    const y = Uf(l, De({}, O, {
      hash: Df(oe),
      path: G.path
    })), k = o.createHref(y);
    return De({
      fullPath: y,
      hash: oe,
      query: l === qa ? Xf(O.query) : O.query || {}
    }, G, {
      redirectedFrom: void 0,
      href: k
    });
  }
  function $(O) {
    return typeof O == "string" ? Js(n, O, d.value.path) : De({}, O);
  }
  function T(O, ne) {
    if (f !== O) return _n(We.NAVIGATION_CANCELLED, {
      from: ne,
      to: O
    });
  }
  function U(O) {
    return _(O);
  }
  function I(O) {
    return U(De($(O), { replace: !0 }));
  }
  function ee(O, ne) {
    const w = O.matched[O.matched.length - 1];
    if (w && w.redirect) {
      const { redirect: G } = w;
      let oe = typeof G == "function" ? G(O, ne) : G;
      return typeof oe == "string" && (oe = oe.includes("?") || oe.includes("#") ? oe = $(oe) : { path: oe }, oe.params = {}), De({
        query: O.query,
        hash: O.hash,
        params: oe.path != null ? {} : O.params
      }, oe);
    }
  }
  function _(O, ne) {
    const w = f = P(O), G = d.value, oe = O.state, y = O.force, k = O.replace === !0, A = ee(w, G);
    if (A) return _(De($(A), {
      state: typeof A == "object" ? De({}, oe, A.state) : oe,
      force: y,
      replace: k
    }), ne || w);
    const L = w;
    L.redirectedFrom = ne;
    let B;
    return !y && Ff(l, G, w) && (B = _n(We.NAVIGATION_DUPLICATED, {
      to: L,
      from: G
    }), W(G, G, !0, !1)), (B ? Promise.resolve(B) : z(L, G)).catch((N) => Mt(N) ? Mt(N, We.NAVIGATION_GUARD_REDIRECT) ? N : Je(N) : ke(N, L, G)).then((N) => {
      if (N) {
        if (Mt(N, We.NAVIGATION_GUARD_REDIRECT))
          return _(De({ replace: k }, $(N.to), {
            state: typeof N.to == "object" ? De({}, oe, N.to.state) : oe,
            force: y
          }), ne || L);
      } else N = de(L, G, !0, k, oe);
      return ue(L, G, N), N;
    });
  }
  function x(O, ne) {
    const w = T(O, ne);
    return w ? Promise.reject(w) : Promise.resolve();
  }
  function S(O) {
    const ne = Se.values().next().value;
    return ne && typeof ne.runWithContext == "function" ? ne.runWithContext(O) : O();
  }
  function z(O, ne) {
    let w;
    const [G, oe, y] = np(O, ne);
    w = Ys(G.reverse(), "beforeRouteLeave", O, ne);
    for (const A of G) A.leaveGuards.forEach((L) => {
      w.push(Jt(L, O, ne));
    });
    const k = x.bind(null, O, ne);
    return w.push(k), je(w).then(() => {
      w = [];
      for (const A of r.list()) w.push(Jt(A, O, ne));
      return w.push(k), je(w);
    }).then(() => {
      w = Ys(oe, "beforeRouteUpdate", O, ne);
      for (const A of oe) A.updateGuards.forEach((L) => {
        w.push(Jt(L, O, ne));
      });
      return w.push(k), je(w);
    }).then(() => {
      w = [];
      for (const A of y) if (A.beforeEnter) if (wt(A.beforeEnter)) for (const L of A.beforeEnter) w.push(Jt(L, O, ne));
      else w.push(Jt(A.beforeEnter, O, ne));
      return w.push(k), je(w);
    }).then(() => (O.matched.forEach((A) => A.enterCallbacks = {}), w = Ys(y, "beforeRouteEnter", O, ne, S), w.push(k), je(w))).then(() => {
      w = [];
      for (const A of c.list()) w.push(Jt(A, O, ne));
      return w.push(k), je(w);
    }).catch((A) => Mt(A, We.NAVIGATION_CANCELLED) ? A : Promise.reject(A));
  }
  function ue(O, ne, w) {
    u.list().forEach((G) => S(() => G(O, ne, w)));
  }
  function de(O, ne, w, G, oe) {
    const y = T(O, ne);
    if (y) return y;
    const k = ne === Ht, A = dn ? history.state : {};
    w && (G || k ? o.replace(O.fullPath, De({ scroll: k && A && A.scroll }, oe)) : o.push(O.fullPath, oe)), d.value = O, W(O, ne, w, k), Je();
  }
  let le;
  function Z() {
    le || (le = o.listen((O, ne, w) => {
      if (!ze.listening) return;
      const G = P(O), oe = ee(G, ze.currentRoute.value);
      if (oe) {
        _(De(oe, {
          replace: !0,
          force: !0
        }), G).catch(Ln);
        return;
      }
      f = G;
      const y = d.value;
      dn && Kf(Ka(y.fullPath, w.delta), Ms()), z(G, y).catch((k) => Mt(k, We.NAVIGATION_ABORTED | We.NAVIGATION_CANCELLED) ? k : Mt(k, We.NAVIGATION_GUARD_REDIRECT) ? (_(De($(k.to), { force: !0 }), G).then((A) => {
        Mt(A, We.NAVIGATION_ABORTED | We.NAVIGATION_DUPLICATED) && !w.delta && w.type === bl.pop && o.go(-1, !1);
      }).catch(Ln), Promise.reject()) : (w.delta && o.go(-w.delta, !1), ke(k, G, y))).then((k) => {
        k = k || de(G, y, !1), k && (w.delta && !Mt(k, We.NAVIGATION_CANCELLED) ? o.go(-w.delta, !1) : w.type === bl.pop && Mt(k, We.NAVIGATION_ABORTED | We.NAVIGATION_DUPLICATED) && o.go(-1, !1)), ue(G, y, k);
      }).catch(Ln);
    }));
  }
  let Ue = An(), pe = An(), ge;
  function ke(O, ne, w) {
    Je(O);
    const G = pe.list();
    return G.length ? G.forEach((oe) => oe(O, ne, w)) : console.error(O), Promise.reject(O);
  }
  function Ve() {
    return ge && d.value !== Ht ? Promise.resolve() : new Promise((O, ne) => {
      Ue.add([O, ne]);
    });
  }
  function Je(O) {
    return ge || (ge = !O, Z(), Ue.list().forEach(([ne, w]) => O ? w(O) : ne()), Ue.reset()), O;
  }
  function W(O, ne, w, G) {
    const { scrollBehavior: oe } = e;
    if (!dn || !oe) return Promise.resolve();
    const y = !w && qf(Ka(O.fullPath, 0)) || (G || !w) && history.state && history.state.scroll || null;
    return As().then(() => oe(O, ne, y)).then((k) => k && Hf(k)).catch((k) => ke(k, O, ne));
  }
  const K = (O) => o.go(O);
  let Q;
  const Se = /* @__PURE__ */ new Set(), ze = {
    currentRoute: d,
    listening: !0,
    addRoute: b,
    removeRoute: C,
    clearRoutes: t.clearRoutes,
    hasRoute: R,
    getRoutes: E,
    resolve: P,
    options: e,
    push: U,
    replace: I,
    go: K,
    back: () => K(-1),
    forward: () => K(1),
    beforeEach: r.add,
    beforeResolve: c.add,
    afterEach: u.add,
    onError: pe.add,
    isReady: Ve,
    install(O) {
      O.component("RouterLink", xt), O.component("RouterView", ar), O.config.globalProperties.$router = ze, Object.defineProperty(O.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => s(d)
      }), dn && !Q && d.value === Ht && (Q = !0, U(o.location).catch((G) => {
      }));
      const ne = {};
      for (const G in Ht) Object.defineProperty(ne, G, {
        get: () => d.value[G],
        enumerable: !0
      });
      O.provide(Is, ze), O.provide(Zl, /* @__PURE__ */ Qo(ne)), O.provide(yl, d);
      const w = O.unmount;
      Se.add(O), O.unmount = function() {
        Se.delete(O), Se.size < 1 && (f = Ht, le && le(), le = null, d.value = Ht, Q = !1, ge = !1), w();
      };
    }
  };
  function je(O) {
    return O.reduce((ne, w) => ne.then(() => S(w)), Promise.resolve());
  }
  return ze;
}
function Xl() {
  return gt(Is);
}
function xp(e) {
  return gt(Zl);
}
const Pp = { class: "guard-shell" }, Tp = { class: "guard-shell__topbar" }, Ep = { class: "brand-lockup" }, Dp = ["src"], Mp = { class: "brand-lockup__eyebrow" }, Ip = { class: "topbar-actions" }, Op = { class: "toolbar-menu" }, Lp = ["title"], Np = { class: "toolbar-popover" }, Up = ["onClick"], Fp = { class: "toolbar-menu" }, Gp = ["title"], Bp = { class: "toolbar-popover" }, Vp = {
  key: 0,
  class: "toolbar-menu"
}, jp = ["title"], zp = { class: "toolbar-popover" }, Wp = { class: "guard-shell__body" }, Hp = { class: "guard-shell__sidebar" }, Kp = { class: "sidebar-current" }, qp = { class: "sidebar-current__label" }, Jp = { class: "sidebar-current__title" }, Qp = { class: "sidebar-current__meta" }, Yp = { class: "page-inline-status" }, Zp = {
  key: 0,
  class: "pill pill--info"
}, Xp = { class: "sidebar-nav" }, eh = { class: "sidebar-group__title" }, th = { class: "sidebar-footer" }, nh = { class: "sidebar-footer__hint" }, sh = { class: "sidebar-footer__actions" }, lh = ["href"], ah = { class: "guard-shell__content" }, oh = /* @__PURE__ */ $e({
  __name: "GuardShell",
  setup(e) {
    const t = Ce(), n = Ds(), l = it(), o = Yn(), r = xp(), c = Xl(), u = D(() => o.resolveUrl("/ui/logo.png")), d = D(() => o.resolveUrl("/legacy")), f = D(() => t.language === "zh" ? "ZH" : "EN"), p = [
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
    ], h = {
      "/settings": { zh: "设置", en: "Settings" }
    }, v = [
      { value: "auto", shortLabel: "Auto", zh: "跟随系统", en: "Auto" },
      { value: "light", shortLabel: "Light", zh: "浅色", en: "Light" },
      { value: "dark", shortLabel: "Dark", zh: "深色", en: "Dark" }
    ], b = D(() => {
      var P;
      return ((P = v.find(($) => $.value === t.themePreference)) == null ? void 0 : P.shortLabel) || "Auto";
    }), C = D(() => {
      const P = p.flatMap((T) => T.items).find((T) => T.to === r.path);
      if (P)
        return t.label(P.zh, P.en);
      const $ = h[r.path];
      return $ ? t.label($.zh, $.en) : t.label("首页", "Home");
    });
    Te(() => t.themePreference, () => t.applyDocumentState()), Te(() => t.language, () => t.applyDocumentState()), Te(() => t.developerMode, () => t.applyDocumentState());
    function E() {
      c.push("/settings");
    }
    async function R() {
      await l.confirm({
        title: t.label("退出当前登录？", "Sign out of the current session?"),
        message: t.label("退出后需要重新输入本机访问密码。", "You will need the local access password to sign in again."),
        confirmLabel: t.label("退出登录", "Sign out"),
        cancelLabel: t.label("取消", "Cancel")
      }) && (await n.logout(), l.pushToast({
        tone: "success",
        title: t.label("已退出登录", "Signed out"),
        message: t.label("你已经退出 Guard 控制台。", "You have signed out of Guard.")
      }));
    }
    return (P, $) => (g(), m("div", Pp, [
      a("header", Tp, [
        a("div", Ep, [
          a("img", {
            class: "brand-lockup__logo",
            src: u.value,
            alt: "OpenClaw Guard"
          }, null, 8, Dp),
          a("div", null, [
            a("p", Mp, i(s(t).label("安全控制台", "Security Console")), 1),
            $[3] || ($[3] = a("h1", { class: "brand-lockup__title" }, "OpenClaw Guard", -1))
          ])
        ]),
        a("div", Ip, [
          a("div", Op, [
            a("button", {
              class: "toolbar-icon",
              type: "button",
              title: s(t).label("主题", "Theme")
            }, i(b.value), 9, Lp),
            a("div", Np, [
              (g(), m(j, null, fe(v, (T) => a("button", {
                key: T.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (U) => s(t).setThemePreference(T.value)
              }, [
                a("span", null, i(s(t).label(T.zh, T.en)), 1)
              ], 8, Up)), 64))
            ])
          ]),
          a("div", Fp, [
            a("button", {
              class: "toolbar-icon",
              type: "button",
              title: s(t).label("语言", "Language")
            }, i(f.value), 9, Gp),
            a("div", Bp, [
              a("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: $[0] || ($[0] = (T) => s(t).setLanguage("zh"))
              }, [...$[4] || ($[4] = [
                a("span", null, "ZH", -1),
                a("span", null, "中文", -1)
              ])]),
              a("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: $[1] || ($[1] = (T) => s(t).setLanguage("en"))
              }, [...$[5] || ($[5] = [
                a("span", null, "EN", -1),
                a("span", null, "English", -1)
              ])])
            ])
          ]),
          s(n).authEnabled && s(n).authenticated ? (g(), m("div", Vp, [
            a("button", {
              class: "toolbar-icon",
              type: "button",
              title: s(t).label("账号", "Account")
            }, " Me ", 8, jp),
            a("div", zp, [
              a("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: E
              }, [
                a("span", null, i(s(t).label("设置", "Settings")), 1)
              ]),
              a("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: $[2] || ($[2] = (T) => s(n).openChangePassword())
              }, [
                a("span", null, i(s(t).label("修改密码", "Change password")), 1)
              ]),
              a("button", {
                class: "toolbar-popover__item toolbar-popover__item--danger",
                type: "button",
                onClick: R
              }, [
                a("span", null, i(s(t).label("退出登录", "Sign out")), 1)
              ])
            ])
          ])) : J("", !0)
        ])
      ]),
      a("div", Wp, [
        a("aside", Hp, [
          a("div", Kp, [
            a("p", qp, i(s(t).label("当前页面", "Current page")), 1),
            a("p", Jp, i(C.value), 1),
            a("p", Qp, i(s(t).label(
              "在这里集中处理运维、OpenClaw、渠道、安全和恢复。默认入口已经切到这套模块化控制台。",
              "Manage operations, OpenClaw, channels, security, and recovery from one place. This modular console is now the default entry."
            )), 1),
            a("div", Yp, [
              s(o).isDesktop ? (g(), m("span", Zp, i(s(t).label("桌面薄壳", "Desktop thin shell")), 1)) : J("", !0),
              s(o).isDesktop ? (g(), m("span", {
                key: 1,
                class: re(["pill", s(o).connected ? "pill--success" : "pill--warning"])
              }, i(s(o).connected ? s(t).label("已连接 Guard", "Guard connected") : s(t).label("Guard 未连接", "Guard offline")), 3)) : J("", !0)
            ])
          ]),
          a("nav", Xp, [
            (g(), m(j, null, fe(p, (T) => a("section", {
              key: T.id,
              class: "sidebar-group"
            }, [
              a("p", eh, i(s(t).label(T.zh, T.en)), 1),
              (g(!0), m(j, null, fe(T.items, (U) => (g(), Ne(s(xt), {
                key: U.to,
                to: U.to,
                class: re(["sidebar-link", { "sidebar-link--active": s(r).path === U.to }])
              }, {
                default: Y(() => [
                  ft(i(s(t).label(U.zh, U.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ]),
          a("div", th, [
            a("p", nh, i(s(t).label(
              "日常工作都留在这里完成。本地偏好、开发者模式和桌面连接设置都集中在 Settings。",
              "Stay here for day-to-day work. Local preferences, developer mode, and desktop connection settings live in Settings."
            )), 1),
            a("div", sh, [
              H(s(xt), {
                class: "sidebar-footer__link",
                to: "/settings"
              }, {
                default: Y(() => [
                  ft(i(s(t).label("打开本地设置", "Open local settings")), 1)
                ]),
                _: 1
              }),
              s(t).developerMode ? (g(), m("a", {
                key: 0,
                class: "sidebar-footer__link sidebar-footer__link--muted",
                href: d.value,
                target: "_blank",
                rel: "noreferrer"
              }, i(s(t).label("开发者回退到 legacy", "Open legacy rollback in developer mode")), 9, lh)) : J("", !0)
            ])
          ])
        ]),
        a("main", ah, [
          H(s(ar))
        ])
      ])
    ]));
  }
}), ih = {
  key: 0,
  class: "shell-loading"
}, rh = { class: "page-empty shell-loading__card" }, ch = {
  key: 2,
  class: "shell-loading"
}, uh = { class: "page-empty shell-loading__card" }, dh = /* @__PURE__ */ $e({
  __name: "App",
  setup(e) {
    const t = Ds(), n = it(), l = Yn(), o = Ce();
    let r = () => {
    };
    return nt(() => {
      o.hydrate(), l.hydrate(), r = Hu(() => {
        t.handleUnauthorized(), n.pushToast({
          tone: "warning",
          title: o.label("登录已失效", "Session expired"),
          message: o.label("请重新登录后继续使用 Guard 控制台。", "Sign in again to keep using Guard.")
        });
      });
    }), Ul(() => {
      r();
    }), Te(
      [() => l.ready, () => l.canUseApi],
      ([c, u]) => {
        c && u && t.hydrate();
      },
      { immediate: !0 }
    ), (c, u) => (g(), m(j, null, [
      !s(l).ready || s(l).requiresConnection && s(l).checking ? (g(), m("div", ih, [
        a("div", rh, i(s(o).label("正在准备 Guard 控制台…", "Preparing Guard…")), 1)
      ])) : s(l).requiresConnection ? (g(), Ne(wf, { key: 1 })) : s(t).ready ? s(t).requiresLogin ? (g(), Ne(Gd, { key: 3 })) : (g(), Ne(oh, { key: 4 })) : (g(), m("div", ch, [
        a("div", uh, i(s(o).label("正在同步认证状态…", "Checking authentication…")), 1)
      ])),
      H(Qd),
      H(Wd),
      H(wd)
    ], 64));
  }
}), fh = { class: "page-card" }, ph = { class: "page-card__header" }, hh = {
  key: 0,
  class: "page-card__eyebrow"
}, gh = { class: "page-card__title" }, mh = { class: "page-card__body" }, ae = /* @__PURE__ */ $e({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, n) => (g(), m("section", fh, [
      a("header", ph, [
        a("div", null, [
          e.eyebrow ? (g(), m("p", hh, i(e.eyebrow), 1)) : J("", !0),
          a("h2", gh, i(e.title), 1)
        ]),
        da(t.$slots, "actions")
      ]),
      a("div", mh, [
        da(t.$slots, "default")
      ])
    ]));
  }
}), bh = { class: "stat-grid" }, vh = { class: "stat-card" }, yh = { class: "stat-card__label" }, _h = { class: "stat-card" }, wh = { class: "stat-card__label" }, kh = { class: "stat-card" }, $h = { class: "stat-card__label" }, Ch = { class: "stat-card" }, Sh = { class: "stat-card__label" }, Ah = /* @__PURE__ */ $e({
  __name: "ChannelsOverviewCard",
  props: {
    definitionsCount: {},
    enabledCount: {},
    configuredCount: {},
    feishuPlugin: {}
  },
  setup(e) {
    const t = Ce();
    return (n, l) => (g(), Ne(ae, {
      title: s(t).label("当前概览", "Current overview"),
      eyebrow: "Summary"
    }, {
      default: Y(() => [
        a("div", bh, [
          a("article", vh, [
            a("p", yh, i(s(t).label("可管理渠道", "Channels")), 1),
            a("strong", null, i(e.definitionsCount), 1),
            a("span", null, i(s(t).label("当前内置和官方入口总数", "Built-in and official entry points available now")), 1)
          ]),
          a("article", _h, [
            a("p", wh, i(s(t).label("已启用", "Enabled")), 1),
            a("strong", null, i(e.enabledCount), 1),
            a("span", null, i(s(t).label("运行态会接收消息", "Receives traffic at runtime")), 1)
          ]),
          a("article", kh, [
            a("p", $h, i(s(t).label("已配置", "Configured")), 1),
            a("strong", null, i(e.configuredCount), 1),
            a("span", null, i(s(t).label("已经填写了字段或本机变量", "Fields or local values already exist")), 1)
          ]),
          a("article", Ch, [
            a("p", Sh, i(s(t).label("飞书插件", "Feishu plugin")), 1),
            a("strong", null, i(e.feishuPlugin.installed ? s(t).label("已识别", "Detected") : s(t).label("未识别", "Not detected")), 1),
            a("span", null, i(e.feishuPlugin.version || s(t).label("官方渠道仍可直接维护", "Official channel still remains manageable")), 1)
          ])
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), Rh = { class: "page-two-column" }, xh = { class: "catalog-list" }, Ph = ["onClick"], Th = { class: "catalog-list__title" }, Eh = { class: "pill-row" }, Dh = {
  key: 0,
  class: "page-stack"
}, Mh = { class: "page-inline-status" }, Ih = { class: "muted-copy" }, Oh = { class: "settings-grid" }, Lh = { key: 0 }, Nh = ["onUpdate:modelValue", "type"], Uh = ["onUpdate:modelValue"], Fh = ["value"], Gh = {
  key: 3,
  class: "checkbox-row"
}, Bh = ["onUpdate:modelValue"], Vh = { class: "page-actions" }, jh = ["disabled"], zh = ["disabled"], Wh = {
  key: 0,
  class: "list-stack"
}, Hh = { class: "action-row" }, Kh = { class: "action-row" }, qh = { class: "action-row" }, Jh = {
  key: 1,
  class: "code-panel"
}, Qh = {
  key: 2,
  class: "muted-copy"
}, Yh = /* @__PURE__ */ $e({
  __name: "ChannelsWorkspace",
  props: {
    catalogItems: {},
    selectedId: {},
    selectedDefinition: {},
    selectedChannel: {},
    fieldDescriptors: {},
    textDraft: {},
    boolDraft: {},
    saving: { type: Boolean },
    clearing: { type: Boolean },
    statusMessage: {},
    draftPreview: {}
  },
  emits: ["update:selectedId", "save", "reset", "clear"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    return (o, r) => (g(), m("div", Rh, [
      H(ae, {
        title: s(l).label("渠道目录", "Channel catalog"),
        eyebrow: "Catalog"
      }, {
        default: Y(() => [
          a("div", xh, [
            (g(!0), m(j, null, fe(e.catalogItems, (c) => (g(), m("button", {
              key: c.definition.id,
              class: re(["catalog-list__item", { "catalog-list__item--active": e.selectedId === c.definition.id }]),
              type: "button",
              onClick: (u) => n("update:selectedId", c.definition.id)
            }, [
              a("div", Th, [
                a("strong", null, i(`${c.definition.icon} ${c.definition.name}`), 1)
              ]),
              a("div", Eh, [
                a("span", {
                  class: re(["pill", c.enabled ? "pill--success" : "pill--warning"])
                }, i(c.enabled ? s(l).label("已启用", "Enabled") : s(l).label("停用", "Disabled")), 3),
                a("span", {
                  class: re(["pill", c.configured ? "pill--success" : "pill--muted"])
                }, i(c.configured ? s(l).label("已配置", "Configured") : s(l).label("未配置", "Empty")), 3)
              ])
            ], 10, Ph))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      e.selectedChannel ? (g(), m("div", Dh, [
        H(ae, {
          title: e.selectedChannel.name,
          eyebrow: "Editor"
        }, {
          default: Y(() => [
            a("div", Mh, [
              a("span", {
                class: re(["pill", e.selectedChannel.enabled ? "pill--success" : "pill--warning"])
              }, i(e.selectedChannel.enabled ? s(l).label("正在接收消息", "Receiving traffic") : s(l).label("当前停用", "Currently disabled")), 3),
              a("span", {
                class: re(["pill", e.selectedChannel.configured ? "pill--success" : "pill--muted"])
              }, i(e.selectedChannel.configured ? s(l).label("配置已完成", "Configured") : s(l).label("还未配置", "Not configured")), 3)
            ]),
            a("p", Ih, i(e.statusMessage), 1),
            a("div", Oh, [
              (g(!0), m(j, null, fe(e.fieldDescriptors, (c) => (g(), m("label", {
                key: c.key,
                class: "settings-field"
              }, [
                a("span", null, i(c.label), 1),
                c.help ? (g(), m("small", Lh, i(c.help), 1)) : J("", !0),
                c.kind === "text" && c.inputType !== "select" ? be((g(), m("input", {
                  key: 1,
                  "onUpdate:modelValue": (u) => e.textDraft[c.key] = u,
                  class: "settings-input",
                  type: c.inputType || "text"
                }, null, 8, Nh)), [
                  [Ru, e.textDraft[c.key]]
                ]) : c.kind === "text" && c.inputType === "select" ? be((g(), m("select", {
                  key: 2,
                  "onUpdate:modelValue": (u) => e.textDraft[c.key] = u,
                  class: "settings-input"
                }, [
                  (g(!0), m(j, null, fe(c.options, (u) => (g(), m("option", {
                    key: u.value,
                    value: u.value
                  }, i(u.label), 9, Fh))), 128))
                ], 8, Uh)), [
                  [mt, e.textDraft[c.key]]
                ]) : (g(), m("label", Gh, [
                  be(a("input", {
                    "onUpdate:modelValue": (u) => e.boolDraft[c.key] = u,
                    type: "checkbox"
                  }, null, 8, Bh), [
                    [Gt, e.boolDraft[c.key]]
                  ]),
                  a("span", null, i(c.help || s(l).label("勾选即启用。", "Checked means enabled.")), 1)
                ]))
              ]))), 128))
            ]),
            a("div", Vh, [
              a("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: e.saving,
                onClick: r[0] || (r[0] = (c) => n("save"))
              }, i(e.saving ? s(l).label("保存中…", "Saving…") : s(l).label("保存渠道配置", "Save channel configuration")), 9, jh),
              a("button", {
                class: "inline-link",
                type: "button",
                onClick: r[1] || (r[1] = (c) => n("reset"))
              }, i(s(l).label("恢复当前值", "Reset draft")), 1),
              a("button", {
                class: "inline-link inline-link--danger",
                type: "button",
                disabled: e.clearing,
                onClick: r[2] || (r[2] = (c) => n("clear"))
              }, i(e.clearing ? s(l).label("清空中…", "Clearing…") : s(l).label("清空配置", "Clear configuration")), 9, zh)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(l).label("配置摘要", "Configuration summary"),
          eyebrow: "Summary"
        }, {
          default: Y(() => [
            e.selectedDefinition ? (g(), m("div", Wh, [
              a("article", Hh, [
                a("div", null, [
                  a("h3", null, i(s(l).label("普通字段", "Regular fields")), 1),
                  a("p", null, i(s(l).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                ]),
                a("strong", null, i(e.selectedDefinition.fields.length), 1)
              ]),
              a("article", Kh, [
                a("div", null, [
                  a("h3", null, i(s(l).label("本机变量", "Local secrets")), 1),
                  a("p", null, i(s(l).label("敏感值优先以本机变量方式保存，便于后续替换或清空。", "Sensitive values are best stored as local variables so they can be rotated or cleared later.")), 1)
                ]),
                a("strong", null, i(e.selectedDefinition.envFields.length), 1)
              ]),
              a("article", qh, [
                a("div", null, [
                  a("h3", null, i(s(l).label("当前草稿", "Current draft")), 1),
                  a("p", null, i(s(l).label("这里只显示你现在编辑中的内容，不会自动写入运行态。", "This only shows the values you are editing now. Nothing reaches runtime until you save.")), 1)
                ]),
                a("strong", null, i(e.selectedChannel.id), 1)
              ])
            ])) : J("", !0),
            s(l).developerMode ? (g(), m("pre", Jh, i(JSON.stringify(e.draftPreview, null, 2)), 1)) : (g(), m("p", Qh, i(s(l).label("当前草稿的原始配置预览已收纳到开发者模式里。需要排查字段写入结果时，请先到 Settings 打开开发者模式。", "The raw draft preview now stays behind developer mode. Enable it from Settings when you need to inspect the exact payload.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ])) : J("", !0)
    ]));
  }
});
function Qe(e) {
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
function he(e) {
  return e == null || !Number.isFinite(e) ? "-" : new Intl.NumberFormat(void 0).format(e);
}
function Zh(e) {
  return e == null || !Number.isFinite(e) ? "-" : `${e.toFixed(e >= 10 ? 0 : 1)}%`;
}
function Xh(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "-";
  if (e < 1024) return `${he(e)} B`;
  const t = ["KB", "MB", "GB", "TB"];
  let n = e / 1024, l = 0;
  for (; n >= 1024 && l < t.length - 1; )
    n /= 1024, l += 1;
  return `${n.toFixed(n >= 10 ? 1 : 2)} ${t[l]}`;
}
function oo(e, t = "USD") {
  if (e == null || !Number.isFinite(e)) return "-";
  if (/^[A-Z]{3}$/.test(t)) {
    const l = e >= 1 ? 2 : 4;
    return new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: t,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    }).format(e);
  }
  const n = e >= 1 ? 2 : 4;
  return `${e.toFixed(n)} ${t}`.trim();
}
function io(e) {
  return e ? e.slice(0, 7) : "-";
}
function ns(e) {
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
function eg(e) {
  return typeof e == "boolean" ? e : typeof e == "string" ? ["true", "1", "yes", "on"].includes(e.trim().toLowerCase()) : !1;
}
function ms(e) {
  const t = e.trim();
  if (!t) return;
  const n = Number(t);
  return Number.isFinite(n) ? n : void 0;
}
function ro(e) {
  return /token|secret|key|password/i.test(e);
}
async function tg() {
  const [e, t, n] = await Promise.all([
    Ee("/api/channels"),
    Ee("/api/channels/meta"),
    Ee("/api/feishu/plugin").catch(() => ({ installed: !1 }))
  ]);
  return {
    channels: e,
    definitions: t,
    feishuPlugin: n
  };
}
function ng(e, t) {
  return Oe(`/api/channels/${encodeURIComponent(e)}`, t);
}
function sg(e) {
  return Ql(`/api/channels/${encodeURIComponent(e)}`);
}
function ct(e, t = null, n = {}) {
  const l = /* @__PURE__ */ F(t), o = n.immediate !== !1, r = /* @__PURE__ */ F(o && t === null), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(null);
  async function d(f = {}) {
    f.silent === !0 ? c.value = !0 : r.value = !0, u.value = null;
    try {
      l.value = await e();
    } catch (h) {
      u.value = h instanceof Error ? h.message : String(h);
    } finally {
      r.value = !1, c.value = !1;
    }
  }
  return nt(() => {
    o && d();
  }), Ol({
    data: l,
    loading: r,
    refreshing: c,
    error: u,
    execute: d
  });
}
const co = {
  connectionMode: ["websocket", "webhook"],
  dmPolicy: ["open", "allowlist", "closed"],
  groupPolicy: ["open", "allowlist", "closed"],
  renderMode: ["auto", "rich", "compact"]
};
let uo = null;
function lg() {
  const e = Ce(), t = it(), n = ct(() => tg(), uo, {
    immediate: !1
  }), l = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ pt({}), u = /* @__PURE__ */ pt({}), d = D(
    () => {
      var _;
      return new Map((((_ = n.data) == null ? void 0 : _.channels) || []).map((x) => [x.id, x]));
    }
  ), f = D(
    () => {
      var _;
      return new Map(
        (((_ = n.data) == null ? void 0 : _.definitions) || []).map((x) => [x.id, x])
      );
    }
  ), p = D(() => {
    var _, x;
    return f.value.get(l.value) || ((x = (_ = n.data) == null ? void 0 : _.definitions) == null ? void 0 : x[0]) || null;
  }), h = D(() => {
    const _ = p.value;
    return _ ? d.value.get(_.id) || {
      id: _.id,
      name: _.name,
      icon: _.icon,
      enabled: !1,
      configured: !1,
      config: {}
    } : null;
  }), v = D(
    () => {
      var _;
      return (((_ = n.data) == null ? void 0 : _.channels) || []).filter((x) => x.enabled).length;
    }
  ), b = D(
    () => {
      var _;
      return (((_ = n.data) == null ? void 0 : _.channels) || []).filter((x) => x.configured).length;
    }
  ), C = D(
    () => {
      var _;
      return (((_ = n.data) == null ? void 0 : _.definitions) || []).map((x) => {
        const S = d.value.get(x.id);
        return {
          definition: x,
          enabled: (S == null ? void 0 : S.enabled) === !0,
          configured: (S == null ? void 0 : S.configured) === !0
        };
      });
    }
  ), E = D(() => {
    const _ = p.value, x = [
      {
        key: "enabled",
        label: e.label("启用这个渠道", "Enable this channel"),
        kind: "boolean",
        help: e.label(
          "关闭后会保留配置，但运行态不会再接收这个入口的消息。",
          "Keep the config but stop receiving traffic from this channel."
        )
      }
    ];
    for (const S of (_ == null ? void 0 : _.fields) || []) {
      if (S === "requireMention" || S === "streaming") {
        x.push({
          key: S,
          label: ns(S),
          kind: "boolean",
          help: e.label("勾选即启用。", "Checked means enabled.")
        });
        continue;
      }
      if (co[S]) {
        x.push({
          key: S,
          label: ns(S),
          kind: "text",
          inputType: "select",
          options: co[S].map((z) => ({
            value: z,
            label: z
          }))
        });
        continue;
      }
      x.push({
        key: S,
        label: ns(S),
        kind: "text",
        inputType: /port/i.test(S) ? "number" : ro(S) ? "password" : "text"
      });
    }
    for (const S of (_ == null ? void 0 : _.envFields) || [])
      x.push({
        key: `env:${S}`,
        label: `${ns(S)} (${S})`,
        kind: "text",
        inputType: "password",
        env: !0,
        help: e.label(
          "留空会清除这个本机环境变量。",
          "Leave blank to clear this local environment variable."
        )
      });
    return x;
  }), R = D(() => {
    const _ = h.value;
    return _ ? _.id === "feishu" ? _.enabled ? e.label(
      "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
      "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
    ) : e.label(
      "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
      "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
    ) : _.enabled ? e.label(
      "保存后会直接更新当前消息入口配置。",
      "Saving here updates the live channel configuration immediately."
    ) : e.label(
      "这个消息入口当前停用中。可以先补齐配置，再决定是否启用。",
      "This channel is currently disabled. Finish the settings first, then decide whether to enable it."
    ) : "";
  }), P = D(() => ({
    enabled: u.enabled === !0,
    fields: Object.fromEntries(
      Object.keys(c).filter((_) => !_.startsWith("env:")).map((_) => [
        _,
        ro(_) && c[_] ? "******" : c[_] ?? ""
      ])
    ),
    envFields: Object.fromEntries(
      Object.keys(c).filter((_) => _.startsWith("env:")).map((_) => [_, c[_] ? "******" : ""])
    )
  }));
  function $() {
    for (const _ of Object.keys(c))
      delete c[_];
    for (const _ of Object.keys(u))
      delete u[_];
  }
  function T() {
    var S, z;
    $();
    const _ = h.value, x = p.value;
    if (!(!_ || !x)) {
      u.enabled = _.enabled === !0;
      for (const ue of x.fields) {
        const de = (S = _.config) == null ? void 0 : S[ue];
        ue === "requireMention" || ue === "streaming" ? u[ue] = eg(de) : c[ue] = de == null ? "" : String(de);
      }
      for (const ue of x.envFields) {
        const de = `env:${ue}`;
        c[de] = ((z = _.config) == null ? void 0 : z[de]) == null ? "" : String(_.config[de]);
      }
    }
  }
  Te(
    () => n.data,
    (_) => {
      _ && (uo = _);
      const x = (_ == null ? void 0 : _.definitions) || [];
      if (x.length) {
        if (!l.value || !f.value.has(l.value)) {
          l.value = x[0].id;
          return;
        }
        T();
      }
    },
    { immediate: !0 }
  ), Te(l, () => {
    T();
  }), nt(() => {
    n.execute({ silent: !!n.data });
  });
  async function U() {
    await n.execute({ silent: !0 });
  }
  async function I() {
    const _ = h.value, x = p.value;
    if (!(!_ || !x)) {
      o.value = !0;
      try {
        const S = {
          enabled: u.enabled === !0
        };
        for (const ue of x.fields) {
          if (ue === "requireMention" || ue === "streaming") {
            S[ue] = u[ue] === !0;
            continue;
          }
          const de = c[ue] ?? "";
          /port/i.test(ue) ? S[ue] = ms(de) ?? "" : S[ue] = de;
        }
        for (const ue of x.envFields)
          S[`env:${ue}`] = c[`env:${ue}`] ?? "";
        const z = await ng(_.id, S);
        t.pushToast({
          tone: z.success ? "success" : "error",
          message: z.message
        }), await U();
      } catch (S) {
        t.pushToast({
          tone: "error",
          message: S instanceof Error ? S.message : String(S)
        });
      } finally {
        o.value = !1;
      }
    }
  }
  async function ee() {
    const _ = h.value;
    if (!(!_ || !await t.confirm({
      title: e.label("清空渠道配置", "Clear channel configuration"),
      message: e.label(
        `确认清空 ${_.name || _.id} 的配置吗？这会移除本机保存的字段和值。`,
        `Clear the configuration for ${_.name || _.id}? This removes the saved local values for this channel.`
      ),
      confirmLabel: e.label("确认清空", "Clear configuration"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    }))) {
      r.value = !0;
      try {
        const S = await sg(_.id);
        t.pushToast({
          tone: S.success ? "success" : "error",
          message: S.message
        }), await U();
      } catch (S) {
        t.pushToast({
          tone: "error",
          message: S instanceof Error ? S.message : String(S)
        });
      } finally {
        r.value = !1;
      }
    }
  }
  return {
    resource: n,
    selectedId: l,
    saving: o,
    clearing: r,
    textDraft: c,
    boolDraft: u,
    catalogItems: C,
    selectedDefinition: p,
    selectedChannel: h,
    enabledCount: v,
    configuredCount: b,
    fieldDescriptors: E,
    statusMessage: R,
    draftPreview: P,
    refresh: U,
    hydrateDraft: T,
    handleSave: I,
    handleClear: ee
  };
}
const ag = { class: "page-stack" }, og = { class: "page-header" }, ig = { class: "page-header__eyebrow" }, rg = { class: "page-header__title" }, cg = { class: "page-header__description" }, ug = {
  key: 0,
  class: "page-empty"
}, dg = {
  key: 1,
  class: "page-empty page-empty--error"
}, fg = {
  key: 0,
  class: "status-banner status-banner--warning"
}, pg = /* @__PURE__ */ $e({
  __name: "ChannelsPage",
  setup(e) {
    const t = Ce(), {
      resource: n,
      selectedId: l,
      saving: o,
      clearing: r,
      textDraft: c,
      boolDraft: u,
      catalogItems: d,
      selectedDefinition: f,
      selectedChannel: p,
      enabledCount: h,
      configuredCount: v,
      fieldDescriptors: b,
      statusMessage: C,
      draftPreview: E,
      refresh: R,
      hydrateDraft: P,
      handleSave: $,
      handleClear: T
    } = lg();
    return (U, I) => (g(), m("div", ag, [
      a("header", og, [
        a("div", null, [
          a("p", ig, i(s(t).label("渠道 / 接入", "Channels / Connections")), 1),
          a("h2", rg, i(s(t).label("渠道管理", "Channel management")), 1),
          a("p", cg, i(s(t).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: I[0] || (I[0] = //@ts-ignore
          (...ee) => s(R) && s(R)(...ee))
        }, i(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新", "Refresh")), 1)
      ]),
      s(n).loading && !s(n).data ? (g(), m("div", ug, i(s(t).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", dg, i(s(n).error), 1)) : s(n).data && s(p) ? (g(), m(j, { key: 2 }, [
        s(n).error ? (g(), m("div", fg, i(s(t).label("已保留上一版渠道快照，但后台刷新失败：", "The last channel snapshot is still on screen, but the background refresh failed: ")) + i(s(n).error), 1)) : J("", !0),
        H(Ah, {
          "definitions-count": s(n).data.definitions.length,
          "enabled-count": s(h),
          "configured-count": s(v),
          "feishu-plugin": s(n).data.feishuPlugin
        }, null, 8, ["definitions-count", "enabled-count", "configured-count", "feishu-plugin"]),
        H(Yh, {
          "catalog-items": s(d),
          "selected-id": s(l),
          "selected-definition": s(f),
          "selected-channel": s(p),
          "field-descriptors": s(b),
          "text-draft": s(c),
          "bool-draft": s(u),
          saving: s(o),
          clearing: s(r),
          "status-message": s(C),
          "draft-preview": s(E),
          "onUpdate:selectedId": I[1] || (I[1] = (ee) => l.value = ee),
          onSave: s($),
          onReset: s(P),
          onClear: s(T)
        }, null, 8, ["catalog-items", "selected-id", "selected-definition", "selected-channel", "field-descriptors", "text-draft", "bool-draft", "saving", "clearing", "status-message", "draft-preview", "onSave", "onReset", "onClear"])
      ], 64)) : J("", !0)
    ]));
  }
});
function _l() {
  return {
    name: "",
    description: "",
    agentId: "",
    prompt: "",
    scheduleMode: "cron",
    scheduleValue: "0 9 * * *",
    enabled: !0,
    timezone: "",
    model: "",
    thinking: "",
    session: "main",
    wake: "now",
    timeoutSeconds: "30",
    stagger: "",
    announce: !1,
    bestEffortDeliver: !1,
    deleteAfterRun: !1
  };
}
function fo(e) {
  const t = Number(e);
  return !Number.isFinite(t) || t <= 0 ? "" : t % 864e5 === 0 ? `${t / 864e5}d` : t % 36e5 === 0 ? `${t / 36e5}h` : t % 6e4 === 0 ? `${t / 6e4}m` : t % 1e3 === 0 ? `${t / 1e3}s` : String(t);
}
function hg(e) {
  const t = e.raw || {}, n = t.payload || {}, l = t.schedule || {}, o = _l();
  return l.kind === "every" ? (o.scheduleMode = "every", o.scheduleValue = fo(l.everyMs)) : l.kind === "at" ? (o.scheduleMode = "at", o.scheduleValue = String(l.at || "")) : l.kind === "cron" && (o.scheduleMode = "cron", o.scheduleValue = String(l.expr || "")), !o.scheduleValue && typeof e.schedule == "string" && (e.schedule.startsWith("cron ") ? (o.scheduleMode = "cron", o.scheduleValue = e.schedule.slice(5).trim()) : e.schedule.startsWith("every ") ? (o.scheduleMode = "every", o.scheduleValue = e.schedule.slice(6).trim()) : e.schedule.startsWith("at ") ? (o.scheduleMode = "at", o.scheduleValue = e.schedule.slice(3).trim()) : o.scheduleValue = e.schedule.trim()), o.stagger = fo(l.staggerMs), o.name = String(t.name || e.name || ""), o.description = String(t.description || ""), o.agentId = String(t.agentId || e.agentId || ""), o.prompt = String(n.message || n.text || t.message || e.prompt || ""), o.enabled = e.enabled !== !1, o.timezone = String(t.tz || ""), o.model = String(t.model || n.model || ""), o.thinking = String(t.thinking || n.thinking || ""), o.session = String(t.session || n.session || o.session), o.wake = String(t.wake || o.wake), o.timeoutSeconds = t.timeoutSeconds ? String(t.timeoutSeconds) : o.timeoutSeconds, o.announce = t.announce === !0 || t.deliver === !0, o.bestEffortDeliver = t.bestEffortDeliver === !0, o.deleteAfterRun = t.deleteAfterRun === !0, o;
}
function gg(e, t) {
  return t === !0 ? e.label("已启用", "Enabled") : t === !1 ? e.label("已停用", "Disabled") : e.label("未知", "Unknown");
}
function mg(e, t, n) {
  return n ? n.schedulerNextWakeAt ? Qe(n.schedulerNextWakeAt) : t && n.storePath ? n.storePath : n.enabled === !0 ? e.label(
    "调度器已启用，但下一次唤醒时间暂未返回。",
    "The scheduler is enabled, but the next wake time has not been reported yet."
  ) : n.enabled === !1 ? e.label("调度器当前已停用。", "The scheduler is currently disabled.") : e.label(
    "调度器路径已收纳到开发者模式。",
    "The scheduler path stays behind developer mode."
  ) : e.label("调度器详情暂缺。", "Scheduler details are missing.");
}
function bg(e, t) {
  const n = String(t.status || "").trim().toLowerCase();
  if (!n) return t.enabled ? e.label("已启用", "Enabled") : e.label("已停用", "Disabled");
  const o = {
    enabled: { zh: "已启用", en: "Enabled" },
    disabled: { zh: "已停用", en: "Disabled" },
    running: { zh: "执行中", en: "Running" },
    queued: { zh: "排队中", en: "Queued" },
    pending: { zh: "等待中", en: "Pending" },
    paused: { zh: "已暂停", en: "Paused" },
    success: { zh: "成功", en: "Success" },
    completed: { zh: "已完成", en: "Completed" },
    failed: { zh: "失败", en: "Failed" },
    error: { zh: "异常", en: "Error" }
  }[n];
  return o ? e.label(o.zh, o.en) : n;
}
function vg(e) {
  const t = String(e.status || "").trim().toLowerCase();
  return ["running", "success", "completed", "enabled"].includes(t) ? "pill--success" : ["queued", "pending", "paused", "disabled"].includes(t) || e.enabled === !1 ? "pill--warning" : ["failed", "error"].includes(t) ? "pill--danger" : e.enabled ? "pill--info" : "pill--warning";
}
function yg(e) {
  return e === "every" ? "10m / 1h" : e === "at" ? "2026-03-20T09:00:00+08:00" : "0 9 * * *";
}
function _g(e) {
  return {
    name: e.name.trim() || void 0,
    description: e.description.trim() || void 0,
    agentId: e.agentId.trim() || void 0,
    prompt: e.prompt.trim() || void 0,
    scheduleMode: e.scheduleMode,
    scheduleValue: e.scheduleValue.trim(),
    enabled: e.enabled,
    timezone: e.timezone.trim() || void 0,
    model: e.model.trim() || void 0,
    thinking: e.thinking || void 0,
    session: e.session || void 0,
    wake: e.wake || void 0,
    timeoutSeconds: ms(e.timeoutSeconds),
    stagger: e.stagger.trim() || void 0,
    announce: e.announce,
    bestEffortDeliver: e.bestEffortDeliver,
    deleteAfterRun: e.deleteAfterRun
  };
}
const wg = { class: "provider-card__header" }, kg = { class: "muted-copy" }, $g = { class: "settings-grid settings-grid--wide" }, Cg = { class: "settings-field" }, Sg = ["placeholder"], Ag = { class: "settings-field" }, Rg = ["placeholder"], xg = { class: "settings-field" }, Pg = { class: "settings-field" }, Tg = ["placeholder"], Eg = { class: "settings-field" }, Dg = { class: "settings-field" }, Mg = { class: "settings-field" }, Ig = ["placeholder"], Og = { class: "settings-field" }, Lg = { value: "" }, Ng = { class: "settings-field" }, Ug = { class: "settings-field" }, Fg = { class: "settings-field" }, Gg = ["placeholder"], Bg = { class: "settings-field settings-field--full" }, Vg = ["placeholder"], jg = { class: "settings-field settings-field--full" }, zg = ["placeholder"], Wg = { class: "checkbox-grid" }, Hg = { class: "checkbox-card" }, Kg = { class: "checkbox-card__body" }, qg = { class: "checkbox-card" }, Jg = { class: "checkbox-card__body" }, Qg = { class: "checkbox-card" }, Yg = { class: "checkbox-card__body" }, Zg = { class: "checkbox-card" }, Xg = { class: "checkbox-card__body" }, em = { class: "page-actions" }, tm = ["disabled"], nm = /* @__PURE__ */ $e({
  __name: "CronEditorSection",
  props: {
    draft: {},
    editorMode: {},
    editingJobId: {},
    runningAction: {}
  },
  emits: ["submit", "reset"],
  setup(e) {
    const t = e, n = Ce(), l = D(
      () => t.runningAction === "create" || t.runningAction === "update"
    ), o = D(() => yg(t.draft.scheduleMode));
    return (r, c) => (g(), Ne(ae, {
      title: e.editorMode === "edit" ? s(n).label(`编辑任务 ${e.editingJobId}`, `Edit ${e.editingJobId}`) : s(n).label("新建 Cron 任务", "Create cron job"),
      eyebrow: "Editor"
    }, {
      default: Y(() => [
        a("div", wg, [
          a("p", kg, i(s(n).label(
            "这里直接复用现有的 cron-ui 接口，所以保存后的任务会立刻回到同一套运行态里，不会产生第二套自动化系统。",
            "This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system."
          )), 1),
          a("span", {
            "data-testid": "cron-editor-mode",
            class: re(["pill", e.editorMode === "edit" ? "pill--warning" : "pill--success"])
          }, i(e.editorMode === "edit" ? s(n).label("编辑模式", "Edit mode") : s(n).label("创建模式", "Create mode")), 3)
        ]),
        a("form", {
          class: "page-form-stack",
          onSubmit: c[17] || (c[17] = kn((u) => r.$emit("submit"), ["prevent"]))
        }, [
          a("div", $g, [
            a("label", Cg, [
              a("span", null, i(s(n).label("任务名称", "Job name")), 1),
              be(a("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => e.draft.name = u),
                "data-testid": "cron-editor-name",
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("例如：每日汇总", "Example: Daily brief")
              }, null, 8, Sg), [
                [xe, e.draft.name]
              ])
            ]),
            a("label", Ag, [
              a("span", null, i(s(n).label("Agent ID", "Agent ID")), 1),
              be(a("input", {
                "onUpdate:modelValue": c[1] || (c[1] = (u) => e.draft.agentId = u),
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("例如：task-hub", "Example: task-hub")
              }, null, 8, Rg), [
                [xe, e.draft.agentId]
              ])
            ]),
            a("label", xg, [
              a("span", null, i(s(n).label("调度类型", "Schedule mode")), 1),
              be(a("select", {
                "onUpdate:modelValue": c[2] || (c[2] = (u) => e.draft.scheduleMode = u),
                class: "settings-input"
              }, [...c[20] || (c[20] = [
                a("option", { value: "cron" }, "cron", -1),
                a("option", { value: "every" }, "every", -1),
                a("option", { value: "at" }, "at", -1)
              ])], 512), [
                [mt, e.draft.scheduleMode]
              ])
            ]),
            a("label", Pg, [
              a("span", null, i(s(n).label("调度值", "Schedule value")), 1),
              be(a("input", {
                "onUpdate:modelValue": c[3] || (c[3] = (u) => e.draft.scheduleValue = u),
                class: "settings-input",
                type: "text",
                placeholder: o.value
              }, null, 8, Tg), [
                [xe, e.draft.scheduleValue]
              ]),
              a("small", null, i(s(n).label(
                "cron 用 5 段表达式；every 例如 10m / 1h；at 支持 ISO 时间或 +20m。",
                "Use a 5-field cron expression, 10m / 1h for every, or ISO time / +20m for at."
              )), 1)
            ]),
            a("label", Eg, [
              a("span", null, i(s(n).label("时区", "Timezone")), 1),
              be(a("input", {
                "onUpdate:modelValue": c[4] || (c[4] = (u) => e.draft.timezone = u),
                class: "settings-input",
                type: "text",
                placeholder: "Asia/Shanghai"
              }, null, 512), [
                [xe, e.draft.timezone]
              ])
            ]),
            a("label", Dg, [
              a("span", null, i(s(n).label("会话模式", "Session mode")), 1),
              be(a("select", {
                "onUpdate:modelValue": c[5] || (c[5] = (u) => e.draft.session = u),
                class: "settings-input"
              }, [...c[21] || (c[21] = [
                a("option", { value: "main" }, "main", -1),
                a("option", { value: "isolated" }, "isolated", -1)
              ])], 512), [
                [mt, e.draft.session]
              ])
            ]),
            a("label", Mg, [
              a("span", null, i(s(n).label("模型覆盖", "Model override")), 1),
              be(a("input", {
                "onUpdate:modelValue": c[6] || (c[6] = (u) => e.draft.model = u),
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("留空则使用 Agent 默认模型", "Leave blank to use the agent default")
              }, null, 8, Ig), [
                [xe, e.draft.model]
              ])
            ]),
            a("label", Og, [
              a("span", null, i(s(n).label("Thinking 等级", "Thinking level")), 1),
              be(a("select", {
                "onUpdate:modelValue": c[7] || (c[7] = (u) => e.draft.thinking = u),
                class: "settings-input"
              }, [
                a("option", Lg, i(s(n).label("跟随默认", "Use default")), 1),
                c[22] || (c[22] = a("option", { value: "off" }, "off", -1)),
                c[23] || (c[23] = a("option", { value: "minimal" }, "minimal", -1)),
                c[24] || (c[24] = a("option", { value: "low" }, "low", -1)),
                c[25] || (c[25] = a("option", { value: "medium" }, "medium", -1)),
                c[26] || (c[26] = a("option", { value: "high" }, "high", -1))
              ], 512), [
                [mt, e.draft.thinking]
              ])
            ]),
            a("label", Ng, [
              a("span", null, i(s(n).label("唤醒时机", "Wake mode")), 1),
              be(a("select", {
                "onUpdate:modelValue": c[8] || (c[8] = (u) => e.draft.wake = u),
                class: "settings-input"
              }, [...c[27] || (c[27] = [
                a("option", { value: "now" }, "now", -1),
                a("option", { value: "next-heartbeat" }, "next-heartbeat", -1)
              ])], 512), [
                [mt, e.draft.wake]
              ])
            ]),
            a("label", Ug, [
              a("span", null, i(s(n).label("超时（秒）", "Timeout (seconds)")), 1),
              be(a("input", {
                "onUpdate:modelValue": c[9] || (c[9] = (u) => e.draft.timeoutSeconds = u),
                class: "settings-input",
                type: "number",
                min: "1",
                placeholder: "30"
              }, null, 512), [
                [xe, e.draft.timeoutSeconds]
              ])
            ]),
            a("label", Fg, [
              a("span", null, i(s(n).label("错峰", "Stagger")), 1),
              be(a("input", {
                "onUpdate:modelValue": c[10] || (c[10] = (u) => e.draft.stagger = u),
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("例如：5m，填 0 表示精确执行", "Example: 5m, use 0 for exact timing")
              }, null, 8, Gg), [
                [xe, e.draft.stagger]
              ])
            ]),
            a("label", Bg, [
              a("span", null, i(s(n).label("任务消息", "Prompt")), 1),
              be(a("textarea", {
                "onUpdate:modelValue": c[11] || (c[11] = (u) => e.draft.prompt = u),
                class: "settings-textarea",
                placeholder: s(n).label("例如：汇总今天的新线索并输出为 Markdown。", "Example: Summarize today’s new leads in Markdown.")
              }, null, 8, Vg), [
                [xe, e.draft.prompt]
              ])
            ]),
            a("label", jg, [
              a("span", null, i(s(n).label("描述", "Description")), 1),
              be(a("textarea", {
                "onUpdate:modelValue": c[12] || (c[12] = (u) => e.draft.description = u),
                class: "settings-textarea",
                placeholder: s(n).label("可选，用来解释这个任务的用途。", "Optional note explaining what this job is for.")
              }, null, 8, zg), [
                [xe, e.draft.description]
              ])
            ])
          ]),
          a("div", Wg, [
            a("label", Hg, [
              be(a("input", {
                "onUpdate:modelValue": c[13] || (c[13] = (u) => e.draft.enabled = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.enabled]
              ]),
              a("div", Kg, [
                a("strong", null, i(s(n).label("保存后立即启用", "Enable after save")), 1),
                a("p", null, i(s(n).label("关闭时任务会保留，但不会按计划自动执行。", "When disabled, the job stays available but will not run automatically.")), 1)
              ])
            ]),
            a("label", qg, [
              be(a("input", {
                "onUpdate:modelValue": c[14] || (c[14] = (u) => e.draft.announce = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.announce]
              ]),
              a("div", Jg, [
                a("strong", null, i(s(n).label("投递结果", "Deliver output")), 1),
                a("p", null, i(s(n).label("执行完成后尝试把结果投递回会话或目标渠道。", "Try to deliver the result back to the session or target channel after execution.")), 1)
              ])
            ]),
            a("label", Qg, [
              be(a("input", {
                "onUpdate:modelValue": c[15] || (c[15] = (u) => e.draft.bestEffortDeliver = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.bestEffortDeliver]
              ]),
              a("div", Yg, [
                a("strong", null, i(s(n).label("尽力投递", "Best effort deliver")), 1),
                a("p", null, i(s(n).label("当目标暂时不可用时，尽量保留或稍后交付结果。", "Keep or retry delivery when the target is temporarily unavailable.")), 1)
              ])
            ]),
            a("label", Zg, [
              be(a("input", {
                "onUpdate:modelValue": c[16] || (c[16] = (u) => e.draft.deleteAfterRun = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.deleteAfterRun]
              ]),
              a("div", Xg, [
                a("strong", null, i(s(n).label("运行后删除", "Delete after run")), 1),
                a("p", null, i(s(n).label("适合一次性任务；普通巡检或日报不建议开启。", "Useful for one-off jobs. Leave it off for recurring inspections or briefs.")), 1)
              ])
            ])
          ])
        ], 32),
        a("div", em, [
          a("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: l.value,
            onClick: c[18] || (c[18] = (u) => r.$emit("submit"))
          }, i(l.value ? s(n).label("保存中…", "Saving…") : e.editorMode === "edit" ? s(n).label("保存修改", "Save changes") : s(n).label("创建任务", "Create job")), 9, tm),
          a("button", {
            "data-testid": "cron-editor-reset",
            class: "inline-link",
            type: "button",
            onClick: c[19] || (c[19] = (u) => r.$emit("reset"))
          }, i(e.editorMode === "edit" ? s(n).label("切回创建模式", "Switch to create mode") : s(n).label("重置表单", "Reset form")), 1)
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), sm = { class: "control-grid" }, lm = { class: "settings-field" }, am = ["value", "placeholder"], om = { class: "pill-row" }, im = {
  key: 0,
  class: "provider-stack"
}, rm = ["data-job-id"], cm = { class: "provider-card__header" }, um = { class: "mini-list" }, dm = { class: "mini-list__item mini-list__item--stack" }, fm = { class: "mini-list__item mini-list__item--stack" }, pm = { class: "mini-list__item mini-list__item--stack" }, hm = { class: "page-actions" }, gm = ["onClick"], mm = ["disabled", "onClick"], bm = ["disabled", "onClick"], vm = ["disabled", "onClick"], ym = {
  key: 1,
  class: "page-empty"
}, _m = /* @__PURE__ */ $e({
  __name: "CronJobsSection",
  props: {
    jobs: {},
    enabledJobs: {},
    disabledJobs: {},
    filteredJobs: {},
    searchQuery: {},
    filter: {},
    runningAction: {}
  },
  emits: ["update:searchQuery", "update:filter", "edit", "action"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    function o(c) {
      n("update:searchQuery", c.target.value);
    }
    function r(c, u) {
      n("action", { action: c, job: u });
    }
    return (c, u) => (g(), Ne(ae, {
      title: s(l).label("任务列表", "Job list"),
      eyebrow: "Jobs"
    }, {
      default: Y(() => [
        a("div", sm, [
          a("label", lm, [
            a("span", null, i(s(l).label("搜索", "Search")), 1),
            a("input", {
              value: e.searchQuery,
              "data-testid": "cron-search-input",
              class: "settings-input",
              type: "text",
              placeholder: s(l).label("搜索任务名、Agent、调度表达式", "Search by name, agent, or schedule"),
              onInput: o
            }, null, 40, am)
          ])
        ]),
        a("div", om, [
          a("button", {
            "data-testid": "cron-filter-all",
            class: re(["pill-button", { "pill-button--active": e.filter === "all" }]),
            type: "button",
            onClick: u[0] || (u[0] = (d) => c.$emit("update:filter", "all"))
          }, i(s(l).label(`全部 (${e.jobs.length})`, `All (${e.jobs.length})`)), 3),
          a("button", {
            "data-testid": "cron-filter-enabled",
            class: re(["pill-button", { "pill-button--active": e.filter === "enabled" }]),
            type: "button",
            onClick: u[1] || (u[1] = (d) => c.$emit("update:filter", "enabled"))
          }, i(s(l).label(`启用中 (${e.enabledJobs.length})`, `Enabled (${e.enabledJobs.length})`)), 3),
          a("button", {
            "data-testid": "cron-filter-disabled",
            class: re(["pill-button", { "pill-button--active": e.filter === "disabled" }]),
            type: "button",
            onClick: u[2] || (u[2] = (d) => c.$emit("update:filter", "disabled"))
          }, i(s(l).label(`已停用 (${e.disabledJobs.length})`, `Disabled (${e.disabledJobs.length})`)), 3)
        ]),
        e.filteredJobs.length ? (g(), m("div", im, [
          (g(!0), m(j, null, fe(e.filteredJobs, (d) => (g(), m("article", {
            key: d.id,
            class: "provider-card",
            "data-testid": "cron-job-card",
            "data-job-id": d.id
          }, [
            a("header", cm, [
              a("div", null, [
                a("strong", null, i(d.name || d.id), 1),
                a("p", null, i(`${d.id} · ${d.agentId}`), 1)
              ]),
              a("span", {
                class: re(["pill", s(vg)(d)])
              }, i(s(bg)(s(l), d)), 3)
            ]),
            a("div", um, [
              a("div", dm, [
                a("strong", null, i(s(l).label("调度", "Schedule")), 1),
                a("p", null, i(d.schedule || "-"), 1)
              ]),
              a("div", fm, [
                a("strong", null, i(s(l).label("任务消息", "Prompt")), 1),
                a("p", null, i(d.prompt || "-"), 1)
              ]),
              a("div", pm, [
                a("strong", null, i(s(l).label("最近执行", "Last run")), 1),
                a("p", null, i(s(Qe)(d.lastRunAt)), 1),
                a("p", null, i(s(l).label("下次执行：", "Next run: ")) + i(s(Qe)(d.nextRunAt)), 1)
              ])
            ]),
            a("div", hm, [
              a("button", {
                "data-testid": "cron-job-edit",
                class: "inline-link",
                type: "button",
                onClick: (f) => c.$emit("edit", d)
              }, i(s(l).label("编辑", "Edit")), 9, gm),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: e.runningAction === `run:${d.id}`,
                onClick: (f) => r("run", d)
              }, i(e.runningAction === `run:${d.id}` ? s(l).label("执行中…", "Running…") : s(l).label("立即运行", "Run now")), 9, mm),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: e.runningAction === `enable:${d.id}` || e.runningAction === `disable:${d.id}`,
                onClick: (f) => r(d.enabled ? "disable" : "enable", d)
              }, i(e.runningAction === `enable:${d.id}` || e.runningAction === `disable:${d.id}` ? s(l).label("处理中…", "Working…") : d.enabled ? s(l).label("停用", "Disable") : s(l).label("启用", "Enable")), 9, bm),
              a("button", {
                class: "inline-link inline-link--danger",
                type: "button",
                disabled: e.runningAction === `remove:${d.id}`,
                onClick: (f) => r("remove", d)
              }, i(e.runningAction === `remove:${d.id}` ? s(l).label("删除中…", "Deleting…") : s(l).label("删除", "Delete")), 9, vm)
            ])
          ], 8, rm))), 128))
        ])) : (g(), m("div", ym, i(s(l).label("当前筛选条件下没有匹配的任务。", "No cron jobs match the current filters.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), wm = { class: "stat-grid" }, km = { class: "stat-card" }, $m = { class: "stat-card__label" }, Cm = { class: "stat-card" }, Sm = { class: "stat-card__label" }, Am = { class: "stat-card" }, Rm = { class: "stat-card__label" }, xm = { class: "stat-card" }, Pm = { class: "stat-card__label" }, Tm = { class: "stat-card" }, Em = { class: "stat-card__label" }, Dm = { class: "stat-card" }, Mm = { class: "stat-card__label" }, Im = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Om = {
  key: 0,
  class: "code-panel"
}, Lm = {
  key: 1,
  class: "muted-copy"
}, Nm = { class: "list-stack" }, Um = {
  key: 0,
  class: "risk-row"
}, Fm = /* @__PURE__ */ $e({
  __name: "CronOverviewSection",
  props: {
    overview: {},
    enabledCount: {},
    disabledCount: {},
    error: {},
    lastAction: {}
  },
  setup(e) {
    const t = e, n = Ce(), l = D(
      () => gg(n, t.overview.status.enabled)
    ), o = D(
      () => mg(n, n.developerMode, t.overview.status)
    );
    return (r, c) => (g(), m(j, null, [
      H(ae, {
        title: s(n).label("运行概览", "Runtime overview"),
        eyebrow: "Overview"
      }, {
        default: Y(() => [
          a("div", wm, [
            a("article", km, [
              a("p", $m, i(s(n).label("任务总数", "Jobs")), 1),
              a("strong", null, i(s(he)(e.overview.jobs.length)) + " / " + i(s(he)(e.overview.total)), 1),
              a("span", null, i(s(n).label("当前已加载任务 / 运行态汇总总量", "Loaded jobs / runtime total")), 1)
            ]),
            a("article", Cm, [
              a("p", Sm, i(s(n).label("已启用", "Enabled")), 1),
              a("strong", null, i(s(he)(e.enabledCount)), 1),
              a("span", null, i(s(n).label("这些任务会按计划自动执行", "These jobs run on their schedule")), 1)
            ]),
            a("article", Am, [
              a("p", Rm, i(s(n).label("已停用", "Disabled")), 1),
              a("strong", null, i(s(he)(e.disabledCount)), 1),
              a("span", null, i(s(n).label("停用后仍会保留，之后可以重新开启", "Disabled jobs stay available and can be resumed later")), 1)
            ]),
            a("article", xm, [
              a("p", Pm, i(s(n).label("调度器状态", "Scheduler")), 1),
              a("strong", null, i(l.value), 1),
              a("span", null, i(o.value), 1)
            ]),
            a("article", Tm, [
              a("p", Em, i(s(n).label("运行态任务数", "Runtime job count")), 1),
              a("strong", null, i(s(he)(e.overview.status.jobsCount)), 1),
              a("span", null, i(s(n).label("来自 openclaw cron status 的运行态统计", "Reported directly by openclaw cron status")), 1)
            ]),
            a("article", Dm, [
              a("p", Mm, i(s(n).label("分页窗口", "Pagination window")), 1),
              a("strong", null, i(s(he)(e.overview.offset)) + " / " + i(s(he)(e.overview.limit)), 1),
              a("span", null, i(e.overview.hasMore ? s(n).label(
                `还有更多任务未加载，nextOffset=${e.overview.nextOffset ?? "-"}`,
                `More jobs remain, nextOffset=${e.overview.nextOffset ?? "-"}`
              ) : s(n).label("当前页已经完整。", "The current page is complete.")), 1)
            ])
          ]),
          e.error ? (g(), m("div", Im, i(s(n).label(
            "已保留上一版成功结果，同时后台刷新失败：",
            "The last successful result is still on screen, but the background refresh failed: "
          )) + i(e.error), 1)) : J("", !0)
        ]),
        _: 1
      }, 8, ["title"]),
      e.lastAction ? (g(), Ne(ae, {
        key: 0,
        title: s(n).label("最近一次任务动作", "Latest task action"),
        eyebrow: "Action"
      }, {
        default: Y(() => [
          a("div", {
            class: re(["status-banner", e.lastAction.tone === "success" ? "status-banner--success" : "status-banner--error"])
          }, [
            a("strong", null, i(e.lastAction.message), 1),
            a("span", null, i(s(Qe)(e.lastAction.at)), 1)
          ], 2),
          s(n).developerMode && e.lastAction.detail ? (g(), m("pre", Om, i(e.lastAction.detail), 1)) : e.lastAction.detail ? (g(), m("p", Lm, i(s(n).label(
            "最近一次任务动作的原始 detail 已收纳到开发者模式里。需要查看底层返回内容时，请先到 Settings 打开开发者模式。",
            "The raw detail from the latest task action now stays behind developer mode. Enable it from Settings if you need the underlying payload."
          )), 1)) : J("", !0)
        ]),
        _: 1
      }, 8, ["title"])) : J("", !0),
      e.overview.warnings.length || e.overview.hasMore ? (g(), Ne(ae, {
        key: 1,
        title: s(n).label("当前提醒", "Current warnings"),
        eyebrow: "Warnings"
      }, {
        default: Y(() => [
          a("div", Nm, [
            (g(!0), m(j, null, fe(e.overview.warnings, (u) => (g(), m("article", {
              key: u,
              class: "risk-row"
            }, [
              a("strong", null, i(s(n).label("注意事项", "Warning")), 1),
              a("span", null, i(u), 1)
            ]))), 128)),
            e.overview.hasMore ? (g(), m("article", Um, [
              a("strong", null, i(s(n).label("尚未完整加载", "More jobs exist")), 1),
              a("span", null, i(s(n).label(
                `当前只拉取到 ${e.overview.jobs.length} 条任务，运行态汇总显示总量为 ${e.overview.total}。`,
                `Only ${e.overview.jobs.length} jobs are loaded while the runtime reports ${e.overview.total} in total.`
              )), 1)
            ])) : J("", !0)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : J("", !0)
    ], 64));
  }
});
function Gm() {
  return Ee("/api/cron-ui");
}
function Bm(e) {
  return Oe("/api/cron-ui/create", e);
}
function Vm(e) {
  return Oe("/api/cron-ui/update", e);
}
function jm(e) {
  return Oe("/api/cron-ui/enable", { jobId: e });
}
function zm(e) {
  return Oe("/api/cron-ui/disable", { jobId: e });
}
function Wm(e) {
  return Oe("/api/cron-ui/run", { jobId: e });
}
function Hm(e) {
  return Oe("/api/cron-ui/remove", { jobId: e });
}
let po = null;
function Km() {
  const e = Ce(), t = it(), n = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F("all"), o = /* @__PURE__ */ F("create"), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(null), d = ct(() => Gm(), po, {
    immediate: !1
  }), f = /* @__PURE__ */ pt(_l());
  Te(
    () => d.data,
    (_) => {
      _ && (po = _);
    }
  ), nt(() => {
    d.execute({ silent: !!d.data });
  });
  const p = D(() => {
    var _;
    return ((_ = d.data) == null ? void 0 : _.jobs) || [];
  }), h = D(() => p.value.filter((_) => _.enabled)), v = D(() => p.value.filter((_) => !_.enabled)), b = D(() => {
    const _ = n.value.trim().toLowerCase();
    return p.value.filter((x) => l.value === "enabled" && !x.enabled || l.value === "disabled" && x.enabled ? !1 : _ ? [x.name, x.id, x.agentId, x.schedule, x.prompt, x.status].join(" ").toLowerCase().includes(_) : !0);
  });
  Te(p, () => {
    o.value === "edit" && !p.value.find((_) => _.id === r.value) && C();
  });
  function C() {
    o.value = "create", r.value = "", Object.assign(f, _l());
  }
  async function E() {
    await d.execute({ silent: !!d.data });
  }
  function R(_) {
    n.value = _;
  }
  function P(_) {
    l.value = _;
  }
  function $(_, x) {
    u.value = {
      tone: x,
      message: _.message,
      detail: _.output,
      at: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async function T(_, x = !1) {
    const S = _.success ? "success" : "error";
    $(_, S), t.pushToast({
      tone: S,
      message: _.message
    }), _.success && x && C(), await E();
  }
  async function U() {
    const _ = o.value === "edit" ? "update" : "create";
    c.value = _;
    try {
      const x = _g(f), S = o.value === "edit" ? await Vm({ jobId: r.value, ...x }) : await Bm(x);
      await T(S, S.success);
    } catch (x) {
      const S = x instanceof Error ? x.message : String(x);
      u.value = {
        tone: "error",
        message: S,
        at: (/* @__PURE__ */ new Date()).toISOString()
      }, t.pushToast({
        tone: "error",
        message: S
      });
    } finally {
      c.value = "";
    }
  }
  function I(_) {
    o.value = "edit", r.value = _.id, Object.assign(f, hg(_));
  }
  async function ee(_, x) {
    if (_ === "remove" && !await t.confirm({
      title: e.label("删除 Cron 任务", "Delete cron job"),
      message: e.label(`确认删除任务 ${x.id}？`, `Delete cron job ${x.id}?`),
      confirmLabel: e.label("确认删除", "Delete job"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    }))
      return;
    const S = `${_}:${x.id}`;
    c.value = S;
    try {
      const z = _ === "run" ? await Wm(x.id) : _ === "enable" ? await jm(x.id) : _ === "disable" ? await zm(x.id) : await Hm(x.id);
      await T(
        z,
        _ === "remove" && o.value === "edit" && r.value === x.id
      );
    } catch (z) {
      const ue = z instanceof Error ? z.message : String(z);
      u.value = {
        tone: "error",
        message: ue,
        at: (/* @__PURE__ */ new Date()).toISOString()
      }, t.pushToast({
        tone: "error",
        message: ue
      });
    } finally {
      c.value = "";
    }
  }
  return {
    resource: d,
    searchQuery: n,
    filter: l,
    editorMode: o,
    editingJobId: r,
    runningAction: c,
    lastAction: u,
    draft: f,
    jobs: p,
    enabledJobs: h,
    disabledJobs: v,
    filteredJobs: b,
    refresh: E,
    setSearchQuery: R,
    setFilter: P,
    resetEditor: C,
    handleSubmit: U,
    startEdit: I,
    handleJobAction: ee
  };
}
const qm = { class: "page-stack" }, Jm = { class: "page-header" }, Qm = { class: "page-header__eyebrow" }, Ym = { class: "page-header__title" }, Zm = { class: "page-header__description" }, Xm = {
  key: 0,
  class: "page-empty"
}, eb = {
  key: 1,
  class: "page-empty page-empty--error"
}, tb = { class: "page-split" }, nb = /* @__PURE__ */ $e({
  __name: "CronPage",
  setup(e) {
    const t = Ce(), {
      resource: n,
      searchQuery: l,
      filter: o,
      editorMode: r,
      editingJobId: c,
      runningAction: u,
      lastAction: d,
      draft: f,
      jobs: p,
      enabledJobs: h,
      disabledJobs: v,
      filteredJobs: b,
      refresh: C,
      setSearchQuery: E,
      setFilter: R,
      resetEditor: P,
      handleSubmit: $,
      startEdit: T,
      handleJobAction: U
    } = Km();
    return (I, ee) => (g(), m("div", qm, [
      a("header", Jm, [
        a("div", null, [
          a("p", Qm, i(s(t).label("自动化 / Cron", "Automation / Cron")), 1),
          a("h2", Ym, i(s(t).label("自动化任务", "Automation jobs")), 1),
          a("p", Zm, i(s(t).label(
            "把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。",
            "Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend."
          )), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: ee[0] || (ee[0] = //@ts-ignore
          (..._) => s(C) && s(C)(..._))
        }, i(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新任务状态", "Refresh jobs")), 1)
      ]),
      s(n).loading && !s(n).data ? (g(), m("div", Xm, i(s(t).label("正在读取 Cron 状态与任务列表…", "Loading cron status and jobs…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", eb, i(s(n).error), 1)) : s(n).data ? (g(), m(j, { key: 2 }, [
        H(Fm, {
          overview: s(n).data,
          "enabled-count": s(h).length,
          "disabled-count": s(v).length,
          error: s(n).error,
          "last-action": s(d)
        }, null, 8, ["overview", "enabled-count", "disabled-count", "error", "last-action"]),
        a("div", tb, [
          H(nm, {
            draft: s(f),
            "editor-mode": s(r),
            "editing-job-id": s(c),
            "running-action": s(u),
            onSubmit: s($),
            onReset: s(P)
          }, null, 8, ["draft", "editor-mode", "editing-job-id", "running-action", "onSubmit", "onReset"]),
          H(_m, {
            jobs: s(p),
            "enabled-jobs": s(h),
            "disabled-jobs": s(v),
            "filtered-jobs": s(b),
            "search-query": s(l),
            filter: s(o),
            "running-action": s(u),
            "onUpdate:searchQuery": s(E),
            "onUpdate:filter": s(R),
            onEdit: s(T),
            onAction: ee[1] || (ee[1] = (_) => s(U)(_.action, _.job))
          }, null, 8, ["jobs", "enabled-jobs", "disabled-jobs", "filtered-jobs", "search-query", "filter", "running-action", "onUpdate:searchQuery", "onUpdate:filter", "onEdit"])
        ])
      ], 64)) : J("", !0)
    ]));
  }
});
async function sb() {
  const [e, t, n, l] = await Promise.all([
    Ee("/api/info"),
    Ee("/api/dashboard/overview"),
    Ee("/api/service/status"),
    Ee("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: n, openclaw: l };
}
async function lb() {
  const [e, t] = await Promise.all([
    Ee("/api/service/status"),
    Ee("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function ab() {
  const [e, t] = await Promise.all([
    Ee("/api/openclaw/status"),
    Ee("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const ob = { class: "page-stack" }, ib = { class: "page-header" }, rb = { class: "page-header__eyebrow" }, cb = { class: "page-header__title" }, ub = { class: "page-header__description" }, db = {
  key: 0,
  class: "page-empty"
}, fb = {
  key: 1,
  class: "page-empty page-empty--error"
}, pb = {
  key: 0,
  class: "status-banner status-banner--warning"
}, hb = { class: "stat-grid" }, gb = { class: "stat-card" }, mb = { class: "stat-card" }, bb = { class: "stat-card" }, vb = { class: "stat-card__label" }, yb = { class: "list-stack" }, _b = { class: "action-row" }, wb = { class: "action-row" }, kb = { class: "action-row" }, $b = { class: "action-row" }, Cb = {
  key: 0,
  class: "list-stack"
}, Sb = {
  key: 1,
  class: "muted-copy"
}, Ab = /* @__PURE__ */ $e({
  __name: "DashboardPage",
  setup(e) {
    let t = null;
    const n = Ce(), l = ct(() => sb(), t, { immediate: !1 }), o = D(() => {
      var c, u;
      const r = (u = (c = l.data) == null ? void 0 : c.overview) == null ? void 0 : u.risks;
      return Array.isArray(r) ? r : [];
    });
    return Te(() => l.data, (r) => {
      r && (t = r);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (r, c) => (g(), m("div", ob, [
      a("header", ib, [
        a("div", null, [
          a("p", rb, i(s(n).label("首页 / 总览", "Home / Overview")), 1),
          a("h2", cb, i(s(n).label("带路首页", "Guided Home")), 1),
          a("p", ub, i(s(n).label("从这里完成最常用的四条主路径：确认运行、配置模型、连接渠道、开启备份与恢复。", "Use this page to walk the four main paths: confirm runtime health, configure models, connect channels, and turn on backup and recovery.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: c[0] || (c[0] = (u) => s(l).execute({ silent: !0 }))
        }, i(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", db, i(s(n).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", fb, i(s(l).error), 1)) : s(l).data ? (g(), m(j, { key: 2 }, [
        s(l).error ? (g(), m("div", pb, i(s(n).label("已保留上一版首页快照，但后台刷新失败：", "The last home snapshot is still on screen, but the background refresh failed: ")) + i(s(l).error), 1)) : J("", !0),
        H(ae, {
          title: s(n).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: Y(() => {
            var u, d, f, p, h, v, b, C, E, R;
            return [
              a("div", hb, [
                a("article", gb, [
                  c[1] || (c[1] = a("p", { class: "stat-card__label" }, "Guard", -1)),
                  a("strong", null, i(((u = s(l).data.info) == null ? void 0 : u.guardVersion) || "unknown"), 1),
                  a("span", null, i(((d = s(l).data.info) == null ? void 0 : d.platform) || "unknown platform"), 1)
                ]),
                a("article", mb, [
                  c[2] || (c[2] = a("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  a("strong", null, i((p = (f = s(l).data.info) == null ? void 0 : f.openclaw) != null && p.installed ? ((v = (h = s(l).data.info) == null ? void 0 : h.openclaw) == null ? void 0 : v.version) || "installed" : s(n).label("未安装", "Not installed")), 1),
                  a("span", null, i(((C = (b = s(l).data.info) == null ? void 0 : b.openclaw) == null ? void 0 : C.detectedSource) || s(n).label("待检测", "Pending detection")), 1)
                ]),
                a("article", bb, [
                  a("p", vb, i(s(n).label("Node 运行时", "Node runtime")), 1),
                  a("strong", null, i(((E = s(l).data.info) == null ? void 0 : E.nodeVersion) || "unknown"), 1),
                  a("span", null, i(((R = s(l).data.info) == null ? void 0 : R.user) || s(n).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(n).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: Y(() => [
            a("div", yb, [
              a("article", _b, [
                a("div", null, [
                  a("h3", null, i(s(n).label("先确认运行状态", "Review runtime health first")), 1),
                  a("p", null, i(s(n).label("先确认 Guard Web、OpenClaw 和后台服务都在线，再继续模型、渠道或恢复配置会更稳妥。", "Check Guard Web, OpenClaw, and background services first so the rest of your setup starts from a healthy base.")), 1)
                ]),
                H(s(xt), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: Y(() => [
                    ft(i(s(n).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              a("article", wb, [
                a("div", null, [
                  a("h3", null, i(s(n).label("先接好模型", "Connect your models")), 1),
                  a("p", null, i(s(n).label("先把主模型和回退模型配置好，后面的渠道接入和运行排查会更顺。", "Configure your primary and fallback models first so channel setup and troubleshooting stay predictable.")), 1)
                ]),
                H(s(xt), {
                  class: "inline-link",
                  to: "/models"
                }, {
                  default: Y(() => [
                    ft(i(s(n).label("打开模型页", "Open models")), 1)
                  ]),
                  _: 1
                })
              ]),
              a("article", kb, [
                a("div", null, [
                  a("h3", null, i(s(n).label("再连接渠道", "Connect your channels")), 1),
                  a("p", null, i(s(n).label("完成渠道接线后，Guard 才能真正把模型能力接到实际使用场景里。", "Once channels are configured, Guard can bring model capability into the real usage flow.")), 1)
                ]),
                H(s(xt), {
                  class: "inline-link",
                  to: "/channels"
                }, {
                  default: Y(() => [
                    ft(i(s(n).label("打开渠道页", "Open channels")), 1)
                  ]),
                  _: 1
                })
              ]),
              a("article", $b, [
                a("div", null, [
                  a("h3", null, i(s(n).label("最后补齐备份保护", "Finish backup protection")), 1),
                  a("p", null, i(s(n).label("优先创建首个恢复点并接好云端保护，这样后续试错时更容易保住现场，也方便快速回到之前的状态。", "Create the first recovery point and connect cloud protection so later experiments stay recoverable and easier to rewind.")), 1)
                ]),
                H(s(xt), {
                  class: "inline-link",
                  to: "/recovery"
                }, {
                  default: Y(() => [
                    ft(i(s(n).label("打开备份与恢复", "Open backup & recovery")), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(n).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: Y(() => [
            o.value.length ? (g(), m("div", Cb, [
              (g(!0), m(j, null, fe(o.value, (u, d) => (g(), m("article", {
                key: `${u.title}-${d}`,
                class: "risk-row"
              }, [
                a("strong", null, i(u.title || s(n).label("未命名风险", "Unnamed risk")), 1),
                a("span", null, i(u.detail || s(n).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (g(), m("p", Sb, i(s(n).label("当前还没有结构化风险提示。若要做更细的运行或安全检查，可以继续查看运维页和安全页。", "No structured risk items are available right now. For a deeper health or safety review, continue to Operations and Security.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : J("", !0)
    ]));
  }
}), Rb = {
  class: "page-tabs",
  role: "tablist"
}, xb = ["data-tab-id", "aria-selected", "onClick"], Pb = { key: 0 }, Os = /* @__PURE__ */ $e({
  __name: "PageTabs",
  props: {
    items: {},
    activeId: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = t;
    return (l, o) => (g(), m("div", Rb, [
      (g(!0), m(j, null, fe(e.items, (r) => (g(), m("button", {
        key: r.id,
        class: re(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
        "data-tab-id": r.id,
        type: "button",
        role: "tab",
        "aria-selected": r.id === e.activeId,
        onClick: (c) => n("change", r.id)
      }, [
        a("span", null, i(r.label), 1),
        r.hint ? (g(), m("small", Pb, i(r.hint), 1)) : J("", !0)
      ], 10, xb))), 128))
    ]));
  }
}), Tb = {
  key: 0,
  class: "page-empty"
}, Eb = { class: "mini-list" }, Db = { class: "mini-list__item mini-list__item--stack" }, Mb = { class: "provider-card__header" }, Ib = { key: 0 }, Ob = { class: "page-actions" }, Lb = ["disabled"], Nb = ["value"], Ub = {
  key: 2,
  class: "page-empty"
}, Fb = /* @__PURE__ */ $e({
  __name: "FileEditorSection",
  props: {
    editorLoading: { type: Boolean },
    currentFile: {},
    draft: {},
    fileDirty: { type: Boolean },
    saving: { type: Boolean }
  },
  emits: ["reload", "save", "update:draft"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    function o(r) {
      n("update:draft", r.target.value);
    }
    return (r, c) => (g(), Ne(ae, {
      title: s(l).label("文件编辑器", "File editor"),
      eyebrow: "Editor"
    }, {
      default: Y(() => [
        e.editorLoading ? (g(), m("div", Tb, i(s(l).label("正在读取文件内容…", "Loading file content…")), 1)) : e.currentFile ? (g(), m(j, { key: 1 }, [
          a("div", Eb, [
            a("div", Db, [
              a("div", Mb, [
                a("strong", null, i(e.currentFile.relativePath || e.currentFile.path), 1),
                a("span", {
                  "data-testid": "file-editor-state",
                  class: re(["pill", e.fileDirty ? "pill--warning" : "pill--success"])
                }, i(e.fileDirty ? s(l).label("未保存", "Unsaved") : s(l).label("已保存", "Saved")), 3)
              ]),
              a("p", null, i(e.currentFile.path), 1),
              e.currentFile.truncated ? (g(), m("p", Ib, i(s(l).label("文件内容过长，当前只预览了前一部分。", "This file is large, so only the first portion is loaded for preview and editing.")), 1)) : J("", !0)
            ])
          ]),
          a("div", Ob, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: c[0] || (c[0] = (u) => r.$emit("reload"))
            }, i(s(l).label("重新读取", "Reload")), 1),
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.saving,
              onClick: c[1] || (c[1] = (u) => r.$emit("save"))
            }, i(e.saving ? s(l).label("保存中…", "Saving…") : s(l).label("保存文件", "Save file")), 9, Lb)
          ]),
          a("textarea", {
            value: e.draft,
            "data-testid": "file-editor-textarea",
            class: "settings-textarea settings-textarea--editor",
            rows: "22",
            onInput: o
          }, null, 40, Nb)
        ], 64)) : (g(), m("div", Ub, i(s(l).label("先从左侧选择一个文件，再在这里查看或编辑。", "Select a file from the left side first, then view or edit it here.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), Gb = {
  key: 0,
  class: "stat-grid"
}, Bb = { class: "stat-card" }, Vb = { class: "stat-card__label" }, jb = { class: "stat-card" }, zb = { class: "stat-card__label" }, Wb = { class: "stat-card" }, Hb = { class: "stat-card__label" }, Kb = { class: "stat-card" }, qb = { class: "stat-card__label" }, Jb = {
  key: 1,
  class: "stat-grid"
}, Qb = { class: "stat-card" }, Yb = { class: "stat-card__label" }, Zb = { class: "stat-card" }, Xb = { class: "stat-card__label" }, ev = { class: "stat-card" }, tv = { class: "stat-card__label" }, nv = { class: "stat-card" }, sv = { class: "stat-card__label" }, lv = /* @__PURE__ */ $e({
  __name: "FilesOverviewSection",
  props: {
    mode: {},
    rootsCount: {},
    selectedRootLabel: {},
    entriesCount: {},
    directoryCount: {},
    regularFileCount: {},
    currentFileLabel: {},
    currentPath: {},
    selectedRootType: {},
    memoryFilesCount: {},
    memoryDocsCount: {},
    memoryNotesCount: {},
    memoryGroupsCount: {},
    filteredMemoryFilesCount: {},
    memoryFilterLabel: {},
    memoryFilterQuery: {},
    currentMemoryLabel: {}
  },
  setup(e) {
    const t = e, n = Ce(), l = D(() => t.mode === "all");
    return (o, r) => (g(), Ne(ae, {
      title: l.value ? s(n).label("当前目录概览", "Current directory overview") : s(n).label("核心记忆概览", "Core memory overview"),
      eyebrow: "Summary"
    }, {
      default: Y(() => [
        l.value ? (g(), m("div", Gb, [
          a("article", Bb, [
            a("p", Vb, i(s(n).label("受控根目录", "Managed roots")), 1),
            a("strong", null, i(s(he)(e.rootsCount)), 1),
            a("span", null, i(e.selectedRootLabel || s(n).label("当前正在受控范围内浏览", "Browsing inside the managed scope now")), 1)
          ]),
          a("article", jb, [
            a("p", zb, i(s(n).label("当前目录内容", "Current entries")), 1),
            a("strong", null, i(s(he)(e.entriesCount)), 1),
            a("span", null, i(`${s(he)(e.directoryCount)} ${s(n).label("个目录", "dirs")} / ${s(he)(e.regularFileCount)} ${s(n).label("个文件", "files")}`), 1)
          ]),
          a("article", Wb, [
            a("p", Hb, i(s(n).label("当前打开文件", "Open file")), 1),
            a("strong", null, i(e.currentFileLabel ? "1" : "0"), 1),
            a("span", null, i(e.currentFileLabel || s(n).label("还没有打开文件", "No file opened yet")), 1)
          ]),
          a("article", Kb, [
            a("p", qb, i(s(n).label("当前路径", "Current path")), 1),
            a("strong", null, i(e.selectedRootType === "detected-workspace" ? s(n).label("自动发现", "Auto-detected") : s(n).label("受控目录", "Managed")), 1),
            a("span", null, i(e.currentPath || s(n).label("等待路径返回", "Waiting for a resolved path")), 1)
          ])
        ])) : (g(), m("div", Jb, [
          a("article", Qb, [
            a("p", Yb, i(s(n).label("记忆文件数", "Memory files")), 1),
            a("strong", null, i(s(he)(e.memoryFilesCount)), 1),
            a("span", null, i(`${s(he)(e.memoryDocsCount)} ${s(n).label("个核心文档", "core docs")} / ${s(he)(e.memoryNotesCount)} ${s(n).label("个记忆片段", "memory notes")}`), 1)
          ]),
          a("article", Zb, [
            a("p", Xb, i(s(n).label("覆盖角色", "Covered roles")), 1),
            a("strong", null, i(s(he)(e.memoryGroupsCount)), 1),
            a("span", null, i(s(n).label("包含可管理记忆文件的角色或工作区", "Roles or workspaces that already have managed memory files")), 1)
          ]),
          a("article", ev, [
            a("p", tv, i(s(n).label("当前显示", "Visible now")), 1),
            a("strong", null, i(s(he)(e.filteredMemoryFilesCount)), 1),
            a("span", null, i(`${e.memoryFilterLabel} / ${e.memoryFilterQuery || s(n).label("未设置搜索词", "No search query")}`), 1)
          ]),
          a("article", nv, [
            a("p", sv, i(s(n).label("当前打开", "Current file")), 1),
            a("strong", null, i(e.currentMemoryLabel ? "1" : "0"), 1),
            a("span", null, i(e.currentMemoryLabel || s(n).label("还没有打开记忆文件", "No memory file opened yet")), 1)
          ])
        ]))
      ]),
      _: 1
    }, 8, ["title"]));
  }
});
function wl(e) {
  const t = String(e || "").replace(/\\/g, "/"), n = t.split("/").pop() || "";
  return ["SOUL.md", "USER.md", "AGENTS.md", "MEMORY.md"].includes(n) ? !0 : /\/memory\/.+\.md$/i.test(t);
}
function Nn(e) {
  const t = String(e || "").replace(/[\\/]+$/, "");
  if (!t) return "";
  const n = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return n >= 0 ? t.slice(0, n) : "";
}
const Ls = /* @__PURE__ */ Jn("workspace", () => {
  const e = /* @__PURE__ */ F("all"), t = /* @__PURE__ */ F(""), n = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F("all"), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(null);
  function d(P) {
    e.value = P;
  }
  function f(P) {
    t.value = P;
  }
  function p(P) {
    n.value = P, P && (t.value = Nn(P) || t.value);
  }
  function h(P) {
    l.value = P;
  }
  function v(P) {
    o.value = P;
  }
  function b(P) {
    r.value = P;
  }
  function C(P) {
    c.value = P;
  }
  function E(P) {
    const $ = wl(P) ? "memory" : "all";
    u.value = {
      path: P,
      mode: $,
      parentPath: Nn(P)
    }, e.value = $, $ === "memory" ? l.value = P : (n.value = P, t.value = Nn(P) || t.value);
  }
  function R() {
    const P = u.value;
    return u.value = null, P;
  }
  return {
    mode: e,
    currentPath: t,
    selectedFilePath: n,
    selectedMemoryFilePath: l,
    memoryKindFilter: o,
    memoryFilterQuery: r,
    searchQuery: c,
    pendingReveal: u,
    setMode: d,
    setCurrentPath: f,
    setSelectedFilePath: p,
    setSelectedMemoryFilePath: h,
    setMemoryKindFilter: v,
    setMemoryFilterQuery: b,
    setSearchQuery: C,
    requestReveal: E,
    consumeReveal: R
  };
}), av = { class: "settings-field" }, ov = ["value", "placeholder"], iv = { class: "pill-row" }, rv = ["onClick"], cv = { class: "muted-copy" }, uv = {
  key: 0,
  class: "page-empty"
}, dv = {
  key: 1,
  class: "provider-stack"
}, fv = { class: "provider-card__header" }, pv = { key: 0 }, hv = { class: "pill-row" }, gv = { class: "pill pill--info" }, mv = { class: "pill pill--muted" }, bv = { class: "pill pill--muted" }, vv = { class: "directory-list" }, yv = ["onClick"], _v = { class: "entry-button__title" }, wv = { class: "pill-row" }, kv = { class: "pill pill--muted" }, $v = {
  key: 2,
  class: "page-empty"
}, Cv = /* @__PURE__ */ $e({
  __name: "MemoryCatalogSection",
  props: {
    groups: {},
    filteredCount: {},
    totalCount: {},
    currentMemoryPath: {},
    loading: { type: Boolean },
    getMemoryFilterLabel: { type: Function },
    getMemoryFileKind: { type: Function },
    renderMemoryLabel: { type: Function }
  },
  emits: ["update-kind", "open-memory-file"],
  setup(e, { emit: t }) {
    const n = t, l = Ce(), o = Ls();
    function r(c) {
      o.setMemoryFilterQuery(c.target.value);
    }
    return (c, u) => (g(), Ne(ae, {
      title: s(l).label("记忆目录", "Memory catalog"),
      eyebrow: "Catalog"
    }, {
      default: Y(() => [
        a("div", av, [
          a("span", null, i(s(l).label("筛选", "Filter")), 1),
          a("input", {
            value: s(o).memoryFilterQuery,
            class: "settings-input",
            type: "text",
            placeholder: s(l).label("搜索 Agent / 文件名 / 路径", "Filter by agent / file / path"),
            onInput: r
          }, null, 40, ov)
        ]),
        a("div", iv, [
          (g(), m(j, null, fe(["all", "docs", "notes"], (d) => a("button", {
            key: d,
            class: re(["pill-button", { "pill-button--active": s(o).memoryKindFilter === d }]),
            type: "button",
            onClick: (f) => n("update-kind", d)
          }, [
            a("span", null, i(e.getMemoryFilterLabel(d)), 1)
          ], 10, rv)), 64))
        ]),
        a("p", cv, i(s(l).label(
          `当前显示 ${s(he)(e.filteredCount)} / ${s(he)(e.totalCount)} 个记忆文件。`,
          `Showing ${s(he)(e.filteredCount)} of ${s(he)(e.totalCount)} memory files.`
        )), 1),
        e.loading ? (g(), m("div", uv, i(s(l).label("正在读取记忆目录…", "Loading the memory catalog…")), 1)) : e.groups.length ? (g(), m("div", dv, [
          (g(!0), m(j, null, fe(e.groups, (d) => (g(), m("article", {
            key: d.agentId,
            class: "provider-card"
          }, [
            a("header", fv, [
              a("div", null, [
                a("strong", null, i(d.label), 1),
                d.label !== d.agentId ? (g(), m("p", pv, i(d.agentId), 1)) : J("", !0)
              ]),
              a("div", hv, [
                a("span", gv, i(s(he)(d.files.length)), 1),
                a("span", mv, i(`${e.getMemoryFilterLabel("docs")} ${s(he)(d.docsCount)}`), 1),
                a("span", bv, i(`${e.getMemoryFilterLabel("notes")} ${s(he)(d.notesCount)}`), 1)
              ])
            ]),
            a("div", vv, [
              (g(!0), m(j, null, fe(d.files, (f) => (g(), m("button", {
                key: f.path,
                class: re(["entry-button", { "entry-button--active": e.currentMemoryPath === f.path }]),
                "data-entry-kind": "memory",
                type: "button",
                onClick: (p) => n("open-memory-file", f.path)
              }, [
                a("div", _v, [
                  a("strong", null, i(e.renderMemoryLabel(f)), 1)
                ]),
                a("p", null, i(f.relativePath || f.path), 1),
                a("div", wv, [
                  a("span", {
                    class: re(["pill", e.getMemoryFileKind(f) === "docs" ? "pill--info" : "pill--success"])
                  }, i(e.getMemoryFilterLabel(e.getMemoryFileKind(f))), 3),
                  a("span", kv, i(s(Qe)(f.modifiedAt)), 1)
                ])
              ], 10, yv))), 128))
            ])
          ]))), 128))
        ])) : (g(), m("div", $v, i(s(l).label("当前筛选条件下没有匹配的核心记忆文件。", "No core memory files match the current filter.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), Sv = {
  key: 0,
  class: "page-empty"
}, Av = { class: "mini-list" }, Rv = { class: "mini-list__item mini-list__item--stack" }, xv = { class: "provider-card__header" }, Pv = { class: "page-actions" }, Tv = ["disabled"], Ev = ["value"], Dv = {
  key: 2,
  class: "page-empty"
}, Mv = /* @__PURE__ */ $e({
  __name: "MemoryEditorSection",
  props: {
    editorLoading: { type: Boolean },
    currentMemoryFile: {},
    draft: {},
    memoryDirty: { type: Boolean },
    saving: { type: Boolean }
  },
  emits: ["reload", "reveal", "save", "update:draft"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    function o(r) {
      n("update:draft", r.target.value);
    }
    return (r, c) => (g(), Ne(ae, {
      title: s(l).label("记忆编辑器", "Memory editor"),
      eyebrow: "Editor"
    }, {
      default: Y(() => [
        e.editorLoading ? (g(), m("div", Sv, i(s(l).label("正在读取记忆文件…", "Loading the memory file…")), 1)) : e.currentMemoryFile ? (g(), m(j, { key: 1 }, [
          a("div", Av, [
            a("div", Rv, [
              a("div", xv, [
                a("strong", null, i(e.currentMemoryFile.relativePath || e.currentMemoryFile.path), 1),
                a("span", {
                  "data-testid": "memory-editor-state",
                  class: re(["pill", e.memoryDirty ? "pill--warning" : "pill--success"])
                }, i(e.memoryDirty ? s(l).label("未保存", "Unsaved") : s(l).label("已保存", "Saved")), 3)
              ]),
              a("p", null, i(e.currentMemoryFile.path), 1),
              a("p", null, i(s(l).label("修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。", "Save after editing. These files directly affect role behavior, persona, and long-term memory.")), 1)
            ])
          ]),
          a("div", Pv, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: c[0] || (c[0] = (u) => r.$emit("reload"))
            }, i(s(l).label("重新读取", "Reload")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: c[1] || (c[1] = (u) => r.$emit("reveal"))
            }, i(s(l).label("在全部文件中定位", "Reveal in all files")), 1),
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.saving,
              onClick: c[2] || (c[2] = (u) => r.$emit("save"))
            }, i(e.saving ? s(l).label("保存中…", "Saving…") : s(l).label("保存记忆文件", "Save memory file")), 9, Tv)
          ]),
          a("textarea", {
            value: e.draft,
            "data-testid": "memory-editor-textarea",
            class: "settings-textarea settings-textarea--editor",
            rows: "22",
            onInput: o
          }, null, 40, Ev)
        ], 64)) : (g(), m("div", Dv, i(s(l).label("先从左侧选择一个记忆文件，再在这里查看或编辑。", "Select a memory file from the left side first, then view or edit it here.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), Iv = { class: "list-stack" }, Ov = { class: "catalog-list" }, Lv = ["data-root-id", "onClick"], Nv = { class: "catalog-list__title" }, Uv = { class: "pill-row" }, Fv = { class: "pill pill--info" }, Gv = { class: "mini-list" }, Bv = { class: "mini-list__item mini-list__item--stack" }, Vv = { class: "page-actions" }, jv = ["disabled"], zv = { class: "create-row" }, Wv = ["value"], Hv = { value: "file" }, Kv = { value: "directory" }, qv = ["value", "placeholder"], Jv = ["disabled"], Qv = {
  key: 0,
  class: "directory-list"
}, Yv = ["data-entry-kind", "onClick"], Zv = { class: "entry-button__title" }, Xv = { class: "pill-row" }, ey = { class: "pill pill--muted" }, ty = {
  key: 1,
  class: "page-empty"
}, ny = /* @__PURE__ */ $e({
  __name: "WorkspaceBrowserSection",
  props: {
    roots: {},
    currentPath: {},
    parentPath: {},
    currentFilePath: {},
    entries: {},
    createKind: {},
    createName: {},
    directoryLoading: { type: Boolean },
    creating: { type: Boolean }
  },
  emits: ["open-root", "open-entry", "go-up", "reload", "update:createKind", "update:createName", "create"],
  setup(e, { emit: t }) {
    const n = e, l = t, o = Ce();
    function r(d) {
      return n.currentPath === d.path || n.currentPath.startsWith(`${d.path}\\`) || n.currentPath.startsWith(`${d.path}/`);
    }
    function c(d) {
      l("update:createKind", d.target.value === "directory" ? "directory" : "file");
    }
    function u(d) {
      l("update:createName", d.target.value);
    }
    return (d, f) => (g(), Ne(ae, {
      title: s(o).label("工作区浏览器", "Workspace browser"),
      eyebrow: "Browser"
    }, {
      default: Y(() => [
        a("div", Iv, [
          a("div", Ov, [
            (g(!0), m(j, null, fe(e.roots, (p) => (g(), m("button", {
              key: p.id,
              class: re(["catalog-list__item", { "catalog-list__item--active": r(p) }]),
              "data-root-id": p.id,
              type: "button",
              onClick: (h) => d.$emit("open-root", p.path)
            }, [
              a("div", Nv, [
                a("strong", null, i(p.label), 1)
              ]),
              a("div", Uv, [
                a("span", Fv, i(p.type), 1)
              ])
            ], 10, Lv))), 128))
          ]),
          a("div", Gv, [
            a("div", Bv, [
              a("strong", null, i(s(o).label("当前路径", "Current path")), 1),
              a("p", null, i(e.currentPath || "-"), 1)
            ])
          ]),
          a("div", Vv, [
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: !e.parentPath,
              onClick: f[0] || (f[0] = (p) => d.$emit("go-up"))
            }, i(s(o).label("返回上一级", "Go up")), 9, jv),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: f[1] || (f[1] = (p) => d.$emit("reload"))
            }, i(e.directoryLoading ? s(o).label("刷新中…", "Refreshing…") : s(o).label("刷新目录", "Reload list")), 1)
          ]),
          a("div", zv, [
            a("select", {
              value: e.createKind,
              class: "settings-input create-row__kind",
              onChange: c
            }, [
              a("option", Hv, i(s(o).label("文件", "File")), 1),
              a("option", Kv, i(s(o).label("目录", "Directory")), 1)
            ], 40, Wv),
            a("input", {
              value: e.createName,
              class: "settings-input",
              type: "text",
              placeholder: s(o).label("例如：README-local.md 或 drafts", "Example: README-local.md or drafts"),
              onInput: u,
              onKeydown: f[2] || (f[2] = Du(kn((p) => d.$emit("create"), ["prevent"]), ["enter"]))
            }, null, 40, qv),
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.creating,
              onClick: f[3] || (f[3] = (p) => d.$emit("create"))
            }, i(e.creating ? s(o).label("创建中…", "Creating…") : s(o).label("创建", "Create")), 9, Jv)
          ]),
          e.entries.length ? (g(), m("div", Qv, [
            (g(!0), m(j, null, fe(e.entries, (p) => (g(), m("button", {
              key: p.path,
              class: re(["entry-button", { "entry-button--active": e.currentFilePath === p.path }]),
              "data-entry-kind": p.isDirectory ? "directory" : "file",
              type: "button",
              onClick: (h) => d.$emit("open-entry", p)
            }, [
              a("div", Zv, [
                a("strong", null, i(p.isDirectory ? `${s(o).label("[目录]", "[DIR]")} ${p.name}` : p.name), 1)
              ]),
              a("p", null, i(p.relativePath || p.path), 1),
              a("div", Xv, [
                a("span", {
                  class: re(["pill", p.isDirectory ? "pill--info" : "pill--muted"])
                }, i(p.isDirectory ? s(o).label("目录", "Directory") : s(Xh)(p.size)), 3),
                a("span", ey, i(s(Qe)(p.modifiedAt)), 1)
              ])
            ], 10, Yv))), 128))
          ])) : (g(), m("div", ty, i(s(o).label("当前目录下还没有可展示内容。", "The current directory does not contain any visible entries yet.")), 1))
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
});
function cn(e) {
  return e.replace(/\r\n/g, `
`);
}
function Lt(e) {
  return e.type === "memory" ? "notes" : "docs";
}
function sy(e, t) {
  return t === "docs" ? e.label("核心文档", "Core docs") : t === "notes" ? e.label("记忆片段", "Memory notes") : e.label("全部", "All");
}
function ly(e, t) {
  if (!t) return e.label("未分组", "Ungrouped");
  if (!t.startsWith("detected:")) return t;
  const n = t.slice(9) || "workspace";
  return e.label(`自动发现：${n}`, `Auto-detected: ${n}`);
}
function Zs(e) {
  if (e.type === "memory") {
    const t = e.relativePath.split(/[\\/]/);
    return t[t.length - 1] || e.relativePath;
  }
  return e.type;
}
function ay(e) {
  const t = new URLSearchParams();
  e && t.set("path", e);
  const n = t.size ? `?${t.toString()}` : "";
  return Ee(`/api/files${n}`);
}
function ho(e) {
  const t = new URLSearchParams({ path: e });
  return Ee(`/api/files/content?${t.toString()}`);
}
function oy(e, t) {
  return Oe("/api/files/content", {
    path: e,
    content: t
  });
}
function iy(e, t, n) {
  return Oe("/api/files/create", {
    parentPath: e,
    name: t,
    kind: n
  });
}
function ry() {
  return Ee("/api/memory");
}
function cy() {
  const e = Ce(), t = it(), n = Ls(), l = /* @__PURE__ */ F(!0), o = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F([]), h = /* @__PURE__ */ F(null), v = /* @__PURE__ */ F(""), b = /* @__PURE__ */ F(""), C = /* @__PURE__ */ F(null), E = /* @__PURE__ */ F(""), R = /* @__PURE__ */ F(""), P = /* @__PURE__ */ F(!1), $ = /* @__PURE__ */ F(!1), T = /* @__PURE__ */ F("file"), U = /* @__PURE__ */ F(""), I = D(() => [
    {
      id: "all",
      label: e.label("全部文件", "All files"),
      hint: e.label("浏览受 Guard 管理的工作区目录", "Browse Guard-managed workspace directories")
    },
    {
      id: "memory",
      label: e.label("核心记忆", "Core memory"),
      hint: e.label("集中查看 SOUL / USER / AGENTS / MEMORY 与 memory/", "Focus on SOUL / USER / AGENTS / MEMORY and memory/")
    }
  ]), ee = D(
    () => n.mode === "memory" ? d.value : u.value
  ), _ = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.roots) || [];
  }), x = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.entries) || [];
  }), S = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.currentPath) || n.currentPath;
  }), z = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.parentPath) || null;
  }), ue = D(
    () => _.value.filter(
      (M) => S.value === M.path || S.value.startsWith(`${M.path}\\`) || S.value.startsWith(`${M.path}/`)
    ).sort((M, ce) => ce.path.length - M.path.length)[0] || null
  ), de = D(
    () => x.value.filter((M) => M.isDirectory).length
  ), le = D(() => x.value.length - de.value), Z = D(() => p.value), Ue = D(() => {
    const M = n.memoryFilterQuery.trim().toLowerCase();
    return Z.value.filter((ce) => n.memoryKindFilter !== "all" && Lt(ce) !== n.memoryKindFilter ? !1 : M ? [ce.agentId, ce.type, ce.relativePath, ce.path].join(" ").toLowerCase().includes(M) : !0).sort((ce, se) => {
      const Ae = String(ce.agentId || "").localeCompare(
        String(se.agentId || "")
      );
      if (Ae !== 0) return Ae;
      const He = Lt(ce).localeCompare(
        Lt(se)
      );
      return He !== 0 ? He : Zs(ce).localeCompare(Zs(se));
    });
  }), pe = D(() => {
    var ce;
    const M = /* @__PURE__ */ new Map();
    for (const se of Ue.value) {
      const Ae = String(se.agentId || "");
      M.has(Ae) || M.set(Ae, []), (ce = M.get(Ae)) == null || ce.push(se);
    }
    return Array.from(M.entries()).map(([se, Ae]) => ({
      agentId: se,
      label: ly(e, se),
      files: Ae,
      docsCount: Ae.filter((He) => Lt(He) === "docs").length,
      notesCount: Ae.filter((He) => Lt(He) === "notes").length
    })).sort((se, Ae) => se.label.localeCompare(Ae.label));
  }), ge = D(() => K("file")), ke = D(() => K("memory")), Ve = D(() => ge.value || ke.value);
  async function Je() {
    return Ve.value ? t.confirm({
      title: e.label("离开文件页", "Leave Files"),
      message: e.label(
        "当前仍有未保存的文件或记忆改动。现在离开会丢失这些修改。",
        "There are still unsaved file or memory edits. Leaving now will discard those changes."
      ),
      confirmLabel: e.label("放弃并离开", "Discard and leave"),
      cancelLabel: e.label("留在当前页", "Stay here"),
      tone: "danger"
    }) : !0;
  }
  async function W(M) {
    if (!K(M)) return !0;
    const ce = M === "memory";
    return t.confirm({
      title: e.label(
        ce ? "切换记忆文件" : "切换文件",
        ce ? "Switch memory file" : "Switch file"
      ),
      message: e.label(
        ce ? "当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。" : "当前文件编辑器里有未保存修改，继续切换会丢失这些内容。",
        ce ? "There are unsaved changes in the memory editor. Switching now discards them." : "There are unsaved changes in the file editor. Switching now discards them."
      ),
      confirmLabel: e.label("放弃并继续", "Discard and continue"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    });
  }
  function K(M) {
    return M === "file" ? h.value !== null && cn(v.value) !== b.value : C.value !== null && cn(E.value) !== R.value;
  }
  async function Q(M, ce = !1) {
    ce || (o.value = !0), u.value = null;
    try {
      const se = await ay(M);
      f.value = se, n.setCurrentPath(se.currentPath);
    } catch (se) {
      u.value = se instanceof Error ? se.message : String(se);
    } finally {
      o.value = !1;
    }
  }
  async function Se(M = !1) {
    M || (r.value = !0), d.value = null;
    try {
      const ce = await ry();
      p.value = ce.files || [];
    } catch (ce) {
      d.value = ce instanceof Error ? ce.message : String(ce);
    } finally {
      r.value = !1;
    }
  }
  async function ze(M, ce = !0) {
    if (ce && !await W("file")) return !1;
    c.value = !0;
    try {
      const se = await ho(M);
      return h.value = se, v.value = se.content || "", b.value = cn(se.content || ""), n.setSelectedFilePath(M), !0;
    } catch (se) {
      return t.pushToast({
        tone: "error",
        message: se instanceof Error ? se.message : String(se)
      }), !1;
    } finally {
      c.value = !1;
    }
  }
  async function je(M, ce = !0) {
    if (ce && !await W("memory")) return !1;
    c.value = !0;
    try {
      const se = await ho(M);
      return C.value = se, E.value = se.content || "", R.value = cn(se.content || ""), n.setSelectedMemoryFilePath(M), !0;
    } catch (se) {
      return t.pushToast({
        tone: "error",
        message: se instanceof Error ? se.message : String(se)
      }), !1;
    } finally {
      c.value = !1;
    }
  }
  async function O() {
    const M = n.currentPath || Nn(n.selectedFilePath) || void 0;
    await Q(M, !0), n.selectedFilePath && await ze(n.selectedFilePath, !1);
  }
  async function ne() {
    await Se(!0), n.selectedMemoryFilePath && await je(n.selectedMemoryFilePath, !1);
  }
  async function w(M, ce, se = !0) {
    if (ce === "memory") {
      if (n.mode === "all" && se && !await W("file")) return;
      n.setMode("memory"), await Se(!0), M && await je(M, !1);
      return;
    }
    n.mode === "memory" && se && !await W("memory") || (n.setMode("all"), await Q(
      Nn(M) || n.currentPath || void 0,
      !0
    ), M && await ze(M, !1));
  }
  async function G(M) {
    var Ae, He;
    const ce = M === "memory" ? "memory" : "all";
    if (ce === n.mode) return;
    const se = ce === "memory" ? n.selectedMemoryFilePath || ((Ae = C.value) == null ? void 0 : Ae.path) || "" : n.selectedFilePath || ((He = h.value) == null ? void 0 : He.path) || "";
    await w(se, ce, !0), ce === "all" && !se && (n.setMode("all"), await Q(n.currentPath || void 0, !0)), ce === "memory" && !se && (n.setMode("memory"), await Se(!0));
  }
  async function oe(M) {
    if (M.isDirectory) {
      if (!await W("file")) return;
      h.value = null, v.value = "", b.value = "", n.setSelectedFilePath(""), await Q(M.path);
      return;
    }
    await ze(M.path, !0);
  }
  async function y(M) {
    await W("file") && (h.value = null, v.value = "", b.value = "", n.setSelectedFilePath(""), await Q(M));
  }
  async function k() {
    z.value && await W("file") && (h.value = null, v.value = "", b.value = "", n.setSelectedFilePath(""), await Q(z.value));
  }
  async function A() {
    await Q(S.value || void 0, !0);
  }
  async function L() {
    var M;
    (M = h.value) != null && M.path && await ze(h.value.path, !0);
  }
  async function B() {
    var M;
    (M = C.value) != null && M.path && await je(C.value.path, !0);
  }
  async function N(M) {
    const ce = M === "file" ? h.value : C.value, se = M === "file" ? v.value : E.value;
    if (ce != null && ce.path) {
      P.value = !0;
      try {
        const Ae = await oy(ce.path, se);
        t.pushToast({
          tone: Ae.success ? "success" : "error",
          message: Ae.message
        }), Ae.success && (M === "file" ? (b.value = cn(se), h.value && (h.value.content = se), await Q(S.value || void 0, !0)) : (R.value = cn(se), C.value && (C.value.content = se), await Se(!0)));
      } catch (Ae) {
        t.pushToast({
          tone: "error",
          message: Ae instanceof Error ? Ae.message : String(Ae)
        });
      } finally {
        P.value = !1;
      }
    }
  }
  async function te() {
    const M = S.value;
    if (!M) return;
    const ce = U.value.trim();
    if (!ce) {
      t.pushToast({
        tone: "warning",
        message: e.label("请输入要创建的文件名或目录名。", "Enter the file or directory name first.")
      });
      return;
    }
    $.value = !0;
    try {
      const se = await iy(M, ce, T.value);
      t.pushToast({
        tone: se.success ? "success" : "error",
        message: se.message
      }), se.success && (U.value = "", await Q(M, !0), T.value === "file" && se.path && await ze(se.path, !1));
    } catch (se) {
      t.pushToast({
        tone: "error",
        message: se instanceof Error ? se.message : String(se)
      });
    } finally {
      $.value = !1;
    }
  }
  function X(M) {
    n.setMemoryKindFilter(
      M === "docs" || M === "notes" ? M : "all"
    );
  }
  async function q() {
    var M;
    (M = C.value) != null && M.path && await w(C.value.path, "all", !0);
  }
  async function V() {
    l.value = !0;
    const M = n.consumeReveal();
    if (M != null && M.path) {
      await w(M.path, M.mode, !1), l.value = !1;
      return;
    }
    n.mode === "memory" ? await ne() : await O(), l.value = !1;
  }
  async function ve() {
    var M, ce, se, Ae;
    if (n.mode === "memory") {
      if (await Se(!0), (M = C.value) != null && M.path && !ke.value) {
        await je(C.value.path, !1);
        return;
      }
      (ce = C.value) != null && ce.path && ke.value && t.pushToast({
        tone: "info",
        message: e.label(
          "已刷新记忆目录，但为避免覆盖未保存改动，当前编辑器内容保持不变。",
          "The memory catalog was refreshed, but the current editor content was kept to avoid overwriting unsaved changes."
        ),
        durationMs: 2600
      });
      return;
    }
    if (await Q(S.value || void 0, !0), (se = h.value) != null && se.path && !ge.value) {
      await ze(h.value.path, !1);
      return;
    }
    (Ae = h.value) != null && Ae.path && ge.value && t.pushToast({
      tone: "info",
      message: e.label(
        "已刷新目录列表，但为避免覆盖未保存改动，当前编辑器内容保持不变。",
        "The directory list was refreshed, but the current editor content was kept to avoid overwriting unsaved changes."
      ),
      durationMs: 2600
    });
  }
  function ie(M) {
    T.value = M;
  }
  function me(M) {
    U.value = M;
  }
  function _e(M) {
    v.value = M;
  }
  function Re(M) {
    E.value = M;
  }
  function Le(M) {
    Ve.value && (M.preventDefault(), M.returnValue = "");
  }
  return nt(() => {
    typeof window < "u" && window.addEventListener("beforeunload", Le), V();
  }), Ul(() => {
    typeof window < "u" && window.removeEventListener("beforeunload", Le);
  }), tp(async () => Je()), {
    workspace: n,
    fileTabs: I,
    modeLoading: l,
    directoryLoading: o,
    memoryCatalogLoading: r,
    editorLoading: c,
    currentError: ee,
    filesResponse: f,
    roots: _,
    entries: x,
    currentPath: S,
    parentPath: z,
    selectedRoot: ue,
    directoryCount: de,
    regularFileCount: le,
    memoryFiles: Z,
    filteredMemoryFiles: Ue,
    memoryGroups: pe,
    fileDirty: ge,
    memoryDirty: ke,
    currentFile: h,
    currentFileDraft: v,
    currentMemoryFile: C,
    currentMemoryDraft: E,
    saving: P,
    creating: $,
    createKind: T,
    createName: U,
    switchMode: G,
    openEntry: oe,
    openRoot: y,
    goToParentDirectory: k,
    reloadCurrentDirectory: A,
    reloadCurrentFile: L,
    reloadCurrentMemoryFile: B,
    saveCurrent: N,
    setCreateKind: ie,
    setCreateName: me,
    createEntry: te,
    updateMemoryKind: X,
    openMemoryFile: je,
    revealMemoryInAllFiles: q,
    softRefreshCurrentView: ve,
    setCurrentFileDraft: _e,
    setCurrentMemoryDraft: Re,
    getMemoryFilterLabel: (M) => sy(e, M),
    getMemoryFileKind: Lt,
    renderMemoryLabel: Zs
  };
}
const uy = { class: "page-stack" }, dy = { class: "page-header" }, fy = { class: "page-header__eyebrow" }, py = { class: "page-header__title" }, hy = { class: "page-header__description" }, gy = {
  key: 0,
  class: "page-empty"
}, my = {
  key: 1,
  class: "page-empty page-empty--error"
}, by = {
  key: 0,
  class: "page-two-column"
}, vy = {
  key: 1,
  class: "page-two-column"
}, yy = /* @__PURE__ */ $e({
  __name: "FilesPage",
  setup(e) {
    const t = Ce(), {
      workspace: n,
      fileTabs: l,
      modeLoading: o,
      directoryLoading: r,
      memoryCatalogLoading: c,
      editorLoading: u,
      currentError: d,
      filesResponse: f,
      roots: p,
      entries: h,
      currentPath: v,
      parentPath: b,
      selectedRoot: C,
      directoryCount: E,
      regularFileCount: R,
      memoryFiles: P,
      filteredMemoryFiles: $,
      memoryGroups: T,
      fileDirty: U,
      memoryDirty: I,
      currentFile: ee,
      currentFileDraft: _,
      currentMemoryFile: x,
      currentMemoryDraft: S,
      saving: z,
      creating: ue,
      createKind: de,
      createName: le,
      switchMode: Z,
      openEntry: Ue,
      openRoot: pe,
      goToParentDirectory: ge,
      reloadCurrentDirectory: ke,
      reloadCurrentFile: Ve,
      reloadCurrentMemoryFile: Je,
      saveCurrent: W,
      setCreateKind: K,
      setCreateName: Q,
      createEntry: Se,
      updateMemoryKind: ze,
      openMemoryFile: je,
      revealMemoryInAllFiles: O,
      softRefreshCurrentView: ne,
      setCurrentFileDraft: w,
      setCurrentMemoryDraft: G,
      getMemoryFilterLabel: oe,
      renderMemoryLabel: y
    } = cy();
    return (k, A) => {
      var L, B, N, te, X, q;
      return g(), m("div", uy, [
        a("header", dy, [
          a("div", null, [
            a("p", fy, i(s(t).label("文件 / 资产", "Files / Assets")), 1),
            a("h2", py, i(s(t).label("文件与记忆", "Files and memory")), 1),
            a("p", hy, i(s(t).label(
              "保留“全部文件”和“核心记忆”双视图，让搜索、角色工作区和实际编辑动作都能在新壳层里接得上。",
              "Keep both the All Files and Core Memory views so search results, role workspaces, and real editing actions can all land cleanly in the new shell."
            )), 1)
          ]),
          a("button", {
            "data-testid": "files-soft-refresh",
            class: "page-header__action",
            type: "button",
            onClick: A[0] || (A[0] = //@ts-ignore
            (...V) => s(ne) && s(ne)(...V))
          }, i(s(o) || s(r) || s(c) ? s(t).label("刷新中…", "Refreshing…") : s(t).label("Refresh", "Refresh")), 1)
        ]),
        H(Os, {
          items: s(l),
          "active-id": s(n).mode,
          onChange: s(Z)
        }, null, 8, ["items", "active-id", "onChange"]),
        s(o) ? (g(), m("div", gy, i(s(t).label("正在恢复文件视图…", "Restoring the workspace view…")), 1)) : s(d) && (s(n).mode === "all" && !s(f) || s(n).mode === "memory" && !s(P).length) ? (g(), m("div", my, i(s(d)), 1)) : (g(), m(j, { key: 2 }, [
          H(lv, {
            mode: s(n).mode,
            "roots-count": s(p).length,
            "selected-root-label": ((L = s(C)) == null ? void 0 : L.label) || "",
            "entries-count": s(h).length,
            "directory-count": s(E),
            "regular-file-count": s(R),
            "current-file-label": ((B = s(ee)) == null ? void 0 : B.relativePath) || "",
            "current-path": s(v),
            "selected-root-type": ((N = s(C)) == null ? void 0 : N.type) || null,
            "memory-files-count": s(P).length,
            "memory-docs-count": s(P).filter((V) => s(Lt)(V) === "docs").length,
            "memory-notes-count": s(P).filter((V) => s(Lt)(V) === "notes").length,
            "memory-groups-count": s(T).length,
            "filtered-memory-files-count": s($).length,
            "memory-filter-label": s(oe)(s(n).memoryKindFilter),
            "memory-filter-query": s(n).memoryFilterQuery,
            "current-memory-label": ((te = s(x)) == null ? void 0 : te.relativePath) || ""
          }, null, 8, ["mode", "roots-count", "selected-root-label", "entries-count", "directory-count", "regular-file-count", "current-file-label", "current-path", "selected-root-type", "memory-files-count", "memory-docs-count", "memory-notes-count", "memory-groups-count", "filtered-memory-files-count", "memory-filter-label", "memory-filter-query", "current-memory-label"]),
          s(n).mode === "all" ? (g(), m("div", by, [
            H(ny, {
              roots: s(p),
              "current-path": s(v),
              "parent-path": s(b),
              "current-file-path": ((X = s(ee)) == null ? void 0 : X.path) || "",
              entries: s(h),
              "create-kind": s(de),
              "create-name": s(le),
              "directory-loading": s(r),
              creating: s(ue),
              onOpenRoot: s(pe),
              onOpenEntry: s(Ue),
              onGoUp: s(ge),
              onReload: s(ke),
              "onUpdate:createKind": s(K),
              "onUpdate:createName": s(Q),
              onCreate: s(Se)
            }, null, 8, ["roots", "current-path", "parent-path", "current-file-path", "entries", "create-kind", "create-name", "directory-loading", "creating", "onOpenRoot", "onOpenEntry", "onGoUp", "onReload", "onUpdate:createKind", "onUpdate:createName", "onCreate"]),
            H(Fb, {
              "editor-loading": s(u),
              "current-file": s(ee),
              draft: s(_),
              "file-dirty": s(U),
              saving: s(z),
              onReload: s(Ve),
              onSave: A[1] || (A[1] = (V) => s(W)("file")),
              "onUpdate:draft": s(w)
            }, null, 8, ["editor-loading", "current-file", "draft", "file-dirty", "saving", "onReload", "onUpdate:draft"])
          ])) : (g(), m("div", vy, [
            H(Cv, {
              groups: s(T),
              "filtered-count": s($).length,
              "total-count": s(P).length,
              "current-memory-path": ((q = s(x)) == null ? void 0 : q.path) || "",
              loading: s(c),
              "get-memory-filter-label": s(oe),
              "get-memory-file-kind": s(Lt),
              "render-memory-label": s(y),
              onUpdateKind: s(ze),
              onOpenMemoryFile: s(je)
            }, null, 8, ["groups", "filtered-count", "total-count", "current-memory-path", "loading", "get-memory-filter-label", "get-memory-file-kind", "render-memory-label", "onUpdateKind", "onOpenMemoryFile"]),
            H(Mv, {
              "editor-loading": s(u),
              "current-memory-file": s(x),
              draft: s(S),
              "memory-dirty": s(I),
              saving: s(z),
              onReload: s(Je),
              onReveal: s(O),
              onSave: A[2] || (A[2] = (V) => s(W)("memory")),
              "onUpdate:draft": s(G)
            }, null, 8, ["editor-loading", "current-memory-file", "draft", "memory-dirty", "saving", "onReload", "onReveal", "onUpdate:draft"])
          ]))
        ], 64))
      ]);
    };
  }
});
async function _y(e = 200) {
  const t = await Ee(`/api/service/logs?lines=${encodeURIComponent(String(e))}`);
  return {
    logs: Array.isArray(t.logs) ? t.logs.map((n) => String(n)) : [],
    requestedLines: e
  };
}
const wy = { class: "page-stack" }, ky = { class: "page-header" }, $y = { class: "page-header__eyebrow" }, Cy = { class: "page-header__title" }, Sy = { class: "page-header__description" }, Ay = {
  key: 0,
  class: "page-empty"
}, Ry = {
  key: 1,
  class: "page-empty page-empty--error"
}, xy = { class: "stat-grid" }, Py = { class: "stat-card" }, Ty = { class: "stat-card__label" }, Ey = { class: "stat-card" }, Dy = { class: "stat-card__label" }, My = { class: "stat-card" }, Iy = { class: "stat-card__label" }, Oy = { class: "stat-card" }, Ly = { class: "stat-card__label" }, Ny = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Uy = { class: "page-actions" }, Fy = ["onClick"], Gy = {
  key: 0,
  class: "status-banner status-banner--warning"
}, By = {
  key: 1,
  "data-testid": "logs-raw-output",
  class: "code-panel log-output"
}, Vy = {
  key: 0,
  class: "list-stack"
}, jy = {
  key: 1,
  class: "page-empty"
}, zy = { class: "muted-copy" }, Wy = /* @__PURE__ */ $e({
  __name: "LogsPage",
  setup(e) {
    let t = null;
    const n = Ce(), l = it(), o = /* @__PURE__ */ F((t == null ? void 0 : t.requestedLines) || 200), r = ct(() => _y(o.value), t, { immediate: !1 }), c = [100, 200, 500], u = /(error|warn|fail|exception|timeout|denied|refused|panic|fatal|traceback|错误|失败|异常|拒绝|超时)/i, d = D(() => {
      var b;
      return ((b = r.data) == null ? void 0 : b.logs) || [];
    }), f = D(() => /^(获取日志失败|Failed to fetch logs)/.test(d.value[0] || "")), p = D(() => {
      const b = d.value.filter((C) => u.test(C));
      return b.length ? b.slice(-8) : d.value.slice(-6);
    });
    Te(() => r.data, (b) => {
      b && (t = b);
    }), nt(() => {
      r.execute({ silent: !!r.data });
    });
    async function h(b) {
      typeof b == "number" && (o.value = b), await r.execute({ silent: !!r.data });
    }
    async function v() {
      var b;
      typeof navigator > "u" || !((b = navigator.clipboard) != null && b.writeText) || (await navigator.clipboard.writeText(d.value.join(`
`)), l.pushToast({
        tone: "success",
        message: n.label("最近日志已复制。", "The latest log lines have been copied.")
      }));
    }
    return (b, C) => (g(), m("div", wy, [
      a("header", ky, [
        a("div", null, [
          a("p", $y, i(s(n).label("日志 / 追踪", "Logs / Tracing")), 1),
          a("h2", Cy, i(s(n).label("日志与排障", "Logs & troubleshooting")), 1),
          a("p", Sy, i(s(n).label("集中查看 Gateway 最近日志，支持切换日志行数、静默刷新和快速复制，让排障更直接。", "Review the latest Gateway logs here with line switching, silent refresh, and quick copy for faster troubleshooting.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: C[0] || (C[0] = (E) => h())
        }, i(s(r).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新日志", "Refresh logs")), 1)
      ]),
      s(r).loading && !s(r).data ? (g(), m("div", Ay, i(s(n).label("正在读取最近日志…", "Loading the latest log lines…")), 1)) : s(r).error && !s(r).data ? (g(), m("div", Ry, i(s(r).error), 1)) : s(r).data ? (g(), m(j, { key: 2 }, [
        H(ae, {
          title: s(n).label("日志概览", "Log overview"),
          eyebrow: "Gateway"
        }, {
          default: Y(() => [
            a("div", xy, [
              a("article", Py, [
                a("p", Ty, i(s(n).label("日志来源", "Source")), 1),
                C[1] || (C[1] = a("strong", null, "Gateway", -1)),
                a("span", null, i(s(n).label("当前展示 Gateway 日志流", "Currently showing the Gateway log stream")), 1)
              ]),
              a("article", Ey, [
                a("p", Dy, i(s(n).label("请求行数", "Requested lines")), 1),
                a("strong", null, i(s(he)(s(r).data.requestedLines)), 1),
                a("span", null, i(s(n).label("切换后会静默拉取新结果", "Changing this refreshes the result silently")), 1)
              ]),
              a("article", My, [
                a("p", Iy, i(s(n).label("返回行数", "Returned lines")), 1),
                a("strong", null, i(s(he)(d.value.length)), 1),
                a("span", null, i(s(n).label("展示当前接口返回的最新结果", "Shows the latest lines returned by the API")), 1)
              ]),
              a("article", Oy, [
                a("p", Ly, i(s(n).label("当前状态", "Current state")), 1),
                a("strong", null, i(f.value ? s(n).label("需要排查", "Needs attention") : s(n).label("可直接查看", "Ready to inspect")), 1),
                a("span", null, i(f.value ? s(n).label("接口返回了错误提示，建议先回到运维确认服务状态。", "The API returned an error banner. Confirm the service state in Operations first.") : s(n).label("如果最近刚执行过启停或重启，先看这里通常最快。", "If you recently started, stopped, or restarted services, this is usually the fastest place to check.")), 1)
              ])
            ]),
            s(r).error ? (g(), m("div", Ny, i(s(n).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + i(s(r).error), 1)) : J("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(n).label("最近日志输出", "Latest log output"),
          eyebrow: "Output"
        }, {
          actions: Y(() => [
            a("div", Uy, [
              (g(), m(j, null, fe(c, (E) => a("button", {
                key: E,
                class: re(["pill-button", { "pill-button--active": o.value === E }]),
                type: "button",
                onClick: (R) => h(E)
              }, i(s(n).label(`最近 ${E} 行`, `${E} lines`)), 11, Fy)), 64)),
              s(n).developerMode ? (g(), m("button", {
                key: 0,
                "data-testid": "logs-copy-action",
                class: "inline-link",
                type: "button",
                onClick: v
              }, i(s(n).label("复制日志", "Copy logs")), 1)) : J("", !0)
            ])
          ]),
          default: Y(() => [
            f.value ? (g(), m("div", Gy, i(d.value[0]), 1)) : J("", !0),
            s(n).developerMode ? (g(), m("pre", By, i(d.value.join(`
`) || s(n).label("当前没有可显示的日志内容。", "No log content is available right now.")), 1)) : (g(), m(j, { key: 2 }, [
              p.value.length ? (g(), m("div", Vy, [
                (g(!0), m(j, null, fe(p.value, (E, R) => (g(), m("article", {
                  key: `${R}:${E}`,
                  class: "risk-row"
                }, [
                  a("strong", null, i(u.test(E) ? s(n).label("关键片段", "Key line") : s(n).label("最近输出", "Recent line")), 1),
                  a("span", null, i(E), 1)
                ]))), 128))
              ])) : (g(), m("div", jy, i(s(n).label("当前没有可显示的日志摘要。", "No log summary is available right now.")), 1)),
              a("p", zy, i(s(n).label("完整原始日志和复制动作已收纳到开发者模式。需要逐行排障时，请先到 Settings 打开开发者模式。", "Full raw logs and copy actions now stay behind developer mode. Enable developer mode from Settings when you need line-by-line troubleshooting.")), 1)
            ], 64))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : J("", !0)
    ]));
  }
}), Hy = { class: "page-two-column" }, Ky = { class: "catalog-list" }, qy = ["onClick"], Jy = { class: "catalog-list__title" }, Qy = { class: "pill-row" }, Yy = { class: "page-stack" }, Zy = { class: "muted-copy" }, Xy = { class: "settings-grid settings-grid--wide" }, e_ = { class: "settings-field" }, t_ = { class: "settings-field" }, n_ = { class: "settings-field" }, s_ = ["value"], l_ = { class: "settings-field" }, a_ = { class: "settings-field settings-field--full" }, o_ = { class: "page-actions" }, i_ = ["disabled"], r_ = ["disabled"], c_ = { class: "provider-stack" }, u_ = { class: "provider-card__header" }, d_ = { class: "pill-row" }, f_ = {
  key: 0,
  class: "pill pill--success"
}, p_ = {
  key: 1,
  class: "pill pill--muted"
}, h_ = { class: "mini-list" }, g_ = { class: "pill-row" }, m_ = {
  key: 0,
  class: "pill pill--success"
}, b_ = {
  key: 1,
  class: "pill pill--info"
}, v_ = /* @__PURE__ */ $e({
  __name: "ModelsProviderSection",
  props: {
    pickerOptions: {},
    selectedKey: {},
    providerDraft: {},
    providerHint: {},
    apiTypeOptions: {},
    configuredProviders: {},
    providerSaving: { type: Boolean },
    providerDeleting: { type: Boolean }
  },
  emits: ["update:selectedKey", "save", "reset", "delete"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    return (o, r) => (g(), m("div", Hy, [
      H(ae, {
        title: s(l).label("Provider 选择器", "Provider picker"),
        eyebrow: "Provider"
      }, {
        default: Y(() => [
          a("div", Ky, [
            (g(!0), m(j, null, fe(e.pickerOptions, (c) => (g(), m("button", {
              key: c.value,
              class: re(["catalog-list__item", { "catalog-list__item--active": e.selectedKey === c.value }]),
              type: "button",
              onClick: (u) => n("update:selectedKey", c.value)
            }, [
              a("div", Jy, [
                a("strong", null, i(c.label), 1)
              ]),
              a("div", Qy, [
                a("span", {
                  class: re(["pill", c.kind === "custom" ? "pill--success" : c.kind === "preset" ? "pill--info" : "pill--muted"])
                }, i(c.kind === "custom" ? s(l).label("已配置", "Configured") : c.kind === "preset" ? s(l).label("预设", "Preset") : s(l).label("空白", "Blank")), 3)
              ])
            ], 10, qy))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      a("div", Yy, [
        H(ae, {
          title: e.providerDraft.title,
          eyebrow: "Editor"
        }, {
          default: Y(() => [
            a("p", Zy, i(e.providerHint), 1),
            a("div", Xy, [
              a("label", e_, [
                a("span", null, i(s(l).label("Provider 名称", "Provider name")), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[0] || (r[0] = (c) => e.providerDraft.name = c),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [xe, e.providerDraft.name]
                ])
              ]),
              a("label", t_, [
                r[8] || (r[8] = a("span", null, "Base URL", -1)),
                be(a("input", {
                  "onUpdate:modelValue": r[1] || (r[1] = (c) => e.providerDraft.baseUrl = c),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [xe, e.providerDraft.baseUrl]
                ])
              ]),
              a("label", n_, [
                a("span", null, i(s(l).label("默认 API 类型", "Default API type")), 1),
                be(a("select", {
                  "onUpdate:modelValue": r[2] || (r[2] = (c) => e.providerDraft.apiType = c),
                  class: "settings-input"
                }, [
                  (g(!0), m(j, null, fe(e.apiTypeOptions, (c) => (g(), m("option", {
                    key: c,
                    value: c
                  }, i(c), 9, s_))), 128))
                ], 512), [
                  [mt, e.providerDraft.apiType]
                ])
              ]),
              a("label", l_, [
                r[9] || (r[9] = a("span", null, "API Key", -1)),
                a("small", null, i(e.providerDraft.apiKeyHelp), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[3] || (r[3] = (c) => e.providerDraft.apiKey = c),
                  class: "settings-input",
                  type: "password"
                }, null, 512), [
                  [xe, e.providerDraft.apiKey]
                ])
              ]),
              a("label", a_, [
                a("span", null, i(s(l).label("模型列表", "Model list")), 1),
                a("small", null, i(s(l).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                be(a("textarea", {
                  "onUpdate:modelValue": r[4] || (r[4] = (c) => e.providerDraft.modelsText = c),
                  class: "settings-textarea",
                  rows: "8"
                }, null, 512), [
                  [xe, e.providerDraft.modelsText]
                ])
              ])
            ]),
            a("div", o_, [
              a("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: e.providerSaving,
                onClick: r[5] || (r[5] = (c) => n("save"))
              }, i(e.providerSaving ? s(l).label("保存中…", "Saving…") : s(l).label("保存 Provider", "Save provider")), 9, i_),
              a("button", {
                class: "inline-link",
                type: "button",
                onClick: r[6] || (r[6] = (c) => n("reset"))
              }, i(s(l).label("恢复当前内容", "Reset draft")), 1),
              e.providerDraft.canDelete ? (g(), m("button", {
                key: 0,
                class: "inline-link inline-link--danger",
                type: "button",
                disabled: e.providerDeleting,
                onClick: r[7] || (r[7] = (c) => n("delete"))
              }, i(e.providerDeleting ? s(l).label("删除中…", "Deleting…") : s(l).label("删除 Provider", "Delete provider")), 9, r_)) : J("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(l).label("已配置 Provider", "Configured providers"),
          eyebrow: "Overview"
        }, {
          default: Y(() => [
            a("div", c_, [
              (g(!0), m(j, null, fe(e.configuredProviders, (c) => (g(), m("article", {
                key: c.name,
                class: "provider-card"
              }, [
                a("header", u_, [
                  a("div", null, [
                    a("strong", null, i(c.name), 1),
                    a("p", null, i(c.baseUrl), 1)
                  ]),
                  a("div", d_, [
                    c.hasApiKey ? (g(), m("span", f_, i(s(l).label("有密钥", "Has key")), 1)) : (g(), m("span", p_, i(s(l).label("无密钥", "No key")), 1))
                  ])
                ]),
                a("div", h_, [
                  (g(!0), m(j, null, fe(c.models, (u) => (g(), m("div", {
                    key: u.fullId,
                    class: "mini-list__item"
                  }, [
                    a("div", null, [
                      a("strong", null, i(u.name), 1),
                      a("p", null, i(u.fullId), 1)
                    ]),
                    a("div", g_, [
                      u.isPrimary ? (g(), m("span", m_, i(s(l).label("主模型", "Primary")), 1)) : J("", !0),
                      u.isFallback ? (g(), m("span", b_, i(s(l).label("备用", "Fallback")), 1)) : J("", !0)
                    ])
                  ]))), 128))
                ])
              ]))), 128))
            ])
          ]),
          _: 1
        }, 8, ["title"])
      ])
    ]));
  }
}), y_ = { class: "page-stack" }, __ = { class: "stat-grid" }, w_ = { class: "stat-card" }, k_ = { class: "stat-card__label" }, $_ = { class: "stat-card" }, C_ = { class: "stat-card__label" }, S_ = { class: "stat-card" }, A_ = { class: "stat-card__label" }, R_ = { class: "stat-card" }, x_ = { class: "stat-card__label" }, P_ = { class: "settings-grid settings-grid--wide" }, T_ = { class: "settings-field" }, E_ = ["value"], D_ = { value: "" }, M_ = ["value"], I_ = { class: "checkbox-grid" }, O_ = ["checked", "onChange"], L_ = { class: "page-actions" }, N_ = ["disabled"], U_ = /* @__PURE__ */ $e({
  __name: "ModelsRoutingSection",
  props: {
    primaryModel: {},
    providerCount: {},
    fallbackCount: {},
    availableModelCount: {},
    allModels: {},
    primaryDraft: {},
    fallbackDraft: {},
    routingSaving: { type: Boolean }
  },
  emits: ["update:primaryDraft", "toggleFallback", "save"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    return (o, r) => (g(), m("div", y_, [
      H(ae, {
        title: s(l).label("当前路由概览", "Current routing overview"),
        eyebrow: "Routing"
      }, {
        default: Y(() => [
          a("div", __, [
            a("article", w_, [
              a("p", k_, i(s(l).label("主模型", "Primary model")), 1),
              a("strong", null, i(e.primaryModel || s(l).label("未配置", "Not configured")), 1),
              a("span", null, i(s(l).label("默认执行路径", "Default execution route")), 1)
            ]),
            a("article", $_, [
              a("p", C_, i(s(l).label("Provider 数量", "Providers")), 1),
              a("strong", null, i(e.providerCount), 1),
              a("span", null, i(s(l).label("已经进入运行配置", "Already present in runtime config")), 1)
            ]),
            a("article", S_, [
              a("p", A_, i(s(l).label("备用模型", "Fallbacks")), 1),
              a("strong", null, i(e.fallbackCount), 1),
              a("span", null, i(s(l).label("主模型失败时按顺序尝试", "Tried in sequence when the primary route fails")), 1)
            ]),
            a("article", R_, [
              a("p", x_, i(s(l).label("可选模型", "Available models")), 1),
              a("strong", null, i(e.availableModelCount), 1),
              a("span", null, i(s(l).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("主模型与备用链路", "Primary and fallback chain"),
        eyebrow: "Routing editor"
      }, {
        default: Y(() => [
          a("div", P_, [
            a("label", T_, [
              a("span", null, i(s(l).label("主模型", "Primary model")), 1),
              a("small", null, i(s(l).label("Guard 默认会先走这一条模型路径。", "Guard routes here first by default.")), 1),
              a("select", {
                class: "settings-input",
                value: e.primaryDraft,
                onChange: r[0] || (r[0] = (c) => n("update:primaryDraft", c.target.value))
              }, [
                a("option", D_, i(s(l).label("暂不设置", "Leave unset")), 1),
                (g(!0), m(j, null, fe(e.allModels, (c) => (g(), m("option", {
                  key: c.fullId,
                  value: c.fullId
                }, i(`${c.providerName} / ${c.name}`), 9, M_))), 128))
              ], 40, E_)
            ])
          ]),
          a("div", I_, [
            (g(!0), m(j, null, fe(e.allModels, (c) => (g(), m("label", {
              key: c.fullId,
              class: "checkbox-card"
            }, [
              a("input", {
                checked: e.fallbackDraft.includes(c.fullId),
                type: "checkbox",
                onChange: (u) => n("toggleFallback", c.fullId)
              }, null, 40, O_),
              a("div", null, [
                a("strong", null, i(`${c.providerName} / ${c.name}`), 1),
                a("p", null, i(c.api || s(l).label("未声明 API 类型", "API type is not declared")), 1)
              ])
            ]))), 128))
          ]),
          a("div", L_, [
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.routingSaving,
              onClick: r[1] || (r[1] = (c) => n("save"))
            }, i(e.routingSaving ? s(l).label("保存中…", "Saving…") : s(l).label("保存路由策略", "Save routing strategy")), 9, N_)
          ])
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
async function F_() {
  const [e, t] = await Promise.all([
    Ee("/api/ai/config"),
    Ee("/api/ai/providers")
  ]);
  return { config: e, catalog: t };
}
function G_(e) {
  return Oe("/api/ai/provider", e);
}
function B_(e) {
  return Ql(`/api/ai/provider/${encodeURIComponent(e)}`);
}
function V_(e) {
  return Oe("/api/ai/primary", { modelId: e });
}
function j_(e) {
  return Oe("/api/ai/fallbacks", { modelIds: e });
}
const tn = "__new__", ss = "openai-completions", z_ = [
  "openai-completions",
  "anthropic-messages",
  "openai-responses"
];
let go = null;
function mo(e, t) {
  return e.map(
    (n) => [
      n.id || "",
      n.name || n.id || "",
      n.contextWindow || "",
      n.maxTokens || "",
      n.api || t || ""
    ].join("|")
  ).join(`
`);
}
function W_(e, t) {
  return e.split(/\r?\n/).map((n) => n.trim()).filter(Boolean).map((n) => {
    const [l, o, r, c, u] = n.split("|").map((d) => d.trim());
    return {
      id: l,
      name: o || l,
      contextWindow: ms(r),
      maxTokens: ms(c),
      api: u || t || void 0
    };
  }).filter((n) => n.id);
}
function H_(e, t, n) {
  var l;
  return t ? e.label(`预设来源：${t.name}`, `Preset source: ${t.name}`) : (l = n == null ? void 0 : n.models) != null && l.length ? e.label(
    `当前已记录 ${n.models.length} 个模型条目`,
    `${n.models.length} model entries are recorded now`
  ) : e.label(
    "保存后会写入当前生效的 openclaw.json。",
    "Saving writes the provider into the active openclaw.json."
  );
}
function K_() {
  const e = Ce(), t = it(), n = ct(() => F_(), go, {
    immediate: !1
  }), l = /* @__PURE__ */ F(tn), o = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F([]), f = /* @__PURE__ */ pt({
    mode: "new",
    title: "",
    canDelete: !1,
    name: "",
    baseUrl: "",
    apiType: ss,
    apiKey: "",
    apiKeyHelp: "",
    modelsText: ""
  }), p = D(() => {
    const _ = n.data, x = (_ == null ? void 0 : _.config.providers) || [], S = (_ == null ? void 0 : _.catalog.presets) || [];
    return [
      {
        value: tn,
        label: e.label("新建空白 Provider", "Create blank provider"),
        kind: "new"
      },
      ...x.map((z) => ({
        value: z.name,
        label: `${z.name} · ${e.label("已配置", "Configured")}`,
        kind: "custom"
      })),
      ...S.filter(
        (z) => !x.some((ue) => ue.name === z.id)
      ).map((z) => ({
        value: z.id,
        label: `${z.id} · ${e.label("预设", "Preset")}`,
        kind: "preset"
      }))
    ];
  }), h = D(
    () => {
      var _;
      return ((_ = n.data) == null ? void 0 : _.config.providers) || [];
    }
  ), v = D(
    () => h.value.flatMap(
      (_) => _.models.map((x) => ({
        providerName: _.name,
        fullId: x.fullId,
        name: x.name,
        api: x.api
      }))
    )
  ), b = D(
    () => {
      var _;
      return (_ = n.data) == null ? void 0 : _.catalog.presets.find((x) => x.id === l.value);
    }
  ), C = D(
    () => {
      var _;
      return (_ = n.data) == null ? void 0 : _.catalog.custom.find((x) => x.name === l.value);
    }
  ), E = D(
    () => H_(e, b.value, C.value)
  );
  function R(_) {
    var Z, Ue;
    const x = n.data;
    if (!x)
      return;
    const S = new Map(
      x.config.providers.map((pe) => [pe.name, pe])
    ), z = new Map(
      (x.catalog.custom || []).map((pe) => [pe.name, pe])
    ), ue = new Map(
      (x.catalog.presets || []).map((pe) => [pe.id, pe])
    );
    if (!_ || _ === tn) {
      f.mode = "new", f.title = e.label("新建 Provider", "Create provider"), f.canDelete = !1, f.name = "", f.baseUrl = "", f.apiType = ss, f.apiKey = "", f.apiKeyHelp = e.label(
        "确认保存后会写入 openclaw.json。",
        "Saved into openclaw.json after you confirm."
      ), f.modelsText = "";
      return;
    }
    const de = z.get(_);
    if (de) {
      const pe = S.get(_);
      f.mode = "custom", f.title = e.label(
        "编辑已配置 Provider",
        "Edit configured provider"
      ), f.canDelete = !0, f.name = _, f.baseUrl = de.baseUrl || "", f.apiType = de.apiType || de.api || ((Ue = (Z = de.models) == null ? void 0 : Z[0]) == null ? void 0 : Ue.api) || ss, f.apiKey = "", f.apiKeyHelp = pe != null && pe.apiKeyMasked ? e.label(
        `留空会保留当前密钥：${pe.apiKeyMasked}`,
        `Leave blank to keep the current key: ${pe.apiKeyMasked}`
      ) : e.label(
        "填写后会覆盖当前密钥。",
        "A filled value replaces the current key."
      ), f.modelsText = mo(
        de.models || [],
        f.apiType
      );
      return;
    }
    const le = ue.get(_);
    if (le) {
      f.mode = "preset", f.title = e.label(
        "从预设带入 Provider",
        "Bootstrap provider from preset"
      ), f.canDelete = !1, f.name = le.id, f.baseUrl = le.defaultBaseUrl || "", f.apiType = le.apiType || ss, f.apiKey = "", f.apiKeyHelp = le.requiresApiKey ? e.label("保存前请填写 API Key。", "Fill in the API key before saving.") : e.label(
        "这个 Provider 通常不需要 API Key。",
        "This provider usually does not require an API key."
      ), f.modelsText = mo(
        (le.suggestedModels || []).map((pe) => ({
          id: pe.id,
          name: pe.name,
          api: le.apiType
        })),
        le.apiType
      );
      return;
    }
    l.value = tn;
  }
  Te(
    () => n.data,
    (_) => {
      var S;
      if (_ && (go = _), !_)
        return;
      u.value = _.config.primaryModel || "", d.value = [..._.config.fallbackModels || []];
      const x = p.value;
      if (!x.some((z) => z.value === l.value)) {
        l.value = ((S = x[1]) == null ? void 0 : S.value) || tn;
        return;
      }
      R(l.value);
    },
    { immediate: !0 }
  ), Te(l, (_) => {
    R(_);
  }), nt(() => {
    n.execute({ silent: !!n.data });
  });
  async function P() {
    await n.execute({ silent: !0 });
  }
  async function $() {
    o.value = !0;
    try {
      const _ = await V_(u.value);
      if (!_.success)
        throw new Error(_.message);
      const x = await j_(
        d.value.filter((S) => S !== u.value)
      );
      if (!x.success)
        throw new Error(x.message);
      t.pushToast({
        tone: "success",
        message: e.label(
          "模型路由策略已更新。",
          "Model routing was updated."
        )
      }), await P();
    } catch (_) {
      t.pushToast({
        tone: "error",
        message: _ instanceof Error ? _.message : String(_)
      });
    } finally {
      o.value = !1;
    }
  }
  async function T() {
    r.value = !0;
    try {
      const _ = await G_({
        name: f.name.trim(),
        baseUrl: f.baseUrl.trim(),
        apiKey: f.apiKey.trim() || void 0,
        apiType: f.apiType,
        models: W_(f.modelsText, f.apiType)
      });
      t.pushToast({
        tone: _.success ? "success" : "error",
        message: _.message
      }), _.success && (l.value = f.name.trim() || tn, await P());
    } catch (_) {
      t.pushToast({
        tone: "error",
        message: _ instanceof Error ? _.message : String(_)
      });
    } finally {
      r.value = !1;
    }
  }
  async function U() {
    if (!(!f.canDelete || !f.name || !await t.confirm({
      title: e.label("删除 Provider", "Delete provider"),
      message: e.label(
        `确认删除 ${f.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
        `Delete ${f.name}? This also removes its model definitions, primary selection, and fallback references.`
      ),
      confirmLabel: e.label("确认删除", "Delete provider"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    }))) {
      c.value = !0;
      try {
        const x = await B_(f.name);
        t.pushToast({
          tone: x.success ? "success" : "error",
          message: x.message
        }), x.success && (l.value = tn, await P());
      } catch (x) {
        t.pushToast({
          tone: "error",
          message: x instanceof Error ? x.message : String(x)
        });
      } finally {
        c.value = !1;
      }
    }
  }
  function I(_) {
    if (d.value.includes(_)) {
      d.value = d.value.filter((x) => x !== _);
      return;
    }
    d.value = [...d.value, _];
  }
  function ee() {
    R(l.value);
  }
  return {
    resource: n,
    selectedKey: l,
    routingSaving: o,
    providerSaving: r,
    providerDeleting: c,
    primaryDraft: u,
    fallbackDraft: d,
    providerDraft: f,
    pickerOptions: p,
    configuredProviders: h,
    allModels: v,
    providerHint: E,
    refresh: P,
    handleRoutingSave: $,
    handleProviderSave: T,
    handleProviderDelete: U,
    toggleFallback: I,
    resetProviderDraft: ee
  };
}
const q_ = { class: "page-stack" }, J_ = { class: "page-header" }, Q_ = { class: "page-header__eyebrow" }, Y_ = { class: "page-header__title" }, Z_ = { class: "page-header__description" }, X_ = {
  key: 0,
  class: "page-empty"
}, e1 = {
  key: 1,
  class: "page-empty page-empty--error"
}, t1 = {
  key: 0,
  class: "status-banner status-banner--warning"
}, n1 = /* @__PURE__ */ $e({
  __name: "ModelsPage",
  setup(e) {
    const t = Ce(), {
      resource: n,
      selectedKey: l,
      routingSaving: o,
      providerSaving: r,
      providerDeleting: c,
      primaryDraft: u,
      fallbackDraft: d,
      providerDraft: f,
      pickerOptions: p,
      configuredProviders: h,
      allModels: v,
      providerHint: b,
      refresh: C,
      handleRoutingSave: E,
      handleProviderSave: R,
      handleProviderDelete: P,
      toggleFallback: $,
      resetProviderDraft: T
    } = K_();
    return (U, I) => (g(), m("div", q_, [
      a("header", J_, [
        a("div", null, [
          a("p", Q_, i(s(t).label("模型 / 策略", "Models / Strategy")), 1),
          a("h2", Y_, i(s(t).label("模型策略", "Model strategy")), 1),
          a("p", Z_, i(s(t).label("把 Provider、主模型和 fallback 链路放到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: I[0] || (I[0] = //@ts-ignore
          (...ee) => s(C) && s(C)(...ee))
        }, i(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新", "Refresh")), 1)
      ]),
      s(n).loading && !s(n).data ? (g(), m("div", X_, i(s(t).label("正在读取模型配置…", "Loading model configuration…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", e1, i(s(n).error), 1)) : s(n).data ? (g(), m(j, { key: 2 }, [
        s(n).error ? (g(), m("div", t1, i(s(t).label("已保留上一版模型快照，但后台刷新失败：", "The last model snapshot is still on screen, but the background refresh failed: ")) + i(s(n).error), 1)) : J("", !0),
        H(U_, {
          "primary-model": s(n).data.config.primaryModel || "",
          "provider-count": s(n).data.config.providers.length,
          "fallback-count": s(n).data.config.fallbackModels.length,
          "available-model-count": s(v).length,
          "all-models": s(v),
          "primary-draft": s(u),
          "fallback-draft": s(d),
          "routing-saving": s(o),
          "onUpdate:primaryDraft": I[1] || (I[1] = (ee) => u.value = ee),
          onToggleFallback: s($),
          onSave: s(E)
        }, null, 8, ["primary-model", "provider-count", "fallback-count", "available-model-count", "all-models", "primary-draft", "fallback-draft", "routing-saving", "onToggleFallback", "onSave"]),
        H(v_, {
          "picker-options": s(p),
          "selected-key": s(l),
          "provider-draft": s(f),
          "provider-hint": s(b),
          "api-type-options": s(z_),
          "configured-providers": s(h),
          "provider-saving": s(r),
          "provider-deleting": s(c),
          "onUpdate:selectedKey": I[2] || (I[2] = (ee) => l.value = ee),
          onSave: s(R),
          onReset: s(T),
          onDelete: s(P)
        }, null, 8, ["picker-options", "selected-key", "provider-draft", "provider-hint", "api-type-options", "configured-providers", "provider-saving", "provider-deleting", "onSave", "onReset", "onDelete"])
      ], 64)) : J("", !0)
    ]));
  }
});
async function s1(e = 200, t = 80) {
  const [n, l] = await Promise.all([
    Ee(`/api/notifications?limit=${encodeURIComponent(String(e))}`),
    Ee(`/api/activity?limit=${encodeURIComponent(String(t))}`)
  ]);
  return {
    summary: {
      items: Array.isArray(n.items) ? n.items : [],
      total: n.total || 0,
      unread: n.unread || 0,
      read: n.read || 0
    },
    events: Array.isArray(l.events) ? l.events : []
  };
}
function l1(e, t) {
  return Oe("/api/notifications/read", { id: e, read: t });
}
function a1(e) {
  return Oe("/api/notifications/bulk", { action: e });
}
const o1 = { class: "page-stack" }, i1 = { class: "page-header" }, r1 = { class: "page-header__eyebrow" }, c1 = { class: "page-header__title" }, u1 = { class: "page-header__description" }, d1 = {
  key: 0,
  class: "page-empty"
}, f1 = {
  key: 1,
  class: "page-empty page-empty--error"
}, p1 = { class: "stat-grid" }, h1 = { class: "stat-card" }, g1 = { class: "stat-card__label" }, m1 = { class: "stat-card" }, b1 = { class: "stat-card__label" }, v1 = { class: "stat-card" }, y1 = { class: "stat-card__label" }, _1 = { class: "stat-card" }, w1 = { class: "stat-card__label" }, k1 = {
  key: 0,
  class: "status-banner status-banner--warning"
}, $1 = { class: "control-grid" }, C1 = { class: "settings-field" }, S1 = ["placeholder"], A1 = { class: "settings-field" }, R1 = { value: "all" }, x1 = ["value"], P1 = { class: "settings-field" }, T1 = ["value"], E1 = { class: "pill-row" }, D1 = { class: "page-actions" }, M1 = ["disabled"], I1 = ["disabled"], O1 = ["disabled"], L1 = ["disabled"], N1 = {
  key: 0,
  class: "muted-copy"
}, U1 = {
  key: 0,
  class: "timeline-day-stack"
}, F1 = { class: "timeline-day-header" }, G1 = { class: "provider-stack" }, B1 = { class: "provider-card__header" }, V1 = { class: "pill-row" }, j1 = { class: "pill-row" }, z1 = { class: "pill pill--info" }, W1 = { class: "pill pill--muted" }, H1 = { class: "page-actions" }, K1 = ["disabled", "onClick"], q1 = ["disabled", "onClick"], J1 = {
  key: 1,
  class: "page-empty"
}, Q1 = {
  key: 2,
  class: "pagination-bar"
}, Y1 = { class: "muted-copy" }, Z1 = { class: "page-actions" }, X1 = ["disabled"], ew = ["disabled"], tw = {
  key: 0,
  class: "provider-stack"
}, nw = { class: "provider-card__header" }, sw = { class: "pill pill--info" }, lw = {
  key: 0,
  class: "muted-copy"
}, aw = {
  key: 1,
  class: "page-empty"
}, ow = /* @__PURE__ */ $e({
  __name: "NotificationsPage",
  setup(e) {
    let t = null;
    const n = Ce(), l = it(), o = /* @__PURE__ */ F("reminders"), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F("all"), u = /* @__PURE__ */ F("all"), d = /* @__PURE__ */ F(20), f = /* @__PURE__ */ F(1), p = /* @__PURE__ */ F(""), h = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F(""), b = ct(() => s1(), t, { immediate: !1 }), C = [10, 20, 50], E = D(() => [
      { id: "reminders", label: n.label("提醒", "Reminders") },
      { id: "timeline", label: n.label("时间线", "Timeline") }
    ]), R = D(() => {
      var W;
      return ((W = b.data) == null ? void 0 : W.summary.items) || [];
    }), P = D(() => {
      var W;
      return ((W = b.data) == null ? void 0 : W.events) || [];
    }), $ = D(() => R.value.filter((W) => W.severity === "warning" || W.severity === "error").length), T = D(() => R.value.filter((W) => W.severity === "success").length), U = D(() => Array.from(new Set(R.value.map((W) => W.source).filter(Boolean))).sort()), I = D(() => {
      const W = r.value.trim().toLowerCase();
      return R.value.filter((K) => u.value === "unread" && K.read || u.value === "warning" && K.severity !== "warning" && K.severity !== "error" || u.value === "success" && K.severity !== "success" || c.value !== "all" && K.source !== c.value ? !1 : W ? [
        K.title,
        K.message,
        K.type,
        K.source,
        JSON.stringify(K.meta || {})
      ].join(" ").toLowerCase().includes(W) : !0);
    }), ee = D(() => Math.max(1, Math.ceil(I.value.length / d.value))), _ = D(() => {
      const W = (f.value - 1) * d.value;
      return I.value.slice(W, W + d.value);
    }), x = D(() => {
      var K;
      const W = /* @__PURE__ */ new Map();
      for (const Q of _.value) {
        const Se = Q.createdAt ? Q.createdAt.slice(0, 10) : "unknown";
        W.has(Se) || W.set(Se, {
          key: Se,
          label: S(Q.createdAt),
          items: []
        }), (K = W.get(Se)) == null || K.items.push(Q);
      }
      return Array.from(W.values());
    });
    Te(() => b.data, (W) => {
      W && (t = W);
    }), Te([r, c, u, d, o], () => {
      f.value = 1;
    }), Te(ee, (W) => {
      f.value > W && (f.value = W);
    }), nt(() => {
      b.execute({ silent: !!b.data });
    });
    function S(W) {
      if (!W) return n.label("未知日期", "Unknown date");
      const K = Date.parse(W);
      return Number.isFinite(K) ? new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(K)) : W;
    }
    function z(W) {
      return W === "success" ? "pill--success" : W === "warning" ? "pill--warning" : W === "error" ? "pill--danger" : "pill--info";
    }
    function ue(W) {
      return W === "success" ? n.label("成功", "Success") : W === "warning" ? n.label("警告", "Warning") : W === "error" ? n.label("异常", "Error") : n.label("提示", "Info");
    }
    function de(W) {
      const Q = {
        cron: { zh: "自动化", en: "Automation" },
        recovery: { zh: "备份与恢复", en: "Backup & Recovery" },
        git: { zh: "Git", en: "Git" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" },
        openclaw: { zh: "OpenClaw", en: "OpenClaw" },
        security: { zh: "安全", en: "Security" }
      }[W];
      return Q ? n.label(Q.zh, Q.en) : W || n.label("系统提醒", "System reminder");
    }
    function le(W) {
      const Q = {
        "session-started": { zh: "会话启动", en: "Session started" },
        "session-updated": { zh: "会话更新", en: "Session updated" },
        "session-ended": { zh: "会话结束", en: "Session ended" },
        "runtime-warning": { zh: "运行告警", en: "Runtime warning" },
        "cron-run": { zh: "自动化执行", en: "Automation run" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" }
      }[W];
      return Q ? n.label(Q.zh, Q.en) : W || n.label("系统事件", "System event");
    }
    function Z(W) {
      return W ? W === "cron-ui" ? n.label("Cron 管理", "Cron management") : W === "openclaw" ? "OpenClaw" : W === "guard-ui" ? "Guard UI" : W : n.label("未知来源", "Unknown source");
    }
    function Ue(W) {
      return [W.agentId, W.modelId, W.status].filter(Boolean).join(" · ");
    }
    function pe(W) {
      if (!b.data) return;
      const K = {
        ...b.data,
        summary: {
          items: Array.isArray(W.items) ? W.items : [],
          total: W.total || 0,
          unread: W.unread || 0,
          read: W.read || 0
        }
      };
      b.data = K, t = K;
    }
    async function ge() {
      await b.execute({ silent: !!b.data });
    }
    async function ke(W) {
      const K = !W.read;
      p.value = W.id;
      try {
        const Q = await l1(W.id, K);
        pe(Q.summary), l.pushToast({
          tone: Q.success ? "success" : "error",
          message: Q.success ? K ? n.label("已标记为已读。", "Marked as read.") : n.label("已重新标记为未读。", "Marked as unread again.") : n.label("更新提醒状态失败。", "Failed to update the reminder state.")
        });
      } catch (Q) {
        l.pushToast({
          tone: "error",
          message: Q instanceof Error ? Q.message : String(Q)
        });
      } finally {
        p.value = "";
      }
    }
    async function Ve(W) {
      if (!(W === "clear-all" && !await l.confirm({
        title: n.label("清空全部通知", "Clear all reminders"),
        message: n.label("确认清空全部提醒吗？这个操作不可撤销。", "Clear all reminders? This action cannot be undone."),
        confirmLabel: n.label("确认清空", "Clear all"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        h.value = W;
        try {
          const K = await a1(W);
          pe(K.summary), l.pushToast({
            tone: K.success ? "success" : "error",
            message: K.message
          });
        } catch (K) {
          l.pushToast({
            tone: "error",
            message: K instanceof Error ? K.message : String(K)
          });
        } finally {
          h.value = "";
        }
      }
    }
    async function Je(W) {
      var K;
      if (!(typeof navigator > "u" || !((K = navigator.clipboard) != null && K.writeText))) {
        v.value = W.id;
        try {
          await navigator.clipboard.writeText(JSON.stringify(W, null, 2)), l.pushToast({
            tone: "success",
            message: n.label("提醒详情已复制。", "The reminder details have been copied.")
          });
        } finally {
          v.value = "";
        }
      }
    }
    return (W, K) => (g(), m("div", o1, [
      a("header", i1, [
        a("div", null, [
          a("p", r1, i(s(n).label("通知 / 提醒", "Notifications / Alerts")), 1),
          a("h2", c1, i(s(n).label("提醒与时间线", "Reminders & timeline")), 1),
          a("p", u1, i(s(n).label("把原来分散的提醒和活动时间线收回同一页里，默认先给普通用户看到可处理的提醒，切换到时间线再回看系统最近发生了什么。", "Bring reminders and the activity feed back into one page, so users first see what needs action and then switch to the timeline to review what the system has been doing.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: ge
        }, i(s(b).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      H(Os, {
        items: E.value,
        "active-id": o.value,
        onChange: K[0] || (K[0] = (Q) => o.value = Q)
      }, null, 8, ["items", "active-id"]),
      s(b).loading && !s(b).data ? (g(), m("div", d1, i(s(n).label("正在读取提醒与时间线…", "Loading reminders and timeline events…")), 1)) : s(b).error && !s(b).data ? (g(), m("div", f1, i(s(b).error), 1)) : s(b).data ? (g(), m(j, { key: 2 }, [
        H(ae, {
          title: s(n).label("当前概览", "Current overview"),
          eyebrow: "Overview"
        }, {
          default: Y(() => [
            a("div", p1, [
              a("article", h1, [
                a("p", g1, i(s(n).label("提醒总数", "Total reminders")), 1),
                a("strong", null, i(s(he)(s(b).data.summary.total)), 1),
                a("span", null, i(s(n).label("包含已读与未读提醒", "Includes both read and unread reminders")), 1)
              ]),
              a("article", m1, [
                a("p", b1, i(s(n).label("待处理", "Needs attention")), 1),
                a("strong", null, i(s(he)(s(b).data.summary.unread)), 1),
                a("span", null, i(s(n).label("建议先处理这些未读提醒", "Start with these unread reminders")), 1)
              ]),
              a("article", v1, [
                a("p", y1, i(s(n).label("告警提醒", "Warnings / errors")), 1),
                a("strong", null, i(s(he)($.value)), 1),
                a("span", null, i(s(n).label("包含 warning 与 error 两种严重级别", "Counts both warning and error severity")), 1)
              ]),
              a("article", _1, [
                a("p", w1, i(s(n).label("时间线事件", "Timeline events")), 1),
                a("strong", null, i(s(he)(P.value.length)), 1),
                a("span", null, i(s(n).label("最近活动会从这里回放", "Recent system activity is replayed here")), 1)
              ])
            ]),
            s(b).error ? (g(), m("div", k1, i(s(n).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + i(s(b).error), 1)) : J("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        o.value === "reminders" ? (g(), m(j, { key: 0 }, [
          H(ae, {
            title: s(n).label("筛选与批量操作", "Filters & bulk actions"),
            eyebrow: "Controls"
          }, {
            default: Y(() => [
              a("div", $1, [
                a("label", C1, [
                  a("span", null, i(s(n).label("搜索", "Search")), 1),
                  be(a("input", {
                    "onUpdate:modelValue": K[1] || (K[1] = (Q) => r.value = Q),
                    class: "settings-input",
                    type: "text",
                    placeholder: s(n).label("搜索标题、消息、来源", "Search title, message, or source")
                  }, null, 8, S1), [
                    [xe, r.value]
                  ])
                ]),
                a("label", A1, [
                  a("span", null, i(s(n).label("来源", "Source")), 1),
                  be(a("select", {
                    "onUpdate:modelValue": K[2] || (K[2] = (Q) => c.value = Q),
                    class: "settings-input"
                  }, [
                    a("option", R1, i(s(n).label("全部来源", "All sources")), 1),
                    (g(!0), m(j, null, fe(U.value, (Q) => (g(), m("option", {
                      key: Q,
                      value: Q
                    }, i(Z(Q)), 9, x1))), 128))
                  ], 512), [
                    [mt, c.value]
                  ])
                ]),
                a("label", P1, [
                  a("span", null, i(s(n).label("每页显示", "Per page")), 1),
                  be(a("select", {
                    "onUpdate:modelValue": K[3] || (K[3] = (Q) => d.value = Q),
                    class: "settings-input"
                  }, [
                    (g(), m(j, null, fe(C, (Q) => a("option", {
                      key: Q,
                      value: Q
                    }, i(s(n).label(`${Q} 条`, `${Q}`)), 9, T1)), 64))
                  ], 512), [
                    [mt, d.value]
                  ])
                ])
              ]),
              a("div", E1, [
                a("button", {
                  class: re(["pill-button", { "pill-button--active": u.value === "all" }]),
                  type: "button",
                  onClick: K[4] || (K[4] = (Q) => u.value = "all")
                }, i(s(n).label(`全部 (${s(b).data.summary.total})`, `All (${s(b).data.summary.total})`)), 3),
                a("button", {
                  class: re(["pill-button", { "pill-button--active": u.value === "unread" }]),
                  type: "button",
                  onClick: K[5] || (K[5] = (Q) => u.value = "unread")
                }, i(s(n).label(`未读 (${s(b).data.summary.unread})`, `Unread (${s(b).data.summary.unread})`)), 3),
                a("button", {
                  class: re(["pill-button", { "pill-button--active": u.value === "warning" }]),
                  type: "button",
                  onClick: K[6] || (K[6] = (Q) => u.value = "warning")
                }, i(s(n).label(`警告 (${$.value})`, `Warning (${$.value})`)), 3),
                a("button", {
                  class: re(["pill-button", { "pill-button--active": u.value === "success" }]),
                  type: "button",
                  onClick: K[7] || (K[7] = (Q) => u.value = "success")
                }, i(s(n).label(`成功 (${T.value})`, `Success (${T.value})`)), 3)
              ]),
              a("div", D1, [
                a("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "read-all",
                  onClick: K[8] || (K[8] = (Q) => Ve("read-all"))
                }, i(h.value === "read-all" ? s(n).label("处理中…", "Working…") : s(n).label("全部标记为已读", "Mark all as read")), 9, M1),
                a("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "unread-all",
                  onClick: K[9] || (K[9] = (Q) => Ve("unread-all"))
                }, i(h.value === "unread-all" ? s(n).label("处理中…", "Working…") : s(n).label("全部重新标记为未读", "Mark all as unread")), 9, I1),
                a("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "clear-read",
                  onClick: K[10] || (K[10] = (Q) => Ve("clear-read"))
                }, i(h.value === "clear-read" ? s(n).label("处理中…", "Working…") : s(n).label("清空已读提醒", "Clear read reminders")), 9, O1),
                a("button", {
                  class: "inline-link inline-link--danger",
                  type: "button",
                  disabled: h.value === "clear-all",
                  onClick: K[11] || (K[11] = (Q) => Ve("clear-all"))
                }, i(h.value === "clear-all" ? s(n).label("处理中…", "Working…") : s(n).label("清空全部提醒", "Clear all reminders")), 9, L1)
              ]),
              s(n).developerMode ? J("", !0) : (g(), m("p", N1, i(s(n).label("原始提醒详情复制已收纳到开发者模式里。若要导出 JSON 详情排障，请先到 Settings 打开开发者模式。", "Raw reminder-detail copy now stays behind developer mode. Enable it from Settings if you need the JSON payload for troubleshooting.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          H(ae, {
            title: s(n).label("提醒列表", "Reminder list"),
            eyebrow: "Reminders"
          }, {
            default: Y(() => [
              I.value.length ? (g(), m("div", U1, [
                (g(!0), m(j, null, fe(x.value, (Q) => (g(), m("section", {
                  key: Q.key,
                  class: "timeline-day-group"
                }, [
                  a("div", F1, [
                    a("strong", null, i(Q.label), 1),
                    a("span", null, i(s(n).label(`${Q.items.length} 条提醒`, `${Q.items.length} reminders`)), 1)
                  ]),
                  a("div", G1, [
                    (g(!0), m(j, null, fe(Q.items, (Se) => (g(), m("article", {
                      key: Se.id,
                      class: "provider-card"
                    }, [
                      a("header", B1, [
                        a("div", null, [
                          a("strong", null, i(Se.title || s(n).label("系统提醒", "System reminder")), 1),
                          a("p", null, i(s(Qe)(Se.createdAt)), 1)
                        ]),
                        a("div", V1, [
                          a("span", {
                            class: re(["pill", z(Se.severity)])
                          }, i(ue(Se.severity)), 3),
                          a("span", {
                            class: re(["pill", Se.read ? "pill--muted" : "pill--warning"])
                          }, i(Se.read ? s(n).label("已读", "Read") : s(n).label("未读", "Unread")), 3)
                        ])
                      ]),
                      a("p", null, i(Se.message), 1),
                      a("div", j1, [
                        a("span", z1, i(Z(Se.source)), 1),
                        a("span", W1, i(de(Se.type)), 1)
                      ]),
                      a("div", H1, [
                        a("button", {
                          class: "inline-link",
                          type: "button",
                          disabled: p.value === Se.id,
                          onClick: (ze) => ke(Se)
                        }, i(p.value === Se.id ? s(n).label("处理中…", "Working…") : Se.read ? s(n).label("重新标记为未读", "Mark as unread") : s(n).label("标记为已读", "Mark as read")), 9, K1),
                        s(n).developerMode ? (g(), m("button", {
                          key: 0,
                          class: "inline-link",
                          type: "button",
                          disabled: v.value === Se.id,
                          onClick: (ze) => Je(Se)
                        }, i(v.value === Se.id ? s(n).label("复制中…", "Copying…") : s(n).label("复制详情", "Copy details")), 9, q1)) : J("", !0)
                      ])
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (g(), m("div", J1, i(s(n).label("当前筛选条件下没有匹配的提醒。", "No reminders match the current filters.")), 1)),
              I.value.length ? (g(), m("div", Q1, [
                a("p", Y1, i(s(n).label(
                  `当前第 ${f.value} / ${ee.value} 页，共 ${I.value.length} 条提醒`,
                  `Page ${f.value} of ${ee.value}, ${I.value.length} reminders total`
                )), 1),
                a("div", Z1, [
                  a("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: f.value <= 1,
                    onClick: K[12] || (K[12] = (Q) => f.value -= 1)
                  }, i(s(n).label("上一页", "Previous")), 9, X1),
                  a("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: f.value >= ee.value,
                    onClick: K[13] || (K[13] = (Q) => f.value += 1)
                  }, i(s(n).label("下一页", "Next")), 9, ew)
                ])
              ])) : J("", !0)
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (g(), Ne(ae, {
          key: 1,
          title: s(n).label("最近时间线", "Recent timeline"),
          eyebrow: "Timeline"
        }, {
          default: Y(() => [
            P.value.length ? (g(), m("div", tw, [
              (g(!0), m(j, null, fe(P.value, (Q) => (g(), m("article", {
                key: Q.id,
                class: "provider-card"
              }, [
                a("header", nw, [
                  a("div", null, [
                    a("strong", null, i(Q.title || s(n).label("系统事件", "System event")), 1),
                    a("p", null, i(s(Qe)(Q.createdAt)), 1)
                  ]),
                  a("span", sw, i(le(Q.type)), 1)
                ]),
                a("p", null, i(Q.description), 1),
                Ue(Q) ? (g(), m("p", lw, i(Ue(Q)), 1)) : J("", !0)
              ]))), 128))
            ])) : (g(), m("div", aw, i(s(n).label("时间线里还没有新的记录。", "No timeline events are available yet.")), 1))
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : J("", !0)
    ]));
  }
}), iw = { class: "page-stack" }, rw = { class: "page-header" }, cw = { class: "page-header__eyebrow" }, uw = { class: "page-header__title" }, dw = { class: "page-header__description" }, fw = {
  key: 0,
  class: "page-empty"
}, pw = {
  key: 1,
  class: "page-empty page-empty--error"
}, hw = {
  key: 0,
  class: "status-banner status-banner--warning"
}, gw = { class: "stat-grid" }, mw = { class: "stat-card" }, bw = { class: "stat-card" }, vw = { class: "stat-card__label" }, yw = { class: "stat-card" }, _w = { class: "stat-card__label" }, ww = { class: "stat-card" }, kw = { class: "stat-card__label" }, $w = { class: "muted-copy" }, Cw = {
  key: 0,
  class: "list-stack"
}, Sw = {
  key: 1,
  class: "muted-copy"
}, Aw = { class: "list-stack" }, Rw = { class: "action-row" }, xw = { class: "action-row" }, Pw = {
  key: 0,
  class: "action-row"
}, Tw = { class: "code-panel" }, Ew = { class: "code-panel" }, Dw = /* @__PURE__ */ $e({
  __name: "OpenClawPage",
  setup(e) {
    let t = null;
    const n = Ce(), l = ct(() => ab(), t, { immediate: !1 }), o = D(() => {
      var T;
      return (T = l.data) != null && T.status && typeof l.data.status == "object" ? l.data.status : {};
    }), r = D(() => {
      var T;
      return (T = l.data) != null && T.targets && typeof l.data.targets == "object" ? l.data.targets : {};
    }), c = D(() => o.value.installed === !0), u = D(() => c.value ? n.label("已安装", "Installed") : n.label("未安装", "Not installed")), d = D(() => String(o.value.version || "-")), f = D(() => String(o.value.detectedSource || "-")), p = D(() => String(o.value.effectiveUpdater || r.value.effectiveUpdater || "-")), h = D(() => String(o.value.packageManager || "-")), v = D(() => String(o.value.installCommand || "-")), b = D(() => o.value.installReady === !0), C = D(() => Array.isArray(o.value.installBlockers) ? o.value.installBlockers.map((T) => String(T)).filter(Boolean) : []), E = D(() => Array.isArray(o.value.platformNotes) ? o.value.platformNotes.map((T) => String(T)).filter(Boolean) : []), R = D(() => Array.isArray(r.value.channels) ? r.value.channels.map((T) => String(T)).filter(Boolean) : []), P = D(() => r.value.distTags && typeof r.value.distTags == "object" ? Object.entries(r.value.distTags).map(([T, U]) => `${T}: ${String(U)}`) : []);
    function $(T) {
      return JSON.stringify(T, null, 2);
    }
    return Te(() => l.data, (T) => {
      T && (t = T);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (T, U) => (g(), m("div", iw, [
      a("header", rw, [
        a("div", null, [
          a("p", cw, i(s(n).label("OpenClaw / 生命周期", "OpenClaw / Lifecycle")), 1),
          a("h2", uw, i(s(n).label("OpenClaw 运行与安装状态", "OpenClaw runtime and install state")), 1),
          a("p", dw, i(s(n).label(
            "集中查看当前 OpenClaw 是否已安装、来自哪里、后续应使用什么更新策略，以及本机还能走哪些安全安装路径。",
            "Review whether OpenClaw is installed, where it was detected from, which updater is active, and which safe install paths are still available on this machine."
          )), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: U[0] || (U[0] = (I) => s(l).execute({ silent: !0 }))
        }, i(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", fw, i(s(n).label("正在读取 OpenClaw 状态…", "Loading OpenClaw status…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", pw, i(s(l).error), 1)) : s(l).data ? (g(), m(j, { key: 2 }, [
        s(l).error ? (g(), m("div", hw, i(s(n).label("上一版 OpenClaw 快照仍然保留，但后台刷新失败：", "The last OpenClaw snapshot is still on screen, but the background refresh failed: ")) + i(s(l).error), 1)) : J("", !0),
        H(ae, {
          title: s(n).label("当前状态", "Current status"),
          eyebrow: "Status"
        }, {
          default: Y(() => [
            a("div", gw, [
              a("article", mw, [
                U[1] || (U[1] = a("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                a("strong", null, i(u.value), 1),
                a("span", null, i(d.value), 1)
              ]),
              a("article", bw, [
                a("p", vw, i(s(n).label("检测来源", "Detected source")), 1),
                a("strong", null, i(f.value), 1),
                a("span", null, i(String(o.value.installKind || "-")), 1)
              ]),
              a("article", yw, [
                a("p", _w, i(s(n).label("更新策略", "Updater")), 1),
                a("strong", null, i(p.value), 1),
                a("span", null, i(h.value), 1)
              ]),
              a("article", ww, [
                a("p", kw, i(s(n).label("安装就绪", "Install ready")), 1),
                a("strong", null, i(b.value ? s(n).label("可执行", "Ready") : s(n).label("有阻塞", "Blocked")), 1),
                a("span", null, i(String(o.value.latestVersion || "-")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(n).label("安装与更新提示", "Install and update guidance"),
          eyebrow: "Guide"
        }, {
          default: Y(() => [
            a("div", {
              class: re(["status-banner", b.value ? "status-banner--success" : "status-banner--warning"])
            }, [
              a("div", null, [
                a("strong", null, i(s(n).label("推荐命令", "Recommended command")), 1),
                a("p", $w, i(v.value), 1)
              ])
            ], 2),
            C.value.length ? (g(), m("div", Cw, [
              (g(!0), m(j, null, fe(C.value, (I) => (g(), m("article", {
                key: I,
                class: "risk-row"
              }, [
                a("strong", null, i(s(n).label("当前阻塞", "Current blocker")), 1),
                a("span", null, i(I), 1)
              ]))), 128))
            ])) : (g(), m("p", Sw, i(s(n).label("当前没有额外安装阻塞，可以继续按推荐命令或控制台工作流处理。", "No extra install blockers were reported. You can continue with the recommended command or the console workflow.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(n).label("目标目录与渠道", "Target catalog and channels"),
          eyebrow: "Catalog"
        }, {
          default: Y(() => [
            a("div", Aw, [
              a("article", Rw, [
                a("div", null, [
                  a("h3", null, i(s(n).label("可用渠道", "Available channels")), 1),
                  a("p", null, i(R.value.length ? R.value.join(" / ") : "-"), 1)
                ])
              ]),
              a("article", xw, [
                a("div", null, [
                  a("h3", null, i(s(n).label("Dist Tags", "Dist tags")), 1),
                  a("p", null, i(P.value.length ? P.value.join(" · ") : "-"), 1)
                ])
              ]),
              E.value.length ? (g(), m("article", Pw, [
                a("div", null, [
                  a("h3", null, i(s(n).label("平台提示", "Platform notes")), 1),
                  a("p", null, i(E.value.join(" ")), 1)
                ])
              ])) : J("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        s(n).developerMode ? (g(), Ne(ae, {
          key: 1,
          title: s(n).label("OpenClaw 原始状态", "Raw OpenClaw status"),
          eyebrow: "Developer"
        }, {
          default: Y(() => [
            a("pre", Tw, i($(s(l).data.status)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : J("", !0),
        s(n).developerMode ? (g(), Ne(ae, {
          key: 2,
          title: s(n).label("OpenClaw 目标清单", "Raw OpenClaw target catalog"),
          eyebrow: "Developer"
        }, {
          default: Y(() => [
            a("pre", Ew, i($(s(l).data.targets)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : J("", !0)
      ], 64)) : J("", !0)
    ]));
  }
}), Mw = { class: "page-stack" }, Iw = { class: "page-header" }, Ow = { class: "page-header__eyebrow" }, Lw = { class: "page-header__title" }, Nw = { class: "page-header__description" }, Uw = {
  key: 0,
  class: "page-empty"
}, Fw = {
  key: 1,
  class: "page-empty page-empty--error"
}, Gw = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Bw = { class: "stat-grid" }, Vw = { class: "stat-card" }, jw = { class: "stat-card__label" }, zw = { class: "stat-card" }, Ww = { class: "stat-card__label" }, Hw = { class: "stat-card" }, Kw = { class: "stat-card__label" }, qw = { class: "stat-card" }, Jw = { class: "stat-card__label" }, Qw = { class: "muted-copy" }, Yw = { class: "code-panel" }, Zw = { class: "code-panel" }, Xw = { class: "muted-copy" }, ek = /* @__PURE__ */ $e({
  __name: "OperationsPage",
  setup(e) {
    let t = null;
    const n = Ce(), l = ct(() => lb(), t, { immediate: !1 }), o = D(() => {
      var b;
      return (b = l.data) != null && b.webReport && typeof l.data.webReport == "object" ? l.data.webReport : {};
    }), r = D(() => {
      var b;
      return (b = l.data) != null && b.services && typeof l.data.services == "object" ? l.data.services : {};
    }), c = D(() => Object.entries(r.value)), u = D(() => o.value.running === !0 ? n.label("运行中", "Running") : n.label("未运行", "Stopped")), d = D(() => String(o.value.primaryUrl || "-")), f = D(() => String(o.value.workbenchUrl || "-")), p = D(() => String(o.value.nextAction || "-")), h = D(() => {
      const b = o.value.pid, C = o.value.port;
      return !b && !C ? "-" : b && C ? `PID ${b} · ${n.label("端口", "Port")} ${C}` : b ? `PID ${b}` : `${n.label("端口", "Port")} ${C}`;
    });
    function v(b) {
      return JSON.stringify(b, null, 2);
    }
    return Te(() => l.data, (b) => {
      b && (t = b);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (b, C) => (g(), m("div", Mw, [
      a("header", Iw, [
        a("div", null, [
          a("p", Ow, i(s(n).label("运维 / 运行态", "Operations / Runtime")), 1),
          a("h2", Lw, i(s(n).label("运行态与后台服务", "Runtime and background services")), 1),
          a("p", Nw, i(s(n).label("先把运行状态、访问地址和后台托管信息迁进新壳层，原始快照只在开发者模式下显示。", "Bring runtime status, access URLs, and managed background details into the new shell first. Raw snapshots stay behind developer mode.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: C[0] || (C[0] = (E) => s(l).execute({ silent: !0 }))
        }, i(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", Uw, i(s(n).label("正在加载运维状态…", "Loading operations status…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", Fw, i(s(l).error), 1)) : s(l).data ? (g(), m(j, { key: 2 }, [
        s(l).error ? (g(), m("div", Gw, i(s(n).label("已保留上一版运维快照，但后台刷新失败：", "The last operations snapshot is still on screen, but the background refresh failed: ")) + i(s(l).error), 1)) : J("", !0),
        H(ae, {
          title: s(n).label("运行摘要", "Runtime summary"),
          eyebrow: "Summary"
        }, {
          default: Y(() => [
            a("div", Bw, [
              a("article", Vw, [
                a("p", jw, i(s(n).label("Guard Web", "Guard Web")), 1),
                a("strong", null, i(u.value), 1),
                a("span", null, i(String(o.value.source || "-")), 1)
              ]),
              a("article", zw, [
                a("p", Ww, i(s(n).label("访问地址", "Access URL")), 1),
                a("strong", null, i(d.value), 1),
                a("span", null, i(f.value), 1)
              ]),
              a("article", Hw, [
                a("p", Kw, i(s(n).label("后台进程", "Background process")), 1),
                a("strong", null, i(h.value), 1),
                a("span", null, i(o.value.managed === !0 ? s(n).label("当前由 Guard 托管", "Currently managed by Guard") : s(n).label("当前不是 Guard 托管进程", "This process is not managed by Guard")), 1)
              ]),
              a("article", qw, [
                a("p", Jw, i(s(n).label("服务快照", "Service snapshot")), 1),
                a("strong", null, i(c.value.length), 1),
                a("span", null, i(s(n).label("当前接口返回的服务条目数", "Number of service entries returned by the current API")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(n).label("建议下一步", "Suggested next step"),
          eyebrow: "Guide"
        }, {
          default: Y(() => [
            a("div", {
              class: re(["status-banner", { "status-banner--warning": o.value.running !== !0 }])
            }, [
              a("div", null, [
                a("strong", null, i(s(n).label("下一步", "Next step")), 1),
                a("p", Qw, i(p.value), 1)
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["title"]),
        s(n).developerMode ? (g(), Ne(ae, {
          key: 1,
          title: s(n).label("后台 Web 报告", "Background web report"),
          eyebrow: "Developer"
        }, {
          default: Y(() => [
            a("pre", Yw, i(v(s(l).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : J("", !0),
        s(n).developerMode ? (g(), Ne(ae, {
          key: 2,
          title: s(n).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Developer"
        }, {
          default: Y(() => [
            a("pre", Zw, i(v(s(l).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : (g(), Ne(ae, {
          key: 3,
          title: s(n).label("开发者模式", "Developer mode"),
          eyebrow: "Developer"
        }, {
          default: Y(() => [
            a("p", Xw, i(s(n).label("如果你需要查看原始 Web 报告、服务快照或后续的刷新诊断，请先到 Settings 打开开发者模式。", "If you need raw web reports, service snapshots, or future refresh diagnostics, enable developer mode from Settings first.")), 1)
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : J("", !0)
    ]));
  }
});
function tk(e) {
  return e === "gitee" ? "gitee" : "github";
}
function nk(e, t) {
  return t ? t.protected ? t.remoteReady ? e.label("云端保护已就绪", "Cloud protection ready") : e.label("当前仅本机可恢复", "Local recovery only") : e.label("尚未建立保护", "Protection not set up") : e.label("读取中", "Loading");
}
function bo(e, t) {
  const l = {
    "install-git": { zh: "先安装 Git", en: "Install Git first" },
    "setup-protection": { zh: "先完成保护设置", en: "Complete protection setup first" },
    "save-first-point": { zh: "创建首个恢复点", en: "Create the first recovery point" },
    "save-current-state": { zh: "先保存当前状态", en: "Save the current state first" },
    "review-restored-state": { zh: "检查刚恢复的状态", en: "Review the restored state" },
    "connect-private-remote": { zh: "连接私有仓库", en: "Connect a private remote" },
    "sync-latest-point": { zh: "把最新保护点同步到云端", en: "Sync the latest point to the cloud" },
    protected: { zh: "当前已经受保护", en: "Protection is already in place" }
  }[t || ""];
  return l ? e.label(l.zh, l.en) : t || "-";
}
function sk(e, t) {
  return t.kind === "auto" ? e.label("自动保护", "Auto protection") : t.kind === "restore" ? e.label("恢复点", "Restore point") : e.label("手动保存", "Manual save");
}
function lk(e, t) {
  return t === "success" ? e.label("已完成", "Completed") : t === "error" ? e.label("失败", "Failed") : t === "authorizing" ? e.label("授权中", "Authorizing") : e.label("未开始", "Idle");
}
const ak = { class: "provider-card__header" }, ok = { class: "muted-copy" }, ik = { class: "stat-grid" }, rk = { class: "stat-card" }, ck = { class: "stat-card__label" }, uk = { class: "stat-card" }, dk = { class: "stat-card__label" }, fk = { class: "stat-card" }, pk = { class: "stat-card__label" }, hk = { class: "stat-card" }, gk = { class: "stat-card__label" }, mk = { class: "list-stack" }, bk = { class: "action-row" }, vk = { class: "pill pill--info" }, yk = { class: "action-row" }, _k = { class: "pill pill--success" }, wk = { class: "settings-grid settings-grid--wide" }, kk = { class: "settings-field settings-field--full" }, $k = ["value"], Ck = { class: "page-actions" }, Sk = ["disabled"], Ak = {
  key: 0,
  class: "provider-stack"
}, Rk = { class: "provider-card__header" }, xk = { class: "pill-row" }, Pk = { class: "pill pill--info" }, Tk = {
  key: 0,
  class: "muted-copy"
}, Ek = { class: "page-actions" }, Dk = ["onClick"], Mk = ["disabled", "onClick"], Ik = {
  key: 1,
  class: "page-empty"
}, Ok = /* @__PURE__ */ $e({
  __name: "RecoveryOverviewSection",
  props: {
    overview: {},
    points: {},
    overviewTone: {},
    saveLabel: {},
    savingPoint: { type: Boolean },
    restoringCommit: {}
  },
  emits: ["update:save-label", "save", "restore", "copy-point"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    function o(r) {
      n("update:save-label", r.target.value);
    }
    return (r, c) => (g(), m(j, null, [
      H(ae, {
        title: s(l).label("当前保护状态", "Current protection state"),
        eyebrow: "Overview"
      }, {
        default: Y(() => {
          var u;
          return [
            a("div", ak, [
              a("p", ok, i(s(l).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
              a("span", {
                class: re(["pill", e.overviewTone])
              }, i(s(nk)(s(l), e.overview)), 3)
            ]),
            a("div", ik, [
              a("article", rk, [
                a("p", ck, i(s(l).label("当前主线", "Current branch")), 1),
                a("strong", null, i(e.overview.currentBranch || "-"), 1),
                a("span", null, i(s(l).label("恢复后仍会继续写在这条主线上", "Future saves continue on the same main line after a restore")), 1)
              ]),
              a("article", uk, [
                a("p", dk, i(s(l).label("最近保存", "Last saved")), 1),
                a("strong", null, i(s(Qe)(e.overview.lastSavedAt)), 1),
                a("span", null, i(((u = e.overview.latestPoint) == null ? void 0 : u.title) || s(l).label("还没有恢复点", "No recovery point yet")), 1)
              ]),
              a("article", fk, [
                a("p", pk, i(s(l).label("最近上云", "Last pushed")), 1),
                a("strong", null, i(s(Qe)(e.overview.lastPushedAt)), 1),
                a("span", null, i(e.overview.remoteReady ? s(l).label("云端保护已就绪", "Cloud protection is ready") : s(l).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
              ]),
              a("article", hk, [
                a("p", gk, i(s(l).label("下一步建议", "Recommended next step")), 1),
                a("strong", null, i(s(bo)(s(l), e.overview.nextAction)), 1),
                a("span", null, i(e.overview.unsyncedChanges ? s(l).label("当前存在未同步变更", "There are unsynced changes right now") : s(l).label("当前没有额外待处理变更", "No extra pending changes right now")), 1)
              ])
            ])
          ];
        }),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("下一步建议", "Recommended next actions"),
        eyebrow: "Guide"
      }, {
        default: Y(() => [
          a("div", mk, [
            a("article", bk, [
              a("div", null, [
                a("h3", null, i(s(l).label("先保住现在", "Protect the current state")), 1),
                a("p", null, i(s(l).label("当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。", "Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.")), 1)
              ]),
              a("span", vk, i(s(bo)(s(l), e.overview.nextAction)), 1)
            ]),
            a("article", yk, [
              a("div", null, [
                a("h3", null, i(s(l).label("回退不会删历史", "Restoring does not delete history")), 1),
                a("p", null, i(s(l).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
              ]),
              a("span", _k, i(s(l).label("同一主线继续", "Continue on the same main line")), 1)
            ]),
            (g(!0), m(j, null, fe(e.overview.warnings, (u) => (g(), m("article", {
              key: u,
              class: "risk-row"
            }, [
              a("strong", null, i(s(l).label("注意事项", "Warning")), 1),
              a("span", null, i(u), 1)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("立即保存", "Save now"),
        eyebrow: "Checkpoint"
      }, {
        default: Y(() => [
          a("div", wk, [
            a("label", kk, [
              a("span", null, i(s(l).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
              a("small", null, i(s(l).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
              a("input", {
                value: e.saveLabel,
                "data-testid": "recovery-save-input",
                class: "settings-input",
                type: "text",
                onInput: o
              }, null, 40, $k)
            ])
          ]),
          a("div", Ck, [
            a("button", {
              "data-testid": "recovery-save-button",
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.savingPoint,
              onClick: c[0] || (c[0] = (u) => r.$emit("save"))
            }, i(e.savingPoint ? s(l).label("保存中…", "Saving…") : s(l).label("保存当前状态", "Save current state")), 9, Sk)
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("恢复点时间线", "Recovery point timeline"),
        eyebrow: "Timeline"
      }, {
        default: Y(() => [
          e.points.length ? (g(), m("div", Ak, [
            (g(!0), m(j, null, fe(e.points, (u) => (g(), m("article", {
              key: u.id,
              "data-testid": "recovery-point-card",
              class: "provider-card"
            }, [
              a("header", Rk, [
                a("div", null, [
                  a("strong", null, i(u.title), 1),
                  a("p", null, i(s(Qe)(u.createdAt)) + " | " + i(s(io)(u.commitSha)), 1)
                ]),
                a("div", xk, [
                  a("span", Pk, i(s(sk)(s(l), u)), 1),
                  a("span", {
                    class: re(["pill", u.pushed ? "pill--success" : "pill--warning"])
                  }, i(u.pushed ? s(l).label("已上云", "Synced") : s(l).label("仅本机", "Local only")), 3)
                ])
              ]),
              a("p", null, i(u.summary), 1),
              u.sourceCommitSha ? (g(), m("p", Tk, i(s(l).label("来源节点：", "Source commit: ")) + i(s(io)(u.sourceCommitSha)), 1)) : J("", !0),
              a("div", Ek, [
                a("button", {
                  class: "inline-link",
                  type: "button",
                  onClick: (d) => r.$emit("copy-point", u.commitSha)
                }, i(s(l).label("复制节点", "Copy point")), 9, Dk),
                a("button", {
                  "data-testid": "recovery-restore-button",
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: !u.restorable || e.restoringCommit === u.commitSha,
                  onClick: (d) => r.$emit("restore", u)
                }, i(e.restoringCommit === u.commitSha ? s(l).label("恢复中…", "Restoring…") : s(l).label("回到这个状态", "Restore this state")), 9, Mk)
              ])
            ]))), 128))
          ])) : (g(), m("div", Ik, i(s(l).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
}), Lk = { class: "muted-copy" }, Nk = { class: "list-stack" }, Uk = { class: "page-actions" }, Fk = ["href"], Gk = ["disabled"], Bk = { class: "muted-copy" }, Vk = {
  key: 0,
  class: "status-banner status-banner--warning"
}, jk = { class: "list-stack" }, zk = { class: "provider-card__header" }, Wk = { class: "list-stack" }, Hk = {
  key: 1,
  class: "muted-copy"
}, Kk = { class: "stat-grid" }, qk = { class: "stat-card__label" }, Jk = { class: "stat-grid" }, Qk = { class: "stat-card" }, Yk = { class: "stat-card__label" }, Zk = { class: "stat-card" }, Xk = { class: "stat-card__label" }, e$ = { class: "stat-card" }, t$ = { class: "stat-card__label" }, n$ = { class: "stat-card" }, s$ = { class: "stat-card__label" }, l$ = { class: "page-actions" }, a$ = ["disabled"], o$ = ["disabled"], i$ = ["disabled"], r$ = ["disabled"], c$ = ["disabled"], u$ = {
  key: 0,
  class: "muted-copy"
}, d$ = /* @__PURE__ */ $e({
  __name: "RecoveryReadinessSection",
  props: {
    gitStatus: {},
    syncReadinessItems: {},
    blockerSections: {},
    latestGitSignals: {},
    runningAction: {},
    advancedMessage: {}
  },
  emits: ["copy-repo-path", "copy-remote-url", "check-and-sync", "run-action"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    return (o, r) => (g(), m(j, null, [
      H(ae, {
        title: s(l).label("现在能不能同步？", "Can you sync now?"),
        eyebrow: "Readiness"
      }, {
        default: Y(() => [
          a("p", Lk, i(s(l).label("这里会按步骤告诉你当前卡在哪里，先处理待办项，再继续提交、推送或一键同步。", "This section shows where the flow is blocked right now, so you can resolve the pending item before committing, pushing, or syncing.")), 1),
          a("div", Nk, [
            (g(!0), m(j, null, fe(e.syncReadinessItems, (c) => (g(), m("article", {
              key: c.key,
              class: "action-row"
            }, [
              a("div", null, [
                a("h3", null, i(c.label), 1),
                a("p", null, i(c.detail), 1)
              ]),
              a("span", {
                class: re(["pill", c.ok ? "pill--success" : "pill--warning"])
              }, i(c.ok ? s(l).label("就绪", "Ready") : s(l).label("待处理", "Needs action")), 3)
            ]))), 128))
          ]),
          a("div", Uk, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (c) => n("copy-repo-path"))
            }, i(s(l).label("复制本地目录", "Copy repo path")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[1] || (r[1] = (c) => n("copy-remote-url"))
            }, i(s(l).label("复制远端地址", "Copy remote URL")), 1),
            e.gitStatus.remoteWebUrl ? (g(), m("a", {
              key: 0,
              class: "inline-link",
              href: e.gitStatus.remoteWebUrl,
              target: "_blank",
              rel: "noreferrer"
            }, i(s(l).label("打开远端仓库", "Open remote")), 9, Fk)) : J("", !0),
            a("button", {
              "data-testid": "recovery-check-sync",
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.runningAction === "private" || e.runningAction === "sync",
              onClick: r[2] || (r[2] = (c) => n("check-and-sync"))
            }, i(e.runningAction === "private" || e.runningAction === "sync" ? s(l).label("检查并同步中…", "Checking and syncing…") : s(l).label("检查并同步", "Check and sync")), 9, Gk)
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("为什么现在还不能提交 / 推送？", "Why commit or push is still blocked"),
        eyebrow: "Blockers"
      }, {
        default: Y(() => [
          a("p", Bk, i(s(l).label("如果按钮现在还是灰的，先看这里。它会分别告诉你提交、推送和一键同步卡在什么地方。", "If the actions are still disabled, start here. This card explains what is blocking commit, push, or one-click sync.")), 1),
          e.gitStatus.state.lastError ? (g(), m("div", Vk, i(s(l).label("最近错误：", "Last error: ")) + i(e.gitStatus.state.lastError), 1)) : J("", !0),
          a("div", jk, [
            (g(!0), m(j, null, fe(e.blockerSections, (c) => (g(), m("article", {
              key: c.key,
              class: "provider-card"
            }, [
              a("header", zk, [
                a("strong", null, i(c.title), 1),
                a("span", {
                  class: re(["pill", c.items.length ? "pill--warning" : "pill--success"])
                }, i(c.items.length ? s(l).label("存在阻塞", "Blocked") : s(l).label("已就绪", "Ready")), 3)
              ]),
              a("div", Wk, [
                c.items.length ? (g(!0), m(j, { key: 0 }, fe(c.items, (u) => (g(), m("article", {
                  key: u,
                  class: "risk-row"
                }, [
                  a("strong", null, i(s(l).label("原因", "Reason")), 1),
                  a("span", null, i(u), 1)
                ]))), 128)) : (g(), m("p", Hk, i(c.empty), 1))
              ])
            ]))), 128))
          ]),
          a("div", Kk, [
            (g(!0), m(j, null, fe(e.latestGitSignals, (c) => (g(), m("article", {
              key: c.key,
              class: "stat-card"
            }, [
              a("p", qk, i(c.label), 1),
              a("strong", null, i(c.value), 1),
              a("span", null, i(s(l).label("帮助你判断最近一次动作停在了哪里。", "Use this to understand where the latest action stopped.")), 1)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("当前仓库状态", "Current repository status"),
        eyebrow: "Status"
      }, {
        default: Y(() => [
          a("div", Jk, [
            a("article", Qk, [
              a("p", Yk, i(s(l).label("仓库初始化", "Repository")), 1),
              a("strong", null, i(e.gitStatus.repoInitialized ? s(l).label("已初始化", "Initialized") : s(l).label("未初始化", "Not initialized")), 1),
              a("span", null, i(e.gitStatus.repoPath), 1)
            ]),
            a("article", Zk, [
              a("p", Xk, i(s(l).label("远端仓库", "Remote")), 1),
              a("strong", null, i(e.gitStatus.remoteName || "-"), 1),
              a("span", null, i(e.gitStatus.remoteUrl || s(l).label("还没绑定远端", "No remote connected yet")), 1)
            ]),
            a("article", e$, [
              a("p", t$, i(s(l).label("认证方式", "Auth mode")), 1),
              a("strong", null, i(e.gitStatus.authMode || "-"), 1),
              a("span", null, i(e.gitStatus.authConfigured ? s(l).label("当前已配置认证", "Authentication is configured") : s(l).label("当前还没配置认证", "Authentication is not configured yet")), 1)
            ]),
            a("article", n$, [
              a("p", s$, i(s(l).label("私有检查", "Private check")), 1),
              a("strong", null, i(e.gitStatus.repoPrivate === !0 ? s(l).label("已通过", "Passed") : e.gitStatus.repoPrivate === !1 ? s(l).label("未通过", "Failed") : s(l).label("未检查", "Pending")), 1),
              a("span", null, i(e.gitStatus.state.lastSyncAt ? `${s(l).label("最近同步", "Last sync")} ${s(Qe)(e.gitStatus.state.lastSyncAt)}` : s(l).label("还没有成功同步记录", "No successful sync record yet")), 1)
            ])
          ]),
          a("div", l$, [
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.runningAction === "init",
              onClick: r[3] || (r[3] = (c) => n("run-action", "init"))
            }, i(e.runningAction === "init" ? s(l).label("初始化中…", "Initializing…") : s(l).label("初始化保护仓库", "Initialize protection repo")), 9, a$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "private",
              onClick: r[4] || (r[4] = (c) => n("run-action", "private"))
            }, i(e.runningAction === "private" ? s(l).label("检查中…", "Checking…") : s(l).label("检查私有仓库", "Check private remote")), 9, o$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "checkpoint",
              onClick: r[5] || (r[5] = (c) => n("run-action", "checkpoint"))
            }, i(e.runningAction === "checkpoint" ? s(l).label("提交中…", "Committing…") : s(l).label("创建本地 checkpoint", "Create local checkpoint")), 9, i$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "push",
              onClick: r[6] || (r[6] = (c) => n("run-action", "push"))
            }, i(e.runningAction === "push" ? s(l).label("推送中…", "Pushing…") : s(l).label("推送到云端", "Push to cloud")), 9, r$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "sync",
              onClick: r[7] || (r[7] = (c) => n("run-action", "sync"))
            }, i(e.runningAction === "sync" ? s(l).label("同步中…", "Syncing…") : s(l).label("提交并同步", "Commit and sync")), 9, c$)
          ]),
          e.advancedMessage ? (g(), m("p", u$, i(e.advancedMessage), 1)) : J("", !0)
        ]),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
}), f$ = { class: "muted-copy" }, p$ = { class: "pill-row" }, h$ = { class: "muted-copy" }, g$ = { class: "muted-copy" }, m$ = { class: "settings-grid settings-grid--wide" }, b$ = { class: "settings-field" }, v$ = ["value"], y$ = { class: "settings-field" }, _$ = { class: "settings-field settings-field--full" }, w$ = { class: "page-actions" }, k$ = ["disabled"], $$ = ["disabled"], C$ = ["href"], S$ = { class: "provider-card__header" }, A$ = { class: "muted-copy" }, R$ = { class: "pill-row" }, x$ = { class: "settings-grid settings-grid--wide" }, P$ = { class: "settings-field" }, T$ = ["value"], E$ = { class: "settings-field" }, D$ = { class: "settings-field settings-field--full" }, M$ = { class: "muted-copy" }, I$ = { class: "page-actions" }, O$ = ["disabled"], L$ = { class: "settings-grid settings-grid--wide" }, N$ = { class: "settings-field" }, U$ = ["value"], F$ = { class: "settings-field" }, G$ = { class: "settings-field settings-field--full" }, B$ = { class: "settings-field" }, V$ = { class: "settings-field" }, j$ = { class: "page-actions" }, z$ = ["disabled"], W$ = ["disabled"], H$ = { class: "muted-copy" }, K$ = {
  key: 0,
  class: "muted-copy"
}, q$ = ["href"], J$ = {
  key: 1,
  class: "code-panel"
}, Q$ = /* @__PURE__ */ $e({
  __name: "RecoveryRemoteSection",
  props: {
    overview: {},
    gitStatus: {},
    gitProviderOptions: {},
    connectDraft: {},
    tokenDraft: {},
    oauthDraft: {},
    authSummary: {},
    oauthTone: {},
    oauthAuthorizeUrl: {},
    oauthState: {},
    runningAction: {}
  },
  emits: ["connect-remote", "check-private", "token-auth", "oauth-start", "copy-auth-url"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    return (o, r) => (g(), m(j, null, [
      H(ae, {
        title: s(l).label("高级 Git 工具", "Advanced Git tools"),
        eyebrow: "Advanced"
      }, {
        default: Y(() => [
          a("p", f$, i(s(l).label("远端连接、认证、同步检查、保护点提交、推送和 .gitignore 建议都已经收口到这里。日常的保护与恢复流程，现在可以直接留在当前控制台里完成。", "Remote connection, authentication, sync checks, checkpoints, push actions, and .gitignore suggestions now live here. The normal protection and recovery workflow can stay in this console.")), 1),
          a("div", p$, [
            a("span", {
              class: re(["pill", e.overview.remoteReady ? "pill--success" : "pill--warning"])
            }, i(e.overview.remoteReady ? s(l).label("云端保护已就绪", "Cloud protection ready") : s(l).label("云端保护尚未就绪", "Cloud protection not ready")), 3),
            a("span", {
              class: re(["pill", e.gitStatus.authConfigured ? "pill--success" : "pill--muted"])
            }, i(e.gitStatus.authConfigured ? s(l).label("认证已配置", "Authentication configured") : s(l).label("认证未配置", "Authentication not configured")), 3)
          ]),
          a("p", h$, i(s(l).label("大部分保护流程都可以直接在这里完成，只有极少数底层排障才需要切回 CLI。", "Most protection flows can stay here; only a small set of low-level troubleshooting cases should still need the CLI.")), 1)
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("远端连接", "Remote connection"),
        eyebrow: "Remote"
      }, {
        default: Y(() => [
          a("p", g$, i(s(l).label("先把保护主线接到 GitHub 或 Gitee 的私有仓库上。Guard 会优先沿这条线保存恢复点和云端备份。", "Connect the protection line to a private GitHub or Gitee repository first. Guard uses this path for recovery points and cloud protection.")), 1),
          a("div", m$, [
            a("label", b$, [
              a("span", null, i(s(l).label("Provider", "Provider")), 1),
              be(a("select", {
                "onUpdate:modelValue": r[0] || (r[0] = (c) => e.connectDraft.provider = c),
                class: "settings-input"
              }, [
                (g(!0), m(j, null, fe(e.gitProviderOptions, (c) => (g(), m("option", {
                  key: c.value,
                  value: c.value
                }, i(s(l).label(c.zh, c.en)), 9, v$))), 128))
              ], 512), [
                [mt, e.connectDraft.provider]
              ])
            ]),
            a("label", y$, [
              a("span", null, i(s(l).label("远端名称", "Remote name")), 1),
              be(a("input", {
                "onUpdate:modelValue": r[1] || (r[1] = (c) => e.connectDraft.remoteName = c),
                class: "settings-input",
                type: "text"
              }, null, 512), [
                [xe, e.connectDraft.remoteName]
              ])
            ]),
            a("label", _$, [
              a("span", null, i(s(l).label("远端仓库地址", "Remote URL")), 1),
              a("small", null, i(s(l).label("当前只支持 GitHub / Gitee，后续私有仓检查也会沿用这里的地址。", "Only GitHub / Gitee are supported right now, and the private-repo verification uses this same remote.")), 1),
              be(a("input", {
                "onUpdate:modelValue": r[2] || (r[2] = (c) => e.connectDraft.remoteUrl = c),
                "data-testid": "recovery-remote-url",
                class: "settings-input",
                type: "text",
                placeholder: "https://github.com/owner/private-repo.git"
              }, null, 512), [
                [xe, e.connectDraft.remoteUrl]
              ])
            ])
          ]),
          a("div", w$, [
            a("button", {
              "data-testid": "recovery-connect-remote",
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.runningAction === "connect",
              onClick: r[3] || (r[3] = (c) => n("connect-remote"))
            }, i(e.runningAction === "connect" ? s(l).label("绑定中…", "Connecting…") : s(l).label("绑定远端仓库", "Connect remote")), 9, k$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "private",
              onClick: r[4] || (r[4] = (c) => n("check-private"))
            }, i(e.runningAction === "private" ? s(l).label("检查中…", "Checking…") : s(l).label("检查私有仓库", "Check private remote")), 9, $$),
            e.gitStatus.remoteWebUrl ? (g(), m("a", {
              key: 0,
              class: "inline-link",
              href: e.gitStatus.remoteWebUrl,
              target: "_blank",
              rel: "noreferrer"
            }, i(s(l).label("打开远端仓库", "Open remote")), 9, C$)) : J("", !0)
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("远端认证", "Remote authentication"),
        eyebrow: "Auth"
      }, {
        default: Y(() => {
          var c, u, d;
          return [
            a("div", S$, [
              a("p", A$, i(e.authSummary), 1),
              a("div", R$, [
                a("span", {
                  class: re(["pill", e.gitStatus.authConfigured ? "pill--success" : "pill--muted"])
                }, i(e.gitStatus.authMode || s(l).label("未配置", "Not configured")), 3),
                a("span", {
                  class: re(["pill", e.oauthTone])
                }, i(s(lk)(s(l), (c = e.oauthState) == null ? void 0 : c.phase)), 3)
              ])
            ]),
            a("div", x$, [
              a("label", P$, [
                a("span", null, i(s(l).label("Token Provider", "Token provider")), 1),
                be(a("select", {
                  "onUpdate:modelValue": r[5] || (r[5] = (f) => e.tokenDraft.provider = f),
                  class: "settings-input"
                }, [
                  (g(!0), m(j, null, fe(e.gitProviderOptions, (f) => (g(), m("option", {
                    key: `token-${f.value}`,
                    value: f.value
                  }, i(s(l).label(f.zh, f.en)), 9, T$))), 128))
                ], 512), [
                  [mt, e.tokenDraft.provider]
                ])
              ]),
              a("label", E$, [
                a("span", null, i(s(l).label("账号（可选）", "Username (optional)")), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[6] || (r[6] = (f) => e.tokenDraft.username = f),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [xe, e.tokenDraft.username]
                ])
              ]),
              a("label", D$, [
                a("span", null, i(s(l).label("HTTPS Token", "HTTPS token")), 1),
                a("small", null, i(s(l).label("如果你想直接用 HTTPS 完成提交和推送，就在这里保存 Token。", "Save a token here if you want Guard to commit and push with HTTPS credentials.")), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[7] || (r[7] = (f) => e.tokenDraft.token = f),
                  class: "settings-input",
                  type: "password",
                  autocomplete: "off"
                }, null, 512), [
                  [xe, e.tokenDraft.token]
                ])
              ])
            ]),
            a("p", M$, i(s(l).label("已保存的 Token 不会在这里回显；如果后续要轮换，请重新粘贴新的 Token。", "Saved tokens are never echoed here. Paste a new one again when you need to rotate credentials.")), 1),
            a("div", I$, [
              a("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: e.runningAction === "token",
                onClick: r[8] || (r[8] = (f) => n("token-auth"))
              }, i(e.runningAction === "token" ? s(l).label("保存中…", "Saving…") : s(l).label("保存 Token 认证", "Save token auth")), 9, O$)
            ]),
            a("div", L$, [
              a("label", N$, [
                a("span", null, i(s(l).label("OAuth Provider", "OAuth provider")), 1),
                be(a("select", {
                  "onUpdate:modelValue": r[9] || (r[9] = (f) => e.oauthDraft.provider = f),
                  class: "settings-input"
                }, [
                  (g(!0), m(j, null, fe(e.gitProviderOptions, (f) => (g(), m("option", {
                    key: `oauth-${f.value}`,
                    value: f.value
                  }, i(s(l).label(f.zh, f.en)), 9, U$))), 128))
                ], 512), [
                  [mt, e.oauthDraft.provider]
                ])
              ]),
              a("label", F$, [
                a("span", null, i(s(l).label("回调端口", "Redirect port")), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[10] || (r[10] = (f) => e.oauthDraft.redirectPort = f),
                  class: "settings-input",
                  type: "number",
                  min: "1",
                  max: "65535"
                }, null, 512), [
                  [xe, e.oauthDraft.redirectPort]
                ])
              ]),
              a("label", G$, [
                a("span", null, i(s(l).label("Scope", "Scope")), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[11] || (r[11] = (f) => e.oauthDraft.scope = f),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [xe, e.oauthDraft.scope]
                ])
              ]),
              a("label", B$, [
                a("span", null, i(s(l).label("Client ID", "Client ID")), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[12] || (r[12] = (f) => e.oauthDraft.clientId = f),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [xe, e.oauthDraft.clientId]
                ])
              ]),
              a("label", V$, [
                a("span", null, i(s(l).label("Client Secret", "Client Secret")), 1),
                be(a("input", {
                  "onUpdate:modelValue": r[13] || (r[13] = (f) => e.oauthDraft.clientSecret = f),
                  class: "settings-input",
                  type: "password",
                  autocomplete: "off"
                }, null, 512), [
                  [xe, e.oauthDraft.clientSecret]
                ])
              ])
            ]),
            a("div", j$, [
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: e.runningAction === "oauth",
                onClick: r[14] || (r[14] = (f) => n("oauth-start"))
              }, i(e.runningAction === "oauth" ? s(l).label("启动中…", "Starting…") : s(l).label("启动 OAuth", "Start OAuth")), 9, z$),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: !e.oauthAuthorizeUrl,
                onClick: r[15] || (r[15] = (f) => n("copy-auth-url"))
              }, i(s(l).label("复制授权地址", "Copy auth URL")), 9, W$)
            ]),
            a("p", H$, i(((u = e.oauthState) == null ? void 0 : u.phase) === "success" ? e.oauthState.message || s(l).label("OAuth 已完成，可以继续私有仓检查或一键同步。", "OAuth completed. Continue with private-check or sync.") : ((d = e.oauthState) == null ? void 0 : d.phase) === "error" ? e.oauthState.error || e.oauthState.message || s(l).label("OAuth 失败，请检查网络、Client ID、Client Secret 和回调设置。", "OAuth failed. Check the network, Client ID, Client Secret, and callback settings.") : s(l).label("如果你更偏好浏览器授权，可以在这里填写 Client ID / Client Secret。", "Configure Client ID / Client Secret here if you prefer browser OAuth.")), 1),
            e.oauthAuthorizeUrl ? (g(), m("p", K$, [
              ft(i(s(l).label("授权地址：", "Authorize URL: ")) + " ", 1),
              a("a", {
                href: e.oauthAuthorizeUrl,
                target: "_blank",
                rel: "noreferrer"
              }, i(e.oauthAuthorizeUrl), 9, q$)
            ])) : J("", !0),
            s(l).developerMode ? (g(), m("pre", J$, i(JSON.stringify(e.oauthState || {}, null, 2)), 1)) : J("", !0)
          ];
        }),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
}), Y$ = {
  key: 0,
  class: "muted-copy"
}, Z$ = {
  key: 1,
  class: "path-tree"
}, X$ = ["open"], eC = { class: "path-tree__label" }, tC = { class: "path-tree__icon" }, nC = { class: "path-tree__meta" }, sC = { class: "path-tree__label" }, lC = { class: "path-tree__meta" }, vo = /* @__PURE__ */ $e({
  __name: "PathTreeList",
  props: {
    nodes: {},
    depth: { default: 0 },
    expandDepth: { default: 0 },
    emptyLabel: { default: "" }
  },
  setup(e) {
    const t = e, n = Ce(), l = D(() => t.nodes);
    function o(r) {
      return r.kind === "folder" ? n.label(`${he(r.leafCount)} 项路径`, `${he(r.leafCount)} paths`) : n.label("文件", "File");
    }
    return (r, c) => {
      const u = mc("PathTreeList", !0);
      return l.value.length ? (g(), m("ul", Z$, [
        (g(!0), m(j, null, fe(l.value, (d) => (g(), m("li", {
          key: `${e.depth}-${d.path}`,
          class: "path-tree__item"
        }, [
          d.kind === "folder" ? (g(), m("details", {
            key: 0,
            class: "path-tree__details",
            open: e.depth < e.expandDepth
          }, [
            a("summary", {
              class: "path-tree__summary",
              style: Un({ paddingLeft: `${e.depth * 18}px` })
            }, [
              a("span", eC, [
                a("span", tC, i(e.depth < e.expandDepth ? "▾" : "▸"), 1),
                a("span", null, i(d.name) + "/", 1)
              ]),
              a("span", nC, i(o(d)), 1)
            ], 4),
            H(u, {
              nodes: d.children,
              depth: e.depth + 1,
              "expand-depth": e.expandDepth,
              "empty-label": e.emptyLabel
            }, null, 8, ["nodes", "depth", "expand-depth", "empty-label"])
          ], 8, X$)) : (g(), m("div", {
            key: 1,
            class: "path-tree__file",
            style: Un({ paddingLeft: `${e.depth * 18 + 24}px` })
          }, [
            a("span", sC, [
              c[0] || (c[0] = a("span", { class: "path-tree__icon" }, "•", -1)),
              a("span", null, i(d.name), 1)
            ]),
            a("span", lC, i(o(d)), 1)
          ], 4))
        ]))), 128))
      ])) : (g(), m("div", Y$, i(e.emptyLabel), 1));
    };
  }
}), aC = { class: "muted-copy" }, oC = { class: "stat-grid" }, iC = { class: "stat-card__label" }, rC = {
  key: 0,
  class: "status-banner status-banner--warning"
}, cC = { class: "provider-card__header" }, uC = { class: "muted-copy" }, dC = {
  key: 0,
  class: "provider-card"
}, fC = { class: "provider-card__header" }, pC = { class: "pill pill--muted" }, hC = { class: "list-stack" }, gC = { class: "muted-copy" }, mC = { class: "provider-card__header" }, bC = { class: "muted-copy" }, vC = {
  key: 0,
  class: "list-stack"
}, yC = { class: "provider-card__header" }, _C = { class: "pill pill--warning" }, wC = {
  key: 1,
  class: "page-empty"
}, kC = { class: "settings-grid settings-grid--wide" }, $C = { class: "muted-copy" }, CC = { class: "stat-grid" }, SC = { class: "stat-card" }, AC = { class: "stat-card__label" }, RC = { class: "stat-card" }, xC = { class: "stat-card__label" }, PC = {
  key: 0,
  class: "code-panel"
}, TC = {
  key: 1,
  class: "muted-copy"
}, EC = { class: "page-actions" }, DC = ["disabled"], MC = /* @__PURE__ */ $e({
  __name: "RecoveryScopeSection",
  props: {
    gitStatus: {},
    gitIgnorePreview: {},
    scopeSummaryItems: {},
    stageableTreeNodes: {},
    allChangedTreeNodes: {},
    embeddedRepoGuidance: {},
    runningAction: {}
  },
  emits: ["copy-stageable-list", "copy-skipped-repos", "apply-gitignore"],
  setup(e, { emit: t }) {
    const n = t, l = Ce();
    return (o, r) => (g(), m(j, null, [
      H(ae, {
        title: s(l).label("同步范围建议", "Sync scope guidance"),
        eyebrow: "Scope"
      }, {
        default: Y(() => [
          a("p", aC, i(s(l).label("目标不是把整个 .openclaw 全量塞进 Git，而是把真正值得换机保留的内容和运行副产物分开。", "The goal is not to push the entire .openclaw into Git, but to separate high-value portable content from runtime by-products.")), 1),
          a("div", oC, [
            (g(!0), m(j, null, fe(e.scopeSummaryItems, (c) => (g(), m("article", {
              key: c.key,
              class: "stat-card"
            }, [
              a("p", iC, i(c.label), 1),
              a("strong", null, i(c.value), 1),
              a("span", null, i(c.detail), 1)
            ]))), 128))
          ]),
          e.gitStatus.skippedEmbeddedRepos.length ? (g(), m("div", rC, i(s(l).label(`Guard 检测到 ${e.gitStatus.skippedEmbeddedRepos.length} 个嵌套 Git 仓库。它们不会被纳入外层 .openclaw 的本次提交，请按下方建议单独处理。`, `Guard detected ${e.gitStatus.skippedEmbeddedRepos.length} embedded Git repositories. They stay outside the current root .openclaw commit and should be handled separately.`)), 1)) : J("", !0)
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("这次会提交哪些内容？", "What will be included in this commit"),
        eyebrow: "Tree"
      }, {
        default: Y(() => [
          a("div", cC, [
            a("p", uC, i(s(l).label("改成目录树展示，既能看清结构，也不会被超长平铺列表拖慢。这里只展示会进入外层保护仓库提交的路径。", "Rendered as a folder tree so the structure stays visible without a huge flat list. Only the paths entering the root protection commit are shown here.")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (c) => n("copy-stageable-list"))
            }, i(s(l).label("复制完整清单", "Copy full list")), 1)
          ]),
          H(vo, {
            nodes: e.stageableTreeNodes,
            "expand-depth": 0,
            "empty-label": s(l).label("当前没有可直接提交的普通文件。", "No stageable root-repo files detected.")
          }, null, 8, ["nodes", "empty-label"]),
          e.allChangedTreeNodes.length ? (g(), m("details", dC, [
            a("summary", fC, [
              a("strong", null, i(s(l).label("查看全部变更目录树", "View all changed paths")), 1),
              a("span", pC, i(s(he)(e.gitStatus.changedFiles.length)), 1)
            ]),
            a("div", hC, [
              a("p", gC, i(s(l).label("这里会包含将被跳过的嵌套仓库路径，方便你对照完整范围做判断。", "This broader tree includes paths that may be skipped as embedded repositories, so you can compare against the full working scope.")), 1),
              H(vo, {
                nodes: e.allChangedTreeNodes,
                "expand-depth": 0,
                "empty-label": s(l).label("当前没有本地变更。", "No local changes.")
              }, null, 8, ["nodes", "empty-label"])
            ])
          ])) : J("", !0)
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("已自动跳过的嵌套仓库", "Skipped embedded repositories"),
        eyebrow: "Embedded"
      }, {
        default: Y(() => [
          a("div", mC, [
            a("p", bC, i(s(l).label("这些路径带有自己的 .git，不会被外层保护仓库纳入本次提交。你可以继续独立维护它们，或按需要重新规划边界。", "These paths contain their own .git directories and stay outside the root protection commit. You can keep them independent or re-plan the boundary as needed.")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[1] || (r[1] = (c) => n("copy-skipped-repos"))
            }, i(s(l).label("复制仓库列表", "Copy repo list")), 1)
          ]),
          e.gitStatus.skippedEmbeddedRepos.length ? (g(), m("div", vC, [
            (g(!0), m(j, null, fe(e.gitStatus.skippedEmbeddedRepos, (c) => (g(), m("article", {
              key: c,
              class: "provider-card"
            }, [
              a("header", yC, [
                a("strong", null, i(c) + "/", 1),
                a("span", _C, i(s(l).label("已自动跳过", "Skipped")), 1)
              ]),
              a("p", null, i(s(l).label("这是嵌套 Git 仓库，需要单独处理，或加入外层忽略规则。", "This is an embedded Git repository and should be handled separately or added to the root ignore rules.")), 1)
            ]))), 128))
          ])) : (g(), m("div", wC, i(s(l).label("当前没有检测到嵌套 Git 仓库。", "No embedded Git repositories detected right now.")), 1)),
          a("div", kC, [
            (g(!0), m(j, null, fe(e.embeddedRepoGuidance, (c) => (g(), m("article", {
              key: c.key,
              class: "provider-card"
            }, [
              a("strong", null, i(c.title), 1),
              a("p", null, i(c.detail), 1)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label(".gitignore 建议", ".gitignore suggestions"),
        eyebrow: "Ignore rules"
      }, {
        default: Y(() => [
          a("p", $C, i(s(l).label("当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。", "When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.")), 1),
          a("div", CC, [
            a("article", SC, [
              a("p", AC, i(s(l).label("嵌套仓库", "Embedded repos")), 1),
              a("strong", null, i(e.gitIgnorePreview.embeddedRepos.length), 1),
              a("span", null, i(s(l).label("需要单独维护的子仓库", "Child repositories that should be maintained separately")), 1)
            ]),
            a("article", RC, [
              a("p", xC, i(s(l).label("待追加规则", "Missing rules")), 1),
              a("strong", null, i(e.gitIgnorePreview.missingEntries.length), 1),
              a("span", null, i(e.gitIgnorePreview.gitignorePath), 1)
            ])
          ]),
          s(l).developerMode ? (g(), m("pre", PC, i(e.gitIgnorePreview.appendBlock || s(l).label("当前没有需要追加的规则。", "There are no extra rules to append right now.")), 1)) : (g(), m("p", TC, i(s(l).label("推荐规则的原始追加块已经收口到开发者模式中。若你需要逐行检查 appendBlock，请先到 Settings 打开开发者模式。", "The raw append block for recommended rules now stays behind developer mode. Enable it from Settings if you need to inspect the exact appendBlock line by line.")), 1)),
          a("div", EC, [
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "gitignore",
              onClick: r[2] || (r[2] = (c) => n("apply-gitignore"))
            }, i(e.runningAction === "gitignore" ? s(l).label("写入中…", "Applying…") : s(l).label("追加推荐规则", "Append recommended rules")), 9, DC)
          ])
        ]),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
});
function yo(e, t) {
  return {
    name: e,
    path: t,
    kind: "folder",
    children: [],
    leafCount: 0,
    map: /* @__PURE__ */ new Map()
  };
}
function or(e) {
  const t = [...e.children].map((l) => or(l)).sort((l, o) => l.kind !== o.kind ? l.kind === "folder" ? -1 : 1 : l.name.localeCompare(o.name));
  if (e.kind === "file")
    return {
      name: e.name,
      path: e.path,
      kind: "file",
      children: [],
      leafCount: 1
    };
  const n = t.reduce((l, o) => l + o.leafCount, 0);
  return {
    name: e.name,
    path: e.path,
    kind: "folder",
    children: t,
    leafCount: n
  };
}
function _o(e) {
  var n, l;
  const t = yo("", "");
  for (const o of e) {
    const r = o.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    if (!r) continue;
    const c = r.split("/").filter(Boolean);
    let u = t, d = "";
    for (let f = 0; f < c.length; f += 1) {
      const p = c[f];
      if (d = d ? `${d}/${p}` : p, f === c.length - 1) {
        const C = {
          name: p,
          path: d,
          kind: "file",
          children: [],
          leafCount: 1
        };
        u.children.push(C);
        continue;
      }
      const v = (n = u.map) == null ? void 0 : n.get(p);
      if (v) {
        u = v;
        continue;
      }
      const b = yo(p, d);
      u.children.push(b), (l = u.map) == null || l.set(p, b), u = b;
    }
  }
  return or(t).children;
}
async function IC() {
  const [e, t, n, l] = await Promise.all([
    Ee("/api/recovery/overview"),
    Ee("/api/recovery/points?limit=20"),
    Ee("/api/git-sync/status"),
    Ee("/api/git-sync/gitignore-preview?mode=smart")
  ]);
  return {
    overview: e,
    points: t.items || [],
    gitStatus: n,
    gitIgnorePreview: l
  };
}
function OC(e) {
  return Oe("/api/recovery/save", { label: e || "" });
}
function LC(e) {
  return Oe("/api/recovery/restore", { commitSha: e });
}
function NC() {
  return Oe("/api/git-sync/init", {});
}
function UC(e) {
  return Oe("/api/git-sync/connect", e);
}
function FC(e) {
  return Oe("/api/git-sync/auth/token", e);
}
function GC(e) {
  return Oe("/api/git-sync/auth/oauth", e);
}
function Xs() {
  return Oe("/api/git-sync/check-private", {});
}
function BC(e) {
  return Oe("/api/git-sync/commit", { message: "" });
}
function VC() {
  return Oe("/api/git-sync/push", {});
}
function wo(e) {
  return Oe("/api/git-sync/sync", { message: "" });
}
function jC(e = "smart") {
  return Oe("/api/git-sync/gitignore-apply", { mode: e });
}
const zC = [
  { value: "github", zh: "GitHub", en: "GitHub" },
  { value: "gitee", zh: "Gitee", en: "Gitee" }
];
let ko = null;
function WC() {
  const e = Ce(), t = it(), n = /* @__PURE__ */ F("center"), l = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F(""), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(""), d = ct(() => IC(), ko, {
    immediate: !1
  }), f = /* @__PURE__ */ pt({
    provider: "github",
    remoteUrl: "",
    remoteName: "origin"
  }), p = /* @__PURE__ */ pt({
    provider: "github",
    token: "",
    username: ""
  }), h = /* @__PURE__ */ pt({
    provider: "github",
    clientId: "",
    clientSecret: "",
    scope: "repo read:user",
    redirectPort: "43189"
  }), v = D(() => [
    { id: "center", label: e.label("恢复中心", "Recovery center") },
    { id: "advanced", label: e.label("高级 Git", "Advanced Git") }
  ]), b = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.overview;
    return w ? !w.repoReady || w.warnings.length > 0 ? "pill--warning" : w.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
  }), C = D(
    () => {
      var w;
      return ((w = d.data) == null ? void 0 : w.gitStatus.state.oauth) || null;
    }
  ), E = D(() => {
    var w;
    return ((w = C.value) == null ? void 0 : w.authorizeUrl) || "";
  }), R = D(() => {
    var w, G, oe;
    return ((w = C.value) == null ? void 0 : w.phase) === "success" ? "pill--success" : ((G = C.value) == null ? void 0 : G.phase) === "error" ? "pill--warning" : ((oe = C.value) == null ? void 0 : oe.phase) === "authorizing" ? "pill--info" : "pill--muted";
  }), P = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.gitStatus;
    if (!w) return "";
    if (w.authConfigured) {
      const oe = w.accountUsername ? `，账号 ${w.accountUsername}` : "";
      return e.label(
        `当前已配置 ${w.authMode || "token"} 认证${oe}。`,
        `Authentication is configured with ${w.authMode || "token"}${w.accountUsername ? ` for ${w.accountUsername}` : ""}.`
      );
    }
    return e.label("当前还没有配置远端认证。", "Remote authentication is not configured yet.");
  }), $ = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.gitStatus;
    return w ? [
      {
        key: "commit",
        label: e.label("本地提交", "Commit ready"),
        ok: !!w.canCommit,
        detail: w.canCommit ? e.label("可以执行本地 commit。", "Ready for local commit.") : e.label("当前仍有提交阻塞项。", "Commit is still blocked.")
      },
      {
        key: "push",
        label: e.label("远端推送", "Push ready"),
        ok: !!w.canPush,
        detail: w.canPush ? e.label("可以执行远端 push。", "Ready for remote push.") : e.label("当前仍有推送阻塞项。", "Push is still blocked.")
      },
      {
        key: "sync",
        label: e.label("一键同步", "Sync ready"),
        ok: !!w.canSync,
        detail: w.canSync ? e.label("可以执行检查并同步。", "Ready for check and sync.") : e.label("当前仍有同步阻塞项。", "Sync is still blocked.")
      }
    ] : [];
  }), T = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.gitStatus;
    return w ? [
      {
        key: "commit",
        title: e.label("提交阻塞", "Commit blockers"),
        items: w.commitReasons,
        empty: e.label("本地提交链路已就绪。", "Commit path is ready.")
      },
      {
        key: "push",
        title: e.label("推送阻塞", "Push blockers"),
        items: w.pushReasons,
        empty: e.label("远端推送链路已就绪。", "Push path is ready.")
      },
      {
        key: "sync",
        title: e.label("同步阻塞", "Sync blockers"),
        items: w.reasons,
        empty: e.label("当前没有同步阻塞项。", "No sync blockers detected.")
      }
    ] : [];
  }), U = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.gitStatus;
    return w ? [
      {
        key: "check",
        label: e.label("最近检查", "Last check"),
        value: Qe(w.state.lastCheckedAt || null)
      },
      {
        key: "commit",
        label: e.label("最近提交", "Last commit"),
        value: Qe(w.state.lastCommitAt || null)
      },
      {
        key: "push",
        label: e.label("最近推送", "Last push"),
        value: Qe(w.state.lastSyncAt || null)
      }
    ] : [];
  }), I = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.gitStatus;
    return w ? [
      {
        key: "all",
        label: e.label("全部变更", "All changes"),
        value: he(w.changedFiles.length),
        detail: e.label(
          "当前工作树里所有已检测到的变更路径。",
          "All changed paths detected in the current worktree."
        ),
        tone: w.changedFiles.length ? "pill--warning" : "pill--muted"
      },
      {
        key: "stageable",
        label: e.label("会进入本次提交", "Included in this commit"),
        value: he(w.stageableChangedFiles.length),
        detail: e.label(
          "这些路径会纳入外层保护仓库的本次提交。",
          "These paths will enter the current root protection commit."
        ),
        tone: w.stageableChangedFiles.length ? "pill--success" : "pill--muted"
      },
      {
        key: "embedded",
        label: e.label("已自动跳过", "Skipped embedded repos"),
        value: he(w.skippedEmbeddedRepos.length),
        detail: e.label(
          "带独立 .git 的子仓库不会被外层提交直接接管。",
          "Child repositories with their own .git stay outside the root commit."
        ),
        tone: w.skippedEmbeddedRepos.length ? "pill--warning" : "pill--success"
      }
    ] : [];
  }), ee = D(
    () => {
      var w;
      return _o(((w = d.data) == null ? void 0 : w.gitStatus.stageableChangedFiles) || []);
    }
  ), _ = D(
    () => {
      var w;
      return _o(((w = d.data) == null ? void 0 : w.gitStatus.changedFiles) || []);
    }
  ), x = D(() => [
    {
      key: "independent",
      title: e.label("方案 1：继续独立维护", "Option 1: Keep it independent"),
      detail: e.label(
        "推荐做法。把子仓库路径加入外层 .gitignore，之后外层保护仓库只管理主仓内容。",
        "Recommended. Add child-repository paths to the root .gitignore so the root protection repository only manages the main repository."
      )
    },
    {
      key: "flatten",
      title: e.label("方案 2：并入主仓", "Option 2: Flatten into the root repo"),
      detail: e.label(
        "如果你想把内容并入主仓，需要先移除子目录里的 .git，再重新 add / commit。",
        "If you want the content to live inside the root repository, remove the child .git directory first and then add and commit again."
      )
    },
    {
      key: "separate",
      title: e.label("方案 3：继续单独同步", "Option 3: Sync separately"),
      detail: e.label(
        "保持子仓库不变，但请到对应子目录里独立执行它自己的 commit / push。",
        "Leave the child repository untouched, but commit and push from inside that child directory separately."
      )
    }
  ]);
  function S() {
    var oe;
    const w = (oe = d.data) == null ? void 0 : oe.gitStatus;
    if (!w) return;
    const G = tk(w.provider);
    f.provider = G, f.remoteUrl = w.remoteUrl || "", f.remoteName = w.remoteName || "origin", p.provider = G, p.username = w.accountUsername || "", p.token = "", h.provider = G;
  }
  async function z() {
    await d.execute({ silent: !!d.data });
  }
  function ue(w) {
    n.value = w === "advanced" ? "advanced" : "center";
  }
  function de(w) {
    l.value = w;
  }
  async function le() {
    r.value = !0;
    try {
      const w = await OC(l.value.trim() || void 0);
      t.pushToast({
        tone: w.success ? "success" : "error",
        message: w.message
      }), w.success && (l.value = "", await z());
    } catch (w) {
      t.pushToast({
        tone: "error",
        message: w instanceof Error ? w.message : String(w)
      });
    } finally {
      r.value = !1;
    }
  }
  async function Z(w) {
    if (await t.confirm({
      title: e.label("恢复到这个状态", "Restore this state"),
      message: e.label(
        `确认回到 ${w.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
        `Restore ${w.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`
      ),
      confirmLabel: e.label("确认恢复", "Restore now"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    })) {
      c.value = w.commitSha;
      try {
        const oe = await LC(w.commitSha);
        t.pushToast({
          tone: oe.success ? "success" : "error",
          message: oe.message
        }), await z();
      } catch (oe) {
        t.pushToast({
          tone: "error",
          message: oe instanceof Error ? oe.message : String(oe)
        });
      } finally {
        c.value = "";
      }
    }
  }
  async function Ue(w) {
    u.value = w, o.value = "";
    try {
      const G = w === "init" ? await NC() : w === "private" ? await Xs() : w === "checkpoint" ? await BC() : w === "push" ? await VC() : w === "sync" ? await wo() : await jC("smart");
      o.value = G.message, t.pushToast({
        tone: G.success ? "success" : "error",
        message: G.message
      }), await z();
    } catch (G) {
      const oe = G instanceof Error ? G.message : String(G);
      o.value = oe, t.pushToast({
        tone: "error",
        message: oe
      });
    } finally {
      u.value = "";
    }
  }
  async function pe(w, G) {
    u.value = w, o.value = "";
    try {
      const oe = await G();
      return o.value = oe.message, t.pushToast({
        tone: oe.success ? "success" : "error",
        message: oe.message
      }), await z(), oe;
    } catch (oe) {
      const y = oe instanceof Error ? oe.message : String(oe);
      return o.value = y, t.pushToast({
        tone: "error",
        message: y
      }), null;
    } finally {
      u.value = "";
    }
  }
  async function ge(w, G) {
    if (!(w != null && w.success) || !G) return w;
    const oe = await pe("private", () => Xs());
    return oe ? (o.value = [w.message, oe.message].filter(Boolean).join("；"), oe) : w;
  }
  async function ke() {
    var G;
    if (!f.remoteUrl.trim()) {
      t.pushToast({
        tone: "error",
        message: e.label("请先填写远端仓库地址。", "Remote URL is required.")
      });
      return;
    }
    const w = await pe(
      "connect",
      () => UC({
        provider: f.provider,
        remoteUrl: f.remoteUrl.trim(),
        remoteName: f.remoteName.trim() || "origin"
      })
    );
    await ge(w, !!((G = w == null ? void 0 : w.status) != null && G.authConfigured));
  }
  async function Ve() {
    var G;
    if (!p.token.trim()) {
      t.pushToast({
        tone: "error",
        message: e.label("请先粘贴 Token。", "Token is required.")
      });
      return;
    }
    const w = await pe(
      "token",
      () => FC({
        provider: p.provider,
        token: p.token.trim(),
        username: p.username.trim() || void 0
      })
    );
    w != null && w.success && (p.token = ""), await ge(w, !!((G = w == null ? void 0 : w.status) != null && G.remoteUrl));
  }
  async function Je() {
    if (!h.clientId.trim() || !h.clientSecret.trim()) {
      t.pushToast({
        tone: "error",
        message: e.label(
          "请先填写 Client ID 和 Client Secret。",
          "Client ID and Client Secret are required."
        )
      });
      return;
    }
    const w = await pe(
      "oauth",
      () => GC({
        provider: h.provider,
        clientId: h.clientId.trim(),
        clientSecret: h.clientSecret.trim(),
        scope: h.scope.trim() || void 0,
        redirectPort: Number(h.redirectPort) || void 0,
        openBrowser: !0
      })
    );
    w != null && w.output && typeof window < "u" && window.open(w.output, "_blank", "noopener,noreferrer");
  }
  async function W() {
    var w;
    !E.value || typeof navigator > "u" || !((w = navigator.clipboard) != null && w.writeText) || (await navigator.clipboard.writeText(E.value), t.pushToast({
      tone: "success",
      message: e.label("授权链接已复制。", "Authorization URL copied.")
    }));
  }
  async function K(w, G, oe) {
    var y;
    if (!w || typeof navigator > "u" || !((y = navigator.clipboard) != null && y.writeText)) {
      t.pushToast({
        tone: "error",
        message: oe
      });
      return;
    }
    await navigator.clipboard.writeText(w), t.pushToast({
      tone: "success",
      message: G
    });
  }
  async function Q() {
    var w;
    await K(
      (w = d.data) == null ? void 0 : w.gitStatus.repoPath,
      e.label("本地目录已复制。", "Repository path copied."),
      e.label("当前没有可复制的本地目录。", "No repository path is available yet.")
    );
  }
  async function Se() {
    var w;
    await K(
      (w = d.data) == null ? void 0 : w.gitStatus.remoteUrl,
      e.label("远端地址已复制。", "Remote URL copied."),
      e.label("当前还没有远端地址可复制。", "No remote URL is available yet.")
    );
  }
  async function ze() {
    const w = await pe("private", () => Xs());
    if (!(w != null && w.success)) return;
    const G = await pe("sync", () => wo());
    G && (o.value = [w.message, G.message].filter(Boolean).join("；"));
  }
  async function je() {
    var w;
    await K(
      (((w = d.data) == null ? void 0 : w.gitStatus.stageableChangedFiles) || []).join(`
`),
      e.label("待提交清单已复制。", "Stageable file list copied."),
      e.label("当前没有可复制的待提交清单。", "No stageable file list is available right now.")
    );
  }
  async function O() {
    var w;
    await K(
      (((w = d.data) == null ? void 0 : w.gitStatus.skippedEmbeddedRepos) || []).join(`
`),
      e.label("嵌套仓库列表已复制。", "Skipped repository list copied."),
      e.label("当前没有被跳过的嵌套仓库。", "No skipped embedded repositories are available right now.")
    );
  }
  async function ne(w) {
    var G;
    typeof navigator > "u" || !((G = navigator.clipboard) != null && G.writeText) || (await navigator.clipboard.writeText(w), t.pushToast({
      tone: "success",
      message: e.label("恢复点哈希已复制。", "Recovery point hash copied.")
    }));
  }
  return Te(
    () => d.data,
    (w) => {
      w && (ko = w), w && S();
    }
  ), Te(
    () => {
      var w;
      return [n.value, (w = C.value) == null ? void 0 : w.phase];
    },
    ([w, G], oe, y) => {
      if (typeof window > "u" || w !== "advanced" || G !== "authorizing")
        return;
      const k = window.setInterval(() => {
        z();
      }, 3e3);
      y(() => window.clearInterval(k));
    }
  ), nt(() => {
    d.execute({ silent: !!d.data });
  }), {
    resource: d,
    view: n,
    recoveryTabs: v,
    saveLabel: l,
    advancedMessage: o,
    savingPoint: r,
    restoringCommit: c,
    runningAction: u,
    connectDraft: f,
    tokenDraft: p,
    oauthDraft: h,
    overviewTone: b,
    oauthState: C,
    oauthAuthorizeUrl: E,
    authSummary: P,
    oauthTone: R,
    syncReadinessItems: $,
    blockerSections: T,
    latestGitSignals: U,
    scopeSummaryItems: I,
    stageableTreeNodes: ee,
    allChangedTreeNodes: _,
    embeddedRepoGuidance: x,
    gitProviderOptions: zC,
    refreshPage: z,
    setView: ue,
    setSaveLabel: de,
    handleSavePoint: le,
    handleRestore: Z,
    runAdvancedAction: Ue,
    handleConnectRemote: ke,
    handleTokenAuth: Ve,
    handleOAuthStart: Je,
    copyAuthorizeUrl: W,
    handleCopyRepoPath: Q,
    handleCopyRemoteUrl: Se,
    handleCheckAndSync: ze,
    handleCopyStageableList: je,
    handleCopySkippedRepos: O,
    copyPoint: ne
  };
}
const HC = { class: "page-stack" }, KC = { class: "page-header" }, qC = { class: "page-header__eyebrow" }, JC = { class: "page-header__title" }, QC = { class: "page-header__description" }, YC = {
  key: 0,
  class: "page-empty"
}, ZC = {
  key: 1,
  class: "page-empty page-empty--error"
}, XC = {
  key: 0,
  class: "status-banner status-banner--warning"
}, eS = /* @__PURE__ */ $e({
  __name: "RecoveryPage",
  setup(e) {
    const t = Ce(), {
      resource: n,
      view: l,
      recoveryTabs: o,
      saveLabel: r,
      advancedMessage: c,
      savingPoint: u,
      restoringCommit: d,
      runningAction: f,
      connectDraft: p,
      tokenDraft: h,
      oauthDraft: v,
      overviewTone: b,
      oauthState: C,
      oauthAuthorizeUrl: E,
      authSummary: R,
      oauthTone: P,
      syncReadinessItems: $,
      blockerSections: T,
      latestGitSignals: U,
      scopeSummaryItems: I,
      stageableTreeNodes: ee,
      allChangedTreeNodes: _,
      embeddedRepoGuidance: x,
      gitProviderOptions: S,
      refreshPage: z,
      setView: ue,
      setSaveLabel: de,
      handleSavePoint: le,
      handleRestore: Z,
      runAdvancedAction: Ue,
      handleConnectRemote: pe,
      handleTokenAuth: ge,
      handleOAuthStart: ke,
      copyAuthorizeUrl: Ve,
      handleCopyRepoPath: Je,
      handleCopyRemoteUrl: W,
      handleCheckAndSync: K,
      handleCopyStageableList: Q,
      handleCopySkippedRepos: Se,
      copyPoint: ze
    } = WC();
    return (je, O) => (g(), m("div", HC, [
      a("header", KC, [
        a("div", null, [
          a("p", qC, i(s(t).label("备份 / 恢复", "Backup / Recovery")), 1),
          a("h2", JC, i(s(t).label("备份与恢复", "Backup & Recovery")), 1),
          a("p", QC, i(s(t).label("把“先保存当前状态、需要时安全回退、然后继续往前走”的主流程留在当前控制台里；只有更底层的仓库排障才进入高级 Git 视图。", "Keep the main flow of saving the current state, rolling back safely when needed, and continuing forward in this console; use the advanced Git view only for deeper repository troubleshooting.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: O[0] || (O[0] = //@ts-ignore
          (...ne) => s(z) && s(z)(...ne))
        }, i(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新", "Refresh")), 1)
      ]),
      H(Os, {
        items: s(o),
        "active-id": s(l),
        onChange: s(ue)
      }, null, 8, ["items", "active-id", "onChange"]),
      s(n).loading && !s(n).data ? (g(), m("div", YC, i(s(t).label("正在读取保护状态…", "Loading protection status…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", ZC, i(s(n).error), 1)) : s(n).data ? (g(), m(j, { key: 2 }, [
        s(n).error ? (g(), m("div", XC, i(s(t).label("已保留上一版备份与恢复快照，但后台刷新失败：", "The last backup and recovery snapshot is still on screen, but the background refresh failed: ")) + i(s(n).error), 1)) : J("", !0),
        s(l) === "center" ? (g(), Ne(Ok, {
          key: 1,
          overview: s(n).data.overview,
          points: s(n).data.points,
          "overview-tone": s(b),
          "save-label": s(r),
          "saving-point": s(u),
          "restoring-commit": s(d),
          "onUpdate:saveLabel": s(de),
          onSave: s(le),
          onRestore: s(Z),
          onCopyPoint: s(ze)
        }, null, 8, ["overview", "points", "overview-tone", "save-label", "saving-point", "restoring-commit", "onUpdate:saveLabel", "onSave", "onRestore", "onCopyPoint"])) : (g(), m(j, { key: 2 }, [
          H(Q$, {
            overview: s(n).data.overview,
            "git-status": s(n).data.gitStatus,
            "git-provider-options": s(S),
            "connect-draft": s(p),
            "token-draft": s(h),
            "oauth-draft": s(v),
            "auth-summary": s(R),
            "oauth-tone": s(P),
            "oauth-authorize-url": s(E),
            "oauth-state": s(C),
            "running-action": s(f),
            onConnectRemote: s(pe),
            onCheckPrivate: O[1] || (O[1] = (ne) => s(Ue)("private")),
            onTokenAuth: s(ge),
            onOauthStart: s(ke),
            onCopyAuthUrl: s(Ve)
          }, null, 8, ["overview", "git-status", "git-provider-options", "connect-draft", "token-draft", "oauth-draft", "auth-summary", "oauth-tone", "oauth-authorize-url", "oauth-state", "running-action", "onConnectRemote", "onTokenAuth", "onOauthStart", "onCopyAuthUrl"]),
          H(d$, {
            "git-status": s(n).data.gitStatus,
            "sync-readiness-items": s($),
            "blocker-sections": s(T),
            "latest-git-signals": s(U),
            "running-action": s(f),
            "advanced-message": s(c),
            onCopyRepoPath: s(Je),
            onCopyRemoteUrl: s(W),
            onCheckAndSync: s(K),
            onRunAction: s(Ue)
          }, null, 8, ["git-status", "sync-readiness-items", "blocker-sections", "latest-git-signals", "running-action", "advanced-message", "onCopyRepoPath", "onCopyRemoteUrl", "onCheckAndSync", "onRunAction"]),
          H(MC, {
            "git-status": s(n).data.gitStatus,
            "git-ignore-preview": s(n).data.gitIgnorePreview,
            "scope-summary-items": s(I),
            "stageable-tree-nodes": s(ee),
            "all-changed-tree-nodes": s(_),
            "embedded-repo-guidance": s(x),
            "running-action": s(f),
            onCopyStageableList: s(Q),
            onCopySkippedRepos: s(Se),
            onApplyGitignore: O[2] || (O[2] = (ne) => s(Ue)("gitignore"))
          }, null, 8, ["git-status", "git-ignore-preview", "scope-summary-items", "stageable-tree-nodes", "all-changed-tree-nodes", "embedded-repo-guidance", "running-action", "onCopyStageableList", "onCopySkippedRepos"])
        ], 64))
      ], 64)) : J("", !0)
    ]));
  }
}), tS = "~/.openclaw/workspace";
function ir(e) {
  return e.replace(/[\\/]+$/, "");
}
function nS(e) {
  return ir(e.trim()).replace(/\\/g, "/");
}
function sS(e) {
  return e.includes("\\") && !e.includes("/") ? "\\" : "/";
}
function kl(e) {
  const t = nS(e), n = sS(e), l = t.lastIndexOf("/"), o = l >= 0 ? t.slice(0, l) : "", r = l >= 0 ? t.slice(l + 1) : t;
  return {
    normalized: t,
    directory: o,
    baseName: r,
    separator: n
  };
}
function $l(e) {
  return (typeof e == "string" ? ir(e.trim()) : "") || tS;
}
function lS(e, t) {
  const n = $l(e), l = typeof t == "string" ? t.trim() : "";
  if (!l)
    return n;
  const o = kl(n), r = `${o.baseName}-${l}`;
  return o.directory ? `${o.directory.replace(/\//g, o.separator)}${o.separator}${r}` : r;
}
function aS(e, t) {
  const n = $l(e), l = $l(t), o = kl(n), r = kl(l);
  if (r.normalized === o.normalized)
    return "";
  const c = `${o.baseName}-`;
  return r.directory === o.directory && r.baseName.startsWith(c) ? r.baseName.slice(c.length) : null;
}
function oS() {
  return Ee("/api/agents");
}
function $o(e) {
  return Oe("/api/agents", e);
}
function iS(e) {
  return Ql(`/api/agents/${encodeURIComponent(e)}`);
}
let Co = null;
function rr(e) {
  return e.docStatus.soul && e.docStatus.user && e.docStatus.agents && e.docStatus.memory;
}
function el(e, t) {
  e.originalId = t.isConfigured ? t.id : "", e.id = t.isConfigured ? t.id : "", e.name = t.isConfigured ? t.name : "", e.workspaceMode = t.workspaceName !== null ? "named" : "custom", e.workspaceName = t.workspaceName ?? "", e.workspace = t.workspace, e.modelId = t.modelId || "", e.isDefault = t.isDefault, e.ensureWorkspace = !t.workspaceExists, e.bootstrapWorkspaceDocs = !1, e.canDelete = t.isConfigured;
}
function Rn(e, t, n) {
  e.originalId = "", e.id = "", e.name = "", e.workspaceMode = "named", e.workspaceName = "", e.workspace = (t == null ? void 0 : t.defaults.workspace) || "~/.openclaw/workspace", e.modelId = (t == null ? void 0 : t.defaults.modelId) || "", e.isDefault = n === 0, e.ensureWorkspace = !0, e.bootstrapWorkspaceDocs = !1, e.canDelete = !1;
}
function rS() {
  const e = Ce(), t = it(), n = ct(() => oS(), Co, { immediate: !1 }), l = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ pt({
    originalId: "",
    id: "",
    name: "",
    workspaceMode: "named",
    workspaceName: "",
    workspace: "~/.openclaw/workspace",
    modelId: "",
    isDefault: !0,
    ensureWorkspace: !0,
    bootstrapWorkspaceDocs: !1,
    canDelete: !1
  }), d = D(() => {
    var S;
    return ((S = n.data) == null ? void 0 : S.agents) || [];
  }), f = D(() => {
    var S;
    return ((S = n.data) == null ? void 0 : S.defaults) || {
      workspace: "~/.openclaw/workspace",
      modelId: null
    };
  }), p = D(() => d.value.filter((S) => S.isDefault).length), h = D(() => d.value.filter((S) => S.workspaceExists).length), v = D(() => d.value.filter((S) => rr(S)).length), b = D(
    () => d.value.find((S) => S.id === l.value && S.isConfigured) || null
  ), C = D(() => !u.originalId), E = D(
    () => u.workspaceMode === "named" ? lS(f.value.workspace, u.workspaceName) : u.workspace.trim() || f.value.workspace
  ), R = D(
    () => u.originalId ? e.label("编辑现有 Agent", "Edit existing agent") : e.label("新增 Agent", "Create agent")
  );
  Te(
    () => n.data,
    (S) => {
      if (S && (Co = S), !S)
        return;
      const z = S.agents.filter((ue) => ue.isConfigured).length;
      if (!o.value) {
        Rn(u, S, z), o.value = !0;
        return;
      }
      if (b.value) {
        el(u, b.value);
        return;
      }
      u.originalId || Rn(u, S, z);
    },
    { immediate: !0 }
  ), nt(() => {
    n.execute({ silent: !!n.data });
  });
  async function P() {
    await n.execute({ silent: !0 });
  }
  function $() {
    l.value = "", Rn(u, n.data, d.value.filter((S) => S.isConfigured).length);
  }
  function T(S) {
    if (!S.isConfigured) {
      $();
      return;
    }
    l.value = S.id, el(u, S);
  }
  function U() {
    if (b.value) {
      el(u, b.value);
      return;
    }
    Rn(u, n.data, d.value.filter((S) => S.isConfigured).length);
  }
  function I(S) {
    if (u.workspaceMode !== S) {
      if (S === "named") {
        u.workspaceName = aS(f.value.workspace, u.workspace) ?? u.workspaceName, u.workspaceMode = "named";
        return;
      }
      u.workspace = E.value, u.workspaceMode = "custom";
    }
  }
  async function ee() {
    r.value = !0;
    try {
      const S = u.workspaceMode === "named", z = await $o({
        originalId: u.originalId || void 0,
        id: u.id.trim(),
        name: u.name.trim() || void 0,
        workspaceName: S ? u.workspaceName.trim() : void 0,
        workspace: S ? void 0 : u.workspace.trim() || void 0,
        modelId: u.modelId.trim() || void 0,
        isDefault: u.isDefault,
        ensureWorkspace: u.ensureWorkspace,
        bootstrapWorkspaceDocs: u.originalId ? void 0 : u.bootstrapWorkspaceDocs
      });
      t.pushToast({
        tone: z.success ? "success" : "error",
        message: z.message
      }), z.success && (u.workspace = E.value, l.value = u.id.trim(), await P());
    } catch (S) {
      t.pushToast({
        tone: "error",
        message: S instanceof Error ? S.message : String(S)
      });
    } finally {
      r.value = !1;
    }
  }
  async function _() {
    if (!(!u.canDelete || !u.originalId || !await t.confirm({
      title: e.label("删除 Agent", "Delete agent"),
      message: e.label(
        `确认删除 ${u.originalId} 吗？这会从当前生效的 openclaw.json 中移除这条 Agent 配置。`,
        `Delete ${u.originalId}? This removes the agent entry from the active openclaw.json.`
      ),
      confirmLabel: e.label("确认删除", "Delete"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    }))) {
      c.value = !0;
      try {
        const z = await iS(u.originalId);
        t.pushToast({
          tone: z.success ? "success" : "error",
          message: z.message
        }), z.success && (l.value = "", await P(), Rn(u, n.data, d.value.filter((ue) => ue.isConfigured).length));
      } catch (z) {
        t.pushToast({
          tone: "error",
          message: z instanceof Error ? z.message : String(z)
        });
      } finally {
        c.value = !1;
      }
    }
  }
  async function x(S) {
    if (!(!S.isConfigured || S.isDefault))
      try {
        const z = await $o({
          originalId: S.id,
          id: S.id,
          name: S.name,
          workspaceName: S.workspaceName ?? void 0,
          workspace: S.workspaceName !== null ? void 0 : S.workspace,
          modelId: S.modelId || void 0,
          isDefault: !0
        });
        t.pushToast({
          tone: z.success ? "success" : "error",
          message: z.message
        }), z.success && await P();
      } catch (z) {
        t.pushToast({
          tone: "error",
          message: z instanceof Error ? z.message : String(z)
        });
      }
  }
  return {
    resource: n,
    agents: d,
    defaults: f,
    draft: u,
    saving: r,
    deleting: c,
    defaultCount: p,
    workspaceReadyCount: h,
    docReadyCount: v,
    isCreateMode: C,
    workspacePreview: E,
    editorModeLabel: R,
    beginCreateAgent: $,
    editAgent: T,
    resetDraft: U,
    setWorkspaceMode: I,
    refresh: P,
    handleSaveAgent: ee,
    handleDeleteAgent: _,
    handleSetDefault: x
  };
}
const cS = { class: "page-stack" }, uS = { class: "page-header" }, dS = { class: "page-header__eyebrow" }, fS = { class: "page-header__title" }, pS = { class: "page-header__description" }, hS = { class: "page-actions" }, gS = {
  key: 0,
  class: "page-empty"
}, mS = {
  key: 1,
  class: "page-empty page-empty--error"
}, bS = {
  key: 0,
  class: "status-banner status-banner--warning"
}, vS = { class: "stat-grid" }, yS = { class: "stat-card" }, _S = { class: "stat-card__label" }, wS = { class: "stat-card" }, kS = { class: "stat-card__label" }, $S = { class: "stat-card" }, CS = { class: "stat-card__label" }, SS = { class: "stat-card" }, AS = { class: "stat-card__label" }, RS = { class: "provider-card__header" }, xS = { class: "muted-copy" }, PS = { class: "pill-row" }, TS = { class: "pill pill--info" }, ES = { class: "settings-grid settings-grid--wide" }, DS = { class: "settings-field" }, MS = { class: "settings-field" }, IS = ["placeholder"], OS = { class: "settings-field settings-field--full" }, LS = { class: "pill-row" }, NS = {
  key: 0,
  class: "settings-field settings-field--full"
}, US = ["placeholder"], FS = {
  key: 1,
  class: "settings-field settings-field--full"
}, GS = { class: "settings-field settings-field--full" }, BS = ["placeholder"], VS = { class: "settings-grid settings-grid--wide" }, jS = { class: "settings-toggle" }, zS = { class: "settings-toggle__copy" }, WS = { class: "settings-toggle" }, HS = { class: "settings-toggle__copy" }, KS = {
  key: 0,
  class: "settings-toggle"
}, qS = { class: "settings-toggle__copy" }, JS = { class: "settings-note" }, QS = { class: "page-actions" }, YS = ["disabled"], ZS = ["disabled"], XS = ["disabled"], e0 = ["disabled"], t0 = {
  key: 0,
  class: "provider-stack"
}, n0 = { class: "provider-card__header" }, s0 = { class: "pill-row" }, l0 = {
  key: 0,
  class: "pill pill--success"
}, a0 = {
  key: 1,
  class: "pill pill--muted"
}, o0 = {
  key: 2,
  class: "pill pill--info"
}, i0 = { class: "mini-list" }, r0 = { class: "mini-list__item mini-list__item--stack" }, c0 = { class: "mini-list__item mini-list__item--stack" }, u0 = { class: "mini-list__item mini-list__item--stack" }, d0 = { class: "pill-row" }, f0 = {
  key: 0,
  class: "muted-copy"
}, p0 = { class: "page-actions" }, h0 = ["onClick"], g0 = ["onClick"], m0 = ["onClick"], b0 = {
  key: 1,
  class: "page-empty"
}, v0 = /* @__PURE__ */ $e({
  __name: "RolesPage",
  setup(e) {
    const t = Ce(), n = Xl(), l = Ls(), {
      resource: o,
      agents: r,
      defaults: c,
      draft: u,
      saving: d,
      deleting: f,
      defaultCount: p,
      workspaceReadyCount: h,
      docReadyCount: v,
      isCreateMode: b,
      workspacePreview: C,
      editorModeLabel: E,
      beginCreateAgent: R,
      editAgent: P,
      resetDraft: $,
      setWorkspaceMode: T,
      refresh: U,
      handleSaveAgent: I,
      handleDeleteAgent: ee,
      handleSetDefault: _
    } = rS();
    function x(de) {
      l.setMode("all"), l.setCurrentPath(de.resolvedWorkspace), l.setSelectedFilePath(""), l.setSelectedMemoryFilePath(""), n.push("/files");
    }
    function S(de) {
      return t.developerMode ? de.resolvedWorkspace || de.workspace || de.id : de.workspace || de.id;
    }
    function z(de) {
      return t.developerMode ? t.label("当前显示的是实际工作区路径。", "Showing the resolved workspace path.") : de.workspaceExists ? t.label("实际路径保留在开发者模式里，直接点“打开工作区”继续查看即可。", "The exact path stays behind developer mode. Use Open workspace to continue.") : t.label("Guard 还没有在当前机器上找到这个工作区目录。", "Guard has not found this workspace directory on the current machine yet.");
    }
    function ue(de) {
      return de.workspaceName === null ? t.label("自定义路径", "Custom path") : de.workspaceName ? de.workspaceName : t.label("默认工作区", "Default workspace");
    }
    return (de, le) => (g(), m("div", cS, [
      a("header", uS, [
        a("div", null, [
          a("p", dS, i(s(t).label("角色 / 工作区", "Roles / Workspace")), 1),
          a("h2", fS, i(s(t).label("角色目录", "Role catalog")), 1),
          a("p", pS, i(s(t).label(
            "在这里直接创建 Agent、切换默认角色，并维护工作区和模型路由配置。",
            "Create agents, switch the default role, and maintain workspace and model routing config from one place."
          )), 1)
        ]),
        a("div", hS, [
          a("button", {
            class: "inline-link",
            type: "button",
            "data-testid": "roles-add-agent",
            onClick: le[0] || (le[0] = //@ts-ignore
            (...Z) => s(R) && s(R)(...Z))
          }, i(s(t).label("新增 Agent", "Add agent")), 1),
          a("button", {
            class: "page-header__action",
            type: "button",
            onClick: le[1] || (le[1] = //@ts-ignore
            (...Z) => s(U) && s(U)(...Z))
          }, i(s(o).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新", "Refresh")), 1)
        ])
      ]),
      s(o).loading && !s(o).data ? (g(), m("div", gS, i(s(t).label("正在读取角色目录…", "Loading the role catalog…")), 1)) : s(o).error && !s(o).data ? (g(), m("div", mS, i(s(o).error), 1)) : (g(), m(j, { key: 2 }, [
        s(o).error ? (g(), m("div", bS, i(s(t).label("上一版角色目录仍然保留在页面上，但后台刷新失败了：", "The last role catalog is still on screen, but the background refresh failed: ")) + i(s(o).error), 1)) : J("", !0),
        H(ae, {
          title: s(t).label("团队概览", "Team overview"),
          eyebrow: "Summary"
        }, {
          default: Y(() => [
            a("div", vS, [
              a("article", yS, [
                a("p", _S, i(s(t).label("角色总数", "Roles")), 1),
                a("strong", null, i(s(he)(s(r).length)), 1),
                a("span", null, i(s(t).label("当前已接入 Guard 的角色条目", "Role entries currently discovered by Guard")), 1)
              ]),
              a("article", wS, [
                a("p", kS, i(s(t).label("默认角色", "Default role")), 1),
                a("strong", null, i(s(he)(s(p))), 1),
                a("span", null, i(s(p) > 0 ? s(t).label("至少有一个默认角色", "At least one default role is configured") : s(t).label("还没有默认角色", "No default role is configured yet")), 1)
              ]),
              a("article", $S, [
                a("p", CS, i(s(t).label("工作区可用", "Workspaces ready")), 1),
                a("strong", null, i(s(he)(s(h))), 1),
                a("span", null, i(s(t).label("对应的工作区目录已经存在", "The mapped workspace directory already exists")), 1)
              ]),
              a("article", SS, [
                a("p", AS, i(s(t).label("关键文档齐全", "Core docs ready")), 1),
                a("strong", null, i(s(he)(s(v))), 1),
                le[16] || (le[16] = a("span", null, "SOUL / USER / AGENTS / MEMORY", -1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(t).label("Agent 配置", "Agent configuration"),
          eyebrow: "Editor"
        }, {
          default: Y(() => [
            a("div", RS, [
              a("div", null, [
                a("strong", null, i(s(E)), 1),
                a("p", xS, i(s(t).label(
                  `默认工作区：${s(c).workspace}；默认模型：${s(c).modelId || "未设置"}`,
                  `Default workspace: ${s(c).workspace}; default model: ${s(c).modelId || "not set"}`
                )), 1)
              ]),
              a("div", PS, [
                a("span", {
                  class: re(["pill", s(u).originalId ? "pill--warning" : "pill--success"])
                }, i(s(u).originalId ? s(t).label("编辑模式", "Edit mode") : s(t).label("新增模式", "Create mode")), 3),
                a("span", TS, i(s(u).isDefault ? s(t).label("将设为默认", "Will be default") : s(t).label("非默认角色", "Non-default role")), 1)
              ])
            ]),
            a("div", ES, [
              a("label", DS, [
                a("span", null, i(s(t).label("Agent ID", "Agent ID")), 1),
                be(a("input", {
                  "onUpdate:modelValue": le[2] || (le[2] = (Z) => s(u).id = Z),
                  "data-testid": "roles-agent-id",
                  class: "settings-input",
                  type: "text",
                  placeholder: "agent-demo",
                  spellcheck: "false"
                }, null, 512), [
                  [xe, s(u).id]
                ])
              ]),
              a("label", MS, [
                a("span", null, i(s(t).label("显示名称", "Display name")), 1),
                be(a("input", {
                  "onUpdate:modelValue": le[3] || (le[3] = (Z) => s(u).name = Z),
                  "data-testid": "roles-agent-name",
                  class: "settings-input",
                  type: "text",
                  placeholder: s(t).label("留空则跟随 Agent ID", "Leave blank to follow the agent id"),
                  spellcheck: "false"
                }, null, 8, IS), [
                  [xe, s(u).name]
                ])
              ]),
              a("div", OS, [
                a("span", null, i(s(t).label("工作区来源", "Workspace source")), 1),
                a("div", LS, [
                  a("button", {
                    class: re(["pill-button", { "pill-button--active": s(u).workspaceMode === "named" }]),
                    "data-testid": "roles-agent-workspace-mode-name",
                    type: "button",
                    onClick: le[4] || (le[4] = (Z) => s(T)("named"))
                  }, i(s(t).label("按名称生成", "Generate from name")), 3),
                  a("button", {
                    class: re(["pill-button", { "pill-button--active": s(u).workspaceMode === "custom" }]),
                    "data-testid": "roles-agent-workspace-mode-custom",
                    type: "button",
                    onClick: le[5] || (le[5] = (Z) => s(T)("custom"))
                  }, i(s(t).label("自定义路径", "Custom path")), 3)
                ])
              ]),
              s(u).workspaceMode === "named" ? (g(), m("label", NS, [
                a("span", null, i(s(t).label("工作区名称", "Workspace name")), 1),
                be(a("input", {
                  "onUpdate:modelValue": le[6] || (le[6] = (Z) => s(u).workspaceName = Z),
                  "data-testid": "roles-agent-workspace-name",
                  class: "settings-input",
                  type: "text",
                  placeholder: s(t).label("例如：ops-lab；留空则沿用默认工作区", "Example: ops-lab; leave blank to keep the default workspace"),
                  spellcheck: "false"
                }, null, 8, US), [
                  [xe, s(u).workspaceName]
                ]),
                a("small", null, i(s(t).label("生成后的路径：", "Generated path: ")) + i(s(C)), 1)
              ])) : (g(), m("label", FS, [
                a("span", null, i(s(t).label("工作区路径", "Workspace path")), 1),
                be(a("input", {
                  "onUpdate:modelValue": le[7] || (le[7] = (Z) => s(u).workspace = Z),
                  "data-testid": "roles-agent-workspace",
                  class: "settings-input",
                  type: "text",
                  spellcheck: "false"
                }, null, 512), [
                  [xe, s(u).workspace]
                ]),
                a("small", null, i(s(t).label(
                  "适合已有独立目录或非标准布局；如果只是想给不同 Agent 区分工作区，优先使用“工作区名称”。",
                  "Use this for an existing directory or a non-standard layout. If you just want separate workspaces for different agents, prefer the workspace-name mode."
                )), 1)
              ])),
              a("label", GS, [
                a("span", null, i(s(t).label("模型路由（可选）", "Model route (optional)")), 1),
                be(a("input", {
                  "onUpdate:modelValue": le[8] || (le[8] = (Z) => s(u).modelId = Z),
                  "data-testid": "roles-agent-model",
                  class: "settings-input",
                  type: "text",
                  placeholder: s(c).modelId || s(t).label("留空则使用默认模型", "Leave blank to use the default model"),
                  spellcheck: "false"
                }, null, 8, BS), [
                  [xe, s(u).modelId]
                ])
              ])
            ]),
            a("div", VS, [
              a("label", jS, [
                a("div", zS, [
                  a("strong", null, i(s(t).label("设为默认角色", "Set as default role")), 1),
                  a("span", null, i(s(t).label(
                    "保存后会清掉其它 Agent 的默认标记，并把当前 Agent 提升为主角色。",
                    "Saving clears the default flag on other agents and promotes this one as the primary role."
                  )), 1)
                ]),
                be(a("input", {
                  "onUpdate:modelValue": le[9] || (le[9] = (Z) => s(u).isDefault = Z),
                  "data-testid": "roles-agent-default",
                  type: "checkbox"
                }, null, 512), [
                  [Gt, s(u).isDefault]
                ])
              ]),
              a("label", WS, [
                a("div", HS, [
                  a("strong", null, i(s(t).label("缺失时自动创建工作区目录", "Create workspace folder if missing")), 1),
                  a("span", null, i(s(t).label(
                    "只会创建目录本身，不会自动写入 SOUL / USER / AGENTS 等文档。",
                    "This only creates the workspace folder itself when it is missing. Enable the bootstrap option below if you also want starter docs."
                  )), 1)
                ]),
                be(a("input", {
                  "onUpdate:modelValue": le[10] || (le[10] = (Z) => s(u).ensureWorkspace = Z),
                  type: "checkbox"
                }, null, 512), [
                  [Gt, s(u).ensureWorkspace]
                ])
              ]),
              s(b) ? (g(), m("label", KS, [
                a("div", qS, [
                  a("strong", null, i(s(t).label("初始化核心工作区文档", "Bootstrap core workspace docs")), 1),
                  a("span", null, i(s(t).label(
                    "仅在新建 Agent 时生效，只补齐缺失的 SOUL / USER / AGENTS 文档和 memory/ 目录，不会覆盖已有内容。",
                    "Applies only when creating a new agent. It fills in missing SOUL / USER / AGENTS docs and the memory/ folder without overwriting existing content."
                  )), 1)
                ]),
                be(a("input", {
                  "onUpdate:modelValue": le[11] || (le[11] = (Z) => s(u).bootstrapWorkspaceDocs = Z),
                  "data-testid": "roles-agent-bootstrap-docs",
                  type: "checkbox"
                }, null, 512), [
                  [Gt, s(u).bootstrapWorkspaceDocs]
                ])
              ])) : J("", !0)
            ]),
            a("div", JS, i(s(t).label(
              "Agent 配置会直接写入当前生效的 openclaw.json；如果你正在使用自定义 state-dir 或源码工作区，这里也会落到对应位置。",
              "Agent changes are written into the active openclaw.json for the current Guard runtime, including custom state-dir or workspace-based setups."
            )), 1),
            a("div", QS, [
              a("button", {
                class: "inline-link inline-link--primary",
                "data-testid": "roles-agent-save",
                type: "button",
                disabled: s(d),
                onClick: le[12] || (le[12] = //@ts-ignore
                (...Z) => s(I) && s(I)(...Z))
              }, i(s(d) ? s(t).label("保存中…", "Saving…") : s(t).label("保存 Agent", "Save agent")), 9, YS),
              a("button", {
                class: "inline-link",
                "data-testid": "roles-agent-reset",
                type: "button",
                disabled: s(d) || s(f),
                onClick: le[13] || (le[13] = //@ts-ignore
                (...Z) => s($) && s($)(...Z))
              }, i(s(t).label("重置草稿", "Reset draft")), 9, ZS),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: s(d) || s(f),
                onClick: le[14] || (le[14] = //@ts-ignore
                (...Z) => s(R) && s(R)(...Z))
              }, i(s(t).label("切换到新建", "Switch to create")), 9, XS),
              s(u).canDelete ? (g(), m("button", {
                key: 0,
                class: "inline-link",
                "data-testid": "roles-agent-delete",
                type: "button",
                disabled: s(d) || s(f),
                onClick: le[15] || (le[15] = //@ts-ignore
                (...Z) => s(ee) && s(ee)(...Z))
              }, i(s(f) ? s(t).label("删除中…", "Deleting…") : s(t).label("删除 Agent", "Delete agent")), 9, e0)) : J("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(t).label("角色成员", "Role entries"),
          eyebrow: "Catalog"
        }, {
          default: Y(() => [
            s(r).length ? (g(), m("div", t0, [
              (g(!0), m(j, null, fe(s(r), (Z) => (g(), m("article", {
                key: Z.id,
                class: "provider-card"
              }, [
                a("header", n0, [
                  a("div", null, [
                    a("strong", null, i(Z.name), 1),
                    a("p", null, i(S(Z)), 1)
                  ]),
                  a("div", s0, [
                    Z.isDefault ? (g(), m("span", l0, i(s(t).label("默认", "Default")), 1)) : (g(), m("span", a0, i(Z.id), 1)),
                    Z.isConfigured ? J("", !0) : (g(), m("span", o0, i(s(t).label("隐式默认", "Implicit default")), 1)),
                    a("span", {
                      class: re(["pill", Z.workspaceExists ? "pill--success" : "pill--warning"])
                    }, i(Z.workspaceExists ? s(t).label("工作区就绪", "Workspace ready") : s(t).label("工作区缺失", "Workspace missing")), 3)
                  ])
                ]),
                a("div", i0, [
                  a("div", r0, [
                    a("strong", null, i(s(t).label("模型路由", "Model route")), 1),
                    a("p", null, i(Z.modelId || s(t).label("沿用默认模型", "Uses the default model route")), 1)
                  ]),
                  a("div", c0, [
                    a("strong", null, i(s(t).label("工作区映射", "Workspace mapping")), 1),
                    a("p", null, i(S(Z)), 1),
                    a("p", null, i(z(Z)), 1),
                    a("p", null, i(s(t).label("工作区名称：", "Workspace name: ")) + i(ue(Z)), 1)
                  ]),
                  a("div", u0, [
                    a("strong", null, i(s(t).label("关键文档", "Core docs")), 1),
                    a("div", d0, [
                      a("span", {
                        class: re(["pill", Z.docStatus.soul ? "pill--success" : "pill--warning"])
                      }, "SOUL", 2),
                      a("span", {
                        class: re(["pill", Z.docStatus.user ? "pill--success" : "pill--warning"])
                      }, "USER", 2),
                      a("span", {
                        class: re(["pill", Z.docStatus.agents ? "pill--success" : "pill--warning"])
                      }, "AGENTS", 2),
                      a("span", {
                        class: re(["pill", Z.docStatus.memory ? "pill--success" : "pill--warning"])
                      }, "MEMORY", 2)
                    ]),
                    s(rr)(Z) ? (g(), m("p", f0, i(s(t).label("关键工作区文档已经基本齐全。", "The core workspace docs are already in place.")), 1)) : J("", !0)
                  ])
                ]),
                a("div", p0, [
                  a("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (Ue) => x(Z)
                  }, i(s(t).label("打开工作区", "Open workspace")), 9, h0),
                  Z.isConfigured ? (g(), m("button", {
                    key: 0,
                    class: "inline-link",
                    "data-testid": "roles-agent-edit",
                    type: "button",
                    onClick: (Ue) => s(P)(Z)
                  }, i(s(t).label("编辑配置", "Edit config")), 9, g0)) : J("", !0),
                  Z.isConfigured && !Z.isDefault ? (g(), m("button", {
                    key: 1,
                    class: "inline-link",
                    "data-testid": "roles-agent-set-default",
                    type: "button",
                    onClick: (Ue) => s(_)(Z)
                  }, i(s(t).label("设为默认", "Make default")), 9, m0)) : J("", !0)
                ])
              ]))), 128))
            ])) : (g(), m("div", b0, i(s(t).label("还没有发现可用角色。请先检查 OpenClaw 配置和安装状态。", "No role entries were discovered yet. Check the OpenClaw configuration and installation state first.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64))
    ]));
  }
});
function y0(e, t = 100) {
  const n = new URLSearchParams({
    q: e,
    limit: String(t)
  });
  return Ee(`/api/search?${n.toString()}`);
}
const _0 = { class: "page-stack" }, w0 = { class: "page-header" }, k0 = { class: "page-header__eyebrow" }, $0 = { class: "page-header__title" }, C0 = { class: "page-header__description" }, S0 = {
  class: "inline-link inline-link--primary",
  type: "submit"
}, A0 = {
  key: 0,
  class: "page-empty page-empty--error"
}, R0 = {
  key: 1,
  class: "status-banner status-banner--warning"
}, x0 = { class: "stat-grid" }, P0 = { class: "stat-card" }, T0 = { class: "stat-card__label" }, E0 = { class: "stat-card" }, D0 = { class: "stat-card__label" }, M0 = { class: "stat-card" }, I0 = { class: "stat-card__label" }, O0 = { class: "stat-card" }, L0 = { class: "stat-card__label" }, N0 = {
  key: 0,
  class: "page-empty"
}, U0 = {
  key: 0,
  class: "status-banner status-banner--info"
}, F0 = { class: "provider-stack" }, G0 = { class: "provider-card__header" }, B0 = { class: "pill-row" }, V0 = { class: "page-actions" }, j0 = ["onClick"], z0 = {
  key: 2,
  class: "page-empty"
}, W0 = /* @__PURE__ */ $e({
  __name: "SearchPage",
  setup(e) {
    let t = null, n = 0;
    const l = Ce(), o = Xl(), r = it(), c = Ls(), u = /* @__PURE__ */ F(c.searchQuery), d = /* @__PURE__ */ F(!1), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F([]), v = /* @__PURE__ */ F(""), b = D(() => new Set(h.value.map((R) => R.path)).size);
    Te(u, (R) => {
      c.setSearchQuery(R);
    });
    async function C() {
      const R = u.value.trim(), P = ++n;
      if (c.setSearchQuery(R), p.value = !0, f.value = null, !R) {
        h.value = [];
        return;
      }
      d.value = !0;
      try {
        const $ = await y0(R, 100);
        if (P !== n)
          return;
        h.value = $.results || [], v.value = R, t = {
          query: R,
          results: [...h.value]
        };
      } catch ($) {
        if (P !== n)
          return;
        f.value = $ instanceof Error ? $.message : String($);
      } finally {
        P === n && (d.value = !1);
      }
    }
    function E(R) {
      c.requestReveal(R.path), r.pushToast({
        tone: "info",
        message: l.label("已切到文件页并定位结果。", "Switched to Files and queued the selected result."),
        durationMs: 2200
      }), o.push("/files");
    }
    return nt(() => {
      if (c.searchQuery.trim()) {
        const R = c.searchQuery.trim();
        if ((t == null ? void 0 : t.query) === R) {
          p.value = !0, h.value = [...t.results], v.value = R, C();
          return;
        }
        C();
      }
    }), (R, P) => (g(), m("div", _0, [
      a("header", w0, [
        a("div", null, [
          a("p", k0, i(s(l).label("搜索 / 检索", "Search / Discovery")), 1),
          a("h2", $0, i(s(l).label("工作区搜索", "Workspace search")), 1),
          a("p", C0, i(s(l).label("先让搜索直接覆盖 Guard 管理的工作区与核心记忆，并且可以一跳回到文件页继续编辑。", "Start with search across Guard-managed workspaces and core memory, then jump straight back into Files to continue editing.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: C
        }, i(d.value ? s(l).label("搜索中…", "Searching…") : s(l).label("Search", "Search")), 1)
      ]),
      H(ae, {
        title: s(l).label("搜索条件", "Search query"),
        eyebrow: "Query"
      }, {
        default: Y(() => [
          a("form", {
            class: "search-form",
            onSubmit: kn(C, ["prevent"])
          }, [
            be(a("input", {
              "onUpdate:modelValue": P[0] || (P[0] = ($) => u.value = $),
              class: "settings-input",
              type: "text",
              placeholder: "SOUL.md / qwen / fallback / cron"
            }, null, 512), [
              [xe, u.value]
            ]),
            a("button", S0, i(d.value ? s(l).label("搜索中…", "Searching…") : s(l).label("开始搜索", "Run search")), 1)
          ], 32)
        ]),
        _: 1
      }, 8, ["title"]),
      f.value && !h.value.length ? (g(), m("div", A0, i(f.value), 1)) : f.value ? (g(), m("div", R0, i(s(l).label("已保留上一版搜索结果，但后台刷新失败：", "The last search results are still on screen, but the background refresh failed: ")) + i(f.value), 1)) : J("", !0),
      H(ae, {
        title: s(l).label("结果概览", "Result overview"),
        eyebrow: "Summary"
      }, {
        default: Y(() => [
          a("div", x0, [
            a("article", P0, [
              a("p", T0, i(s(l).label("命中条数", "Matches")), 1),
              a("strong", null, i(s(he)(h.value.length)), 1),
              a("span", null, i(s(l).label("当前查询返回的匹配行数", "Matched lines returned for the current query")), 1)
            ]),
            a("article", E0, [
              a("p", D0, i(s(l).label("涉及文件", "Files")), 1),
              a("strong", null, i(s(he)(b.value)), 1),
              a("span", null, i(s(l).label("至少命中一次的文件数量", "Files that matched at least once")), 1)
            ]),
            a("article", M0, [
              a("p", I0, i(s(l).label("当前查询", "Current query")), 1),
              a("strong", null, i(u.value.trim() || "-"), 1),
              a("span", null, i(v.value ? s(l).label(`当前展示的是“${v.value}”的结果`, `Currently showing results for "${v.value}"`) : u.value.trim() ? s(l).label("结果来自当前搜索词", "Results are based on the current query") : s(l).label("还没有输入搜索词", "No search query yet")), 1)
            ]),
            a("article", O0, [
              a("p", L0, i(s(l).label("打开方式", "Open flow")), 1),
              a("strong", null, i(s(l).label("一跳到文件页", "Jump into Files")), 1),
              a("span", null, i(s(l).label("搜索结果会按文件或核心记忆模式自动定位", "Results automatically open in file or core-memory mode")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(l).label("搜索结果", "Results"),
        eyebrow: "Results"
      }, {
        default: Y(() => [
          d.value && !h.value.length ? (g(), m("div", N0, i(s(l).label("正在查找匹配结果…", "Searching for matching results…")), 1)) : h.value.length ? (g(), m(j, { key: 1 }, [
            d.value ? (g(), m("div", U0, i(s(l).label("正在后台刷新搜索结果…", "Refreshing search results in the background…")), 1)) : J("", !0),
            a("div", F0, [
              (g(!0), m(j, null, fe(h.value, ($) => (g(), m("article", {
                key: `${$.path}:${$.line}:${$.preview}`,
                class: "provider-card"
              }, [
                a("header", G0, [
                  a("div", null, [
                    a("strong", null, i($.relativePath || $.path), 1),
                    a("p", null, i(`L${$.line}`), 1)
                  ]),
                  a("div", B0, [
                    a("span", {
                      class: re(["pill", s(wl)($.path) ? "pill--success" : "pill--info"])
                    }, i(s(wl)($.path) ? s(l).label("核心记忆", "Core memory") : s(l).label("文件", "File")), 3)
                  ])
                ]),
                a("p", null, i($.preview), 1),
                a("div", V0, [
                  a("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (T) => E($)
                  }, i(s(l).label("在文件页打开", "Open in Files")), 9, j0)
                ])
              ]))), 128))
            ])
          ], 64)) : (g(), m("div", z0, i(p.value ? s(l).label("当前搜索词没有命中任何文件。", "The current query did not match any files.") : s(l).label("输入关键词后开始搜索。", "Enter a query to start searching.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
function H0() {
  return Ee("/api/audit");
}
function K0() {
  return Ee("/api/profiles");
}
function q0(e) {
  return Oe("/api/profiles/apply", { profile: e });
}
function J0(e) {
  return Ee(`/api/harden/steps?platform=${encodeURIComponent(e)}`);
}
const Q0 = { class: "page-stack" }, Y0 = { class: "page-header" }, Z0 = { class: "page-header__eyebrow" }, X0 = { class: "page-header__title" }, eA = { class: "page-header__description" }, tA = {
  key: 0,
  class: "page-empty"
}, nA = {
  key: 1,
  class: "page-empty page-empty--error"
}, sA = {
  key: 0,
  class: "status-banner status-banner--warning"
}, lA = { class: "muted-copy" }, aA = { class: "stat-grid" }, oA = { class: "stat-card" }, iA = { class: "stat-card__label" }, rA = { class: "stat-card" }, cA = { class: "stat-card__label" }, uA = { class: "stat-card" }, dA = { class: "stat-card__label" }, fA = { class: "provider-stack" }, pA = { class: "provider-card__header" }, hA = { class: "pill pill--muted" }, gA = { class: "mini-list" }, mA = { class: "provider-card__header" }, bA = {
  key: 0,
  class: "muted-copy"
}, vA = {
  key: 0,
  class: "page-empty"
}, yA = {
  key: 1,
  class: "page-empty page-empty--error"
}, _A = {
  key: 0,
  class: "status-banner status-banner--warning"
}, wA = { class: "muted-copy" }, kA = { class: "provider-stack" }, $A = { class: "provider-card__header" }, CA = { class: "muted-copy" }, SA = { class: "pill pill--info" }, AA = { class: "settings-grid settings-grid--wide" }, RA = { class: "settings-field" }, xA = { class: "mini-list" }, PA = { class: "settings-field" }, TA = {
  key: 0,
  class: "code-panel"
}, EA = {
  key: 1,
  class: "muted-copy"
}, DA = { class: "settings-field" }, MA = {
  key: 0,
  class: "code-panel"
}, IA = {
  key: 1,
  class: "muted-copy"
}, OA = { class: "page-actions" }, LA = ["disabled", "onClick"], NA = {
  key: 0,
  class: "page-empty"
}, UA = {
  key: 1,
  class: "page-empty page-empty--error"
}, FA = {
  key: 0,
  class: "status-banner status-banner--warning"
}, GA = { class: "muted-copy" }, BA = { class: "pill-row" }, VA = ["href"], jA = { class: "provider-stack" }, zA = { class: "provider-card__header" }, WA = { class: "muted-copy" }, HA = {
  key: 0,
  class: "code-panel"
}, KA = {
  key: 1,
  class: "muted-copy"
}, qA = /* @__PURE__ */ $e({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const I = navigator.platform.toLowerCase();
      return I.includes("win") ? "windows" : I.includes("mac") ? "macos" : "linux";
    }
    const n = Ce(), l = it(), o = /* @__PURE__ */ F("audit"), r = /* @__PURE__ */ F(t()), c = /* @__PURE__ */ F(""), u = D(() => ql(`/api/harden/script?platform=${r.value}`));
    let d = null, f = null;
    const p = /* @__PURE__ */ new Map(), h = ct(() => H0(), d, { immediate: !1 }), v = ct(() => K0(), f, { immediate: !1 }), b = ct(
      () => J0(r.value),
      p.get(r.value) || null,
      { immediate: !1 }
    ), C = D(() => [
      { id: "audit", label: n.label("安全检查", "Security checks") },
      { id: "profiles", label: n.label("权限模式", "Permission modes") },
      { id: "hardening", label: n.label("主机加固", "Host hardening") }
    ]), E = D(() => {
      var ee, _;
      const I = /* @__PURE__ */ new Map();
      for (const x of ((ee = h.data) == null ? void 0 : ee.results) || [])
        I.has(x.category) || I.set(x.category, []), (_ = I.get(x.category)) == null || _.push(x);
      return Array.from(I.entries());
    });
    Te(() => h.data, (I) => {
      I && (d = I);
    }), Te(() => v.data, (I) => {
      I && (f = I);
    }), Te(() => b.data, (I) => {
      I && p.set(r.value, I);
    }), Te(
      o,
      (I) => {
        I === "audit" && !h.data && !h.loading && h.execute(), I === "profiles" && !v.data && !v.loading && v.execute(), I === "hardening" && !b.data && !b.loading && b.execute();
      },
      { immediate: !0 }
    ), Te(r, () => {
      b.data = p.get(r.value) || null, o.value === "hardening" && b.execute({ silent: !!b.data });
    });
    function R(I) {
      return I === "pass" ? "pill--success" : I === "warn" ? "pill--warning" : "pill--danger";
    }
    function P(I) {
      return I === "pass" ? n.label("通过", "Pass") : I === "warn" ? n.label("警告", "Warning") : n.label("失败", "Fail");
    }
    async function $() {
      if (o.value === "audit") {
        await h.execute({ silent: !!h.data });
        return;
      }
      if (o.value === "profiles") {
        await v.execute({ silent: !!v.data });
        return;
      }
      await b.execute({ silent: !!b.data });
    }
    async function T(I) {
      c.value = I;
      try {
        const ee = await q0(I);
        l.pushToast({
          tone: ee.success ? "success" : "error",
          message: ee.message
        });
      } catch (ee) {
        l.pushToast({
          tone: "error",
          message: ee instanceof Error ? ee.message : String(ee)
        });
      } finally {
        c.value = "";
      }
    }
    function U(I) {
      o.value = I;
    }
    return (I, ee) => (g(), m("div", Q0, [
      a("header", Y0, [
        a("div", null, [
          a("p", Z0, i(s(n).label("安全 / 防护", "Security / Protection")), 1),
          a("h2", X0, i(s(n).label("安全基线", "Security baseline")), 1),
          a("p", eA, i(s(n).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页更像决策面板，而不是说明书。", "Split the long page into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: $
        }, i(o.value === "audit" && s(h).refreshing || o.value === "profiles" && s(v).refreshing || o.value === "hardening" && s(b).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      H(Os, {
        items: C.value,
        "active-id": o.value,
        onChange: U
      }, null, 8, ["items", "active-id"]),
      o.value === "audit" ? (g(), m(j, { key: 0 }, [
        s(h).loading && !s(h).data ? (g(), m("div", tA, i(s(n).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : s(h).error && !s(h).data ? (g(), m("div", nA, i(s(h).error), 1)) : s(h).data ? (g(), m(j, { key: 2 }, [
          s(h).error ? (g(), m("div", sA, i(s(n).label("已保留上一版安全检查快照，但后台刷新失败：", "The last security-check snapshot is still on screen, but the background refresh failed: ")) + i(s(h).error), 1)) : J("", !0),
          H(ae, {
            title: s(n).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: Y(() => [
              a("p", lA, i(s(n).label("这里更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              a("div", aA, [
                a("article", oA, [
                  a("p", iA, i(s(n).label("通过项", "Pass")), 1),
                  a("strong", null, i(s(h).data.summary.pass), 1),
                  a("span", null, i(s(n).label("当前无需处理", "No action needed right now")), 1)
                ]),
                a("article", rA, [
                  a("p", cA, i(s(n).label("警告项", "Warning")), 1),
                  a("strong", null, i(s(h).data.summary.warn), 1),
                  a("span", null, i(s(n).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                a("article", uA, [
                  a("p", dA, i(s(n).label("失败项", "Fail")), 1),
                  a("strong", null, i(s(h).data.summary.fail), 1),
                  a("span", null, i(s(n).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          H(ae, {
            title: s(n).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: Y(() => [
              a("div", fA, [
                (g(!0), m(j, null, fe(E.value, ([_, x]) => (g(), m("article", {
                  key: _,
                  class: "provider-card"
                }, [
                  a("header", pA, [
                    a("strong", null, i(_), 1),
                    a("span", hA, i(x.length), 1)
                  ]),
                  a("div", gA, [
                    (g(!0), m(j, null, fe(x, (S) => (g(), m("div", {
                      key: `${_}-${S.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      a("div", mA, [
                        a("strong", null, i(S.item), 1),
                        a("span", {
                          class: re(["pill", R(S.status)])
                        }, i(P(S.status)), 3)
                      ]),
                      a("p", null, i(S.message), 1),
                      S.fix ? (g(), m("p", bA, i(s(n).label("建议处理：", "Suggested fix: ")) + i(S.fix), 1)) : J("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : J("", !0)
      ], 64)) : o.value === "profiles" ? (g(), m(j, { key: 1 }, [
        s(v).loading && !s(v).data ? (g(), m("div", vA, i(s(n).label("正在读取权限模式…", "Loading permission modes…")), 1)) : s(v).error && !s(v).data ? (g(), m("div", yA, i(s(v).error), 1)) : s(v).data ? (g(), m(j, { key: 2 }, [
          s(v).error ? (g(), m("div", _A, i(s(n).label("已保留上一版权限模式快照，但后台刷新失败：", "The last permission-mode snapshot is still on screen, but the background refresh failed: ")) + i(s(v).error), 1)) : J("", !0),
          H(ae, {
            title: s(n).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: Y(() => [
              a("p", wA, i(s(n).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          a("div", kA, [
            (g(!0), m(j, null, fe(s(v).data, (_) => (g(), Ne(ae, {
              key: _.key,
              title: _.name,
              eyebrow: "Profile"
            }, {
              default: Y(() => {
                var x, S, z, ue, de, le;
                return [
                  a("div", $A, [
                    a("p", CA, i(_.description), 1),
                    a("span", SA, i(_.riskLevel || s(n).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  a("div", AA, [
                    a("div", RA, [
                      a("span", null, i(s(n).label("建议使用场景", "Recommended use cases")), 1),
                      a("div", xA, [
                        (g(!0), m(j, null, fe(_.recommendations || [], (Z) => (g(), m("div", {
                          key: Z,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          a("p", null, i(Z), 1)
                        ]))), 128))
                      ])
                    ]),
                    a("div", PA, [
                      a("span", null, i(s(n).label("允许规则", "Allow rules")), 1),
                      s(n).developerMode ? (g(), m("pre", TA, i((((x = _.tools) == null ? void 0 : x.allow) || []).join(`
`) || "(none)"), 1)) : (g(), m("p", EA, i(s(n).label(`当前包含 ${(((S = _.tools) == null ? void 0 : S.allow) || []).length} 条允许规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((z = _.tools) == null ? void 0 : z.allow) || []).length} allow rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ]),
                    a("div", DA, [
                      a("span", null, i(s(n).label("拒绝规则", "Deny rules")), 1),
                      s(n).developerMode ? (g(), m("pre", MA, i((((ue = _.tools) == null ? void 0 : ue.deny) || []).join(`
`) || "(none)"), 1)) : (g(), m("p", IA, i(s(n).label(`当前包含 ${(((de = _.tools) == null ? void 0 : de.deny) || []).length} 条拒绝规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((le = _.tools) == null ? void 0 : le.deny) || []).length} deny rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ])
                  ]),
                  a("div", OA, [
                    a("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: c.value === _.key,
                      onClick: (Z) => T(_.key)
                    }, i(c.value === _.key ? s(n).label("应用中…", "Applying…") : s(n).label("应用权限模式", "Apply permission mode")), 9, LA)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : J("", !0)
      ], 64)) : (g(), m(j, { key: 2 }, [
        s(b).loading && !s(b).data ? (g(), m("div", NA, i(s(n).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : s(b).error && !s(b).data ? (g(), m("div", UA, i(s(b).error), 1)) : s(b).data ? (g(), m(j, { key: 2 }, [
          s(b).error ? (g(), m("div", FA, i(s(n).label("已保留上一版主机加固快照，但后台刷新失败：", "The last hardening snapshot is still on screen, but the background refresh failed: ")) + i(s(b).error), 1)) : J("", !0),
          H(ae, {
            title: s(n).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: Y(() => [
              a("p", GA, i(s(n).label("基础建议在所有平台上都类似：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              a("div", BA, [
                a("button", {
                  class: re(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: ee[0] || (ee[0] = (_) => r.value = "windows")
                }, "Windows", 2),
                a("button", {
                  class: re(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: ee[1] || (ee[1] = (_) => r.value = "macos")
                }, "macOS", 2),
                a("button", {
                  class: re(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: ee[2] || (ee[2] = (_) => r.value = "linux")
                }, "Linux", 2),
                a("a", {
                  class: "inline-link",
                  href: u.value
                }, i(s(n).label("下载脚本", "Download script")), 9, VA)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          a("div", jA, [
            (g(!0), m(j, null, fe(s(b).data.steps, (_) => (g(), Ne(ae, {
              key: _.id,
              title: _.title,
              eyebrow: "Step"
            }, {
              default: Y(() => {
                var x;
                return [
                  a("div", zA, [
                    a("p", WA, i(_.description), 1),
                    a("span", {
                      class: re(["pill", _.optional ? "pill--muted" : "pill--warning"])
                    }, i(_.optional ? s(n).label("可选", "Optional") : s(n).label("建议", "Recommended")), 3)
                  ]),
                  s(n).developerMode ? (g(), m("pre", HA, i((_.commands || []).join(`
`) || s(n).label("当前没有附带命令。", "No commands are attached to this step.")), 1)) : (g(), m("p", KA, i((x = _.commands) != null && x.length ? s(n).label(`这个步骤附带 ${_.commands.length} 条命令，默认已收纳到开发者模式中。`, `This step includes ${_.commands.length} commands, which now stay behind developer mode by default.`) : s(n).label("这个步骤当前没有附带命令。", "No commands are attached to this step right now.")), 1))
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : J("", !0)
      ], 64))
    ]));
  }
});
function JA() {
  return Ee("/api/sessions");
}
const QA = { class: "page-stack" }, YA = { class: "page-header" }, ZA = { class: "page-header__eyebrow" }, XA = { class: "page-header__title" }, eR = { class: "page-header__description" }, tR = {
  key: 0,
  class: "page-empty"
}, nR = {
  key: 1,
  class: "page-empty page-empty--error"
}, sR = {
  key: 0,
  class: "status-banner status-banner--warning"
}, lR = { class: "stat-grid" }, aR = { class: "stat-card" }, oR = { class: "stat-card__label" }, iR = { class: "stat-card" }, rR = { class: "stat-card__label" }, cR = { class: "stat-card" }, uR = { class: "stat-card__label" }, dR = { class: "stat-card" }, fR = { class: "stat-card__label" }, pR = { class: "stat-card" }, hR = { class: "stat-card__label" }, gR = { class: "stat-card" }, mR = { class: "stat-card__label" }, bR = { class: "stat-grid" }, vR = { class: "stat-card" }, yR = { class: "stat-card" }, _R = { class: "stat-card__label" }, wR = { class: "stat-card" }, kR = { class: "stat-card__label" }, $R = { class: "stat-card" }, CR = { class: "stat-card__label" }, SR = { class: "stat-card" }, AR = { class: "stat-card__label" }, RR = { class: "stat-card" }, xR = { class: "stat-card__label" }, PR = {
  key: 1,
  class: "muted-copy"
}, TR = {
  key: 0,
  class: "provider-stack"
}, ER = { class: "provider-card__header" }, DR = { class: "pill-row" }, MR = { class: "pill pill--info" }, IR = { class: "mini-list" }, OR = { class: "mini-list__item mini-list__item--stack" }, LR = { class: "mini-list__item mini-list__item--stack" }, NR = { class: "mini-list__item mini-list__item--stack" }, UR = { class: "mini-list__item mini-list__item--stack" }, FR = {
  key: 1,
  class: "page-empty"
}, GR = { class: "page-two-column" }, BR = {
  key: 0,
  class: "provider-stack"
}, VR = { class: "provider-card__header" }, jR = { class: "pill pill--info" }, zR = { class: "mini-list" }, WR = {
  key: 1,
  class: "page-empty"
}, HR = {
  key: 0,
  class: "provider-stack"
}, KR = { class: "provider-card__header" }, qR = { class: "pill pill--muted" }, JR = {
  key: 1,
  class: "page-empty"
}, QR = { class: "list-stack" }, YR = { class: "stat-grid" }, ZR = { class: "stat-card" }, XR = { class: "stat-card__label" }, ex = { class: "stat-card" }, tx = { class: "stat-card__label" }, nx = { class: "stat-card" }, sx = { class: "stat-card__label" }, lx = { class: "stat-card" }, ax = { class: "stat-card__label" }, ox = /* @__PURE__ */ $e({
  __name: "SessionsPage",
  setup(e) {
    let t = null;
    const n = Ce(), l = ct(() => JA(), t, { immediate: !1 }), o = D(() => {
      var R;
      return (R = l.data) == null ? void 0 : R.snapshot;
    }), r = D(() => {
      var R;
      return ((R = o.value) == null ? void 0 : R.sessions) || [];
    }), c = D(() => {
      var R, P;
      return ((P = (R = o.value) == null ? void 0 : R.sessionsMeta) == null ? void 0 : P.byAgent) || [];
    }), u = D(() => r.value.filter((R) => !["ended", "finished", "closed"].includes(R.status))), d = D(() => {
      var P;
      const R = (P = l.data) == null ? void 0 : P.costSummary;
      return R ? Number.isFinite(R.totalEstimatedCost) && (!!R.pricingUnit || R.totalEstimatedCost > 0) : !1;
    });
    function f() {
      var P;
      const R = (P = l.data) == null ? void 0 : P.costSummary;
      return !R || !d.value ? n.label("无法估算", "Unavailable") : oo(R.totalEstimatedCost, R.pricingUnit || "USD");
    }
    function p() {
      return d.value ? n.label("仅供本地观察，不代表官方账单", "For local observation only, not an official bill") : n.label("缺少可靠单价或用量数据，当前不显示金额", "Pricing or usage data is incomplete, so no amount is shown");
    }
    function h(R) {
      return ["ended", "finished", "closed"].includes(R.status) ? "pill--muted" : ["error", "failed", "aborted"].includes(R.status) ? "pill--danger" : "pill--success";
    }
    function v(R) {
      return R ? n.developerMode ? [R.loadedText, R.runtimeShort].filter(Boolean).join(" / ") || n.label("服务信息暂缺", "Service details are missing") : R.installed === !1 ? n.label("当前没有检测到对应运行态。", "The runtime is not currently detected.") : n.label("已检测到服务，详细运行串已收纳到开发者模式。", "The service was detected. Detailed runtime strings stay behind developer mode.") : n.label("服务信息暂缺", "Service details are missing");
    }
    function b() {
      var P;
      const R = (P = o.value) == null ? void 0 : P.memory;
      return R ? n.developerMode ? [R.searchMode, R.dbPath || R.workspaceDir].filter(Boolean).join(" / ") || n.label("记忆运行态信息暂缺", "Memory runtime details are missing") : R.searchMode ? n.label(`检索模式：${R.searchMode}`, `Search mode: ${R.searchMode}`) : n.label("索引已连接，路径信息已收纳到开发者模式。", "The index is connected. Path details stay behind developer mode.") : n.label("记忆运行态信息暂缺", "Memory runtime details are missing");
    }
    function C() {
      var P;
      const R = (P = o.value) == null ? void 0 : P.update;
      return R ? n.developerMode ? [R.packageManager, R.latestVersion].filter(Boolean).join(" / ") || n.label("更新信息暂缺", "Update details are missing") : R.latestVersion ? n.label(`推荐版本：${R.latestVersion}`, `Recommended version: ${R.latestVersion}`) : n.label("更新细节已收纳到开发者模式。", "Detailed updater information stays behind developer mode.") : n.label("更新信息暂缺", "Update details are missing");
    }
    function E(R) {
      return n.developerMode ? R || n.label("没有返回路径信息", "No path information returned") : R ? n.label("工作区路径已收纳到开发者模式。", "Workspace path stays behind developer mode.") : n.label("没有返回路径信息", "No path information returned");
    }
    return Te(() => l.data, (R) => {
      R && (t = R);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (R, P) => (g(), m("div", QA, [
      a("header", YA, [
        a("div", null, [
          a("p", ZA, i(s(n).label("会话 / 运行态", "Sessions / Runtime")), 1),
          a("h2", XA, i(s(n).label("会话观察台", "Session observer")), 1),
          a("p", eR, i(s(n).label("把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。", "Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: P[0] || (P[0] = ($) => s(l).execute({ silent: !0 }))
        }, i(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("Refresh", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", tR, i(s(n).label("正在读取会话快照…", "Loading the session snapshot…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", nR, i(s(l).error), 1)) : s(l).data && o.value ? (g(), m(j, { key: 2 }, [
        s(l).error ? (g(), m("div", sR, i(s(n).label("已保留上一版会话快照，但后台刷新失败：", "The last session snapshot is still on screen, but the background refresh failed: ")) + i(s(l).error), 1)) : J("", !0),
        H(ae, {
          title: s(n).label("会话总览", "Session overview"),
          eyebrow: "Summary"
        }, {
          default: Y(() => {
            var $, T, U, I;
            return [
              a("div", lR, [
                a("article", aR, [
                  a("p", oR, i(s(n).label("会话总数", "Sessions")), 1),
                  a("strong", null, i(s(he)((($ = o.value.summary) == null ? void 0 : $.sessionCount) ?? r.value.length)), 1),
                  a("span", null, i(((T = o.value.summary) == null ? void 0 : T.defaultModel) || s(n).label("默认模型未知", "Default model is unknown")), 1)
                ]),
                a("article", iR, [
                  a("p", rR, i(s(n).label("活跃会话", "Active now")), 1),
                  a("strong", null, i(s(he)(u.value.length)), 1),
                  a("span", null, i(s(n).label("当前仍在运行或待执行的会话", "Sessions that are still running or waiting now")), 1)
                ]),
                a("article", cR, [
                  a("p", uR, i(s(n).label("累计 Tokens", "Total tokens")), 1),
                  a("strong", null, i(s(he)(s(l).data.costSummary.totalTokens)), 1),
                  a("span", null, i(s(n).label("基于共享运行时快照统计", "Counted from the shared runtime snapshot")), 1)
                ]),
                a("article", dR, [
                  a("p", fR, i(s(n).label("用量估算", "Usage estimate")), 1),
                  a("strong", null, i(f()), 1),
                  a("span", null, i(p()), 1)
                ]),
                a("article", pR, [
                  a("p", hR, i(s(n).label("会话索引路径", "Session paths")), 1),
                  a("strong", null, i(s(he)(((U = o.value.sessionsMeta) == null ? void 0 : U.paths.length) || 0)), 1),
                  a("span", null, i(s(n).label("被 Guard 识别到的会话目录", "Session directories detected by Guard")), 1)
                ]),
                a("article", gR, [
                  a("p", mR, i(s(n).label("待处理系统事件", "Queued events")), 1),
                  a("strong", null, i(s(he)(((I = o.value.summary) == null ? void 0 : I.queuedSystemEvents) || 0)), 1),
                  a("span", null, i(s(n).label("等待处理的系统级事件", "System events that are still waiting")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        H(ae, {
          title: s(n).label("运行环境", "Runtime context"),
          eyebrow: "Runtime"
        }, {
          default: Y(() => {
            var $, T, U, I, ee, _, x, S, z, ue, de, le, Z;
            return [
              a("div", bR, [
                a("article", vR, [
                  P[1] || (P[1] = a("p", { class: "stat-card__label" }, "OS", -1)),
                  a("strong", null, i((($ = o.value.os) == null ? void 0 : $.label) || "-"), 1),
                  a("span", null, i([(T = o.value.os) == null ? void 0 : T.platform, (U = o.value.os) == null ? void 0 : U.arch, (I = o.value.os) == null ? void 0 : I.release].filter(Boolean).join(" / ") || s(n).label("系统信息暂缺", "OS details are missing")), 1)
                ]),
                a("article", yR, [
                  a("p", _R, i(s(n).label("记忆检索", "Memory search")), 1),
                  a("strong", null, i(((ee = o.value.memory) == null ? void 0 : ee.provider) || ((_ = o.value.memory) == null ? void 0 : _.backend) || "-"), 1),
                  a("span", null, i(b()), 1)
                ]),
                a("article", wR, [
                  a("p", kR, i(s(n).label("Gateway 服务", "Gateway service")), 1),
                  a("strong", null, i(((x = o.value.gatewayService) == null ? void 0 : x.label) || "-"), 1),
                  a("span", null, i(v(o.value.gatewayService)), 1)
                ]),
                a("article", $R, [
                  a("p", CR, i(s(n).label("Node 服务", "Node service")), 1),
                  a("strong", null, i(((S = o.value.nodeService) == null ? void 0 : S.label) || "-"), 1),
                  a("span", null, i(v(o.value.nodeService)), 1)
                ]),
                a("article", SR, [
                  a("p", AR, i(s(n).label("更新轨道", "Update track")), 1),
                  a("strong", null, i(((z = o.value.update) == null ? void 0 : z.channel) || ((ue = o.value.update) == null ? void 0 : ue.installKind) || "-"), 1),
                  a("span", null, i(C()), 1)
                ]),
                a("article", RR, [
                  a("p", xR, i(s(n).label("安全审计", "Security audit")), 1),
                  a("strong", null, i(s(he)(((de = o.value.securityAudit) == null ? void 0 : de.findingsCount) || 0)), 1),
                  a("span", null, i(`${s(he)(((le = o.value.securityAudit) == null ? void 0 : le.critical) || 0)} critical / ${s(he)(((Z = o.value.securityAudit) == null ? void 0 : Z.warn) || 0)} warn`), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        s(n).developerMode ? J("", !0) : (g(), m("p", PR, i(s(n).label("路径、运行时短串和记忆索引位置已收纳到开发者模式。需要进一步排障时，请先到 Settings 打开开发者模式。", "Paths, runtime strings, and memory index locations now stay behind developer mode. Enable developer mode from Settings when you need deeper troubleshooting.")), 1)),
        H(ae, {
          title: s(n).label("当前会话", "Current sessions"),
          eyebrow: "Sessions"
        }, {
          default: Y(() => [
            r.value.length ? (g(), m("div", TR, [
              (g(!0), m(j, null, fe(r.value, ($) => (g(), m("article", {
                key: $.id,
                class: "provider-card"
              }, [
                a("header", ER, [
                  a("div", null, [
                    a("strong", null, i($.id), 1),
                    a("p", null, i(`${$.agentId} / ${$.modelId}`), 1)
                  ]),
                  a("div", DR, [
                    a("span", {
                      class: re(["pill", h($)])
                    }, i($.status || "-"), 3),
                    a("span", MR, i($.channel || "-"), 1)
                  ])
                ]),
                a("div", IR, [
                  a("div", OR, [
                    a("strong", null, i(s(n).label("时间轴", "Timeline")), 1),
                    a("p", null, i(s(n).label("开始：", "Started: ")) + i(s(Qe)($.startedAt)), 1),
                    a("p", null, i(s(n).label("更新：", "Updated: ")) + i(s(Qe)($.updatedAt)), 1)
                  ]),
                  a("div", LR, [
                    a("strong", null, i(s(n).label("Token 使用", "Token usage")), 1),
                    a("p", null, i(`${s(he)($.usage.totalTokens)} tokens`), 1),
                    a("p", null, i(`${s(n).label("输入", "Input")} ${s(he)($.usage.inputTokens)} / ${s(n).label("输出", "Output")} ${s(he)($.usage.outputTokens)}`), 1)
                  ]),
                  a("div", NR, [
                    a("strong", null, i(s(n).label("上下文窗口", "Context window")), 1),
                    a("p", null, i($.contextTokens != null ? s(he)($.contextTokens) : "-"), 1),
                    a("p", null, i(s(n).label("剩余：", "Remaining: ")) + i($.remainingTokens != null ? s(he)($.remainingTokens) : "-"), 1)
                  ]),
                  a("div", UR, [
                    a("strong", null, i(s(n).label("用量估算", "Usage estimate")), 1),
                    a("p", null, i(s(oo)($.estimatedCost, s(l).data.costSummary.pricingUnit || "USD")), 1),
                    a("p", null, i(s(n).label("上下文占比：", "Context used: ")) + i(s(Zh)($.percentUsed)), 1)
                  ])
                ])
              ]))), 128))
            ])) : (g(), m("div", FR, i(s(n).label("当前还没有会话记录。", "There are no session records right now.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        a("div", GR, [
          H(ae, {
            title: s(n).label("按角色分布", "By role"),
            eyebrow: "Roles"
          }, {
            default: Y(() => [
              c.value.length ? (g(), m("div", BR, [
                (g(!0), m(j, null, fe(c.value, ($) => (g(), m("article", {
                  key: $.agentId,
                  class: "provider-card"
                }, [
                  a("header", VR, [
                    a("div", null, [
                      a("strong", null, i($.agentId), 1),
                      a("p", null, i(E($.path)), 1)
                    ]),
                    a("span", jR, i(s(he)($.count)), 1)
                  ]),
                  a("div", zR, [
                    (g(!0), m(j, null, fe($.recent.slice(0, 3), (T) => (g(), m("div", {
                      key: T.id,
                      class: "mini-list__item"
                    }, [
                      a("div", null, [
                        a("strong", null, i(T.modelId), 1),
                        a("p", null, i(T.channel), 1)
                      ]),
                      a("span", {
                        class: re(["pill", h(T)])
                      }, i(T.status), 3)
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (g(), m("div", WR, i(s(n).label("当前没有按角色聚合的会话数据。", "No per-role session summary is available right now.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          H(ae, {
            title: s(n).label("最近活动", "Recent activity"),
            eyebrow: "Timeline"
          }, {
            default: Y(() => [
              s(l).data.recentActivity.length ? (g(), m("div", HR, [
                (g(!0), m(j, null, fe(s(l).data.recentActivity.slice(0, 10), ($) => (g(), m("article", {
                  key: $.id,
                  class: "provider-card"
                }, [
                  a("header", KR, [
                    a("div", null, [
                      a("strong", null, i($.title), 1),
                      a("p", null, i(s(Qe)($.createdAt)), 1)
                    ]),
                    a("span", qR, i($.type), 1)
                  ]),
                  a("p", null, i($.description), 1)
                ]))), 128))
              ])) : (g(), m("div", JR, i(s(n).label("当前还没有最近活动记录。", "There is no recent activity yet.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        o.value.warnings.length ? (g(), Ne(ae, {
          key: 2,
          title: s(n).label("运行提醒", "Runtime warnings"),
          eyebrow: "Warning"
        }, {
          default: Y(() => [
            a("div", QR, [
              (g(!0), m(j, null, fe(o.value.warnings, ($) => (g(), m("article", {
                key: $,
                class: "risk-row"
              }, [
                a("strong", null, i(s(n).label("注意事项", "Warning")), 1),
                a("span", null, i($), 1)
              ]))), 128))
            ])
          ]),
          _: 1
        }, 8, ["title"])) : J("", !0),
        s(n).developerMode && o.value.memory ? (g(), Ne(ae, {
          key: 3,
          "data-testid": "sessions-memory-runtime-details",
          title: s(n).label("记忆运行态补充", "Memory runtime details"),
          eyebrow: "Memory"
        }, {
          default: Y(() => [
            a("div", YR, [
              a("article", ZR, [
                a("p", XR, i(s(n).label("记忆文件", "Memory files")), 1),
                a("strong", null, i(s(he)(o.value.memory.files)), 1),
                a("span", null, i(s(n).label("当前已接入的记忆文件数量", "Managed memory files detected now")), 1)
              ]),
              a("article", ex, [
                a("p", tx, i(s(n).label("记忆分块", "Chunks")), 1),
                a("strong", null, i(s(he)(o.value.memory.chunks)), 1),
                a("span", null, i(s(n).label("用于搜索的记忆分块数", "Memory chunks available for search")), 1)
              ]),
              a("article", nx, [
                a("p", sx, i(s(n).label("索引状态", "Index state")), 1),
                a("strong", null, i(o.value.memory.dirty === !0 ? s(n).label("待刷新", "Dirty") : o.value.memory.dirty === !1 ? s(n).label("已同步", "Clean") : "-"), 1),
                a("span", null, i(o.value.memory.dbPath || o.value.memory.workspaceDir || s(n).label("没有返回索引路径", "No index path returned")), 1)
              ]),
              a("article", lx, [
                a("p", ax, i(s(n).label("索引目录", "Index location")), 1),
                a("strong", null, i(o.value.memory.dbPath ? s(n).label("已返回路径", "Path returned") : s(n).label("暂无路径", "No path")), 1),
                a("span", null, i(o.value.memory.dbPath || o.value.memory.workspaceDir || s(n).label("没有返回目录信息", "No directory information returned")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"])) : J("", !0)
      ], 64)) : J("", !0)
    ]));
  }
}), ix = { class: "page-stack" }, rx = { class: "page-header" }, cx = { class: "page-header__eyebrow" }, ux = { class: "page-header__title" }, dx = { class: "page-header__description" }, fx = { class: "settings-grid" }, px = { class: "settings-panel" }, hx = { class: "settings-panel__header" }, gx = { class: "pill pill--info" }, mx = { class: "settings-choice-grid" }, bx = ["onClick"], vx = { class: "settings-panel" }, yx = { class: "settings-panel__header" }, _x = { class: "pill pill--info" }, wx = { class: "settings-choice-grid settings-choice-grid--compact" }, kx = ["onClick"], $x = { class: "settings-toggle" }, Cx = { class: "settings-toggle__copy" }, Sx = ["checked"], Ax = { class: "page-inline-status" }, Rx = { class: "pill pill--info" }, xx = { class: "settings-list" }, Px = { class: "settings-links" }, Tx = { class: "settings-note" }, Ex = { class: "settings-grid settings-grid--wide" }, Dx = { class: "settings-field settings-field--full" }, Mx = ["placeholder"], Ix = { class: "page-inline-status" }, Ox = { class: "pill pill--info" }, Lx = { class: "settings-links" }, Nx = { class: "settings-note" }, Ux = /* @__PURE__ */ $e({
  __name: "SettingsPage",
  setup(e) {
    const t = Ce(), n = Yn(), l = /* @__PURE__ */ F(n.apiBaseUrl), o = [
      {
        value: "auto",
        zh: "跟随系统",
        en: "Auto",
        descriptionZh: "跟随当前设备的浅色或深色外观。",
        descriptionEn: "Follow the current system light or dark appearance."
      },
      {
        value: "light",
        zh: "浅色",
        en: "Light",
        descriptionZh: "适合白天工作或浅色背景下阅读。",
        descriptionEn: "Best for daytime work and bright reading environments."
      },
      {
        value: "dark",
        zh: "深色",
        en: "Dark",
        descriptionZh: "适合长时间盯屏或低光环境。",
        descriptionEn: "Best for long sessions and low-light environments."
      }
    ], r = [
      {
        value: "zh",
        zh: "中文",
        en: "Chinese",
        descriptionZh: "默认面向中文使用者的完整文案。",
        descriptionEn: "Full product copy tuned for Chinese-speaking operators."
      },
      {
        value: "en",
        zh: "English",
        en: "English",
        descriptionZh: "切到英文界面，便于国际协作或录屏演示。",
        descriptionEn: "Switch to English for collaboration, demos, or documentation."
      }
    ], c = [
      {
        zh: "日志页会显示完整原始输出，并恢复复制日志等排障动作。",
        en: "Logs can show the full raw output and restore troubleshooting actions like copy."
      },
      {
        zh: "恢复、安全、运维等页面会展示更多原始配置、诊断区和状态细节。",
        en: "Recovery, security, and operations expose more raw configuration, diagnostics, and state detail."
      },
      {
        zh: "后台刷新提示和调试信息会重新出现，更适合定位问题。",
        en: "Background refresh hints and debugging details reappear for deeper troubleshooting."
      }
    ], u = D(() => t.themePreference === "auto" ? t.label("跟随系统", "Auto") : t.themePreference === "light" ? t.label("浅色", "Light") : t.label("深色", "Dark")), d = D(() => t.language === "zh" ? "中文" : "English"), f = D(() => n.connected ? t.label("已连接", "Connected") : t.label("未连接", "Offline"));
    async function p() {
      n.setApiBaseUrl(l.value), await n.probeConnection();
    }
    function h() {
      n.resetApiBaseUrl(), l.value = n.defaultApiBaseUrl;
    }
    return (v, b) => (g(), m("div", ix, [
      a("header", rx, [
        a("div", null, [
          a("p", cx, i(s(t).label("设置 / Local only", "Settings / Local only")), 1),
          a("h2", ux, i(s(t).label("本地偏好与开发者模式", "Local preferences and developer mode")), 1),
          a("p", dx, i(s(t).label(
            "这些设置只保存在当前浏览器或桌面本地，用来调整控制台的显示、调试方式与桌面连接目标，不会直接改动 Guard 服务器。",
            "These preferences stay in the current browser or desktop shell. They shape the console experience and the desktop connection target without directly rewriting the Guard server."
          )), 1)
        ])
      ]),
      H(ae, {
        title: s(t).label("界面偏好", "Interface preferences"),
        eyebrow: "Preferences"
      }, {
        default: Y(() => [
          a("div", fx, [
            a("section", px, [
              a("div", hx, [
                a("div", null, [
                  a("strong", null, i(s(t).label("主题", "Theme")), 1),
                  a("p", null, i(s(t).label("直接在这里切换外观，不用回到右上角菜单。", "Change the appearance directly here without going back to the top-right menu.")), 1)
                ]),
                a("span", gx, i(u.value), 1)
              ]),
              a("div", mx, [
                (g(), m(j, null, fe(o, (C) => a("button", {
                  key: C.value,
                  class: re(["settings-choice", { "settings-choice--active": s(t).themePreference === C.value }]),
                  type: "button",
                  onClick: (E) => s(t).setThemePreference(C.value)
                }, [
                  a("strong", null, i(s(t).label(C.zh, C.en)), 1),
                  a("span", null, i(s(t).label(C.descriptionZh, C.descriptionEn)), 1)
                ], 10, bx)), 64))
              ])
            ]),
            a("section", vx, [
              a("div", yx, [
                a("div", null, [
                  a("strong", null, i(s(t).label("语言", "Language")), 1),
                  a("p", null, i(s(t).label("切换控制台显示语言，文案会立即生效。", "Switch the console language here and apply the copy immediately.")), 1)
                ]),
                a("span", _x, i(d.value), 1)
              ]),
              a("div", wx, [
                (g(), m(j, null, fe(r, (C) => a("button", {
                  key: C.value,
                  class: re(["settings-choice", { "settings-choice--active": s(t).language === C.value }]),
                  type: "button",
                  onClick: (E) => s(t).setLanguage(C.value)
                }, [
                  a("strong", null, i(s(t).label(C.zh, C.en)), 1),
                  a("span", null, i(s(t).label(C.descriptionZh, C.descriptionEn)), 1)
                ], 10, kx)), 64))
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      H(ae, {
        title: s(t).label("开发者模式", "Developer mode"),
        eyebrow: "Developer"
      }, {
        default: Y(() => [
          a("label", $x, [
            a("div", Cx, [
              a("strong", null, i(s(t).label("显示调试与原始视图", "Show debug and raw views")), 1),
              a("span", null, i(s(t).label(
                "开启后会显示原始 JSON、诊断区和后台刷新提示，更适合排查接口、状态或配置问题。",
                "When enabled, the console reveals raw JSON, diagnostic sections, and background refresh hints so API, state, or configuration issues are easier to inspect."
              )), 1)
            ]),
            a("input", {
              checked: s(t).developerMode,
              type: "checkbox",
              onChange: b[0] || (b[0] = (C) => s(t).setDeveloperMode(C.target.checked))
            }, null, 40, Sx)
          ]),
          a("div", Ax, [
            a("span", {
              class: re(["pill", s(t).developerMode ? "pill--warning" : "pill--muted"])
            }, i(s(t).developerMode ? s(t).label("当前已开启", "Currently on") : s(t).label("当前已关闭", "Currently off")), 3),
            a("span", Rx, i(s(t).label("仅影响当前浏览器", "Browser-local only")), 1)
          ]),
          a("ul", xx, [
            (g(), m(j, null, fe(c, (C) => a("li", {
              key: C.en
            }, i(s(t).label(C.zh, C.en)), 1)), 64))
          ]),
          a("div", Px, [
            H(s(xt), {
              class: "inline-link",
              to: "/logs"
            }, {
              default: Y(() => [
                ft(i(s(t).label("去日志页查看原始输出", "Open Logs for raw output")), 1)
              ]),
              _: 1
            }),
            H(s(xt), {
              class: "inline-link",
              to: "/recovery"
            }, {
              default: Y(() => [
                ft(i(s(t).label("去恢复页查看诊断区", "Open Recovery diagnostics")), 1)
              ]),
              _: 1
            }),
            H(s(xt), {
              class: "inline-link",
              to: "/operations"
            }, {
              default: Y(() => [
                ft(i(s(t).label("去运维页检查运行状态", "Open Operations status")), 1)
              ]),
              _: 1
            })
          ]),
          a("div", Tx, i(s(t).label(
            "默认建议关闭，这样更适合普通使用。只在排障、校验接口返回，或者需要查看原始配置时再打开。",
            "Keep this off by default for a cleaner operator experience. Turn it on only when you need troubleshooting, raw API output, or configuration inspection."
          )), 1)
        ]),
        _: 1
      }, 8, ["title"]),
      s(n).isDesktop ? (g(), Ne(ae, {
        key: 0,
        title: s(t).label("桌面连接设置", "Desktop connection settings"),
        eyebrow: "Desktop"
      }, {
        default: Y(() => [
          a("div", Ex, [
            a("label", Dx, [
              a("span", null, i(s(t).label("Guard API 地址", "Guard API base URL")), 1),
              be(a("input", {
                "onUpdate:modelValue": b[1] || (b[1] = (C) => l.value = C),
                class: "settings-input",
                type: "text",
                spellcheck: "false",
                placeholder: s(n).defaultApiBaseUrl
              }, null, 8, Mx), [
                [xe, l.value]
              ]),
              a("small", null, i(s(t).label(
                "桌面薄壳会把所有 /api/* 请求和控制台导航都指向这个地址。默认值是 http://127.0.0.1:18088。",
                "The desktop shell points /api/* requests and console navigation at this address. The default is http://127.0.0.1:18088."
              )), 1)
            ])
          ]),
          a("div", Ix, [
            a("span", {
              class: re(["pill", s(n).connected ? "pill--success" : "pill--warning"])
            }, i(f.value), 3),
            a("span", Ox, i(s(n).apiBaseUrl), 1)
          ]),
          a("div", Lx, [
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              onClick: p
            }, i(s(t).label("保存并检测", "Save and test")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: b[2] || (b[2] = (C) => s(n).probeConnection())
            }, i(s(t).label("重新检测", "Retry connection")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: h
            }, i(s(t).label("恢复默认地址", "Reset to default")), 1)
          ]),
          a("div", Nx, i(s(t).label(
            "桌面版第一阶段不会代你拉起 Guard 服务；如果这里显示未连接，请先在本机终端启动 Guard，再回来重试。",
            "The first desktop preview does not boot Guard for you. If this shows offline, start Guard in a local terminal first, then retry here."
          )), 1)
        ]),
        _: 1
      }, 8, ["title"])) : J("", !0)
    ]));
  }
}), Fx = Rp({
  history: ip(),
  routes: [
    { path: "/", name: "overview", component: Ab },
    { path: "/operations", name: "operations", component: ek },
    { path: "/openclaw", name: "openclaw", component: Dw },
    { path: "/channels", name: "channels", component: pg },
    { path: "/models", name: "models", component: n1 },
    { path: "/security", name: "security", component: qA },
    { path: "/recovery", name: "recovery", component: eS },
    { path: "/roles", name: "roles", component: v0 },
    { path: "/files", name: "files", component: yy },
    { path: "/search", name: "search", component: W0 },
    { path: "/sessions", name: "sessions", component: ox },
    { path: "/logs", name: "logs", component: Wy },
    { path: "/notifications", name: "notifications", component: ow },
    { path: "/cron", name: "cron", component: nb },
    { path: "/settings", name: "settings", component: Ux },
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
Ou(dh).use(Uu()).use(Fx).mount("#guard-next-app");
