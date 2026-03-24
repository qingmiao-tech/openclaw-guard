/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function kl(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Ne = {}, fn = [], xt = () => {
}, ki = () => !1, bs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), $l = (e) => e.startsWith("onUpdate:"), Ze = Object.assign, Cl = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ir = Object.prototype.hasOwnProperty, De = (e, t) => ir.call(e, t), be = Array.isArray, hn = (e) => Hn(e) === "[object Map]", wn = (e) => Hn(e) === "[object Set]", ta = (e) => Hn(e) === "[object Date]", ye = (e) => typeof e == "function", Ke = (e) => typeof e == "string", yt = (e) => typeof e == "symbol", Me = (e) => e !== null && typeof e == "object", $i = (e) => (Me(e) || ye(e)) && ye(e.then) && ye(e.catch), Ci = Object.prototype.toString, Hn = (e) => Ci.call(e), or = (e) => Hn(e).slice(8, -1), Si = (e) => Hn(e) === "[object Object]", vs = (e) => Ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, xn = /* @__PURE__ */ kl(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ys = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, rr = /-\w/g, it = ys(
  (e) => e.replace(rr, (t) => t.slice(1).toUpperCase())
), cr = /\B([A-Z])/g, Zt = ys(
  (e) => e.replace(cr, "-$1").toLowerCase()
), _s = ys((e) => e.charAt(0).toUpperCase() + e.slice(1)), Us = ys(
  (e) => e ? `on${_s(e)}` : ""
), Rt = (e, t) => !Object.is(e, t), ls = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ai = (e, t, n, l = !1) => {
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
let na;
const ks = () => na || (na = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Nn(e) {
  if (be(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const l = e[n], i = Ke(l) ? hr(l) : Nn(l);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (Ke(e) || Me(e))
    return e;
}
const ur = /;(?![^(]*\))/g, dr = /:([^]+)/, fr = /\/\*[^]*?\*\//g;
function hr(e) {
  const t = {};
  return e.replace(fr, "").split(ur).forEach((n) => {
    if (n) {
      const l = n.split(dr);
      l.length > 1 && (t[l[0].trim()] = l[1].trim());
    }
  }), t;
}
function oe(e) {
  let t = "";
  if (Ke(e))
    t = e;
  else if (be(e))
    for (let n = 0; n < e.length; n++) {
      const l = oe(e[n]);
      l && (t += l + " ");
    }
  else if (Me(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const pr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gr = /* @__PURE__ */ kl(pr);
function Ri(e) {
  return !!e || e === "";
}
function mr(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let l = 0; n && l < e.length; l++)
    n = Qt(e[l], t[l]);
  return n;
}
function Qt(e, t) {
  if (e === t) return !0;
  let n = ta(e), l = ta(t);
  if (n || l)
    return n && l ? e.getTime() === t.getTime() : !1;
  if (n = yt(e), l = yt(t), n || l)
    return e === t;
  if (n = be(e), l = be(t), n || l)
    return n && l ? mr(e, t) : !1;
  if (n = Me(e), l = Me(t), n || l) {
    if (!n || !l)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const c in e) {
      const u = e.hasOwnProperty(c), d = t.hasOwnProperty(c);
      if (u && !d || !u && d || !Qt(e[c], t[c]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Sl(e, t) {
  return e.findIndex((n) => Qt(n, t));
}
const Ti = (e) => !!(e && e.__v_isRef === !0), o = (e) => Ke(e) ? e : e == null ? "" : be(e) || Me(e) && (e.toString === Ci || !ye(e.toString)) ? Ti(e) ? o(e.value) : JSON.stringify(e, xi, 2) : String(e), xi = (e, t) => Ti(t) ? xi(e, t.value) : hn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [l, i], r) => (n[Ns(l, r) + " =>"] = i, n),
    {}
  )
} : wn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ns(n))
} : yt(t) ? Ns(t) : Me(t) && !be(t) && !Si(t) ? String(t) : t, Ns = (e, t = "") => {
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
class Pi {
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
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Ei(e) {
  return new Pi(e);
}
function Di() {
  return Xe;
}
function br(e, t = !1) {
  Xe && Xe.cleanups.push(e);
}
let Fe;
const Fs = /* @__PURE__ */ new WeakSet();
class Mi {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Oi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, sa(this), Li(this);
    const t = Fe, n = vt;
    Fe = this, vt = !0;
    try {
      return this.fn();
    } finally {
      Ui(this), Fe = t, vt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Tl(t);
      this.deps = this.depsTail = void 0, sa(this), this.onStop && this.onStop(), this.flags &= -2;
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
let Ii = 0, Pn, En;
function Oi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = En, En = e;
    return;
  }
  e.next = Pn, Pn = e;
}
function Al() {
  Ii++;
}
function Rl() {
  if (--Ii > 0)
    return;
  if (En) {
    let t = En;
    for (En = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Pn; ) {
    let t = Pn;
    for (Pn = void 0; t; ) {
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
function Li(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ui(e) {
  let t, n = e.depsTail, l = n;
  for (; l; ) {
    const i = l.prevDep;
    l.version === -1 ? (l === n && (n = i), Tl(l), vr(l)) : t = l, l.dep.activeLink = l.prevActiveLink, l.prevActiveLink = void 0, l = i;
  }
  e.deps = t, e.depsTail = n;
}
function tl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ni(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ni(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Fn) || (e.globalVersion = Fn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !tl(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Fe, l = vt;
  Fe = e, vt = !0;
  try {
    Li(e);
    const i = e.fn(e._value);
    (t.version === 0 || Rt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Fe = n, vt = l, Ui(e), e.flags &= -3;
  }
}
function Tl(e, t = !1) {
  const { dep: n, prevSub: l, nextSub: i } = e;
  if (l && (l.nextSub = i, e.prevSub = void 0), i && (i.prevSub = l, e.nextSub = void 0), n.subs === e && (n.subs = l, !l && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Tl(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function vr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let vt = !0;
const Fi = [];
function Bt() {
  Fi.push(vt), vt = !1;
}
function Vt() {
  const e = Fi.pop();
  vt = e === void 0 ? !0 : e;
}
function sa(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Fe;
    Fe = void 0;
    try {
      t();
    } finally {
      Fe = n;
    }
  }
}
let Fn = 0;
class yr {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class xl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Fe || !vt || Fe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Fe)
      n = this.activeLink = new yr(Fe, this), Fe.deps ? (n.prevDep = Fe.depsTail, Fe.depsTail.nextDep = n, Fe.depsTail = n) : Fe.deps = Fe.depsTail = n, Gi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const l = n.nextDep;
      l.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = l), n.prevDep = Fe.depsTail, n.nextDep = void 0, Fe.depsTail.nextDep = n, Fe.depsTail = n, Fe.deps === n && (Fe.deps = l);
    }
    return n;
  }
  trigger(t) {
    this.version++, Fn++, this.notify(t);
  }
  notify(t) {
    Al();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Rl();
    }
  }
}
function Gi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let l = t.deps; l; l = l.nextDep)
        Gi(l);
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
  if (vt && Fe) {
    let l = rs.get(e);
    l || rs.set(e, l = /* @__PURE__ */ new Map());
    let i = l.get(n);
    i || (l.set(n, i = new xl()), i.map = l, i.key = n), i.track();
  }
}
function Ut(e, t, n, l, i, r) {
  const c = rs.get(e);
  if (!c) {
    Fn++;
    return;
  }
  const u = (d) => {
    d && d.trigger();
  };
  if (Al(), t === "clear")
    c.forEach(u);
  else {
    const d = be(e), f = d && vs(n);
    if (d && n === "length") {
      const h = Number(l);
      c.forEach((p, y) => {
        (y === "length" || y === Gn || !yt(y) && y >= h) && u(p);
      });
    } else
      switch ((n !== void 0 || c.has(void 0)) && u(c.get(n)), f && u(c.get(Gn)), t) {
        case "add":
          d ? f && u(c.get("length")) : (u(c.get(ln)), hn(e) && u(c.get(nl)));
          break;
        case "delete":
          d || (u(c.get(ln)), hn(e) && u(c.get(nl)));
          break;
        case "set":
          hn(e) && u(c.get(ln));
          break;
      }
  }
  Rl();
}
function _r(e, t) {
  const n = rs.get(e);
  return n && n.get(t);
}
function on(e) {
  const t = /* @__PURE__ */ Te(e);
  return t === e ? t : (et(t, "iterate", Gn), /* @__PURE__ */ pt(e) ? t : t.map(_t));
}
function $s(e) {
  return et(e = /* @__PURE__ */ Te(e), "iterate", Gn), e;
}
function St(e, t) {
  return /* @__PURE__ */ jt(e) ? mn(/* @__PURE__ */ Pt(e) ? _t(t) : t) : _t(t);
}
const wr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Gs(this, Symbol.iterator, (e) => St(this, e));
  },
  concat(...e) {
    return on(this).concat(
      ...e.map((t) => be(t) ? on(t) : t)
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
    return la(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return la(this, "reduceRight", e, t);
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
  const l = $s(e), i = l[t]();
  return l !== e && !/* @__PURE__ */ pt(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.done || (r.value = n(r.value)), r;
  }), i;
}
const kr = Array.prototype;
function Dt(e, t, n, l, i, r) {
  const c = $s(e), u = c !== e && !/* @__PURE__ */ pt(e), d = c[t];
  if (d !== kr[t]) {
    const p = d.apply(e, r);
    return u ? _t(p) : p;
  }
  let f = n;
  c !== e && (u ? f = function(p, y) {
    return n.call(this, St(e, p), y, e);
  } : n.length > 2 && (f = function(p, y) {
    return n.call(this, p, y, e);
  }));
  const h = d.call(c, f, l);
  return u && i ? i(h) : h;
}
function la(e, t, n, l) {
  const i = $s(e), r = i !== e && !/* @__PURE__ */ pt(e);
  let c = n, u = !1;
  i !== e && (r ? (u = l.length === 0, c = function(f, h, p) {
    return u && (u = !1, f = St(e, f)), n.call(this, f, St(e, h), p, e);
  }) : n.length > 3 && (c = function(f, h, p) {
    return n.call(this, f, h, p, e);
  }));
  const d = i[t](c, ...l);
  return u ? St(e, d) : d;
}
function Bs(e, t, n) {
  const l = /* @__PURE__ */ Te(e);
  et(l, "iterate", Gn);
  const i = l[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ Cs(n[0]) ? (n[0] = /* @__PURE__ */ Te(n[0]), l[t](...n)) : i;
}
function Cn(e, t, n = []) {
  Bt(), Al();
  const l = (/* @__PURE__ */ Te(e))[t].apply(e, n);
  return Rl(), Vt(), l;
}
const $r = /* @__PURE__ */ kl("__proto__,__v_isRef,__isVue"), Bi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(yt)
);
function Cr(e) {
  yt(e) || (e = String(e));
  const t = /* @__PURE__ */ Te(this);
  return et(t, "has", e), t.hasOwnProperty(e);
}
class Vi {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, l) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return l === (i ? r ? Ir : Hi : r ? Wi : zi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(l) ? t : void 0;
    const c = be(t);
    if (!i) {
      let d;
      if (c && (d = wr[n]))
        return d;
      if (n === "hasOwnProperty")
        return Cr;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Be(t) ? t : l
    );
    if ((yt(n) ? Bi.has(n) : $r(n)) || (i || et(t, "get", n), r))
      return u;
    if (/* @__PURE__ */ Be(u)) {
      const d = c && vs(n) ? u : u.value;
      return i && Me(d) ? /* @__PURE__ */ ll(d) : d;
    }
    return Me(u) ? i ? /* @__PURE__ */ ll(u) : /* @__PURE__ */ ht(u) : u;
  }
}
class ji extends Vi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, l, i) {
    let r = t[n];
    const c = be(t) && vs(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ jt(r);
      if (!/* @__PURE__ */ pt(l) && !/* @__PURE__ */ jt(l) && (r = /* @__PURE__ */ Te(r), l = /* @__PURE__ */ Te(l)), !c && /* @__PURE__ */ Be(r) && !/* @__PURE__ */ Be(l))
        return f || (r.value = l), !0;
    }
    const u = c ? Number(n) < t.length : De(t, n), d = Reflect.set(
      t,
      n,
      l,
      /* @__PURE__ */ Be(t) ? t : i
    );
    return t === /* @__PURE__ */ Te(i) && (u ? Rt(l, r) && Ut(t, "set", n, l) : Ut(t, "add", n, l)), d;
  }
  deleteProperty(t, n) {
    const l = De(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && l && Ut(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const l = Reflect.has(t, n);
    return (!yt(n) || !Bi.has(n)) && et(t, "has", n), l;
  }
  ownKeys(t) {
    return et(
      t,
      "iterate",
      be(t) ? "length" : ln
    ), Reflect.ownKeys(t);
  }
}
class Sr extends Vi {
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
const Ar = /* @__PURE__ */ new ji(), Rr = /* @__PURE__ */ new Sr(), Tr = /* @__PURE__ */ new ji(!0);
const sl = (e) => e, Zn = (e) => Reflect.getPrototypeOf(e);
function xr(e, t, n) {
  return function(...l) {
    const i = this.__v_raw, r = /* @__PURE__ */ Te(i), c = hn(r), u = e === "entries" || e === Symbol.iterator && c, d = e === "keys" && c, f = i[e](...l), h = n ? sl : t ? mn : _t;
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
          const { value: p, done: y } = f.next();
          return y ? { value: p, done: y } : {
            value: u ? [h(p[0]), h(p[1])] : h(p),
            done: y
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
function Pr(e, t) {
  const n = {
    get(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ Te(r), u = /* @__PURE__ */ Te(i);
      e || (Rt(i, u) && et(c, "get", i), et(c, "get", u));
      const { has: d } = Zn(c), f = t ? sl : e ? mn : _t;
      if (d.call(c, i))
        return f(r.get(i));
      if (d.call(c, u))
        return f(r.get(u));
      r !== c && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && et(/* @__PURE__ */ Te(i), "iterate", ln), i.size;
    },
    has(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ Te(r), u = /* @__PURE__ */ Te(i);
      return e || (Rt(i, u) && et(c, "has", i), et(c, "has", u)), i === u ? r.has(i) : r.has(i) || r.has(u);
    },
    forEach(i, r) {
      const c = this, u = c.__v_raw, d = /* @__PURE__ */ Te(u), f = t ? sl : e ? mn : _t;
      return !e && et(d, "iterate", ln), u.forEach((h, p) => i.call(r, f(h), f(p), c));
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
      add(i) {
        const r = /* @__PURE__ */ Te(this), c = Zn(r), u = /* @__PURE__ */ Te(i), d = !t && !/* @__PURE__ */ pt(i) && !/* @__PURE__ */ jt(i) ? u : i;
        return c.has.call(r, d) || Rt(i, d) && c.has.call(r, i) || Rt(u, d) && c.has.call(r, u) || (r.add(d), Ut(r, "add", d, d)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ pt(r) && !/* @__PURE__ */ jt(r) && (r = /* @__PURE__ */ Te(r));
        const c = /* @__PURE__ */ Te(this), { has: u, get: d } = Zn(c);
        let f = u.call(c, i);
        f || (i = /* @__PURE__ */ Te(i), f = u.call(c, i));
        const h = d.call(c, i);
        return c.set(i, r), f ? Rt(r, h) && Ut(c, "set", i, r) : Ut(c, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Te(this), { has: c, get: u } = Zn(r);
        let d = c.call(r, i);
        d || (i = /* @__PURE__ */ Te(i), d = c.call(r, i)), u && u.call(r, i);
        const f = r.delete(i);
        return d && Ut(r, "delete", i, void 0), f;
      },
      clear() {
        const i = /* @__PURE__ */ Te(this), r = i.size !== 0, c = i.clear();
        return r && Ut(
          i,
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
  ].forEach((i) => {
    n[i] = xr(i, e, t);
  }), n;
}
function Pl(e, t) {
  const n = Pr(e, t);
  return (l, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? l : Reflect.get(
    De(n, i) && i in l ? n : l,
    i,
    r
  );
}
const Er = {
  get: /* @__PURE__ */ Pl(!1, !1)
}, Dr = {
  get: /* @__PURE__ */ Pl(!1, !0)
}, Mr = {
  get: /* @__PURE__ */ Pl(!0, !1)
};
const zi = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), Hi = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap();
function Or(e) {
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
function Lr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Or(or(e));
}
// @__NO_SIDE_EFFECTS__
function ht(e) {
  return /* @__PURE__ */ jt(e) ? e : El(
    e,
    !1,
    Ar,
    Er,
    zi
  );
}
// @__NO_SIDE_EFFECTS__
function Ki(e) {
  return El(
    e,
    !1,
    Tr,
    Dr,
    Wi
  );
}
// @__NO_SIDE_EFFECTS__
function ll(e) {
  return El(
    e,
    !0,
    Rr,
    Mr,
    Hi
  );
}
function El(e, t, n, l, i) {
  if (!Me(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Lr(e);
  if (r === 0)
    return e;
  const c = i.get(e);
  if (c)
    return c;
  const u = new Proxy(
    e,
    r === 2 ? l : n
  );
  return i.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function Pt(e) {
  return /* @__PURE__ */ jt(e) ? /* @__PURE__ */ Pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function jt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Cs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Te(t) : e;
}
function Dl(e) {
  return !De(e, "__v_skip") && Object.isExtensible(e) && Ai(e, "__v_skip", !0), e;
}
const _t = (e) => Me(e) ? /* @__PURE__ */ ht(e) : e, mn = (e) => Me(e) ? /* @__PURE__ */ ll(e) : e;
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
  return qi(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Ur(e) {
  return qi(e, !0);
}
function qi(e, t) {
  return /* @__PURE__ */ Be(e) ? e : new Nr(e, t);
}
class Nr {
  constructor(t, n) {
    this.dep = new xl(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Te(t), this._value = n ? t : _t(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, l = this.__v_isShallow || /* @__PURE__ */ pt(t) || /* @__PURE__ */ jt(t);
    t = l ? t : /* @__PURE__ */ Te(t), Rt(t, n) && (this._rawValue = t, this._value = l ? t : _t(t), this.dep.trigger());
  }
}
function s(e) {
  return /* @__PURE__ */ Be(e) ? e.value : e;
}
const Fr = {
  get: (e, t, n) => t === "__v_raw" ? e : s(Reflect.get(e, t, n)),
  set: (e, t, n, l) => {
    const i = e[t];
    return /* @__PURE__ */ Be(i) && !/* @__PURE__ */ Be(n) ? (i.value = n, !0) : Reflect.set(e, t, n, l);
  }
};
function Ml(e) {
  return /* @__PURE__ */ Pt(e) ? e : new Proxy(e, Fr);
}
// @__NO_SIDE_EFFECTS__
function Gr(e) {
  const t = be(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Ji(e, n);
  return t;
}
class Br {
  constructor(t, n, l) {
    this._object = t, this._key = n, this._defaultValue = l, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ Te(t);
    let i = !0, r = t;
    if (!be(t) || !vs(String(n)))
      do
        i = !/* @__PURE__ */ Cs(r) || /* @__PURE__ */ pt(r);
      while (i && (r = r.__v_raw));
    this._shallow = i;
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
    return _r(this._raw, this._key);
  }
}
class Vr {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function jr(e, t, n) {
  return /* @__PURE__ */ Be(e) ? e : ye(e) ? new Vr(e) : Me(e) && arguments.length > 1 ? Ji(e, t, n) : /* @__PURE__ */ F(e);
}
function Ji(e, t, n) {
  return new Br(e, t, n);
}
class zr {
  constructor(t, n, l) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new xl(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Fn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = l;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Fe !== this)
      return Oi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ni(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Wr(e, t, n = !1) {
  let l, i;
  return ye(e) ? l = e : (l = e.get, i = e.set), new zr(l, i, n);
}
const es = {}, cs = /* @__PURE__ */ new WeakMap();
let nn;
function Hr(e, t = !1, n = nn) {
  if (n) {
    let l = cs.get(n);
    l || cs.set(n, l = []), l.push(e);
  }
}
function Kr(e, t, n = Ne) {
  const { immediate: l, deep: i, once: r, scheduler: c, augmentJob: u, call: d } = n, f = (N) => i ? N : /* @__PURE__ */ pt(N) || i === !1 || i === 0 ? Nt(N, 1) : Nt(N);
  let h, p, y, v, C = !1, P = !1;
  if (/* @__PURE__ */ Be(e) ? (p = () => e.value, C = /* @__PURE__ */ pt(e)) : /* @__PURE__ */ Pt(e) ? (p = () => f(e), C = !0) : be(e) ? (P = !0, C = e.some((N) => /* @__PURE__ */ Pt(N) || /* @__PURE__ */ pt(N)), p = () => e.map((N) => {
    if (/* @__PURE__ */ Be(N))
      return N.value;
    if (/* @__PURE__ */ Pt(N))
      return f(N);
    if (ye(N))
      return d ? d(N, 2) : N();
  })) : ye(e) ? t ? p = d ? () => d(e, 2) : e : p = () => {
    if (y) {
      Bt();
      try {
        y();
      } finally {
        Vt();
      }
    }
    const N = nn;
    nn = h;
    try {
      return d ? d(e, 3, [v]) : e(v);
    } finally {
      nn = N;
    }
  } : p = xt, t && i) {
    const N = p, O = i === !0 ? 1 / 0 : i;
    p = () => Nt(N(), O);
  }
  const R = Di(), x = () => {
    h.stop(), R && R.active && Cl(R.effects, h);
  };
  if (r && t) {
    const N = t;
    t = (...O) => {
      N(...O), x();
    };
  }
  let $ = P ? new Array(e.length).fill(es) : es;
  const T = (N) => {
    if (!(!(h.flags & 1) || !h.dirty && !N))
      if (t) {
        const O = h.run();
        if (i || C || (P ? O.some((ee, b) => Rt(ee, $[b])) : Rt(O, $))) {
          y && y();
          const ee = nn;
          nn = h;
          try {
            const b = [
              O,
              // pass undefined as the old value when it's changed for the first time
              $ === es ? void 0 : P && $[0] === es ? [] : $,
              v
            ];
            $ = O, d ? d(t, 3, b) : (
              // @ts-expect-error
              t(...b)
            );
          } finally {
            nn = ee;
          }
        }
      } else
        h.run();
  };
  return u && u(T), h = new Mi(p), h.scheduler = c ? () => c(T, !1) : T, v = (N) => Hr(N, !1, h), y = h.onStop = () => {
    const N = cs.get(h);
    if (N) {
      if (d)
        d(N, 4);
      else
        for (const O of N) O();
      cs.delete(h);
    }
  }, t ? l ? T(!0) : $ = h.run() : c ? c(T.bind(null, !0), !0) : h.run(), x.pause = h.pause.bind(h), x.resume = h.resume.bind(h), x.stop = x, x;
}
function Nt(e, t = 1 / 0, n) {
  if (t <= 0 || !Me(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Be(e))
    Nt(e.value, t, n);
  else if (be(e))
    for (let l = 0; l < e.length; l++)
      Nt(e[l], t, n);
  else if (wn(e) || hn(e))
    e.forEach((l) => {
      Nt(l, t, n);
    });
  else if (Si(e)) {
    for (const l in e)
      Nt(e[l], t, n);
    for (const l of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, l) && Nt(e[l], t, n);
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
  } catch (i) {
    Ss(i, t, n);
  }
}
function Et(e, t, n, l) {
  if (ye(e)) {
    const i = Kn(e, t, n, l);
    return i && $i(i) && i.catch((r) => {
      Ss(r, t, n);
    }), i;
  }
  if (be(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Et(e[r], t, n, l));
    return i;
  }
}
function Ss(e, t, n, l = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: c } = t && t.appContext.config || Ne;
  if (t) {
    let u = t.parent;
    const d = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; u; ) {
      const h = u.ec;
      if (h) {
        for (let p = 0; p < h.length; p++)
          if (h[p](e, d, f) === !1)
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
  qr(e, n, i, l, c);
}
function qr(e, t, n, l = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const at = [];
let Ct = -1;
const pn = [];
let qt = null, un = 0;
const Qi = /* @__PURE__ */ Promise.resolve();
let us = null;
function As(e) {
  const t = us || Qi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Jr(e) {
  let t = Ct + 1, n = at.length;
  for (; t < n; ) {
    const l = t + n >>> 1, i = at[l], r = Bn(i);
    r < e || r === e && i.flags & 2 ? t = l + 1 : n = l;
  }
  return t;
}
function Il(e) {
  if (!(e.flags & 1)) {
    const t = Bn(e), n = at[at.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Bn(n) ? at.push(e) : at.splice(Jr(t), 0, e), e.flags |= 1, Yi();
  }
}
function Yi() {
  us || (us = Qi.then(Xi));
}
function Qr(e) {
  be(e) ? pn.push(...e) : qt && e.id === -1 ? qt.splice(un + 1, 0, e) : e.flags & 1 || (pn.push(e), e.flags |= 1), Yi();
}
function aa(e, t, n = Ct + 1) {
  for (; n < at.length; n++) {
    const l = at[n];
    if (l && l.flags & 2) {
      if (e && l.id !== e.uid)
        continue;
      at.splice(n, 1), n--, l.flags & 4 && (l.flags &= -2), l(), l.flags & 4 || (l.flags &= -2);
    }
  }
}
function Zi(e) {
  if (pn.length) {
    const t = [...new Set(pn)].sort(
      (n, l) => Bn(n) - Bn(l)
    );
    if (pn.length = 0, qt) {
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
function Xi(e) {
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
    Ct = -1, at.length = 0, Zi(), us = null, (at.length || pn.length) && Xi();
  }
}
let Ye = null, eo = null;
function ds(e) {
  const t = Ye;
  return Ye = e, eo = e && e.type.__scopeId || null, t;
}
function Z(e, t = Ye, n) {
  if (!t || e._n)
    return e;
  const l = (...i) => {
    l._d && ps(-1);
    const r = ds(t);
    let c;
    try {
      c = e(...i);
    } finally {
      ds(r), l._d && ps(1);
    }
    return c;
  };
  return l._n = !0, l._c = !0, l._d = !0, l;
}
function pe(e, t) {
  if (Ye === null)
    return e;
  const n = Ps(Ye), l = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, c, u, d = Ne] = t[i];
    r && (ye(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Nt(c), l.push({
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
  const i = e.dirs, r = t && t.dirs;
  for (let c = 0; c < i.length; c++) {
    const u = i[c];
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
  const l = xo();
  if (l || an) {
    let i = an ? an._context.provides : l ? l.parent == null || l.ce ? l.vnode.appContext && l.vnode.appContext.provides : l.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && ye(t) ? t.call(l && l.proxy) : t;
  }
}
function Yr() {
  return !!(xo() || an);
}
const Zr = /* @__PURE__ */ Symbol.for("v-scx"), Xr = () => gt(Zr);
function xe(e, t, n) {
  return to(e, t, n);
}
function to(e, t, n = Ne) {
  const { immediate: l, deep: i, flush: r, once: c } = n, u = Ze({}, n), d = t && l || !t && r !== "post";
  let f;
  if (zn) {
    if (r === "sync") {
      const v = Xr();
      f = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!d) {
      const v = () => {
      };
      return v.stop = xt, v.resume = xt, v.pause = xt, v;
    }
  }
  const h = tt;
  u.call = (v, C, P) => Et(v, h, C, P);
  let p = !1;
  r === "post" ? u.scheduler = (v) => {
    rt(v, h && h.suspense);
  } : r !== "sync" && (p = !0, u.scheduler = (v, C) => {
    C ? v() : Il(v);
  }), u.augmentJob = (v) => {
    t && (v.flags |= 4), p && (v.flags |= 2, h && (v.id = h.uid, v.i = h));
  };
  const y = Kr(e, t, u);
  return zn && (f ? f.push(y) : d && y()), y;
}
function ec(e, t, n) {
  const l = this.proxy, i = Ke(e) ? e.includes(".") ? no(l, e) : () => l[e] : e.bind(l, l);
  let r;
  ye(t) ? r = t : (r = t.handler, n = t);
  const c = qn(this), u = to(i, r.bind(l), n);
  return c(), u;
}
function no(e, t) {
  const n = t.split(".");
  return () => {
    let l = e;
    for (let i = 0; i < n.length && l; i++)
      l = l[n[i]];
    return l;
  };
}
const tc = /* @__PURE__ */ Symbol("_vte"), nc = (e) => e.__isTeleport, sc = /* @__PURE__ */ Symbol("_leaveCb");
function Ol(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Ol(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function we(e, t) {
  return ye(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ze({ name: e.name }, t, { setup: e })
  ) : e;
}
function so(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ia(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const fs = /* @__PURE__ */ new WeakMap();
function Dn(e, t, n, l, i = !1) {
  if (be(e)) {
    e.forEach(
      (P, R) => Dn(
        P,
        t && (be(t) ? t[R] : t),
        n,
        l,
        i
      )
    );
    return;
  }
  if (gn(l) && !i) {
    l.shapeFlag & 512 && l.type.__asyncResolved && l.component.subTree.component && Dn(e, t, n, l.component.subTree);
    return;
  }
  const r = l.shapeFlag & 4 ? Ps(l.component) : l.el, c = i ? null : r, { i: u, r: d } = e, f = t && t.r, h = u.refs === Ne ? u.refs = {} : u.refs, p = u.setupState, y = /* @__PURE__ */ Te(p), v = p === Ne ? ki : (P) => ia(h, P) ? !1 : De(y, P), C = (P, R) => !(R && ia(h, R));
  if (f != null && f !== d) {
    if (oa(t), Ke(f))
      h[f] = null, v(f) && (p[f] = null);
    else if (/* @__PURE__ */ Be(f)) {
      const P = t;
      C(f, P.k) && (f.value = null), P.k && (h[P.k] = null);
    }
  }
  if (ye(d))
    Kn(d, u, 12, [c, h]);
  else {
    const P = Ke(d), R = /* @__PURE__ */ Be(d);
    if (P || R) {
      const x = () => {
        if (e.f) {
          const $ = P ? v(d) ? p[d] : h[d] : C() || !e.k ? d.value : h[e.k];
          if (i)
            be($) && Cl($, r);
          else if (be($))
            $.includes(r) || $.push(r);
          else if (P)
            h[d] = [r], v(d) && (p[d] = h[d]);
          else {
            const T = [r];
            C(d, e.k) && (d.value = T), e.k && (h[e.k] = T);
          }
        } else P ? (h[d] = c, v(d) && (p[d] = c)) : R && (C(d, e.k) && (d.value = c), e.k && (h[e.k] = c));
      };
      if (c) {
        const $ = () => {
          x(), fs.delete(e);
        };
        $.id = -1, fs.set(e, $), rt($, n);
      } else
        oa(e), x();
    }
  }
}
function oa(e) {
  const t = fs.get(e);
  t && (t.flags |= 8, fs.delete(e));
}
ks().requestIdleCallback;
ks().cancelIdleCallback;
const gn = (e) => !!e.type.__asyncLoader, lo = (e) => e.type.__isKeepAlive;
function ao(e, t) {
  oo(e, "a", t);
}
function io(e, t) {
  oo(e, "da", t);
}
function oo(e, t, n = tt) {
  const l = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Rs(t, l, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      lo(i.parent.vnode) && lc(l, t, n, i), i = i.parent;
  }
}
function lc(e, t, n, l) {
  const i = Rs(
    t,
    e,
    l,
    !0
    /* prepend */
  );
  Ul(() => {
    Cl(l[t], i);
  }, n);
}
function Rs(e, t, n = tt, l = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...c) => {
      Bt();
      const u = qn(n), d = Et(t, n, e, c);
      return u(), Vt(), d;
    });
    return l ? i.unshift(r) : i.push(r), r;
  }
}
const Wt = (e) => (t, n = tt) => {
  (!zn || e === "sp") && Rs(e, (...l) => t(...l), n);
}, ac = Wt("bm"), nt = Wt("m"), ic = Wt(
  "bu"
), oc = Wt("u"), Ll = Wt(
  "bum"
), Ul = Wt("um"), rc = Wt(
  "sp"
), cc = Wt("rtg"), uc = Wt("rtc");
function dc(e, t = tt) {
  Rs("ec", e, t);
}
const fc = "components";
function hc(e, t) {
  return gc(fc, e, !0, t) || e;
}
const pc = /* @__PURE__ */ Symbol.for("v-ndc");
function gc(e, t, n = !0, l = !1) {
  const i = Ye || tt;
  if (i) {
    const r = i.type;
    {
      const u = Xc(
        r,
        !1
      );
      if (u && (u === t || u === it(t) || u === _s(it(t))))
        return r;
    }
    const c = (
      // local registration
      // check instance[type] first which is resolved for options API
      ra(i[e] || r[e], t) || // global registration
      ra(i.appContext[e], t)
    );
    return !c && l ? r : c;
  }
}
function ra(e, t) {
  return e && (e[t] || e[it(t)] || e[_s(it(t))]);
}
function ce(e, t, n, l) {
  let i;
  const r = n, c = be(e);
  if (c || Ke(e)) {
    const u = c && /* @__PURE__ */ Pt(e);
    let d = !1, f = !1;
    u && (d = !/* @__PURE__ */ pt(e), f = /* @__PURE__ */ jt(e), e = $s(e)), i = new Array(e.length);
    for (let h = 0, p = e.length; h < p; h++)
      i[h] = t(
        d ? f ? mn(_t(e[h])) : _t(e[h]) : e[h],
        h,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let u = 0; u < e; u++)
      i[u] = t(u + 1, u, void 0, r);
  } else if (Me(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (u, d) => t(u, d, void 0, r)
      );
    else {
      const u = Object.keys(e);
      i = new Array(u.length);
      for (let d = 0, f = u.length; d < f; d++) {
        const h = u[d];
        i[d] = t(e[h], h, d, r);
      }
    }
  else
    i = [];
  return i;
}
function ca(e, t, n = {}, l, i) {
  if (Ye.ce || Ye.parent && gn(Ye.parent) && Ye.parent.ce) {
    const f = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), g(), Ue(
      W,
      null,
      [K("slot", n, l)],
      f ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1), g();
  const c = r && ro(r(n)), u = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  c && c.key, d = Ue(
    W,
    {
      key: (u && !yt(u) ? u : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!c && l ? "_fb" : "")
    },
    c || [],
    c && e._ === 1 ? 64 : -2
  );
  return d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]), r && r._c && (r._d = !0), d;
}
function ro(e) {
  return e.some((t) => jn(t) ? !(t.type === zt || t.type === W && !ro(t.children)) : !0) ? e : null;
}
const al = (e) => e ? Po(e) ? Ps(e) : al(e.parent) : null, Mn = (
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
    $options: (e) => uo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Il(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = As.bind(e.proxy)),
    $watch: (e) => ec.bind(e)
  })
), Vs = (e, t) => e !== Ne && !e.__isScriptSetup && De(e, t), mc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: l, data: i, props: r, accessCache: c, type: u, appContext: d } = e;
    if (t[0] !== "$") {
      const y = c[t];
      if (y !== void 0)
        switch (y) {
          case 1:
            return l[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Vs(l, t))
          return c[t] = 1, l[t];
        if (i !== Ne && De(i, t))
          return c[t] = 2, i[t];
        if (De(r, t))
          return c[t] = 3, r[t];
        if (n !== Ne && De(n, t))
          return c[t] = 4, n[t];
        il && (c[t] = 0);
      }
    }
    const f = Mn[t];
    let h, p;
    if (f)
      return t === "$attrs" && et(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (h = u.__cssModules) && (h = h[t])
    )
      return h;
    if (n !== Ne && De(n, t))
      return c[t] = 4, n[t];
    if (
      // global properties
      p = d.config.globalProperties, De(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: l, setupState: i, ctx: r } = e;
    return Vs(i, t) ? (i[t] = n, !0) : l !== Ne && De(l, t) ? (l[t] = n, !0) : De(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: l, appContext: i, props: r, type: c }
  }, u) {
    let d;
    return !!(n[u] || e !== Ne && u[0] !== "$" && De(e, u) || Vs(t, u) || De(r, u) || De(l, u) || De(Mn, u) || De(i.config.globalProperties, u) || (d = c.__cssModules) && d[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : De(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ua(e) {
  return be(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let il = !0;
function bc(e) {
  const t = uo(e), n = e.proxy, l = e.ctx;
  il = !1, t.beforeCreate && da(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: c,
    watch: u,
    provide: d,
    inject: f,
    // lifecycle
    created: h,
    beforeMount: p,
    mounted: y,
    beforeUpdate: v,
    updated: C,
    activated: P,
    deactivated: R,
    beforeDestroy: x,
    beforeUnmount: $,
    destroyed: T,
    unmounted: N,
    render: O,
    renderTracked: ee,
    renderTriggered: b,
    errorCaptured: S,
    serverPrefetch: E,
    // public API
    expose: z,
    inheritAttrs: j,
    // assets
    components: me,
    directives: Ce,
    filters: Oe
  } = t;
  if (f && vc(f, l, null), c)
    for (const fe in c) {
      const _e = c[fe];
      ye(_e) && (l[fe] = _e.bind(n));
    }
  if (i) {
    const fe = i.call(n, n);
    Me(fe) && (e.data = /* @__PURE__ */ ht(fe));
  }
  if (il = !0, r)
    for (const fe in r) {
      const _e = r[fe], Ve = ye(_e) ? _e.bind(n, n) : ye(_e.get) ? _e.get.bind(n, n) : xt, Je = !ye(_e) && ye(_e.set) ? _e.set.bind(n) : xt, H = D({
        get: Ve,
        set: Je
      });
      Object.defineProperty(l, fe, {
        enumerable: !0,
        configurable: !0,
        get: () => H.value,
        set: (q) => H.value = q
      });
    }
  if (u)
    for (const fe in u)
      co(u[fe], l, n, fe);
  if (d) {
    const fe = ye(d) ? d.call(n) : d;
    Reflect.ownKeys(fe).forEach((_e) => {
      as(_e, fe[_e]);
    });
  }
  h && da(h, e, "c");
  function ue(fe, _e) {
    be(_e) ? _e.forEach((Ve) => fe(Ve.bind(n))) : _e && fe(_e.bind(n));
  }
  if (ue(ac, p), ue(nt, y), ue(ic, v), ue(oc, C), ue(ao, P), ue(io, R), ue(dc, S), ue(uc, ee), ue(cc, b), ue(Ll, $), ue(Ul, N), ue(rc, E), be(z))
    if (z.length) {
      const fe = e.exposed || (e.exposed = {});
      z.forEach((_e) => {
        Object.defineProperty(fe, _e, {
          get: () => n[_e],
          set: (Ve) => n[_e] = Ve,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === xt && (e.render = O), j != null && (e.inheritAttrs = j), me && (e.components = me), Ce && (e.directives = Ce), E && so(e);
}
function vc(e, t, n = xt) {
  be(e) && (e = ol(e));
  for (const l in e) {
    const i = e[l];
    let r;
    Me(i) ? "default" in i ? r = gt(
      i.from || l,
      i.default,
      !0
    ) : r = gt(i.from || l) : r = gt(i), /* @__PURE__ */ Be(r) ? Object.defineProperty(t, l, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (c) => r.value = c
    }) : t[l] = r;
  }
}
function da(e, t, n) {
  Et(
    be(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function co(e, t, n, l) {
  let i = l.includes(".") ? no(n, l) : () => n[l];
  if (Ke(e)) {
    const r = t[e];
    ye(r) && xe(i, r);
  } else if (ye(e))
    xe(i, e.bind(n));
  else if (Me(e))
    if (be(e))
      e.forEach((r) => co(r, t, n, l));
    else {
      const r = ye(e.handler) ? e.handler.bind(n) : t[e.handler];
      ye(r) && xe(i, r, e);
    }
}
function uo(e) {
  const t = e.type, { mixins: n, extends: l } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: c }
  } = e.appContext, u = r.get(t);
  let d;
  return u ? d = u : !i.length && !n && !l ? d = t : (d = {}, i.length && i.forEach(
    (f) => hs(d, f, c, !0)
  ), hs(d, t, c)), Me(t) && r.set(t, d), d;
}
function hs(e, t, n, l = !1) {
  const { mixins: i, extends: r } = t;
  r && hs(e, r, n, !0), i && i.forEach(
    (c) => hs(e, c, n, !0)
  );
  for (const c in t)
    if (!(l && c === "expose")) {
      const u = yc[c] || n && n[c];
      e[c] = u ? u(e[c], t[c]) : t[c];
    }
  return e;
}
const yc = {
  data: fa,
  props: ha,
  emits: ha,
  // objects
  methods: Tn,
  computed: Tn,
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
  components: Tn,
  directives: Tn,
  // watch
  watch: wc,
  // provide / inject
  provide: fa,
  inject: _c
};
function fa(e, t) {
  return t ? e ? function() {
    return Ze(
      ye(e) ? e.call(this, this) : e,
      ye(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function _c(e, t) {
  return Tn(ol(e), ol(t));
}
function ol(e) {
  if (be(e)) {
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
function Tn(e, t) {
  return e ? Ze(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ha(e, t) {
  return e ? be(e) && be(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ze(
    /* @__PURE__ */ Object.create(null),
    ua(e),
    ua(t ?? {})
  ) : t;
}
function wc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ze(/* @__PURE__ */ Object.create(null), e);
  for (const l in t)
    n[l] = st(e[l], t[l]);
  return n;
}
function fo() {
  return {
    app: null,
    config: {
      isNativeTag: ki,
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
let kc = 0;
function $c(e, t) {
  return function(l, i = null) {
    ye(l) || (l = Ze({}, l)), i != null && !Me(i) && (i = null);
    const r = fo(), c = /* @__PURE__ */ new WeakSet(), u = [];
    let d = !1;
    const f = r.app = {
      _uid: kc++,
      _component: l,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: tu,
      get config() {
        return r.config;
      },
      set config(h) {
      },
      use(h, ...p) {
        return c.has(h) || (h && ye(h.install) ? (c.add(h), h.install(f, ...p)) : ye(h) && (c.add(h), h(f, ...p))), f;
      },
      mixin(h) {
        return r.mixins.includes(h) || r.mixins.push(h), f;
      },
      component(h, p) {
        return p ? (r.components[h] = p, f) : r.components[h];
      },
      directive(h, p) {
        return p ? (r.directives[h] = p, f) : r.directives[h];
      },
      mount(h, p, y) {
        if (!d) {
          const v = f._ceVNode || K(l, i);
          return v.appContext = r, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(v, h, y), d = !0, f._container = h, h.__vue_app__ = f, Ps(v.component);
        }
      },
      onUnmount(h) {
        u.push(h);
      },
      unmount() {
        d && (Et(
          u,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(h, p) {
        return r.provides[h] = p, f;
      },
      runWithContext(h) {
        const p = an;
        an = f;
        try {
          return h();
        } finally {
          an = p;
        }
      }
    };
    return f;
  };
}
let an = null;
const Cc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${it(t)}Modifiers`] || e[`${Zt(t)}Modifiers`];
function Sc(e, t, ...n) {
  if (e.isUnmounted) return;
  const l = e.vnode.props || Ne;
  let i = n;
  const r = t.startsWith("update:"), c = r && Cc(l, t.slice(7));
  c && (c.trim && (i = n.map((h) => Ke(h) ? h.trim() : h)), c.number && (i = n.map(ws)));
  let u, d = l[u = Us(t)] || // also try camelCase event handler (#2249)
  l[u = Us(it(t))];
  !d && r && (d = l[u = Us(Zt(t))]), d && Et(
    d,
    e,
    6,
    i
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
      i
    );
  }
}
const Ac = /* @__PURE__ */ new WeakMap();
function ho(e, t, n = !1) {
  const l = n ? Ac : t.emitsCache, i = l.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let c = {}, u = !1;
  if (!ye(e)) {
    const d = (f) => {
      const h = ho(f, t, !0);
      h && (u = !0, Ze(c, h));
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !r && !u ? (Me(e) && l.set(e, null), null) : (be(r) ? r.forEach((d) => c[d] = null) : Ze(c, r), Me(e) && l.set(e, c), c);
}
function Ts(e, t) {
  return !e || !bs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), De(e, t[0].toLowerCase() + t.slice(1)) || De(e, Zt(t)) || De(e, t));
}
function pa(e) {
  const {
    type: t,
    vnode: n,
    proxy: l,
    withProxy: i,
    propsOptions: [r],
    slots: c,
    attrs: u,
    emit: d,
    render: f,
    renderCache: h,
    props: p,
    data: y,
    setupState: v,
    ctx: C,
    inheritAttrs: P
  } = e, R = ds(e);
  let x, $;
  try {
    if (n.shapeFlag & 4) {
      const N = i || l, O = N;
      x = At(
        f.call(
          O,
          N,
          h,
          p,
          v,
          y,
          C
        )
      ), $ = u;
    } else {
      const N = t;
      x = At(
        N.length > 1 ? N(
          p,
          { attrs: u, slots: c, emit: d }
        ) : N(
          p,
          null
        )
      ), $ = t.props ? u : Rc(u);
    }
  } catch (N) {
    In.length = 0, Ss(N, e, 1), x = K(zt);
  }
  let T = x;
  if ($ && P !== !1) {
    const N = Object.keys($), { shapeFlag: O } = T;
    N.length && O & 7 && (r && N.some($l) && ($ = Tc(
      $,
      r
    )), T = bn(T, $, !1, !0));
  }
  return n.dirs && (T = bn(T, null, !1, !0), T.dirs = T.dirs ? T.dirs.concat(n.dirs) : n.dirs), n.transition && Ol(T, n.transition), x = T, ds(R), x;
}
const Rc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || bs(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Tc = (e, t) => {
  const n = {};
  for (const l in e)
    (!$l(l) || !(l.slice(9) in t)) && (n[l] = e[l]);
  return n;
};
function xc(e, t, n) {
  const { props: l, children: i, component: r } = e, { props: c, children: u, patchFlag: d } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return l ? ga(l, c, f) : !!c;
    if (d & 8) {
      const h = t.dynamicProps;
      for (let p = 0; p < h.length; p++) {
        const y = h[p];
        if (po(c, l, y) && !Ts(f, y))
          return !0;
      }
    }
  } else
    return (i || u) && (!u || !u.$stable) ? !0 : l === c ? !1 : l ? c ? ga(l, c, f) : !0 : !!c;
  return !1;
}
function ga(e, t, n) {
  const l = Object.keys(t);
  if (l.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < l.length; i++) {
    const r = l[i];
    if (po(t, e, r) && !Ts(n, r))
      return !0;
  }
  return !1;
}
function po(e, t, n) {
  const l = e[n], i = t[n];
  return n === "style" && Me(l) && Me(i) ? !Qt(l, i) : l !== i;
}
function Pc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const l = t.subTree;
    if (l.suspense && l.suspense.activeBranch === e && (l.el = e.el), l === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const go = {}, mo = () => Object.create(go), bo = (e) => Object.getPrototypeOf(e) === go;
function Ec(e, t, n, l = !1) {
  const i = {}, r = mo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), vo(e, t, i, r);
  for (const c in e.propsOptions[0])
    c in i || (i[c] = void 0);
  n ? e.props = l ? i : /* @__PURE__ */ Ki(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Dc(e, t, n, l) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: c }
  } = e, u = /* @__PURE__ */ Te(i), [d] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (l || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const h = e.vnode.dynamicProps;
      for (let p = 0; p < h.length; p++) {
        let y = h[p];
        if (Ts(e.emitsOptions, y))
          continue;
        const v = t[y];
        if (d)
          if (De(r, y))
            v !== r[y] && (r[y] = v, f = !0);
          else {
            const C = it(y);
            i[C] = rl(
              d,
              u,
              C,
              v,
              e,
              !1
            );
          }
        else
          v !== r[y] && (r[y] = v, f = !0);
      }
    }
  } else {
    vo(e, t, i, r) && (f = !0);
    let h;
    for (const p in u)
      (!t || // for camelCase
      !De(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = Zt(p)) === p || !De(t, h))) && (d ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[h] !== void 0) && (i[p] = rl(
        d,
        u,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (r !== u)
      for (const p in r)
        (!t || !De(t, p)) && (delete r[p], f = !0);
  }
  f && Ut(e.attrs, "set", "");
}
function vo(e, t, n, l) {
  const [i, r] = e.propsOptions;
  let c = !1, u;
  if (t)
    for (let d in t) {
      if (xn(d))
        continue;
      const f = t[d];
      let h;
      i && De(i, h = it(d)) ? !r || !r.includes(h) ? n[h] = f : (u || (u = {}))[h] = f : Ts(e.emitsOptions, d) || (!(d in l) || f !== l[d]) && (l[d] = f, c = !0);
    }
  if (r) {
    const d = /* @__PURE__ */ Te(n), f = u || Ne;
    for (let h = 0; h < r.length; h++) {
      const p = r[h];
      n[p] = rl(
        i,
        d,
        p,
        f[p],
        e,
        !De(f, p)
      );
    }
  }
  return c;
}
function rl(e, t, n, l, i, r) {
  const c = e[n];
  if (c != null) {
    const u = De(c, "default");
    if (u && l === void 0) {
      const d = c.default;
      if (c.type !== Function && !c.skipFactory && ye(d)) {
        const { propsDefaults: f } = i;
        if (n in f)
          l = f[n];
        else {
          const h = qn(i);
          l = f[n] = d.call(
            null,
            t
          ), h();
        }
      } else
        l = d;
      i.ce && i.ce._setProp(n, l);
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
const Mc = /* @__PURE__ */ new WeakMap();
function yo(e, t, n = !1) {
  const l = n ? Mc : t.propsCache, i = l.get(e);
  if (i)
    return i;
  const r = e.props, c = {}, u = [];
  let d = !1;
  if (!ye(e)) {
    const h = (p) => {
      d = !0;
      const [y, v] = yo(p, t, !0);
      Ze(c, y), v && u.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !d)
    return Me(e) && l.set(e, fn), fn;
  if (be(r))
    for (let h = 0; h < r.length; h++) {
      const p = it(r[h]);
      ma(p) && (c[p] = Ne);
    }
  else if (r)
    for (const h in r) {
      const p = it(h);
      if (ma(p)) {
        const y = r[h], v = c[p] = be(y) || ye(y) ? { type: y } : Ze({}, y), C = v.type;
        let P = !1, R = !0;
        if (be(C))
          for (let x = 0; x < C.length; ++x) {
            const $ = C[x], T = ye($) && $.name;
            if (T === "Boolean") {
              P = !0;
              break;
            } else T === "String" && (R = !1);
          }
        else
          P = ye(C) && C.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = P, v[
          1
          /* shouldCastTrue */
        ] = R, (P || De(v, "default")) && u.push(p);
      }
    }
  const f = [c, u];
  return Me(e) && l.set(e, f), f;
}
function ma(e) {
  return e[0] !== "$" && !xn(e);
}
const Nl = (e) => e === "_" || e === "_ctx" || e === "$stable", Fl = (e) => be(e) ? e.map(At) : [At(e)], Ic = (e, t, n) => {
  if (t._n)
    return t;
  const l = Z((...i) => Fl(t(...i)), n);
  return l._c = !1, l;
}, _o = (e, t, n) => {
  const l = e._ctx;
  for (const i in e) {
    if (Nl(i)) continue;
    const r = e[i];
    if (ye(r))
      t[i] = Ic(i, r, l);
    else if (r != null) {
      const c = Fl(r);
      t[i] = () => c;
    }
  }
}, wo = (e, t) => {
  const n = Fl(t);
  e.slots.default = () => n;
}, ko = (e, t, n) => {
  for (const l in t)
    (n || !Nl(l)) && (e[l] = t[l]);
}, Oc = (e, t, n) => {
  const l = e.slots = mo();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (ko(l, t, n), n && Ai(l, "_", i, !0)) : _o(t, l);
  } else t && wo(e, t);
}, Lc = (e, t, n) => {
  const { vnode: l, slots: i } = e;
  let r = !0, c = Ne;
  if (l.shapeFlag & 32) {
    const u = t._;
    u ? n && u === 1 ? r = !1 : ko(i, t, n) : (r = !t.$stable, _o(t, i)), c = t;
  } else t && (wo(e, t), c = { default: 1 });
  if (r)
    for (const u in i)
      !Nl(u) && c[u] == null && delete i[u];
}, rt = Bc;
function Uc(e) {
  return Nc(e);
}
function Nc(e, t) {
  const n = ks();
  n.__VUE__ = !0;
  const {
    insert: l,
    remove: i,
    patchProp: r,
    createElement: c,
    createText: u,
    createComment: d,
    setText: f,
    setElementText: h,
    parentNode: p,
    nextSibling: y,
    setScopeId: v = xt,
    insertStaticContent: C
  } = e, P = (_, k, A, L = null, B = null, U = null, te = void 0, X = null, J = !!k.dynamicChildren) => {
    if (_ === k)
      return;
    _ && !Sn(_, k) && (L = I(_), q(_, B, U, !0), _ = null), k.patchFlag === -2 && (J = !1, k.dynamicChildren = null);
    const { type: V, ref: ge, shapeFlag: ie } = k;
    switch (V) {
      case xs:
        R(_, k, A, L);
        break;
      case zt:
        x(_, k, A, L);
        break;
      case zs:
        _ == null && $(k, A, L, te);
        break;
      case W:
        me(
          _,
          k,
          A,
          L,
          B,
          U,
          te,
          X,
          J
        );
        break;
      default:
        ie & 1 ? O(
          _,
          k,
          A,
          L,
          B,
          U,
          te,
          X,
          J
        ) : ie & 6 ? Ce(
          _,
          k,
          A,
          L,
          B,
          U,
          te,
          X,
          J
        ) : (ie & 64 || ie & 128) && V.process(
          _,
          k,
          A,
          L,
          B,
          U,
          te,
          X,
          J,
          G
        );
    }
    ge != null && B ? Dn(ge, _ && _.ref, U, k || _, !k) : ge == null && _ && _.ref != null && Dn(_.ref, null, U, _, !0);
  }, R = (_, k, A, L) => {
    if (_ == null)
      l(
        k.el = u(k.children),
        A,
        L
      );
    else {
      const B = k.el = _.el;
      k.children !== _.children && f(B, k.children);
    }
  }, x = (_, k, A, L) => {
    _ == null ? l(
      k.el = d(k.children || ""),
      A,
      L
    ) : k.el = _.el;
  }, $ = (_, k, A, L) => {
    [_.el, _.anchor] = C(
      _.children,
      k,
      A,
      L,
      _.el,
      _.anchor
    );
  }, T = ({ el: _, anchor: k }, A, L) => {
    let B;
    for (; _ && _ !== k; )
      B = y(_), l(_, A, L), _ = B;
    l(k, A, L);
  }, N = ({ el: _, anchor: k }) => {
    let A;
    for (; _ && _ !== k; )
      A = y(_), i(_), _ = A;
    i(k);
  }, O = (_, k, A, L, B, U, te, X, J) => {
    if (k.type === "svg" ? te = "svg" : k.type === "math" && (te = "mathml"), _ == null)
      ee(
        k,
        A,
        L,
        B,
        U,
        te,
        X,
        J
      );
    else {
      const V = _.el && _.el._isVueCE ? _.el : null;
      try {
        V && V._beginPatch(), E(
          _,
          k,
          B,
          U,
          te,
          X,
          J
        );
      } finally {
        V && V._endPatch();
      }
    }
  }, ee = (_, k, A, L, B, U, te, X) => {
    let J, V;
    const { props: ge, shapeFlag: ie, transition: he, dirs: ve } = _;
    if (J = _.el = c(
      _.type,
      U,
      ge && ge.is,
      ge
    ), ie & 8 ? h(J, _.children) : ie & 16 && S(
      _.children,
      J,
      null,
      L,
      B,
      js(_, U),
      te,
      X
    ), ve && Xt(_, null, L, "created"), b(J, _, _.scopeId, te, L), ge) {
      for (const Le in ge)
        Le !== "value" && !xn(Le) && r(J, Le, null, ge[Le], U, L);
      "value" in ge && r(J, "value", null, ge.value, U), (V = ge.onVnodeBeforeMount) && $t(V, L, _);
    }
    ve && Xt(_, null, L, "beforeMount");
    const Ae = Fc(B, he);
    Ae && he.beforeEnter(J), l(J, k, A), ((V = ge && ge.onVnodeMounted) || Ae || ve) && rt(() => {
      V && $t(V, L, _), Ae && he.enter(J), ve && Xt(_, null, L, "mounted");
    }, B);
  }, b = (_, k, A, L, B) => {
    if (A && v(_, A), L)
      for (let U = 0; U < L.length; U++)
        v(_, L[U]);
    if (B) {
      let U = B.subTree;
      if (k === U || Ao(U.type) && (U.ssContent === k || U.ssFallback === k)) {
        const te = B.vnode;
        b(
          _,
          te,
          te.scopeId,
          te.slotScopeIds,
          B.parent
        );
      }
    }
  }, S = (_, k, A, L, B, U, te, X, J = 0) => {
    for (let V = J; V < _.length; V++) {
      const ge = _[V] = X ? Ot(_[V]) : At(_[V]);
      P(
        null,
        ge,
        k,
        A,
        L,
        B,
        U,
        te,
        X
      );
    }
  }, E = (_, k, A, L, B, U, te) => {
    const X = k.el = _.el;
    let { patchFlag: J, dynamicChildren: V, dirs: ge } = k;
    J |= _.patchFlag & 16;
    const ie = _.props || Ne, he = k.props || Ne;
    let ve;
    if (A && en(A, !1), (ve = he.onVnodeBeforeUpdate) && $t(ve, A, k, _), ge && Xt(k, _, A, "beforeUpdate"), A && en(A, !0), (ie.innerHTML && he.innerHTML == null || ie.textContent && he.textContent == null) && h(X, ""), V ? z(
      _.dynamicChildren,
      V,
      X,
      A,
      L,
      js(k, B),
      U
    ) : te || _e(
      _,
      k,
      X,
      null,
      A,
      L,
      js(k, B),
      U,
      !1
    ), J > 0) {
      if (J & 16)
        j(X, ie, he, A, B);
      else if (J & 2 && ie.class !== he.class && r(X, "class", null, he.class, B), J & 4 && r(X, "style", ie.style, he.style, B), J & 8) {
        const Ae = k.dynamicProps;
        for (let Le = 0; Le < Ae.length; Le++) {
          const M = Ae[Le], re = ie[M], se = he[M];
          (se !== re || M === "value") && r(X, M, re, se, B, A);
        }
      }
      J & 1 && _.children !== k.children && h(X, k.children);
    } else !te && V == null && j(X, ie, he, A, B);
    ((ve = he.onVnodeUpdated) || ge) && rt(() => {
      ve && $t(ve, A, k, _), ge && Xt(k, _, A, "updated");
    }, L);
  }, z = (_, k, A, L, B, U, te) => {
    for (let X = 0; X < k.length; X++) {
      const J = _[X], V = k[X], ge = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        J.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (J.type === W || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Sn(J, V) || // - In the case of a component, it could contain anything.
        J.shapeFlag & 198) ? p(J.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          A
        )
      );
      P(
        J,
        V,
        ge,
        null,
        L,
        B,
        U,
        te,
        !0
      );
    }
  }, j = (_, k, A, L, B) => {
    if (k !== A) {
      if (k !== Ne)
        for (const U in k)
          !xn(U) && !(U in A) && r(
            _,
            U,
            k[U],
            null,
            B,
            L
          );
      for (const U in A) {
        if (xn(U)) continue;
        const te = A[U], X = k[U];
        te !== X && U !== "value" && r(_, U, X, te, B, L);
      }
      "value" in A && r(_, "value", k.value, A.value, B);
    }
  }, me = (_, k, A, L, B, U, te, X, J) => {
    const V = k.el = _ ? _.el : u(""), ge = k.anchor = _ ? _.anchor : u("");
    let { patchFlag: ie, dynamicChildren: he, slotScopeIds: ve } = k;
    ve && (X = X ? X.concat(ve) : ve), _ == null ? (l(V, A, L), l(ge, A, L), S(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      k.children || [],
      A,
      ge,
      B,
      U,
      te,
      X,
      J
    )) : ie > 0 && ie & 64 && he && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    _.dynamicChildren && _.dynamicChildren.length === he.length ? (z(
      _.dynamicChildren,
      he,
      A,
      B,
      U,
      te,
      X
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (k.key != null || B && k === B.subTree) && $o(
      _,
      k,
      !0
      /* shallow */
    )) : _e(
      _,
      k,
      A,
      ge,
      B,
      U,
      te,
      X,
      J
    );
  }, Ce = (_, k, A, L, B, U, te, X, J) => {
    k.slotScopeIds = X, _ == null ? k.shapeFlag & 512 ? B.ctx.activate(
      k,
      A,
      L,
      te,
      J
    ) : Oe(
      k,
      A,
      L,
      B,
      U,
      te,
      J
    ) : Ge(_, k, J);
  }, Oe = (_, k, A, L, B, U, te) => {
    const X = _.component = qc(
      _,
      L,
      B
    );
    if (lo(_) && (X.ctx.renderer = G), Jc(X, !1, te), X.asyncDep) {
      if (B && B.registerDep(X, ue, te), !_.el) {
        const J = X.subTree = K(zt);
        x(null, J, k, A), _.placeholder = J.el;
      }
    } else
      ue(
        X,
        _,
        k,
        A,
        B,
        U,
        te
      );
  }, Ge = (_, k, A) => {
    const L = k.component = _.component;
    if (xc(_, k, A))
      if (L.asyncDep && !L.asyncResolved) {
        fe(L, k, A);
        return;
      } else
        L.next = k, L.update();
    else
      k.el = _.el, L.vnode = k;
  }, ue = (_, k, A, L, B, U, te) => {
    const X = () => {
      if (_.isMounted) {
        let { next: ie, bu: he, u: ve, parent: Ae, vnode: Le } = _;
        {
          const He = Co(_);
          if (He) {
            ie && (ie.el = Le.el, fe(_, ie, te)), He.asyncDep.then(() => {
              rt(() => {
                _.isUnmounted || V();
              }, B);
            });
            return;
          }
        }
        let M = ie, re;
        en(_, !1), ie ? (ie.el = Le.el, fe(_, ie, te)) : ie = Le, he && ls(he), (re = ie.props && ie.props.onVnodeBeforeUpdate) && $t(re, Ae, ie, Le), en(_, !0);
        const se = pa(_), Se = _.subTree;
        _.subTree = se, P(
          Se,
          se,
          // parent may have changed if it's in a teleport
          p(Se.el),
          // anchor may have changed if it's in a fragment
          I(Se),
          _,
          B,
          U
        ), ie.el = se.el, M === null && Pc(_, se.el), ve && rt(ve, B), (re = ie.props && ie.props.onVnodeUpdated) && rt(
          () => $t(re, Ae, ie, Le),
          B
        );
      } else {
        let ie;
        const { el: he, props: ve } = k, { bm: Ae, m: Le, parent: M, root: re, type: se } = _, Se = gn(k);
        en(_, !1), Ae && ls(Ae), !Se && (ie = ve && ve.onVnodeBeforeMount) && $t(ie, M, k), en(_, !0);
        {
          re.ce && re.ce._hasShadowRoot() && re.ce._injectChildStyle(
            se,
            _.parent ? _.parent.type : void 0
          );
          const He = _.subTree = pa(_);
          P(
            null,
            He,
            A,
            L,
            _,
            B,
            U
          ), k.el = He.el;
        }
        if (Le && rt(Le, B), !Se && (ie = ve && ve.onVnodeMounted)) {
          const He = k;
          rt(
            () => $t(ie, M, He),
            B
          );
        }
        (k.shapeFlag & 256 || M && gn(M.vnode) && M.vnode.shapeFlag & 256) && _.a && rt(_.a, B), _.isMounted = !0, k = A = L = null;
      }
    };
    _.scope.on();
    const J = _.effect = new Mi(X);
    _.scope.off();
    const V = _.update = J.run.bind(J), ge = _.job = J.runIfDirty.bind(J);
    ge.i = _, ge.id = _.uid, J.scheduler = () => Il(ge), en(_, !0), V();
  }, fe = (_, k, A) => {
    k.component = _;
    const L = _.vnode.props;
    _.vnode = k, _.next = null, Dc(_, k.props, L, A), Lc(_, k.children, A), Bt(), aa(_), Vt();
  }, _e = (_, k, A, L, B, U, te, X, J = !1) => {
    const V = _ && _.children, ge = _ ? _.shapeFlag : 0, ie = k.children, { patchFlag: he, shapeFlag: ve } = k;
    if (he > 0) {
      if (he & 128) {
        Je(
          V,
          ie,
          A,
          L,
          B,
          U,
          te,
          X,
          J
        );
        return;
      } else if (he & 256) {
        Ve(
          V,
          ie,
          A,
          L,
          B,
          U,
          te,
          X,
          J
        );
        return;
      }
    }
    ve & 8 ? (ge & 16 && je(V, B, U), ie !== V && h(A, ie)) : ge & 16 ? ve & 16 ? Je(
      V,
      ie,
      A,
      L,
      B,
      U,
      te,
      X,
      J
    ) : je(V, B, U, !0) : (ge & 8 && h(A, ""), ve & 16 && S(
      ie,
      A,
      L,
      B,
      U,
      te,
      X,
      J
    ));
  }, Ve = (_, k, A, L, B, U, te, X, J) => {
    _ = _ || fn, k = k || fn;
    const V = _.length, ge = k.length, ie = Math.min(V, ge);
    let he;
    for (he = 0; he < ie; he++) {
      const ve = k[he] = J ? Ot(k[he]) : At(k[he]);
      P(
        _[he],
        ve,
        A,
        null,
        B,
        U,
        te,
        X,
        J
      );
    }
    V > ge ? je(
      _,
      B,
      U,
      !0,
      !1,
      ie
    ) : S(
      k,
      A,
      L,
      B,
      U,
      te,
      X,
      J,
      ie
    );
  }, Je = (_, k, A, L, B, U, te, X, J) => {
    let V = 0;
    const ge = k.length;
    let ie = _.length - 1, he = ge - 1;
    for (; V <= ie && V <= he; ) {
      const ve = _[V], Ae = k[V] = J ? Ot(k[V]) : At(k[V]);
      if (Sn(ve, Ae))
        P(
          ve,
          Ae,
          A,
          null,
          B,
          U,
          te,
          X,
          J
        );
      else
        break;
      V++;
    }
    for (; V <= ie && V <= he; ) {
      const ve = _[ie], Ae = k[he] = J ? Ot(k[he]) : At(k[he]);
      if (Sn(ve, Ae))
        P(
          ve,
          Ae,
          A,
          null,
          B,
          U,
          te,
          X,
          J
        );
      else
        break;
      ie--, he--;
    }
    if (V > ie) {
      if (V <= he) {
        const ve = he + 1, Ae = ve < ge ? k[ve].el : L;
        for (; V <= he; )
          P(
            null,
            k[V] = J ? Ot(k[V]) : At(k[V]),
            A,
            Ae,
            B,
            U,
            te,
            X,
            J
          ), V++;
      }
    } else if (V > he)
      for (; V <= ie; )
        q(_[V], B, U, !0), V++;
    else {
      const ve = V, Ae = V, Le = /* @__PURE__ */ new Map();
      for (V = Ae; V <= he; V++) {
        const ut = k[V] = J ? Ot(k[V]) : At(k[V]);
        ut.key != null && Le.set(ut.key, V);
      }
      let M, re = 0;
      const se = he - Ae + 1;
      let Se = !1, He = 0;
      const $n = new Array(se);
      for (V = 0; V < se; V++) $n[V] = 0;
      for (V = ve; V <= ie; V++) {
        const ut = _[V];
        if (re >= se) {
          q(ut, B, U, !0);
          continue;
        }
        let kt;
        if (ut.key != null)
          kt = Le.get(ut.key);
        else
          for (M = Ae; M <= he; M++)
            if ($n[M - Ae] === 0 && Sn(ut, k[M])) {
              kt = M;
              break;
            }
        kt === void 0 ? q(ut, B, U, !0) : ($n[kt - Ae] = V + 1, kt >= He ? He = kt : Se = !0, P(
          ut,
          k[kt],
          A,
          null,
          B,
          U,
          te,
          X,
          J
        ), re++);
      }
      const Zl = Se ? Gc($n) : fn;
      for (M = Zl.length - 1, V = se - 1; V >= 0; V--) {
        const ut = Ae + V, kt = k[ut], Xl = k[ut + 1], ea = ut + 1 < ge ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Xl.el || So(Xl)
        ) : L;
        $n[V] === 0 ? P(
          null,
          kt,
          A,
          ea,
          B,
          U,
          te,
          X,
          J
        ) : Se && (M < 0 || V !== Zl[M] ? H(kt, A, ea, 2) : M--);
      }
    }
  }, H = (_, k, A, L, B = null) => {
    const { el: U, type: te, transition: X, children: J, shapeFlag: V } = _;
    if (V & 6) {
      H(_.component.subTree, k, A, L);
      return;
    }
    if (V & 128) {
      _.suspense.move(k, A, L);
      return;
    }
    if (V & 64) {
      te.move(_, k, A, G);
      return;
    }
    if (te === W) {
      l(U, k, A);
      for (let ie = 0; ie < J.length; ie++)
        H(J[ie], k, A, L);
      l(_.anchor, k, A);
      return;
    }
    if (te === zs) {
      T(_, k, A);
      return;
    }
    if (L !== 2 && V & 1 && X)
      if (L === 0)
        X.beforeEnter(U), l(U, k, A), rt(() => X.enter(U), B);
      else {
        const { leave: ie, delayLeave: he, afterLeave: ve } = X, Ae = () => {
          _.ctx.isUnmounted ? i(U) : l(U, k, A);
        }, Le = () => {
          U._isLeaving && U[sc](
            !0
            /* cancelled */
          ), ie(U, () => {
            Ae(), ve && ve();
          });
        };
        he ? he(U, Ae, Le) : Le();
      }
    else
      l(U, k, A);
  }, q = (_, k, A, L = !1, B = !1) => {
    const {
      type: U,
      props: te,
      ref: X,
      children: J,
      dynamicChildren: V,
      shapeFlag: ge,
      patchFlag: ie,
      dirs: he,
      cacheIndex: ve
    } = _;
    if (ie === -2 && (B = !1), X != null && (Bt(), Dn(X, null, A, _, !0), Vt()), ve != null && (k.renderCache[ve] = void 0), ge & 256) {
      k.ctx.deactivate(_);
      return;
    }
    const Ae = ge & 1 && he, Le = !gn(_);
    let M;
    if (Le && (M = te && te.onVnodeBeforeUnmount) && $t(M, k, _), ge & 6)
      ze(_.component, A, L);
    else {
      if (ge & 128) {
        _.suspense.unmount(A, L);
        return;
      }
      Ae && Xt(_, null, k, "beforeUnmount"), ge & 64 ? _.type.remove(
        _,
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
      (U !== W || ie > 0 && ie & 64) ? je(
        V,
        k,
        A,
        !1,
        !0
      ) : (U === W && ie & 384 || !B && ge & 16) && je(J, k, A), L && Y(_);
    }
    (Le && (M = te && te.onVnodeUnmounted) || Ae) && rt(() => {
      M && $t(M, k, _), Ae && Xt(_, null, k, "unmounted");
    }, A);
  }, Y = (_) => {
    const { type: k, el: A, anchor: L, transition: B } = _;
    if (k === W) {
      $e(A, L);
      return;
    }
    if (k === zs) {
      N(_);
      return;
    }
    const U = () => {
      i(A), B && !B.persisted && B.afterLeave && B.afterLeave();
    };
    if (_.shapeFlag & 1 && B && !B.persisted) {
      const { leave: te, delayLeave: X } = B, J = () => te(A, U);
      X ? X(_.el, U, J) : J();
    } else
      U();
  }, $e = (_, k) => {
    let A;
    for (; _ !== k; )
      A = y(_), i(_), _ = A;
    i(k);
  }, ze = (_, k, A) => {
    const { bum: L, scope: B, job: U, subTree: te, um: X, m: J, a: V } = _;
    ba(J), ba(V), L && ls(L), B.stop(), U && (U.flags |= 8, q(te, _, k, A)), X && rt(X, k), rt(() => {
      _.isUnmounted = !0;
    }, k);
  }, je = (_, k, A, L = !1, B = !1, U = 0) => {
    for (let te = U; te < _.length; te++)
      q(_[te], k, A, L, B);
  }, I = (_) => {
    if (_.shapeFlag & 6)
      return I(_.component.subTree);
    if (_.shapeFlag & 128)
      return _.suspense.next();
    const k = y(_.anchor || _.el), A = k && k[tc];
    return A ? y(A) : k;
  };
  let ne = !1;
  const w = (_, k, A) => {
    let L;
    _ == null ? k._vnode && (q(k._vnode, null, null, !0), L = k._vnode.component) : P(
      k._vnode || null,
      _,
      k,
      null,
      null,
      null,
      A
    ), k._vnode = _, ne || (ne = !0, aa(L), Zi(), ne = !1);
  }, G = {
    p: P,
    um: q,
    m: H,
    r: Y,
    mt: Oe,
    mc: S,
    pc: _e,
    pbc: z,
    n: I,
    o: e
  };
  return {
    render: w,
    hydrate: void 0,
    createApp: $c(w)
  };
}
function js({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function en({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Fc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function $o(e, t, n = !1) {
  const l = e.children, i = t.children;
  if (be(l) && be(i))
    for (let r = 0; r < l.length; r++) {
      const c = l[r];
      let u = i[r];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = i[r] = Ot(i[r]), u.el = c.el), !n && u.patchFlag !== -2 && $o(c, u)), u.type === xs && (u.patchFlag === -1 && (u = i[r] = Ot(u)), u.el = c.el), u.type === zt && !u.el && (u.el = c.el);
    }
}
function Gc(e) {
  const t = e.slice(), n = [0];
  let l, i, r, c, u;
  const d = e.length;
  for (l = 0; l < d; l++) {
    const f = e[l];
    if (f !== 0) {
      if (i = n[n.length - 1], e[i] < f) {
        t[l] = i, n.push(l);
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
function Co(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Co(t);
}
function ba(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function So(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? So(t.subTree) : null;
}
const Ao = (e) => e.__isSuspense;
function Bc(e, t) {
  t && t.pendingBranch ? be(e) ? t.effects.push(...e) : t.effects.push(e) : Qr(e);
}
const W = /* @__PURE__ */ Symbol.for("v-fgt"), xs = /* @__PURE__ */ Symbol.for("v-txt"), zt = /* @__PURE__ */ Symbol.for("v-cmt"), zs = /* @__PURE__ */ Symbol.for("v-stc"), In = [];
let dt = null;
function g(e = !1) {
  In.push(dt = e ? null : []);
}
function Vc() {
  In.pop(), dt = In[In.length - 1] || null;
}
let Vn = 1;
function ps(e, t = !1) {
  Vn += e, e < 0 && dt && t && (dt.hasOnce = !0);
}
function Ro(e) {
  return e.dynamicChildren = Vn > 0 ? dt || fn : null, Vc(), Vn > 0 && dt && dt.push(e), e;
}
function m(e, t, n, l, i, r) {
  return Ro(
    a(
      e,
      t,
      n,
      l,
      i,
      r,
      !0
    )
  );
}
function Ue(e, t, n, l, i) {
  return Ro(
    K(
      e,
      t,
      n,
      l,
      i,
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
const To = ({ key: e }) => e ?? null, is = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ke(e) || /* @__PURE__ */ Be(e) || ye(e) ? { i: Ye, r: e, k: t, f: !!n } : e : null);
function a(e, t = null, n = null, l = 0, i = null, r = e === W ? 0 : 1, c = !1, u = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && To(t),
    ref: t && is(t),
    scopeId: eo,
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
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ye
  };
  return u ? (Gl(d, n), r & 128 && e.normalize(d)) : n && (d.shapeFlag |= Ke(n) ? 8 : 16), Vn > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  dt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && dt.push(d), d;
}
const K = jc;
function jc(e, t = null, n = null, l = 0, i = null, r = !1) {
  if ((!e || e === pc) && (e = zt), jn(e)) {
    const u = bn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Gl(u, n), Vn > 0 && !r && dt && (u.shapeFlag & 6 ? dt[dt.indexOf(e)] = u : dt.push(u)), u.patchFlag = -2, u;
  }
  if (eu(e) && (e = e.__vccOpts), t) {
    t = zc(t);
    let { class: u, style: d } = t;
    u && !Ke(u) && (t.class = oe(u)), Me(d) && (/* @__PURE__ */ Cs(d) && !be(d) && (d = Ze({}, d)), t.style = Nn(d));
  }
  const c = Ke(e) ? 1 : Ao(e) ? 128 : nc(e) ? 64 : Me(e) ? 4 : ye(e) ? 2 : 0;
  return a(
    e,
    t,
    n,
    l,
    i,
    c,
    r,
    !0
  );
}
function zc(e) {
  return e ? /* @__PURE__ */ Cs(e) || bo(e) ? Ze({}, e) : e : null;
}
function bn(e, t, n = !1, l = !1) {
  const { props: i, ref: r, patchFlag: c, children: u, transition: d } = e, f = t ? Wc(i || {}, t) : i, h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && To(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? be(r) ? r.concat(is(t)) : [r, is(t)] : is(t)
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
    patchFlag: t && e.type !== W ? c === -1 ? 16 : c | 16 : c,
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
  return d && l && Ol(
    h,
    d.clone(h)
  ), h;
}
function ft(e = " ", t = 0) {
  return K(xs, null, e, t);
}
function Q(e = "", t = !1) {
  return t ? (g(), Ue(zt, null, e)) : K(zt, null, e);
}
function At(e) {
  return e == null || typeof e == "boolean" ? K(zt) : be(e) ? K(
    W,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : jn(e) ? Ot(e) : K(xs, null, String(e));
}
function Ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bn(e);
}
function Gl(e, t) {
  let n = 0;
  const { shapeFlag: l } = e;
  if (t == null)
    t = null;
  else if (be(t))
    n = 16;
  else if (typeof t == "object")
    if (l & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Gl(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !bo(t) ? t._ctx = Ye : i === 3 && Ye && (Ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ye(t) ? (t = { default: t, _ctx: Ye }, n = 32) : (t = String(t), l & 64 ? (n = 16, t = [ft(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Wc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const l = e[n];
    for (const i in l)
      if (i === "class")
        t.class !== l.class && (t.class = oe([t.class, l.class]));
      else if (i === "style")
        t.style = Nn([t.style, l.style]);
      else if (bs(i)) {
        const r = t[i], c = l[i];
        c && r !== c && !(be(r) && r.includes(c)) && (t[i] = r ? [].concat(r, c) : c);
      } else i !== "" && (t[i] = l[i]);
  }
  return t;
}
function $t(e, t, n, l = null) {
  Et(e, t, 7, [
    n,
    l
  ]);
}
const Hc = fo();
let Kc = 0;
function qc(e, t, n) {
  const l = e.type, i = (t ? t.appContext : e.appContext) || Hc, r = {
    uid: Kc++,
    vnode: e,
    type: l,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Pi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: yo(l, i),
    emitsOptions: ho(l, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ne,
    // inheritAttrs
    inheritAttrs: l.inheritAttrs,
    // state
    ctx: Ne,
    data: Ne,
    props: Ne,
    attrs: Ne,
    slots: Ne,
    refs: Ne,
    setupState: Ne,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Sc.bind(null, r), e.ce && e.ce(r), r;
}
let tt = null;
const xo = () => tt || Ye;
let gs, cl;
{
  const e = ks(), t = (n, l) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(l), (r) => {
      i.length > 1 ? i.forEach((c) => c(r)) : i[0](r);
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
}, va = () => {
  tt && tt.scope.off(), gs(null);
};
function Po(e) {
  return e.vnode.shapeFlag & 4;
}
let zn = !1;
function Jc(e, t = !1, n = !1) {
  t && cl(t);
  const { props: l, children: i } = e.vnode, r = Po(e);
  Ec(e, l, r, t), Oc(e, i, n || t);
  const c = r ? Qc(e, t) : void 0;
  return t && cl(!1), c;
}
function Qc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, mc);
  const { setup: l } = n;
  if (l) {
    Bt();
    const i = e.setupContext = l.length > 1 ? Zc(e) : null, r = qn(e), c = Kn(
      l,
      e,
      0,
      [
        e.props,
        i
      ]
    ), u = $i(c);
    if (Vt(), r(), (u || e.sp) && !gn(e) && so(e), u) {
      if (c.then(va, va), t)
        return c.then((d) => {
          ya(e, d);
        }).catch((d) => {
          Ss(d, e, 0);
        });
      e.asyncDep = c;
    } else
      ya(e, c);
  } else
    Eo(e);
}
function ya(e, t, n) {
  ye(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Me(t) && (e.setupState = Ml(t)), Eo(e);
}
function Eo(e, t, n) {
  const l = e.type;
  e.render || (e.render = l.render || xt);
  {
    const i = qn(e);
    Bt();
    try {
      bc(e);
    } finally {
      Vt(), i();
    }
  }
}
const Yc = {
  get(e, t) {
    return et(e, "get", ""), e[t];
  }
};
function Zc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Yc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ps(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ml(Dl(e.exposed)), {
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
function Xc(e, t = !0) {
  return ye(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function eu(e) {
  return ye(e) && "__vccOpts" in e;
}
const D = (e, t) => /* @__PURE__ */ Wr(e, t, zn);
function Do(e, t, n) {
  try {
    ps(-1);
    const l = arguments.length;
    return l === 2 ? Me(t) && !be(t) ? jn(t) ? K(e, null, [t]) : K(e, t) : K(e, null, t) : (l > 3 ? n = Array.prototype.slice.call(arguments, 2) : l === 3 && jn(n) && (n = [n]), K(e, t, n));
  } finally {
    ps(1);
  }
}
const tu = "3.5.30";
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ul;
const _a = typeof window < "u" && window.trustedTypes;
if (_a)
  try {
    ul = /* @__PURE__ */ _a.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Mo = ul ? (e) => ul.createHTML(e) : (e) => e, nu = "http://www.w3.org/2000/svg", su = "http://www.w3.org/1998/Math/MathML", It = typeof document < "u" ? document : null, wa = It && /* @__PURE__ */ It.createElement("template"), lu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, l) => {
    const i = t === "svg" ? It.createElementNS(nu, e) : t === "mathml" ? It.createElementNS(su, e) : n ? It.createElement(e, { is: n }) : It.createElement(e);
    return e === "select" && l && l.multiple != null && i.setAttribute("multiple", l.multiple), i;
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
  insertStaticContent(e, t, n, l, i, r) {
    const c = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      wa.innerHTML = Mo(
        l === "svg" ? `<svg>${e}</svg>` : l === "mathml" ? `<math>${e}</math>` : e
      );
      const u = wa.content;
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
}, au = /* @__PURE__ */ Symbol("_vtc");
function iu(e, t, n) {
  const l = e[au];
  l && (t = (t ? [t, ...l] : [...l]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ka = /* @__PURE__ */ Symbol("_vod"), ou = /* @__PURE__ */ Symbol("_vsh"), ru = /* @__PURE__ */ Symbol(""), cu = /(?:^|;)\s*display\s*:/;
function uu(e, t, n) {
  const l = e.style, i = Ke(n);
  let r = !1;
  if (n && !i) {
    if (t)
      if (Ke(t))
        for (const c of t.split(";")) {
          const u = c.slice(0, c.indexOf(":")).trim();
          n[u] == null && os(l, u, "");
        }
      else
        for (const c in t)
          n[c] == null && os(l, c, "");
    for (const c in n)
      c === "display" && (r = !0), os(l, c, n[c]);
  } else if (i) {
    if (t !== n) {
      const c = l[ru];
      c && (n += ";" + c), l.cssText = n, r = cu.test(n);
    }
  } else t && e.removeAttribute("style");
  ka in e && (e[ka] = r ? l.display : "", e[ou] && (l.display = "none"));
}
const $a = /\s*!important$/;
function os(e, t, n) {
  if (be(n))
    n.forEach((l) => os(e, t, l));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const l = du(e, t);
    $a.test(n) ? e.setProperty(
      Zt(l),
      n.replace($a, ""),
      "important"
    ) : e[l] = n;
  }
}
const Ca = ["Webkit", "Moz", "ms"], Ws = {};
function du(e, t) {
  const n = Ws[t];
  if (n)
    return n;
  let l = it(t);
  if (l !== "filter" && l in e)
    return Ws[t] = l;
  l = _s(l);
  for (let i = 0; i < Ca.length; i++) {
    const r = Ca[i] + l;
    if (r in e)
      return Ws[t] = r;
  }
  return t;
}
const Sa = "http://www.w3.org/1999/xlink";
function Aa(e, t, n, l, i, r = gr(t)) {
  l && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Sa, t.slice(6, t.length)) : e.setAttributeNS(Sa, t, n) : n == null || r && !Ri(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : yt(n) ? String(n) : n
  );
}
function Ra(e, t, n, l, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Mo(n) : n);
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
    u === "boolean" ? n = Ri(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(i || t);
}
function Ft(e, t, n, l) {
  e.addEventListener(t, n, l);
}
function fu(e, t, n, l) {
  e.removeEventListener(t, n, l);
}
const Ta = /* @__PURE__ */ Symbol("_vei");
function hu(e, t, n, l, i = null) {
  const r = e[Ta] || (e[Ta] = {}), c = r[t];
  if (l && c)
    c.value = l;
  else {
    const [u, d] = pu(t);
    if (l) {
      const f = r[t] = bu(
        l,
        i
      );
      Ft(e, u, f, d);
    } else c && (fu(e, u, c, d), r[t] = void 0);
  }
}
const xa = /(?:Once|Passive|Capture)$/;
function pu(e) {
  let t;
  if (xa.test(e)) {
    t = {};
    let l;
    for (; l = e.match(xa); )
      e = e.slice(0, e.length - l[0].length), t[l[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Zt(e.slice(2)), t];
}
let Hs = 0;
const gu = /* @__PURE__ */ Promise.resolve(), mu = () => Hs || (gu.then(() => Hs = 0), Hs = Date.now());
function bu(e, t) {
  const n = (l) => {
    if (!l._vts)
      l._vts = Date.now();
    else if (l._vts <= n.attached)
      return;
    Et(
      vu(l, n.value),
      t,
      5,
      [l]
    );
  };
  return n.value = e, n.attached = mu(), n;
}
function vu(e, t) {
  if (be(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (l) => (i) => !i._stopped && l && l(i)
    );
  } else
    return t;
}
const Pa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, yu = (e, t, n, l, i, r) => {
  const c = i === "svg";
  t === "class" ? iu(e, l, c) : t === "style" ? uu(e, n, l) : bs(t) ? $l(t) || hu(e, t, n, l, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _u(e, t, l, c)) ? (Ra(e, t, l), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Aa(e, t, l, c, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (wu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ke(l))) ? Ra(e, it(t), l, r, t) : (t === "true-value" ? e._trueValue = l : t === "false-value" && (e._falseValue = l), Aa(e, t, l, c));
};
function _u(e, t, n, l) {
  if (l)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Pa(t) && ye(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Pa(t) && Ke(n) ? !1 : t in e;
}
function wu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const l = it(t);
  return Array.isArray(n) ? n.some((i) => it(i) === l) : Object.keys(n).some((i) => it(i) === l);
}
const Yt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return be(t) ? (n) => ls(t, n) : t;
};
function ku(e) {
  e.target.composing = !0;
}
function Ea(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const bt = /* @__PURE__ */ Symbol("_assign");
function Da(e, t, n) {
  return t && (e = e.trim()), n && (e = ws(e)), e;
}
const Re = {
  created(e, { modifiers: { lazy: t, trim: n, number: l } }, i) {
    e[bt] = Yt(i);
    const r = l || i.props && i.props.type === "number";
    Ft(e, t ? "change" : "input", (c) => {
      c.target.composing || e[bt](Da(e.value, n, r));
    }), (n || r) && Ft(e, "change", () => {
      e.value = Da(e.value, n, r);
    }), t || (Ft(e, "compositionstart", ku), Ft(e, "compositionend", Ea), Ft(e, "change", Ea));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: l, trim: i, number: r } }, c) {
    if (e[bt] = Yt(c), e.composing) return;
    const u = (r || e.type === "number") && !/^0\d/.test(e.value) ? ws(e.value) : e.value, d = t ?? "";
    u !== d && (document.activeElement === e && e.type !== "range" && (l && t === n || i && e.value.trim() === d) || (e.value = d));
  }
}, Gt = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[bt] = Yt(n), Ft(e, "change", () => {
      const l = e._modelValue, i = vn(e), r = e.checked, c = e[bt];
      if (be(l)) {
        const u = Sl(l, i), d = u !== -1;
        if (r && !d)
          c(l.concat(i));
        else if (!r && d) {
          const f = [...l];
          f.splice(u, 1), c(f);
        }
      } else if (wn(l)) {
        const u = new Set(l);
        r ? u.add(i) : u.delete(i), c(u);
      } else
        c(Io(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Ma,
  beforeUpdate(e, t, n) {
    e[bt] = Yt(n), Ma(e, t, n);
  }
};
function Ma(e, { value: t, oldValue: n }, l) {
  e._modelValue = t;
  let i;
  if (be(t))
    i = Sl(t, l.props.value) > -1;
  else if (wn(t))
    i = t.has(l.props.value);
  else {
    if (t === n) return;
    i = Qt(t, Io(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const $u = {
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
    const i = wn(t);
    Ft(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? ws(vn(c)) : vn(c)
      );
      e[bt](
        e.multiple ? i ? new Set(r) : r : r[0]
      ), e._assigning = !0, As(() => {
        e._assigning = !1;
      });
    }), e[bt] = Yt(l);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Ia(e, t);
  },
  beforeUpdate(e, t, n) {
    e[bt] = Yt(n);
  },
  updated(e, { value: t }) {
    e._assigning || Ia(e, t);
  }
};
function Ia(e, t) {
  const n = e.multiple, l = be(t);
  if (!(n && !l && !wn(t))) {
    for (let i = 0, r = e.options.length; i < r; i++) {
      const c = e.options[i], u = vn(c);
      if (n)
        if (l) {
          const d = typeof u;
          d === "string" || d === "number" ? c.selected = t.some((f) => String(f) === String(u)) : c.selected = Sl(t, u) > -1;
        } else
          c.selected = t.has(u);
      else if (Qt(vn(c), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function vn(e) {
  return "_value" in e ? e._value : e.value;
}
function Io(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Cu = {
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
function Su(e, t) {
  switch (e) {
    case "SELECT":
      return mt;
    case "TEXTAREA":
      return Re;
    default:
      switch (t) {
        case "checkbox":
          return Gt;
        case "radio":
          return $u;
        default:
          return Re;
      }
  }
}
function ts(e, t, n, l, i) {
  const c = Su(
    e.tagName,
    n.props && n.props.type
  )[i];
  c && c(e, t, n, l);
}
const Au = ["ctrl", "shift", "alt", "meta"], Ru = {
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
  exact: (e, t) => Au.some((n) => e[`${n}Key`] && !t.includes(n))
}, kn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), l = t.join(".");
  return n[l] || (n[l] = (i, ...r) => {
    for (let c = 0; c < t.length; c++) {
      const u = Ru[t[c]];
      if (u && u(i, t)) return;
    }
    return e(i, ...r);
  });
}, Tu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, xu = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), l = t.join(".");
  return n[l] || (n[l] = (i) => {
    if (!("key" in i))
      return;
    const r = Zt(i.key);
    if (t.some(
      (c) => c === r || Tu[c] === r
    ))
      return e(i);
  });
}, Pu = /* @__PURE__ */ Ze({ patchProp: yu }, lu);
let Oa;
function Eu() {
  return Oa || (Oa = Uc(Pu));
}
const Du = (...e) => {
  const t = Eu().createApp(...e), { mount: n } = t;
  return t.mount = (l) => {
    const i = Iu(l);
    if (!i) return;
    const r = t._component;
    !ye(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const c = n(i, !1, Mu(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), c;
  }, t;
};
function Mu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Iu(e) {
  return Ke(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Oo;
const Es = (e) => Oo = e, Lo = (
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
function Ou() {
  const e = Ei(!0), t = e.run(() => /* @__PURE__ */ F({}));
  let n = [], l = [];
  const i = Dl({
    install(r) {
      Es(i), i._a = r, r.provide(Lo, i), r.config.globalProperties.$pinia = i, l.forEach((c) => n.push(c)), l = [];
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
  return i;
}
const Uo = () => {
};
function La(e, t, n, l = Uo) {
  e.push(t);
  const i = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), l());
  };
  return !n && Di() && br(i), i;
}
function rn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Lu = (e) => e(), Ua = Symbol(), Ks = Symbol();
function fl(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, l) => e.set(l, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const l = t[n], i = e[n];
    dl(i) && dl(l) && e.hasOwnProperty(n) && !/* @__PURE__ */ Be(l) && !/* @__PURE__ */ Pt(l) ? e[n] = fl(i, l) : e[n] = l;
  }
  return e;
}
const Uu = (
  /* istanbul ignore next */
  Symbol()
);
function Nu(e) {
  return !dl(e) || !e.hasOwnProperty(Uu);
}
const { assign: Kt } = Object;
function Fu(e) {
  return !!(/* @__PURE__ */ Be(e) && e.effect);
}
function Gu(e, t, n, l) {
  const { state: i, actions: r, getters: c } = t, u = n.state.value[e];
  let d;
  function f() {
    u || (n.state.value[e] = i ? i() : {});
    const h = /* @__PURE__ */ Gr(n.state.value[e]);
    return Kt(h, r, Object.keys(c || {}).reduce((p, y) => (p[y] = Dl(D(() => {
      Es(n);
      const v = n._s.get(e);
      return c[y].call(v, v);
    })), p), {}));
  }
  return d = No(e, f, t, n, l, !0), d;
}
function No(e, t, n = {}, l, i, r) {
  let c;
  const u = Kt({ actions: {} }, n), d = { deep: !0 };
  let f, h, p = [], y = [], v;
  const C = l.state.value[e];
  !r && !C && (l.state.value[e] = {});
  let P;
  function R(S) {
    let E;
    f = h = !1, typeof S == "function" ? (S(l.state.value[e]), E = {
      type: On.patchFunction,
      storeId: e,
      events: v
    }) : (fl(l.state.value[e], S), E = {
      type: On.patchObject,
      payload: S,
      storeId: e,
      events: v
    });
    const z = P = Symbol();
    As().then(() => {
      P === z && (f = !0);
    }), h = !0, rn(p, E, l.state.value[e]);
  }
  const x = r ? function() {
    const { state: E } = n, z = E ? E() : {};
    this.$patch((j) => {
      Kt(j, z);
    });
  } : (
    /* istanbul ignore next */
    Uo
  );
  function $() {
    c.stop(), p = [], y = [], l._s.delete(e);
  }
  const T = (S, E = "") => {
    if (Ua in S)
      return S[Ks] = E, S;
    const z = function() {
      Es(l);
      const j = Array.from(arguments), me = [], Ce = [];
      function Oe(fe) {
        me.push(fe);
      }
      function Ge(fe) {
        Ce.push(fe);
      }
      rn(y, {
        args: j,
        name: z[Ks],
        store: O,
        after: Oe,
        onError: Ge
      });
      let ue;
      try {
        ue = S.apply(this && this.$id === e ? this : O, j);
      } catch (fe) {
        throw rn(Ce, fe), fe;
      }
      return ue instanceof Promise ? ue.then((fe) => (rn(me, fe), fe)).catch((fe) => (rn(Ce, fe), Promise.reject(fe))) : (rn(me, ue), ue);
    };
    return z[Ua] = !0, z[Ks] = E, z;
  }, N = {
    _p: l,
    // _s: scope,
    $id: e,
    $onAction: La.bind(null, y),
    $patch: R,
    $reset: x,
    $subscribe(S, E = {}) {
      const z = La(p, S, E.detached, () => j()), j = c.run(() => xe(() => l.state.value[e], (me) => {
        (E.flush === "sync" ? h : f) && S({
          storeId: e,
          type: On.direct,
          events: v
        }, me);
      }, Kt({}, d, E)));
      return z;
    },
    $dispose: $
  }, O = /* @__PURE__ */ ht(N);
  l._s.set(e, O);
  const b = (l._a && l._a.runWithContext || Lu)(() => l._e.run(() => (c = Ei()).run(() => t({ action: T }))));
  for (const S in b) {
    const E = b[S];
    if (/* @__PURE__ */ Be(E) && !Fu(E) || /* @__PURE__ */ Pt(E))
      r || (C && Nu(E) && (/* @__PURE__ */ Be(E) ? E.value = C[S] : fl(E, C[S])), l.state.value[e][S] = E);
    else if (typeof E == "function") {
      const z = T(E, S);
      b[S] = z, u.actions[S] = E;
    }
  }
  return Kt(O, b), Kt(/* @__PURE__ */ Te(O), b), Object.defineProperty(O, "$state", {
    get: () => l.state.value[e],
    set: (S) => {
      R((E) => {
        Kt(E, S);
      });
    }
  }), l._p.forEach((S) => {
    Kt(O, c.run(() => S({
      store: O,
      app: l._a,
      pinia: l,
      options: u
    })));
  }), C && r && n.hydrate && n.hydrate(O.$state, C), f = !0, h = !0, O;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Jn(e, t, n) {
  let l, i;
  const r = typeof t == "function";
  typeof e == "string" ? (l = e, i = r ? n : t) : (i = e, l = e.id);
  function c(u, d) {
    const f = Yr();
    return u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    u || (f ? gt(Lo, null) : null), u && Es(u), u = Oo, u._s.has(l) || (r ? No(l, t, i, u) : Gu(l, i, u)), u._s.get(l);
  }
  return c.$id = l, c;
}
function Fo(e) {
  {
    const t = /* @__PURE__ */ Te(e), n = {};
    for (const l in t) {
      const i = t[l];
      i.effect ? n[l] = // ...
      D({
        get: () => e[l],
        set(r) {
          e[l] = r;
        }
      }) : (/* @__PURE__ */ Be(i) || /* @__PURE__ */ Pt(i)) && (n[l] = // ---
      /* @__PURE__ */ jr(e, l));
    }
    return n;
  }
}
const Bl = "openclaw-guard.auth-token", hl = "openclaw-guard:unauthorized";
function Go() {
  return typeof window > "u" ? null : window.localStorage.getItem(Bl);
}
function Bu(e) {
  typeof window > "u" || window.localStorage.setItem(Bl, e);
}
function Bo() {
  typeof window > "u" || window.localStorage.removeItem(Bl);
}
function Vu() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(hl));
}
function ju(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(hl, e), () => window.removeEventListener(hl, e));
}
const Vl = "openclaw-guard.desktop.api-base-url", pl = "http://127.0.0.1:18088", zu = "https://qingmiao-tech.github.io/openclaw-guard/getting-started";
function jl(e) {
  return /^https?:\/\//i.test(e);
}
function Wu(e) {
  return e.replace(/\/+$/, "");
}
function Hu(e) {
  return jl(e) || typeof window > "u" ? e : new URL(e, window.location.href).toString();
}
function Ku() {
  var t;
  if (typeof window > "u")
    return null;
  const e = (t = window.__TAURI_INTERNALS__) == null ? void 0 : t.invoke;
  return typeof e == "function" ? e : null;
}
function zl() {
  return typeof window > "u" ? { mode: "web" } : window.__OPENCLAW_GUARD_RUNTIME__ || { mode: "web" };
}
function Wl() {
  return zl().mode === "desktop" ? "desktop" : "web";
}
function gl() {
  const e = zl().defaultApiBaseUrl;
  if (!e)
    return pl;
  try {
    return Qn(e);
  } catch {
    return pl;
  }
}
function Na() {
  return zl().docsUrl || zu;
}
function Qn(e) {
  const t = e.trim();
  if (!t)
    return pl;
  const n = jl(t) ? t : `http://${t}`;
  let l;
  try {
    l = new URL(n);
  } catch {
    throw new Error("请输入有效的 http(s) 地址，例如 127.0.0.1:18088。");
  }
  if (l.protocol !== "http:" && l.protocol !== "https:")
    throw new Error("目前只支持 http(s) 地址。");
  return l.hash = "", l.search = "", Wu(l.toString());
}
function Vo() {
  if (typeof window > "u")
    return null;
  const e = window.localStorage.getItem(Vl);
  if (!e)
    return null;
  try {
    return Qn(e);
  } catch {
    return null;
  }
}
function qu(e) {
  typeof window > "u" || window.localStorage.setItem(Vl, Qn(e));
}
function Ju() {
  typeof window > "u" || window.localStorage.removeItem(Vl);
}
function Qu(e) {
  return Qn(
    e || Vo() || gl()
  );
}
function Hl(e, t) {
  if (jl(e))
    return e;
  const n = e.startsWith("/") ? e : `/${e}`;
  if (Wl() !== "desktop" && !t)
    return n;
  const l = Qu(t);
  return new URL(n, `${l}/`).toString();
}
function jo(e, t) {
  return Hl(e, t);
}
async function Yu(e) {
  const t = Hu(e);
  if (Wl() === "desktop") {
    const l = Ku();
    if (l) {
      await l("open_external_url", { url: t });
      return;
    }
  }
  if (typeof window > "u")
    return;
  window.open(t, "_blank", "noopener,noreferrer") || window.location.assign(t);
}
async function Zu(e) {
  if ((e.headers.get("content-type") || "").includes("application/json"))
    try {
      const l = await e.json();
      return l.message || l.error || `Request failed with ${e.status}`;
    } catch {
      return `Request failed with ${e.status}`;
    }
  return await e.text() || `Request failed with ${e.status}`;
}
async function Kl(e, t = {}) {
  const n = new Headers(t.headers);
  n.set("Accept", "application/json");
  let l = !1;
  if (!n.has("Authorization")) {
    const c = Go();
    c && (n.set("Authorization", `Bearer ${c}`), l = !0);
  }
  let i = t.body;
  i && typeof i == "object" && !(i instanceof FormData) && !(i instanceof URLSearchParams) && !(i instanceof Blob) && (n.set("Content-Type", "application/json"), i = JSON.stringify(i));
  const r = await fetch(jo(e), {
    ...t,
    headers: n,
    body: i
  });
  if (!r.ok)
    throw r.status === 401 && l && (Bo(), Vu()), new Error(await Zu(r));
  return r.json();
}
function Pe(e) {
  return Kl(e);
}
function Ie(e, t) {
  return Kl(e, {
    method: "POST",
    body: t
  });
}
function ql(e) {
  return Kl(e, {
    method: "DELETE"
  });
}
async function Xu() {
  return Pe("/api/auth/status");
}
async function ed() {
  return Pe("/api/info");
}
async function td(e) {
  return Ie("/api/auth/login", { password: e });
}
async function nd() {
  return Ie("/api/auth/logout", {});
}
async function sd(e, t) {
  return Ie("/api/auth/change-password", {
    currentPassword: e,
    newPassword: t
  });
}
const Ds = /* @__PURE__ */ Jn("auth", () => {
  const e = /* @__PURE__ */ F(!1), t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!0), l = /* @__PURE__ */ F(!1), i = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F("openclaw-guard auth show-password"), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(!1), f = D(() => e.value && n.value && !u.value);
  function h() {
    Bo(), u.value = !1, d.value = !1;
  }
  async function p() {
    if (!(t.value || e.value)) {
      t.value = !0;
      try {
        const $ = await Xu();
        if (n.value = $.enabled, l.value = $.configured, i.value = $.initialPasswordAvailable, r.value = $.initialPasswordCreatedAt, c.value = $.revealCommand || c.value, !$.enabled) {
          u.value = !0;
          return;
        }
        if (!Go()) {
          h();
          return;
        }
        try {
          await ed(), u.value = !0;
        } catch {
          h();
        }
      } finally {
        e.value = !0, t.value = !1;
      }
    }
  }
  async function y($) {
    const T = await td($);
    return T.token && (Bu(T.token), u.value = !0), T;
  }
  async function v() {
    try {
      await nd();
    } catch {
    } finally {
      h();
    }
  }
  async function C($, T) {
    const N = await sd($, T);
    if (!N.success)
      throw new Error(N.error || "Password update failed");
    return h(), N;
  }
  function P() {
    d.value = !0;
  }
  function R() {
    d.value = !1;
  }
  function x() {
    n.value && h();
  }
  return {
    ready: e,
    bootstrapping: t,
    authEnabled: n,
    configured: l,
    initialPasswordAvailable: i,
    initialPasswordCreatedAt: r,
    revealCommand: c,
    authenticated: u,
    requiresLogin: f,
    changePasswordOpen: d,
    hydrate: p,
    login: y,
    logout: v,
    changePassword: C,
    openChangePassword: P,
    closeChangePassword: R,
    handleUnauthorized: x
  };
});
let ld = 0;
const ot = /* @__PURE__ */ Jn("feedback", () => {
  const e = /* @__PURE__ */ F([]), t = /* @__PURE__ */ F(null);
  let n = null;
  function l(u) {
    const d = {
      id: ++ld,
      title: u.title,
      message: u.message,
      tone: u.tone || "info"
    };
    e.value.push(d);
    const f = typeof u.durationMs == "number" ? u.durationMs : 3600;
    return typeof window < "u" && f > 0 && window.setTimeout(() => i(d.id), f), d.id;
  }
  function i(u) {
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
    dismissToast: i,
    confirm: r,
    resolveConfirm: c
  };
}), Fa = "openclaw-guard.theme", Ga = "openclaw-guard.lang", Ba = "openclaw-guard.developer-mode";
function ad() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const ke = /* @__PURE__ */ Jn("ui", () => {
  const e = /* @__PURE__ */ F("auto"), t = /* @__PURE__ */ F("zh"), n = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F(!1), i = D(() => e.value === "auto" ? ad() : e.value);
  function r() {
    typeof document > "u" || (document.documentElement.dataset.theme = i.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en", document.documentElement.dataset.developerMode = n.value ? "on" : "off");
  }
  function c() {
    if (l.value || typeof window > "u") {
      r();
      return;
    }
    const p = window.localStorage.getItem(Fa), y = window.localStorage.getItem(Ga), v = window.localStorage.getItem(Ba);
    (p === "auto" || p === "light" || p === "dark") && (e.value = p), (y === "zh" || y === "en") && (t.value = y), n.value = v === "1", l.value = !0, r();
  }
  function u(p) {
    e.value = p, typeof window < "u" && window.localStorage.setItem(Fa, p), r();
  }
  function d(p) {
    t.value = p, typeof window < "u" && window.localStorage.setItem(Ga, p), r();
  }
  function f(p) {
    n.value = p, typeof window < "u" && window.localStorage.setItem(Ba, p ? "1" : "0"), r();
  }
  function h(p, y) {
    return t.value === "zh" ? p : y;
  }
  return {
    themePreference: e,
    language: t,
    developerMode: n,
    resolvedTheme: i,
    hydrate: c,
    setThemePreference: u,
    setLanguage: d,
    setDeveloperMode: f,
    applyDocumentState: r,
    label: h
  };
}), id = { class: "confirm-dialog auth-dialog" }, od = { class: "confirm-dialog__header" }, rd = { class: "page-card__eyebrow" }, cd = { class: "page-card__title" }, ud = { class: "auth-dialog__body" }, dd = { class: "field-stack" }, fd = { class: "field-stack" }, hd = { class: "field-stack" }, pd = { class: "login-note" }, gd = {
  key: 0,
  class: "login-error"
}, md = { class: "confirm-dialog__footer" }, bd = ["disabled"], vd = /* @__PURE__ */ we({
  __name: "ChangePasswordDialog",
  setup(e) {
    const t = ke(), n = Ds(), l = ot(), i = /* @__PURE__ */ F(""), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F("");
    function f() {
      i.value = "", r.value = "", c.value = "", d.value = "", u.value = !1;
    }
    function h() {
      f(), n.closeChangePassword();
    }
    async function p() {
      if (!i.value || !r.value) {
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
        await n.changePassword(i.value, r.value), h(), l.pushToast({
          tone: "success",
          title: t.label("密码已更新", "Password updated"),
          message: t.label("当前会话已失效，请使用新密码重新登录。", "The current session has been cleared. Sign in again with the new password.")
        });
      } catch (y) {
        d.value = y instanceof Error ? y.message : String(y), u.value = !1;
      }
    }
    return (y, v) => s(n).changePasswordOpen ? (g(), m("div", {
      key: 0,
      class: "confirm-backdrop",
      onClick: kn(h, ["self"])
    }, [
      a("section", id, [
        a("header", od, [
          a("p", rd, o(s(t).label("账号安全", "Account security")), 1),
          a("h2", cd, o(s(t).label("修改访问密码", "Change access password")), 1)
        ]),
        a("div", ud, [
          a("label", dd, [
            a("span", null, o(s(t).label("当前密码", "Current password")), 1),
            pe(a("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (C) => i.value = C),
              class: "input-field",
              type: "password",
              autocomplete: "current-password"
            }, null, 512), [
              [Re, i.value]
            ])
          ]),
          a("label", fd, [
            a("span", null, o(s(t).label("新密码", "New password")), 1),
            pe(a("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (C) => r.value = C),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [Re, r.value]
            ])
          ]),
          a("label", hd, [
            a("span", null, o(s(t).label("确认新密码", "Confirm new password")), 1),
            pe(a("input", {
              "onUpdate:modelValue": v[2] || (v[2] = (C) => c.value = C),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [Re, c.value]
            ])
          ]),
          a("p", pd, o(s(t).label("修改成功后，Guard 会自动让当前登录会话失效，防止旧凭证继续可用。", "After the password changes, Guard automatically invalidates the current session so the old credential cannot keep running.")), 1),
          d.value ? (g(), m("p", gd, o(d.value), 1)) : Q("", !0)
        ]),
        a("footer", md, [
          a("button", {
            class: "inline-link",
            type: "button",
            onClick: h
          }, o(s(t).label("取消", "Cancel")), 1),
          a("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: u.value,
            onClick: p
          }, o(u.value ? s(t).label("更新中…", "Updating…") : s(t).label("确认修改", "Update password")), 9, bd)
        ])
      ])
    ])) : Q("", !0);
  }
}), yd = 4e3;
async function _d(e) {
  const t = new AbortController(), n = setTimeout(() => t.abort(), yd);
  try {
    const l = await fetch(jo("/api/auth/status", e), {
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
  const e = /* @__PURE__ */ F(!1), t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F("web"), i = /* @__PURE__ */ F(gl()), r = /* @__PURE__ */ F(i.value), c = /* @__PURE__ */ F(!0), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F(Na()), f = /* @__PURE__ */ F(null), h = D(() => l.value === "desktop"), p = D(() => !h.value || c.value), y = D(() => h.value && !c.value);
  function v(T, N = {}) {
    const O = Qn(T || i.value);
    return r.value = O, h.value && N.persist !== !1 && qu(O), O;
  }
  function C() {
    r.value = i.value, h.value && Ju();
  }
  function P(T) {
    return Hl(T, h.value ? r.value : void 0);
  }
  async function R() {
    await Yu(d.value);
  }
  async function x() {
    if (!h.value)
      return c.value = !0, u.value = "", f.value = (/* @__PURE__ */ new Date()).toISOString(), e.value = !0, t.value = !1, !0;
    n.value = !0;
    try {
      const T = v(r.value);
      return await _d(T), c.value = !0, u.value = "", f.value = (/* @__PURE__ */ new Date()).toISOString(), !0;
    } catch (T) {
      return c.value = !1, u.value = T instanceof Error ? T.message : String(T), f.value = (/* @__PURE__ */ new Date()).toISOString(), !1;
    } finally {
      n.value = !1, e.value = !0, t.value = !1;
    }
  }
  async function $() {
    if (!(t.value || e.value)) {
      if (t.value = !0, l.value = Wl(), i.value = gl(), d.value = Na(), r.value = Vo() || i.value, !h.value) {
        c.value = !0, u.value = "", f.value = (/* @__PURE__ */ new Date()).toISOString(), e.value = !0, t.value = !1;
        return;
      }
      await x();
    }
  }
  return {
    ready: e,
    hydrating: t,
    checking: n,
    mode: l,
    defaultApiBaseUrl: i,
    apiBaseUrl: r,
    connected: c,
    connectionError: u,
    docsUrl: d,
    lastCheckedAt: f,
    isDesktop: h,
    canUseApi: p,
    requiresConnection: y,
    hydrate: $,
    probeConnection: x,
    setApiBaseUrl: v,
    resetApiBaseUrl: C,
    resolveUrl: P,
    openSupportDocs: R
  };
}), wd = { class: "login-screen" }, kd = { class: "login-card" }, $d = { class: "login-card__brand" }, Cd = ["src"], Sd = { class: "brand-lockup__eyebrow" }, Ad = { class: "login-card__copy" }, Rd = { class: "page-card__eyebrow" }, Td = { class: "page-card__title" }, xd = { class: "muted-copy" }, Pd = {
  key: 0,
  class: "muted-copy"
}, Ed = { class: "field-stack" }, Dd = ["placeholder"], Md = { class: "login-note" }, Id = {
  key: 0,
  class: "login-command"
}, Od = {
  key: 1,
  class: "login-error"
}, Ld = ["disabled"], Ud = /* @__PURE__ */ we({
  __name: "LoginPage",
  setup(e) {
    const t = ke(), n = Ds(), l = Yn(), i = D(() => l.resolveUrl("/ui/logo.png")), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(""), d = D(() => n.initialPasswordAvailable ? t.label(
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
      } catch (h) {
        u.value = h instanceof Error ? h.message : String(h);
      } finally {
        c.value = !1;
      }
    }
    return (h, p) => (g(), m("div", wd, [
      a("section", kd, [
        a("div", $d, [
          a("img", {
            class: "login-card__logo",
            src: i.value,
            alt: "OpenClaw Guard"
          }, null, 8, Cd),
          a("div", null, [
            a("p", Sd, o(s(t).label("安全控制台", "Security console")), 1),
            p[1] || (p[1] = a("h1", { class: "brand-lockup__title" }, "OpenClaw Guard", -1))
          ])
        ]),
        a("div", Ad, [
          a("p", Rd, o(s(t).label("安全登录", "Secure sign-in")), 1),
          a("h2", Td, o(s(t).label("输入本机访问密码", "Enter the local access password")), 1),
          a("p", xd, o(s(t).label(
            "登录后即可进入当前默认控制台。主题、语言、开发者模式等本地偏好会继续保留。",
            "Sign in to enter the default Guard console. Theme, language, and developer-mode preferences stay local to this device."
          )), 1),
          s(l).isDesktop ? (g(), m("p", Pd, [
            ft(o(s(t).label("当前连接地址：", "Current target: ")), 1),
            a("code", null, o(s(l).apiBaseUrl), 1)
          ])) : Q("", !0)
        ]),
        a("form", {
          class: "login-form",
          onSubmit: kn(f, ["prevent"])
        }, [
          a("label", Ed, [
            a("span", null, o(s(t).label("访问密码", "Access password")), 1),
            pe(a("input", {
              "onUpdate:modelValue": p[0] || (p[0] = (y) => r.value = y),
              class: "input-field",
              type: "password",
              autocomplete: "current-password",
              placeholder: s(t).label("请输入 Guard 登录密码", "Enter the Guard password")
            }, null, 8, Dd), [
              [Re, r.value]
            ])
          ]),
          a("p", Md, o(d.value), 1),
          s(n).initialPasswordAvailable ? (g(), m("div", Id, [
            a("span", null, o(s(t).label("回看命令", "Reveal command")), 1),
            a("code", null, o(s(n).revealCommand), 1)
          ])) : Q("", !0),
          u.value ? (g(), m("p", Od, o(u.value), 1)) : Q("", !0),
          a("button", {
            class: "inline-link inline-link--primary login-submit",
            type: "submit",
            disabled: c.value
          }, o(c.value ? s(t).label("登录中…", "Signing in…") : s(t).label("进入控制台", "Open console")), 9, Ld)
        ], 32)
      ])
    ]));
  }
}), Nd = { class: "confirm-dialog__header" }, Fd = { class: "page-card__title" }, Gd = { class: "confirm-dialog__body" }, Bd = { class: "confirm-dialog__footer" }, Vd = /* @__PURE__ */ we({
  __name: "ConfirmDialog",
  setup(e) {
    const t = ot(), { confirmRequest: n } = Fo(t), l = D(() => !!n.value);
    return (i, r) => {
      var c, u, d, f, h, p;
      return l.value ? (g(), m("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = kn((y) => s(t).resolveConfirm(!1), ["self"]))
      }, [
        a("section", {
          class: oe(["confirm-dialog", { "confirm-dialog--danger": ((c = s(n)) == null ? void 0 : c.tone) === "danger" }])
        }, [
          a("header", Nd, [
            r[3] || (r[3] = a("p", { class: "page-card__eyebrow" }, "Confirm", -1)),
            a("h2", Fd, o((u = s(n)) == null ? void 0 : u.title), 1)
          ]),
          a("p", Gd, o((d = s(n)) == null ? void 0 : d.message), 1),
          a("footer", Bd, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (y) => s(t).resolveConfirm(!1))
            }, o((f = s(n)) == null ? void 0 : f.cancelLabel), 1),
            a("button", {
              class: oe(["inline-link", { "inline-link--danger": ((h = s(n)) == null ? void 0 : h.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (y) => s(t).resolveConfirm(!0))
            }, o((p = s(n)) == null ? void 0 : p.confirmLabel), 3)
          ])
        ], 2)
      ])) : Q("", !0);
    };
  }
}), jd = {
  class: "toast-viewport",
  "aria-live": "polite",
  "aria-atomic": "true"
}, zd = { class: "toast-card__content" }, Wd = { key: 0 }, Hd = ["onClick"], Kd = /* @__PURE__ */ we({
  __name: "ToastViewport",
  setup(e) {
    const t = ot(), { toasts: n } = Fo(t);
    return (l, i) => (g(), m("div", jd, [
      (g(!0), m(W, null, ce(s(n), (r) => (g(), m("article", {
        key: r.id,
        class: oe(["toast-card", `toast-card--${r.tone}`])
      }, [
        a("div", zd, [
          r.title ? (g(), m("strong", Wd, o(r.title), 1)) : Q("", !0),
          a("p", null, o(r.message), 1)
        ]),
        a("button", {
          class: "toast-card__close",
          type: "button",
          onClick: (c) => s(t).dismissToast(r.id)
        }, " × ", 8, Hd)
      ], 2))), 128))
    ]));
  }
}), qd = { class: "login-screen" }, Jd = { class: "login-card desktop-connection-card" }, Qd = { class: "login-card__copy" }, Yd = { class: "page-card__eyebrow" }, Zd = { class: "page-card__title" }, Xd = { class: "muted-copy" }, ef = { class: "login-command" }, tf = { class: "field-stack" }, nf = ["placeholder"], sf = { class: "page-inline-status" }, lf = { class: "pill pill--info" }, af = {
  key: 0,
  class: "login-error"
}, of = { class: "page-actions" }, rf = ["disabled"], cf = ["disabled"], uf = ["disabled"], df = {
  key: 1,
  class: "list-stack"
}, ff = { class: "status-banner status-banner--warning" }, hf = { class: "muted-copy" }, pf = { class: "page-card__header" }, gf = { class: "page-card__title" }, mf = { class: "page-card__body" }, bf = { class: "settings-note" }, vf = /* @__PURE__ */ we({
  __name: "DesktopConnectionPage",
  setup(e) {
    const t = ke(), n = Yn(), l = /* @__PURE__ */ F(n.apiBaseUrl), i = /* @__PURE__ */ F(""), r = /* @__PURE__ */ F(!1), c = D(() => n.lastCheckedAt ? new Date(n.lastCheckedAt).toLocaleString() : t.label("尚未检测", "Not checked yet")), u = D(() => [
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
    xe(
      () => n.apiBaseUrl,
      (y) => {
        l.value = y;
      }
    );
    async function d() {
      i.value = "", await n.probeConnection();
    }
    async function f() {
      i.value = "";
      try {
        n.setApiBaseUrl(l.value), await n.probeConnection();
      } catch (y) {
        i.value = y instanceof Error ? y.message : String(y);
      }
    }
    function h() {
      i.value = "", n.resetApiBaseUrl(), l.value = n.defaultApiBaseUrl;
    }
    async function p() {
      i.value = "";
      try {
        await n.openSupportDocs();
      } catch (y) {
        i.value = y instanceof Error ? y.message : String(y);
      }
    }
    return (y, v) => (g(), m("div", qd, [
      a("section", Jd, [
        a("div", Qd, [
          a("p", Yd, o(s(t).label("桌面预览 / Desktop", "Desktop preview / Thin shell")), 1),
          a("h1", Zd, o(s(t).label("连接本地 Guard", "Connect to a local Guard instance")), 1),
          a("p", Xd, o(s(t).label(
            "桌面壳本身不会代你启动后端，它只连接一个已经运行中的 Guard Web / Guard API。先确认本机 Guard 已启动，再回到这里重新检测。",
            "The desktop shell does not start Guard for you. It only connects to an already running Guard Web / Guard API on this machine."
          )), 1)
        ]),
        a("div", ef, [
          a("span", null, o(s(t).label("当前目标地址", "Current target address")), 1),
          a("code", null, o(s(n).apiBaseUrl), 1)
        ]),
        a("label", tf, [
          a("span", null, o(s(t).label("连接设置", "Connection settings")), 1),
          pe(a("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (C) => l.value = C),
            class: "input-field",
            type: "text",
            spellcheck: "false",
            placeholder: s(n).defaultApiBaseUrl
          }, null, 8, nf), [
            [Re, l.value]
          ])
        ]),
        a("div", sf, [
          a("span", {
            class: oe(["pill", s(n).connected ? "pill--success" : "pill--warning"])
          }, o(s(n).connected ? s(t).label("Guard 可连接", "Guard reachable") : s(t).label("暂时无法连接", "Guard unavailable")), 3),
          a("span", lf, o(s(t).label("最近检测", "Last checked")) + ": " + o(c.value), 1)
        ]),
        s(n).connectionError || i.value ? (g(), m("p", af, o(i.value || s(n).connectionError), 1)) : Q("", !0),
        a("div", of, [
          a("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: s(n).checking,
            onClick: d
          }, o(s(n).checking ? s(t).label("检测中…", "Checking…") : s(t).label("重新检测", "Retry connection")), 9, rf),
          a("button", {
            class: "inline-link",
            type: "button",
            disabled: s(n).checking,
            onClick: f
          }, o(s(t).label("保存并重试", "Save and retry")), 9, cf),
          a("button", {
            class: "inline-link",
            type: "button",
            disabled: s(n).checking,
            onClick: h
          }, o(s(t).label("恢复默认地址", "Reset to default")), 9, uf),
          a("button", {
            class: "inline-link",
            type: "button",
            onClick: v[1] || (v[1] = (C) => r.value = !r.value)
          }, o(r.value ? s(t).label("收起启动说明", "Hide startup guide") : s(t).label("查看启动说明", "Open startup guide")), 1)
        ]),
        r.value ? (g(), m("div", df, [
          a("div", ff, [
            a("div", null, [
              a("strong", null, o(s(t).label("先启动 Guard，再回到桌面壳", "Start Guard first, then come back here")), 1),
              a("p", hf, o(s(t).label(
                "下面给的是最常用的本地启动命令。默认端口是 18088；如果你改过端口，这里的地址也要一起改。",
                "These are the most common local startup commands. The default port is 18088, so change both places if you use another port."
              )), 1)
            ])
          ]),
          (g(!0), m(W, null, ce(u.value, (C) => (g(), m("article", {
            key: C.platform,
            class: "page-card"
          }, [
            a("header", pf, [
              a("div", null, [
                v[2] || (v[2] = a("p", { class: "page-card__eyebrow" }, "Startup", -1)),
                a("h2", gf, o(C.platform), 1)
              ])
            ]),
            a("div", mf, [
              (g(!0), m(W, null, ce(C.commands, (P) => (g(), m("div", {
                key: P,
                class: "login-command"
              }, [
                a("span", null, o(s(t).label("推荐命令", "Suggested command")), 1),
                a("code", null, o(P), 1)
              ]))), 128))
            ])
          ]))), 128)),
          a("div", bf, [
            a("strong", null, o(s(t).label("文档站", "Documentation")), 1),
            a("span", null, [
              ft(o(s(t).label(
                "如果你需要完整的首次启动步骤、密码回看、更新和恢复说明，可以直接打开官方文档站。",
                "Open the official documentation if you need the full first-run, password recovery, update, or restore guide."
              )) + " ", 1),
              a("button", {
                class: "inline-link",
                type: "button",
                onClick: p
              }, o(s(t).label("查看文档", "Open docs")), 1)
            ])
          ])
        ])) : Q("", !0)
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
function zo(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function yf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && zo(e.default);
}
const Ee = Object.assign;
function qs(e, t) {
  const n = {};
  for (const l in t) {
    const i = t[l];
    n[l] = wt(i) ? i.map(e) : e(i);
  }
  return n;
}
const Ln = () => {
}, wt = Array.isArray;
function Va(e, t) {
  const n = {};
  for (const l in e) n[l] = l in t ? t[l] : e[l];
  return n;
}
const Wo = /#/g, _f = /&/g, wf = /\//g, kf = /=/g, $f = /\?/g, Ho = /\+/g, Cf = /%5B/g, Sf = /%5D/g, Ko = /%5E/g, Af = /%60/g, qo = /%7B/g, Rf = /%7C/g, Jo = /%7D/g, Tf = /%20/g;
function Jl(e) {
  return e == null ? "" : encodeURI("" + e).replace(Rf, "|").replace(Cf, "[").replace(Sf, "]");
}
function xf(e) {
  return Jl(e).replace(qo, "{").replace(Jo, "}").replace(Ko, "^");
}
function ml(e) {
  return Jl(e).replace(Ho, "%2B").replace(Tf, "+").replace(Wo, "%23").replace(_f, "%26").replace(Af, "`").replace(qo, "{").replace(Jo, "}").replace(Ko, "^");
}
function Pf(e) {
  return ml(e).replace(kf, "%3D");
}
function Ef(e) {
  return Jl(e).replace(Wo, "%23").replace($f, "%3F");
}
function Df(e) {
  return Ef(e).replace(wf, "%2F");
}
function Wn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Mf = /\/$/, If = (e) => e.replace(Mf, "");
function Js(e, t, n = "/") {
  let l, i = {}, r = "", c = "";
  const u = t.indexOf("#");
  let d = t.indexOf("?");
  return d = u >= 0 && d > u ? -1 : d, d >= 0 && (l = t.slice(0, d), r = t.slice(d, u > 0 ? u : t.length), i = e(r.slice(1))), u >= 0 && (l = l || t.slice(0, u), c = t.slice(u, t.length)), l = Nf(l ?? t, n), {
    fullPath: l + r + c,
    path: l,
    query: i,
    hash: Wn(c)
  };
}
function Of(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ja(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Lf(e, t, n) {
  const l = t.matched.length - 1, i = n.matched.length - 1;
  return l > -1 && l === i && yn(t.matched[l], n.matched[i]) && Qo(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function yn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Qo(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Uf(e[n], t[n])) return !1;
  return !0;
}
function Uf(e, t) {
  return wt(e) ? za(e, t) : wt(t) ? za(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function za(e, t) {
  return wt(t) ? e.length === t.length && e.every((n, l) => n === t[l]) : e.length === 1 && e[0] === t;
}
function Nf(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), l = e.split("/"), i = l[l.length - 1];
  (i === ".." || i === ".") && l.push("");
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
function Ff(e) {
  if (!e) if (dn) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), If(e);
}
const Gf = /^[^#]+#/;
function Bf(e, t) {
  return e.replace(Gf, "#") + t;
}
function Vf(e, t) {
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
function jf(e) {
  let t;
  if ("el" in e) {
    const n = e.el, l = typeof n == "string" && n.startsWith("#"), i = typeof n == "string" ? l ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!i)
      return;
    t = Vf(i, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Wa(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const vl = /* @__PURE__ */ new Map();
function zf(e, t) {
  vl.set(e, t);
}
function Wf(e) {
  const t = vl.get(e);
  return vl.delete(e), t;
}
function Hf(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Yo(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let We = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const Zo = Symbol("");
We.MATCHER_NOT_FOUND + "", We.NAVIGATION_GUARD_REDIRECT + "", We.NAVIGATION_ABORTED + "", We.NAVIGATION_CANCELLED + "", We.NAVIGATION_DUPLICATED + "";
function _n(e, t) {
  return Ee(/* @__PURE__ */ new Error(), {
    type: e,
    [Zo]: !0
  }, t);
}
function Mt(e, t) {
  return e instanceof Error && Zo in e && (t == null || !!(e.type & t));
}
const Kf = [
  "params",
  "query",
  "hash"
];
function qf(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Kf) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Jf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let l = 0; l < n.length; ++l) {
    const i = n[l].replace(Ho, " "), r = i.indexOf("="), c = Wn(r < 0 ? i : i.slice(0, r)), u = r < 0 ? null : Wn(i.slice(r + 1));
    if (c in t) {
      let d = t[c];
      wt(d) || (d = t[c] = [d]), d.push(u);
    } else t[c] = u;
  }
  return t;
}
function Ha(e) {
  let t = "";
  for (let n in e) {
    const l = e[n];
    if (n = Pf(n), l == null) {
      l !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (wt(l) ? l.map((i) => i && ml(i)) : [l && ml(l)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i));
    });
  }
  return t;
}
function Qf(e) {
  const t = {};
  for (const n in e) {
    const l = e[n];
    l !== void 0 && (t[n] = wt(l) ? l.map((i) => i == null ? null : "" + i) : l == null ? l : "" + l);
  }
  return t;
}
const Xo = Symbol(""), Ka = Symbol(""), Is = Symbol(""), Ql = Symbol(""), yl = Symbol("");
function An() {
  let e = [];
  function t(l) {
    return e.push(l), () => {
      const i = e.indexOf(l);
      i > -1 && e.splice(i, 1);
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
function Yf(e, t, n) {
  const l = () => {
    e[t].delete(n);
  };
  Ul(l), io(l), ao(() => {
    e[t].add(n);
  }), e[t].add(n);
}
function Zf(e) {
  const t = gt(Xo, {}).value;
  t && Yf(t, "leaveGuards", e);
}
function Jt(e, t, n, l, i, r = (c) => c()) {
  const c = l && (l.enterCallbacks[i] = l.enterCallbacks[i] || []);
  return () => new Promise((u, d) => {
    const f = (y) => {
      y === !1 ? d(_n(We.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : y instanceof Error ? d(y) : Hf(y) ? d(_n(We.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: y
      })) : (c && l.enterCallbacks[i] === c && typeof y == "function" && c.push(y), u());
    }, h = r(() => e.call(l && l.instances[i], t, n, f));
    let p = Promise.resolve(h);
    e.length < 3 && (p = p.then(f)), p.catch((y) => d(y));
  });
}
function Ys(e, t, n, l, i = (r) => r()) {
  const r = [];
  for (const c of e)
    for (const u in c.components) {
      let d = c.components[u];
      if (!(t !== "beforeRouteEnter" && !c.instances[u]))
        if (zo(d)) {
          const f = (d.__vccOpts || d)[t];
          f && r.push(Jt(f, n, l, c, u, i));
        } else {
          let f = d();
          r.push(() => f.then((h) => {
            if (!h) throw new Error(`Couldn't resolve component "${u}" at "${c.path}"`);
            const p = yf(h) ? h.default : h;
            c.mods[u] = h, c.components[u] = p;
            const y = (p.__vccOpts || p)[t];
            return y && Jt(y, n, l, c, u, i)();
          }));
        }
    }
  return r;
}
function Xf(e, t) {
  const n = [], l = [], i = [], r = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < r; c++) {
    const u = t.matched[c];
    u && (e.matched.find((f) => yn(f, u)) ? l.push(u) : n.push(u));
    const d = e.matched[c];
    d && (t.matched.find((f) => yn(f, d)) || i.push(d));
  }
  return [
    n,
    l,
    i
  ];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let eh = () => location.protocol + "//" + location.host;
function er(e, t) {
  const { pathname: n, search: l, hash: i } = t, r = e.indexOf("#");
  if (r > -1) {
    let c = i.includes(e.slice(r)) ? e.slice(r).length : 1, u = i.slice(c);
    return u[0] !== "/" && (u = "/" + u), ja(u, "");
  }
  return ja(n, e) + l + i;
}
function th(e, t, n, l) {
  let i = [], r = [], c = null;
  const u = ({ state: y }) => {
    const v = er(e, location), C = n.value, P = t.value;
    let R = 0;
    if (y) {
      if (n.value = v, t.value = y, c && c === C) {
        c = null;
        return;
      }
      R = P ? y.position - P.position : 0;
    } else l(v);
    i.forEach((x) => {
      x(n.value, C, {
        delta: R,
        type: bl.pop,
        direction: R ? R > 0 ? Qs.forward : Qs.back : Qs.unknown
      });
    });
  };
  function d() {
    c = n.value;
  }
  function f(y) {
    i.push(y);
    const v = () => {
      const C = i.indexOf(y);
      C > -1 && i.splice(C, 1);
    };
    return r.push(v), v;
  }
  function h() {
    if (document.visibilityState === "hidden") {
      const { history: y } = window;
      if (!y.state) return;
      y.replaceState(Ee({}, y.state, { scroll: Ms() }), "");
    }
  }
  function p() {
    for (const y of r) y();
    r = [], window.removeEventListener("popstate", u), window.removeEventListener("pagehide", h), document.removeEventListener("visibilitychange", h);
  }
  return window.addEventListener("popstate", u), window.addEventListener("pagehide", h), document.addEventListener("visibilitychange", h), {
    pauseListeners: d,
    listen: f,
    destroy: p
  };
}
function qa(e, t, n, l = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: l,
    position: window.history.length,
    scroll: i ? Ms() : null
  };
}
function nh(e) {
  const { history: t, location: n } = window, l = { value: er(e, n) }, i = { value: t.state };
  i.value || r(l.value, {
    back: null,
    current: l.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(d, f, h) {
    const p = e.indexOf("#"), y = p > -1 ? (n.host && document.querySelector("base") ? e : e.slice(p)) + d : eh() + e + d;
    try {
      t[h ? "replaceState" : "pushState"](f, "", y), i.value = f;
    } catch (v) {
      console.error(v), n[h ? "replace" : "assign"](y);
    }
  }
  function c(d, f) {
    r(d, Ee({}, t.state, qa(i.value.back, d, i.value.forward, !0), f, { position: i.value.position }), !0), l.value = d;
  }
  function u(d, f) {
    const h = Ee({}, i.value, t.state, {
      forward: d,
      scroll: Ms()
    });
    r(h.current, h, !0), r(d, Ee({}, qa(l.value, d, null), { position: h.position + 1 }, f), !1), l.value = d;
  }
  return {
    location: l,
    state: i,
    push: u,
    replace: c
  };
}
function sh(e) {
  e = Ff(e);
  const t = nh(e), n = th(e, t.state, t.location, t.replace);
  function l(r, c = !0) {
    c || n.pauseListeners(), history.go(r);
  }
  const i = Ee({
    location: "",
    base: e,
    go: l,
    createHref: Bf.bind(null, e)
  }, t, n);
  return Object.defineProperty(i, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(i, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), i;
}
function lh(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), sh(e);
}
let sn = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var qe = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(qe || {});
const ah = {
  type: sn.Static,
  value: ""
}, ih = /[a-zA-Z0-9_]/;
function oh(e) {
  if (!e) return [[]];
  if (e === "/") return [[ah]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${f}": ${v}`);
  }
  let n = qe.Static, l = n;
  const i = [];
  let r;
  function c() {
    r && i.push(r), r = [];
  }
  let u = 0, d, f = "", h = "";
  function p() {
    f && (n === qe.Static ? r.push({
      type: sn.Static,
      value: f
    }) : n === qe.Param || n === qe.ParamRegExp || n === qe.ParamRegExpEnd ? (r.length > 1 && (d === "*" || d === "+") && t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: sn.Param,
      value: f,
      regexp: h,
      repeatable: d === "*" || d === "+",
      optional: d === "*" || d === "?"
    })) : t("Invalid state to consume buffer"), f = "");
  }
  function y() {
    f += d;
  }
  for (; u < e.length; ) {
    if (d = e[u++], d === "\\" && n !== qe.ParamRegExp) {
      l = n, n = qe.EscapeNext;
      continue;
    }
    switch (n) {
      case qe.Static:
        d === "/" ? (f && p(), c()) : d === ":" ? (p(), n = qe.Param) : y();
        break;
      case qe.EscapeNext:
        y(), n = l;
        break;
      case qe.Param:
        d === "(" ? n = qe.ParamRegExp : ih.test(d) ? y() : (p(), n = qe.Static, d !== "*" && d !== "?" && d !== "+" && u--);
        break;
      case qe.ParamRegExp:
        d === ")" ? h[h.length - 1] == "\\" ? h = h.slice(0, -1) + d : n = qe.ParamRegExpEnd : h += d;
        break;
      case qe.ParamRegExpEnd:
        p(), n = qe.Static, d !== "*" && d !== "?" && d !== "+" && u--, h = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === qe.ParamRegExp && t(`Unfinished custom RegExp for param "${f}"`), p(), c(), i;
}
const Ja = "[^/]+?", rh = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var lt = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(lt || {});
const ch = /[.+*?^${}()[\]/\\]/g;
function uh(e, t) {
  const n = Ee({}, rh, t), l = [];
  let i = n.start ? "^" : "";
  const r = [];
  for (const f of e) {
    const h = f.length ? [] : [lt.Root];
    n.strict && !f.length && (i += "/");
    for (let p = 0; p < f.length; p++) {
      const y = f[p];
      let v = lt.Segment + (n.sensitive ? lt.BonusCaseSensitive : 0);
      if (y.type === sn.Static)
        p || (i += "/"), i += y.value.replace(ch, "\\$&"), v += lt.Static;
      else if (y.type === sn.Param) {
        const { value: C, repeatable: P, optional: R, regexp: x } = y;
        r.push({
          name: C,
          repeatable: P,
          optional: R
        });
        const $ = x || Ja;
        if ($ !== Ja) {
          v += lt.BonusCustomRegExp;
          try {
            `${$}`;
          } catch (N) {
            throw new Error(`Invalid custom RegExp for param "${C}" (${$}): ` + N.message);
          }
        }
        let T = P ? `((?:${$})(?:/(?:${$}))*)` : `(${$})`;
        p || (T = R && f.length < 2 ? `(?:/${T})` : "/" + T), R && (T += "?"), i += T, v += lt.Dynamic, R && (v += lt.BonusOptional), P && (v += lt.BonusRepeatable), $ === ".*" && (v += lt.BonusWildcard);
      }
      h.push(v);
    }
    l.push(h);
  }
  if (n.strict && n.end) {
    const f = l.length - 1;
    l[f][l[f].length - 1] += lt.BonusStrict;
  }
  n.strict || (i += "/?"), n.end ? i += "$" : n.strict && !i.endsWith("/") && (i += "(?:/|$)");
  const c = new RegExp(i, n.sensitive ? "" : "i");
  function u(f) {
    const h = f.match(c), p = {};
    if (!h) return null;
    for (let y = 1; y < h.length; y++) {
      const v = h[y] || "", C = r[y - 1];
      p[C.name] = v && C.repeatable ? v.split("/") : v;
    }
    return p;
  }
  function d(f) {
    let h = "", p = !1;
    for (const y of e) {
      (!p || !h.endsWith("/")) && (h += "/"), p = !1;
      for (const v of y) if (v.type === sn.Static) h += v.value;
      else if (v.type === sn.Param) {
        const { value: C, repeatable: P, optional: R } = v, x = C in f ? f[C] : "";
        if (wt(x) && !P) throw new Error(`Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`);
        const $ = wt(x) ? x.join("/") : x;
        if (!$) if (R)
          y.length < 2 && (h.endsWith("/") ? h = h.slice(0, -1) : p = !0);
        else throw new Error(`Missing required param "${C}"`);
        h += $;
      }
    }
    return h || "/";
  }
  return {
    re: c,
    score: l,
    keys: r,
    parse: u,
    stringify: d
  };
}
function dh(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const l = t[n] - e[n];
    if (l) return l;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === lt.Static + lt.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === lt.Static + lt.Segment ? 1 : -1 : 0;
}
function tr(e, t) {
  let n = 0;
  const l = e.score, i = t.score;
  for (; n < l.length && n < i.length; ) {
    const r = dh(l[n], i[n]);
    if (r) return r;
    n++;
  }
  if (Math.abs(i.length - l.length) === 1) {
    if (Qa(l)) return 1;
    if (Qa(i)) return -1;
  }
  return i.length - l.length;
}
function Qa(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const fh = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function hh(e, t, n) {
  const l = uh(oh(e.path), n), i = Ee(l, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function ph(e, t) {
  const n = [], l = /* @__PURE__ */ new Map();
  t = Va(fh, t);
  function i(p) {
    return l.get(p);
  }
  function r(p, y, v) {
    const C = !v, P = Za(p);
    P.aliasOf = v && v.record;
    const R = Va(t, p), x = [P];
    if ("alias" in p) {
      const N = typeof p.alias == "string" ? [p.alias] : p.alias;
      for (const O of N) x.push(Za(Ee({}, P, {
        components: v ? v.record.components : P.components,
        path: O,
        aliasOf: v ? v.record : P
      })));
    }
    let $, T;
    for (const N of x) {
      const { path: O } = N;
      if (y && O[0] !== "/") {
        const ee = y.record.path, b = ee[ee.length - 1] === "/" ? "" : "/";
        N.path = y.record.path + (O && b + O);
      }
      if ($ = hh(N, y, R), v ? v.alias.push($) : (T = T || $, T !== $ && T.alias.push($), C && p.name && !Xa($) && c(p.name)), nr($) && d($), P.children) {
        const ee = P.children;
        for (let b = 0; b < ee.length; b++) r(ee[b], $, v && v.children[b]);
      }
      v = v || $;
    }
    return T ? () => {
      c(T);
    } : Ln;
  }
  function c(p) {
    if (Yo(p)) {
      const y = l.get(p);
      y && (l.delete(p), n.splice(n.indexOf(y), 1), y.children.forEach(c), y.alias.forEach(c));
    } else {
      const y = n.indexOf(p);
      y > -1 && (n.splice(y, 1), p.record.name && l.delete(p.record.name), p.children.forEach(c), p.alias.forEach(c));
    }
  }
  function u() {
    return n;
  }
  function d(p) {
    const y = bh(p, n);
    n.splice(y, 0, p), p.record.name && !Xa(p) && l.set(p.record.name, p);
  }
  function f(p, y) {
    let v, C = {}, P, R;
    if ("name" in p && p.name) {
      if (v = l.get(p.name), !v) throw _n(We.MATCHER_NOT_FOUND, { location: p });
      R = v.record.name, C = Ee(Ya(y.params, v.keys.filter((T) => !T.optional).concat(v.parent ? v.parent.keys.filter((T) => T.optional) : []).map((T) => T.name)), p.params && Ya(p.params, v.keys.map((T) => T.name))), P = v.stringify(C);
    } else if (p.path != null)
      P = p.path, v = n.find((T) => T.re.test(P)), v && (C = v.parse(P), R = v.record.name);
    else {
      if (v = y.name ? l.get(y.name) : n.find((T) => T.re.test(y.path)), !v) throw _n(We.MATCHER_NOT_FOUND, {
        location: p,
        currentLocation: y
      });
      R = v.record.name, C = Ee({}, y.params, p.params), P = v.stringify(C);
    }
    const x = [];
    let $ = v;
    for (; $; )
      x.unshift($.record), $ = $.parent;
    return {
      name: R,
      path: P,
      params: C,
      matched: x,
      meta: mh(x)
    };
  }
  e.forEach((p) => r(p));
  function h() {
    n.length = 0, l.clear();
  }
  return {
    addRoute: r,
    resolve: f,
    removeRoute: c,
    clearRoutes: h,
    getRoutes: u,
    getRecordMatcher: i
  };
}
function Ya(e, t) {
  const n = {};
  for (const l of t) l in e && (n[l] = e[l]);
  return n;
}
function Za(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: gh(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function gh(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const l in e.components) t[l] = typeof n == "object" ? n[l] : n;
  return t;
}
function Xa(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function mh(e) {
  return e.reduce((t, n) => Ee(t, n.meta), {});
}
function bh(e, t) {
  let n = 0, l = t.length;
  for (; n !== l; ) {
    const r = n + l >> 1;
    tr(e, t[r]) < 0 ? l = r : n = r + 1;
  }
  const i = vh(e);
  return i && (l = t.lastIndexOf(i, l - 1)), l;
}
function vh(e) {
  let t = e;
  for (; t = t.parent; ) if (nr(t) && tr(e, t) === 0) return t;
}
function nr({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function ei(e) {
  const t = gt(Is), n = gt(Ql), l = D(() => {
    const d = s(e.to);
    return t.resolve(d);
  }), i = D(() => {
    const { matched: d } = l.value, { length: f } = d, h = d[f - 1], p = n.matched;
    if (!h || !p.length) return -1;
    const y = p.findIndex(yn.bind(null, h));
    if (y > -1) return y;
    const v = ti(d[f - 2]);
    return f > 1 && ti(h) === v && p[p.length - 1].path !== v ? p.findIndex(yn.bind(null, d[f - 2])) : y;
  }), r = D(() => i.value > -1 && kh(n.params, l.value.params)), c = D(() => i.value > -1 && i.value === n.matched.length - 1 && Qo(n.params, l.value.params));
  function u(d = {}) {
    if (wh(d)) {
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
function yh(e) {
  return e.length === 1 ? e[0] : e;
}
const _h = /* @__PURE__ */ we({
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
  useLink: ei,
  setup(e, { slots: t }) {
    const n = /* @__PURE__ */ ht(ei(e)), { options: l } = gt(Is), i = D(() => ({
      [ni(e.activeClass, l.linkActiveClass, "router-link-active")]: n.isActive,
      [ni(e.exactActiveClass, l.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const r = t.default && yh(t.default(n));
      return e.custom ? r : Do("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: i.value
      }, r);
    };
  }
}), Tt = _h;
function wh(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function kh(e, t) {
  for (const n in t) {
    const l = t[n], i = e[n];
    if (typeof l == "string") {
      if (l !== i) return !1;
    } else if (!wt(i) || i.length !== l.length || l.some((r, c) => r.valueOf() !== i[c].valueOf())) return !1;
  }
  return !0;
}
function ti(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const ni = (e, t, n) => e ?? t ?? n, $h = /* @__PURE__ */ we({
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
    const l = gt(yl), i = D(() => e.route || l.value), r = gt(Ka, 0), c = D(() => {
      let f = s(r);
      const { matched: h } = i.value;
      let p;
      for (; (p = h[f]) && !p.components; ) f++;
      return f;
    }), u = D(() => i.value.matched[c.value]);
    as(Ka, D(() => c.value + 1)), as(Xo, u), as(yl, i);
    const d = /* @__PURE__ */ F();
    return xe(() => [
      d.value,
      u.value,
      e.name
    ], ([f, h, p], [y, v, C]) => {
      h && (h.instances[p] = f, v && v !== h && f && f === y && (h.leaveGuards.size || (h.leaveGuards = v.leaveGuards), h.updateGuards.size || (h.updateGuards = v.updateGuards))), f && h && (!v || !yn(h, v) || !y) && (h.enterCallbacks[p] || []).forEach((P) => P(f));
    }, { flush: "post" }), () => {
      const f = i.value, h = e.name, p = u.value, y = p && p.components[h];
      if (!y) return si(n.default, {
        Component: y,
        route: f
      });
      const v = p.props[h], C = v ? v === !0 ? f.params : typeof v == "function" ? v(f) : v : null, R = Do(y, Ee({}, C, t, {
        onVnodeUnmounted: (x) => {
          x.component.isUnmounted && (p.instances[h] = null);
        },
        ref: d
      }));
      return si(n.default, {
        Component: R,
        route: f
      }) || R;
    };
  }
});
function si(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const sr = $h;
function Ch(e) {
  const t = ph(e.routes, e), n = e.parseQuery || Jf, l = e.stringifyQuery || Ha, i = e.history, r = An(), c = An(), u = An(), d = /* @__PURE__ */ Ur(Ht);
  let f = Ht;
  dn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const h = qs.bind(null, (I) => "" + I), p = qs.bind(null, Df), y = qs.bind(null, Wn);
  function v(I, ne) {
    let w, G;
    return Yo(I) ? (w = t.getRecordMatcher(I), G = ne) : G = I, t.addRoute(G, w);
  }
  function C(I) {
    const ne = t.getRecordMatcher(I);
    ne && t.removeRoute(ne);
  }
  function P() {
    return t.getRoutes().map((I) => I.record);
  }
  function R(I) {
    return !!t.getRecordMatcher(I);
  }
  function x(I, ne) {
    if (ne = Ee({}, ne || d.value), typeof I == "string") {
      const A = Js(n, I, ne.path), L = t.resolve({ path: A.path }, ne), B = i.createHref(A.fullPath);
      return Ee(A, L, {
        params: y(L.params),
        hash: Wn(A.hash),
        redirectedFrom: void 0,
        href: B
      });
    }
    let w;
    if (I.path != null)
      w = Ee({}, I, { path: Js(n, I.path, ne.path).path });
    else {
      const A = Ee({}, I.params);
      for (const L in A) A[L] == null && delete A[L];
      w = Ee({}, I, { params: p(A) }), ne.params = p(ne.params);
    }
    const G = t.resolve(w, ne), ae = I.hash || "";
    G.params = h(y(G.params));
    const _ = Of(l, Ee({}, I, {
      hash: xf(ae),
      path: G.path
    })), k = i.createHref(_);
    return Ee({
      fullPath: _,
      hash: ae,
      query: l === Ha ? Qf(I.query) : I.query || {}
    }, G, {
      redirectedFrom: void 0,
      href: k
    });
  }
  function $(I) {
    return typeof I == "string" ? Js(n, I, d.value.path) : Ee({}, I);
  }
  function T(I, ne) {
    if (f !== I) return _n(We.NAVIGATION_CANCELLED, {
      from: ne,
      to: I
    });
  }
  function N(I) {
    return b(I);
  }
  function O(I) {
    return N(Ee($(I), { replace: !0 }));
  }
  function ee(I, ne) {
    const w = I.matched[I.matched.length - 1];
    if (w && w.redirect) {
      const { redirect: G } = w;
      let ae = typeof G == "function" ? G(I, ne) : G;
      return typeof ae == "string" && (ae = ae.includes("?") || ae.includes("#") ? ae = $(ae) : { path: ae }, ae.params = {}), Ee({
        query: I.query,
        hash: I.hash,
        params: ae.path != null ? {} : I.params
      }, ae);
    }
  }
  function b(I, ne) {
    const w = f = x(I), G = d.value, ae = I.state, _ = I.force, k = I.replace === !0, A = ee(w, G);
    if (A) return b(Ee($(A), {
      state: typeof A == "object" ? Ee({}, ae, A.state) : ae,
      force: _,
      replace: k
    }), ne || w);
    const L = w;
    L.redirectedFrom = ne;
    let B;
    return !_ && Lf(l, G, w) && (B = _n(We.NAVIGATION_DUPLICATED, {
      to: L,
      from: G
    }), H(G, G, !0, !1)), (B ? Promise.resolve(B) : z(L, G)).catch((U) => Mt(U) ? Mt(U, We.NAVIGATION_GUARD_REDIRECT) ? U : Je(U) : _e(U, L, G)).then((U) => {
      if (U) {
        if (Mt(U, We.NAVIGATION_GUARD_REDIRECT))
          return b(Ee({ replace: k }, $(U.to), {
            state: typeof U.to == "object" ? Ee({}, ae, U.to.state) : ae,
            force: _
          }), ne || L);
      } else U = me(L, G, !0, k, ae);
      return j(L, G, U), U;
    });
  }
  function S(I, ne) {
    const w = T(I, ne);
    return w ? Promise.reject(w) : Promise.resolve();
  }
  function E(I) {
    const ne = $e.values().next().value;
    return ne && typeof ne.runWithContext == "function" ? ne.runWithContext(I) : I();
  }
  function z(I, ne) {
    let w;
    const [G, ae, _] = Xf(I, ne);
    w = Ys(G.reverse(), "beforeRouteLeave", I, ne);
    for (const A of G) A.leaveGuards.forEach((L) => {
      w.push(Jt(L, I, ne));
    });
    const k = S.bind(null, I, ne);
    return w.push(k), je(w).then(() => {
      w = [];
      for (const A of r.list()) w.push(Jt(A, I, ne));
      return w.push(k), je(w);
    }).then(() => {
      w = Ys(ae, "beforeRouteUpdate", I, ne);
      for (const A of ae) A.updateGuards.forEach((L) => {
        w.push(Jt(L, I, ne));
      });
      return w.push(k), je(w);
    }).then(() => {
      w = [];
      for (const A of _) if (A.beforeEnter) if (wt(A.beforeEnter)) for (const L of A.beforeEnter) w.push(Jt(L, I, ne));
      else w.push(Jt(A.beforeEnter, I, ne));
      return w.push(k), je(w);
    }).then(() => (I.matched.forEach((A) => A.enterCallbacks = {}), w = Ys(_, "beforeRouteEnter", I, ne, E), w.push(k), je(w))).then(() => {
      w = [];
      for (const A of c.list()) w.push(Jt(A, I, ne));
      return w.push(k), je(w);
    }).catch((A) => Mt(A, We.NAVIGATION_CANCELLED) ? A : Promise.reject(A));
  }
  function j(I, ne, w) {
    u.list().forEach((G) => E(() => G(I, ne, w)));
  }
  function me(I, ne, w, G, ae) {
    const _ = T(I, ne);
    if (_) return _;
    const k = ne === Ht, A = dn ? history.state : {};
    w && (G || k ? i.replace(I.fullPath, Ee({ scroll: k && A && A.scroll }, ae)) : i.push(I.fullPath, ae)), d.value = I, H(I, ne, w, k), Je();
  }
  let Ce;
  function Oe() {
    Ce || (Ce = i.listen((I, ne, w) => {
      if (!ze.listening) return;
      const G = x(I), ae = ee(G, ze.currentRoute.value);
      if (ae) {
        b(Ee(ae, {
          replace: !0,
          force: !0
        }), G).catch(Ln);
        return;
      }
      f = G;
      const _ = d.value;
      dn && zf(Wa(_.fullPath, w.delta), Ms()), z(G, _).catch((k) => Mt(k, We.NAVIGATION_ABORTED | We.NAVIGATION_CANCELLED) ? k : Mt(k, We.NAVIGATION_GUARD_REDIRECT) ? (b(Ee($(k.to), { force: !0 }), G).then((A) => {
        Mt(A, We.NAVIGATION_ABORTED | We.NAVIGATION_DUPLICATED) && !w.delta && w.type === bl.pop && i.go(-1, !1);
      }).catch(Ln), Promise.reject()) : (w.delta && i.go(-w.delta, !1), _e(k, G, _))).then((k) => {
        k = k || me(G, _, !1), k && (w.delta && !Mt(k, We.NAVIGATION_CANCELLED) ? i.go(-w.delta, !1) : w.type === bl.pop && Mt(k, We.NAVIGATION_ABORTED | We.NAVIGATION_DUPLICATED) && i.go(-1, !1)), j(G, _, k);
      }).catch(Ln);
    }));
  }
  let Ge = An(), ue = An(), fe;
  function _e(I, ne, w) {
    Je(I);
    const G = ue.list();
    return G.length ? G.forEach((ae) => ae(I, ne, w)) : console.error(I), Promise.reject(I);
  }
  function Ve() {
    return fe && d.value !== Ht ? Promise.resolve() : new Promise((I, ne) => {
      Ge.add([I, ne]);
    });
  }
  function Je(I) {
    return fe || (fe = !I, Oe(), Ge.list().forEach(([ne, w]) => I ? w(I) : ne()), Ge.reset()), I;
  }
  function H(I, ne, w, G) {
    const { scrollBehavior: ae } = e;
    if (!dn || !ae) return Promise.resolve();
    const _ = !w && Wf(Wa(I.fullPath, 0)) || (G || !w) && history.state && history.state.scroll || null;
    return As().then(() => ae(I, ne, _)).then((k) => k && jf(k)).catch((k) => _e(k, I, ne));
  }
  const q = (I) => i.go(I);
  let Y;
  const $e = /* @__PURE__ */ new Set(), ze = {
    currentRoute: d,
    listening: !0,
    addRoute: v,
    removeRoute: C,
    clearRoutes: t.clearRoutes,
    hasRoute: R,
    getRoutes: P,
    resolve: x,
    options: e,
    push: N,
    replace: O,
    go: q,
    back: () => q(-1),
    forward: () => q(1),
    beforeEach: r.add,
    beforeResolve: c.add,
    afterEach: u.add,
    onError: ue.add,
    isReady: Ve,
    install(I) {
      I.component("RouterLink", Tt), I.component("RouterView", sr), I.config.globalProperties.$router = ze, Object.defineProperty(I.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => s(d)
      }), dn && !Y && d.value === Ht && (Y = !0, N(i.location).catch((G) => {
      }));
      const ne = {};
      for (const G in Ht) Object.defineProperty(ne, G, {
        get: () => d.value[G],
        enumerable: !0
      });
      I.provide(Is, ze), I.provide(Ql, /* @__PURE__ */ Ki(ne)), I.provide(yl, d);
      const w = I.unmount;
      $e.add(I), I.unmount = function() {
        $e.delete(I), $e.size < 1 && (f = Ht, Ce && Ce(), Ce = null, d.value = Ht, Y = !1, fe = !1), w();
      };
    }
  };
  function je(I) {
    return I.reduce((ne, w) => ne.then(() => E(w)), Promise.resolve());
  }
  return ze;
}
function Yl() {
  return gt(Is);
}
function Sh(e) {
  return gt(Ql);
}
const Ah = { class: "guard-shell" }, Rh = { class: "guard-shell__topbar" }, Th = { class: "brand-lockup" }, xh = ["src"], Ph = { class: "brand-lockup__eyebrow" }, Eh = { class: "topbar-actions" }, Dh = { class: "toolbar-menu" }, Mh = ["title"], Ih = { class: "toolbar-popover" }, Oh = ["onClick"], Lh = { class: "toolbar-menu" }, Uh = ["title"], Nh = { class: "toolbar-popover" }, Fh = {
  key: 0,
  class: "toolbar-menu"
}, Gh = ["title"], Bh = { class: "toolbar-popover" }, Vh = { class: "guard-shell__body" }, jh = { class: "guard-shell__sidebar" }, zh = { class: "sidebar-current" }, Wh = { class: "sidebar-current__label" }, Hh = { class: "sidebar-current__title" }, Kh = { class: "sidebar-current__meta" }, qh = { class: "page-inline-status" }, Jh = {
  key: 0,
  class: "pill pill--info"
}, Qh = { class: "sidebar-nav" }, Yh = { class: "sidebar-group__title" }, Zh = { class: "sidebar-footer" }, Xh = { class: "sidebar-footer__hint" }, ep = { class: "sidebar-footer__actions" }, tp = ["href"], np = { class: "guard-shell__content" }, sp = /* @__PURE__ */ we({
  __name: "GuardShell",
  setup(e) {
    const t = ke(), n = Ds(), l = ot(), i = Yn(), r = Sh(), c = Yl(), u = D(() => i.resolveUrl("/ui/logo.png")), d = D(() => i.resolveUrl("/legacy")), f = D(() => t.language === "zh" ? "ZH" : "EN"), h = [
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
    ], p = {
      "/settings": { zh: "设置", en: "Settings" }
    }, y = [
      { value: "auto", shortLabel: "Auto", zh: "跟随系统", en: "Auto" },
      { value: "light", shortLabel: "Light", zh: "浅色", en: "Light" },
      { value: "dark", shortLabel: "Dark", zh: "深色", en: "Dark" }
    ], v = D(() => {
      var x;
      return ((x = y.find(($) => $.value === t.themePreference)) == null ? void 0 : x.shortLabel) || "Auto";
    }), C = D(() => {
      const x = h.flatMap((T) => T.items).find((T) => T.to === r.path);
      if (x)
        return t.label(x.zh, x.en);
      const $ = p[r.path];
      return $ ? t.label($.zh, $.en) : t.label("首页", "Home");
    });
    xe(() => t.themePreference, () => t.applyDocumentState()), xe(() => t.language, () => t.applyDocumentState()), xe(() => t.developerMode, () => t.applyDocumentState());
    function P() {
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
    return (x, $) => (g(), m("div", Ah, [
      a("header", Rh, [
        a("div", Th, [
          a("img", {
            class: "brand-lockup__logo",
            src: u.value,
            alt: "OpenClaw Guard"
          }, null, 8, xh),
          a("div", null, [
            a("p", Ph, o(s(t).label("安全控制台", "Security Console")), 1),
            $[3] || ($[3] = a("h1", { class: "brand-lockup__title" }, "OpenClaw Guard", -1))
          ])
        ]),
        a("div", Eh, [
          a("div", Dh, [
            a("button", {
              class: "toolbar-icon",
              type: "button",
              title: s(t).label("主题", "Theme")
            }, o(v.value), 9, Mh),
            a("div", Ih, [
              (g(), m(W, null, ce(y, (T) => a("button", {
                key: T.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (N) => s(t).setThemePreference(T.value)
              }, [
                a("span", null, o(s(t).label(T.zh, T.en)), 1)
              ], 8, Oh)), 64))
            ])
          ]),
          a("div", Lh, [
            a("button", {
              class: "toolbar-icon",
              type: "button",
              title: s(t).label("语言", "Language")
            }, o(f.value), 9, Uh),
            a("div", Nh, [
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
          s(n).authEnabled && s(n).authenticated ? (g(), m("div", Fh, [
            a("button", {
              class: "toolbar-icon",
              type: "button",
              title: s(t).label("账号", "Account")
            }, " Me ", 8, Gh),
            a("div", Bh, [
              a("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: P
              }, [
                a("span", null, o(s(t).label("设置", "Settings")), 1)
              ]),
              a("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: $[2] || ($[2] = (T) => s(n).openChangePassword())
              }, [
                a("span", null, o(s(t).label("修改密码", "Change password")), 1)
              ]),
              a("button", {
                class: "toolbar-popover__item toolbar-popover__item--danger",
                type: "button",
                onClick: R
              }, [
                a("span", null, o(s(t).label("退出登录", "Sign out")), 1)
              ])
            ])
          ])) : Q("", !0)
        ])
      ]),
      a("div", Vh, [
        a("aside", jh, [
          a("div", zh, [
            a("p", Wh, o(s(t).label("当前页面", "Current page")), 1),
            a("p", Hh, o(C.value), 1),
            a("p", Kh, o(s(t).label(
              "在这里集中处理运维、OpenClaw、渠道、安全和恢复。默认入口已经切到这套模块化控制台。",
              "Manage operations, OpenClaw, channels, security, and recovery from one place. This modular console is now the default entry."
            )), 1),
            a("div", qh, [
              s(i).isDesktop ? (g(), m("span", Jh, o(s(t).label("桌面薄壳", "Desktop thin shell")), 1)) : Q("", !0),
              s(i).isDesktop ? (g(), m("span", {
                key: 1,
                class: oe(["pill", s(i).connected ? "pill--success" : "pill--warning"])
              }, o(s(i).connected ? s(t).label("已连接 Guard", "Guard connected") : s(t).label("Guard 未连接", "Guard offline")), 3)) : Q("", !0)
            ])
          ]),
          a("nav", Qh, [
            (g(), m(W, null, ce(h, (T) => a("section", {
              key: T.id,
              class: "sidebar-group"
            }, [
              a("p", Yh, o(s(t).label(T.zh, T.en)), 1),
              (g(!0), m(W, null, ce(T.items, (N) => (g(), Ue(s(Tt), {
                key: N.to,
                to: N.to,
                class: oe(["sidebar-link", { "sidebar-link--active": s(r).path === N.to }])
              }, {
                default: Z(() => [
                  ft(o(s(t).label(N.zh, N.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ]),
          a("div", Zh, [
            a("p", Xh, o(s(t).label(
              "日常工作都留在这里完成。本地偏好、开发者模式和桌面连接设置都集中在 Settings。",
              "Stay here for day-to-day work. Local preferences, developer mode, and desktop connection settings live in Settings."
            )), 1),
            a("div", ep, [
              K(s(Tt), {
                class: "sidebar-footer__link",
                to: "/settings"
              }, {
                default: Z(() => [
                  ft(o(s(t).label("打开本地设置", "Open local settings")), 1)
                ]),
                _: 1
              }),
              s(t).developerMode ? (g(), m("a", {
                key: 0,
                class: "sidebar-footer__link sidebar-footer__link--muted",
                href: d.value,
                target: "_blank",
                rel: "noreferrer"
              }, o(s(t).label("开发者回退到 legacy", "Open legacy rollback in developer mode")), 9, tp)) : Q("", !0)
            ])
          ])
        ]),
        a("main", np, [
          K(s(sr))
        ])
      ])
    ]));
  }
}), lp = {
  key: 0,
  class: "shell-loading"
}, ap = { class: "page-empty shell-loading__card" }, ip = {
  key: 2,
  class: "shell-loading"
}, op = { class: "page-empty shell-loading__card" }, rp = /* @__PURE__ */ we({
  __name: "App",
  setup(e) {
    const t = Ds(), n = ot(), l = Yn(), i = ke();
    let r = () => {
    };
    return nt(() => {
      i.hydrate(), l.hydrate(), r = ju(() => {
        t.handleUnauthorized(), n.pushToast({
          tone: "warning",
          title: i.label("登录已失效", "Session expired"),
          message: i.label("请重新登录后继续使用 Guard 控制台。", "Sign in again to keep using Guard.")
        });
      });
    }), Ll(() => {
      r();
    }), xe(
      [() => l.ready, () => l.canUseApi],
      ([c, u]) => {
        c && u && t.hydrate();
      },
      { immediate: !0 }
    ), (c, u) => (g(), m(W, null, [
      !s(l).ready || s(l).requiresConnection && s(l).checking ? (g(), m("div", lp, [
        a("div", ap, o(s(i).label("正在准备 Guard 控制台…", "Preparing Guard…")), 1)
      ])) : s(l).requiresConnection ? (g(), Ue(vf, { key: 1 })) : s(t).ready ? s(t).requiresLogin ? (g(), Ue(Ud, { key: 3 })) : (g(), Ue(sp, { key: 4 })) : (g(), m("div", ip, [
        a("div", op, o(s(i).label("正在同步认证状态…", "Checking authentication…")), 1)
      ])),
      K(Kd),
      K(Vd),
      K(vd)
    ], 64));
  }
}), cp = { class: "page-card" }, up = { class: "page-card__header" }, dp = {
  key: 0,
  class: "page-card__eyebrow"
}, fp = { class: "page-card__title" }, hp = { class: "page-card__body" }, le = /* @__PURE__ */ we({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, n) => (g(), m("section", cp, [
      a("header", up, [
        a("div", null, [
          e.eyebrow ? (g(), m("p", dp, o(e.eyebrow), 1)) : Q("", !0),
          a("h2", fp, o(e.title), 1)
        ]),
        ca(t.$slots, "actions")
      ]),
      a("div", hp, [
        ca(t.$slots, "default")
      ])
    ]));
  }
}), pp = { class: "stat-grid" }, gp = { class: "stat-card" }, mp = { class: "stat-card__label" }, bp = { class: "stat-card" }, vp = { class: "stat-card__label" }, yp = { class: "stat-card" }, _p = { class: "stat-card__label" }, wp = { class: "stat-card" }, kp = { class: "stat-card__label" }, $p = /* @__PURE__ */ we({
  __name: "ChannelsOverviewCard",
  props: {
    definitionsCount: {},
    enabledCount: {},
    configuredCount: {},
    feishuPlugin: {}
  },
  setup(e) {
    const t = ke();
    return (n, l) => (g(), Ue(le, {
      title: s(t).label("当前概览", "Current overview"),
      eyebrow: "Summary"
    }, {
      default: Z(() => [
        a("div", pp, [
          a("article", gp, [
            a("p", mp, o(s(t).label("可管理渠道", "Channels")), 1),
            a("strong", null, o(e.definitionsCount), 1),
            a("span", null, o(s(t).label("当前内置和官方入口总数", "Built-in and official entry points available now")), 1)
          ]),
          a("article", bp, [
            a("p", vp, o(s(t).label("已启用", "Enabled")), 1),
            a("strong", null, o(e.enabledCount), 1),
            a("span", null, o(s(t).label("运行态会接收消息", "Receives traffic at runtime")), 1)
          ]),
          a("article", yp, [
            a("p", _p, o(s(t).label("已配置", "Configured")), 1),
            a("strong", null, o(e.configuredCount), 1),
            a("span", null, o(s(t).label("已经填写了字段或本机变量", "Fields or local values already exist")), 1)
          ]),
          a("article", wp, [
            a("p", kp, o(s(t).label("飞书插件", "Feishu plugin")), 1),
            a("strong", null, o(e.feishuPlugin.installed ? s(t).label("已识别", "Detected") : s(t).label("未识别", "Not detected")), 1),
            a("span", null, o(e.feishuPlugin.version || s(t).label("官方渠道仍可直接维护", "Official channel still remains manageable")), 1)
          ])
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), Cp = { class: "page-two-column" }, Sp = { class: "catalog-list" }, Ap = ["onClick"], Rp = { class: "catalog-list__title" }, Tp = { class: "pill-row" }, xp = {
  key: 0,
  class: "page-stack"
}, Pp = { class: "page-inline-status" }, Ep = { class: "muted-copy" }, Dp = { class: "settings-grid" }, Mp = { key: 0 }, Ip = ["onUpdate:modelValue", "type"], Op = ["onUpdate:modelValue"], Lp = ["value"], Up = {
  key: 3,
  class: "checkbox-row"
}, Np = ["onUpdate:modelValue"], Fp = { class: "page-actions" }, Gp = ["disabled"], Bp = ["disabled"], Vp = {
  key: 0,
  class: "list-stack"
}, jp = { class: "action-row" }, zp = { class: "action-row" }, Wp = { class: "action-row" }, Hp = {
  key: 1,
  class: "code-panel"
}, Kp = {
  key: 2,
  class: "muted-copy"
}, qp = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    return (i, r) => (g(), m("div", Cp, [
      K(le, {
        title: s(l).label("渠道目录", "Channel catalog"),
        eyebrow: "Catalog"
      }, {
        default: Z(() => [
          a("div", Sp, [
            (g(!0), m(W, null, ce(e.catalogItems, (c) => (g(), m("button", {
              key: c.definition.id,
              class: oe(["catalog-list__item", { "catalog-list__item--active": e.selectedId === c.definition.id }]),
              type: "button",
              onClick: (u) => n("update:selectedId", c.definition.id)
            }, [
              a("div", Rp, [
                a("strong", null, o(`${c.definition.icon} ${c.definition.name}`), 1)
              ]),
              a("div", Tp, [
                a("span", {
                  class: oe(["pill", c.enabled ? "pill--success" : "pill--warning"])
                }, o(c.enabled ? s(l).label("已启用", "Enabled") : s(l).label("停用", "Disabled")), 3),
                a("span", {
                  class: oe(["pill", c.configured ? "pill--success" : "pill--muted"])
                }, o(c.configured ? s(l).label("已配置", "Configured") : s(l).label("未配置", "Empty")), 3)
              ])
            ], 10, Ap))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      e.selectedChannel ? (g(), m("div", xp, [
        K(le, {
          title: e.selectedChannel.name,
          eyebrow: "Editor"
        }, {
          default: Z(() => [
            a("div", Pp, [
              a("span", {
                class: oe(["pill", e.selectedChannel.enabled ? "pill--success" : "pill--warning"])
              }, o(e.selectedChannel.enabled ? s(l).label("正在接收消息", "Receiving traffic") : s(l).label("当前停用", "Currently disabled")), 3),
              a("span", {
                class: oe(["pill", e.selectedChannel.configured ? "pill--success" : "pill--muted"])
              }, o(e.selectedChannel.configured ? s(l).label("配置已完成", "Configured") : s(l).label("还未配置", "Not configured")), 3)
            ]),
            a("p", Ep, o(e.statusMessage), 1),
            a("div", Dp, [
              (g(!0), m(W, null, ce(e.fieldDescriptors, (c) => (g(), m("label", {
                key: c.key,
                class: "settings-field"
              }, [
                a("span", null, o(c.label), 1),
                c.help ? (g(), m("small", Mp, o(c.help), 1)) : Q("", !0),
                c.kind === "text" && c.inputType !== "select" ? pe((g(), m("input", {
                  key: 1,
                  "onUpdate:modelValue": (u) => e.textDraft[c.key] = u,
                  class: "settings-input",
                  type: c.inputType || "text"
                }, null, 8, Ip)), [
                  [Cu, e.textDraft[c.key]]
                ]) : c.kind === "text" && c.inputType === "select" ? pe((g(), m("select", {
                  key: 2,
                  "onUpdate:modelValue": (u) => e.textDraft[c.key] = u,
                  class: "settings-input"
                }, [
                  (g(!0), m(W, null, ce(c.options, (u) => (g(), m("option", {
                    key: u.value,
                    value: u.value
                  }, o(u.label), 9, Lp))), 128))
                ], 8, Op)), [
                  [mt, e.textDraft[c.key]]
                ]) : (g(), m("label", Up, [
                  pe(a("input", {
                    "onUpdate:modelValue": (u) => e.boolDraft[c.key] = u,
                    type: "checkbox"
                  }, null, 8, Np), [
                    [Gt, e.boolDraft[c.key]]
                  ]),
                  a("span", null, o(c.help || s(l).label("勾选即启用。", "Checked means enabled.")), 1)
                ]))
              ]))), 128))
            ]),
            a("div", Fp, [
              a("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: e.saving,
                onClick: r[0] || (r[0] = (c) => n("save"))
              }, o(e.saving ? s(l).label("保存中…", "Saving…") : s(l).label("保存渠道配置", "Save channel configuration")), 9, Gp),
              a("button", {
                class: "inline-link",
                type: "button",
                onClick: r[1] || (r[1] = (c) => n("reset"))
              }, o(s(l).label("恢复当前值", "Reset draft")), 1),
              a("button", {
                class: "inline-link inline-link--danger",
                type: "button",
                disabled: e.clearing,
                onClick: r[2] || (r[2] = (c) => n("clear"))
              }, o(e.clearing ? s(l).label("清空中…", "Clearing…") : s(l).label("清空配置", "Clear configuration")), 9, Bp)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(l).label("配置摘要", "Configuration summary"),
          eyebrow: "Summary"
        }, {
          default: Z(() => [
            e.selectedDefinition ? (g(), m("div", Vp, [
              a("article", jp, [
                a("div", null, [
                  a("h3", null, o(s(l).label("普通字段", "Regular fields")), 1),
                  a("p", null, o(s(l).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                ]),
                a("strong", null, o(e.selectedDefinition.fields.length), 1)
              ]),
              a("article", zp, [
                a("div", null, [
                  a("h3", null, o(s(l).label("本机变量", "Local secrets")), 1),
                  a("p", null, o(s(l).label("敏感值优先以本机变量方式保存，便于后续替换或清空。", "Sensitive values are best stored as local variables so they can be rotated or cleared later.")), 1)
                ]),
                a("strong", null, o(e.selectedDefinition.envFields.length), 1)
              ]),
              a("article", Wp, [
                a("div", null, [
                  a("h3", null, o(s(l).label("当前草稿", "Current draft")), 1),
                  a("p", null, o(s(l).label("这里只显示你现在编辑中的内容，不会自动写入运行态。", "This only shows the values you are editing now. Nothing reaches runtime until you save.")), 1)
                ]),
                a("strong", null, o(e.selectedChannel.id), 1)
              ])
            ])) : Q("", !0),
            s(l).developerMode ? (g(), m("pre", Hp, o(JSON.stringify(e.draftPreview, null, 2)), 1)) : (g(), m("p", Kp, o(s(l).label("当前草稿的原始配置预览已收纳到开发者模式里。需要排查字段写入结果时，请先到 Settings 打开开发者模式。", "The raw draft preview now stays behind developer mode. Enable it from Settings when you need to inspect the exact payload.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ])) : Q("", !0)
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
function de(e) {
  return e == null || !Number.isFinite(e) ? "-" : new Intl.NumberFormat(void 0).format(e);
}
function Jp(e) {
  return e == null || !Number.isFinite(e) ? "-" : `${e.toFixed(e >= 10 ? 0 : 1)}%`;
}
function Qp(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "-";
  if (e < 1024) return `${de(e)} B`;
  const t = ["KB", "MB", "GB", "TB"];
  let n = e / 1024, l = 0;
  for (; n >= 1024 && l < t.length - 1; )
    n /= 1024, l += 1;
  return `${n.toFixed(n >= 10 ? 1 : 2)} ${t[l]}`;
}
function li(e, t = "USD") {
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
function ai(e) {
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
function Yp(e) {
  return typeof e == "boolean" ? e : typeof e == "string" ? ["true", "1", "yes", "on"].includes(e.trim().toLowerCase()) : !1;
}
function ms(e) {
  const t = e.trim();
  if (!t) return;
  const n = Number(t);
  return Number.isFinite(n) ? n : void 0;
}
function ii(e) {
  return /token|secret|key|password/i.test(e);
}
async function Zp() {
  const [e, t, n] = await Promise.all([
    Pe("/api/channels"),
    Pe("/api/channels/meta"),
    Pe("/api/feishu/plugin").catch(() => ({ installed: !1 }))
  ]);
  return {
    channels: e,
    definitions: t,
    feishuPlugin: n
  };
}
function Xp(e, t) {
  return Ie(`/api/channels/${encodeURIComponent(e)}`, t);
}
function eg(e) {
  return ql(`/api/channels/${encodeURIComponent(e)}`);
}
function ct(e, t = null, n = {}) {
  const l = /* @__PURE__ */ F(t), i = n.immediate !== !1, r = /* @__PURE__ */ F(i && t === null), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(null);
  async function d(f = {}) {
    f.silent === !0 ? c.value = !0 : r.value = !0, u.value = null;
    try {
      l.value = await e();
    } catch (p) {
      u.value = p instanceof Error ? p.message : String(p);
    } finally {
      r.value = !1, c.value = !1;
    }
  }
  return nt(() => {
    i && d();
  }), Ml({
    data: l,
    loading: r,
    refreshing: c,
    error: u,
    execute: d
  });
}
const oi = {
  connectionMode: ["websocket", "webhook"],
  dmPolicy: ["open", "allowlist", "closed"],
  groupPolicy: ["open", "allowlist", "closed"],
  renderMode: ["auto", "rich", "compact"]
};
let ri = null;
function tg() {
  const e = ke(), t = ot(), n = ct(() => Zp(), ri, {
    immediate: !1
  }), l = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ ht({}), u = /* @__PURE__ */ ht({}), d = D(
    () => {
      var b;
      return new Map((((b = n.data) == null ? void 0 : b.channels) || []).map((S) => [S.id, S]));
    }
  ), f = D(
    () => {
      var b;
      return new Map(
        (((b = n.data) == null ? void 0 : b.definitions) || []).map((S) => [S.id, S])
      );
    }
  ), h = D(() => {
    var b, S;
    return f.value.get(l.value) || ((S = (b = n.data) == null ? void 0 : b.definitions) == null ? void 0 : S[0]) || null;
  }), p = D(() => {
    const b = h.value;
    return b ? d.value.get(b.id) || {
      id: b.id,
      name: b.name,
      icon: b.icon,
      enabled: !1,
      configured: !1,
      config: {}
    } : null;
  }), y = D(
    () => {
      var b;
      return (((b = n.data) == null ? void 0 : b.channels) || []).filter((S) => S.enabled).length;
    }
  ), v = D(
    () => {
      var b;
      return (((b = n.data) == null ? void 0 : b.channels) || []).filter((S) => S.configured).length;
    }
  ), C = D(
    () => {
      var b;
      return (((b = n.data) == null ? void 0 : b.definitions) || []).map((S) => {
        const E = d.value.get(S.id);
        return {
          definition: S,
          enabled: (E == null ? void 0 : E.enabled) === !0,
          configured: (E == null ? void 0 : E.configured) === !0
        };
      });
    }
  ), P = D(() => {
    const b = h.value, S = [
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
    for (const E of (b == null ? void 0 : b.fields) || []) {
      if (E === "requireMention" || E === "streaming") {
        S.push({
          key: E,
          label: ns(E),
          kind: "boolean",
          help: e.label("勾选即启用。", "Checked means enabled.")
        });
        continue;
      }
      if (oi[E]) {
        S.push({
          key: E,
          label: ns(E),
          kind: "text",
          inputType: "select",
          options: oi[E].map((z) => ({
            value: z,
            label: z
          }))
        });
        continue;
      }
      S.push({
        key: E,
        label: ns(E),
        kind: "text",
        inputType: /port/i.test(E) ? "number" : ii(E) ? "password" : "text"
      });
    }
    for (const E of (b == null ? void 0 : b.envFields) || [])
      S.push({
        key: `env:${E}`,
        label: `${ns(E)} (${E})`,
        kind: "text",
        inputType: "password",
        env: !0,
        help: e.label(
          "留空会清除这个本机环境变量。",
          "Leave blank to clear this local environment variable."
        )
      });
    return S;
  }), R = D(() => {
    const b = p.value;
    return b ? b.id === "feishu" ? b.enabled ? e.label(
      "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
      "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
    ) : e.label(
      "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
      "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
    ) : b.enabled ? e.label(
      "保存后会直接更新当前消息入口配置。",
      "Saving here updates the live channel configuration immediately."
    ) : e.label(
      "这个消息入口当前停用中。可以先补齐配置，再决定是否启用。",
      "This channel is currently disabled. Finish the settings first, then decide whether to enable it."
    ) : "";
  }), x = D(() => ({
    enabled: u.enabled === !0,
    fields: Object.fromEntries(
      Object.keys(c).filter((b) => !b.startsWith("env:")).map((b) => [
        b,
        ii(b) && c[b] ? "******" : c[b] ?? ""
      ])
    ),
    envFields: Object.fromEntries(
      Object.keys(c).filter((b) => b.startsWith("env:")).map((b) => [b, c[b] ? "******" : ""])
    )
  }));
  function $() {
    for (const b of Object.keys(c))
      delete c[b];
    for (const b of Object.keys(u))
      delete u[b];
  }
  function T() {
    var E, z;
    $();
    const b = p.value, S = h.value;
    if (!(!b || !S)) {
      u.enabled = b.enabled === !0;
      for (const j of S.fields) {
        const me = (E = b.config) == null ? void 0 : E[j];
        j === "requireMention" || j === "streaming" ? u[j] = Yp(me) : c[j] = me == null ? "" : String(me);
      }
      for (const j of S.envFields) {
        const me = `env:${j}`;
        c[me] = ((z = b.config) == null ? void 0 : z[me]) == null ? "" : String(b.config[me]);
      }
    }
  }
  xe(
    () => n.data,
    (b) => {
      b && (ri = b);
      const S = (b == null ? void 0 : b.definitions) || [];
      if (S.length) {
        if (!l.value || !f.value.has(l.value)) {
          l.value = S[0].id;
          return;
        }
        T();
      }
    },
    { immediate: !0 }
  ), xe(l, () => {
    T();
  }), nt(() => {
    n.execute({ silent: !!n.data });
  });
  async function N() {
    await n.execute({ silent: !0 });
  }
  async function O() {
    const b = p.value, S = h.value;
    if (!(!b || !S)) {
      i.value = !0;
      try {
        const E = {
          enabled: u.enabled === !0
        };
        for (const j of S.fields) {
          if (j === "requireMention" || j === "streaming") {
            E[j] = u[j] === !0;
            continue;
          }
          const me = c[j] ?? "";
          /port/i.test(j) ? E[j] = ms(me) ?? "" : E[j] = me;
        }
        for (const j of S.envFields)
          E[`env:${j}`] = c[`env:${j}`] ?? "";
        const z = await Xp(b.id, E);
        t.pushToast({
          tone: z.success ? "success" : "error",
          message: z.message
        }), await N();
      } catch (E) {
        t.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        });
      } finally {
        i.value = !1;
      }
    }
  }
  async function ee() {
    const b = p.value;
    if (!(!b || !await t.confirm({
      title: e.label("清空渠道配置", "Clear channel configuration"),
      message: e.label(
        `确认清空 ${b.name || b.id} 的配置吗？这会移除本机保存的字段和值。`,
        `Clear the configuration for ${b.name || b.id}? This removes the saved local values for this channel.`
      ),
      confirmLabel: e.label("确认清空", "Clear configuration"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    }))) {
      r.value = !0;
      try {
        const E = await eg(b.id);
        t.pushToast({
          tone: E.success ? "success" : "error",
          message: E.message
        }), await N();
      } catch (E) {
        t.pushToast({
          tone: "error",
          message: E instanceof Error ? E.message : String(E)
        });
      } finally {
        r.value = !1;
      }
    }
  }
  return {
    resource: n,
    selectedId: l,
    saving: i,
    clearing: r,
    textDraft: c,
    boolDraft: u,
    catalogItems: C,
    selectedDefinition: h,
    selectedChannel: p,
    enabledCount: y,
    configuredCount: v,
    fieldDescriptors: P,
    statusMessage: R,
    draftPreview: x,
    refresh: N,
    hydrateDraft: T,
    handleSave: O,
    handleClear: ee
  };
}
const ng = { class: "page-stack" }, sg = { class: "page-header" }, lg = { class: "page-header__eyebrow" }, ag = { class: "page-header__title" }, ig = { class: "page-header__description" }, og = {
  key: 0,
  class: "page-empty"
}, rg = {
  key: 1,
  class: "page-empty page-empty--error"
}, cg = {
  key: 0,
  class: "status-banner status-banner--warning"
}, ug = /* @__PURE__ */ we({
  __name: "ChannelsPage",
  setup(e) {
    const t = ke(), {
      resource: n,
      selectedId: l,
      saving: i,
      clearing: r,
      textDraft: c,
      boolDraft: u,
      catalogItems: d,
      selectedDefinition: f,
      selectedChannel: h,
      enabledCount: p,
      configuredCount: y,
      fieldDescriptors: v,
      statusMessage: C,
      draftPreview: P,
      refresh: R,
      hydrateDraft: x,
      handleSave: $,
      handleClear: T
    } = tg();
    return (N, O) => (g(), m("div", ng, [
      a("header", sg, [
        a("div", null, [
          a("p", lg, o(s(t).label("渠道 / 接入", "Channels / Connections")), 1),
          a("h2", ag, o(s(t).label("渠道管理", "Channel management")), 1),
          a("p", ig, o(s(t).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: O[0] || (O[0] = //@ts-ignore
          (...ee) => s(R) && s(R)(...ee))
        }, o(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新", "Refresh")), 1)
      ]),
      s(n).loading && !s(n).data ? (g(), m("div", og, o(s(t).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", rg, o(s(n).error), 1)) : s(n).data && s(h) ? (g(), m(W, { key: 2 }, [
        s(n).error ? (g(), m("div", cg, o(s(t).label("已保留上一版渠道快照，但后台刷新失败：", "The last channel snapshot is still on screen, but the background refresh failed: ")) + o(s(n).error), 1)) : Q("", !0),
        K($p, {
          "definitions-count": s(n).data.definitions.length,
          "enabled-count": s(p),
          "configured-count": s(y),
          "feishu-plugin": s(n).data.feishuPlugin
        }, null, 8, ["definitions-count", "enabled-count", "configured-count", "feishu-plugin"]),
        K(qp, {
          "catalog-items": s(d),
          "selected-id": s(l),
          "selected-definition": s(f),
          "selected-channel": s(h),
          "field-descriptors": s(v),
          "text-draft": s(c),
          "bool-draft": s(u),
          saving: s(i),
          clearing: s(r),
          "status-message": s(C),
          "draft-preview": s(P),
          "onUpdate:selectedId": O[1] || (O[1] = (ee) => l.value = ee),
          onSave: s($),
          onReset: s(x),
          onClear: s(T)
        }, null, 8, ["catalog-items", "selected-id", "selected-definition", "selected-channel", "field-descriptors", "text-draft", "bool-draft", "saving", "clearing", "status-message", "draft-preview", "onSave", "onReset", "onClear"])
      ], 64)) : Q("", !0)
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
function ci(e) {
  const t = Number(e);
  return !Number.isFinite(t) || t <= 0 ? "" : t % 864e5 === 0 ? `${t / 864e5}d` : t % 36e5 === 0 ? `${t / 36e5}h` : t % 6e4 === 0 ? `${t / 6e4}m` : t % 1e3 === 0 ? `${t / 1e3}s` : String(t);
}
function dg(e) {
  const t = e.raw || {}, n = t.payload || {}, l = t.schedule || {}, i = _l();
  return l.kind === "every" ? (i.scheduleMode = "every", i.scheduleValue = ci(l.everyMs)) : l.kind === "at" ? (i.scheduleMode = "at", i.scheduleValue = String(l.at || "")) : l.kind === "cron" && (i.scheduleMode = "cron", i.scheduleValue = String(l.expr || "")), !i.scheduleValue && typeof e.schedule == "string" && (e.schedule.startsWith("cron ") ? (i.scheduleMode = "cron", i.scheduleValue = e.schedule.slice(5).trim()) : e.schedule.startsWith("every ") ? (i.scheduleMode = "every", i.scheduleValue = e.schedule.slice(6).trim()) : e.schedule.startsWith("at ") ? (i.scheduleMode = "at", i.scheduleValue = e.schedule.slice(3).trim()) : i.scheduleValue = e.schedule.trim()), i.stagger = ci(l.staggerMs), i.name = String(t.name || e.name || ""), i.description = String(t.description || ""), i.agentId = String(t.agentId || e.agentId || ""), i.prompt = String(n.message || n.text || t.message || e.prompt || ""), i.enabled = e.enabled !== !1, i.timezone = String(t.tz || ""), i.model = String(t.model || n.model || ""), i.thinking = String(t.thinking || n.thinking || ""), i.session = String(t.session || n.session || i.session), i.wake = String(t.wake || i.wake), i.timeoutSeconds = t.timeoutSeconds ? String(t.timeoutSeconds) : i.timeoutSeconds, i.announce = t.announce === !0 || t.deliver === !0, i.bestEffortDeliver = t.bestEffortDeliver === !0, i.deleteAfterRun = t.deleteAfterRun === !0, i;
}
function fg(e, t) {
  return t === !0 ? e.label("已启用", "Enabled") : t === !1 ? e.label("已停用", "Disabled") : e.label("未知", "Unknown");
}
function hg(e, t, n) {
  return n ? n.schedulerNextWakeAt ? Qe(n.schedulerNextWakeAt) : t && n.storePath ? n.storePath : n.enabled === !0 ? e.label(
    "调度器已启用，但下一次唤醒时间暂未返回。",
    "The scheduler is enabled, but the next wake time has not been reported yet."
  ) : n.enabled === !1 ? e.label("调度器当前已停用。", "The scheduler is currently disabled.") : e.label(
    "调度器路径已收纳到开发者模式。",
    "The scheduler path stays behind developer mode."
  ) : e.label("调度器详情暂缺。", "Scheduler details are missing.");
}
function pg(e, t) {
  const n = String(t.status || "").trim().toLowerCase();
  if (!n) return t.enabled ? e.label("已启用", "Enabled") : e.label("已停用", "Disabled");
  const i = {
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
  return i ? e.label(i.zh, i.en) : n;
}
function gg(e) {
  const t = String(e.status || "").trim().toLowerCase();
  return ["running", "success", "completed", "enabled"].includes(t) ? "pill--success" : ["queued", "pending", "paused", "disabled"].includes(t) || e.enabled === !1 ? "pill--warning" : ["failed", "error"].includes(t) ? "pill--danger" : e.enabled ? "pill--info" : "pill--warning";
}
function mg(e) {
  return e === "every" ? "10m / 1h" : e === "at" ? "2026-03-20T09:00:00+08:00" : "0 9 * * *";
}
function bg(e) {
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
const vg = { class: "provider-card__header" }, yg = { class: "muted-copy" }, _g = { class: "settings-grid settings-grid--wide" }, wg = { class: "settings-field" }, kg = ["placeholder"], $g = { class: "settings-field" }, Cg = ["placeholder"], Sg = { class: "settings-field" }, Ag = { class: "settings-field" }, Rg = ["placeholder"], Tg = { class: "settings-field" }, xg = { class: "settings-field" }, Pg = { class: "settings-field" }, Eg = ["placeholder"], Dg = { class: "settings-field" }, Mg = { value: "" }, Ig = { class: "settings-field" }, Og = { class: "settings-field" }, Lg = { class: "settings-field" }, Ug = ["placeholder"], Ng = { class: "settings-field settings-field--full" }, Fg = ["placeholder"], Gg = { class: "settings-field settings-field--full" }, Bg = ["placeholder"], Vg = { class: "checkbox-grid" }, jg = { class: "checkbox-card" }, zg = { class: "checkbox-card__body" }, Wg = { class: "checkbox-card" }, Hg = { class: "checkbox-card__body" }, Kg = { class: "checkbox-card" }, qg = { class: "checkbox-card__body" }, Jg = { class: "checkbox-card" }, Qg = { class: "checkbox-card__body" }, Yg = { class: "page-actions" }, Zg = ["disabled"], Xg = /* @__PURE__ */ we({
  __name: "CronEditorSection",
  props: {
    draft: {},
    editorMode: {},
    editingJobId: {},
    runningAction: {}
  },
  emits: ["submit", "reset"],
  setup(e) {
    const t = e, n = ke(), l = D(
      () => t.runningAction === "create" || t.runningAction === "update"
    ), i = D(() => mg(t.draft.scheduleMode));
    return (r, c) => (g(), Ue(le, {
      title: e.editorMode === "edit" ? s(n).label(`编辑任务 ${e.editingJobId}`, `Edit ${e.editingJobId}`) : s(n).label("新建 Cron 任务", "Create cron job"),
      eyebrow: "Editor"
    }, {
      default: Z(() => [
        a("div", vg, [
          a("p", yg, o(s(n).label(
            "这里直接复用现有的 cron-ui 接口，所以保存后的任务会立刻回到同一套运行态里，不会产生第二套自动化系统。",
            "This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system."
          )), 1),
          a("span", {
            "data-testid": "cron-editor-mode",
            class: oe(["pill", e.editorMode === "edit" ? "pill--warning" : "pill--success"])
          }, o(e.editorMode === "edit" ? s(n).label("编辑模式", "Edit mode") : s(n).label("创建模式", "Create mode")), 3)
        ]),
        a("form", {
          class: "page-form-stack",
          onSubmit: c[17] || (c[17] = kn((u) => r.$emit("submit"), ["prevent"]))
        }, [
          a("div", _g, [
            a("label", wg, [
              a("span", null, o(s(n).label("任务名称", "Job name")), 1),
              pe(a("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => e.draft.name = u),
                "data-testid": "cron-editor-name",
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("例如：每日汇总", "Example: Daily brief")
              }, null, 8, kg), [
                [Re, e.draft.name]
              ])
            ]),
            a("label", $g, [
              a("span", null, o(s(n).label("Agent ID", "Agent ID")), 1),
              pe(a("input", {
                "onUpdate:modelValue": c[1] || (c[1] = (u) => e.draft.agentId = u),
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("例如：task-hub", "Example: task-hub")
              }, null, 8, Cg), [
                [Re, e.draft.agentId]
              ])
            ]),
            a("label", Sg, [
              a("span", null, o(s(n).label("调度类型", "Schedule mode")), 1),
              pe(a("select", {
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
            a("label", Ag, [
              a("span", null, o(s(n).label("调度值", "Schedule value")), 1),
              pe(a("input", {
                "onUpdate:modelValue": c[3] || (c[3] = (u) => e.draft.scheduleValue = u),
                class: "settings-input",
                type: "text",
                placeholder: i.value
              }, null, 8, Rg), [
                [Re, e.draft.scheduleValue]
              ]),
              a("small", null, o(s(n).label(
                "cron 用 5 段表达式；every 例如 10m / 1h；at 支持 ISO 时间或 +20m。",
                "Use a 5-field cron expression, 10m / 1h for every, or ISO time / +20m for at."
              )), 1)
            ]),
            a("label", Tg, [
              a("span", null, o(s(n).label("时区", "Timezone")), 1),
              pe(a("input", {
                "onUpdate:modelValue": c[4] || (c[4] = (u) => e.draft.timezone = u),
                class: "settings-input",
                type: "text",
                placeholder: "Asia/Shanghai"
              }, null, 512), [
                [Re, e.draft.timezone]
              ])
            ]),
            a("label", xg, [
              a("span", null, o(s(n).label("会话模式", "Session mode")), 1),
              pe(a("select", {
                "onUpdate:modelValue": c[5] || (c[5] = (u) => e.draft.session = u),
                class: "settings-input"
              }, [...c[21] || (c[21] = [
                a("option", { value: "main" }, "main", -1),
                a("option", { value: "isolated" }, "isolated", -1)
              ])], 512), [
                [mt, e.draft.session]
              ])
            ]),
            a("label", Pg, [
              a("span", null, o(s(n).label("模型覆盖", "Model override")), 1),
              pe(a("input", {
                "onUpdate:modelValue": c[6] || (c[6] = (u) => e.draft.model = u),
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("留空则使用 Agent 默认模型", "Leave blank to use the agent default")
              }, null, 8, Eg), [
                [Re, e.draft.model]
              ])
            ]),
            a("label", Dg, [
              a("span", null, o(s(n).label("Thinking 等级", "Thinking level")), 1),
              pe(a("select", {
                "onUpdate:modelValue": c[7] || (c[7] = (u) => e.draft.thinking = u),
                class: "settings-input"
              }, [
                a("option", Mg, o(s(n).label("跟随默认", "Use default")), 1),
                c[22] || (c[22] = a("option", { value: "off" }, "off", -1)),
                c[23] || (c[23] = a("option", { value: "minimal" }, "minimal", -1)),
                c[24] || (c[24] = a("option", { value: "low" }, "low", -1)),
                c[25] || (c[25] = a("option", { value: "medium" }, "medium", -1)),
                c[26] || (c[26] = a("option", { value: "high" }, "high", -1))
              ], 512), [
                [mt, e.draft.thinking]
              ])
            ]),
            a("label", Ig, [
              a("span", null, o(s(n).label("唤醒时机", "Wake mode")), 1),
              pe(a("select", {
                "onUpdate:modelValue": c[8] || (c[8] = (u) => e.draft.wake = u),
                class: "settings-input"
              }, [...c[27] || (c[27] = [
                a("option", { value: "now" }, "now", -1),
                a("option", { value: "next-heartbeat" }, "next-heartbeat", -1)
              ])], 512), [
                [mt, e.draft.wake]
              ])
            ]),
            a("label", Og, [
              a("span", null, o(s(n).label("超时（秒）", "Timeout (seconds)")), 1),
              pe(a("input", {
                "onUpdate:modelValue": c[9] || (c[9] = (u) => e.draft.timeoutSeconds = u),
                class: "settings-input",
                type: "number",
                min: "1",
                placeholder: "30"
              }, null, 512), [
                [Re, e.draft.timeoutSeconds]
              ])
            ]),
            a("label", Lg, [
              a("span", null, o(s(n).label("错峰", "Stagger")), 1),
              pe(a("input", {
                "onUpdate:modelValue": c[10] || (c[10] = (u) => e.draft.stagger = u),
                class: "settings-input",
                type: "text",
                placeholder: s(n).label("例如：5m，填 0 表示精确执行", "Example: 5m, use 0 for exact timing")
              }, null, 8, Ug), [
                [Re, e.draft.stagger]
              ])
            ]),
            a("label", Ng, [
              a("span", null, o(s(n).label("任务消息", "Prompt")), 1),
              pe(a("textarea", {
                "onUpdate:modelValue": c[11] || (c[11] = (u) => e.draft.prompt = u),
                class: "settings-textarea",
                placeholder: s(n).label("例如：汇总今天的新线索并输出为 Markdown。", "Example: Summarize today’s new leads in Markdown.")
              }, null, 8, Fg), [
                [Re, e.draft.prompt]
              ])
            ]),
            a("label", Gg, [
              a("span", null, o(s(n).label("描述", "Description")), 1),
              pe(a("textarea", {
                "onUpdate:modelValue": c[12] || (c[12] = (u) => e.draft.description = u),
                class: "settings-textarea",
                placeholder: s(n).label("可选，用来解释这个任务的用途。", "Optional note explaining what this job is for.")
              }, null, 8, Bg), [
                [Re, e.draft.description]
              ])
            ])
          ]),
          a("div", Vg, [
            a("label", jg, [
              pe(a("input", {
                "onUpdate:modelValue": c[13] || (c[13] = (u) => e.draft.enabled = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.enabled]
              ]),
              a("div", zg, [
                a("strong", null, o(s(n).label("保存后立即启用", "Enable after save")), 1),
                a("p", null, o(s(n).label("关闭时任务会保留，但不会按计划自动执行。", "When disabled, the job stays available but will not run automatically.")), 1)
              ])
            ]),
            a("label", Wg, [
              pe(a("input", {
                "onUpdate:modelValue": c[14] || (c[14] = (u) => e.draft.announce = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.announce]
              ]),
              a("div", Hg, [
                a("strong", null, o(s(n).label("投递结果", "Deliver output")), 1),
                a("p", null, o(s(n).label("执行完成后尝试把结果投递回会话或目标渠道。", "Try to deliver the result back to the session or target channel after execution.")), 1)
              ])
            ]),
            a("label", Kg, [
              pe(a("input", {
                "onUpdate:modelValue": c[15] || (c[15] = (u) => e.draft.bestEffortDeliver = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.bestEffortDeliver]
              ]),
              a("div", qg, [
                a("strong", null, o(s(n).label("尽力投递", "Best effort deliver")), 1),
                a("p", null, o(s(n).label("当目标暂时不可用时，尽量保留或稍后交付结果。", "Keep or retry delivery when the target is temporarily unavailable.")), 1)
              ])
            ]),
            a("label", Jg, [
              pe(a("input", {
                "onUpdate:modelValue": c[16] || (c[16] = (u) => e.draft.deleteAfterRun = u),
                type: "checkbox"
              }, null, 512), [
                [Gt, e.draft.deleteAfterRun]
              ]),
              a("div", Qg, [
                a("strong", null, o(s(n).label("运行后删除", "Delete after run")), 1),
                a("p", null, o(s(n).label("适合一次性任务；普通巡检或日报不建议开启。", "Useful for one-off jobs. Leave it off for recurring inspections or briefs.")), 1)
              ])
            ])
          ])
        ], 32),
        a("div", Yg, [
          a("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: l.value,
            onClick: c[18] || (c[18] = (u) => r.$emit("submit"))
          }, o(l.value ? s(n).label("保存中…", "Saving…") : e.editorMode === "edit" ? s(n).label("保存修改", "Save changes") : s(n).label("创建任务", "Create job")), 9, Zg),
          a("button", {
            "data-testid": "cron-editor-reset",
            class: "inline-link",
            type: "button",
            onClick: c[19] || (c[19] = (u) => r.$emit("reset"))
          }, o(e.editorMode === "edit" ? s(n).label("切回创建模式", "Switch to create mode") : s(n).label("重置表单", "Reset form")), 1)
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), em = { class: "control-grid" }, tm = { class: "settings-field" }, nm = ["value", "placeholder"], sm = { class: "pill-row" }, lm = {
  key: 0,
  class: "provider-stack"
}, am = ["data-job-id"], im = { class: "provider-card__header" }, om = { class: "mini-list" }, rm = { class: "mini-list__item mini-list__item--stack" }, cm = { class: "mini-list__item mini-list__item--stack" }, um = { class: "mini-list__item mini-list__item--stack" }, dm = { class: "page-actions" }, fm = ["onClick"], hm = ["disabled", "onClick"], pm = ["disabled", "onClick"], gm = ["disabled", "onClick"], mm = {
  key: 1,
  class: "page-empty"
}, bm = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    function i(c) {
      n("update:searchQuery", c.target.value);
    }
    function r(c, u) {
      n("action", { action: c, job: u });
    }
    return (c, u) => (g(), Ue(le, {
      title: s(l).label("任务列表", "Job list"),
      eyebrow: "Jobs"
    }, {
      default: Z(() => [
        a("div", em, [
          a("label", tm, [
            a("span", null, o(s(l).label("搜索", "Search")), 1),
            a("input", {
              value: e.searchQuery,
              "data-testid": "cron-search-input",
              class: "settings-input",
              type: "text",
              placeholder: s(l).label("搜索任务名、Agent、调度表达式", "Search by name, agent, or schedule"),
              onInput: i
            }, null, 40, nm)
          ])
        ]),
        a("div", sm, [
          a("button", {
            "data-testid": "cron-filter-all",
            class: oe(["pill-button", { "pill-button--active": e.filter === "all" }]),
            type: "button",
            onClick: u[0] || (u[0] = (d) => c.$emit("update:filter", "all"))
          }, o(s(l).label(`全部 (${e.jobs.length})`, `All (${e.jobs.length})`)), 3),
          a("button", {
            "data-testid": "cron-filter-enabled",
            class: oe(["pill-button", { "pill-button--active": e.filter === "enabled" }]),
            type: "button",
            onClick: u[1] || (u[1] = (d) => c.$emit("update:filter", "enabled"))
          }, o(s(l).label(`启用中 (${e.enabledJobs.length})`, `Enabled (${e.enabledJobs.length})`)), 3),
          a("button", {
            "data-testid": "cron-filter-disabled",
            class: oe(["pill-button", { "pill-button--active": e.filter === "disabled" }]),
            type: "button",
            onClick: u[2] || (u[2] = (d) => c.$emit("update:filter", "disabled"))
          }, o(s(l).label(`已停用 (${e.disabledJobs.length})`, `Disabled (${e.disabledJobs.length})`)), 3)
        ]),
        e.filteredJobs.length ? (g(), m("div", lm, [
          (g(!0), m(W, null, ce(e.filteredJobs, (d) => (g(), m("article", {
            key: d.id,
            class: "provider-card",
            "data-testid": "cron-job-card",
            "data-job-id": d.id
          }, [
            a("header", im, [
              a("div", null, [
                a("strong", null, o(d.name || d.id), 1),
                a("p", null, o(`${d.id} · ${d.agentId}`), 1)
              ]),
              a("span", {
                class: oe(["pill", s(gg)(d)])
              }, o(s(pg)(s(l), d)), 3)
            ]),
            a("div", om, [
              a("div", rm, [
                a("strong", null, o(s(l).label("调度", "Schedule")), 1),
                a("p", null, o(d.schedule || "-"), 1)
              ]),
              a("div", cm, [
                a("strong", null, o(s(l).label("任务消息", "Prompt")), 1),
                a("p", null, o(d.prompt || "-"), 1)
              ]),
              a("div", um, [
                a("strong", null, o(s(l).label("最近执行", "Last run")), 1),
                a("p", null, o(s(Qe)(d.lastRunAt)), 1),
                a("p", null, o(s(l).label("下次执行：", "Next run: ")) + o(s(Qe)(d.nextRunAt)), 1)
              ])
            ]),
            a("div", dm, [
              a("button", {
                "data-testid": "cron-job-edit",
                class: "inline-link",
                type: "button",
                onClick: (f) => c.$emit("edit", d)
              }, o(s(l).label("编辑", "Edit")), 9, fm),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: e.runningAction === `run:${d.id}`,
                onClick: (f) => r("run", d)
              }, o(e.runningAction === `run:${d.id}` ? s(l).label("执行中…", "Running…") : s(l).label("立即运行", "Run now")), 9, hm),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: e.runningAction === `enable:${d.id}` || e.runningAction === `disable:${d.id}`,
                onClick: (f) => r(d.enabled ? "disable" : "enable", d)
              }, o(e.runningAction === `enable:${d.id}` || e.runningAction === `disable:${d.id}` ? s(l).label("处理中…", "Working…") : d.enabled ? s(l).label("停用", "Disable") : s(l).label("启用", "Enable")), 9, pm),
              a("button", {
                class: "inline-link inline-link--danger",
                type: "button",
                disabled: e.runningAction === `remove:${d.id}`,
                onClick: (f) => r("remove", d)
              }, o(e.runningAction === `remove:${d.id}` ? s(l).label("删除中…", "Deleting…") : s(l).label("删除", "Delete")), 9, gm)
            ])
          ], 8, am))), 128))
        ])) : (g(), m("div", mm, o(s(l).label("当前筛选条件下没有匹配的任务。", "No cron jobs match the current filters.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), vm = { class: "stat-grid" }, ym = { class: "stat-card" }, _m = { class: "stat-card__label" }, wm = { class: "stat-card" }, km = { class: "stat-card__label" }, $m = { class: "stat-card" }, Cm = { class: "stat-card__label" }, Sm = { class: "stat-card" }, Am = { class: "stat-card__label" }, Rm = { class: "stat-card" }, Tm = { class: "stat-card__label" }, xm = { class: "stat-card" }, Pm = { class: "stat-card__label" }, Em = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Dm = {
  key: 0,
  class: "code-panel"
}, Mm = {
  key: 1,
  class: "muted-copy"
}, Im = { class: "list-stack" }, Om = {
  key: 0,
  class: "risk-row"
}, Lm = /* @__PURE__ */ we({
  __name: "CronOverviewSection",
  props: {
    overview: {},
    enabledCount: {},
    disabledCount: {},
    error: {},
    lastAction: {}
  },
  setup(e) {
    const t = e, n = ke(), l = D(
      () => fg(n, t.overview.status.enabled)
    ), i = D(
      () => hg(n, n.developerMode, t.overview.status)
    );
    return (r, c) => (g(), m(W, null, [
      K(le, {
        title: s(n).label("运行概览", "Runtime overview"),
        eyebrow: "Overview"
      }, {
        default: Z(() => [
          a("div", vm, [
            a("article", ym, [
              a("p", _m, o(s(n).label("任务总数", "Jobs")), 1),
              a("strong", null, o(s(de)(e.overview.jobs.length)) + " / " + o(s(de)(e.overview.total)), 1),
              a("span", null, o(s(n).label("当前已加载任务 / 运行态汇总总量", "Loaded jobs / runtime total")), 1)
            ]),
            a("article", wm, [
              a("p", km, o(s(n).label("已启用", "Enabled")), 1),
              a("strong", null, o(s(de)(e.enabledCount)), 1),
              a("span", null, o(s(n).label("这些任务会按计划自动执行", "These jobs run on their schedule")), 1)
            ]),
            a("article", $m, [
              a("p", Cm, o(s(n).label("已停用", "Disabled")), 1),
              a("strong", null, o(s(de)(e.disabledCount)), 1),
              a("span", null, o(s(n).label("停用后仍会保留，之后可以重新开启", "Disabled jobs stay available and can be resumed later")), 1)
            ]),
            a("article", Sm, [
              a("p", Am, o(s(n).label("调度器状态", "Scheduler")), 1),
              a("strong", null, o(l.value), 1),
              a("span", null, o(i.value), 1)
            ]),
            a("article", Rm, [
              a("p", Tm, o(s(n).label("运行态任务数", "Runtime job count")), 1),
              a("strong", null, o(s(de)(e.overview.status.jobsCount)), 1),
              a("span", null, o(s(n).label("来自 openclaw cron status 的运行态统计", "Reported directly by openclaw cron status")), 1)
            ]),
            a("article", xm, [
              a("p", Pm, o(s(n).label("分页窗口", "Pagination window")), 1),
              a("strong", null, o(s(de)(e.overview.offset)) + " / " + o(s(de)(e.overview.limit)), 1),
              a("span", null, o(e.overview.hasMore ? s(n).label(
                `还有更多任务未加载，nextOffset=${e.overview.nextOffset ?? "-"}`,
                `More jobs remain, nextOffset=${e.overview.nextOffset ?? "-"}`
              ) : s(n).label("当前页已经完整。", "The current page is complete.")), 1)
            ])
          ]),
          e.error ? (g(), m("div", Em, o(s(n).label(
            "已保留上一版成功结果，同时后台刷新失败：",
            "The last successful result is still on screen, but the background refresh failed: "
          )) + o(e.error), 1)) : Q("", !0)
        ]),
        _: 1
      }, 8, ["title"]),
      e.lastAction ? (g(), Ue(le, {
        key: 0,
        title: s(n).label("最近一次任务动作", "Latest task action"),
        eyebrow: "Action"
      }, {
        default: Z(() => [
          a("div", {
            class: oe(["status-banner", e.lastAction.tone === "success" ? "status-banner--success" : "status-banner--error"])
          }, [
            a("strong", null, o(e.lastAction.message), 1),
            a("span", null, o(s(Qe)(e.lastAction.at)), 1)
          ], 2),
          s(n).developerMode && e.lastAction.detail ? (g(), m("pre", Dm, o(e.lastAction.detail), 1)) : e.lastAction.detail ? (g(), m("p", Mm, o(s(n).label(
            "最近一次任务动作的原始 detail 已收纳到开发者模式里。需要查看底层返回内容时，请先到 Settings 打开开发者模式。",
            "The raw detail from the latest task action now stays behind developer mode. Enable it from Settings if you need the underlying payload."
          )), 1)) : Q("", !0)
        ]),
        _: 1
      }, 8, ["title"])) : Q("", !0),
      e.overview.warnings.length || e.overview.hasMore ? (g(), Ue(le, {
        key: 1,
        title: s(n).label("当前提醒", "Current warnings"),
        eyebrow: "Warnings"
      }, {
        default: Z(() => [
          a("div", Im, [
            (g(!0), m(W, null, ce(e.overview.warnings, (u) => (g(), m("article", {
              key: u,
              class: "risk-row"
            }, [
              a("strong", null, o(s(n).label("注意事项", "Warning")), 1),
              a("span", null, o(u), 1)
            ]))), 128)),
            e.overview.hasMore ? (g(), m("article", Om, [
              a("strong", null, o(s(n).label("尚未完整加载", "More jobs exist")), 1),
              a("span", null, o(s(n).label(
                `当前只拉取到 ${e.overview.jobs.length} 条任务，运行态汇总显示总量为 ${e.overview.total}。`,
                `Only ${e.overview.jobs.length} jobs are loaded while the runtime reports ${e.overview.total} in total.`
              )), 1)
            ])) : Q("", !0)
          ])
        ]),
        _: 1
      }, 8, ["title"])) : Q("", !0)
    ], 64));
  }
});
function Um() {
  return Pe("/api/cron-ui");
}
function Nm(e) {
  return Ie("/api/cron-ui/create", e);
}
function Fm(e) {
  return Ie("/api/cron-ui/update", e);
}
function Gm(e) {
  return Ie("/api/cron-ui/enable", { jobId: e });
}
function Bm(e) {
  return Ie("/api/cron-ui/disable", { jobId: e });
}
function Vm(e) {
  return Ie("/api/cron-ui/run", { jobId: e });
}
function jm(e) {
  return Ie("/api/cron-ui/remove", { jobId: e });
}
let ui = null;
function zm() {
  const e = ke(), t = ot(), n = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F("all"), i = /* @__PURE__ */ F("create"), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(null), d = ct(() => Um(), ui, {
    immediate: !1
  }), f = /* @__PURE__ */ ht(_l());
  xe(
    () => d.data,
    (b) => {
      b && (ui = b);
    }
  ), nt(() => {
    d.execute({ silent: !!d.data });
  });
  const h = D(() => {
    var b;
    return ((b = d.data) == null ? void 0 : b.jobs) || [];
  }), p = D(() => h.value.filter((b) => b.enabled)), y = D(() => h.value.filter((b) => !b.enabled)), v = D(() => {
    const b = n.value.trim().toLowerCase();
    return h.value.filter((S) => l.value === "enabled" && !S.enabled || l.value === "disabled" && S.enabled ? !1 : b ? [S.name, S.id, S.agentId, S.schedule, S.prompt, S.status].join(" ").toLowerCase().includes(b) : !0);
  });
  xe(h, () => {
    i.value === "edit" && !h.value.find((b) => b.id === r.value) && C();
  });
  function C() {
    i.value = "create", r.value = "", Object.assign(f, _l());
  }
  async function P() {
    await d.execute({ silent: !!d.data });
  }
  function R(b) {
    n.value = b;
  }
  function x(b) {
    l.value = b;
  }
  function $(b, S) {
    u.value = {
      tone: S,
      message: b.message,
      detail: b.output,
      at: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async function T(b, S = !1) {
    const E = b.success ? "success" : "error";
    $(b, E), t.pushToast({
      tone: E,
      message: b.message
    }), b.success && S && C(), await P();
  }
  async function N() {
    const b = i.value === "edit" ? "update" : "create";
    c.value = b;
    try {
      const S = bg(f), E = i.value === "edit" ? await Fm({ jobId: r.value, ...S }) : await Nm(S);
      await T(E, E.success);
    } catch (S) {
      const E = S instanceof Error ? S.message : String(S);
      u.value = {
        tone: "error",
        message: E,
        at: (/* @__PURE__ */ new Date()).toISOString()
      }, t.pushToast({
        tone: "error",
        message: E
      });
    } finally {
      c.value = "";
    }
  }
  function O(b) {
    i.value = "edit", r.value = b.id, Object.assign(f, dg(b));
  }
  async function ee(b, S) {
    if (b === "remove" && !await t.confirm({
      title: e.label("删除 Cron 任务", "Delete cron job"),
      message: e.label(`确认删除任务 ${S.id}？`, `Delete cron job ${S.id}?`),
      confirmLabel: e.label("确认删除", "Delete job"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    }))
      return;
    const E = `${b}:${S.id}`;
    c.value = E;
    try {
      const z = b === "run" ? await Vm(S.id) : b === "enable" ? await Gm(S.id) : b === "disable" ? await Bm(S.id) : await jm(S.id);
      await T(
        z,
        b === "remove" && i.value === "edit" && r.value === S.id
      );
    } catch (z) {
      const j = z instanceof Error ? z.message : String(z);
      u.value = {
        tone: "error",
        message: j,
        at: (/* @__PURE__ */ new Date()).toISOString()
      }, t.pushToast({
        tone: "error",
        message: j
      });
    } finally {
      c.value = "";
    }
  }
  return {
    resource: d,
    searchQuery: n,
    filter: l,
    editorMode: i,
    editingJobId: r,
    runningAction: c,
    lastAction: u,
    draft: f,
    jobs: h,
    enabledJobs: p,
    disabledJobs: y,
    filteredJobs: v,
    refresh: P,
    setSearchQuery: R,
    setFilter: x,
    resetEditor: C,
    handleSubmit: N,
    startEdit: O,
    handleJobAction: ee
  };
}
const Wm = { class: "page-stack" }, Hm = { class: "page-header" }, Km = { class: "page-header__eyebrow" }, qm = { class: "page-header__title" }, Jm = { class: "page-header__description" }, Qm = {
  key: 0,
  class: "page-empty"
}, Ym = {
  key: 1,
  class: "page-empty page-empty--error"
}, Zm = { class: "page-split" }, Xm = /* @__PURE__ */ we({
  __name: "CronPage",
  setup(e) {
    const t = ke(), {
      resource: n,
      searchQuery: l,
      filter: i,
      editorMode: r,
      editingJobId: c,
      runningAction: u,
      lastAction: d,
      draft: f,
      jobs: h,
      enabledJobs: p,
      disabledJobs: y,
      filteredJobs: v,
      refresh: C,
      setSearchQuery: P,
      setFilter: R,
      resetEditor: x,
      handleSubmit: $,
      startEdit: T,
      handleJobAction: N
    } = zm();
    return (O, ee) => (g(), m("div", Wm, [
      a("header", Hm, [
        a("div", null, [
          a("p", Km, o(s(t).label("自动化 / Cron", "Automation / Cron")), 1),
          a("h2", qm, o(s(t).label("自动化任务", "Automation jobs")), 1),
          a("p", Jm, o(s(t).label(
            "把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。",
            "Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend."
          )), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: ee[0] || (ee[0] = //@ts-ignore
          (...b) => s(C) && s(C)(...b))
        }, o(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新任务状态", "Refresh jobs")), 1)
      ]),
      s(n).loading && !s(n).data ? (g(), m("div", Qm, o(s(t).label("正在读取 Cron 状态与任务列表…", "Loading cron status and jobs…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", Ym, o(s(n).error), 1)) : s(n).data ? (g(), m(W, { key: 2 }, [
        K(Lm, {
          overview: s(n).data,
          "enabled-count": s(p).length,
          "disabled-count": s(y).length,
          error: s(n).error,
          "last-action": s(d)
        }, null, 8, ["overview", "enabled-count", "disabled-count", "error", "last-action"]),
        a("div", Zm, [
          K(Xg, {
            draft: s(f),
            "editor-mode": s(r),
            "editing-job-id": s(c),
            "running-action": s(u),
            onSubmit: s($),
            onReset: s(x)
          }, null, 8, ["draft", "editor-mode", "editing-job-id", "running-action", "onSubmit", "onReset"]),
          K(bm, {
            jobs: s(h),
            "enabled-jobs": s(p),
            "disabled-jobs": s(y),
            "filtered-jobs": s(v),
            "search-query": s(l),
            filter: s(i),
            "running-action": s(u),
            "onUpdate:searchQuery": s(P),
            "onUpdate:filter": s(R),
            onEdit: s(T),
            onAction: ee[1] || (ee[1] = (b) => s(N)(b.action, b.job))
          }, null, 8, ["jobs", "enabled-jobs", "disabled-jobs", "filtered-jobs", "search-query", "filter", "running-action", "onUpdate:searchQuery", "onUpdate:filter", "onEdit"])
        ])
      ], 64)) : Q("", !0)
    ]));
  }
});
async function eb() {
  const [e, t, n, l] = await Promise.all([
    Pe("/api/info"),
    Pe("/api/dashboard/overview"),
    Pe("/api/service/status"),
    Pe("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: n, openclaw: l };
}
async function tb() {
  const [e, t] = await Promise.all([
    Pe("/api/service/status"),
    Pe("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function nb() {
  const [e, t] = await Promise.all([
    Pe("/api/openclaw/status"),
    Pe("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const sb = { class: "page-stack" }, lb = { class: "page-header" }, ab = { class: "page-header__eyebrow" }, ib = { class: "page-header__title" }, ob = { class: "page-header__description" }, rb = {
  key: 0,
  class: "page-empty"
}, cb = {
  key: 1,
  class: "page-empty page-empty--error"
}, ub = {
  key: 0,
  class: "status-banner status-banner--warning"
}, db = { class: "stat-grid" }, fb = { class: "stat-card" }, hb = { class: "stat-card" }, pb = { class: "stat-card" }, gb = { class: "stat-card__label" }, mb = { class: "list-stack" }, bb = { class: "action-row" }, vb = { class: "action-row" }, yb = { class: "action-row" }, _b = { class: "action-row" }, wb = {
  key: 0,
  class: "list-stack"
}, kb = {
  key: 1,
  class: "muted-copy"
}, $b = /* @__PURE__ */ we({
  __name: "DashboardPage",
  setup(e) {
    let t = null;
    const n = ke(), l = ct(() => eb(), t, { immediate: !1 }), i = D(() => {
      var c, u;
      const r = (u = (c = l.data) == null ? void 0 : c.overview) == null ? void 0 : u.risks;
      return Array.isArray(r) ? r : [];
    });
    return xe(() => l.data, (r) => {
      r && (t = r);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (r, c) => (g(), m("div", sb, [
      a("header", lb, [
        a("div", null, [
          a("p", ab, o(s(n).label("首页 / 总览", "Home / Overview")), 1),
          a("h2", ib, o(s(n).label("带路首页", "Guided Home")), 1),
          a("p", ob, o(s(n).label("从这里完成最常用的四条主路径：确认运行、配置模型、连接渠道、开启备份与恢复。", "Use this page to walk the four main paths: confirm runtime health, configure models, connect channels, and turn on backup and recovery.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: c[0] || (c[0] = (u) => s(l).execute({ silent: !0 }))
        }, o(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", rb, o(s(n).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", cb, o(s(l).error), 1)) : s(l).data ? (g(), m(W, { key: 2 }, [
        s(l).error ? (g(), m("div", ub, o(s(n).label("已保留上一版首页快照，但后台刷新失败：", "The last home snapshot is still on screen, but the background refresh failed: ")) + o(s(l).error), 1)) : Q("", !0),
        K(le, {
          title: s(n).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: Z(() => {
            var u, d, f, h, p, y, v, C, P, R;
            return [
              a("div", db, [
                a("article", fb, [
                  c[1] || (c[1] = a("p", { class: "stat-card__label" }, "Guard", -1)),
                  a("strong", null, o(((u = s(l).data.info) == null ? void 0 : u.guardVersion) || "unknown"), 1),
                  a("span", null, o(((d = s(l).data.info) == null ? void 0 : d.platform) || "unknown platform"), 1)
                ]),
                a("article", hb, [
                  c[2] || (c[2] = a("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  a("strong", null, o((h = (f = s(l).data.info) == null ? void 0 : f.openclaw) != null && h.installed ? ((y = (p = s(l).data.info) == null ? void 0 : p.openclaw) == null ? void 0 : y.version) || "installed" : s(n).label("未安装", "Not installed")), 1),
                  a("span", null, o(((C = (v = s(l).data.info) == null ? void 0 : v.openclaw) == null ? void 0 : C.detectedSource) || s(n).label("待检测", "Pending detection")), 1)
                ]),
                a("article", pb, [
                  a("p", gb, o(s(n).label("Node 运行时", "Node runtime")), 1),
                  a("strong", null, o(((P = s(l).data.info) == null ? void 0 : P.nodeVersion) || "unknown"), 1),
                  a("span", null, o(((R = s(l).data.info) == null ? void 0 : R.user) || s(n).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(n).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: Z(() => [
            a("div", mb, [
              a("article", bb, [
                a("div", null, [
                  a("h3", null, o(s(n).label("先确认运行状态", "Review runtime health first")), 1),
                  a("p", null, o(s(n).label("先确认 Guard Web、OpenClaw 和后台服务都在线，再继续模型、渠道或恢复配置会更稳妥。", "Check Guard Web, OpenClaw, and background services first so the rest of your setup starts from a healthy base.")), 1)
                ]),
                K(s(Tt), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: Z(() => [
                    ft(o(s(n).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              a("article", vb, [
                a("div", null, [
                  a("h3", null, o(s(n).label("先接好模型", "Connect your models")), 1),
                  a("p", null, o(s(n).label("先把主模型和回退模型配置好，后面的渠道接入和运行排查会更顺。", "Configure your primary and fallback models first so channel setup and troubleshooting stay predictable.")), 1)
                ]),
                K(s(Tt), {
                  class: "inline-link",
                  to: "/models"
                }, {
                  default: Z(() => [
                    ft(o(s(n).label("打开模型页", "Open models")), 1)
                  ]),
                  _: 1
                })
              ]),
              a("article", yb, [
                a("div", null, [
                  a("h3", null, o(s(n).label("再连接渠道", "Connect your channels")), 1),
                  a("p", null, o(s(n).label("完成渠道接线后，Guard 才能真正把模型能力接到实际使用场景里。", "Once channels are configured, Guard can bring model capability into the real usage flow.")), 1)
                ]),
                K(s(Tt), {
                  class: "inline-link",
                  to: "/channels"
                }, {
                  default: Z(() => [
                    ft(o(s(n).label("打开渠道页", "Open channels")), 1)
                  ]),
                  _: 1
                })
              ]),
              a("article", _b, [
                a("div", null, [
                  a("h3", null, o(s(n).label("最后补齐备份保护", "Finish backup protection")), 1),
                  a("p", null, o(s(n).label("优先创建首个恢复点并接好云端保护，这样后续试错时更容易保住现场，也方便快速回到之前的状态。", "Create the first recovery point and connect cloud protection so later experiments stay recoverable and easier to rewind.")), 1)
                ]),
                K(s(Tt), {
                  class: "inline-link",
                  to: "/recovery"
                }, {
                  default: Z(() => [
                    ft(o(s(n).label("打开备份与恢复", "Open backup & recovery")), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(n).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: Z(() => [
            i.value.length ? (g(), m("div", wb, [
              (g(!0), m(W, null, ce(i.value, (u, d) => (g(), m("article", {
                key: `${u.title}-${d}`,
                class: "risk-row"
              }, [
                a("strong", null, o(u.title || s(n).label("未命名风险", "Unnamed risk")), 1),
                a("span", null, o(u.detail || s(n).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (g(), m("p", kb, o(s(n).label("当前还没有结构化风险提示。若要做更细的运行或安全检查，可以继续查看运维页和安全页。", "No structured risk items are available right now. For a deeper health or safety review, continue to Operations and Security.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : Q("", !0)
    ]));
  }
}), Cb = {
  class: "page-tabs",
  role: "tablist"
}, Sb = ["data-tab-id", "aria-selected", "onClick"], Ab = { key: 0 }, Os = /* @__PURE__ */ we({
  __name: "PageTabs",
  props: {
    items: {},
    activeId: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = t;
    return (l, i) => (g(), m("div", Cb, [
      (g(!0), m(W, null, ce(e.items, (r) => (g(), m("button", {
        key: r.id,
        class: oe(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
        "data-tab-id": r.id,
        type: "button",
        role: "tab",
        "aria-selected": r.id === e.activeId,
        onClick: (c) => n("change", r.id)
      }, [
        a("span", null, o(r.label), 1),
        r.hint ? (g(), m("small", Ab, o(r.hint), 1)) : Q("", !0)
      ], 10, Sb))), 128))
    ]));
  }
}), Rb = {
  key: 0,
  class: "page-empty"
}, Tb = { class: "mini-list" }, xb = { class: "mini-list__item mini-list__item--stack" }, Pb = { class: "provider-card__header" }, Eb = { key: 0 }, Db = { class: "page-actions" }, Mb = ["disabled"], Ib = ["value"], Ob = {
  key: 2,
  class: "page-empty"
}, Lb = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    function i(r) {
      n("update:draft", r.target.value);
    }
    return (r, c) => (g(), Ue(le, {
      title: s(l).label("文件编辑器", "File editor"),
      eyebrow: "Editor"
    }, {
      default: Z(() => [
        e.editorLoading ? (g(), m("div", Rb, o(s(l).label("正在读取文件内容…", "Loading file content…")), 1)) : e.currentFile ? (g(), m(W, { key: 1 }, [
          a("div", Tb, [
            a("div", xb, [
              a("div", Pb, [
                a("strong", null, o(e.currentFile.relativePath || e.currentFile.path), 1),
                a("span", {
                  "data-testid": "file-editor-state",
                  class: oe(["pill", e.fileDirty ? "pill--warning" : "pill--success"])
                }, o(e.fileDirty ? s(l).label("未保存", "Unsaved") : s(l).label("已保存", "Saved")), 3)
              ]),
              a("p", null, o(e.currentFile.path), 1),
              e.currentFile.truncated ? (g(), m("p", Eb, o(s(l).label("文件内容过长，当前只预览了前一部分。", "This file is large, so only the first portion is loaded for preview and editing.")), 1)) : Q("", !0)
            ])
          ]),
          a("div", Db, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: c[0] || (c[0] = (u) => r.$emit("reload"))
            }, o(s(l).label("重新读取", "Reload")), 1),
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.saving,
              onClick: c[1] || (c[1] = (u) => r.$emit("save"))
            }, o(e.saving ? s(l).label("保存中…", "Saving…") : s(l).label("保存文件", "Save file")), 9, Mb)
          ]),
          a("textarea", {
            value: e.draft,
            "data-testid": "file-editor-textarea",
            class: "settings-textarea settings-textarea--editor",
            rows: "22",
            onInput: i
          }, null, 40, Ib)
        ], 64)) : (g(), m("div", Ob, o(s(l).label("先从左侧选择一个文件，再在这里查看或编辑。", "Select a file from the left side first, then view or edit it here.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), Ub = {
  key: 0,
  class: "stat-grid"
}, Nb = { class: "stat-card" }, Fb = { class: "stat-card__label" }, Gb = { class: "stat-card" }, Bb = { class: "stat-card__label" }, Vb = { class: "stat-card" }, jb = { class: "stat-card__label" }, zb = { class: "stat-card" }, Wb = { class: "stat-card__label" }, Hb = {
  key: 1,
  class: "stat-grid"
}, Kb = { class: "stat-card" }, qb = { class: "stat-card__label" }, Jb = { class: "stat-card" }, Qb = { class: "stat-card__label" }, Yb = { class: "stat-card" }, Zb = { class: "stat-card__label" }, Xb = { class: "stat-card" }, ev = { class: "stat-card__label" }, tv = /* @__PURE__ */ we({
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
    const t = e, n = ke(), l = D(() => t.mode === "all");
    return (i, r) => (g(), Ue(le, {
      title: l.value ? s(n).label("当前目录概览", "Current directory overview") : s(n).label("核心记忆概览", "Core memory overview"),
      eyebrow: "Summary"
    }, {
      default: Z(() => [
        l.value ? (g(), m("div", Ub, [
          a("article", Nb, [
            a("p", Fb, o(s(n).label("受控根目录", "Managed roots")), 1),
            a("strong", null, o(s(de)(e.rootsCount)), 1),
            a("span", null, o(e.selectedRootLabel || s(n).label("当前正在受控范围内浏览", "Browsing inside the managed scope now")), 1)
          ]),
          a("article", Gb, [
            a("p", Bb, o(s(n).label("当前目录内容", "Current entries")), 1),
            a("strong", null, o(s(de)(e.entriesCount)), 1),
            a("span", null, o(`${s(de)(e.directoryCount)} ${s(n).label("个目录", "dirs")} / ${s(de)(e.regularFileCount)} ${s(n).label("个文件", "files")}`), 1)
          ]),
          a("article", Vb, [
            a("p", jb, o(s(n).label("当前打开文件", "Open file")), 1),
            a("strong", null, o(e.currentFileLabel ? "1" : "0"), 1),
            a("span", null, o(e.currentFileLabel || s(n).label("还没有打开文件", "No file opened yet")), 1)
          ]),
          a("article", zb, [
            a("p", Wb, o(s(n).label("当前路径", "Current path")), 1),
            a("strong", null, o(e.selectedRootType === "detected-workspace" ? s(n).label("自动发现", "Auto-detected") : s(n).label("受控目录", "Managed")), 1),
            a("span", null, o(e.currentPath || s(n).label("等待路径返回", "Waiting for a resolved path")), 1)
          ])
        ])) : (g(), m("div", Hb, [
          a("article", Kb, [
            a("p", qb, o(s(n).label("记忆文件数", "Memory files")), 1),
            a("strong", null, o(s(de)(e.memoryFilesCount)), 1),
            a("span", null, o(`${s(de)(e.memoryDocsCount)} ${s(n).label("个核心文档", "core docs")} / ${s(de)(e.memoryNotesCount)} ${s(n).label("个记忆片段", "memory notes")}`), 1)
          ]),
          a("article", Jb, [
            a("p", Qb, o(s(n).label("覆盖角色", "Covered roles")), 1),
            a("strong", null, o(s(de)(e.memoryGroupsCount)), 1),
            a("span", null, o(s(n).label("包含可管理记忆文件的角色或工作区", "Roles or workspaces that already have managed memory files")), 1)
          ]),
          a("article", Yb, [
            a("p", Zb, o(s(n).label("当前显示", "Visible now")), 1),
            a("strong", null, o(s(de)(e.filteredMemoryFilesCount)), 1),
            a("span", null, o(`${e.memoryFilterLabel} / ${e.memoryFilterQuery || s(n).label("未设置搜索词", "No search query")}`), 1)
          ]),
          a("article", Xb, [
            a("p", ev, o(s(n).label("当前打开", "Current file")), 1),
            a("strong", null, o(e.currentMemoryLabel ? "1" : "0"), 1),
            a("span", null, o(e.currentMemoryLabel || s(n).label("还没有打开记忆文件", "No memory file opened yet")), 1)
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
function Un(e) {
  const t = String(e || "").replace(/[\\/]+$/, "");
  if (!t) return "";
  const n = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return n >= 0 ? t.slice(0, n) : "";
}
const Ls = /* @__PURE__ */ Jn("workspace", () => {
  const e = /* @__PURE__ */ F("all"), t = /* @__PURE__ */ F(""), n = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F("all"), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(null);
  function d(x) {
    e.value = x;
  }
  function f(x) {
    t.value = x;
  }
  function h(x) {
    n.value = x, x && (t.value = Un(x) || t.value);
  }
  function p(x) {
    l.value = x;
  }
  function y(x) {
    i.value = x;
  }
  function v(x) {
    r.value = x;
  }
  function C(x) {
    c.value = x;
  }
  function P(x) {
    const $ = wl(x) ? "memory" : "all";
    u.value = {
      path: x,
      mode: $,
      parentPath: Un(x)
    }, e.value = $, $ === "memory" ? l.value = x : (n.value = x, t.value = Un(x) || t.value);
  }
  function R() {
    const x = u.value;
    return u.value = null, x;
  }
  return {
    mode: e,
    currentPath: t,
    selectedFilePath: n,
    selectedMemoryFilePath: l,
    memoryKindFilter: i,
    memoryFilterQuery: r,
    searchQuery: c,
    pendingReveal: u,
    setMode: d,
    setCurrentPath: f,
    setSelectedFilePath: h,
    setSelectedMemoryFilePath: p,
    setMemoryKindFilter: y,
    setMemoryFilterQuery: v,
    setSearchQuery: C,
    requestReveal: P,
    consumeReveal: R
  };
}), nv = { class: "settings-field" }, sv = ["value", "placeholder"], lv = { class: "pill-row" }, av = ["onClick"], iv = { class: "muted-copy" }, ov = {
  key: 0,
  class: "page-empty"
}, rv = {
  key: 1,
  class: "provider-stack"
}, cv = { class: "provider-card__header" }, uv = { key: 0 }, dv = { class: "pill-row" }, fv = { class: "pill pill--info" }, hv = { class: "pill pill--muted" }, pv = { class: "pill pill--muted" }, gv = { class: "directory-list" }, mv = ["onClick"], bv = { class: "entry-button__title" }, vv = { class: "pill-row" }, yv = { class: "pill pill--muted" }, _v = {
  key: 2,
  class: "page-empty"
}, wv = /* @__PURE__ */ we({
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
    const n = t, l = ke(), i = Ls();
    function r(c) {
      i.setMemoryFilterQuery(c.target.value);
    }
    return (c, u) => (g(), Ue(le, {
      title: s(l).label("记忆目录", "Memory catalog"),
      eyebrow: "Catalog"
    }, {
      default: Z(() => [
        a("div", nv, [
          a("span", null, o(s(l).label("筛选", "Filter")), 1),
          a("input", {
            value: s(i).memoryFilterQuery,
            class: "settings-input",
            type: "text",
            placeholder: s(l).label("搜索 Agent / 文件名 / 路径", "Filter by agent / file / path"),
            onInput: r
          }, null, 40, sv)
        ]),
        a("div", lv, [
          (g(), m(W, null, ce(["all", "docs", "notes"], (d) => a("button", {
            key: d,
            class: oe(["pill-button", { "pill-button--active": s(i).memoryKindFilter === d }]),
            type: "button",
            onClick: (f) => n("update-kind", d)
          }, [
            a("span", null, o(e.getMemoryFilterLabel(d)), 1)
          ], 10, av)), 64))
        ]),
        a("p", iv, o(s(l).label(
          `当前显示 ${s(de)(e.filteredCount)} / ${s(de)(e.totalCount)} 个记忆文件。`,
          `Showing ${s(de)(e.filteredCount)} of ${s(de)(e.totalCount)} memory files.`
        )), 1),
        e.loading ? (g(), m("div", ov, o(s(l).label("正在读取记忆目录…", "Loading the memory catalog…")), 1)) : e.groups.length ? (g(), m("div", rv, [
          (g(!0), m(W, null, ce(e.groups, (d) => (g(), m("article", {
            key: d.agentId,
            class: "provider-card"
          }, [
            a("header", cv, [
              a("div", null, [
                a("strong", null, o(d.label), 1),
                d.label !== d.agentId ? (g(), m("p", uv, o(d.agentId), 1)) : Q("", !0)
              ]),
              a("div", dv, [
                a("span", fv, o(s(de)(d.files.length)), 1),
                a("span", hv, o(`${e.getMemoryFilterLabel("docs")} ${s(de)(d.docsCount)}`), 1),
                a("span", pv, o(`${e.getMemoryFilterLabel("notes")} ${s(de)(d.notesCount)}`), 1)
              ])
            ]),
            a("div", gv, [
              (g(!0), m(W, null, ce(d.files, (f) => (g(), m("button", {
                key: f.path,
                class: oe(["entry-button", { "entry-button--active": e.currentMemoryPath === f.path }]),
                "data-entry-kind": "memory",
                type: "button",
                onClick: (h) => n("open-memory-file", f.path)
              }, [
                a("div", bv, [
                  a("strong", null, o(e.renderMemoryLabel(f)), 1)
                ]),
                a("p", null, o(f.relativePath || f.path), 1),
                a("div", vv, [
                  a("span", {
                    class: oe(["pill", e.getMemoryFileKind(f) === "docs" ? "pill--info" : "pill--success"])
                  }, o(e.getMemoryFilterLabel(e.getMemoryFileKind(f))), 3),
                  a("span", yv, o(s(Qe)(f.modifiedAt)), 1)
                ])
              ], 10, mv))), 128))
            ])
          ]))), 128))
        ])) : (g(), m("div", _v, o(s(l).label("当前筛选条件下没有匹配的核心记忆文件。", "No core memory files match the current filter.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), kv = {
  key: 0,
  class: "page-empty"
}, $v = { class: "mini-list" }, Cv = { class: "mini-list__item mini-list__item--stack" }, Sv = { class: "provider-card__header" }, Av = { class: "page-actions" }, Rv = ["disabled"], Tv = ["value"], xv = {
  key: 2,
  class: "page-empty"
}, Pv = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    function i(r) {
      n("update:draft", r.target.value);
    }
    return (r, c) => (g(), Ue(le, {
      title: s(l).label("记忆编辑器", "Memory editor"),
      eyebrow: "Editor"
    }, {
      default: Z(() => [
        e.editorLoading ? (g(), m("div", kv, o(s(l).label("正在读取记忆文件…", "Loading the memory file…")), 1)) : e.currentMemoryFile ? (g(), m(W, { key: 1 }, [
          a("div", $v, [
            a("div", Cv, [
              a("div", Sv, [
                a("strong", null, o(e.currentMemoryFile.relativePath || e.currentMemoryFile.path), 1),
                a("span", {
                  "data-testid": "memory-editor-state",
                  class: oe(["pill", e.memoryDirty ? "pill--warning" : "pill--success"])
                }, o(e.memoryDirty ? s(l).label("未保存", "Unsaved") : s(l).label("已保存", "Saved")), 3)
              ]),
              a("p", null, o(e.currentMemoryFile.path), 1),
              a("p", null, o(s(l).label("修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。", "Save after editing. These files directly affect role behavior, persona, and long-term memory.")), 1)
            ])
          ]),
          a("div", Av, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: c[0] || (c[0] = (u) => r.$emit("reload"))
            }, o(s(l).label("重新读取", "Reload")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: c[1] || (c[1] = (u) => r.$emit("reveal"))
            }, o(s(l).label("在全部文件中定位", "Reveal in all files")), 1),
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.saving,
              onClick: c[2] || (c[2] = (u) => r.$emit("save"))
            }, o(e.saving ? s(l).label("保存中…", "Saving…") : s(l).label("保存记忆文件", "Save memory file")), 9, Rv)
          ]),
          a("textarea", {
            value: e.draft,
            "data-testid": "memory-editor-textarea",
            class: "settings-textarea settings-textarea--editor",
            rows: "22",
            onInput: i
          }, null, 40, Tv)
        ], 64)) : (g(), m("div", xv, o(s(l).label("先从左侧选择一个记忆文件，再在这里查看或编辑。", "Select a memory file from the left side first, then view or edit it here.")), 1))
      ]),
      _: 1
    }, 8, ["title"]));
  }
}), Ev = { class: "list-stack" }, Dv = { class: "catalog-list" }, Mv = ["data-root-id", "onClick"], Iv = { class: "catalog-list__title" }, Ov = { class: "pill-row" }, Lv = { class: "pill pill--info" }, Uv = { class: "mini-list" }, Nv = { class: "mini-list__item mini-list__item--stack" }, Fv = { class: "page-actions" }, Gv = ["disabled"], Bv = { class: "create-row" }, Vv = ["value"], jv = { value: "file" }, zv = { value: "directory" }, Wv = ["value", "placeholder"], Hv = ["disabled"], Kv = {
  key: 0,
  class: "directory-list"
}, qv = ["data-entry-kind", "onClick"], Jv = { class: "entry-button__title" }, Qv = { class: "pill-row" }, Yv = { class: "pill pill--muted" }, Zv = {
  key: 1,
  class: "page-empty"
}, Xv = /* @__PURE__ */ we({
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
    const n = e, l = t, i = ke();
    function r(d) {
      return n.currentPath === d.path || n.currentPath.startsWith(`${d.path}\\`) || n.currentPath.startsWith(`${d.path}/`);
    }
    function c(d) {
      l("update:createKind", d.target.value === "directory" ? "directory" : "file");
    }
    function u(d) {
      l("update:createName", d.target.value);
    }
    return (d, f) => (g(), Ue(le, {
      title: s(i).label("工作区浏览器", "Workspace browser"),
      eyebrow: "Browser"
    }, {
      default: Z(() => [
        a("div", Ev, [
          a("div", Dv, [
            (g(!0), m(W, null, ce(e.roots, (h) => (g(), m("button", {
              key: h.id,
              class: oe(["catalog-list__item", { "catalog-list__item--active": r(h) }]),
              "data-root-id": h.id,
              type: "button",
              onClick: (p) => d.$emit("open-root", h.path)
            }, [
              a("div", Iv, [
                a("strong", null, o(h.label), 1)
              ]),
              a("div", Ov, [
                a("span", Lv, o(h.type), 1)
              ])
            ], 10, Mv))), 128))
          ]),
          a("div", Uv, [
            a("div", Nv, [
              a("strong", null, o(s(i).label("当前路径", "Current path")), 1),
              a("p", null, o(e.currentPath || "-"), 1)
            ])
          ]),
          a("div", Fv, [
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: !e.parentPath,
              onClick: f[0] || (f[0] = (h) => d.$emit("go-up"))
            }, o(s(i).label("返回上一级", "Go up")), 9, Gv),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: f[1] || (f[1] = (h) => d.$emit("reload"))
            }, o(e.directoryLoading ? s(i).label("刷新中…", "Refreshing…") : s(i).label("刷新目录", "Reload list")), 1)
          ]),
          a("div", Bv, [
            a("select", {
              value: e.createKind,
              class: "settings-input create-row__kind",
              onChange: c
            }, [
              a("option", jv, o(s(i).label("文件", "File")), 1),
              a("option", zv, o(s(i).label("目录", "Directory")), 1)
            ], 40, Vv),
            a("input", {
              value: e.createName,
              class: "settings-input",
              type: "text",
              placeholder: s(i).label("例如：README-local.md 或 drafts", "Example: README-local.md or drafts"),
              onInput: u,
              onKeydown: f[2] || (f[2] = xu(kn((h) => d.$emit("create"), ["prevent"]), ["enter"]))
            }, null, 40, Wv),
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.creating,
              onClick: f[3] || (f[3] = (h) => d.$emit("create"))
            }, o(e.creating ? s(i).label("创建中…", "Creating…") : s(i).label("创建", "Create")), 9, Hv)
          ]),
          e.entries.length ? (g(), m("div", Kv, [
            (g(!0), m(W, null, ce(e.entries, (h) => (g(), m("button", {
              key: h.path,
              class: oe(["entry-button", { "entry-button--active": e.currentFilePath === h.path }]),
              "data-entry-kind": h.isDirectory ? "directory" : "file",
              type: "button",
              onClick: (p) => d.$emit("open-entry", h)
            }, [
              a("div", Jv, [
                a("strong", null, o(h.isDirectory ? `${s(i).label("[目录]", "[DIR]")} ${h.name}` : h.name), 1)
              ]),
              a("p", null, o(h.relativePath || h.path), 1),
              a("div", Qv, [
                a("span", {
                  class: oe(["pill", h.isDirectory ? "pill--info" : "pill--muted"])
                }, o(h.isDirectory ? s(i).label("目录", "Directory") : s(Qp)(h.size)), 3),
                a("span", Yv, o(s(Qe)(h.modifiedAt)), 1)
              ])
            ], 10, qv))), 128))
          ])) : (g(), m("div", Zv, o(s(i).label("当前目录下还没有可展示内容。", "The current directory does not contain any visible entries yet.")), 1))
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
function ey(e, t) {
  return t === "docs" ? e.label("核心文档", "Core docs") : t === "notes" ? e.label("记忆片段", "Memory notes") : e.label("全部", "All");
}
function ty(e, t) {
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
function ny(e) {
  const t = new URLSearchParams();
  e && t.set("path", e);
  const n = t.size ? `?${t.toString()}` : "";
  return Pe(`/api/files${n}`);
}
function di(e) {
  const t = new URLSearchParams({ path: e });
  return Pe(`/api/files/content?${t.toString()}`);
}
function sy(e, t) {
  return Ie("/api/files/content", {
    path: e,
    content: t
  });
}
function ly(e, t, n) {
  return Ie("/api/files/create", {
    parentPath: e,
    name: t,
    kind: n
  });
}
function ay() {
  return Pe("/api/memory");
}
function iy() {
  const e = ke(), t = ot(), n = Ls(), l = /* @__PURE__ */ F(!0), i = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(null), h = /* @__PURE__ */ F([]), p = /* @__PURE__ */ F(null), y = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F(""), C = /* @__PURE__ */ F(null), P = /* @__PURE__ */ F(""), R = /* @__PURE__ */ F(""), x = /* @__PURE__ */ F(!1), $ = /* @__PURE__ */ F(!1), T = /* @__PURE__ */ F("file"), N = /* @__PURE__ */ F(""), O = D(() => [
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
  ), b = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.roots) || [];
  }), S = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.entries) || [];
  }), E = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.currentPath) || n.currentPath;
  }), z = D(() => {
    var M;
    return ((M = f.value) == null ? void 0 : M.parentPath) || null;
  }), j = D(
    () => b.value.filter(
      (M) => E.value === M.path || E.value.startsWith(`${M.path}\\`) || E.value.startsWith(`${M.path}/`)
    ).sort((M, re) => re.path.length - M.path.length)[0] || null
  ), me = D(
    () => S.value.filter((M) => M.isDirectory).length
  ), Ce = D(() => S.value.length - me.value), Oe = D(() => h.value), Ge = D(() => {
    const M = n.memoryFilterQuery.trim().toLowerCase();
    return Oe.value.filter((re) => n.memoryKindFilter !== "all" && Lt(re) !== n.memoryKindFilter ? !1 : M ? [re.agentId, re.type, re.relativePath, re.path].join(" ").toLowerCase().includes(M) : !0).sort((re, se) => {
      const Se = String(re.agentId || "").localeCompare(
        String(se.agentId || "")
      );
      if (Se !== 0) return Se;
      const He = Lt(re).localeCompare(
        Lt(se)
      );
      return He !== 0 ? He : Zs(re).localeCompare(Zs(se));
    });
  }), ue = D(() => {
    var re;
    const M = /* @__PURE__ */ new Map();
    for (const se of Ge.value) {
      const Se = String(se.agentId || "");
      M.has(Se) || M.set(Se, []), (re = M.get(Se)) == null || re.push(se);
    }
    return Array.from(M.entries()).map(([se, Se]) => ({
      agentId: se,
      label: ty(e, se),
      files: Se,
      docsCount: Se.filter((He) => Lt(He) === "docs").length,
      notesCount: Se.filter((He) => Lt(He) === "notes").length
    })).sort((se, Se) => se.label.localeCompare(Se.label));
  }), fe = D(() => q("file")), _e = D(() => q("memory")), Ve = D(() => fe.value || _e.value);
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
  async function H(M) {
    if (!q(M)) return !0;
    const re = M === "memory";
    return t.confirm({
      title: e.label(
        re ? "切换记忆文件" : "切换文件",
        re ? "Switch memory file" : "Switch file"
      ),
      message: e.label(
        re ? "当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。" : "当前文件编辑器里有未保存修改，继续切换会丢失这些内容。",
        re ? "There are unsaved changes in the memory editor. Switching now discards them." : "There are unsaved changes in the file editor. Switching now discards them."
      ),
      confirmLabel: e.label("放弃并继续", "Discard and continue"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    });
  }
  function q(M) {
    return M === "file" ? p.value !== null && cn(y.value) !== v.value : C.value !== null && cn(P.value) !== R.value;
  }
  async function Y(M, re = !1) {
    re || (i.value = !0), u.value = null;
    try {
      const se = await ny(M);
      f.value = se, n.setCurrentPath(se.currentPath);
    } catch (se) {
      u.value = se instanceof Error ? se.message : String(se);
    } finally {
      i.value = !1;
    }
  }
  async function $e(M = !1) {
    M || (r.value = !0), d.value = null;
    try {
      const re = await ay();
      h.value = re.files || [];
    } catch (re) {
      d.value = re instanceof Error ? re.message : String(re);
    } finally {
      r.value = !1;
    }
  }
  async function ze(M, re = !0) {
    if (re && !await H("file")) return !1;
    c.value = !0;
    try {
      const se = await di(M);
      return p.value = se, y.value = se.content || "", v.value = cn(se.content || ""), n.setSelectedFilePath(M), !0;
    } catch (se) {
      return t.pushToast({
        tone: "error",
        message: se instanceof Error ? se.message : String(se)
      }), !1;
    } finally {
      c.value = !1;
    }
  }
  async function je(M, re = !0) {
    if (re && !await H("memory")) return !1;
    c.value = !0;
    try {
      const se = await di(M);
      return C.value = se, P.value = se.content || "", R.value = cn(se.content || ""), n.setSelectedMemoryFilePath(M), !0;
    } catch (se) {
      return t.pushToast({
        tone: "error",
        message: se instanceof Error ? se.message : String(se)
      }), !1;
    } finally {
      c.value = !1;
    }
  }
  async function I() {
    const M = n.currentPath || Un(n.selectedFilePath) || void 0;
    await Y(M, !0), n.selectedFilePath && await ze(n.selectedFilePath, !1);
  }
  async function ne() {
    await $e(!0), n.selectedMemoryFilePath && await je(n.selectedMemoryFilePath, !1);
  }
  async function w(M, re, se = !0) {
    if (re === "memory") {
      if (n.mode === "all" && se && !await H("file")) return;
      n.setMode("memory"), await $e(!0), M && await je(M, !1);
      return;
    }
    n.mode === "memory" && se && !await H("memory") || (n.setMode("all"), await Y(
      Un(M) || n.currentPath || void 0,
      !0
    ), M && await ze(M, !1));
  }
  async function G(M) {
    var Se, He;
    const re = M === "memory" ? "memory" : "all";
    if (re === n.mode) return;
    const se = re === "memory" ? n.selectedMemoryFilePath || ((Se = C.value) == null ? void 0 : Se.path) || "" : n.selectedFilePath || ((He = p.value) == null ? void 0 : He.path) || "";
    await w(se, re, !0), re === "all" && !se && (n.setMode("all"), await Y(n.currentPath || void 0, !0)), re === "memory" && !se && (n.setMode("memory"), await $e(!0));
  }
  async function ae(M) {
    if (M.isDirectory) {
      if (!await H("file")) return;
      p.value = null, y.value = "", v.value = "", n.setSelectedFilePath(""), await Y(M.path);
      return;
    }
    await ze(M.path, !0);
  }
  async function _(M) {
    await H("file") && (p.value = null, y.value = "", v.value = "", n.setSelectedFilePath(""), await Y(M));
  }
  async function k() {
    z.value && await H("file") && (p.value = null, y.value = "", v.value = "", n.setSelectedFilePath(""), await Y(z.value));
  }
  async function A() {
    await Y(E.value || void 0, !0);
  }
  async function L() {
    var M;
    (M = p.value) != null && M.path && await ze(p.value.path, !0);
  }
  async function B() {
    var M;
    (M = C.value) != null && M.path && await je(C.value.path, !0);
  }
  async function U(M) {
    const re = M === "file" ? p.value : C.value, se = M === "file" ? y.value : P.value;
    if (re != null && re.path) {
      x.value = !0;
      try {
        const Se = await sy(re.path, se);
        t.pushToast({
          tone: Se.success ? "success" : "error",
          message: Se.message
        }), Se.success && (M === "file" ? (v.value = cn(se), p.value && (p.value.content = se), await Y(E.value || void 0, !0)) : (R.value = cn(se), C.value && (C.value.content = se), await $e(!0)));
      } catch (Se) {
        t.pushToast({
          tone: "error",
          message: Se instanceof Error ? Se.message : String(Se)
        });
      } finally {
        x.value = !1;
      }
    }
  }
  async function te() {
    const M = E.value;
    if (!M) return;
    const re = N.value.trim();
    if (!re) {
      t.pushToast({
        tone: "warning",
        message: e.label("请输入要创建的文件名或目录名。", "Enter the file or directory name first.")
      });
      return;
    }
    $.value = !0;
    try {
      const se = await ly(M, re, T.value);
      t.pushToast({
        tone: se.success ? "success" : "error",
        message: se.message
      }), se.success && (N.value = "", await Y(M, !0), T.value === "file" && se.path && await ze(se.path, !1));
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
  async function J() {
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
    n.mode === "memory" ? await ne() : await I(), l.value = !1;
  }
  async function ge() {
    var M, re, se, Se;
    if (n.mode === "memory") {
      if (await $e(!0), (M = C.value) != null && M.path && !_e.value) {
        await je(C.value.path, !1);
        return;
      }
      (re = C.value) != null && re.path && _e.value && t.pushToast({
        tone: "info",
        message: e.label(
          "已刷新记忆目录，但为避免覆盖未保存改动，当前编辑器内容保持不变。",
          "The memory catalog was refreshed, but the current editor content was kept to avoid overwriting unsaved changes."
        ),
        durationMs: 2600
      });
      return;
    }
    if (await Y(E.value || void 0, !0), (se = p.value) != null && se.path && !fe.value) {
      await ze(p.value.path, !1);
      return;
    }
    (Se = p.value) != null && Se.path && fe.value && t.pushToast({
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
  function he(M) {
    N.value = M;
  }
  function ve(M) {
    y.value = M;
  }
  function Ae(M) {
    P.value = M;
  }
  function Le(M) {
    Ve.value && (M.preventDefault(), M.returnValue = "");
  }
  return nt(() => {
    typeof window < "u" && window.addEventListener("beforeunload", Le), V();
  }), Ll(() => {
    typeof window < "u" && window.removeEventListener("beforeunload", Le);
  }), Zf(async () => Je()), {
    workspace: n,
    fileTabs: O,
    modeLoading: l,
    directoryLoading: i,
    memoryCatalogLoading: r,
    editorLoading: c,
    currentError: ee,
    filesResponse: f,
    roots: b,
    entries: S,
    currentPath: E,
    parentPath: z,
    selectedRoot: j,
    directoryCount: me,
    regularFileCount: Ce,
    memoryFiles: Oe,
    filteredMemoryFiles: Ge,
    memoryGroups: ue,
    fileDirty: fe,
    memoryDirty: _e,
    currentFile: p,
    currentFileDraft: y,
    currentMemoryFile: C,
    currentMemoryDraft: P,
    saving: x,
    creating: $,
    createKind: T,
    createName: N,
    switchMode: G,
    openEntry: ae,
    openRoot: _,
    goToParentDirectory: k,
    reloadCurrentDirectory: A,
    reloadCurrentFile: L,
    reloadCurrentMemoryFile: B,
    saveCurrent: U,
    setCreateKind: ie,
    setCreateName: he,
    createEntry: te,
    updateMemoryKind: X,
    openMemoryFile: je,
    revealMemoryInAllFiles: J,
    softRefreshCurrentView: ge,
    setCurrentFileDraft: ve,
    setCurrentMemoryDraft: Ae,
    getMemoryFilterLabel: (M) => ey(e, M),
    getMemoryFileKind: Lt,
    renderMemoryLabel: Zs
  };
}
const oy = { class: "page-stack" }, ry = { class: "page-header" }, cy = { class: "page-header__eyebrow" }, uy = { class: "page-header__title" }, dy = { class: "page-header__description" }, fy = {
  key: 0,
  class: "page-empty"
}, hy = {
  key: 1,
  class: "page-empty page-empty--error"
}, py = {
  key: 0,
  class: "page-two-column"
}, gy = {
  key: 1,
  class: "page-two-column"
}, my = /* @__PURE__ */ we({
  __name: "FilesPage",
  setup(e) {
    const t = ke(), {
      workspace: n,
      fileTabs: l,
      modeLoading: i,
      directoryLoading: r,
      memoryCatalogLoading: c,
      editorLoading: u,
      currentError: d,
      filesResponse: f,
      roots: h,
      entries: p,
      currentPath: y,
      parentPath: v,
      selectedRoot: C,
      directoryCount: P,
      regularFileCount: R,
      memoryFiles: x,
      filteredMemoryFiles: $,
      memoryGroups: T,
      fileDirty: N,
      memoryDirty: O,
      currentFile: ee,
      currentFileDraft: b,
      currentMemoryFile: S,
      currentMemoryDraft: E,
      saving: z,
      creating: j,
      createKind: me,
      createName: Ce,
      switchMode: Oe,
      openEntry: Ge,
      openRoot: ue,
      goToParentDirectory: fe,
      reloadCurrentDirectory: _e,
      reloadCurrentFile: Ve,
      reloadCurrentMemoryFile: Je,
      saveCurrent: H,
      setCreateKind: q,
      setCreateName: Y,
      createEntry: $e,
      updateMemoryKind: ze,
      openMemoryFile: je,
      revealMemoryInAllFiles: I,
      softRefreshCurrentView: ne,
      setCurrentFileDraft: w,
      setCurrentMemoryDraft: G,
      getMemoryFilterLabel: ae,
      renderMemoryLabel: _
    } = iy();
    return (k, A) => {
      var L, B, U, te, X, J;
      return g(), m("div", oy, [
        a("header", ry, [
          a("div", null, [
            a("p", cy, o(s(t).label("文件 / 资产", "Files / Assets")), 1),
            a("h2", uy, o(s(t).label("文件与记忆", "Files and memory")), 1),
            a("p", dy, o(s(t).label(
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
          }, o(s(i) || s(r) || s(c) ? s(t).label("刷新中…", "Refreshing…") : s(t).label("Refresh", "Refresh")), 1)
        ]),
        K(Os, {
          items: s(l),
          "active-id": s(n).mode,
          onChange: s(Oe)
        }, null, 8, ["items", "active-id", "onChange"]),
        s(i) ? (g(), m("div", fy, o(s(t).label("正在恢复文件视图…", "Restoring the workspace view…")), 1)) : s(d) && (s(n).mode === "all" && !s(f) || s(n).mode === "memory" && !s(x).length) ? (g(), m("div", hy, o(s(d)), 1)) : (g(), m(W, { key: 2 }, [
          K(tv, {
            mode: s(n).mode,
            "roots-count": s(h).length,
            "selected-root-label": ((L = s(C)) == null ? void 0 : L.label) || "",
            "entries-count": s(p).length,
            "directory-count": s(P),
            "regular-file-count": s(R),
            "current-file-label": ((B = s(ee)) == null ? void 0 : B.relativePath) || "",
            "current-path": s(y),
            "selected-root-type": ((U = s(C)) == null ? void 0 : U.type) || null,
            "memory-files-count": s(x).length,
            "memory-docs-count": s(x).filter((V) => s(Lt)(V) === "docs").length,
            "memory-notes-count": s(x).filter((V) => s(Lt)(V) === "notes").length,
            "memory-groups-count": s(T).length,
            "filtered-memory-files-count": s($).length,
            "memory-filter-label": s(ae)(s(n).memoryKindFilter),
            "memory-filter-query": s(n).memoryFilterQuery,
            "current-memory-label": ((te = s(S)) == null ? void 0 : te.relativePath) || ""
          }, null, 8, ["mode", "roots-count", "selected-root-label", "entries-count", "directory-count", "regular-file-count", "current-file-label", "current-path", "selected-root-type", "memory-files-count", "memory-docs-count", "memory-notes-count", "memory-groups-count", "filtered-memory-files-count", "memory-filter-label", "memory-filter-query", "current-memory-label"]),
          s(n).mode === "all" ? (g(), m("div", py, [
            K(Xv, {
              roots: s(h),
              "current-path": s(y),
              "parent-path": s(v),
              "current-file-path": ((X = s(ee)) == null ? void 0 : X.path) || "",
              entries: s(p),
              "create-kind": s(me),
              "create-name": s(Ce),
              "directory-loading": s(r),
              creating: s(j),
              onOpenRoot: s(ue),
              onOpenEntry: s(Ge),
              onGoUp: s(fe),
              onReload: s(_e),
              "onUpdate:createKind": s(q),
              "onUpdate:createName": s(Y),
              onCreate: s($e)
            }, null, 8, ["roots", "current-path", "parent-path", "current-file-path", "entries", "create-kind", "create-name", "directory-loading", "creating", "onOpenRoot", "onOpenEntry", "onGoUp", "onReload", "onUpdate:createKind", "onUpdate:createName", "onCreate"]),
            K(Lb, {
              "editor-loading": s(u),
              "current-file": s(ee),
              draft: s(b),
              "file-dirty": s(N),
              saving: s(z),
              onReload: s(Ve),
              onSave: A[1] || (A[1] = (V) => s(H)("file")),
              "onUpdate:draft": s(w)
            }, null, 8, ["editor-loading", "current-file", "draft", "file-dirty", "saving", "onReload", "onUpdate:draft"])
          ])) : (g(), m("div", gy, [
            K(wv, {
              groups: s(T),
              "filtered-count": s($).length,
              "total-count": s(x).length,
              "current-memory-path": ((J = s(S)) == null ? void 0 : J.path) || "",
              loading: s(c),
              "get-memory-filter-label": s(ae),
              "get-memory-file-kind": s(Lt),
              "render-memory-label": s(_),
              onUpdateKind: s(ze),
              onOpenMemoryFile: s(je)
            }, null, 8, ["groups", "filtered-count", "total-count", "current-memory-path", "loading", "get-memory-filter-label", "get-memory-file-kind", "render-memory-label", "onUpdateKind", "onOpenMemoryFile"]),
            K(Pv, {
              "editor-loading": s(u),
              "current-memory-file": s(S),
              draft: s(E),
              "memory-dirty": s(O),
              saving: s(z),
              onReload: s(Je),
              onReveal: s(I),
              onSave: A[2] || (A[2] = (V) => s(H)("memory")),
              "onUpdate:draft": s(G)
            }, null, 8, ["editor-loading", "current-memory-file", "draft", "memory-dirty", "saving", "onReload", "onReveal", "onUpdate:draft"])
          ]))
        ], 64))
      ]);
    };
  }
});
async function by(e = 200) {
  const t = await Pe(`/api/service/logs?lines=${encodeURIComponent(String(e))}`);
  return {
    logs: Array.isArray(t.logs) ? t.logs.map((n) => String(n)) : [],
    requestedLines: e
  };
}
const vy = { class: "page-stack" }, yy = { class: "page-header" }, _y = { class: "page-header__eyebrow" }, wy = { class: "page-header__title" }, ky = { class: "page-header__description" }, $y = {
  key: 0,
  class: "page-empty"
}, Cy = {
  key: 1,
  class: "page-empty page-empty--error"
}, Sy = { class: "stat-grid" }, Ay = { class: "stat-card" }, Ry = { class: "stat-card__label" }, Ty = { class: "stat-card" }, xy = { class: "stat-card__label" }, Py = { class: "stat-card" }, Ey = { class: "stat-card__label" }, Dy = { class: "stat-card" }, My = { class: "stat-card__label" }, Iy = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Oy = { class: "page-actions" }, Ly = ["onClick"], Uy = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Ny = {
  key: 1,
  "data-testid": "logs-raw-output",
  class: "code-panel log-output"
}, Fy = {
  key: 0,
  class: "list-stack"
}, Gy = {
  key: 1,
  class: "page-empty"
}, By = { class: "muted-copy" }, Vy = /* @__PURE__ */ we({
  __name: "LogsPage",
  setup(e) {
    let t = null;
    const n = ke(), l = ot(), i = /* @__PURE__ */ F((t == null ? void 0 : t.requestedLines) || 200), r = ct(() => by(i.value), t, { immediate: !1 }), c = [100, 200, 500], u = /(error|warn|fail|exception|timeout|denied|refused|panic|fatal|traceback|错误|失败|异常|拒绝|超时)/i, d = D(() => {
      var v;
      return ((v = r.data) == null ? void 0 : v.logs) || [];
    }), f = D(() => /^(获取日志失败|Failed to fetch logs)/.test(d.value[0] || "")), h = D(() => {
      const v = d.value.filter((C) => u.test(C));
      return v.length ? v.slice(-8) : d.value.slice(-6);
    });
    xe(() => r.data, (v) => {
      v && (t = v);
    }), nt(() => {
      r.execute({ silent: !!r.data });
    });
    async function p(v) {
      typeof v == "number" && (i.value = v), await r.execute({ silent: !!r.data });
    }
    async function y() {
      var v;
      typeof navigator > "u" || !((v = navigator.clipboard) != null && v.writeText) || (await navigator.clipboard.writeText(d.value.join(`
`)), l.pushToast({
        tone: "success",
        message: n.label("最近日志已复制。", "The latest log lines have been copied.")
      }));
    }
    return (v, C) => (g(), m("div", vy, [
      a("header", yy, [
        a("div", null, [
          a("p", _y, o(s(n).label("日志 / 追踪", "Logs / Tracing")), 1),
          a("h2", wy, o(s(n).label("日志与排障", "Logs & troubleshooting")), 1),
          a("p", ky, o(s(n).label("集中查看 Gateway 最近日志，支持切换日志行数、静默刷新和快速复制，让排障更直接。", "Review the latest Gateway logs here with line switching, silent refresh, and quick copy for faster troubleshooting.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: C[0] || (C[0] = (P) => p())
        }, o(s(r).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新日志", "Refresh logs")), 1)
      ]),
      s(r).loading && !s(r).data ? (g(), m("div", $y, o(s(n).label("正在读取最近日志…", "Loading the latest log lines…")), 1)) : s(r).error && !s(r).data ? (g(), m("div", Cy, o(s(r).error), 1)) : s(r).data ? (g(), m(W, { key: 2 }, [
        K(le, {
          title: s(n).label("日志概览", "Log overview"),
          eyebrow: "Gateway"
        }, {
          default: Z(() => [
            a("div", Sy, [
              a("article", Ay, [
                a("p", Ry, o(s(n).label("日志来源", "Source")), 1),
                C[1] || (C[1] = a("strong", null, "Gateway", -1)),
                a("span", null, o(s(n).label("当前展示 Gateway 日志流", "Currently showing the Gateway log stream")), 1)
              ]),
              a("article", Ty, [
                a("p", xy, o(s(n).label("请求行数", "Requested lines")), 1),
                a("strong", null, o(s(de)(s(r).data.requestedLines)), 1),
                a("span", null, o(s(n).label("切换后会静默拉取新结果", "Changing this refreshes the result silently")), 1)
              ]),
              a("article", Py, [
                a("p", Ey, o(s(n).label("返回行数", "Returned lines")), 1),
                a("strong", null, o(s(de)(d.value.length)), 1),
                a("span", null, o(s(n).label("展示当前接口返回的最新结果", "Shows the latest lines returned by the API")), 1)
              ]),
              a("article", Dy, [
                a("p", My, o(s(n).label("当前状态", "Current state")), 1),
                a("strong", null, o(f.value ? s(n).label("需要排查", "Needs attention") : s(n).label("可直接查看", "Ready to inspect")), 1),
                a("span", null, o(f.value ? s(n).label("接口返回了错误提示，建议先回到运维确认服务状态。", "The API returned an error banner. Confirm the service state in Operations first.") : s(n).label("如果最近刚执行过启停或重启，先看这里通常最快。", "If you recently started, stopped, or restarted services, this is usually the fastest place to check.")), 1)
              ])
            ]),
            s(r).error ? (g(), m("div", Iy, o(s(n).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(s(r).error), 1)) : Q("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(n).label("最近日志输出", "Latest log output"),
          eyebrow: "Output"
        }, {
          actions: Z(() => [
            a("div", Oy, [
              (g(), m(W, null, ce(c, (P) => a("button", {
                key: P,
                class: oe(["pill-button", { "pill-button--active": i.value === P }]),
                type: "button",
                onClick: (R) => p(P)
              }, o(s(n).label(`最近 ${P} 行`, `${P} lines`)), 11, Ly)), 64)),
              s(n).developerMode ? (g(), m("button", {
                key: 0,
                "data-testid": "logs-copy-action",
                class: "inline-link",
                type: "button",
                onClick: y
              }, o(s(n).label("复制日志", "Copy logs")), 1)) : Q("", !0)
            ])
          ]),
          default: Z(() => [
            f.value ? (g(), m("div", Uy, o(d.value[0]), 1)) : Q("", !0),
            s(n).developerMode ? (g(), m("pre", Ny, o(d.value.join(`
`) || s(n).label("当前没有可显示的日志内容。", "No log content is available right now.")), 1)) : (g(), m(W, { key: 2 }, [
              h.value.length ? (g(), m("div", Fy, [
                (g(!0), m(W, null, ce(h.value, (P, R) => (g(), m("article", {
                  key: `${R}:${P}`,
                  class: "risk-row"
                }, [
                  a("strong", null, o(u.test(P) ? s(n).label("关键片段", "Key line") : s(n).label("最近输出", "Recent line")), 1),
                  a("span", null, o(P), 1)
                ]))), 128))
              ])) : (g(), m("div", Gy, o(s(n).label("当前没有可显示的日志摘要。", "No log summary is available right now.")), 1)),
              a("p", By, o(s(n).label("完整原始日志和复制动作已收纳到开发者模式。需要逐行排障时，请先到 Settings 打开开发者模式。", "Full raw logs and copy actions now stay behind developer mode. Enable developer mode from Settings when you need line-by-line troubleshooting.")), 1)
            ], 64))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : Q("", !0)
    ]));
  }
}), jy = { class: "page-two-column" }, zy = { class: "catalog-list" }, Wy = ["onClick"], Hy = { class: "catalog-list__title" }, Ky = { class: "pill-row" }, qy = { class: "page-stack" }, Jy = { class: "muted-copy" }, Qy = { class: "settings-grid settings-grid--wide" }, Yy = { class: "settings-field" }, Zy = { class: "settings-field" }, Xy = { class: "settings-field" }, e_ = ["value"], t_ = { class: "settings-field" }, n_ = { class: "settings-field settings-field--full" }, s_ = { class: "page-actions" }, l_ = ["disabled"], a_ = ["disabled"], i_ = { class: "provider-stack" }, o_ = { class: "provider-card__header" }, r_ = { class: "pill-row" }, c_ = {
  key: 0,
  class: "pill pill--success"
}, u_ = {
  key: 1,
  class: "pill pill--muted"
}, d_ = { class: "mini-list" }, f_ = { class: "pill-row" }, h_ = {
  key: 0,
  class: "pill pill--success"
}, p_ = {
  key: 1,
  class: "pill pill--info"
}, g_ = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    return (i, r) => (g(), m("div", jy, [
      K(le, {
        title: s(l).label("Provider 选择器", "Provider picker"),
        eyebrow: "Provider"
      }, {
        default: Z(() => [
          a("div", zy, [
            (g(!0), m(W, null, ce(e.pickerOptions, (c) => (g(), m("button", {
              key: c.value,
              class: oe(["catalog-list__item", { "catalog-list__item--active": e.selectedKey === c.value }]),
              type: "button",
              onClick: (u) => n("update:selectedKey", c.value)
            }, [
              a("div", Hy, [
                a("strong", null, o(c.label), 1)
              ]),
              a("div", Ky, [
                a("span", {
                  class: oe(["pill", c.kind === "custom" ? "pill--success" : c.kind === "preset" ? "pill--info" : "pill--muted"])
                }, o(c.kind === "custom" ? s(l).label("已配置", "Configured") : c.kind === "preset" ? s(l).label("预设", "Preset") : s(l).label("空白", "Blank")), 3)
              ])
            ], 10, Wy))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      a("div", qy, [
        K(le, {
          title: e.providerDraft.title,
          eyebrow: "Editor"
        }, {
          default: Z(() => [
            a("p", Jy, o(e.providerHint), 1),
            a("div", Qy, [
              a("label", Yy, [
                a("span", null, o(s(l).label("Provider 名称", "Provider name")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[0] || (r[0] = (c) => e.providerDraft.name = c),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [Re, e.providerDraft.name]
                ])
              ]),
              a("label", Zy, [
                r[8] || (r[8] = a("span", null, "Base URL", -1)),
                pe(a("input", {
                  "onUpdate:modelValue": r[1] || (r[1] = (c) => e.providerDraft.baseUrl = c),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [Re, e.providerDraft.baseUrl]
                ])
              ]),
              a("label", Xy, [
                a("span", null, o(s(l).label("默认 API 类型", "Default API type")), 1),
                pe(a("select", {
                  "onUpdate:modelValue": r[2] || (r[2] = (c) => e.providerDraft.apiType = c),
                  class: "settings-input"
                }, [
                  (g(!0), m(W, null, ce(e.apiTypeOptions, (c) => (g(), m("option", {
                    key: c,
                    value: c
                  }, o(c), 9, e_))), 128))
                ], 512), [
                  [mt, e.providerDraft.apiType]
                ])
              ]),
              a("label", t_, [
                r[9] || (r[9] = a("span", null, "API Key", -1)),
                a("small", null, o(e.providerDraft.apiKeyHelp), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[3] || (r[3] = (c) => e.providerDraft.apiKey = c),
                  class: "settings-input",
                  type: "password"
                }, null, 512), [
                  [Re, e.providerDraft.apiKey]
                ])
              ]),
              a("label", n_, [
                a("span", null, o(s(l).label("模型列表", "Model list")), 1),
                a("small", null, o(s(l).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                pe(a("textarea", {
                  "onUpdate:modelValue": r[4] || (r[4] = (c) => e.providerDraft.modelsText = c),
                  class: "settings-textarea",
                  rows: "8"
                }, null, 512), [
                  [Re, e.providerDraft.modelsText]
                ])
              ])
            ]),
            a("div", s_, [
              a("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: e.providerSaving,
                onClick: r[5] || (r[5] = (c) => n("save"))
              }, o(e.providerSaving ? s(l).label("保存中…", "Saving…") : s(l).label("保存 Provider", "Save provider")), 9, l_),
              a("button", {
                class: "inline-link",
                type: "button",
                onClick: r[6] || (r[6] = (c) => n("reset"))
              }, o(s(l).label("恢复当前内容", "Reset draft")), 1),
              e.providerDraft.canDelete ? (g(), m("button", {
                key: 0,
                class: "inline-link inline-link--danger",
                type: "button",
                disabled: e.providerDeleting,
                onClick: r[7] || (r[7] = (c) => n("delete"))
              }, o(e.providerDeleting ? s(l).label("删除中…", "Deleting…") : s(l).label("删除 Provider", "Delete provider")), 9, a_)) : Q("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(l).label("已配置 Provider", "Configured providers"),
          eyebrow: "Overview"
        }, {
          default: Z(() => [
            a("div", i_, [
              (g(!0), m(W, null, ce(e.configuredProviders, (c) => (g(), m("article", {
                key: c.name,
                class: "provider-card"
              }, [
                a("header", o_, [
                  a("div", null, [
                    a("strong", null, o(c.name), 1),
                    a("p", null, o(c.baseUrl), 1)
                  ]),
                  a("div", r_, [
                    c.hasApiKey ? (g(), m("span", c_, o(s(l).label("有密钥", "Has key")), 1)) : (g(), m("span", u_, o(s(l).label("无密钥", "No key")), 1))
                  ])
                ]),
                a("div", d_, [
                  (g(!0), m(W, null, ce(c.models, (u) => (g(), m("div", {
                    key: u.fullId,
                    class: "mini-list__item"
                  }, [
                    a("div", null, [
                      a("strong", null, o(u.name), 1),
                      a("p", null, o(u.fullId), 1)
                    ]),
                    a("div", f_, [
                      u.isPrimary ? (g(), m("span", h_, o(s(l).label("主模型", "Primary")), 1)) : Q("", !0),
                      u.isFallback ? (g(), m("span", p_, o(s(l).label("备用", "Fallback")), 1)) : Q("", !0)
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
}), m_ = { class: "page-stack" }, b_ = { class: "stat-grid" }, v_ = { class: "stat-card" }, y_ = { class: "stat-card__label" }, __ = { class: "stat-card" }, w_ = { class: "stat-card__label" }, k_ = { class: "stat-card" }, $_ = { class: "stat-card__label" }, C_ = { class: "stat-card" }, S_ = { class: "stat-card__label" }, A_ = { class: "settings-grid settings-grid--wide" }, R_ = { class: "settings-field" }, T_ = ["value"], x_ = { value: "" }, P_ = ["value"], E_ = { class: "checkbox-grid" }, D_ = ["checked", "onChange"], M_ = { class: "page-actions" }, I_ = ["disabled"], O_ = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    return (i, r) => (g(), m("div", m_, [
      K(le, {
        title: s(l).label("当前路由概览", "Current routing overview"),
        eyebrow: "Routing"
      }, {
        default: Z(() => [
          a("div", b_, [
            a("article", v_, [
              a("p", y_, o(s(l).label("主模型", "Primary model")), 1),
              a("strong", null, o(e.primaryModel || s(l).label("未配置", "Not configured")), 1),
              a("span", null, o(s(l).label("默认执行路径", "Default execution route")), 1)
            ]),
            a("article", __, [
              a("p", w_, o(s(l).label("Provider 数量", "Providers")), 1),
              a("strong", null, o(e.providerCount), 1),
              a("span", null, o(s(l).label("已经进入运行配置", "Already present in runtime config")), 1)
            ]),
            a("article", k_, [
              a("p", $_, o(s(l).label("备用模型", "Fallbacks")), 1),
              a("strong", null, o(e.fallbackCount), 1),
              a("span", null, o(s(l).label("主模型失败时按顺序尝试", "Tried in sequence when the primary route fails")), 1)
            ]),
            a("article", C_, [
              a("p", S_, o(s(l).label("可选模型", "Available models")), 1),
              a("strong", null, o(e.availableModelCount), 1),
              a("span", null, o(s(l).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("主模型与备用链路", "Primary and fallback chain"),
        eyebrow: "Routing editor"
      }, {
        default: Z(() => [
          a("div", A_, [
            a("label", R_, [
              a("span", null, o(s(l).label("主模型", "Primary model")), 1),
              a("small", null, o(s(l).label("Guard 默认会先走这一条模型路径。", "Guard routes here first by default.")), 1),
              a("select", {
                class: "settings-input",
                value: e.primaryDraft,
                onChange: r[0] || (r[0] = (c) => n("update:primaryDraft", c.target.value))
              }, [
                a("option", x_, o(s(l).label("暂不设置", "Leave unset")), 1),
                (g(!0), m(W, null, ce(e.allModels, (c) => (g(), m("option", {
                  key: c.fullId,
                  value: c.fullId
                }, o(`${c.providerName} / ${c.name}`), 9, P_))), 128))
              ], 40, T_)
            ])
          ]),
          a("div", E_, [
            (g(!0), m(W, null, ce(e.allModels, (c) => (g(), m("label", {
              key: c.fullId,
              class: "checkbox-card"
            }, [
              a("input", {
                checked: e.fallbackDraft.includes(c.fullId),
                type: "checkbox",
                onChange: (u) => n("toggleFallback", c.fullId)
              }, null, 40, D_),
              a("div", null, [
                a("strong", null, o(`${c.providerName} / ${c.name}`), 1),
                a("p", null, o(c.api || s(l).label("未声明 API 类型", "API type is not declared")), 1)
              ])
            ]))), 128))
          ]),
          a("div", M_, [
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.routingSaving,
              onClick: r[1] || (r[1] = (c) => n("save"))
            }, o(e.routingSaving ? s(l).label("保存中…", "Saving…") : s(l).label("保存路由策略", "Save routing strategy")), 9, I_)
          ])
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
async function L_() {
  const [e, t] = await Promise.all([
    Pe("/api/ai/config"),
    Pe("/api/ai/providers")
  ]);
  return { config: e, catalog: t };
}
function U_(e) {
  return Ie("/api/ai/provider", e);
}
function N_(e) {
  return ql(`/api/ai/provider/${encodeURIComponent(e)}`);
}
function F_(e) {
  return Ie("/api/ai/primary", { modelId: e });
}
function G_(e) {
  return Ie("/api/ai/fallbacks", { modelIds: e });
}
const tn = "__new__", ss = "openai-completions", B_ = [
  "openai-completions",
  "anthropic-messages",
  "openai-responses"
];
let fi = null;
function hi(e, t) {
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
function V_(e, t) {
  return e.split(/\r?\n/).map((n) => n.trim()).filter(Boolean).map((n) => {
    const [l, i, r, c, u] = n.split("|").map((d) => d.trim());
    return {
      id: l,
      name: i || l,
      contextWindow: ms(r),
      maxTokens: ms(c),
      api: u || t || void 0
    };
  }).filter((n) => n.id);
}
function j_(e, t, n) {
  var l;
  return t ? e.label(`预设来源：${t.name}`, `Preset source: ${t.name}`) : (l = n == null ? void 0 : n.models) != null && l.length ? e.label(
    `当前已记录 ${n.models.length} 个模型条目`,
    `${n.models.length} model entries are recorded now`
  ) : e.label(
    "保存后会写入当前生效的 openclaw.json。",
    "Saving writes the provider into the active openclaw.json."
  );
}
function z_() {
  const e = ke(), t = ot(), n = ct(() => L_(), fi, {
    immediate: !1
  }), l = /* @__PURE__ */ F(tn), i = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F([]), f = /* @__PURE__ */ ht({
    mode: "new",
    title: "",
    canDelete: !1,
    name: "",
    baseUrl: "",
    apiType: ss,
    apiKey: "",
    apiKeyHelp: "",
    modelsText: ""
  }), h = D(() => {
    const b = n.data, S = (b == null ? void 0 : b.config.providers) || [], E = (b == null ? void 0 : b.catalog.presets) || [];
    return [
      {
        value: tn,
        label: e.label("新建空白 Provider", "Create blank provider"),
        kind: "new"
      },
      ...S.map((z) => ({
        value: z.name,
        label: `${z.name} · ${e.label("已配置", "Configured")}`,
        kind: "custom"
      })),
      ...E.filter(
        (z) => !S.some((j) => j.name === z.id)
      ).map((z) => ({
        value: z.id,
        label: `${z.id} · ${e.label("预设", "Preset")}`,
        kind: "preset"
      }))
    ];
  }), p = D(
    () => {
      var b;
      return ((b = n.data) == null ? void 0 : b.config.providers) || [];
    }
  ), y = D(
    () => p.value.flatMap(
      (b) => b.models.map((S) => ({
        providerName: b.name,
        fullId: S.fullId,
        name: S.name,
        api: S.api
      }))
    )
  ), v = D(
    () => {
      var b;
      return (b = n.data) == null ? void 0 : b.catalog.presets.find((S) => S.id === l.value);
    }
  ), C = D(
    () => {
      var b;
      return (b = n.data) == null ? void 0 : b.catalog.custom.find((S) => S.name === l.value);
    }
  ), P = D(
    () => j_(e, v.value, C.value)
  );
  function R(b) {
    var Oe, Ge;
    const S = n.data;
    if (!S)
      return;
    const E = new Map(
      S.config.providers.map((ue) => [ue.name, ue])
    ), z = new Map(
      (S.catalog.custom || []).map((ue) => [ue.name, ue])
    ), j = new Map(
      (S.catalog.presets || []).map((ue) => [ue.id, ue])
    );
    if (!b || b === tn) {
      f.mode = "new", f.title = e.label("新建 Provider", "Create provider"), f.canDelete = !1, f.name = "", f.baseUrl = "", f.apiType = ss, f.apiKey = "", f.apiKeyHelp = e.label(
        "确认保存后会写入 openclaw.json。",
        "Saved into openclaw.json after you confirm."
      ), f.modelsText = "";
      return;
    }
    const me = z.get(b);
    if (me) {
      const ue = E.get(b);
      f.mode = "custom", f.title = e.label(
        "编辑已配置 Provider",
        "Edit configured provider"
      ), f.canDelete = !0, f.name = b, f.baseUrl = me.baseUrl || "", f.apiType = me.apiType || me.api || ((Ge = (Oe = me.models) == null ? void 0 : Oe[0]) == null ? void 0 : Ge.api) || ss, f.apiKey = "", f.apiKeyHelp = ue != null && ue.apiKeyMasked ? e.label(
        `留空会保留当前密钥：${ue.apiKeyMasked}`,
        `Leave blank to keep the current key: ${ue.apiKeyMasked}`
      ) : e.label(
        "填写后会覆盖当前密钥。",
        "A filled value replaces the current key."
      ), f.modelsText = hi(
        me.models || [],
        f.apiType
      );
      return;
    }
    const Ce = j.get(b);
    if (Ce) {
      f.mode = "preset", f.title = e.label(
        "从预设带入 Provider",
        "Bootstrap provider from preset"
      ), f.canDelete = !1, f.name = Ce.id, f.baseUrl = Ce.defaultBaseUrl || "", f.apiType = Ce.apiType || ss, f.apiKey = "", f.apiKeyHelp = Ce.requiresApiKey ? e.label("保存前请填写 API Key。", "Fill in the API key before saving.") : e.label(
        "这个 Provider 通常不需要 API Key。",
        "This provider usually does not require an API key."
      ), f.modelsText = hi(
        (Ce.suggestedModels || []).map((ue) => ({
          id: ue.id,
          name: ue.name,
          api: Ce.apiType
        })),
        Ce.apiType
      );
      return;
    }
    l.value = tn;
  }
  xe(
    () => n.data,
    (b) => {
      var E;
      if (b && (fi = b), !b)
        return;
      u.value = b.config.primaryModel || "", d.value = [...b.config.fallbackModels || []];
      const S = h.value;
      if (!S.some((z) => z.value === l.value)) {
        l.value = ((E = S[1]) == null ? void 0 : E.value) || tn;
        return;
      }
      R(l.value);
    },
    { immediate: !0 }
  ), xe(l, (b) => {
    R(b);
  }), nt(() => {
    n.execute({ silent: !!n.data });
  });
  async function x() {
    await n.execute({ silent: !0 });
  }
  async function $() {
    i.value = !0;
    try {
      const b = await F_(u.value);
      if (!b.success)
        throw new Error(b.message);
      const S = await G_(
        d.value.filter((E) => E !== u.value)
      );
      if (!S.success)
        throw new Error(S.message);
      t.pushToast({
        tone: "success",
        message: e.label(
          "模型路由策略已更新。",
          "Model routing was updated."
        )
      }), await x();
    } catch (b) {
      t.pushToast({
        tone: "error",
        message: b instanceof Error ? b.message : String(b)
      });
    } finally {
      i.value = !1;
    }
  }
  async function T() {
    r.value = !0;
    try {
      const b = await U_({
        name: f.name.trim(),
        baseUrl: f.baseUrl.trim(),
        apiKey: f.apiKey.trim() || void 0,
        apiType: f.apiType,
        models: V_(f.modelsText, f.apiType)
      });
      t.pushToast({
        tone: b.success ? "success" : "error",
        message: b.message
      }), b.success && (l.value = f.name.trim() || tn, await x());
    } catch (b) {
      t.pushToast({
        tone: "error",
        message: b instanceof Error ? b.message : String(b)
      });
    } finally {
      r.value = !1;
    }
  }
  async function N() {
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
        const S = await N_(f.name);
        t.pushToast({
          tone: S.success ? "success" : "error",
          message: S.message
        }), S.success && (l.value = tn, await x());
      } catch (S) {
        t.pushToast({
          tone: "error",
          message: S instanceof Error ? S.message : String(S)
        });
      } finally {
        c.value = !1;
      }
    }
  }
  function O(b) {
    if (d.value.includes(b)) {
      d.value = d.value.filter((S) => S !== b);
      return;
    }
    d.value = [...d.value, b];
  }
  function ee() {
    R(l.value);
  }
  return {
    resource: n,
    selectedKey: l,
    routingSaving: i,
    providerSaving: r,
    providerDeleting: c,
    primaryDraft: u,
    fallbackDraft: d,
    providerDraft: f,
    pickerOptions: h,
    configuredProviders: p,
    allModels: y,
    providerHint: P,
    refresh: x,
    handleRoutingSave: $,
    handleProviderSave: T,
    handleProviderDelete: N,
    toggleFallback: O,
    resetProviderDraft: ee
  };
}
const W_ = { class: "page-stack" }, H_ = { class: "page-header" }, K_ = { class: "page-header__eyebrow" }, q_ = { class: "page-header__title" }, J_ = { class: "page-header__description" }, Q_ = {
  key: 0,
  class: "page-empty"
}, Y_ = {
  key: 1,
  class: "page-empty page-empty--error"
}, Z_ = {
  key: 0,
  class: "status-banner status-banner--warning"
}, X_ = /* @__PURE__ */ we({
  __name: "ModelsPage",
  setup(e) {
    const t = ke(), {
      resource: n,
      selectedKey: l,
      routingSaving: i,
      providerSaving: r,
      providerDeleting: c,
      primaryDraft: u,
      fallbackDraft: d,
      providerDraft: f,
      pickerOptions: h,
      configuredProviders: p,
      allModels: y,
      providerHint: v,
      refresh: C,
      handleRoutingSave: P,
      handleProviderSave: R,
      handleProviderDelete: x,
      toggleFallback: $,
      resetProviderDraft: T
    } = z_();
    return (N, O) => (g(), m("div", W_, [
      a("header", H_, [
        a("div", null, [
          a("p", K_, o(s(t).label("模型 / 策略", "Models / Strategy")), 1),
          a("h2", q_, o(s(t).label("模型策略", "Model strategy")), 1),
          a("p", J_, o(s(t).label("把 Provider、主模型和 fallback 链路放到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: O[0] || (O[0] = //@ts-ignore
          (...ee) => s(C) && s(C)(...ee))
        }, o(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新", "Refresh")), 1)
      ]),
      s(n).loading && !s(n).data ? (g(), m("div", Q_, o(s(t).label("正在读取模型配置…", "Loading model configuration…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", Y_, o(s(n).error), 1)) : s(n).data ? (g(), m(W, { key: 2 }, [
        s(n).error ? (g(), m("div", Z_, o(s(t).label("已保留上一版模型快照，但后台刷新失败：", "The last model snapshot is still on screen, but the background refresh failed: ")) + o(s(n).error), 1)) : Q("", !0),
        K(O_, {
          "primary-model": s(n).data.config.primaryModel || "",
          "provider-count": s(n).data.config.providers.length,
          "fallback-count": s(n).data.config.fallbackModels.length,
          "available-model-count": s(y).length,
          "all-models": s(y),
          "primary-draft": s(u),
          "fallback-draft": s(d),
          "routing-saving": s(i),
          "onUpdate:primaryDraft": O[1] || (O[1] = (ee) => u.value = ee),
          onToggleFallback: s($),
          onSave: s(P)
        }, null, 8, ["primary-model", "provider-count", "fallback-count", "available-model-count", "all-models", "primary-draft", "fallback-draft", "routing-saving", "onToggleFallback", "onSave"]),
        K(g_, {
          "picker-options": s(h),
          "selected-key": s(l),
          "provider-draft": s(f),
          "provider-hint": s(v),
          "api-type-options": s(B_),
          "configured-providers": s(p),
          "provider-saving": s(r),
          "provider-deleting": s(c),
          "onUpdate:selectedKey": O[2] || (O[2] = (ee) => l.value = ee),
          onSave: s(R),
          onReset: s(T),
          onDelete: s(x)
        }, null, 8, ["picker-options", "selected-key", "provider-draft", "provider-hint", "api-type-options", "configured-providers", "provider-saving", "provider-deleting", "onSave", "onReset", "onDelete"])
      ], 64)) : Q("", !0)
    ]));
  }
});
async function e1(e = 200, t = 80) {
  const [n, l] = await Promise.all([
    Pe(`/api/notifications?limit=${encodeURIComponent(String(e))}`),
    Pe(`/api/activity?limit=${encodeURIComponent(String(t))}`)
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
function t1(e, t) {
  return Ie("/api/notifications/read", { id: e, read: t });
}
function n1(e) {
  return Ie("/api/notifications/bulk", { action: e });
}
const s1 = { class: "page-stack" }, l1 = { class: "page-header" }, a1 = { class: "page-header__eyebrow" }, i1 = { class: "page-header__title" }, o1 = { class: "page-header__description" }, r1 = {
  key: 0,
  class: "page-empty"
}, c1 = {
  key: 1,
  class: "page-empty page-empty--error"
}, u1 = { class: "stat-grid" }, d1 = { class: "stat-card" }, f1 = { class: "stat-card__label" }, h1 = { class: "stat-card" }, p1 = { class: "stat-card__label" }, g1 = { class: "stat-card" }, m1 = { class: "stat-card__label" }, b1 = { class: "stat-card" }, v1 = { class: "stat-card__label" }, y1 = {
  key: 0,
  class: "status-banner status-banner--warning"
}, _1 = { class: "control-grid" }, w1 = { class: "settings-field" }, k1 = ["placeholder"], $1 = { class: "settings-field" }, C1 = { value: "all" }, S1 = ["value"], A1 = { class: "settings-field" }, R1 = ["value"], T1 = { class: "pill-row" }, x1 = { class: "page-actions" }, P1 = ["disabled"], E1 = ["disabled"], D1 = ["disabled"], M1 = ["disabled"], I1 = {
  key: 0,
  class: "muted-copy"
}, O1 = {
  key: 0,
  class: "timeline-day-stack"
}, L1 = { class: "timeline-day-header" }, U1 = { class: "provider-stack" }, N1 = { class: "provider-card__header" }, F1 = { class: "pill-row" }, G1 = { class: "pill-row" }, B1 = { class: "pill pill--info" }, V1 = { class: "pill pill--muted" }, j1 = { class: "page-actions" }, z1 = ["disabled", "onClick"], W1 = ["disabled", "onClick"], H1 = {
  key: 1,
  class: "page-empty"
}, K1 = {
  key: 2,
  class: "pagination-bar"
}, q1 = { class: "muted-copy" }, J1 = { class: "page-actions" }, Q1 = ["disabled"], Y1 = ["disabled"], Z1 = {
  key: 0,
  class: "provider-stack"
}, X1 = { class: "provider-card__header" }, ew = { class: "pill pill--info" }, tw = {
  key: 0,
  class: "muted-copy"
}, nw = {
  key: 1,
  class: "page-empty"
}, sw = /* @__PURE__ */ we({
  __name: "NotificationsPage",
  setup(e) {
    let t = null;
    const n = ke(), l = ot(), i = /* @__PURE__ */ F("reminders"), r = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F("all"), u = /* @__PURE__ */ F("all"), d = /* @__PURE__ */ F(20), f = /* @__PURE__ */ F(1), h = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(""), y = /* @__PURE__ */ F(""), v = ct(() => e1(), t, { immediate: !1 }), C = [10, 20, 50], P = D(() => [
      { id: "reminders", label: n.label("提醒", "Reminders") },
      { id: "timeline", label: n.label("时间线", "Timeline") }
    ]), R = D(() => {
      var H;
      return ((H = v.data) == null ? void 0 : H.summary.items) || [];
    }), x = D(() => {
      var H;
      return ((H = v.data) == null ? void 0 : H.events) || [];
    }), $ = D(() => R.value.filter((H) => H.severity === "warning" || H.severity === "error").length), T = D(() => R.value.filter((H) => H.severity === "success").length), N = D(() => Array.from(new Set(R.value.map((H) => H.source).filter(Boolean))).sort()), O = D(() => {
      const H = r.value.trim().toLowerCase();
      return R.value.filter((q) => u.value === "unread" && q.read || u.value === "warning" && q.severity !== "warning" && q.severity !== "error" || u.value === "success" && q.severity !== "success" || c.value !== "all" && q.source !== c.value ? !1 : H ? [
        q.title,
        q.message,
        q.type,
        q.source,
        JSON.stringify(q.meta || {})
      ].join(" ").toLowerCase().includes(H) : !0);
    }), ee = D(() => Math.max(1, Math.ceil(O.value.length / d.value))), b = D(() => {
      const H = (f.value - 1) * d.value;
      return O.value.slice(H, H + d.value);
    }), S = D(() => {
      var q;
      const H = /* @__PURE__ */ new Map();
      for (const Y of b.value) {
        const $e = Y.createdAt ? Y.createdAt.slice(0, 10) : "unknown";
        H.has($e) || H.set($e, {
          key: $e,
          label: E(Y.createdAt),
          items: []
        }), (q = H.get($e)) == null || q.items.push(Y);
      }
      return Array.from(H.values());
    });
    xe(() => v.data, (H) => {
      H && (t = H);
    }), xe([r, c, u, d, i], () => {
      f.value = 1;
    }), xe(ee, (H) => {
      f.value > H && (f.value = H);
    }), nt(() => {
      v.execute({ silent: !!v.data });
    });
    function E(H) {
      if (!H) return n.label("未知日期", "Unknown date");
      const q = Date.parse(H);
      return Number.isFinite(q) ? new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(q)) : H;
    }
    function z(H) {
      return H === "success" ? "pill--success" : H === "warning" ? "pill--warning" : H === "error" ? "pill--danger" : "pill--info";
    }
    function j(H) {
      return H === "success" ? n.label("成功", "Success") : H === "warning" ? n.label("警告", "Warning") : H === "error" ? n.label("异常", "Error") : n.label("提示", "Info");
    }
    function me(H) {
      const Y = {
        cron: { zh: "自动化", en: "Automation" },
        recovery: { zh: "备份与恢复", en: "Backup & Recovery" },
        git: { zh: "Git", en: "Git" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" },
        openclaw: { zh: "OpenClaw", en: "OpenClaw" },
        security: { zh: "安全", en: "Security" }
      }[H];
      return Y ? n.label(Y.zh, Y.en) : H || n.label("系统提醒", "System reminder");
    }
    function Ce(H) {
      const Y = {
        "session-started": { zh: "会话启动", en: "Session started" },
        "session-updated": { zh: "会话更新", en: "Session updated" },
        "session-ended": { zh: "会话结束", en: "Session ended" },
        "runtime-warning": { zh: "运行告警", en: "Runtime warning" },
        "cron-run": { zh: "自动化执行", en: "Automation run" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" }
      }[H];
      return Y ? n.label(Y.zh, Y.en) : H || n.label("系统事件", "System event");
    }
    function Oe(H) {
      return H ? H === "cron-ui" ? n.label("Cron 管理", "Cron management") : H === "openclaw" ? "OpenClaw" : H === "guard-ui" ? "Guard UI" : H : n.label("未知来源", "Unknown source");
    }
    function Ge(H) {
      return [H.agentId, H.modelId, H.status].filter(Boolean).join(" · ");
    }
    function ue(H) {
      if (!v.data) return;
      const q = {
        ...v.data,
        summary: {
          items: Array.isArray(H.items) ? H.items : [],
          total: H.total || 0,
          unread: H.unread || 0,
          read: H.read || 0
        }
      };
      v.data = q, t = q;
    }
    async function fe() {
      await v.execute({ silent: !!v.data });
    }
    async function _e(H) {
      const q = !H.read;
      h.value = H.id;
      try {
        const Y = await t1(H.id, q);
        ue(Y.summary), l.pushToast({
          tone: Y.success ? "success" : "error",
          message: Y.success ? q ? n.label("已标记为已读。", "Marked as read.") : n.label("已重新标记为未读。", "Marked as unread again.") : n.label("更新提醒状态失败。", "Failed to update the reminder state.")
        });
      } catch (Y) {
        l.pushToast({
          tone: "error",
          message: Y instanceof Error ? Y.message : String(Y)
        });
      } finally {
        h.value = "";
      }
    }
    async function Ve(H) {
      if (!(H === "clear-all" && !await l.confirm({
        title: n.label("清空全部通知", "Clear all reminders"),
        message: n.label("确认清空全部提醒吗？这个操作不可撤销。", "Clear all reminders? This action cannot be undone."),
        confirmLabel: n.label("确认清空", "Clear all"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        p.value = H;
        try {
          const q = await n1(H);
          ue(q.summary), l.pushToast({
            tone: q.success ? "success" : "error",
            message: q.message
          });
        } catch (q) {
          l.pushToast({
            tone: "error",
            message: q instanceof Error ? q.message : String(q)
          });
        } finally {
          p.value = "";
        }
      }
    }
    async function Je(H) {
      var q;
      if (!(typeof navigator > "u" || !((q = navigator.clipboard) != null && q.writeText))) {
        y.value = H.id;
        try {
          await navigator.clipboard.writeText(JSON.stringify(H, null, 2)), l.pushToast({
            tone: "success",
            message: n.label("提醒详情已复制。", "The reminder details have been copied.")
          });
        } finally {
          y.value = "";
        }
      }
    }
    return (H, q) => (g(), m("div", s1, [
      a("header", l1, [
        a("div", null, [
          a("p", a1, o(s(n).label("通知 / 提醒", "Notifications / Alerts")), 1),
          a("h2", i1, o(s(n).label("提醒与时间线", "Reminders & timeline")), 1),
          a("p", o1, o(s(n).label("把原来分散的提醒和活动时间线收回同一页里，默认先给普通用户看到可处理的提醒，切换到时间线再回看系统最近发生了什么。", "Bring reminders and the activity feed back into one page, so users first see what needs action and then switch to the timeline to review what the system has been doing.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: fe
        }, o(s(v).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      K(Os, {
        items: P.value,
        "active-id": i.value,
        onChange: q[0] || (q[0] = (Y) => i.value = Y)
      }, null, 8, ["items", "active-id"]),
      s(v).loading && !s(v).data ? (g(), m("div", r1, o(s(n).label("正在读取提醒与时间线…", "Loading reminders and timeline events…")), 1)) : s(v).error && !s(v).data ? (g(), m("div", c1, o(s(v).error), 1)) : s(v).data ? (g(), m(W, { key: 2 }, [
        K(le, {
          title: s(n).label("当前概览", "Current overview"),
          eyebrow: "Overview"
        }, {
          default: Z(() => [
            a("div", u1, [
              a("article", d1, [
                a("p", f1, o(s(n).label("提醒总数", "Total reminders")), 1),
                a("strong", null, o(s(de)(s(v).data.summary.total)), 1),
                a("span", null, o(s(n).label("包含已读与未读提醒", "Includes both read and unread reminders")), 1)
              ]),
              a("article", h1, [
                a("p", p1, o(s(n).label("待处理", "Needs attention")), 1),
                a("strong", null, o(s(de)(s(v).data.summary.unread)), 1),
                a("span", null, o(s(n).label("建议先处理这些未读提醒", "Start with these unread reminders")), 1)
              ]),
              a("article", g1, [
                a("p", m1, o(s(n).label("告警提醒", "Warnings / errors")), 1),
                a("strong", null, o(s(de)($.value)), 1),
                a("span", null, o(s(n).label("包含 warning 与 error 两种严重级别", "Counts both warning and error severity")), 1)
              ]),
              a("article", b1, [
                a("p", v1, o(s(n).label("时间线事件", "Timeline events")), 1),
                a("strong", null, o(s(de)(x.value.length)), 1),
                a("span", null, o(s(n).label("最近活动会从这里回放", "Recent system activity is replayed here")), 1)
              ])
            ]),
            s(v).error ? (g(), m("div", y1, o(s(n).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(s(v).error), 1)) : Q("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        i.value === "reminders" ? (g(), m(W, { key: 0 }, [
          K(le, {
            title: s(n).label("筛选与批量操作", "Filters & bulk actions"),
            eyebrow: "Controls"
          }, {
            default: Z(() => [
              a("div", _1, [
                a("label", w1, [
                  a("span", null, o(s(n).label("搜索", "Search")), 1),
                  pe(a("input", {
                    "onUpdate:modelValue": q[1] || (q[1] = (Y) => r.value = Y),
                    class: "settings-input",
                    type: "text",
                    placeholder: s(n).label("搜索标题、消息、来源", "Search title, message, or source")
                  }, null, 8, k1), [
                    [Re, r.value]
                  ])
                ]),
                a("label", $1, [
                  a("span", null, o(s(n).label("来源", "Source")), 1),
                  pe(a("select", {
                    "onUpdate:modelValue": q[2] || (q[2] = (Y) => c.value = Y),
                    class: "settings-input"
                  }, [
                    a("option", C1, o(s(n).label("全部来源", "All sources")), 1),
                    (g(!0), m(W, null, ce(N.value, (Y) => (g(), m("option", {
                      key: Y,
                      value: Y
                    }, o(Oe(Y)), 9, S1))), 128))
                  ], 512), [
                    [mt, c.value]
                  ])
                ]),
                a("label", A1, [
                  a("span", null, o(s(n).label("每页显示", "Per page")), 1),
                  pe(a("select", {
                    "onUpdate:modelValue": q[3] || (q[3] = (Y) => d.value = Y),
                    class: "settings-input"
                  }, [
                    (g(), m(W, null, ce(C, (Y) => a("option", {
                      key: Y,
                      value: Y
                    }, o(s(n).label(`${Y} 条`, `${Y}`)), 9, R1)), 64))
                  ], 512), [
                    [mt, d.value]
                  ])
                ])
              ]),
              a("div", T1, [
                a("button", {
                  class: oe(["pill-button", { "pill-button--active": u.value === "all" }]),
                  type: "button",
                  onClick: q[4] || (q[4] = (Y) => u.value = "all")
                }, o(s(n).label(`全部 (${s(v).data.summary.total})`, `All (${s(v).data.summary.total})`)), 3),
                a("button", {
                  class: oe(["pill-button", { "pill-button--active": u.value === "unread" }]),
                  type: "button",
                  onClick: q[5] || (q[5] = (Y) => u.value = "unread")
                }, o(s(n).label(`未读 (${s(v).data.summary.unread})`, `Unread (${s(v).data.summary.unread})`)), 3),
                a("button", {
                  class: oe(["pill-button", { "pill-button--active": u.value === "warning" }]),
                  type: "button",
                  onClick: q[6] || (q[6] = (Y) => u.value = "warning")
                }, o(s(n).label(`警告 (${$.value})`, `Warning (${$.value})`)), 3),
                a("button", {
                  class: oe(["pill-button", { "pill-button--active": u.value === "success" }]),
                  type: "button",
                  onClick: q[7] || (q[7] = (Y) => u.value = "success")
                }, o(s(n).label(`成功 (${T.value})`, `Success (${T.value})`)), 3)
              ]),
              a("div", x1, [
                a("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "read-all",
                  onClick: q[8] || (q[8] = (Y) => Ve("read-all"))
                }, o(p.value === "read-all" ? s(n).label("处理中…", "Working…") : s(n).label("全部标记为已读", "Mark all as read")), 9, P1),
                a("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "unread-all",
                  onClick: q[9] || (q[9] = (Y) => Ve("unread-all"))
                }, o(p.value === "unread-all" ? s(n).label("处理中…", "Working…") : s(n).label("全部重新标记为未读", "Mark all as unread")), 9, E1),
                a("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "clear-read",
                  onClick: q[10] || (q[10] = (Y) => Ve("clear-read"))
                }, o(p.value === "clear-read" ? s(n).label("处理中…", "Working…") : s(n).label("清空已读提醒", "Clear read reminders")), 9, D1),
                a("button", {
                  class: "inline-link inline-link--danger",
                  type: "button",
                  disabled: p.value === "clear-all",
                  onClick: q[11] || (q[11] = (Y) => Ve("clear-all"))
                }, o(p.value === "clear-all" ? s(n).label("处理中…", "Working…") : s(n).label("清空全部提醒", "Clear all reminders")), 9, M1)
              ]),
              s(n).developerMode ? Q("", !0) : (g(), m("p", I1, o(s(n).label("原始提醒详情复制已收纳到开发者模式里。若要导出 JSON 详情排障，请先到 Settings 打开开发者模式。", "Raw reminder-detail copy now stays behind developer mode. Enable it from Settings if you need the JSON payload for troubleshooting.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          K(le, {
            title: s(n).label("提醒列表", "Reminder list"),
            eyebrow: "Reminders"
          }, {
            default: Z(() => [
              O.value.length ? (g(), m("div", O1, [
                (g(!0), m(W, null, ce(S.value, (Y) => (g(), m("section", {
                  key: Y.key,
                  class: "timeline-day-group"
                }, [
                  a("div", L1, [
                    a("strong", null, o(Y.label), 1),
                    a("span", null, o(s(n).label(`${Y.items.length} 条提醒`, `${Y.items.length} reminders`)), 1)
                  ]),
                  a("div", U1, [
                    (g(!0), m(W, null, ce(Y.items, ($e) => (g(), m("article", {
                      key: $e.id,
                      class: "provider-card"
                    }, [
                      a("header", N1, [
                        a("div", null, [
                          a("strong", null, o($e.title || s(n).label("系统提醒", "System reminder")), 1),
                          a("p", null, o(s(Qe)($e.createdAt)), 1)
                        ]),
                        a("div", F1, [
                          a("span", {
                            class: oe(["pill", z($e.severity)])
                          }, o(j($e.severity)), 3),
                          a("span", {
                            class: oe(["pill", $e.read ? "pill--muted" : "pill--warning"])
                          }, o($e.read ? s(n).label("已读", "Read") : s(n).label("未读", "Unread")), 3)
                        ])
                      ]),
                      a("p", null, o($e.message), 1),
                      a("div", G1, [
                        a("span", B1, o(Oe($e.source)), 1),
                        a("span", V1, o(me($e.type)), 1)
                      ]),
                      a("div", j1, [
                        a("button", {
                          class: "inline-link",
                          type: "button",
                          disabled: h.value === $e.id,
                          onClick: (ze) => _e($e)
                        }, o(h.value === $e.id ? s(n).label("处理中…", "Working…") : $e.read ? s(n).label("重新标记为未读", "Mark as unread") : s(n).label("标记为已读", "Mark as read")), 9, z1),
                        s(n).developerMode ? (g(), m("button", {
                          key: 0,
                          class: "inline-link",
                          type: "button",
                          disabled: y.value === $e.id,
                          onClick: (ze) => Je($e)
                        }, o(y.value === $e.id ? s(n).label("复制中…", "Copying…") : s(n).label("复制详情", "Copy details")), 9, W1)) : Q("", !0)
                      ])
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (g(), m("div", H1, o(s(n).label("当前筛选条件下没有匹配的提醒。", "No reminders match the current filters.")), 1)),
              O.value.length ? (g(), m("div", K1, [
                a("p", q1, o(s(n).label(
                  `当前第 ${f.value} / ${ee.value} 页，共 ${O.value.length} 条提醒`,
                  `Page ${f.value} of ${ee.value}, ${O.value.length} reminders total`
                )), 1),
                a("div", J1, [
                  a("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: f.value <= 1,
                    onClick: q[12] || (q[12] = (Y) => f.value -= 1)
                  }, o(s(n).label("上一页", "Previous")), 9, Q1),
                  a("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: f.value >= ee.value,
                    onClick: q[13] || (q[13] = (Y) => f.value += 1)
                  }, o(s(n).label("下一页", "Next")), 9, Y1)
                ])
              ])) : Q("", !0)
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (g(), Ue(le, {
          key: 1,
          title: s(n).label("最近时间线", "Recent timeline"),
          eyebrow: "Timeline"
        }, {
          default: Z(() => [
            x.value.length ? (g(), m("div", Z1, [
              (g(!0), m(W, null, ce(x.value, (Y) => (g(), m("article", {
                key: Y.id,
                class: "provider-card"
              }, [
                a("header", X1, [
                  a("div", null, [
                    a("strong", null, o(Y.title || s(n).label("系统事件", "System event")), 1),
                    a("p", null, o(s(Qe)(Y.createdAt)), 1)
                  ]),
                  a("span", ew, o(Ce(Y.type)), 1)
                ]),
                a("p", null, o(Y.description), 1),
                Ge(Y) ? (g(), m("p", tw, o(Ge(Y)), 1)) : Q("", !0)
              ]))), 128))
            ])) : (g(), m("div", nw, o(s(n).label("时间线里还没有新的记录。", "No timeline events are available yet.")), 1))
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : Q("", !0)
    ]));
  }
}), lw = { class: "page-stack" }, aw = { class: "page-header" }, iw = { class: "page-header__eyebrow" }, ow = { class: "page-header__title" }, rw = { class: "page-header__description" }, cw = {
  key: 0,
  class: "page-empty"
}, uw = {
  key: 1,
  class: "page-empty page-empty--error"
}, dw = {
  key: 0,
  class: "status-banner status-banner--warning"
}, fw = { class: "stat-grid" }, hw = { class: "stat-card" }, pw = { class: "stat-card" }, gw = { class: "stat-card__label" }, mw = { class: "stat-card" }, bw = { class: "stat-card__label" }, vw = { class: "stat-card" }, yw = { class: "stat-card__label" }, _w = { class: "muted-copy" }, ww = {
  key: 0,
  class: "list-stack"
}, kw = {
  key: 1,
  class: "muted-copy"
}, $w = { class: "list-stack" }, Cw = { class: "action-row" }, Sw = { class: "action-row" }, Aw = {
  key: 0,
  class: "action-row"
}, Rw = { class: "code-panel" }, Tw = { class: "code-panel" }, xw = /* @__PURE__ */ we({
  __name: "OpenClawPage",
  setup(e) {
    let t = null;
    const n = ke(), l = ct(() => nb(), t, { immediate: !1 }), i = D(() => {
      var T;
      return (T = l.data) != null && T.status && typeof l.data.status == "object" ? l.data.status : {};
    }), r = D(() => {
      var T;
      return (T = l.data) != null && T.targets && typeof l.data.targets == "object" ? l.data.targets : {};
    }), c = D(() => i.value.installed === !0), u = D(() => c.value ? n.label("已安装", "Installed") : n.label("未安装", "Not installed")), d = D(() => String(i.value.version || "-")), f = D(() => String(i.value.detectedSource || "-")), h = D(() => String(i.value.effectiveUpdater || r.value.effectiveUpdater || "-")), p = D(() => String(i.value.packageManager || "-")), y = D(() => String(i.value.installCommand || "-")), v = D(() => i.value.installReady === !0), C = D(() => Array.isArray(i.value.installBlockers) ? i.value.installBlockers.map((T) => String(T)).filter(Boolean) : []), P = D(() => Array.isArray(i.value.platformNotes) ? i.value.platformNotes.map((T) => String(T)).filter(Boolean) : []), R = D(() => Array.isArray(r.value.channels) ? r.value.channels.map((T) => String(T)).filter(Boolean) : []), x = D(() => r.value.distTags && typeof r.value.distTags == "object" ? Object.entries(r.value.distTags).map(([T, N]) => `${T}: ${String(N)}`) : []);
    function $(T) {
      return JSON.stringify(T, null, 2);
    }
    return xe(() => l.data, (T) => {
      T && (t = T);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (T, N) => (g(), m("div", lw, [
      a("header", aw, [
        a("div", null, [
          a("p", iw, o(s(n).label("OpenClaw / 生命周期", "OpenClaw / Lifecycle")), 1),
          a("h2", ow, o(s(n).label("OpenClaw 运行与安装状态", "OpenClaw runtime and install state")), 1),
          a("p", rw, o(s(n).label(
            "集中查看当前 OpenClaw 是否已安装、来自哪里、后续应使用什么更新策略，以及本机还能走哪些安全安装路径。",
            "Review whether OpenClaw is installed, where it was detected from, which updater is active, and which safe install paths are still available on this machine."
          )), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: N[0] || (N[0] = (O) => s(l).execute({ silent: !0 }))
        }, o(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", cw, o(s(n).label("正在读取 OpenClaw 状态…", "Loading OpenClaw status…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", uw, o(s(l).error), 1)) : s(l).data ? (g(), m(W, { key: 2 }, [
        s(l).error ? (g(), m("div", dw, o(s(n).label("上一版 OpenClaw 快照仍然保留，但后台刷新失败：", "The last OpenClaw snapshot is still on screen, but the background refresh failed: ")) + o(s(l).error), 1)) : Q("", !0),
        K(le, {
          title: s(n).label("当前状态", "Current status"),
          eyebrow: "Status"
        }, {
          default: Z(() => [
            a("div", fw, [
              a("article", hw, [
                N[1] || (N[1] = a("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                a("strong", null, o(u.value), 1),
                a("span", null, o(d.value), 1)
              ]),
              a("article", pw, [
                a("p", gw, o(s(n).label("检测来源", "Detected source")), 1),
                a("strong", null, o(f.value), 1),
                a("span", null, o(String(i.value.installKind || "-")), 1)
              ]),
              a("article", mw, [
                a("p", bw, o(s(n).label("更新策略", "Updater")), 1),
                a("strong", null, o(h.value), 1),
                a("span", null, o(p.value), 1)
              ]),
              a("article", vw, [
                a("p", yw, o(s(n).label("安装就绪", "Install ready")), 1),
                a("strong", null, o(v.value ? s(n).label("可执行", "Ready") : s(n).label("有阻塞", "Blocked")), 1),
                a("span", null, o(String(i.value.latestVersion || "-")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(n).label("安装与更新提示", "Install and update guidance"),
          eyebrow: "Guide"
        }, {
          default: Z(() => [
            a("div", {
              class: oe(["status-banner", v.value ? "status-banner--success" : "status-banner--warning"])
            }, [
              a("div", null, [
                a("strong", null, o(s(n).label("推荐命令", "Recommended command")), 1),
                a("p", _w, o(y.value), 1)
              ])
            ], 2),
            C.value.length ? (g(), m("div", ww, [
              (g(!0), m(W, null, ce(C.value, (O) => (g(), m("article", {
                key: O,
                class: "risk-row"
              }, [
                a("strong", null, o(s(n).label("当前阻塞", "Current blocker")), 1),
                a("span", null, o(O), 1)
              ]))), 128))
            ])) : (g(), m("p", kw, o(s(n).label("当前没有额外安装阻塞，可以继续按推荐命令或控制台工作流处理。", "No extra install blockers were reported. You can continue with the recommended command or the console workflow.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(n).label("目标目录与渠道", "Target catalog and channels"),
          eyebrow: "Catalog"
        }, {
          default: Z(() => [
            a("div", $w, [
              a("article", Cw, [
                a("div", null, [
                  a("h3", null, o(s(n).label("可用渠道", "Available channels")), 1),
                  a("p", null, o(R.value.length ? R.value.join(" / ") : "-"), 1)
                ])
              ]),
              a("article", Sw, [
                a("div", null, [
                  a("h3", null, o(s(n).label("Dist Tags", "Dist tags")), 1),
                  a("p", null, o(x.value.length ? x.value.join(" · ") : "-"), 1)
                ])
              ]),
              P.value.length ? (g(), m("article", Aw, [
                a("div", null, [
                  a("h3", null, o(s(n).label("平台提示", "Platform notes")), 1),
                  a("p", null, o(P.value.join(" ")), 1)
                ])
              ])) : Q("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        s(n).developerMode ? (g(), Ue(le, {
          key: 1,
          title: s(n).label("OpenClaw 原始状态", "Raw OpenClaw status"),
          eyebrow: "Developer"
        }, {
          default: Z(() => [
            a("pre", Rw, o($(s(l).data.status)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : Q("", !0),
        s(n).developerMode ? (g(), Ue(le, {
          key: 2,
          title: s(n).label("OpenClaw 目标清单", "Raw OpenClaw target catalog"),
          eyebrow: "Developer"
        }, {
          default: Z(() => [
            a("pre", Tw, o($(s(l).data.targets)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : Q("", !0)
      ], 64)) : Q("", !0)
    ]));
  }
}), Pw = { class: "page-stack" }, Ew = { class: "page-header" }, Dw = { class: "page-header__eyebrow" }, Mw = { class: "page-header__title" }, Iw = { class: "page-header__description" }, Ow = {
  key: 0,
  class: "page-empty"
}, Lw = {
  key: 1,
  class: "page-empty page-empty--error"
}, Uw = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Nw = { class: "stat-grid" }, Fw = { class: "stat-card" }, Gw = { class: "stat-card__label" }, Bw = { class: "stat-card" }, Vw = { class: "stat-card__label" }, jw = { class: "stat-card" }, zw = { class: "stat-card__label" }, Ww = { class: "stat-card" }, Hw = { class: "stat-card__label" }, Kw = { class: "muted-copy" }, qw = { class: "code-panel" }, Jw = { class: "code-panel" }, Qw = { class: "muted-copy" }, Yw = /* @__PURE__ */ we({
  __name: "OperationsPage",
  setup(e) {
    let t = null;
    const n = ke(), l = ct(() => tb(), t, { immediate: !1 }), i = D(() => {
      var v;
      return (v = l.data) != null && v.webReport && typeof l.data.webReport == "object" ? l.data.webReport : {};
    }), r = D(() => {
      var v;
      return (v = l.data) != null && v.services && typeof l.data.services == "object" ? l.data.services : {};
    }), c = D(() => Object.entries(r.value)), u = D(() => i.value.running === !0 ? n.label("运行中", "Running") : n.label("未运行", "Stopped")), d = D(() => String(i.value.primaryUrl || "-")), f = D(() => String(i.value.workbenchUrl || "-")), h = D(() => String(i.value.nextAction || "-")), p = D(() => {
      const v = i.value.pid, C = i.value.port;
      return !v && !C ? "-" : v && C ? `PID ${v} · ${n.label("端口", "Port")} ${C}` : v ? `PID ${v}` : `${n.label("端口", "Port")} ${C}`;
    });
    function y(v) {
      return JSON.stringify(v, null, 2);
    }
    return xe(() => l.data, (v) => {
      v && (t = v);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (v, C) => (g(), m("div", Pw, [
      a("header", Ew, [
        a("div", null, [
          a("p", Dw, o(s(n).label("运维 / 运行态", "Operations / Runtime")), 1),
          a("h2", Mw, o(s(n).label("运行态与后台服务", "Runtime and background services")), 1),
          a("p", Iw, o(s(n).label("先把运行状态、访问地址和后台托管信息迁进新壳层，原始快照只在开发者模式下显示。", "Bring runtime status, access URLs, and managed background details into the new shell first. Raw snapshots stay behind developer mode.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: C[0] || (C[0] = (P) => s(l).execute({ silent: !0 }))
        }, o(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", Ow, o(s(n).label("正在加载运维状态…", "Loading operations status…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", Lw, o(s(l).error), 1)) : s(l).data ? (g(), m(W, { key: 2 }, [
        s(l).error ? (g(), m("div", Uw, o(s(n).label("已保留上一版运维快照，但后台刷新失败：", "The last operations snapshot is still on screen, but the background refresh failed: ")) + o(s(l).error), 1)) : Q("", !0),
        K(le, {
          title: s(n).label("运行摘要", "Runtime summary"),
          eyebrow: "Summary"
        }, {
          default: Z(() => [
            a("div", Nw, [
              a("article", Fw, [
                a("p", Gw, o(s(n).label("Guard Web", "Guard Web")), 1),
                a("strong", null, o(u.value), 1),
                a("span", null, o(String(i.value.source || "-")), 1)
              ]),
              a("article", Bw, [
                a("p", Vw, o(s(n).label("访问地址", "Access URL")), 1),
                a("strong", null, o(d.value), 1),
                a("span", null, o(f.value), 1)
              ]),
              a("article", jw, [
                a("p", zw, o(s(n).label("后台进程", "Background process")), 1),
                a("strong", null, o(p.value), 1),
                a("span", null, o(i.value.managed === !0 ? s(n).label("当前由 Guard 托管", "Currently managed by Guard") : s(n).label("当前不是 Guard 托管进程", "This process is not managed by Guard")), 1)
              ]),
              a("article", Ww, [
                a("p", Hw, o(s(n).label("服务快照", "Service snapshot")), 1),
                a("strong", null, o(c.value.length), 1),
                a("span", null, o(s(n).label("当前接口返回的服务条目数", "Number of service entries returned by the current API")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(n).label("建议下一步", "Suggested next step"),
          eyebrow: "Guide"
        }, {
          default: Z(() => [
            a("div", {
              class: oe(["status-banner", { "status-banner--warning": i.value.running !== !0 }])
            }, [
              a("div", null, [
                a("strong", null, o(s(n).label("下一步", "Next step")), 1),
                a("p", Kw, o(h.value), 1)
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["title"]),
        s(n).developerMode ? (g(), Ue(le, {
          key: 1,
          title: s(n).label("后台 Web 报告", "Background web report"),
          eyebrow: "Developer"
        }, {
          default: Z(() => [
            a("pre", qw, o(y(s(l).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : Q("", !0),
        s(n).developerMode ? (g(), Ue(le, {
          key: 2,
          title: s(n).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Developer"
        }, {
          default: Z(() => [
            a("pre", Jw, o(y(s(l).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : (g(), Ue(le, {
          key: 3,
          title: s(n).label("开发者模式", "Developer mode"),
          eyebrow: "Developer"
        }, {
          default: Z(() => [
            a("p", Qw, o(s(n).label("如果你需要查看原始 Web 报告、服务快照或后续的刷新诊断，请先到 Settings 打开开发者模式。", "If you need raw web reports, service snapshots, or future refresh diagnostics, enable developer mode from Settings first.")), 1)
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : Q("", !0)
    ]));
  }
});
function Zw(e) {
  return e === "gitee" ? "gitee" : "github";
}
function Xw(e, t) {
  return t ? t.protected ? t.remoteReady ? e.label("云端保护已就绪", "Cloud protection ready") : e.label("当前仅本机可恢复", "Local recovery only") : e.label("尚未建立保护", "Protection not set up") : e.label("读取中", "Loading");
}
function pi(e, t) {
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
function ek(e, t) {
  return t.kind === "auto" ? e.label("自动保护", "Auto protection") : t.kind === "restore" ? e.label("恢复点", "Restore point") : e.label("手动保存", "Manual save");
}
function tk(e, t) {
  return t === "success" ? e.label("已完成", "Completed") : t === "error" ? e.label("失败", "Failed") : t === "authorizing" ? e.label("授权中", "Authorizing") : e.label("未开始", "Idle");
}
const nk = { class: "provider-card__header" }, sk = { class: "muted-copy" }, lk = { class: "stat-grid" }, ak = { class: "stat-card" }, ik = { class: "stat-card__label" }, ok = { class: "stat-card" }, rk = { class: "stat-card__label" }, ck = { class: "stat-card" }, uk = { class: "stat-card__label" }, dk = { class: "stat-card" }, fk = { class: "stat-card__label" }, hk = { class: "list-stack" }, pk = { class: "action-row" }, gk = { class: "pill pill--info" }, mk = { class: "action-row" }, bk = { class: "pill pill--success" }, vk = { class: "settings-grid settings-grid--wide" }, yk = { class: "settings-field settings-field--full" }, _k = ["value"], wk = { class: "page-actions" }, kk = ["disabled"], $k = {
  key: 0,
  class: "provider-stack"
}, Ck = { class: "provider-card__header" }, Sk = { class: "pill-row" }, Ak = { class: "pill pill--info" }, Rk = {
  key: 0,
  class: "muted-copy"
}, Tk = { class: "page-actions" }, xk = ["onClick"], Pk = ["disabled", "onClick"], Ek = {
  key: 1,
  class: "page-empty"
}, Dk = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    function i(r) {
      n("update:save-label", r.target.value);
    }
    return (r, c) => (g(), m(W, null, [
      K(le, {
        title: s(l).label("当前保护状态", "Current protection state"),
        eyebrow: "Overview"
      }, {
        default: Z(() => {
          var u;
          return [
            a("div", nk, [
              a("p", sk, o(s(l).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
              a("span", {
                class: oe(["pill", e.overviewTone])
              }, o(s(Xw)(s(l), e.overview)), 3)
            ]),
            a("div", lk, [
              a("article", ak, [
                a("p", ik, o(s(l).label("当前主线", "Current branch")), 1),
                a("strong", null, o(e.overview.currentBranch || "-"), 1),
                a("span", null, o(s(l).label("恢复后仍会继续写在这条主线上", "Future saves continue on the same main line after a restore")), 1)
              ]),
              a("article", ok, [
                a("p", rk, o(s(l).label("最近保存", "Last saved")), 1),
                a("strong", null, o(s(Qe)(e.overview.lastSavedAt)), 1),
                a("span", null, o(((u = e.overview.latestPoint) == null ? void 0 : u.title) || s(l).label("还没有恢复点", "No recovery point yet")), 1)
              ]),
              a("article", ck, [
                a("p", uk, o(s(l).label("最近上云", "Last pushed")), 1),
                a("strong", null, o(s(Qe)(e.overview.lastPushedAt)), 1),
                a("span", null, o(e.overview.remoteReady ? s(l).label("云端保护已就绪", "Cloud protection is ready") : s(l).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
              ]),
              a("article", dk, [
                a("p", fk, o(s(l).label("下一步建议", "Recommended next step")), 1),
                a("strong", null, o(s(pi)(s(l), e.overview.nextAction)), 1),
                a("span", null, o(e.overview.unsyncedChanges ? s(l).label("当前存在未同步变更", "There are unsynced changes right now") : s(l).label("当前没有额外待处理变更", "No extra pending changes right now")), 1)
              ])
            ])
          ];
        }),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("下一步建议", "Recommended next actions"),
        eyebrow: "Guide"
      }, {
        default: Z(() => [
          a("div", hk, [
            a("article", pk, [
              a("div", null, [
                a("h3", null, o(s(l).label("先保住现在", "Protect the current state")), 1),
                a("p", null, o(s(l).label("当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。", "Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.")), 1)
              ]),
              a("span", gk, o(s(pi)(s(l), e.overview.nextAction)), 1)
            ]),
            a("article", mk, [
              a("div", null, [
                a("h3", null, o(s(l).label("回退不会删历史", "Restoring does not delete history")), 1),
                a("p", null, o(s(l).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
              ]),
              a("span", bk, o(s(l).label("同一主线继续", "Continue on the same main line")), 1)
            ]),
            (g(!0), m(W, null, ce(e.overview.warnings, (u) => (g(), m("article", {
              key: u,
              class: "risk-row"
            }, [
              a("strong", null, o(s(l).label("注意事项", "Warning")), 1),
              a("span", null, o(u), 1)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("立即保存", "Save now"),
        eyebrow: "Checkpoint"
      }, {
        default: Z(() => [
          a("div", vk, [
            a("label", yk, [
              a("span", null, o(s(l).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
              a("small", null, o(s(l).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
              a("input", {
                value: e.saveLabel,
                "data-testid": "recovery-save-input",
                class: "settings-input",
                type: "text",
                onInput: i
              }, null, 40, _k)
            ])
          ]),
          a("div", wk, [
            a("button", {
              "data-testid": "recovery-save-button",
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.savingPoint,
              onClick: c[0] || (c[0] = (u) => r.$emit("save"))
            }, o(e.savingPoint ? s(l).label("保存中…", "Saving…") : s(l).label("保存当前状态", "Save current state")), 9, kk)
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("恢复点时间线", "Recovery point timeline"),
        eyebrow: "Timeline"
      }, {
        default: Z(() => [
          e.points.length ? (g(), m("div", $k, [
            (g(!0), m(W, null, ce(e.points, (u) => (g(), m("article", {
              key: u.id,
              "data-testid": "recovery-point-card",
              class: "provider-card"
            }, [
              a("header", Ck, [
                a("div", null, [
                  a("strong", null, o(u.title), 1),
                  a("p", null, o(s(Qe)(u.createdAt)) + " | " + o(s(ai)(u.commitSha)), 1)
                ]),
                a("div", Sk, [
                  a("span", Ak, o(s(ek)(s(l), u)), 1),
                  a("span", {
                    class: oe(["pill", u.pushed ? "pill--success" : "pill--warning"])
                  }, o(u.pushed ? s(l).label("已上云", "Synced") : s(l).label("仅本机", "Local only")), 3)
                ])
              ]),
              a("p", null, o(u.summary), 1),
              u.sourceCommitSha ? (g(), m("p", Rk, o(s(l).label("来源节点：", "Source commit: ")) + o(s(ai)(u.sourceCommitSha)), 1)) : Q("", !0),
              a("div", Tk, [
                a("button", {
                  class: "inline-link",
                  type: "button",
                  onClick: (d) => r.$emit("copy-point", u.commitSha)
                }, o(s(l).label("复制节点", "Copy point")), 9, xk),
                a("button", {
                  "data-testid": "recovery-restore-button",
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: !u.restorable || e.restoringCommit === u.commitSha,
                  onClick: (d) => r.$emit("restore", u)
                }, o(e.restoringCommit === u.commitSha ? s(l).label("恢复中…", "Restoring…") : s(l).label("回到这个状态", "Restore this state")), 9, Pk)
              ])
            ]))), 128))
          ])) : (g(), m("div", Ek, o(s(l).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
}), Mk = { class: "muted-copy" }, Ik = { class: "list-stack" }, Ok = { class: "page-actions" }, Lk = ["href"], Uk = ["disabled"], Nk = { class: "muted-copy" }, Fk = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Gk = { class: "list-stack" }, Bk = { class: "provider-card__header" }, Vk = { class: "list-stack" }, jk = {
  key: 1,
  class: "muted-copy"
}, zk = { class: "stat-grid" }, Wk = { class: "stat-card__label" }, Hk = { class: "stat-grid" }, Kk = { class: "stat-card" }, qk = { class: "stat-card__label" }, Jk = { class: "stat-card" }, Qk = { class: "stat-card__label" }, Yk = { class: "stat-card" }, Zk = { class: "stat-card__label" }, Xk = { class: "stat-card" }, e$ = { class: "stat-card__label" }, t$ = { class: "page-actions" }, n$ = ["disabled"], s$ = ["disabled"], l$ = ["disabled"], a$ = ["disabled"], i$ = ["disabled"], o$ = {
  key: 0,
  class: "muted-copy"
}, r$ = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    return (i, r) => (g(), m(W, null, [
      K(le, {
        title: s(l).label("现在能不能同步？", "Can you sync now?"),
        eyebrow: "Readiness"
      }, {
        default: Z(() => [
          a("p", Mk, o(s(l).label("这里会按步骤告诉你当前卡在哪里，先处理待办项，再继续提交、推送或一键同步。", "This section shows where the flow is blocked right now, so you can resolve the pending item before committing, pushing, or syncing.")), 1),
          a("div", Ik, [
            (g(!0), m(W, null, ce(e.syncReadinessItems, (c) => (g(), m("article", {
              key: c.key,
              class: "action-row"
            }, [
              a("div", null, [
                a("h3", null, o(c.label), 1),
                a("p", null, o(c.detail), 1)
              ]),
              a("span", {
                class: oe(["pill", c.ok ? "pill--success" : "pill--warning"])
              }, o(c.ok ? s(l).label("就绪", "Ready") : s(l).label("待处理", "Needs action")), 3)
            ]))), 128))
          ]),
          a("div", Ok, [
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (c) => n("copy-repo-path"))
            }, o(s(l).label("复制本地目录", "Copy repo path")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[1] || (r[1] = (c) => n("copy-remote-url"))
            }, o(s(l).label("复制远端地址", "Copy remote URL")), 1),
            e.gitStatus.remoteWebUrl ? (g(), m("a", {
              key: 0,
              class: "inline-link",
              href: e.gitStatus.remoteWebUrl,
              target: "_blank",
              rel: "noreferrer"
            }, o(s(l).label("打开远端仓库", "Open remote")), 9, Lk)) : Q("", !0),
            a("button", {
              "data-testid": "recovery-check-sync",
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.runningAction === "private" || e.runningAction === "sync",
              onClick: r[2] || (r[2] = (c) => n("check-and-sync"))
            }, o(e.runningAction === "private" || e.runningAction === "sync" ? s(l).label("检查并同步中…", "Checking and syncing…") : s(l).label("检查并同步", "Check and sync")), 9, Uk)
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("为什么现在还不能提交 / 推送？", "Why commit or push is still blocked"),
        eyebrow: "Blockers"
      }, {
        default: Z(() => [
          a("p", Nk, o(s(l).label("如果按钮现在还是灰的，先看这里。它会分别告诉你提交、推送和一键同步卡在什么地方。", "If the actions are still disabled, start here. This card explains what is blocking commit, push, or one-click sync.")), 1),
          e.gitStatus.state.lastError ? (g(), m("div", Fk, o(s(l).label("最近错误：", "Last error: ")) + o(e.gitStatus.state.lastError), 1)) : Q("", !0),
          a("div", Gk, [
            (g(!0), m(W, null, ce(e.blockerSections, (c) => (g(), m("article", {
              key: c.key,
              class: "provider-card"
            }, [
              a("header", Bk, [
                a("strong", null, o(c.title), 1),
                a("span", {
                  class: oe(["pill", c.items.length ? "pill--warning" : "pill--success"])
                }, o(c.items.length ? s(l).label("存在阻塞", "Blocked") : s(l).label("已就绪", "Ready")), 3)
              ]),
              a("div", Vk, [
                c.items.length ? (g(!0), m(W, { key: 0 }, ce(c.items, (u) => (g(), m("article", {
                  key: u,
                  class: "risk-row"
                }, [
                  a("strong", null, o(s(l).label("原因", "Reason")), 1),
                  a("span", null, o(u), 1)
                ]))), 128)) : (g(), m("p", jk, o(c.empty), 1))
              ])
            ]))), 128))
          ]),
          a("div", zk, [
            (g(!0), m(W, null, ce(e.latestGitSignals, (c) => (g(), m("article", {
              key: c.key,
              class: "stat-card"
            }, [
              a("p", Wk, o(c.label), 1),
              a("strong", null, o(c.value), 1),
              a("span", null, o(s(l).label("帮助你判断最近一次动作停在了哪里。", "Use this to understand where the latest action stopped.")), 1)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("当前仓库状态", "Current repository status"),
        eyebrow: "Status"
      }, {
        default: Z(() => [
          a("div", Hk, [
            a("article", Kk, [
              a("p", qk, o(s(l).label("仓库初始化", "Repository")), 1),
              a("strong", null, o(e.gitStatus.repoInitialized ? s(l).label("已初始化", "Initialized") : s(l).label("未初始化", "Not initialized")), 1),
              a("span", null, o(e.gitStatus.repoPath), 1)
            ]),
            a("article", Jk, [
              a("p", Qk, o(s(l).label("远端仓库", "Remote")), 1),
              a("strong", null, o(e.gitStatus.remoteName || "-"), 1),
              a("span", null, o(e.gitStatus.remoteUrl || s(l).label("还没绑定远端", "No remote connected yet")), 1)
            ]),
            a("article", Yk, [
              a("p", Zk, o(s(l).label("认证方式", "Auth mode")), 1),
              a("strong", null, o(e.gitStatus.authMode || "-"), 1),
              a("span", null, o(e.gitStatus.authConfigured ? s(l).label("当前已配置认证", "Authentication is configured") : s(l).label("当前还没配置认证", "Authentication is not configured yet")), 1)
            ]),
            a("article", Xk, [
              a("p", e$, o(s(l).label("私有检查", "Private check")), 1),
              a("strong", null, o(e.gitStatus.repoPrivate === !0 ? s(l).label("已通过", "Passed") : e.gitStatus.repoPrivate === !1 ? s(l).label("未通过", "Failed") : s(l).label("未检查", "Pending")), 1),
              a("span", null, o(e.gitStatus.state.lastSyncAt ? `${s(l).label("最近同步", "Last sync")} ${s(Qe)(e.gitStatus.state.lastSyncAt)}` : s(l).label("还没有成功同步记录", "No successful sync record yet")), 1)
            ])
          ]),
          a("div", t$, [
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.runningAction === "init",
              onClick: r[3] || (r[3] = (c) => n("run-action", "init"))
            }, o(e.runningAction === "init" ? s(l).label("初始化中…", "Initializing…") : s(l).label("初始化保护仓库", "Initialize protection repo")), 9, n$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "private",
              onClick: r[4] || (r[4] = (c) => n("run-action", "private"))
            }, o(e.runningAction === "private" ? s(l).label("检查中…", "Checking…") : s(l).label("检查私有仓库", "Check private remote")), 9, s$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "checkpoint",
              onClick: r[5] || (r[5] = (c) => n("run-action", "checkpoint"))
            }, o(e.runningAction === "checkpoint" ? s(l).label("提交中…", "Committing…") : s(l).label("创建本地 checkpoint", "Create local checkpoint")), 9, l$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "push",
              onClick: r[6] || (r[6] = (c) => n("run-action", "push"))
            }, o(e.runningAction === "push" ? s(l).label("推送中…", "Pushing…") : s(l).label("推送到云端", "Push to cloud")), 9, a$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "sync",
              onClick: r[7] || (r[7] = (c) => n("run-action", "sync"))
            }, o(e.runningAction === "sync" ? s(l).label("同步中…", "Syncing…") : s(l).label("提交并同步", "Commit and sync")), 9, i$)
          ]),
          e.advancedMessage ? (g(), m("p", o$, o(e.advancedMessage), 1)) : Q("", !0)
        ]),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
}), c$ = { class: "muted-copy" }, u$ = { class: "pill-row" }, d$ = { class: "muted-copy" }, f$ = { class: "muted-copy" }, h$ = { class: "settings-grid settings-grid--wide" }, p$ = { class: "settings-field" }, g$ = ["value"], m$ = { class: "settings-field" }, b$ = { class: "settings-field settings-field--full" }, v$ = { class: "page-actions" }, y$ = ["disabled"], _$ = ["disabled"], w$ = ["href"], k$ = { class: "provider-card__header" }, $$ = { class: "muted-copy" }, C$ = { class: "pill-row" }, S$ = { class: "settings-grid settings-grid--wide" }, A$ = { class: "settings-field" }, R$ = ["value"], T$ = { class: "settings-field" }, x$ = { class: "settings-field settings-field--full" }, P$ = { class: "muted-copy" }, E$ = { class: "page-actions" }, D$ = ["disabled"], M$ = { class: "settings-grid settings-grid--wide" }, I$ = { class: "settings-field" }, O$ = ["value"], L$ = { class: "settings-field" }, U$ = { class: "settings-field settings-field--full" }, N$ = { class: "settings-field" }, F$ = { class: "settings-field" }, G$ = { class: "page-actions" }, B$ = ["disabled"], V$ = ["disabled"], j$ = { class: "muted-copy" }, z$ = {
  key: 0,
  class: "muted-copy"
}, W$ = ["href"], H$ = {
  key: 1,
  class: "code-panel"
}, K$ = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    return (i, r) => (g(), m(W, null, [
      K(le, {
        title: s(l).label("高级 Git 工具", "Advanced Git tools"),
        eyebrow: "Advanced"
      }, {
        default: Z(() => [
          a("p", c$, o(s(l).label("远端连接、认证、同步检查、保护点提交、推送和 .gitignore 建议都已经收口到这里。日常的保护与恢复流程，现在可以直接留在当前控制台里完成。", "Remote connection, authentication, sync checks, checkpoints, push actions, and .gitignore suggestions now live here. The normal protection and recovery workflow can stay in this console.")), 1),
          a("div", u$, [
            a("span", {
              class: oe(["pill", e.overview.remoteReady ? "pill--success" : "pill--warning"])
            }, o(e.overview.remoteReady ? s(l).label("云端保护已就绪", "Cloud protection ready") : s(l).label("云端保护尚未就绪", "Cloud protection not ready")), 3),
            a("span", {
              class: oe(["pill", e.gitStatus.authConfigured ? "pill--success" : "pill--muted"])
            }, o(e.gitStatus.authConfigured ? s(l).label("认证已配置", "Authentication configured") : s(l).label("认证未配置", "Authentication not configured")), 3)
          ]),
          a("p", d$, o(s(l).label("大部分保护流程都可以直接在这里完成，只有极少数底层排障才需要切回 CLI。", "Most protection flows can stay here; only a small set of low-level troubleshooting cases should still need the CLI.")), 1)
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("远端连接", "Remote connection"),
        eyebrow: "Remote"
      }, {
        default: Z(() => [
          a("p", f$, o(s(l).label("先把保护主线接到 GitHub 或 Gitee 的私有仓库上。Guard 会优先沿这条线保存恢复点和云端备份。", "Connect the protection line to a private GitHub or Gitee repository first. Guard uses this path for recovery points and cloud protection.")), 1),
          a("div", h$, [
            a("label", p$, [
              a("span", null, o(s(l).label("Provider", "Provider")), 1),
              pe(a("select", {
                "onUpdate:modelValue": r[0] || (r[0] = (c) => e.connectDraft.provider = c),
                class: "settings-input"
              }, [
                (g(!0), m(W, null, ce(e.gitProviderOptions, (c) => (g(), m("option", {
                  key: c.value,
                  value: c.value
                }, o(s(l).label(c.zh, c.en)), 9, g$))), 128))
              ], 512), [
                [mt, e.connectDraft.provider]
              ])
            ]),
            a("label", m$, [
              a("span", null, o(s(l).label("远端名称", "Remote name")), 1),
              pe(a("input", {
                "onUpdate:modelValue": r[1] || (r[1] = (c) => e.connectDraft.remoteName = c),
                class: "settings-input",
                type: "text"
              }, null, 512), [
                [Re, e.connectDraft.remoteName]
              ])
            ]),
            a("label", b$, [
              a("span", null, o(s(l).label("远端仓库地址", "Remote URL")), 1),
              a("small", null, o(s(l).label("当前只支持 GitHub / Gitee，后续私有仓检查也会沿用这里的地址。", "Only GitHub / Gitee are supported right now, and the private-repo verification uses this same remote.")), 1),
              pe(a("input", {
                "onUpdate:modelValue": r[2] || (r[2] = (c) => e.connectDraft.remoteUrl = c),
                "data-testid": "recovery-remote-url",
                class: "settings-input",
                type: "text",
                placeholder: "https://github.com/owner/private-repo.git"
              }, null, 512), [
                [Re, e.connectDraft.remoteUrl]
              ])
            ])
          ]),
          a("div", v$, [
            a("button", {
              "data-testid": "recovery-connect-remote",
              class: "inline-link inline-link--primary",
              type: "button",
              disabled: e.runningAction === "connect",
              onClick: r[3] || (r[3] = (c) => n("connect-remote"))
            }, o(e.runningAction === "connect" ? s(l).label("绑定中…", "Connecting…") : s(l).label("绑定远端仓库", "Connect remote")), 9, y$),
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "private",
              onClick: r[4] || (r[4] = (c) => n("check-private"))
            }, o(e.runningAction === "private" ? s(l).label("检查中…", "Checking…") : s(l).label("检查私有仓库", "Check private remote")), 9, _$),
            e.gitStatus.remoteWebUrl ? (g(), m("a", {
              key: 0,
              class: "inline-link",
              href: e.gitStatus.remoteWebUrl,
              target: "_blank",
              rel: "noreferrer"
            }, o(s(l).label("打开远端仓库", "Open remote")), 9, w$)) : Q("", !0)
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("远端认证", "Remote authentication"),
        eyebrow: "Auth"
      }, {
        default: Z(() => {
          var c, u, d;
          return [
            a("div", k$, [
              a("p", $$, o(e.authSummary), 1),
              a("div", C$, [
                a("span", {
                  class: oe(["pill", e.gitStatus.authConfigured ? "pill--success" : "pill--muted"])
                }, o(e.gitStatus.authMode || s(l).label("未配置", "Not configured")), 3),
                a("span", {
                  class: oe(["pill", e.oauthTone])
                }, o(s(tk)(s(l), (c = e.oauthState) == null ? void 0 : c.phase)), 3)
              ])
            ]),
            a("div", S$, [
              a("label", A$, [
                a("span", null, o(s(l).label("Token Provider", "Token provider")), 1),
                pe(a("select", {
                  "onUpdate:modelValue": r[5] || (r[5] = (f) => e.tokenDraft.provider = f),
                  class: "settings-input"
                }, [
                  (g(!0), m(W, null, ce(e.gitProviderOptions, (f) => (g(), m("option", {
                    key: `token-${f.value}`,
                    value: f.value
                  }, o(s(l).label(f.zh, f.en)), 9, R$))), 128))
                ], 512), [
                  [mt, e.tokenDraft.provider]
                ])
              ]),
              a("label", T$, [
                a("span", null, o(s(l).label("账号（可选）", "Username (optional)")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[6] || (r[6] = (f) => e.tokenDraft.username = f),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [Re, e.tokenDraft.username]
                ])
              ]),
              a("label", x$, [
                a("span", null, o(s(l).label("HTTPS Token", "HTTPS token")), 1),
                a("small", null, o(s(l).label("如果你想直接用 HTTPS 完成提交和推送，就在这里保存 Token。", "Save a token here if you want Guard to commit and push with HTTPS credentials.")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[7] || (r[7] = (f) => e.tokenDraft.token = f),
                  class: "settings-input",
                  type: "password",
                  autocomplete: "off"
                }, null, 512), [
                  [Re, e.tokenDraft.token]
                ])
              ])
            ]),
            a("p", P$, o(s(l).label("已保存的 Token 不会在这里回显；如果后续要轮换，请重新粘贴新的 Token。", "Saved tokens are never echoed here. Paste a new one again when you need to rotate credentials.")), 1),
            a("div", E$, [
              a("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: e.runningAction === "token",
                onClick: r[8] || (r[8] = (f) => n("token-auth"))
              }, o(e.runningAction === "token" ? s(l).label("保存中…", "Saving…") : s(l).label("保存 Token 认证", "Save token auth")), 9, D$)
            ]),
            a("div", M$, [
              a("label", I$, [
                a("span", null, o(s(l).label("OAuth Provider", "OAuth provider")), 1),
                pe(a("select", {
                  "onUpdate:modelValue": r[9] || (r[9] = (f) => e.oauthDraft.provider = f),
                  class: "settings-input"
                }, [
                  (g(!0), m(W, null, ce(e.gitProviderOptions, (f) => (g(), m("option", {
                    key: `oauth-${f.value}`,
                    value: f.value
                  }, o(s(l).label(f.zh, f.en)), 9, O$))), 128))
                ], 512), [
                  [mt, e.oauthDraft.provider]
                ])
              ]),
              a("label", L$, [
                a("span", null, o(s(l).label("回调端口", "Redirect port")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[10] || (r[10] = (f) => e.oauthDraft.redirectPort = f),
                  class: "settings-input",
                  type: "number",
                  min: "1",
                  max: "65535"
                }, null, 512), [
                  [Re, e.oauthDraft.redirectPort]
                ])
              ]),
              a("label", U$, [
                a("span", null, o(s(l).label("Scope", "Scope")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[11] || (r[11] = (f) => e.oauthDraft.scope = f),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [Re, e.oauthDraft.scope]
                ])
              ]),
              a("label", N$, [
                a("span", null, o(s(l).label("Client ID", "Client ID")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[12] || (r[12] = (f) => e.oauthDraft.clientId = f),
                  class: "settings-input",
                  type: "text"
                }, null, 512), [
                  [Re, e.oauthDraft.clientId]
                ])
              ]),
              a("label", F$, [
                a("span", null, o(s(l).label("Client Secret", "Client Secret")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": r[13] || (r[13] = (f) => e.oauthDraft.clientSecret = f),
                  class: "settings-input",
                  type: "password",
                  autocomplete: "off"
                }, null, 512), [
                  [Re, e.oauthDraft.clientSecret]
                ])
              ])
            ]),
            a("div", G$, [
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: e.runningAction === "oauth",
                onClick: r[14] || (r[14] = (f) => n("oauth-start"))
              }, o(e.runningAction === "oauth" ? s(l).label("启动中…", "Starting…") : s(l).label("启动 OAuth", "Start OAuth")), 9, B$),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: !e.oauthAuthorizeUrl,
                onClick: r[15] || (r[15] = (f) => n("copy-auth-url"))
              }, o(s(l).label("复制授权地址", "Copy auth URL")), 9, V$)
            ]),
            a("p", j$, o(((u = e.oauthState) == null ? void 0 : u.phase) === "success" ? e.oauthState.message || s(l).label("OAuth 已完成，可以继续私有仓检查或一键同步。", "OAuth completed. Continue with private-check or sync.") : ((d = e.oauthState) == null ? void 0 : d.phase) === "error" ? e.oauthState.error || e.oauthState.message || s(l).label("OAuth 失败，请检查网络、Client ID、Client Secret 和回调设置。", "OAuth failed. Check the network, Client ID, Client Secret, and callback settings.") : s(l).label("如果你更偏好浏览器授权，可以在这里填写 Client ID / Client Secret。", "Configure Client ID / Client Secret here if you prefer browser OAuth.")), 1),
            e.oauthAuthorizeUrl ? (g(), m("p", z$, [
              ft(o(s(l).label("授权地址：", "Authorize URL: ")) + " ", 1),
              a("a", {
                href: e.oauthAuthorizeUrl,
                target: "_blank",
                rel: "noreferrer"
              }, o(e.oauthAuthorizeUrl), 9, W$)
            ])) : Q("", !0),
            s(l).developerMode ? (g(), m("pre", H$, o(JSON.stringify(e.oauthState || {}, null, 2)), 1)) : Q("", !0)
          ];
        }),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
}), q$ = {
  key: 0,
  class: "muted-copy"
}, J$ = {
  key: 1,
  class: "path-tree"
}, Q$ = ["open"], Y$ = { class: "path-tree__label" }, Z$ = { class: "path-tree__icon" }, X$ = { class: "path-tree__meta" }, eC = { class: "path-tree__label" }, tC = { class: "path-tree__meta" }, gi = /* @__PURE__ */ we({
  __name: "PathTreeList",
  props: {
    nodes: {},
    depth: { default: 0 },
    expandDepth: { default: 0 },
    emptyLabel: { default: "" }
  },
  setup(e) {
    const t = e, n = ke(), l = D(() => t.nodes);
    function i(r) {
      return r.kind === "folder" ? n.label(`${de(r.leafCount)} 项路径`, `${de(r.leafCount)} paths`) : n.label("文件", "File");
    }
    return (r, c) => {
      const u = hc("PathTreeList", !0);
      return l.value.length ? (g(), m("ul", J$, [
        (g(!0), m(W, null, ce(l.value, (d) => (g(), m("li", {
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
              style: Nn({ paddingLeft: `${e.depth * 18}px` })
            }, [
              a("span", Y$, [
                a("span", Z$, o(e.depth < e.expandDepth ? "▾" : "▸"), 1),
                a("span", null, o(d.name) + "/", 1)
              ]),
              a("span", X$, o(i(d)), 1)
            ], 4),
            K(u, {
              nodes: d.children,
              depth: e.depth + 1,
              "expand-depth": e.expandDepth,
              "empty-label": e.emptyLabel
            }, null, 8, ["nodes", "depth", "expand-depth", "empty-label"])
          ], 8, Q$)) : (g(), m("div", {
            key: 1,
            class: "path-tree__file",
            style: Nn({ paddingLeft: `${e.depth * 18 + 24}px` })
          }, [
            a("span", eC, [
              c[0] || (c[0] = a("span", { class: "path-tree__icon" }, "•", -1)),
              a("span", null, o(d.name), 1)
            ]),
            a("span", tC, o(i(d)), 1)
          ], 4))
        ]))), 128))
      ])) : (g(), m("div", q$, o(e.emptyLabel), 1));
    };
  }
}), nC = { class: "muted-copy" }, sC = { class: "stat-grid" }, lC = { class: "stat-card__label" }, aC = {
  key: 0,
  class: "status-banner status-banner--warning"
}, iC = { class: "provider-card__header" }, oC = { class: "muted-copy" }, rC = {
  key: 0,
  class: "provider-card"
}, cC = { class: "provider-card__header" }, uC = { class: "pill pill--muted" }, dC = { class: "list-stack" }, fC = { class: "muted-copy" }, hC = { class: "provider-card__header" }, pC = { class: "muted-copy" }, gC = {
  key: 0,
  class: "list-stack"
}, mC = { class: "provider-card__header" }, bC = { class: "pill pill--warning" }, vC = {
  key: 1,
  class: "page-empty"
}, yC = { class: "settings-grid settings-grid--wide" }, _C = { class: "muted-copy" }, wC = { class: "stat-grid" }, kC = { class: "stat-card" }, $C = { class: "stat-card__label" }, CC = { class: "stat-card" }, SC = { class: "stat-card__label" }, AC = {
  key: 0,
  class: "code-panel"
}, RC = {
  key: 1,
  class: "muted-copy"
}, TC = { class: "page-actions" }, xC = ["disabled"], PC = /* @__PURE__ */ we({
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
    const n = t, l = ke();
    return (i, r) => (g(), m(W, null, [
      K(le, {
        title: s(l).label("同步范围建议", "Sync scope guidance"),
        eyebrow: "Scope"
      }, {
        default: Z(() => [
          a("p", nC, o(s(l).label("目标不是把整个 .openclaw 全量塞进 Git，而是把真正值得换机保留的内容和运行副产物分开。", "The goal is not to push the entire .openclaw into Git, but to separate high-value portable content from runtime by-products.")), 1),
          a("div", sC, [
            (g(!0), m(W, null, ce(e.scopeSummaryItems, (c) => (g(), m("article", {
              key: c.key,
              class: "stat-card"
            }, [
              a("p", lC, o(c.label), 1),
              a("strong", null, o(c.value), 1),
              a("span", null, o(c.detail), 1)
            ]))), 128))
          ]),
          e.gitStatus.skippedEmbeddedRepos.length ? (g(), m("div", aC, o(s(l).label(`Guard 检测到 ${e.gitStatus.skippedEmbeddedRepos.length} 个嵌套 Git 仓库。它们不会被纳入外层 .openclaw 的本次提交，请按下方建议单独处理。`, `Guard detected ${e.gitStatus.skippedEmbeddedRepos.length} embedded Git repositories. They stay outside the current root .openclaw commit and should be handled separately.`)), 1)) : Q("", !0)
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("这次会提交哪些内容？", "What will be included in this commit"),
        eyebrow: "Tree"
      }, {
        default: Z(() => [
          a("div", iC, [
            a("p", oC, o(s(l).label("改成目录树展示，既能看清结构，也不会被超长平铺列表拖慢。这里只展示会进入外层保护仓库提交的路径。", "Rendered as a folder tree so the structure stays visible without a huge flat list. Only the paths entering the root protection commit are shown here.")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (c) => n("copy-stageable-list"))
            }, o(s(l).label("复制完整清单", "Copy full list")), 1)
          ]),
          K(gi, {
            nodes: e.stageableTreeNodes,
            "expand-depth": 0,
            "empty-label": s(l).label("当前没有可直接提交的普通文件。", "No stageable root-repo files detected.")
          }, null, 8, ["nodes", "empty-label"]),
          e.allChangedTreeNodes.length ? (g(), m("details", rC, [
            a("summary", cC, [
              a("strong", null, o(s(l).label("查看全部变更目录树", "View all changed paths")), 1),
              a("span", uC, o(s(de)(e.gitStatus.changedFiles.length)), 1)
            ]),
            a("div", dC, [
              a("p", fC, o(s(l).label("这里会包含将被跳过的嵌套仓库路径，方便你对照完整范围做判断。", "This broader tree includes paths that may be skipped as embedded repositories, so you can compare against the full working scope.")), 1),
              K(gi, {
                nodes: e.allChangedTreeNodes,
                "expand-depth": 0,
                "empty-label": s(l).label("当前没有本地变更。", "No local changes.")
              }, null, 8, ["nodes", "empty-label"])
            ])
          ])) : Q("", !0)
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("已自动跳过的嵌套仓库", "Skipped embedded repositories"),
        eyebrow: "Embedded"
      }, {
        default: Z(() => [
          a("div", hC, [
            a("p", pC, o(s(l).label("这些路径带有自己的 .git，不会被外层保护仓库纳入本次提交。你可以继续独立维护它们，或按需要重新规划边界。", "These paths contain their own .git directories and stay outside the root protection commit. You can keep them independent or re-plan the boundary as needed.")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: r[1] || (r[1] = (c) => n("copy-skipped-repos"))
            }, o(s(l).label("复制仓库列表", "Copy repo list")), 1)
          ]),
          e.gitStatus.skippedEmbeddedRepos.length ? (g(), m("div", gC, [
            (g(!0), m(W, null, ce(e.gitStatus.skippedEmbeddedRepos, (c) => (g(), m("article", {
              key: c,
              class: "provider-card"
            }, [
              a("header", mC, [
                a("strong", null, o(c) + "/", 1),
                a("span", bC, o(s(l).label("已自动跳过", "Skipped")), 1)
              ]),
              a("p", null, o(s(l).label("这是嵌套 Git 仓库，需要单独处理，或加入外层忽略规则。", "This is an embedded Git repository and should be handled separately or added to the root ignore rules.")), 1)
            ]))), 128))
          ])) : (g(), m("div", vC, o(s(l).label("当前没有检测到嵌套 Git 仓库。", "No embedded Git repositories detected right now.")), 1)),
          a("div", yC, [
            (g(!0), m(W, null, ce(e.embeddedRepoGuidance, (c) => (g(), m("article", {
              key: c.key,
              class: "provider-card"
            }, [
              a("strong", null, o(c.title), 1),
              a("p", null, o(c.detail), 1)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label(".gitignore 建议", ".gitignore suggestions"),
        eyebrow: "Ignore rules"
      }, {
        default: Z(() => [
          a("p", _C, o(s(l).label("当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。", "When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.")), 1),
          a("div", wC, [
            a("article", kC, [
              a("p", $C, o(s(l).label("嵌套仓库", "Embedded repos")), 1),
              a("strong", null, o(e.gitIgnorePreview.embeddedRepos.length), 1),
              a("span", null, o(s(l).label("需要单独维护的子仓库", "Child repositories that should be maintained separately")), 1)
            ]),
            a("article", CC, [
              a("p", SC, o(s(l).label("待追加规则", "Missing rules")), 1),
              a("strong", null, o(e.gitIgnorePreview.missingEntries.length), 1),
              a("span", null, o(e.gitIgnorePreview.gitignorePath), 1)
            ])
          ]),
          s(l).developerMode ? (g(), m("pre", AC, o(e.gitIgnorePreview.appendBlock || s(l).label("当前没有需要追加的规则。", "There are no extra rules to append right now.")), 1)) : (g(), m("p", RC, o(s(l).label("推荐规则的原始追加块已经收口到开发者模式中。若你需要逐行检查 appendBlock，请先到 Settings 打开开发者模式。", "The raw append block for recommended rules now stays behind developer mode. Enable it from Settings if you need to inspect the exact appendBlock line by line.")), 1)),
          a("div", TC, [
            a("button", {
              class: "inline-link",
              type: "button",
              disabled: e.runningAction === "gitignore",
              onClick: r[2] || (r[2] = (c) => n("apply-gitignore"))
            }, o(e.runningAction === "gitignore" ? s(l).label("写入中…", "Applying…") : s(l).label("追加推荐规则", "Append recommended rules")), 9, xC)
          ])
        ]),
        _: 1
      }, 8, ["title"])
    ], 64));
  }
});
function mi(e, t) {
  return {
    name: e,
    path: t,
    kind: "folder",
    children: [],
    leafCount: 0,
    map: /* @__PURE__ */ new Map()
  };
}
function lr(e) {
  const t = [...e.children].map((l) => lr(l)).sort((l, i) => l.kind !== i.kind ? l.kind === "folder" ? -1 : 1 : l.name.localeCompare(i.name));
  if (e.kind === "file")
    return {
      name: e.name,
      path: e.path,
      kind: "file",
      children: [],
      leafCount: 1
    };
  const n = t.reduce((l, i) => l + i.leafCount, 0);
  return {
    name: e.name,
    path: e.path,
    kind: "folder",
    children: t,
    leafCount: n
  };
}
function bi(e) {
  var n, l;
  const t = mi("", "");
  for (const i of e) {
    const r = i.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    if (!r) continue;
    const c = r.split("/").filter(Boolean);
    let u = t, d = "";
    for (let f = 0; f < c.length; f += 1) {
      const h = c[f];
      if (d = d ? `${d}/${h}` : h, f === c.length - 1) {
        const C = {
          name: h,
          path: d,
          kind: "file",
          children: [],
          leafCount: 1
        };
        u.children.push(C);
        continue;
      }
      const y = (n = u.map) == null ? void 0 : n.get(h);
      if (y) {
        u = y;
        continue;
      }
      const v = mi(h, d);
      u.children.push(v), (l = u.map) == null || l.set(h, v), u = v;
    }
  }
  return lr(t).children;
}
async function EC() {
  const [e, t, n, l] = await Promise.all([
    Pe("/api/recovery/overview"),
    Pe("/api/recovery/points?limit=20"),
    Pe("/api/git-sync/status"),
    Pe("/api/git-sync/gitignore-preview?mode=smart")
  ]);
  return {
    overview: e,
    points: t.items || [],
    gitStatus: n,
    gitIgnorePreview: l
  };
}
function DC(e) {
  return Ie("/api/recovery/save", { label: e || "" });
}
function MC(e) {
  return Ie("/api/recovery/restore", { commitSha: e });
}
function IC() {
  return Ie("/api/git-sync/init", {});
}
function OC(e) {
  return Ie("/api/git-sync/connect", e);
}
function LC(e) {
  return Ie("/api/git-sync/auth/token", e);
}
function UC(e) {
  return Ie("/api/git-sync/auth/oauth", e);
}
function Xs() {
  return Ie("/api/git-sync/check-private", {});
}
function NC(e) {
  return Ie("/api/git-sync/commit", { message: "" });
}
function FC() {
  return Ie("/api/git-sync/push", {});
}
function vi(e) {
  return Ie("/api/git-sync/sync", { message: "" });
}
function GC(e = "smart") {
  return Ie("/api/git-sync/gitignore-apply", { mode: e });
}
const BC = [
  { value: "github", zh: "GitHub", en: "GitHub" },
  { value: "gitee", zh: "Gitee", en: "Gitee" }
];
let yi = null;
function VC() {
  const e = ke(), t = ot(), n = /* @__PURE__ */ F("center"), l = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F(""), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(""), d = ct(() => EC(), yi, {
    immediate: !1
  }), f = /* @__PURE__ */ ht({
    provider: "github",
    remoteUrl: "",
    remoteName: "origin"
  }), h = /* @__PURE__ */ ht({
    provider: "github",
    token: "",
    username: ""
  }), p = /* @__PURE__ */ ht({
    provider: "github",
    clientId: "",
    clientSecret: "",
    scope: "repo read:user",
    redirectPort: "43189"
  }), y = D(() => [
    { id: "center", label: e.label("恢复中心", "Recovery center") },
    { id: "advanced", label: e.label("高级 Git", "Advanced Git") }
  ]), v = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.overview;
    return w ? !w.repoReady || w.warnings.length > 0 ? "pill--warning" : w.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
  }), C = D(
    () => {
      var w;
      return ((w = d.data) == null ? void 0 : w.gitStatus.state.oauth) || null;
    }
  ), P = D(() => {
    var w;
    return ((w = C.value) == null ? void 0 : w.authorizeUrl) || "";
  }), R = D(() => {
    var w, G, ae;
    return ((w = C.value) == null ? void 0 : w.phase) === "success" ? "pill--success" : ((G = C.value) == null ? void 0 : G.phase) === "error" ? "pill--warning" : ((ae = C.value) == null ? void 0 : ae.phase) === "authorizing" ? "pill--info" : "pill--muted";
  }), x = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.gitStatus;
    if (!w) return "";
    if (w.authConfigured) {
      const ae = w.accountUsername ? `，账号 ${w.accountUsername}` : "";
      return e.label(
        `当前已配置 ${w.authMode || "token"} 认证${ae}。`,
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
  }), N = D(() => {
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
  }), O = D(() => {
    var G;
    const w = (G = d.data) == null ? void 0 : G.gitStatus;
    return w ? [
      {
        key: "all",
        label: e.label("全部变更", "All changes"),
        value: de(w.changedFiles.length),
        detail: e.label(
          "当前工作树里所有已检测到的变更路径。",
          "All changed paths detected in the current worktree."
        ),
        tone: w.changedFiles.length ? "pill--warning" : "pill--muted"
      },
      {
        key: "stageable",
        label: e.label("会进入本次提交", "Included in this commit"),
        value: de(w.stageableChangedFiles.length),
        detail: e.label(
          "这些路径会纳入外层保护仓库的本次提交。",
          "These paths will enter the current root protection commit."
        ),
        tone: w.stageableChangedFiles.length ? "pill--success" : "pill--muted"
      },
      {
        key: "embedded",
        label: e.label("已自动跳过", "Skipped embedded repos"),
        value: de(w.skippedEmbeddedRepos.length),
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
      return bi(((w = d.data) == null ? void 0 : w.gitStatus.stageableChangedFiles) || []);
    }
  ), b = D(
    () => {
      var w;
      return bi(((w = d.data) == null ? void 0 : w.gitStatus.changedFiles) || []);
    }
  ), S = D(() => [
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
  function E() {
    var ae;
    const w = (ae = d.data) == null ? void 0 : ae.gitStatus;
    if (!w) return;
    const G = Zw(w.provider);
    f.provider = G, f.remoteUrl = w.remoteUrl || "", f.remoteName = w.remoteName || "origin", h.provider = G, h.username = w.accountUsername || "", h.token = "", p.provider = G;
  }
  async function z() {
    await d.execute({ silent: !!d.data });
  }
  function j(w) {
    n.value = w === "advanced" ? "advanced" : "center";
  }
  function me(w) {
    l.value = w;
  }
  async function Ce() {
    r.value = !0;
    try {
      const w = await DC(l.value.trim() || void 0);
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
  async function Oe(w) {
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
        const ae = await MC(w.commitSha);
        t.pushToast({
          tone: ae.success ? "success" : "error",
          message: ae.message
        }), await z();
      } catch (ae) {
        t.pushToast({
          tone: "error",
          message: ae instanceof Error ? ae.message : String(ae)
        });
      } finally {
        c.value = "";
      }
    }
  }
  async function Ge(w) {
    u.value = w, i.value = "";
    try {
      const G = w === "init" ? await IC() : w === "private" ? await Xs() : w === "checkpoint" ? await NC() : w === "push" ? await FC() : w === "sync" ? await vi() : await GC("smart");
      i.value = G.message, t.pushToast({
        tone: G.success ? "success" : "error",
        message: G.message
      }), await z();
    } catch (G) {
      const ae = G instanceof Error ? G.message : String(G);
      i.value = ae, t.pushToast({
        tone: "error",
        message: ae
      });
    } finally {
      u.value = "";
    }
  }
  async function ue(w, G) {
    u.value = w, i.value = "";
    try {
      const ae = await G();
      return i.value = ae.message, t.pushToast({
        tone: ae.success ? "success" : "error",
        message: ae.message
      }), await z(), ae;
    } catch (ae) {
      const _ = ae instanceof Error ? ae.message : String(ae);
      return i.value = _, t.pushToast({
        tone: "error",
        message: _
      }), null;
    } finally {
      u.value = "";
    }
  }
  async function fe(w, G) {
    if (!(w != null && w.success) || !G) return w;
    const ae = await ue("private", () => Xs());
    return ae ? (i.value = [w.message, ae.message].filter(Boolean).join("；"), ae) : w;
  }
  async function _e() {
    var G;
    if (!f.remoteUrl.trim()) {
      t.pushToast({
        tone: "error",
        message: e.label("请先填写远端仓库地址。", "Remote URL is required.")
      });
      return;
    }
    const w = await ue(
      "connect",
      () => OC({
        provider: f.provider,
        remoteUrl: f.remoteUrl.trim(),
        remoteName: f.remoteName.trim() || "origin"
      })
    );
    await fe(w, !!((G = w == null ? void 0 : w.status) != null && G.authConfigured));
  }
  async function Ve() {
    var G;
    if (!h.token.trim()) {
      t.pushToast({
        tone: "error",
        message: e.label("请先粘贴 Token。", "Token is required.")
      });
      return;
    }
    const w = await ue(
      "token",
      () => LC({
        provider: h.provider,
        token: h.token.trim(),
        username: h.username.trim() || void 0
      })
    );
    w != null && w.success && (h.token = ""), await fe(w, !!((G = w == null ? void 0 : w.status) != null && G.remoteUrl));
  }
  async function Je() {
    if (!p.clientId.trim() || !p.clientSecret.trim()) {
      t.pushToast({
        tone: "error",
        message: e.label(
          "请先填写 Client ID 和 Client Secret。",
          "Client ID and Client Secret are required."
        )
      });
      return;
    }
    const w = await ue(
      "oauth",
      () => UC({
        provider: p.provider,
        clientId: p.clientId.trim(),
        clientSecret: p.clientSecret.trim(),
        scope: p.scope.trim() || void 0,
        redirectPort: Number(p.redirectPort) || void 0,
        openBrowser: !0
      })
    );
    w != null && w.output && typeof window < "u" && window.open(w.output, "_blank", "noopener,noreferrer");
  }
  async function H() {
    var w;
    !P.value || typeof navigator > "u" || !((w = navigator.clipboard) != null && w.writeText) || (await navigator.clipboard.writeText(P.value), t.pushToast({
      tone: "success",
      message: e.label("授权链接已复制。", "Authorization URL copied.")
    }));
  }
  async function q(w, G, ae) {
    var _;
    if (!w || typeof navigator > "u" || !((_ = navigator.clipboard) != null && _.writeText)) {
      t.pushToast({
        tone: "error",
        message: ae
      });
      return;
    }
    await navigator.clipboard.writeText(w), t.pushToast({
      tone: "success",
      message: G
    });
  }
  async function Y() {
    var w;
    await q(
      (w = d.data) == null ? void 0 : w.gitStatus.repoPath,
      e.label("本地目录已复制。", "Repository path copied."),
      e.label("当前没有可复制的本地目录。", "No repository path is available yet.")
    );
  }
  async function $e() {
    var w;
    await q(
      (w = d.data) == null ? void 0 : w.gitStatus.remoteUrl,
      e.label("远端地址已复制。", "Remote URL copied."),
      e.label("当前还没有远端地址可复制。", "No remote URL is available yet.")
    );
  }
  async function ze() {
    const w = await ue("private", () => Xs());
    if (!(w != null && w.success)) return;
    const G = await ue("sync", () => vi());
    G && (i.value = [w.message, G.message].filter(Boolean).join("；"));
  }
  async function je() {
    var w;
    await q(
      (((w = d.data) == null ? void 0 : w.gitStatus.stageableChangedFiles) || []).join(`
`),
      e.label("待提交清单已复制。", "Stageable file list copied."),
      e.label("当前没有可复制的待提交清单。", "No stageable file list is available right now.")
    );
  }
  async function I() {
    var w;
    await q(
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
  return xe(
    () => d.data,
    (w) => {
      w && (yi = w), w && E();
    }
  ), xe(
    () => {
      var w;
      return [n.value, (w = C.value) == null ? void 0 : w.phase];
    },
    ([w, G], ae, _) => {
      if (typeof window > "u" || w !== "advanced" || G !== "authorizing")
        return;
      const k = window.setInterval(() => {
        z();
      }, 3e3);
      _(() => window.clearInterval(k));
    }
  ), nt(() => {
    d.execute({ silent: !!d.data });
  }), {
    resource: d,
    view: n,
    recoveryTabs: y,
    saveLabel: l,
    advancedMessage: i,
    savingPoint: r,
    restoringCommit: c,
    runningAction: u,
    connectDraft: f,
    tokenDraft: h,
    oauthDraft: p,
    overviewTone: v,
    oauthState: C,
    oauthAuthorizeUrl: P,
    authSummary: x,
    oauthTone: R,
    syncReadinessItems: $,
    blockerSections: T,
    latestGitSignals: N,
    scopeSummaryItems: O,
    stageableTreeNodes: ee,
    allChangedTreeNodes: b,
    embeddedRepoGuidance: S,
    gitProviderOptions: BC,
    refreshPage: z,
    setView: j,
    setSaveLabel: me,
    handleSavePoint: Ce,
    handleRestore: Oe,
    runAdvancedAction: Ge,
    handleConnectRemote: _e,
    handleTokenAuth: Ve,
    handleOAuthStart: Je,
    copyAuthorizeUrl: H,
    handleCopyRepoPath: Y,
    handleCopyRemoteUrl: $e,
    handleCheckAndSync: ze,
    handleCopyStageableList: je,
    handleCopySkippedRepos: I,
    copyPoint: ne
  };
}
const jC = { class: "page-stack" }, zC = { class: "page-header" }, WC = { class: "page-header__eyebrow" }, HC = { class: "page-header__title" }, KC = { class: "page-header__description" }, qC = {
  key: 0,
  class: "page-empty"
}, JC = {
  key: 1,
  class: "page-empty page-empty--error"
}, QC = {
  key: 0,
  class: "status-banner status-banner--warning"
}, YC = /* @__PURE__ */ we({
  __name: "RecoveryPage",
  setup(e) {
    const t = ke(), {
      resource: n,
      view: l,
      recoveryTabs: i,
      saveLabel: r,
      advancedMessage: c,
      savingPoint: u,
      restoringCommit: d,
      runningAction: f,
      connectDraft: h,
      tokenDraft: p,
      oauthDraft: y,
      overviewTone: v,
      oauthState: C,
      oauthAuthorizeUrl: P,
      authSummary: R,
      oauthTone: x,
      syncReadinessItems: $,
      blockerSections: T,
      latestGitSignals: N,
      scopeSummaryItems: O,
      stageableTreeNodes: ee,
      allChangedTreeNodes: b,
      embeddedRepoGuidance: S,
      gitProviderOptions: E,
      refreshPage: z,
      setView: j,
      setSaveLabel: me,
      handleSavePoint: Ce,
      handleRestore: Oe,
      runAdvancedAction: Ge,
      handleConnectRemote: ue,
      handleTokenAuth: fe,
      handleOAuthStart: _e,
      copyAuthorizeUrl: Ve,
      handleCopyRepoPath: Je,
      handleCopyRemoteUrl: H,
      handleCheckAndSync: q,
      handleCopyStageableList: Y,
      handleCopySkippedRepos: $e,
      copyPoint: ze
    } = VC();
    return (je, I) => (g(), m("div", jC, [
      a("header", zC, [
        a("div", null, [
          a("p", WC, o(s(t).label("备份 / 恢复", "Backup / Recovery")), 1),
          a("h2", HC, o(s(t).label("备份与恢复", "Backup & Recovery")), 1),
          a("p", KC, o(s(t).label("把“先保存当前状态、需要时安全回退、然后继续往前走”的主流程留在当前控制台里；只有更底层的仓库排障才进入高级 Git 视图。", "Keep the main flow of saving the current state, rolling back safely when needed, and continuing forward in this console; use the advanced Git view only for deeper repository troubleshooting.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: I[0] || (I[0] = //@ts-ignore
          (...ne) => s(z) && s(z)(...ne))
        }, o(s(n).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("刷新", "Refresh")), 1)
      ]),
      K(Os, {
        items: s(i),
        "active-id": s(l),
        onChange: s(j)
      }, null, 8, ["items", "active-id", "onChange"]),
      s(n).loading && !s(n).data ? (g(), m("div", qC, o(s(t).label("正在读取保护状态…", "Loading protection status…")), 1)) : s(n).error && !s(n).data ? (g(), m("div", JC, o(s(n).error), 1)) : s(n).data ? (g(), m(W, { key: 2 }, [
        s(n).error ? (g(), m("div", QC, o(s(t).label("已保留上一版备份与恢复快照，但后台刷新失败：", "The last backup and recovery snapshot is still on screen, but the background refresh failed: ")) + o(s(n).error), 1)) : Q("", !0),
        s(l) === "center" ? (g(), Ue(Dk, {
          key: 1,
          overview: s(n).data.overview,
          points: s(n).data.points,
          "overview-tone": s(v),
          "save-label": s(r),
          "saving-point": s(u),
          "restoring-commit": s(d),
          "onUpdate:saveLabel": s(me),
          onSave: s(Ce),
          onRestore: s(Oe),
          onCopyPoint: s(ze)
        }, null, 8, ["overview", "points", "overview-tone", "save-label", "saving-point", "restoring-commit", "onUpdate:saveLabel", "onSave", "onRestore", "onCopyPoint"])) : (g(), m(W, { key: 2 }, [
          K(K$, {
            overview: s(n).data.overview,
            "git-status": s(n).data.gitStatus,
            "git-provider-options": s(E),
            "connect-draft": s(h),
            "token-draft": s(p),
            "oauth-draft": s(y),
            "auth-summary": s(R),
            "oauth-tone": s(x),
            "oauth-authorize-url": s(P),
            "oauth-state": s(C),
            "running-action": s(f),
            onConnectRemote: s(ue),
            onCheckPrivate: I[1] || (I[1] = (ne) => s(Ge)("private")),
            onTokenAuth: s(fe),
            onOauthStart: s(_e),
            onCopyAuthUrl: s(Ve)
          }, null, 8, ["overview", "git-status", "git-provider-options", "connect-draft", "token-draft", "oauth-draft", "auth-summary", "oauth-tone", "oauth-authorize-url", "oauth-state", "running-action", "onConnectRemote", "onTokenAuth", "onOauthStart", "onCopyAuthUrl"]),
          K(r$, {
            "git-status": s(n).data.gitStatus,
            "sync-readiness-items": s($),
            "blocker-sections": s(T),
            "latest-git-signals": s(N),
            "running-action": s(f),
            "advanced-message": s(c),
            onCopyRepoPath: s(Je),
            onCopyRemoteUrl: s(H),
            onCheckAndSync: s(q),
            onRunAction: s(Ge)
          }, null, 8, ["git-status", "sync-readiness-items", "blocker-sections", "latest-git-signals", "running-action", "advanced-message", "onCopyRepoPath", "onCopyRemoteUrl", "onCheckAndSync", "onRunAction"]),
          K(PC, {
            "git-status": s(n).data.gitStatus,
            "git-ignore-preview": s(n).data.gitIgnorePreview,
            "scope-summary-items": s(O),
            "stageable-tree-nodes": s(ee),
            "all-changed-tree-nodes": s(b),
            "embedded-repo-guidance": s(S),
            "running-action": s(f),
            onCopyStageableList: s(Y),
            onCopySkippedRepos: s($e),
            onApplyGitignore: I[2] || (I[2] = (ne) => s(Ge)("gitignore"))
          }, null, 8, ["git-status", "git-ignore-preview", "scope-summary-items", "stageable-tree-nodes", "all-changed-tree-nodes", "embedded-repo-guidance", "running-action", "onCopyStageableList", "onCopySkippedRepos"])
        ], 64))
      ], 64)) : Q("", !0)
    ]));
  }
});
function ZC() {
  return Pe("/api/agents");
}
function _i(e) {
  return Ie("/api/agents", e);
}
function XC(e) {
  return ql(`/api/agents/${encodeURIComponent(e)}`);
}
let wi = null;
function ar(e) {
  return e.docStatus.soul && e.docStatus.user && e.docStatus.agents && e.docStatus.memory;
}
function el(e, t) {
  e.originalId = t.isConfigured ? t.id : "", e.id = t.isConfigured ? t.id : "", e.name = t.isConfigured ? t.name : "", e.workspace = t.workspace, e.modelId = t.modelId || "", e.isDefault = t.isDefault, e.ensureWorkspace = !t.workspaceExists, e.bootstrapWorkspaceDocs = !1, e.canDelete = t.isConfigured;
}
function Rn(e, t, n) {
  e.originalId = "", e.id = "", e.name = "", e.workspace = (t == null ? void 0 : t.defaults.workspace) || "~/.openclaw/workspace", e.modelId = (t == null ? void 0 : t.defaults.modelId) || "", e.isDefault = n === 0, e.ensureWorkspace = !0, e.bootstrapWorkspaceDocs = !1, e.canDelete = !1;
}
function eS() {
  const e = ke(), t = ot(), n = ct(() => ZC(), wi, { immediate: !1 }), l = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ ht({
    originalId: "",
    id: "",
    name: "",
    workspace: "~/.openclaw/workspace",
    modelId: "",
    isDefault: !0,
    ensureWorkspace: !0,
    bootstrapWorkspaceDocs: !1,
    canDelete: !1
  }), d = D(() => {
    var b;
    return ((b = n.data) == null ? void 0 : b.agents) || [];
  }), f = D(() => {
    var b;
    return ((b = n.data) == null ? void 0 : b.defaults) || {
      workspace: "~/.openclaw/workspace",
      modelId: null
    };
  }), h = D(() => d.value.filter((b) => b.isDefault).length), p = D(() => d.value.filter((b) => b.workspaceExists).length), y = D(() => d.value.filter((b) => ar(b)).length), v = D(
    () => d.value.find((b) => b.id === l.value && b.isConfigured) || null
  ), C = D(() => !u.originalId), P = D(
    () => u.originalId ? e.label("编辑现有 Agent", "Edit existing agent") : e.label("新增 Agent", "Create agent")
  );
  xe(
    () => n.data,
    (b) => {
      if (b && (wi = b), !!b) {
        if (!i.value) {
          Rn(u, b, b.agents.filter((S) => S.isConfigured).length), i.value = !0;
          return;
        }
        if (v.value) {
          el(u, v.value);
          return;
        }
        u.originalId || Rn(u, b, b.agents.filter((S) => S.isConfigured).length);
      }
    },
    { immediate: !0 }
  ), nt(() => {
    n.execute({ silent: !!n.data });
  });
  async function R() {
    await n.execute({ silent: !0 });
  }
  function x() {
    l.value = "", Rn(u, n.data, d.value.filter((b) => b.isConfigured).length);
  }
  function $(b) {
    if (!b.isConfigured) {
      x();
      return;
    }
    l.value = b.id, el(u, b);
  }
  function T() {
    if (v.value) {
      el(u, v.value);
      return;
    }
    Rn(u, n.data, d.value.filter((b) => b.isConfigured).length);
  }
  async function N() {
    r.value = !0;
    try {
      const b = await _i({
        originalId: u.originalId || void 0,
        id: u.id.trim(),
        name: u.name.trim() || void 0,
        workspace: u.workspace.trim() || void 0,
        modelId: u.modelId.trim() || void 0,
        isDefault: u.isDefault,
        ensureWorkspace: u.ensureWorkspace,
        bootstrapWorkspaceDocs: u.originalId ? void 0 : u.bootstrapWorkspaceDocs
      });
      t.pushToast({
        tone: b.success ? "success" : "error",
        message: b.message
      }), b.success && (l.value = u.id.trim(), await R());
    } catch (b) {
      t.pushToast({
        tone: "error",
        message: b instanceof Error ? b.message : String(b)
      });
    } finally {
      r.value = !1;
    }
  }
  async function O() {
    if (!(!u.canDelete || !u.originalId || !await t.confirm({
      title: e.label("删除 Agent", "Delete agent"),
      message: e.label(
        `确认删除 ${u.originalId} 吗？这会从当前 openclaw.json 中移除这条 Agent 配置。`,
        `Delete ${u.originalId}? This removes the agent entry from the active openclaw.json.`
      ),
      confirmLabel: e.label("确认删除", "Delete"),
      cancelLabel: e.label("取消", "Cancel"),
      tone: "danger"
    }))) {
      c.value = !0;
      try {
        const S = await XC(u.originalId);
        t.pushToast({
          tone: S.success ? "success" : "error",
          message: S.message
        }), S.success && (l.value = "", await R(), Rn(u, n.data, d.value.filter((E) => E.isConfigured).length));
      } catch (S) {
        t.pushToast({
          tone: "error",
          message: S instanceof Error ? S.message : String(S)
        });
      } finally {
        c.value = !1;
      }
    }
  }
  async function ee(b) {
    if (!(!b.isConfigured || b.isDefault))
      try {
        const S = await _i({
          originalId: b.id,
          id: b.id,
          name: b.name,
          workspace: b.workspace,
          modelId: b.modelId || void 0,
          isDefault: !0
        });
        t.pushToast({
          tone: S.success ? "success" : "error",
          message: S.message
        }), S.success && await R();
      } catch (S) {
        t.pushToast({
          tone: "error",
          message: S instanceof Error ? S.message : String(S)
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
    defaultCount: h,
    workspaceReadyCount: p,
    docReadyCount: y,
    isCreateMode: C,
    editorModeLabel: P,
    beginCreateAgent: x,
    editAgent: $,
    resetDraft: T,
    refresh: R,
    handleSaveAgent: N,
    handleDeleteAgent: O,
    handleSetDefault: ee
  };
}
const tS = { class: "page-stack" }, nS = { class: "page-header" }, sS = { class: "page-header__eyebrow" }, lS = { class: "page-header__title" }, aS = { class: "page-header__description" }, iS = { class: "page-actions" }, oS = {
  key: 0,
  class: "page-empty"
}, rS = {
  key: 1,
  class: "page-empty page-empty--error"
}, cS = {
  key: 0,
  class: "status-banner status-banner--warning"
}, uS = { class: "stat-grid" }, dS = { class: "stat-card" }, fS = { class: "stat-card__label" }, hS = { class: "stat-card" }, pS = { class: "stat-card__label" }, gS = { class: "stat-card" }, mS = { class: "stat-card__label" }, bS = { class: "stat-card" }, vS = { class: "stat-card__label" }, yS = { class: "provider-card__header" }, _S = { class: "muted-copy" }, wS = { class: "pill-row" }, kS = { class: "pill pill--info" }, $S = { class: "settings-grid settings-grid--wide" }, CS = { class: "settings-field" }, SS = { class: "settings-field" }, AS = ["placeholder"], RS = { class: "settings-field settings-field--full" }, TS = { class: "settings-field settings-field--full" }, xS = ["placeholder"], PS = { class: "settings-grid settings-grid--wide" }, ES = { class: "settings-toggle" }, DS = { class: "settings-toggle__copy" }, MS = { class: "settings-toggle" }, IS = { class: "settings-toggle__copy" }, OS = {
  key: 0,
  class: "settings-toggle"
}, LS = { class: "settings-toggle__copy" }, US = { class: "settings-note" }, NS = { class: "page-actions" }, FS = ["disabled"], GS = ["disabled"], BS = ["disabled"], VS = ["disabled"], jS = {
  key: 0,
  class: "provider-stack"
}, zS = { class: "provider-card__header" }, WS = { class: "pill-row" }, HS = {
  key: 0,
  class: "pill pill--success"
}, KS = {
  key: 1,
  class: "pill pill--muted"
}, qS = {
  key: 2,
  class: "pill pill--info"
}, JS = { class: "mini-list" }, QS = { class: "mini-list__item mini-list__item--stack" }, YS = { class: "mini-list__item mini-list__item--stack" }, ZS = { class: "mini-list__item mini-list__item--stack" }, XS = { class: "pill-row" }, e0 = {
  key: 0,
  class: "muted-copy"
}, t0 = { class: "page-actions" }, n0 = ["onClick"], s0 = ["onClick"], l0 = ["onClick"], a0 = {
  key: 1,
  class: "page-empty"
}, i0 = /* @__PURE__ */ we({
  __name: "RolesPage",
  setup(e) {
    const t = ke(), n = Yl(), l = Ls(), {
      resource: i,
      agents: r,
      defaults: c,
      draft: u,
      saving: d,
      deleting: f,
      defaultCount: h,
      workspaceReadyCount: p,
      docReadyCount: y,
      isCreateMode: v,
      editorModeLabel: C,
      beginCreateAgent: P,
      editAgent: R,
      resetDraft: x,
      refresh: $,
      handleSaveAgent: T,
      handleDeleteAgent: N,
      handleSetDefault: O
    } = eS();
    function ee(E) {
      l.setMode("all"), l.setCurrentPath(E.resolvedWorkspace), l.setSelectedFilePath(""), l.setSelectedMemoryFilePath(""), n.push("/files");
    }
    function b(E) {
      return t.developerMode ? E.resolvedWorkspace || E.workspace || E.id : E.workspace || E.id;
    }
    function S(E) {
      return t.developerMode ? t.label("当前显示的是实际工作区路径。", "Showing the resolved workspace path.") : E.workspaceExists ? t.label("实际工作区路径已收拢到开发者模式里，可直接点“打开工作区”继续查看。", "The exact workspace path stays behind developer mode. Use Open workspace to continue.") : t.label("Guard 还没有在当前机器上找到这个工作区目录。", "Guard has not found this workspace directory on the current machine yet.");
    }
    return (E, z) => (g(), m("div", tS, [
      a("header", nS, [
        a("div", null, [
          a("p", sS, o(s(t).label("角色 / 工作区", "Roles / Workspace")), 1),
          a("h2", lS, o(s(t).label("角色目录", "Role catalog")), 1),
          a("p", aS, o(s(t).label(
            "现在除了只读查看以外，也可以直接在这里新增 Agent、调整默认角色，并维护工作区和模型路由配置。",
            "This page now supports adding agents, switching the default role, and maintaining workspace and model routing config directly from the console."
          )), 1)
        ]),
        a("div", iS, [
          a("button", {
            class: "inline-link",
            type: "button",
            "data-testid": "roles-add-agent",
            onClick: z[0] || (z[0] = //@ts-ignore
            (...j) => s(P) && s(P)(...j))
          }, o(s(t).label("新增 Agent", "Add agent")), 1),
          a("button", {
            class: "page-header__action",
            type: "button",
            onClick: z[1] || (z[1] = //@ts-ignore
            (...j) => s($) && s($)(...j))
          }, o(s(i).refreshing ? s(t).label("刷新中…", "Refreshing…") : s(t).label("Refresh", "Refresh")), 1)
        ])
      ]),
      s(i).loading && !s(i).data ? (g(), m("div", oS, o(s(t).label("正在读取角色目录…", "Loading the role catalog…")), 1)) : s(i).error && !s(i).data ? (g(), m("div", rS, o(s(i).error), 1)) : (g(), m(W, { key: 2 }, [
        s(i).error ? (g(), m("div", cS, o(s(t).label("上一版角色目录仍然保留在页面上，但后台刷新失败了：", "The last role catalog is still on screen, but the background refresh failed: ")) + o(s(i).error), 1)) : Q("", !0),
        K(le, {
          title: s(t).label("团队概览", "Team overview"),
          eyebrow: "Summary"
        }, {
          default: Z(() => [
            a("div", uS, [
              a("article", dS, [
                a("p", fS, o(s(t).label("角色总数", "Roles")), 1),
                a("strong", null, o(s(de)(s(r).length)), 1),
                a("span", null, o(s(t).label("当前已接入到 Guard 的角色条目", "Role entries currently discovered by Guard")), 1)
              ]),
              a("article", hS, [
                a("p", pS, o(s(t).label("默认角色", "Default role")), 1),
                a("strong", null, o(s(de)(s(h))), 1),
                a("span", null, o(s(h) > 0 ? s(t).label("至少有一个默认角色", "At least one default role is configured") : s(t).label("还没有默认角色", "No default role is configured yet")), 1)
              ]),
              a("article", gS, [
                a("p", mS, o(s(t).label("工作区可用", "Workspaces ready")), 1),
                a("strong", null, o(s(de)(s(p))), 1),
                a("span", null, o(s(t).label("对应的工作区目录已经存在", "The mapped workspace directory already exists")), 1)
              ]),
              a("article", bS, [
                a("p", vS, o(s(t).label("关键文档齐全", "Core docs ready")), 1),
                a("strong", null, o(s(de)(s(y))), 1),
                z[13] || (z[13] = a("span", null, "SOUL / USER / AGENTS / MEMORY", -1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(t).label("Agent 配置", "Agent configuration"),
          eyebrow: "Editor"
        }, {
          default: Z(() => [
            a("div", yS, [
              a("div", null, [
                a("strong", null, o(s(C)), 1),
                a("p", _S, o(s(t).label(
                  `默认工作区：${s(c).workspace}；默认模型：${s(c).modelId || "未设置"}`,
                  `Default workspace: ${s(c).workspace}; default model: ${s(c).modelId || "not set"}`
                )), 1)
              ]),
              a("div", wS, [
                a("span", {
                  class: oe(["pill", s(u).originalId ? "pill--warning" : "pill--success"])
                }, o(s(u).originalId ? s(t).label("编辑模式", "Edit mode") : s(t).label("新增模式", "Create mode")), 3),
                a("span", kS, o(s(u).isDefault ? s(t).label("将设为默认", "Will be default") : s(t).label("非默认角色", "Non-default role")), 1)
              ])
            ]),
            a("div", $S, [
              a("label", CS, [
                a("span", null, o(s(t).label("Agent ID", "Agent ID")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": z[2] || (z[2] = (j) => s(u).id = j),
                  "data-testid": "roles-agent-id",
                  class: "settings-input",
                  type: "text",
                  placeholder: "agent-demo",
                  spellcheck: "false"
                }, null, 512), [
                  [Re, s(u).id]
                ])
              ]),
              a("label", SS, [
                a("span", null, o(s(t).label("显示名称", "Display name")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": z[3] || (z[3] = (j) => s(u).name = j),
                  "data-testid": "roles-agent-name",
                  class: "settings-input",
                  type: "text",
                  placeholder: s(t).label("留空则跟随 Agent ID", "Leave blank to follow the agent id"),
                  spellcheck: "false"
                }, null, 8, AS), [
                  [Re, s(u).name]
                ])
              ]),
              a("label", RS, [
                a("span", null, o(s(t).label("工作区路径", "Workspace path")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": z[4] || (z[4] = (j) => s(u).workspace = j),
                  "data-testid": "roles-agent-workspace",
                  class: "settings-input",
                  type: "text",
                  spellcheck: "false"
                }, null, 512), [
                  [Re, s(u).workspace]
                ])
              ]),
              a("label", TS, [
                a("span", null, o(s(t).label("模型路由（可选）", "Model route (optional)")), 1),
                pe(a("input", {
                  "onUpdate:modelValue": z[5] || (z[5] = (j) => s(u).modelId = j),
                  "data-testid": "roles-agent-model",
                  class: "settings-input",
                  type: "text",
                  placeholder: s(c).modelId || s(t).label("留空则使用默认模型", "Leave blank to use the default model"),
                  spellcheck: "false"
                }, null, 8, xS), [
                  [Re, s(u).modelId]
                ])
              ])
            ]),
            a("div", PS, [
              a("label", ES, [
                a("div", DS, [
                  a("strong", null, o(s(t).label("设为默认角色", "Set as default role")), 1),
                  a("span", null, o(s(t).label(
                    "保存后会清掉其它 Agent 的默认标记，并把当前 Agent 作为主角色。",
                    "Saving clears the default flag on other agents and promotes this one as the primary role."
                  )), 1)
                ]),
                pe(a("input", {
                  "onUpdate:modelValue": z[6] || (z[6] = (j) => s(u).isDefault = j),
                  "data-testid": "roles-agent-default",
                  type: "checkbox"
                }, null, 512), [
                  [Gt, s(u).isDefault]
                ])
              ]),
              a("label", MS, [
                a("div", IS, [
                  a("strong", null, o(s(t).label("缺失时自动创建工作区目录", "Create workspace folder if missing")), 1),
                  a("span", null, o(s(t).label(
                    "只会创建目录本身，不会自动写入 SOUL / USER / AGENTS 等文档。",
                    "This only creates the workspace folder itself when it is missing. Enable the bootstrap option below if you also want starter docs."
                  )), 1)
                ]),
                pe(a("input", {
                  "onUpdate:modelValue": z[7] || (z[7] = (j) => s(u).ensureWorkspace = j),
                  type: "checkbox"
                }, null, 512), [
                  [Gt, s(u).ensureWorkspace]
                ])
              ]),
              s(v) ? (g(), m("label", OS, [
                a("div", LS, [
                  a("strong", null, o(s(t).label("初始化核心工作区文档", "Bootstrap core workspace docs")), 1),
                  a("span", null, o(s(t).label(
                    "仅在新建 Agent 时生效，只补齐缺失的 SOUL / USER / AGENTS 文档和 memory/ 目录，不会覆盖已有内容。",
                    "Applies only when creating a new agent. It fills in missing SOUL / USER / AGENTS docs and the memory/ folder without overwriting existing content."
                  )), 1)
                ]),
                pe(a("input", {
                  "onUpdate:modelValue": z[8] || (z[8] = (j) => s(u).bootstrapWorkspaceDocs = j),
                  "data-testid": "roles-agent-bootstrap-docs",
                  type: "checkbox"
                }, null, 512), [
                  [Gt, s(u).bootstrapWorkspaceDocs]
                ])
              ])) : Q("", !0)
            ]),
            a("div", US, o(s(t).label(
              "Agent 配置会直接写入当前生效的 openclaw.json；如果你在源码工作区或自定义状态目录里运行 Guard，也会写到对应位置。",
              "Agent changes are written into the active openclaw.json for the current Guard runtime, including custom state-dir or workspace-based setups."
            )), 1),
            a("div", NS, [
              a("button", {
                class: "inline-link inline-link--primary",
                "data-testid": "roles-agent-save",
                type: "button",
                disabled: s(d),
                onClick: z[9] || (z[9] = //@ts-ignore
                (...j) => s(T) && s(T)(...j))
              }, o(s(d) ? s(t).label("保存中…", "Saving…") : s(t).label("保存 Agent", "Save agent")), 9, FS),
              a("button", {
                class: "inline-link",
                "data-testid": "roles-agent-reset",
                type: "button",
                disabled: s(d) || s(f),
                onClick: z[10] || (z[10] = //@ts-ignore
                (...j) => s(x) && s(x)(...j))
              }, o(s(t).label("重置草稿", "Reset draft")), 9, GS),
              a("button", {
                class: "inline-link",
                type: "button",
                disabled: s(d) || s(f),
                onClick: z[11] || (z[11] = //@ts-ignore
                (...j) => s(P) && s(P)(...j))
              }, o(s(t).label("切换到新增", "Switch to create")), 9, BS),
              s(u).canDelete ? (g(), m("button", {
                key: 0,
                class: "inline-link",
                "data-testid": "roles-agent-delete",
                type: "button",
                disabled: s(d) || s(f),
                onClick: z[12] || (z[12] = //@ts-ignore
                (...j) => s(N) && s(N)(...j))
              }, o(s(f) ? s(t).label("删除中…", "Deleting…") : s(t).label("删除 Agent", "Delete agent")), 9, VS)) : Q("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(t).label("角色成员", "Role entries"),
          eyebrow: "Catalog"
        }, {
          default: Z(() => [
            s(r).length ? (g(), m("div", jS, [
              (g(!0), m(W, null, ce(s(r), (j) => (g(), m("article", {
                key: j.id,
                class: "provider-card"
              }, [
                a("header", zS, [
                  a("div", null, [
                    a("strong", null, o(j.name), 1),
                    a("p", null, o(b(j)), 1)
                  ]),
                  a("div", WS, [
                    j.isDefault ? (g(), m("span", HS, o(s(t).label("默认", "Default")), 1)) : (g(), m("span", KS, o(j.id), 1)),
                    j.isConfigured ? Q("", !0) : (g(), m("span", qS, o(s(t).label("隐式默认", "Implicit default")), 1)),
                    a("span", {
                      class: oe(["pill", j.workspaceExists ? "pill--success" : "pill--warning"])
                    }, o(j.workspaceExists ? s(t).label("工作区就绪", "Workspace ready") : s(t).label("工作区缺失", "Workspace missing")), 3)
                  ])
                ]),
                a("div", JS, [
                  a("div", QS, [
                    a("strong", null, o(s(t).label("模型路由", "Model route")), 1),
                    a("p", null, o(j.modelId || s(t).label("沿用默认模型", "Uses the default model route")), 1)
                  ]),
                  a("div", YS, [
                    a("strong", null, o(s(t).label("工作区映射", "Workspace mapping")), 1),
                    a("p", null, o(b(j)), 1),
                    a("p", null, o(S(j)), 1)
                  ]),
                  a("div", ZS, [
                    a("strong", null, o(s(t).label("关键文档", "Core docs")), 1),
                    a("div", XS, [
                      a("span", {
                        class: oe(["pill", j.docStatus.soul ? "pill--success" : "pill--warning"])
                      }, "SOUL", 2),
                      a("span", {
                        class: oe(["pill", j.docStatus.user ? "pill--success" : "pill--warning"])
                      }, "USER", 2),
                      a("span", {
                        class: oe(["pill", j.docStatus.agents ? "pill--success" : "pill--warning"])
                      }, "AGENTS", 2),
                      a("span", {
                        class: oe(["pill", j.docStatus.memory ? "pill--success" : "pill--warning"])
                      }, "MEMORY", 2)
                    ]),
                    s(ar)(j) ? (g(), m("p", e0, o(s(t).label("关键工作区文档已经基本齐全。", "The core workspace docs are already in place.")), 1)) : Q("", !0)
                  ])
                ]),
                a("div", t0, [
                  a("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (me) => ee(j)
                  }, o(s(t).label("打开工作区", "Open workspace")), 9, n0),
                  j.isConfigured ? (g(), m("button", {
                    key: 0,
                    class: "inline-link",
                    "data-testid": "roles-agent-edit",
                    type: "button",
                    onClick: (me) => s(R)(j)
                  }, o(s(t).label("编辑配置", "Edit config")), 9, s0)) : Q("", !0),
                  j.isConfigured && !j.isDefault ? (g(), m("button", {
                    key: 1,
                    class: "inline-link",
                    "data-testid": "roles-agent-set-default",
                    type: "button",
                    onClick: (me) => s(O)(j)
                  }, o(s(t).label("设为默认", "Make default")), 9, l0)) : Q("", !0)
                ])
              ]))), 128))
            ])) : (g(), m("div", a0, o(s(t).label("还没有发现可用角色。请先检查 OpenClaw 配置和安装状态。", "No role entries were discovered yet. Check the OpenClaw configuration and installation state first.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64))
    ]));
  }
});
function o0(e, t = 100) {
  const n = new URLSearchParams({
    q: e,
    limit: String(t)
  });
  return Pe(`/api/search?${n.toString()}`);
}
const r0 = { class: "page-stack" }, c0 = { class: "page-header" }, u0 = { class: "page-header__eyebrow" }, d0 = { class: "page-header__title" }, f0 = { class: "page-header__description" }, h0 = {
  class: "inline-link inline-link--primary",
  type: "submit"
}, p0 = {
  key: 0,
  class: "page-empty page-empty--error"
}, g0 = {
  key: 1,
  class: "status-banner status-banner--warning"
}, m0 = { class: "stat-grid" }, b0 = { class: "stat-card" }, v0 = { class: "stat-card__label" }, y0 = { class: "stat-card" }, _0 = { class: "stat-card__label" }, w0 = { class: "stat-card" }, k0 = { class: "stat-card__label" }, $0 = { class: "stat-card" }, C0 = { class: "stat-card__label" }, S0 = {
  key: 0,
  class: "page-empty"
}, A0 = {
  key: 0,
  class: "status-banner status-banner--info"
}, R0 = { class: "provider-stack" }, T0 = { class: "provider-card__header" }, x0 = { class: "pill-row" }, P0 = { class: "page-actions" }, E0 = ["onClick"], D0 = {
  key: 2,
  class: "page-empty"
}, M0 = /* @__PURE__ */ we({
  __name: "SearchPage",
  setup(e) {
    let t = null, n = 0;
    const l = ke(), i = Yl(), r = ot(), c = Ls(), u = /* @__PURE__ */ F(c.searchQuery), d = /* @__PURE__ */ F(!1), f = /* @__PURE__ */ F(null), h = /* @__PURE__ */ F(!1), p = /* @__PURE__ */ F([]), y = /* @__PURE__ */ F(""), v = D(() => new Set(p.value.map((R) => R.path)).size);
    xe(u, (R) => {
      c.setSearchQuery(R);
    });
    async function C() {
      const R = u.value.trim(), x = ++n;
      if (c.setSearchQuery(R), h.value = !0, f.value = null, !R) {
        p.value = [];
        return;
      }
      d.value = !0;
      try {
        const $ = await o0(R, 100);
        if (x !== n)
          return;
        p.value = $.results || [], y.value = R, t = {
          query: R,
          results: [...p.value]
        };
      } catch ($) {
        if (x !== n)
          return;
        f.value = $ instanceof Error ? $.message : String($);
      } finally {
        x === n && (d.value = !1);
      }
    }
    function P(R) {
      c.requestReveal(R.path), r.pushToast({
        tone: "info",
        message: l.label("已切到文件页并定位结果。", "Switched to Files and queued the selected result."),
        durationMs: 2200
      }), i.push("/files");
    }
    return nt(() => {
      if (c.searchQuery.trim()) {
        const R = c.searchQuery.trim();
        if ((t == null ? void 0 : t.query) === R) {
          h.value = !0, p.value = [...t.results], y.value = R, C();
          return;
        }
        C();
      }
    }), (R, x) => (g(), m("div", r0, [
      a("header", c0, [
        a("div", null, [
          a("p", u0, o(s(l).label("搜索 / 检索", "Search / Discovery")), 1),
          a("h2", d0, o(s(l).label("工作区搜索", "Workspace search")), 1),
          a("p", f0, o(s(l).label("先让搜索直接覆盖 Guard 管理的工作区与核心记忆，并且可以一跳回到文件页继续编辑。", "Start with search across Guard-managed workspaces and core memory, then jump straight back into Files to continue editing.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: C
        }, o(d.value ? s(l).label("搜索中…", "Searching…") : s(l).label("Search", "Search")), 1)
      ]),
      K(le, {
        title: s(l).label("搜索条件", "Search query"),
        eyebrow: "Query"
      }, {
        default: Z(() => [
          a("form", {
            class: "search-form",
            onSubmit: kn(C, ["prevent"])
          }, [
            pe(a("input", {
              "onUpdate:modelValue": x[0] || (x[0] = ($) => u.value = $),
              class: "settings-input",
              type: "text",
              placeholder: "SOUL.md / qwen / fallback / cron"
            }, null, 512), [
              [Re, u.value]
            ]),
            a("button", h0, o(d.value ? s(l).label("搜索中…", "Searching…") : s(l).label("开始搜索", "Run search")), 1)
          ], 32)
        ]),
        _: 1
      }, 8, ["title"]),
      f.value && !p.value.length ? (g(), m("div", p0, o(f.value), 1)) : f.value ? (g(), m("div", g0, o(s(l).label("已保留上一版搜索结果，但后台刷新失败：", "The last search results are still on screen, but the background refresh failed: ")) + o(f.value), 1)) : Q("", !0),
      K(le, {
        title: s(l).label("结果概览", "Result overview"),
        eyebrow: "Summary"
      }, {
        default: Z(() => [
          a("div", m0, [
            a("article", b0, [
              a("p", v0, o(s(l).label("命中条数", "Matches")), 1),
              a("strong", null, o(s(de)(p.value.length)), 1),
              a("span", null, o(s(l).label("当前查询返回的匹配行数", "Matched lines returned for the current query")), 1)
            ]),
            a("article", y0, [
              a("p", _0, o(s(l).label("涉及文件", "Files")), 1),
              a("strong", null, o(s(de)(v.value)), 1),
              a("span", null, o(s(l).label("至少命中一次的文件数量", "Files that matched at least once")), 1)
            ]),
            a("article", w0, [
              a("p", k0, o(s(l).label("当前查询", "Current query")), 1),
              a("strong", null, o(u.value.trim() || "-"), 1),
              a("span", null, o(y.value ? s(l).label(`当前展示的是“${y.value}”的结果`, `Currently showing results for "${y.value}"`) : u.value.trim() ? s(l).label("结果来自当前搜索词", "Results are based on the current query") : s(l).label("还没有输入搜索词", "No search query yet")), 1)
            ]),
            a("article", $0, [
              a("p", C0, o(s(l).label("打开方式", "Open flow")), 1),
              a("strong", null, o(s(l).label("一跳到文件页", "Jump into Files")), 1),
              a("span", null, o(s(l).label("搜索结果会按文件或核心记忆模式自动定位", "Results automatically open in file or core-memory mode")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(l).label("搜索结果", "Results"),
        eyebrow: "Results"
      }, {
        default: Z(() => [
          d.value && !p.value.length ? (g(), m("div", S0, o(s(l).label("正在查找匹配结果…", "Searching for matching results…")), 1)) : p.value.length ? (g(), m(W, { key: 1 }, [
            d.value ? (g(), m("div", A0, o(s(l).label("正在后台刷新搜索结果…", "Refreshing search results in the background…")), 1)) : Q("", !0),
            a("div", R0, [
              (g(!0), m(W, null, ce(p.value, ($) => (g(), m("article", {
                key: `${$.path}:${$.line}:${$.preview}`,
                class: "provider-card"
              }, [
                a("header", T0, [
                  a("div", null, [
                    a("strong", null, o($.relativePath || $.path), 1),
                    a("p", null, o(`L${$.line}`), 1)
                  ]),
                  a("div", x0, [
                    a("span", {
                      class: oe(["pill", s(wl)($.path) ? "pill--success" : "pill--info"])
                    }, o(s(wl)($.path) ? s(l).label("核心记忆", "Core memory") : s(l).label("文件", "File")), 3)
                  ])
                ]),
                a("p", null, o($.preview), 1),
                a("div", P0, [
                  a("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (T) => P($)
                  }, o(s(l).label("在文件页打开", "Open in Files")), 9, E0)
                ])
              ]))), 128))
            ])
          ], 64)) : (g(), m("div", D0, o(h.value ? s(l).label("当前搜索词没有命中任何文件。", "The current query did not match any files.") : s(l).label("输入关键词后开始搜索。", "Enter a query to start searching.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
function I0() {
  return Pe("/api/audit");
}
function O0() {
  return Pe("/api/profiles");
}
function L0(e) {
  return Ie("/api/profiles/apply", { profile: e });
}
function U0(e) {
  return Pe(`/api/harden/steps?platform=${encodeURIComponent(e)}`);
}
const N0 = { class: "page-stack" }, F0 = { class: "page-header" }, G0 = { class: "page-header__eyebrow" }, B0 = { class: "page-header__title" }, V0 = { class: "page-header__description" }, j0 = {
  key: 0,
  class: "page-empty"
}, z0 = {
  key: 1,
  class: "page-empty page-empty--error"
}, W0 = {
  key: 0,
  class: "status-banner status-banner--warning"
}, H0 = { class: "muted-copy" }, K0 = { class: "stat-grid" }, q0 = { class: "stat-card" }, J0 = { class: "stat-card__label" }, Q0 = { class: "stat-card" }, Y0 = { class: "stat-card__label" }, Z0 = { class: "stat-card" }, X0 = { class: "stat-card__label" }, eA = { class: "provider-stack" }, tA = { class: "provider-card__header" }, nA = { class: "pill pill--muted" }, sA = { class: "mini-list" }, lA = { class: "provider-card__header" }, aA = {
  key: 0,
  class: "muted-copy"
}, iA = {
  key: 0,
  class: "page-empty"
}, oA = {
  key: 1,
  class: "page-empty page-empty--error"
}, rA = {
  key: 0,
  class: "status-banner status-banner--warning"
}, cA = { class: "muted-copy" }, uA = { class: "provider-stack" }, dA = { class: "provider-card__header" }, fA = { class: "muted-copy" }, hA = { class: "pill pill--info" }, pA = { class: "settings-grid settings-grid--wide" }, gA = { class: "settings-field" }, mA = { class: "mini-list" }, bA = { class: "settings-field" }, vA = {
  key: 0,
  class: "code-panel"
}, yA = {
  key: 1,
  class: "muted-copy"
}, _A = { class: "settings-field" }, wA = {
  key: 0,
  class: "code-panel"
}, kA = {
  key: 1,
  class: "muted-copy"
}, $A = { class: "page-actions" }, CA = ["disabled", "onClick"], SA = {
  key: 0,
  class: "page-empty"
}, AA = {
  key: 1,
  class: "page-empty page-empty--error"
}, RA = {
  key: 0,
  class: "status-banner status-banner--warning"
}, TA = { class: "muted-copy" }, xA = { class: "pill-row" }, PA = ["href"], EA = { class: "provider-stack" }, DA = { class: "provider-card__header" }, MA = { class: "muted-copy" }, IA = {
  key: 0,
  class: "code-panel"
}, OA = {
  key: 1,
  class: "muted-copy"
}, LA = /* @__PURE__ */ we({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const O = navigator.platform.toLowerCase();
      return O.includes("win") ? "windows" : O.includes("mac") ? "macos" : "linux";
    }
    const n = ke(), l = ot(), i = /* @__PURE__ */ F("audit"), r = /* @__PURE__ */ F(t()), c = /* @__PURE__ */ F(""), u = D(() => Hl(`/api/harden/script?platform=${r.value}`));
    let d = null, f = null;
    const h = /* @__PURE__ */ new Map(), p = ct(() => I0(), d, { immediate: !1 }), y = ct(() => O0(), f, { immediate: !1 }), v = ct(
      () => U0(r.value),
      h.get(r.value) || null,
      { immediate: !1 }
    ), C = D(() => [
      { id: "audit", label: n.label("安全检查", "Security checks") },
      { id: "profiles", label: n.label("权限模式", "Permission modes") },
      { id: "hardening", label: n.label("主机加固", "Host hardening") }
    ]), P = D(() => {
      var ee, b;
      const O = /* @__PURE__ */ new Map();
      for (const S of ((ee = p.data) == null ? void 0 : ee.results) || [])
        O.has(S.category) || O.set(S.category, []), (b = O.get(S.category)) == null || b.push(S);
      return Array.from(O.entries());
    });
    xe(() => p.data, (O) => {
      O && (d = O);
    }), xe(() => y.data, (O) => {
      O && (f = O);
    }), xe(() => v.data, (O) => {
      O && h.set(r.value, O);
    }), xe(
      i,
      (O) => {
        O === "audit" && !p.data && !p.loading && p.execute(), O === "profiles" && !y.data && !y.loading && y.execute(), O === "hardening" && !v.data && !v.loading && v.execute();
      },
      { immediate: !0 }
    ), xe(r, () => {
      v.data = h.get(r.value) || null, i.value === "hardening" && v.execute({ silent: !!v.data });
    });
    function R(O) {
      return O === "pass" ? "pill--success" : O === "warn" ? "pill--warning" : "pill--danger";
    }
    function x(O) {
      return O === "pass" ? n.label("通过", "Pass") : O === "warn" ? n.label("警告", "Warning") : n.label("失败", "Fail");
    }
    async function $() {
      if (i.value === "audit") {
        await p.execute({ silent: !!p.data });
        return;
      }
      if (i.value === "profiles") {
        await y.execute({ silent: !!y.data });
        return;
      }
      await v.execute({ silent: !!v.data });
    }
    async function T(O) {
      c.value = O;
      try {
        const ee = await L0(O);
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
    function N(O) {
      i.value = O;
    }
    return (O, ee) => (g(), m("div", N0, [
      a("header", F0, [
        a("div", null, [
          a("p", G0, o(s(n).label("安全 / 防护", "Security / Protection")), 1),
          a("h2", B0, o(s(n).label("安全基线", "Security baseline")), 1),
          a("p", V0, o(s(n).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页更像决策面板，而不是说明书。", "Split the long page into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: $
        }, o(i.value === "audit" && s(p).refreshing || i.value === "profiles" && s(y).refreshing || i.value === "hardening" && s(v).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      K(Os, {
        items: C.value,
        "active-id": i.value,
        onChange: N
      }, null, 8, ["items", "active-id"]),
      i.value === "audit" ? (g(), m(W, { key: 0 }, [
        s(p).loading && !s(p).data ? (g(), m("div", j0, o(s(n).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : s(p).error && !s(p).data ? (g(), m("div", z0, o(s(p).error), 1)) : s(p).data ? (g(), m(W, { key: 2 }, [
          s(p).error ? (g(), m("div", W0, o(s(n).label("已保留上一版安全检查快照，但后台刷新失败：", "The last security-check snapshot is still on screen, but the background refresh failed: ")) + o(s(p).error), 1)) : Q("", !0),
          K(le, {
            title: s(n).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: Z(() => [
              a("p", H0, o(s(n).label("这里更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              a("div", K0, [
                a("article", q0, [
                  a("p", J0, o(s(n).label("通过项", "Pass")), 1),
                  a("strong", null, o(s(p).data.summary.pass), 1),
                  a("span", null, o(s(n).label("当前无需处理", "No action needed right now")), 1)
                ]),
                a("article", Q0, [
                  a("p", Y0, o(s(n).label("警告项", "Warning")), 1),
                  a("strong", null, o(s(p).data.summary.warn), 1),
                  a("span", null, o(s(n).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                a("article", Z0, [
                  a("p", X0, o(s(n).label("失败项", "Fail")), 1),
                  a("strong", null, o(s(p).data.summary.fail), 1),
                  a("span", null, o(s(n).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          K(le, {
            title: s(n).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: Z(() => [
              a("div", eA, [
                (g(!0), m(W, null, ce(P.value, ([b, S]) => (g(), m("article", {
                  key: b,
                  class: "provider-card"
                }, [
                  a("header", tA, [
                    a("strong", null, o(b), 1),
                    a("span", nA, o(S.length), 1)
                  ]),
                  a("div", sA, [
                    (g(!0), m(W, null, ce(S, (E) => (g(), m("div", {
                      key: `${b}-${E.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      a("div", lA, [
                        a("strong", null, o(E.item), 1),
                        a("span", {
                          class: oe(["pill", R(E.status)])
                        }, o(x(E.status)), 3)
                      ]),
                      a("p", null, o(E.message), 1),
                      E.fix ? (g(), m("p", aA, o(s(n).label("建议处理：", "Suggested fix: ")) + o(E.fix), 1)) : Q("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : Q("", !0)
      ], 64)) : i.value === "profiles" ? (g(), m(W, { key: 1 }, [
        s(y).loading && !s(y).data ? (g(), m("div", iA, o(s(n).label("正在读取权限模式…", "Loading permission modes…")), 1)) : s(y).error && !s(y).data ? (g(), m("div", oA, o(s(y).error), 1)) : s(y).data ? (g(), m(W, { key: 2 }, [
          s(y).error ? (g(), m("div", rA, o(s(n).label("已保留上一版权限模式快照，但后台刷新失败：", "The last permission-mode snapshot is still on screen, but the background refresh failed: ")) + o(s(y).error), 1)) : Q("", !0),
          K(le, {
            title: s(n).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: Z(() => [
              a("p", cA, o(s(n).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          a("div", uA, [
            (g(!0), m(W, null, ce(s(y).data, (b) => (g(), Ue(le, {
              key: b.key,
              title: b.name,
              eyebrow: "Profile"
            }, {
              default: Z(() => {
                var S, E, z, j, me, Ce;
                return [
                  a("div", dA, [
                    a("p", fA, o(b.description), 1),
                    a("span", hA, o(b.riskLevel || s(n).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  a("div", pA, [
                    a("div", gA, [
                      a("span", null, o(s(n).label("建议使用场景", "Recommended use cases")), 1),
                      a("div", mA, [
                        (g(!0), m(W, null, ce(b.recommendations || [], (Oe) => (g(), m("div", {
                          key: Oe,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          a("p", null, o(Oe), 1)
                        ]))), 128))
                      ])
                    ]),
                    a("div", bA, [
                      a("span", null, o(s(n).label("允许规则", "Allow rules")), 1),
                      s(n).developerMode ? (g(), m("pre", vA, o((((S = b.tools) == null ? void 0 : S.allow) || []).join(`
`) || "(none)"), 1)) : (g(), m("p", yA, o(s(n).label(`当前包含 ${(((E = b.tools) == null ? void 0 : E.allow) || []).length} 条允许规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((z = b.tools) == null ? void 0 : z.allow) || []).length} allow rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ]),
                    a("div", _A, [
                      a("span", null, o(s(n).label("拒绝规则", "Deny rules")), 1),
                      s(n).developerMode ? (g(), m("pre", wA, o((((j = b.tools) == null ? void 0 : j.deny) || []).join(`
`) || "(none)"), 1)) : (g(), m("p", kA, o(s(n).label(`当前包含 ${(((me = b.tools) == null ? void 0 : me.deny) || []).length} 条拒绝规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((Ce = b.tools) == null ? void 0 : Ce.deny) || []).length} deny rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ])
                  ]),
                  a("div", $A, [
                    a("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: c.value === b.key,
                      onClick: (Oe) => T(b.key)
                    }, o(c.value === b.key ? s(n).label("应用中…", "Applying…") : s(n).label("应用权限模式", "Apply permission mode")), 9, CA)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : Q("", !0)
      ], 64)) : (g(), m(W, { key: 2 }, [
        s(v).loading && !s(v).data ? (g(), m("div", SA, o(s(n).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : s(v).error && !s(v).data ? (g(), m("div", AA, o(s(v).error), 1)) : s(v).data ? (g(), m(W, { key: 2 }, [
          s(v).error ? (g(), m("div", RA, o(s(n).label("已保留上一版主机加固快照，但后台刷新失败：", "The last hardening snapshot is still on screen, but the background refresh failed: ")) + o(s(v).error), 1)) : Q("", !0),
          K(le, {
            title: s(n).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: Z(() => [
              a("p", TA, o(s(n).label("基础建议在所有平台上都类似：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              a("div", xA, [
                a("button", {
                  class: oe(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: ee[0] || (ee[0] = (b) => r.value = "windows")
                }, "Windows", 2),
                a("button", {
                  class: oe(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: ee[1] || (ee[1] = (b) => r.value = "macos")
                }, "macOS", 2),
                a("button", {
                  class: oe(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: ee[2] || (ee[2] = (b) => r.value = "linux")
                }, "Linux", 2),
                a("a", {
                  class: "inline-link",
                  href: u.value
                }, o(s(n).label("下载脚本", "Download script")), 9, PA)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          a("div", EA, [
            (g(!0), m(W, null, ce(s(v).data.steps, (b) => (g(), Ue(le, {
              key: b.id,
              title: b.title,
              eyebrow: "Step"
            }, {
              default: Z(() => {
                var S;
                return [
                  a("div", DA, [
                    a("p", MA, o(b.description), 1),
                    a("span", {
                      class: oe(["pill", b.optional ? "pill--muted" : "pill--warning"])
                    }, o(b.optional ? s(n).label("可选", "Optional") : s(n).label("建议", "Recommended")), 3)
                  ]),
                  s(n).developerMode ? (g(), m("pre", IA, o((b.commands || []).join(`
`) || s(n).label("当前没有附带命令。", "No commands are attached to this step.")), 1)) : (g(), m("p", OA, o((S = b.commands) != null && S.length ? s(n).label(`这个步骤附带 ${b.commands.length} 条命令，默认已收纳到开发者模式中。`, `This step includes ${b.commands.length} commands, which now stay behind developer mode by default.`) : s(n).label("这个步骤当前没有附带命令。", "No commands are attached to this step right now.")), 1))
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : Q("", !0)
      ], 64))
    ]));
  }
});
function UA() {
  return Pe("/api/sessions");
}
const NA = { class: "page-stack" }, FA = { class: "page-header" }, GA = { class: "page-header__eyebrow" }, BA = { class: "page-header__title" }, VA = { class: "page-header__description" }, jA = {
  key: 0,
  class: "page-empty"
}, zA = {
  key: 1,
  class: "page-empty page-empty--error"
}, WA = {
  key: 0,
  class: "status-banner status-banner--warning"
}, HA = { class: "stat-grid" }, KA = { class: "stat-card" }, qA = { class: "stat-card__label" }, JA = { class: "stat-card" }, QA = { class: "stat-card__label" }, YA = { class: "stat-card" }, ZA = { class: "stat-card__label" }, XA = { class: "stat-card" }, eR = { class: "stat-card__label" }, tR = { class: "stat-card" }, nR = { class: "stat-card__label" }, sR = { class: "stat-card" }, lR = { class: "stat-card__label" }, aR = { class: "stat-grid" }, iR = { class: "stat-card" }, oR = { class: "stat-card" }, rR = { class: "stat-card__label" }, cR = { class: "stat-card" }, uR = { class: "stat-card__label" }, dR = { class: "stat-card" }, fR = { class: "stat-card__label" }, hR = { class: "stat-card" }, pR = { class: "stat-card__label" }, gR = { class: "stat-card" }, mR = { class: "stat-card__label" }, bR = {
  key: 1,
  class: "muted-copy"
}, vR = {
  key: 0,
  class: "provider-stack"
}, yR = { class: "provider-card__header" }, _R = { class: "pill-row" }, wR = { class: "pill pill--info" }, kR = { class: "mini-list" }, $R = { class: "mini-list__item mini-list__item--stack" }, CR = { class: "mini-list__item mini-list__item--stack" }, SR = { class: "mini-list__item mini-list__item--stack" }, AR = { class: "mini-list__item mini-list__item--stack" }, RR = {
  key: 1,
  class: "page-empty"
}, TR = { class: "page-two-column" }, xR = {
  key: 0,
  class: "provider-stack"
}, PR = { class: "provider-card__header" }, ER = { class: "pill pill--info" }, DR = { class: "mini-list" }, MR = {
  key: 1,
  class: "page-empty"
}, IR = {
  key: 0,
  class: "provider-stack"
}, OR = { class: "provider-card__header" }, LR = { class: "pill pill--muted" }, UR = {
  key: 1,
  class: "page-empty"
}, NR = { class: "list-stack" }, FR = { class: "stat-grid" }, GR = { class: "stat-card" }, BR = { class: "stat-card__label" }, VR = { class: "stat-card" }, jR = { class: "stat-card__label" }, zR = { class: "stat-card" }, WR = { class: "stat-card__label" }, HR = { class: "stat-card" }, KR = { class: "stat-card__label" }, qR = /* @__PURE__ */ we({
  __name: "SessionsPage",
  setup(e) {
    let t = null;
    const n = ke(), l = ct(() => UA(), t, { immediate: !1 }), i = D(() => {
      var R;
      return (R = l.data) == null ? void 0 : R.snapshot;
    }), r = D(() => {
      var R;
      return ((R = i.value) == null ? void 0 : R.sessions) || [];
    }), c = D(() => {
      var R, x;
      return ((x = (R = i.value) == null ? void 0 : R.sessionsMeta) == null ? void 0 : x.byAgent) || [];
    }), u = D(() => r.value.filter((R) => !["ended", "finished", "closed"].includes(R.status))), d = D(() => {
      var x;
      const R = (x = l.data) == null ? void 0 : x.costSummary;
      return R ? Number.isFinite(R.totalEstimatedCost) && (!!R.pricingUnit || R.totalEstimatedCost > 0) : !1;
    });
    function f() {
      var x;
      const R = (x = l.data) == null ? void 0 : x.costSummary;
      return !R || !d.value ? n.label("无法估算", "Unavailable") : li(R.totalEstimatedCost, R.pricingUnit || "USD");
    }
    function h() {
      return d.value ? n.label("仅供本地观察，不代表官方账单", "For local observation only, not an official bill") : n.label("缺少可靠单价或用量数据，当前不显示金额", "Pricing or usage data is incomplete, so no amount is shown");
    }
    function p(R) {
      return ["ended", "finished", "closed"].includes(R.status) ? "pill--muted" : ["error", "failed", "aborted"].includes(R.status) ? "pill--danger" : "pill--success";
    }
    function y(R) {
      return R ? n.developerMode ? [R.loadedText, R.runtimeShort].filter(Boolean).join(" / ") || n.label("服务信息暂缺", "Service details are missing") : R.installed === !1 ? n.label("当前没有检测到对应运行态。", "The runtime is not currently detected.") : n.label("已检测到服务，详细运行串已收纳到开发者模式。", "The service was detected. Detailed runtime strings stay behind developer mode.") : n.label("服务信息暂缺", "Service details are missing");
    }
    function v() {
      var x;
      const R = (x = i.value) == null ? void 0 : x.memory;
      return R ? n.developerMode ? [R.searchMode, R.dbPath || R.workspaceDir].filter(Boolean).join(" / ") || n.label("记忆运行态信息暂缺", "Memory runtime details are missing") : R.searchMode ? n.label(`检索模式：${R.searchMode}`, `Search mode: ${R.searchMode}`) : n.label("索引已连接，路径信息已收纳到开发者模式。", "The index is connected. Path details stay behind developer mode.") : n.label("记忆运行态信息暂缺", "Memory runtime details are missing");
    }
    function C() {
      var x;
      const R = (x = i.value) == null ? void 0 : x.update;
      return R ? n.developerMode ? [R.packageManager, R.latestVersion].filter(Boolean).join(" / ") || n.label("更新信息暂缺", "Update details are missing") : R.latestVersion ? n.label(`推荐版本：${R.latestVersion}`, `Recommended version: ${R.latestVersion}`) : n.label("更新细节已收纳到开发者模式。", "Detailed updater information stays behind developer mode.") : n.label("更新信息暂缺", "Update details are missing");
    }
    function P(R) {
      return n.developerMode ? R || n.label("没有返回路径信息", "No path information returned") : R ? n.label("工作区路径已收纳到开发者模式。", "Workspace path stays behind developer mode.") : n.label("没有返回路径信息", "No path information returned");
    }
    return xe(() => l.data, (R) => {
      R && (t = R);
    }), nt(() => {
      l.execute({ silent: !!l.data });
    }), (R, x) => (g(), m("div", NA, [
      a("header", FA, [
        a("div", null, [
          a("p", GA, o(s(n).label("会话 / 运行态", "Sessions / Runtime")), 1),
          a("h2", BA, o(s(n).label("会话观察台", "Session observer")), 1),
          a("p", VA, o(s(n).label("把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。", "Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.")), 1)
        ]),
        a("button", {
          class: "page-header__action",
          type: "button",
          onClick: x[0] || (x[0] = ($) => s(l).execute({ silent: !0 }))
        }, o(s(l).refreshing ? s(n).label("刷新中…", "Refreshing…") : s(n).label("Refresh", "Refresh")), 1)
      ]),
      s(l).loading && !s(l).data ? (g(), m("div", jA, o(s(n).label("正在读取会话快照…", "Loading the session snapshot…")), 1)) : s(l).error && !s(l).data ? (g(), m("div", zA, o(s(l).error), 1)) : s(l).data && i.value ? (g(), m(W, { key: 2 }, [
        s(l).error ? (g(), m("div", WA, o(s(n).label("已保留上一版会话快照，但后台刷新失败：", "The last session snapshot is still on screen, but the background refresh failed: ")) + o(s(l).error), 1)) : Q("", !0),
        K(le, {
          title: s(n).label("会话总览", "Session overview"),
          eyebrow: "Summary"
        }, {
          default: Z(() => {
            var $, T, N, O;
            return [
              a("div", HA, [
                a("article", KA, [
                  a("p", qA, o(s(n).label("会话总数", "Sessions")), 1),
                  a("strong", null, o(s(de)((($ = i.value.summary) == null ? void 0 : $.sessionCount) ?? r.value.length)), 1),
                  a("span", null, o(((T = i.value.summary) == null ? void 0 : T.defaultModel) || s(n).label("默认模型未知", "Default model is unknown")), 1)
                ]),
                a("article", JA, [
                  a("p", QA, o(s(n).label("活跃会话", "Active now")), 1),
                  a("strong", null, o(s(de)(u.value.length)), 1),
                  a("span", null, o(s(n).label("当前仍在运行或待执行的会话", "Sessions that are still running or waiting now")), 1)
                ]),
                a("article", YA, [
                  a("p", ZA, o(s(n).label("累计 Tokens", "Total tokens")), 1),
                  a("strong", null, o(s(de)(s(l).data.costSummary.totalTokens)), 1),
                  a("span", null, o(s(n).label("基于共享运行时快照统计", "Counted from the shared runtime snapshot")), 1)
                ]),
                a("article", XA, [
                  a("p", eR, o(s(n).label("用量估算", "Usage estimate")), 1),
                  a("strong", null, o(f()), 1),
                  a("span", null, o(h()), 1)
                ]),
                a("article", tR, [
                  a("p", nR, o(s(n).label("会话索引路径", "Session paths")), 1),
                  a("strong", null, o(s(de)(((N = i.value.sessionsMeta) == null ? void 0 : N.paths.length) || 0)), 1),
                  a("span", null, o(s(n).label("被 Guard 识别到的会话目录", "Session directories detected by Guard")), 1)
                ]),
                a("article", sR, [
                  a("p", lR, o(s(n).label("待处理系统事件", "Queued events")), 1),
                  a("strong", null, o(s(de)(((O = i.value.summary) == null ? void 0 : O.queuedSystemEvents) || 0)), 1),
                  a("span", null, o(s(n).label("等待处理的系统级事件", "System events that are still waiting")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        K(le, {
          title: s(n).label("运行环境", "Runtime context"),
          eyebrow: "Runtime"
        }, {
          default: Z(() => {
            var $, T, N, O, ee, b, S, E, z, j, me, Ce, Oe;
            return [
              a("div", aR, [
                a("article", iR, [
                  x[1] || (x[1] = a("p", { class: "stat-card__label" }, "OS", -1)),
                  a("strong", null, o((($ = i.value.os) == null ? void 0 : $.label) || "-"), 1),
                  a("span", null, o([(T = i.value.os) == null ? void 0 : T.platform, (N = i.value.os) == null ? void 0 : N.arch, (O = i.value.os) == null ? void 0 : O.release].filter(Boolean).join(" / ") || s(n).label("系统信息暂缺", "OS details are missing")), 1)
                ]),
                a("article", oR, [
                  a("p", rR, o(s(n).label("记忆检索", "Memory search")), 1),
                  a("strong", null, o(((ee = i.value.memory) == null ? void 0 : ee.provider) || ((b = i.value.memory) == null ? void 0 : b.backend) || "-"), 1),
                  a("span", null, o(v()), 1)
                ]),
                a("article", cR, [
                  a("p", uR, o(s(n).label("Gateway 服务", "Gateway service")), 1),
                  a("strong", null, o(((S = i.value.gatewayService) == null ? void 0 : S.label) || "-"), 1),
                  a("span", null, o(y(i.value.gatewayService)), 1)
                ]),
                a("article", dR, [
                  a("p", fR, o(s(n).label("Node 服务", "Node service")), 1),
                  a("strong", null, o(((E = i.value.nodeService) == null ? void 0 : E.label) || "-"), 1),
                  a("span", null, o(y(i.value.nodeService)), 1)
                ]),
                a("article", hR, [
                  a("p", pR, o(s(n).label("更新轨道", "Update track")), 1),
                  a("strong", null, o(((z = i.value.update) == null ? void 0 : z.channel) || ((j = i.value.update) == null ? void 0 : j.installKind) || "-"), 1),
                  a("span", null, o(C()), 1)
                ]),
                a("article", gR, [
                  a("p", mR, o(s(n).label("安全审计", "Security audit")), 1),
                  a("strong", null, o(s(de)(((me = i.value.securityAudit) == null ? void 0 : me.findingsCount) || 0)), 1),
                  a("span", null, o(`${s(de)(((Ce = i.value.securityAudit) == null ? void 0 : Ce.critical) || 0)} critical / ${s(de)(((Oe = i.value.securityAudit) == null ? void 0 : Oe.warn) || 0)} warn`), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        s(n).developerMode ? Q("", !0) : (g(), m("p", bR, o(s(n).label("路径、运行时短串和记忆索引位置已收纳到开发者模式。需要进一步排障时，请先到 Settings 打开开发者模式。", "Paths, runtime strings, and memory index locations now stay behind developer mode. Enable developer mode from Settings when you need deeper troubleshooting.")), 1)),
        K(le, {
          title: s(n).label("当前会话", "Current sessions"),
          eyebrow: "Sessions"
        }, {
          default: Z(() => [
            r.value.length ? (g(), m("div", vR, [
              (g(!0), m(W, null, ce(r.value, ($) => (g(), m("article", {
                key: $.id,
                class: "provider-card"
              }, [
                a("header", yR, [
                  a("div", null, [
                    a("strong", null, o($.id), 1),
                    a("p", null, o(`${$.agentId} / ${$.modelId}`), 1)
                  ]),
                  a("div", _R, [
                    a("span", {
                      class: oe(["pill", p($)])
                    }, o($.status || "-"), 3),
                    a("span", wR, o($.channel || "-"), 1)
                  ])
                ]),
                a("div", kR, [
                  a("div", $R, [
                    a("strong", null, o(s(n).label("时间轴", "Timeline")), 1),
                    a("p", null, o(s(n).label("开始：", "Started: ")) + o(s(Qe)($.startedAt)), 1),
                    a("p", null, o(s(n).label("更新：", "Updated: ")) + o(s(Qe)($.updatedAt)), 1)
                  ]),
                  a("div", CR, [
                    a("strong", null, o(s(n).label("Token 使用", "Token usage")), 1),
                    a("p", null, o(`${s(de)($.usage.totalTokens)} tokens`), 1),
                    a("p", null, o(`${s(n).label("输入", "Input")} ${s(de)($.usage.inputTokens)} / ${s(n).label("输出", "Output")} ${s(de)($.usage.outputTokens)}`), 1)
                  ]),
                  a("div", SR, [
                    a("strong", null, o(s(n).label("上下文窗口", "Context window")), 1),
                    a("p", null, o($.contextTokens != null ? s(de)($.contextTokens) : "-"), 1),
                    a("p", null, o(s(n).label("剩余：", "Remaining: ")) + o($.remainingTokens != null ? s(de)($.remainingTokens) : "-"), 1)
                  ]),
                  a("div", AR, [
                    a("strong", null, o(s(n).label("用量估算", "Usage estimate")), 1),
                    a("p", null, o(s(li)($.estimatedCost, s(l).data.costSummary.pricingUnit || "USD")), 1),
                    a("p", null, o(s(n).label("上下文占比：", "Context used: ")) + o(s(Jp)($.percentUsed)), 1)
                  ])
                ])
              ]))), 128))
            ])) : (g(), m("div", RR, o(s(n).label("当前还没有会话记录。", "There are no session records right now.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        a("div", TR, [
          K(le, {
            title: s(n).label("按角色分布", "By role"),
            eyebrow: "Roles"
          }, {
            default: Z(() => [
              c.value.length ? (g(), m("div", xR, [
                (g(!0), m(W, null, ce(c.value, ($) => (g(), m("article", {
                  key: $.agentId,
                  class: "provider-card"
                }, [
                  a("header", PR, [
                    a("div", null, [
                      a("strong", null, o($.agentId), 1),
                      a("p", null, o(P($.path)), 1)
                    ]),
                    a("span", ER, o(s(de)($.count)), 1)
                  ]),
                  a("div", DR, [
                    (g(!0), m(W, null, ce($.recent.slice(0, 3), (T) => (g(), m("div", {
                      key: T.id,
                      class: "mini-list__item"
                    }, [
                      a("div", null, [
                        a("strong", null, o(T.modelId), 1),
                        a("p", null, o(T.channel), 1)
                      ]),
                      a("span", {
                        class: oe(["pill", p(T)])
                      }, o(T.status), 3)
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (g(), m("div", MR, o(s(n).label("当前没有按角色聚合的会话数据。", "No per-role session summary is available right now.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          K(le, {
            title: s(n).label("最近活动", "Recent activity"),
            eyebrow: "Timeline"
          }, {
            default: Z(() => [
              s(l).data.recentActivity.length ? (g(), m("div", IR, [
                (g(!0), m(W, null, ce(s(l).data.recentActivity.slice(0, 10), ($) => (g(), m("article", {
                  key: $.id,
                  class: "provider-card"
                }, [
                  a("header", OR, [
                    a("div", null, [
                      a("strong", null, o($.title), 1),
                      a("p", null, o(s(Qe)($.createdAt)), 1)
                    ]),
                    a("span", LR, o($.type), 1)
                  ]),
                  a("p", null, o($.description), 1)
                ]))), 128))
              ])) : (g(), m("div", UR, o(s(n).label("当前还没有最近活动记录。", "There is no recent activity yet.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        i.value.warnings.length ? (g(), Ue(le, {
          key: 2,
          title: s(n).label("运行提醒", "Runtime warnings"),
          eyebrow: "Warning"
        }, {
          default: Z(() => [
            a("div", NR, [
              (g(!0), m(W, null, ce(i.value.warnings, ($) => (g(), m("article", {
                key: $,
                class: "risk-row"
              }, [
                a("strong", null, o(s(n).label("注意事项", "Warning")), 1),
                a("span", null, o($), 1)
              ]))), 128))
            ])
          ]),
          _: 1
        }, 8, ["title"])) : Q("", !0),
        s(n).developerMode && i.value.memory ? (g(), Ue(le, {
          key: 3,
          "data-testid": "sessions-memory-runtime-details",
          title: s(n).label("记忆运行态补充", "Memory runtime details"),
          eyebrow: "Memory"
        }, {
          default: Z(() => [
            a("div", FR, [
              a("article", GR, [
                a("p", BR, o(s(n).label("记忆文件", "Memory files")), 1),
                a("strong", null, o(s(de)(i.value.memory.files)), 1),
                a("span", null, o(s(n).label("当前已接入的记忆文件数量", "Managed memory files detected now")), 1)
              ]),
              a("article", VR, [
                a("p", jR, o(s(n).label("记忆分块", "Chunks")), 1),
                a("strong", null, o(s(de)(i.value.memory.chunks)), 1),
                a("span", null, o(s(n).label("用于搜索的记忆分块数", "Memory chunks available for search")), 1)
              ]),
              a("article", zR, [
                a("p", WR, o(s(n).label("索引状态", "Index state")), 1),
                a("strong", null, o(i.value.memory.dirty === !0 ? s(n).label("待刷新", "Dirty") : i.value.memory.dirty === !1 ? s(n).label("已同步", "Clean") : "-"), 1),
                a("span", null, o(i.value.memory.dbPath || i.value.memory.workspaceDir || s(n).label("没有返回索引路径", "No index path returned")), 1)
              ]),
              a("article", HR, [
                a("p", KR, o(s(n).label("索引目录", "Index location")), 1),
                a("strong", null, o(i.value.memory.dbPath ? s(n).label("已返回路径", "Path returned") : s(n).label("暂无路径", "No path")), 1),
                a("span", null, o(i.value.memory.dbPath || i.value.memory.workspaceDir || s(n).label("没有返回目录信息", "No directory information returned")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"])) : Q("", !0)
      ], 64)) : Q("", !0)
    ]));
  }
}), JR = { class: "page-stack" }, QR = { class: "page-header" }, YR = { class: "page-header__eyebrow" }, ZR = { class: "page-header__title" }, XR = { class: "page-header__description" }, eT = { class: "settings-grid" }, tT = { class: "settings-panel" }, nT = { class: "settings-panel__header" }, sT = { class: "pill pill--info" }, lT = { class: "settings-choice-grid" }, aT = ["onClick"], iT = { class: "settings-panel" }, oT = { class: "settings-panel__header" }, rT = { class: "pill pill--info" }, cT = { class: "settings-choice-grid settings-choice-grid--compact" }, uT = ["onClick"], dT = { class: "settings-toggle" }, fT = { class: "settings-toggle__copy" }, hT = ["checked"], pT = { class: "page-inline-status" }, gT = { class: "pill pill--info" }, mT = { class: "settings-list" }, bT = { class: "settings-links" }, vT = { class: "settings-note" }, yT = { class: "settings-grid settings-grid--wide" }, _T = { class: "settings-field settings-field--full" }, wT = ["placeholder"], kT = { class: "page-inline-status" }, $T = { class: "pill pill--info" }, CT = { class: "settings-links" }, ST = { class: "settings-note" }, AT = /* @__PURE__ */ we({
  __name: "SettingsPage",
  setup(e) {
    const t = ke(), n = Yn(), l = /* @__PURE__ */ F(n.apiBaseUrl), i = [
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
    async function h() {
      n.setApiBaseUrl(l.value), await n.probeConnection();
    }
    function p() {
      n.resetApiBaseUrl(), l.value = n.defaultApiBaseUrl;
    }
    return (y, v) => (g(), m("div", JR, [
      a("header", QR, [
        a("div", null, [
          a("p", YR, o(s(t).label("设置 / Local only", "Settings / Local only")), 1),
          a("h2", ZR, o(s(t).label("本地偏好与开发者模式", "Local preferences and developer mode")), 1),
          a("p", XR, o(s(t).label(
            "这些设置只保存在当前浏览器或桌面本地，用来调整控制台的显示、调试方式与桌面连接目标，不会直接改动 Guard 服务器。",
            "These preferences stay in the current browser or desktop shell. They shape the console experience and the desktop connection target without directly rewriting the Guard server."
          )), 1)
        ])
      ]),
      K(le, {
        title: s(t).label("界面偏好", "Interface preferences"),
        eyebrow: "Preferences"
      }, {
        default: Z(() => [
          a("div", eT, [
            a("section", tT, [
              a("div", nT, [
                a("div", null, [
                  a("strong", null, o(s(t).label("主题", "Theme")), 1),
                  a("p", null, o(s(t).label("直接在这里切换外观，不用回到右上角菜单。", "Change the appearance directly here without going back to the top-right menu.")), 1)
                ]),
                a("span", sT, o(u.value), 1)
              ]),
              a("div", lT, [
                (g(), m(W, null, ce(i, (C) => a("button", {
                  key: C.value,
                  class: oe(["settings-choice", { "settings-choice--active": s(t).themePreference === C.value }]),
                  type: "button",
                  onClick: (P) => s(t).setThemePreference(C.value)
                }, [
                  a("strong", null, o(s(t).label(C.zh, C.en)), 1),
                  a("span", null, o(s(t).label(C.descriptionZh, C.descriptionEn)), 1)
                ], 10, aT)), 64))
              ])
            ]),
            a("section", iT, [
              a("div", oT, [
                a("div", null, [
                  a("strong", null, o(s(t).label("语言", "Language")), 1),
                  a("p", null, o(s(t).label("切换控制台显示语言，文案会立即生效。", "Switch the console language here and apply the copy immediately.")), 1)
                ]),
                a("span", rT, o(d.value), 1)
              ]),
              a("div", cT, [
                (g(), m(W, null, ce(r, (C) => a("button", {
                  key: C.value,
                  class: oe(["settings-choice", { "settings-choice--active": s(t).language === C.value }]),
                  type: "button",
                  onClick: (P) => s(t).setLanguage(C.value)
                }, [
                  a("strong", null, o(s(t).label(C.zh, C.en)), 1),
                  a("span", null, o(s(t).label(C.descriptionZh, C.descriptionEn)), 1)
                ], 10, uT)), 64))
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      K(le, {
        title: s(t).label("开发者模式", "Developer mode"),
        eyebrow: "Developer"
      }, {
        default: Z(() => [
          a("label", dT, [
            a("div", fT, [
              a("strong", null, o(s(t).label("显示调试与原始视图", "Show debug and raw views")), 1),
              a("span", null, o(s(t).label(
                "开启后会显示原始 JSON、诊断区和后台刷新提示，更适合排查接口、状态或配置问题。",
                "When enabled, the console reveals raw JSON, diagnostic sections, and background refresh hints so API, state, or configuration issues are easier to inspect."
              )), 1)
            ]),
            a("input", {
              checked: s(t).developerMode,
              type: "checkbox",
              onChange: v[0] || (v[0] = (C) => s(t).setDeveloperMode(C.target.checked))
            }, null, 40, hT)
          ]),
          a("div", pT, [
            a("span", {
              class: oe(["pill", s(t).developerMode ? "pill--warning" : "pill--muted"])
            }, o(s(t).developerMode ? s(t).label("当前已开启", "Currently on") : s(t).label("当前已关闭", "Currently off")), 3),
            a("span", gT, o(s(t).label("仅影响当前浏览器", "Browser-local only")), 1)
          ]),
          a("ul", mT, [
            (g(), m(W, null, ce(c, (C) => a("li", {
              key: C.en
            }, o(s(t).label(C.zh, C.en)), 1)), 64))
          ]),
          a("div", bT, [
            K(s(Tt), {
              class: "inline-link",
              to: "/logs"
            }, {
              default: Z(() => [
                ft(o(s(t).label("去日志页查看原始输出", "Open Logs for raw output")), 1)
              ]),
              _: 1
            }),
            K(s(Tt), {
              class: "inline-link",
              to: "/recovery"
            }, {
              default: Z(() => [
                ft(o(s(t).label("去恢复页查看诊断区", "Open Recovery diagnostics")), 1)
              ]),
              _: 1
            }),
            K(s(Tt), {
              class: "inline-link",
              to: "/operations"
            }, {
              default: Z(() => [
                ft(o(s(t).label("去运维页检查运行状态", "Open Operations status")), 1)
              ]),
              _: 1
            })
          ]),
          a("div", vT, o(s(t).label(
            "默认建议关闭，这样更适合普通使用。只在排障、校验接口返回，或者需要查看原始配置时再打开。",
            "Keep this off by default for a cleaner operator experience. Turn it on only when you need troubleshooting, raw API output, or configuration inspection."
          )), 1)
        ]),
        _: 1
      }, 8, ["title"]),
      s(n).isDesktop ? (g(), Ue(le, {
        key: 0,
        title: s(t).label("桌面连接设置", "Desktop connection settings"),
        eyebrow: "Desktop"
      }, {
        default: Z(() => [
          a("div", yT, [
            a("label", _T, [
              a("span", null, o(s(t).label("Guard API 地址", "Guard API base URL")), 1),
              pe(a("input", {
                "onUpdate:modelValue": v[1] || (v[1] = (C) => l.value = C),
                class: "settings-input",
                type: "text",
                spellcheck: "false",
                placeholder: s(n).defaultApiBaseUrl
              }, null, 8, wT), [
                [Re, l.value]
              ]),
              a("small", null, o(s(t).label(
                "桌面薄壳会把所有 /api/* 请求和控制台导航都指向这个地址。默认值是 http://127.0.0.1:18088。",
                "The desktop shell points /api/* requests and console navigation at this address. The default is http://127.0.0.1:18088."
              )), 1)
            ])
          ]),
          a("div", kT, [
            a("span", {
              class: oe(["pill", s(n).connected ? "pill--success" : "pill--warning"])
            }, o(f.value), 3),
            a("span", $T, o(s(n).apiBaseUrl), 1)
          ]),
          a("div", CT, [
            a("button", {
              class: "inline-link inline-link--primary",
              type: "button",
              onClick: h
            }, o(s(t).label("保存并检测", "Save and test")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: v[2] || (v[2] = (C) => s(n).probeConnection())
            }, o(s(t).label("重新检测", "Retry connection")), 1),
            a("button", {
              class: "inline-link",
              type: "button",
              onClick: p
            }, o(s(t).label("恢复默认地址", "Reset to default")), 1)
          ]),
          a("div", ST, o(s(t).label(
            "桌面版第一阶段不会代你拉起 Guard 服务；如果这里显示未连接，请先在本机终端启动 Guard，再回来重试。",
            "The first desktop preview does not boot Guard for you. If this shows offline, start Guard in a local terminal first, then retry here."
          )), 1)
        ]),
        _: 1
      }, 8, ["title"])) : Q("", !0)
    ]));
  }
}), RT = Ch({
  history: lh(),
  routes: [
    { path: "/", name: "overview", component: $b },
    { path: "/operations", name: "operations", component: Yw },
    { path: "/openclaw", name: "openclaw", component: xw },
    { path: "/channels", name: "channels", component: ug },
    { path: "/models", name: "models", component: X_ },
    { path: "/security", name: "security", component: LA },
    { path: "/recovery", name: "recovery", component: YC },
    { path: "/roles", name: "roles", component: i0 },
    { path: "/files", name: "files", component: my },
    { path: "/search", name: "search", component: M0 },
    { path: "/sessions", name: "sessions", component: qR },
    { path: "/logs", name: "logs", component: Vy },
    { path: "/notifications", name: "notifications", component: sw },
    { path: "/cron", name: "cron", component: Xm },
    { path: "/settings", name: "settings", component: AT },
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
Du(rp).use(Ou()).use(RT).mount("#guard-next-app");
