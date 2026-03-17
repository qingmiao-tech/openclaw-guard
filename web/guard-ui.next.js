/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function tl(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const Pe = {}, is = [], Ct = () => {
}, Oa = () => !1, ln = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), sl = (e) => e.startsWith("onUpdate:"), We = Object.assign, nl = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, fo = Object.prototype.hasOwnProperty, Re = (e, t) => fo.call(e, t), pe = Array.isArray, os = (e) => Fs(e) === "[object Map]", _s = (e) => Fs(e) === "[object Set]", El = (e) => Fs(e) === "[object Date]", be = (e) => typeof e == "function", Ve = (e) => typeof e == "string", ft = (e) => typeof e == "symbol", Ae = (e) => e !== null && typeof e == "object", Ma = (e) => (Ae(e) || be(e)) && be(e.then) && be(e.catch), Ia = Object.prototype.toString, Fs = (e) => Ia.call(e), po = (e) => Fs(e).slice(8, -1), Na = (e) => Fs(e) === "[object Object]", an = (e) => Ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ws = /* @__PURE__ */ tl(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), on = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, ho = /-\w/g, ut = on(
  (e) => e.replace(ho, (t) => t.slice(1).toUpperCase())
), _o = /\B([A-Z])/g, zt = on(
  (e) => e.replace(_o, "-$1").toLowerCase()
), Da = on((e) => e.charAt(0).toUpperCase() + e.slice(1)), kn = on(
  (e) => e ? `on${Da(e)}` : ""
), St = (e, t) => !Object.is(e, t), Ks = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Fa = (e, t, s, l = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: l,
    value: s
  });
}, rn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Al;
const cn = () => Al || (Al = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ll(e) {
  if (pe(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const l = e[s], i = Ve(l) ? vo(l) : ll(l);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (Ve(e) || Ae(e))
    return e;
}
const go = /;(?![^(]*\))/g, mo = /:([^]+)/, bo = /\/\*[^]*?\*\//g;
function vo(e) {
  const t = {};
  return e.replace(bo, "").split(go).forEach((s) => {
    if (s) {
      const l = s.split(mo);
      l.length > 1 && (t[l[0].trim()] = l[1].trim());
    }
  }), t;
}
function he(e) {
  let t = "";
  if (Ve(e))
    t = e;
  else if (pe(e))
    for (let s = 0; s < e.length; s++) {
      const l = he(e[s]);
      l && (t += l + " ");
    }
  else if (Ae(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const yo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", wo = /* @__PURE__ */ tl(yo);
function La(e) {
  return !!e || e === "";
}
function $o(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let l = 0; s && l < e.length; l++)
    s = Kt(e[l], t[l]);
  return s;
}
function Kt(e, t) {
  if (e === t) return !0;
  let s = El(e), l = El(t);
  if (s || l)
    return s && l ? e.getTime() === t.getTime() : !1;
  if (s = ft(e), l = ft(t), s || l)
    return e === t;
  if (s = pe(e), l = pe(t), s || l)
    return s && l ? $o(e, t) : !1;
  if (s = Ae(e), l = Ae(t), s || l) {
    if (!s || !l)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const c in e) {
      const u = e.hasOwnProperty(c), d = t.hasOwnProperty(c);
      if (u && !d || !u && d || !Kt(e[c], t[c]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function al(e, t) {
  return e.findIndex((s) => Kt(s, t));
}
const Ua = (e) => !!(e && e.__v_isRef === !0), o = (e) => Ve(e) ? e : e == null ? "" : pe(e) || Ae(e) && (e.toString === Ia || !be(e.toString)) ? Ua(e) ? o(e.value) : JSON.stringify(e, Va, 2) : String(e), Va = (e, t) => Ua(t) ? Va(e, t.value) : os(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [l, i], r) => (s[Sn(l, r) + " =>"] = i, s),
    {}
  )
} : _s(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Sn(s))
} : ft(t) ? Sn(t) : Ae(t) && !pe(t) && !Na(t) ? String(t) : t, Sn = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ft(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ke;
class Ba {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Ke, !t && Ke && (this.index = (Ke.scopes || (Ke.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = Ke;
      try {
        return Ke = this, t();
      } finally {
        Ke = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ke, Ke = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Ke = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, l;
      for (s = 0, l = this.effects.length; s < l; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, l = this.cleanups.length; s < l; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, l = this.scopes.length; s < l; s++)
          this.scopes[s].stop(!0);
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
function Ga(e) {
  return new Ba(e);
}
function Ha() {
  return Ke;
}
function ko(e, t = !1) {
  Ke && Ke.cleanups.push(e);
}
let Oe;
const Cn = /* @__PURE__ */ new WeakSet();
class Wa {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ke && Ke.active && Ke.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Cn.has(this) && (Cn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ja(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Tl(this), za(this);
    const t = Oe, s = dt;
    Oe = this, dt = !0;
    try {
      return this.fn();
    } finally {
      qa(this), Oe = t, dt = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        rl(t);
      this.deps = this.depsTail = void 0, Tl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Cn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ln(this) && this.run();
  }
  get dirty() {
    return Ln(this);
  }
}
let Ka = 0, $s, ks;
function ja(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ks, ks = e;
    return;
  }
  e.next = $s, $s = e;
}
function il() {
  Ka++;
}
function ol() {
  if (--Ka > 0)
    return;
  if (ks) {
    let t = ks;
    for (ks = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; $s; ) {
    let t = $s;
    for ($s = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (l) {
          e || (e = l);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function za(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function qa(e) {
  let t, s = e.depsTail, l = s;
  for (; l; ) {
    const i = l.prevDep;
    l.version === -1 ? (l === s && (s = i), rl(l), So(l)) : t = l, l.dep.activeLink = l.prevActiveLink, l.prevActiveLink = void 0, l = i;
  }
  e.deps = t, e.depsTail = s;
}
function Ln(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ja(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ja(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ts) || (e.globalVersion = Ts, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ln(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = Oe, l = dt;
  Oe = e, dt = !0;
  try {
    za(e);
    const i = e.fn(e._value);
    (t.version === 0 || St(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Oe = s, dt = l, qa(e), e.flags &= -3;
  }
}
function rl(e, t = !1) {
  const { dep: s, prevSub: l, nextSub: i } = e;
  if (l && (l.nextSub = i, e.prevSub = void 0), i && (i.prevSub = l, e.nextSub = void 0), s.subs === e && (s.subs = l, !l && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      rl(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function So(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let dt = !0;
const Qa = [];
function Nt() {
  Qa.push(dt), dt = !1;
}
function Dt() {
  const e = Qa.pop();
  dt = e === void 0 ? !0 : e;
}
function Tl(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Oe;
    Oe = void 0;
    try {
      t();
    } finally {
      Oe = s;
    }
  }
}
let Ts = 0;
class Co {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class cl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Oe || !dt || Oe === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Oe)
      s = this.activeLink = new Co(Oe, this), Oe.deps ? (s.prevDep = Oe.depsTail, Oe.depsTail.nextDep = s, Oe.depsTail = s) : Oe.deps = Oe.depsTail = s, Ya(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const l = s.nextDep;
      l.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = l), s.prevDep = Oe.depsTail, s.nextDep = void 0, Oe.depsTail.nextDep = s, Oe.depsTail = s, Oe.deps === s && (Oe.deps = l);
    }
    return s;
  }
  trigger(t) {
    this.version++, Ts++, this.notify(t);
  }
  notify(t) {
    il();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      ol();
    }
  }
}
function Ya(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let l = t.deps; l; l = l.nextDep)
        Ya(l);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Js = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ Symbol(
  ""
), Un = /* @__PURE__ */ Symbol(
  ""
), Ps = /* @__PURE__ */ Symbol(
  ""
);
function je(e, t, s) {
  if (dt && Oe) {
    let l = Js.get(e);
    l || Js.set(e, l = /* @__PURE__ */ new Map());
    let i = l.get(s);
    i || (l.set(s, i = new cl()), i.map = l, i.key = s), i.track();
  }
}
function Ot(e, t, s, l, i, r) {
  const c = Js.get(e);
  if (!c) {
    Ts++;
    return;
  }
  const u = (d) => {
    d && d.trigger();
  };
  if (il(), t === "clear")
    c.forEach(u);
  else {
    const d = pe(e), p = d && an(s);
    if (d && s === "length") {
      const h = Number(l);
      c.forEach((f, m) => {
        (m === "length" || m === Ps || !ft(m) && m >= h) && u(f);
      });
    } else
      switch ((s !== void 0 || c.has(void 0)) && u(c.get(s)), p && u(c.get(Ps)), t) {
        case "add":
          d ? p && u(c.get("length")) : (u(c.get(Zt)), os(e) && u(c.get(Un)));
          break;
        case "delete":
          d || (u(c.get(Zt)), os(e) && u(c.get(Un)));
          break;
        case "set":
          os(e) && u(c.get(Zt));
          break;
      }
  }
  ol();
}
function xo(e, t) {
  const s = Js.get(e);
  return s && s.get(t);
}
function ts(e) {
  const t = /* @__PURE__ */ Ce(e);
  return t === e ? t : (je(t, "iterate", Ps), /* @__PURE__ */ it(e) ? t : t.map(pt));
}
function un(e) {
  return je(e = /* @__PURE__ */ Ce(e), "iterate", Ps), e;
}
function $t(e, t) {
  return /* @__PURE__ */ Lt(e) ? us(/* @__PURE__ */ xt(e) ? pt(t) : t) : pt(t);
}
const Ro = {
  __proto__: null,
  [Symbol.iterator]() {
    return xn(this, Symbol.iterator, (e) => $t(this, e));
  },
  concat(...e) {
    return ts(this).concat(
      ...e.map((t) => pe(t) ? ts(t) : t)
    );
  },
  entries() {
    return xn(this, "entries", (e) => (e[1] = $t(this, e[1]), e));
  },
  every(e, t) {
    return Et(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Et(
      this,
      "filter",
      e,
      t,
      (s) => s.map((l) => $t(this, l)),
      arguments
    );
  },
  find(e, t) {
    return Et(
      this,
      "find",
      e,
      t,
      (s) => $t(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Et(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Et(
      this,
      "findLast",
      e,
      t,
      (s) => $t(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Et(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Et(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Rn(this, "includes", e);
  },
  indexOf(...e) {
    return Rn(this, "indexOf", e);
  },
  join(e) {
    return ts(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Rn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Et(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ms(this, "pop");
  },
  push(...e) {
    return ms(this, "push", e);
  },
  reduce(e, ...t) {
    return Pl(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Pl(this, "reduceRight", e, t);
  },
  shift() {
    return ms(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Et(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ms(this, "splice", e);
  },
  toReversed() {
    return ts(this).toReversed();
  },
  toSorted(e) {
    return ts(this).toSorted(e);
  },
  toSpliced(...e) {
    return ts(this).toSpliced(...e);
  },
  unshift(...e) {
    return ms(this, "unshift", e);
  },
  values() {
    return xn(this, "values", (e) => $t(this, e));
  }
};
function xn(e, t, s) {
  const l = un(e), i = l[t]();
  return l !== e && !/* @__PURE__ */ it(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.done || (r.value = s(r.value)), r;
  }), i;
}
const Eo = Array.prototype;
function Et(e, t, s, l, i, r) {
  const c = un(e), u = c !== e && !/* @__PURE__ */ it(e), d = c[t];
  if (d !== Eo[t]) {
    const f = d.apply(e, r);
    return u ? pt(f) : f;
  }
  let p = s;
  c !== e && (u ? p = function(f, m) {
    return s.call(this, $t(e, f), m, e);
  } : s.length > 2 && (p = function(f, m) {
    return s.call(this, f, m, e);
  }));
  const h = d.call(c, p, l);
  return u && i ? i(h) : h;
}
function Pl(e, t, s, l) {
  const i = un(e), r = i !== e && !/* @__PURE__ */ it(e);
  let c = s, u = !1;
  i !== e && (r ? (u = l.length === 0, c = function(p, h, f) {
    return u && (u = !1, p = $t(e, p)), s.call(this, p, $t(e, h), f, e);
  }) : s.length > 3 && (c = function(p, h, f) {
    return s.call(this, p, h, f, e);
  }));
  const d = i[t](c, ...l);
  return u ? $t(e, d) : d;
}
function Rn(e, t, s) {
  const l = /* @__PURE__ */ Ce(e);
  je(l, "iterate", Ps);
  const i = l[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ dn(s[0]) ? (s[0] = /* @__PURE__ */ Ce(s[0]), l[t](...s)) : i;
}
function ms(e, t, s = []) {
  Nt(), il();
  const l = (/* @__PURE__ */ Ce(e))[t].apply(e, s);
  return ol(), Dt(), l;
}
const Ao = /* @__PURE__ */ tl("__proto__,__v_isRef,__isVue"), Xa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ft)
);
function To(e) {
  ft(e) || (e = String(e));
  const t = /* @__PURE__ */ Ce(this);
  return je(t, "has", e), t.hasOwnProperty(e);
}
class Za {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, l) {
    if (s === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return l === (i ? r ? Vo : ni : r ? si : ti).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(l) ? t : void 0;
    const c = pe(t);
    if (!i) {
      let d;
      if (c && (d = Ro[s]))
        return d;
      if (s === "hasOwnProperty")
        return To;
    }
    const u = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Me(t) ? t : l
    );
    if ((ft(s) ? Xa.has(s) : Ao(s)) || (i || je(t, "get", s), r))
      return u;
    if (/* @__PURE__ */ Me(u)) {
      const d = c && an(s) ? u : u.value;
      return i && Ae(d) ? /* @__PURE__ */ Bn(d) : d;
    }
    return Ae(u) ? i ? /* @__PURE__ */ Bn(u) : /* @__PURE__ */ Ft(u) : u;
  }
}
class ei extends Za {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, l, i) {
    let r = t[s];
    const c = pe(t) && an(s);
    if (!this._isShallow) {
      const p = /* @__PURE__ */ Lt(r);
      if (!/* @__PURE__ */ it(l) && !/* @__PURE__ */ Lt(l) && (r = /* @__PURE__ */ Ce(r), l = /* @__PURE__ */ Ce(l)), !c && /* @__PURE__ */ Me(r) && !/* @__PURE__ */ Me(l))
        return p || (r.value = l), !0;
    }
    const u = c ? Number(s) < t.length : Re(t, s), d = Reflect.set(
      t,
      s,
      l,
      /* @__PURE__ */ Me(t) ? t : i
    );
    return t === /* @__PURE__ */ Ce(i) && (u ? St(l, r) && Ot(t, "set", s, l) : Ot(t, "add", s, l)), d;
  }
  deleteProperty(t, s) {
    const l = Re(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && l && Ot(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const l = Reflect.has(t, s);
    return (!ft(s) || !Xa.has(s)) && je(t, "has", s), l;
  }
  ownKeys(t) {
    return je(
      t,
      "iterate",
      pe(t) ? "length" : Zt
    ), Reflect.ownKeys(t);
  }
}
class Po extends Za {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Oo = /* @__PURE__ */ new ei(), Mo = /* @__PURE__ */ new Po(), Io = /* @__PURE__ */ new ei(!0);
const Vn = (e) => e, Vs = (e) => Reflect.getPrototypeOf(e);
function No(e, t, s) {
  return function(...l) {
    const i = this.__v_raw, r = /* @__PURE__ */ Ce(i), c = os(r), u = e === "entries" || e === Symbol.iterator && c, d = e === "keys" && c, p = i[e](...l), h = s ? Vn : t ? us : pt;
    return !t && je(
      r,
      "iterate",
      d ? Un : Zt
    ), We(
      // inheriting all iterator properties
      Object.create(p),
      {
        // iterator protocol
        next() {
          const { value: f, done: m } = p.next();
          return m ? { value: f, done: m } : {
            value: u ? [h(f[0]), h(f[1])] : h(f),
            done: m
          };
        }
      }
    );
  };
}
function Bs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Do(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ Ce(r), u = /* @__PURE__ */ Ce(i);
      e || (St(i, u) && je(c, "get", i), je(c, "get", u));
      const { has: d } = Vs(c), p = t ? Vn : e ? us : pt;
      if (d.call(c, i))
        return p(r.get(i));
      if (d.call(c, u))
        return p(r.get(u));
      r !== c && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && je(/* @__PURE__ */ Ce(i), "iterate", Zt), i.size;
    },
    has(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ Ce(r), u = /* @__PURE__ */ Ce(i);
      return e || (St(i, u) && je(c, "has", i), je(c, "has", u)), i === u ? r.has(i) : r.has(i) || r.has(u);
    },
    forEach(i, r) {
      const c = this, u = c.__v_raw, d = /* @__PURE__ */ Ce(u), p = t ? Vn : e ? us : pt;
      return !e && je(d, "iterate", Zt), u.forEach((h, f) => i.call(r, p(h), p(f), c));
    }
  };
  return We(
    s,
    e ? {
      add: Bs("add"),
      set: Bs("set"),
      delete: Bs("delete"),
      clear: Bs("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ Ce(this), c = Vs(r), u = /* @__PURE__ */ Ce(i), d = !t && !/* @__PURE__ */ it(i) && !/* @__PURE__ */ Lt(i) ? u : i;
        return c.has.call(r, d) || St(i, d) && c.has.call(r, i) || St(u, d) && c.has.call(r, u) || (r.add(d), Ot(r, "add", d, d)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ it(r) && !/* @__PURE__ */ Lt(r) && (r = /* @__PURE__ */ Ce(r));
        const c = /* @__PURE__ */ Ce(this), { has: u, get: d } = Vs(c);
        let p = u.call(c, i);
        p || (i = /* @__PURE__ */ Ce(i), p = u.call(c, i));
        const h = d.call(c, i);
        return c.set(i, r), p ? St(r, h) && Ot(c, "set", i, r) : Ot(c, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ Ce(this), { has: c, get: u } = Vs(r);
        let d = c.call(r, i);
        d || (i = /* @__PURE__ */ Ce(i), d = c.call(r, i)), u && u.call(r, i);
        const p = r.delete(i);
        return d && Ot(r, "delete", i, void 0), p;
      },
      clear() {
        const i = /* @__PURE__ */ Ce(this), r = i.size !== 0, c = i.clear();
        return r && Ot(
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
    s[i] = No(i, e, t);
  }), s;
}
function ul(e, t) {
  const s = Do(e, t);
  return (l, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? l : Reflect.get(
    Re(s, i) && i in l ? s : l,
    i,
    r
  );
}
const Fo = {
  get: /* @__PURE__ */ ul(!1, !1)
}, Lo = {
  get: /* @__PURE__ */ ul(!1, !0)
}, Uo = {
  get: /* @__PURE__ */ ul(!0, !1)
};
const ti = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap(), Vo = /* @__PURE__ */ new WeakMap();
function Bo(e) {
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
function Go(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Bo(po(e));
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
  return /* @__PURE__ */ Lt(e) ? e : dl(
    e,
    !1,
    Oo,
    Fo,
    ti
  );
}
// @__NO_SIDE_EFFECTS__
function li(e) {
  return dl(
    e,
    !1,
    Io,
    Lo,
    si
  );
}
// @__NO_SIDE_EFFECTS__
function Bn(e) {
  return dl(
    e,
    !0,
    Mo,
    Uo,
    ni
  );
}
function dl(e, t, s, l, i) {
  if (!Ae(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Go(e);
  if (r === 0)
    return e;
  const c = i.get(e);
  if (c)
    return c;
  const u = new Proxy(
    e,
    r === 2 ? l : s
  );
  return i.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function xt(e) {
  return /* @__PURE__ */ Lt(e) ? /* @__PURE__ */ xt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function it(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function dn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Ce(t) : e;
}
function fl(e) {
  return !Re(e, "__v_skip") && Object.isExtensible(e) && Fa(e, "__v_skip", !0), e;
}
const pt = (e) => Ae(e) ? /* @__PURE__ */ Ft(e) : e, us = (e) => Ae(e) ? /* @__PURE__ */ Bn(e) : e;
// @__NO_SIDE_EFFECTS__
function Me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  return ai(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Ho(e) {
  return ai(e, !0);
}
function ai(e, t) {
  return /* @__PURE__ */ Me(e) ? e : new Wo(e, t);
}
class Wo {
  constructor(t, s) {
    this.dep = new cl(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ Ce(t), this._value = s ? t : pt(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, l = this.__v_isShallow || /* @__PURE__ */ it(t) || /* @__PURE__ */ Lt(t);
    t = l ? t : /* @__PURE__ */ Ce(t), St(t, s) && (this._rawValue = t, this._value = l ? t : pt(t), this.dep.trigger());
  }
}
function a(e) {
  return /* @__PURE__ */ Me(e) ? e.value : e;
}
const Ko = {
  get: (e, t, s) => t === "__v_raw" ? e : a(Reflect.get(e, t, s)),
  set: (e, t, s, l) => {
    const i = e[t];
    return /* @__PURE__ */ Me(i) && !/* @__PURE__ */ Me(s) ? (i.value = s, !0) : Reflect.set(e, t, s, l);
  }
};
function ii(e) {
  return /* @__PURE__ */ xt(e) ? e : new Proxy(e, Ko);
}
// @__NO_SIDE_EFFECTS__
function jo(e) {
  const t = pe(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = oi(e, s);
  return t;
}
class zo {
  constructor(t, s, l) {
    this._object = t, this._key = s, this._defaultValue = l, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ Ce(t);
    let i = !0, r = t;
    if (!pe(t) || !an(String(s)))
      do
        i = !/* @__PURE__ */ dn(r) || /* @__PURE__ */ it(r);
      while (i && (r = r.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = a(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ Me(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ Me(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return xo(this._raw, this._key);
  }
}
class qo {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Jo(e, t, s) {
  return /* @__PURE__ */ Me(e) ? e : be(e) ? new qo(e) : Ae(e) && arguments.length > 1 ? oi(e, t, s) : /* @__PURE__ */ Q(e);
}
function oi(e, t, s) {
  return new zo(e, t, s);
}
class Qo {
  constructor(t, s, l) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new cl(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ts - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = l;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Oe !== this)
      return ja(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ja(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Yo(e, t, s = !1) {
  let l, i;
  return be(e) ? l = e : (l = e.get, i = e.set), new Qo(l, i, s);
}
const Gs = {}, Qs = /* @__PURE__ */ new WeakMap();
let Yt;
function Xo(e, t = !1, s = Yt) {
  if (s) {
    let l = Qs.get(s);
    l || Qs.set(s, l = []), l.push(e);
  }
}
function Zo(e, t, s = Pe) {
  const { immediate: l, deep: i, once: r, scheduler: c, augmentJob: u, call: d } = s, p = (H) => i ? H : /* @__PURE__ */ it(H) || i === !1 || i === 0 ? Mt(H, 1) : Mt(H);
  let h, f, m, _, D = !1, E = !1;
  if (/* @__PURE__ */ Me(e) ? (f = () => e.value, D = /* @__PURE__ */ it(e)) : /* @__PURE__ */ xt(e) ? (f = () => p(e), D = !0) : pe(e) ? (E = !0, D = e.some((H) => /* @__PURE__ */ xt(H) || /* @__PURE__ */ it(H)), f = () => e.map((H) => {
    if (/* @__PURE__ */ Me(H))
      return H.value;
    if (/* @__PURE__ */ xt(H))
      return p(H);
    if (be(H))
      return d ? d(H, 2) : H();
  })) : be(e) ? t ? f = d ? () => d(e, 2) : e : f = () => {
    if (m) {
      Nt();
      try {
        m();
      } finally {
        Dt();
      }
    }
    const H = Yt;
    Yt = h;
    try {
      return d ? d(e, 3, [_]) : e(_);
    } finally {
      Yt = H;
    }
  } : f = Ct, t && i) {
    const H = f, U = i === !0 ? 1 / 0 : i;
    f = () => Mt(H(), U);
  }
  const z = Ha(), O = () => {
    h.stop(), z && z.active && nl(z.effects, h);
  };
  if (r && t) {
    const H = t;
    t = (...U) => {
      H(...U), O();
    };
  }
  let P = E ? new Array(e.length).fill(Gs) : Gs;
  const B = (H) => {
    if (!(!(h.flags & 1) || !h.dirty && !H))
      if (t) {
        const U = h.run();
        if (i || D || (E ? U.some((T, w) => St(T, P[w])) : St(U, P))) {
          m && m();
          const T = Yt;
          Yt = h;
          try {
            const w = [
              U,
              // pass undefined as the old value when it's changed for the first time
              P === Gs ? void 0 : E && P[0] === Gs ? [] : P,
              _
            ];
            P = U, d ? d(t, 3, w) : (
              // @ts-expect-error
              t(...w)
            );
          } finally {
            Yt = T;
          }
        }
      } else
        h.run();
  };
  return u && u(B), h = new Wa(f), h.scheduler = c ? () => c(B, !1) : B, _ = (H) => Xo(H, !1, h), m = h.onStop = () => {
    const H = Qs.get(h);
    if (H) {
      if (d)
        d(H, 4);
      else
        for (const U of H) U();
      Qs.delete(h);
    }
  }, t ? l ? B(!0) : P = h.run() : c ? c(B.bind(null, !0), !0) : h.run(), O.pause = h.pause.bind(h), O.resume = h.resume.bind(h), O.stop = O, O;
}
function Mt(e, t = 1 / 0, s) {
  if (t <= 0 || !Ae(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ Me(e))
    Mt(e.value, t, s);
  else if (pe(e))
    for (let l = 0; l < e.length; l++)
      Mt(e[l], t, s);
  else if (_s(e) || os(e))
    e.forEach((l) => {
      Mt(l, t, s);
    });
  else if (Na(e)) {
    for (const l in e)
      Mt(e[l], t, s);
    for (const l of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, l) && Mt(e[l], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ls(e, t, s, l) {
  try {
    return l ? e(...l) : e();
  } catch (i) {
    fn(i, t, s);
  }
}
function Rt(e, t, s, l) {
  if (be(e)) {
    const i = Ls(e, t, s, l);
    return i && Ma(i) && i.catch((r) => {
      fn(r, t, s);
    }), i;
  }
  if (pe(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Rt(e[r], t, s, l));
    return i;
  }
}
function fn(e, t, s, l = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: c } = t && t.appContext.config || Pe;
  if (t) {
    let u = t.parent;
    const d = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; u; ) {
      const h = u.ec;
      if (h) {
        for (let f = 0; f < h.length; f++)
          if (h[f](e, d, p) === !1)
            return;
      }
      u = u.parent;
    }
    if (r) {
      Nt(), Ls(r, null, 10, [
        e,
        d,
        p
      ]), Dt();
      return;
    }
  }
  er(e, s, i, l, c);
}
function er(e, t, s, l = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Ye = [];
let wt = -1;
const rs = [];
let Ht = null, ns = 0;
const ri = /* @__PURE__ */ Promise.resolve();
let Ys = null;
function pn(e) {
  const t = Ys || ri;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function tr(e) {
  let t = wt + 1, s = Ye.length;
  for (; t < s; ) {
    const l = t + s >>> 1, i = Ye[l], r = Os(i);
    r < e || r === e && i.flags & 2 ? t = l + 1 : s = l;
  }
  return t;
}
function pl(e) {
  if (!(e.flags & 1)) {
    const t = Os(e), s = Ye[Ye.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Os(s) ? Ye.push(e) : Ye.splice(tr(t), 0, e), e.flags |= 1, ci();
  }
}
function ci() {
  Ys || (Ys = ri.then(di));
}
function sr(e) {
  pe(e) ? rs.push(...e) : Ht && e.id === -1 ? Ht.splice(ns + 1, 0, e) : e.flags & 1 || (rs.push(e), e.flags |= 1), ci();
}
function Ol(e, t, s = wt + 1) {
  for (; s < Ye.length; s++) {
    const l = Ye[s];
    if (l && l.flags & 2) {
      if (e && l.id !== e.uid)
        continue;
      Ye.splice(s, 1), s--, l.flags & 4 && (l.flags &= -2), l(), l.flags & 4 || (l.flags &= -2);
    }
  }
}
function ui(e) {
  if (rs.length) {
    const t = [...new Set(rs)].sort(
      (s, l) => Os(s) - Os(l)
    );
    if (rs.length = 0, Ht) {
      Ht.push(...t);
      return;
    }
    for (Ht = t, ns = 0; ns < Ht.length; ns++) {
      const s = Ht[ns];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    Ht = null, ns = 0;
  }
}
const Os = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function di(e) {
  try {
    for (wt = 0; wt < Ye.length; wt++) {
      const t = Ye[wt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ls(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; wt < Ye.length; wt++) {
      const t = Ye[wt];
      t && (t.flags &= -2);
    }
    wt = -1, Ye.length = 0, ui(), Ys = null, (Ye.length || rs.length) && di();
  }
}
let ze = null, fi = null;
function Xs(e) {
  const t = ze;
  return ze = e, fi = e && e.type.__scopeId || null, t;
}
function oe(e, t = ze, s) {
  if (!t || e._n)
    return e;
  const l = (...i) => {
    l._d && tn(-1);
    const r = Xs(t);
    let c;
    try {
      c = e(...i);
    } finally {
      Xs(r), l._d && tn(1);
    }
    return c;
  };
  return l._n = !0, l._c = !0, l._d = !0, l;
}
function Se(e, t) {
  if (ze === null)
    return e;
  const s = mn(ze), l = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, c, u, d = Pe] = t[i];
    r && (be(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Mt(c), l.push({
      dir: r,
      instance: s,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: d
    }));
  }
  return e;
}
function Jt(e, t, s, l) {
  const i = e.dirs, r = t && t.dirs;
  for (let c = 0; c < i.length; c++) {
    const u = i[c];
    r && (u.oldValue = r[c].value);
    let d = u.dir[l];
    d && (Nt(), Rt(d, s, 8, [
      e.el,
      u,
      e,
      t
    ]), Dt());
  }
}
function js(e, t) {
  if (Xe) {
    let s = Xe.provides;
    const l = Xe.parent && Xe.parent.provides;
    l === s && (s = Xe.provides = Object.create(l)), s[e] = t;
  }
}
function ot(e, t, s = !1) {
  const l = Ui();
  if (l || es) {
    let i = es ? es._context.provides : l ? l.parent == null || l.ce ? l.vnode.appContext && l.vnode.appContext.provides : l.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && be(t) ? t.call(l && l.proxy) : t;
  }
}
function nr() {
  return !!(Ui() || es);
}
const lr = /* @__PURE__ */ Symbol.for("v-scx"), ar = () => ot(lr);
function Ue(e, t, s) {
  return pi(e, t, s);
}
function pi(e, t, s = Pe) {
  const { immediate: l, deep: i, flush: r, once: c } = s, u = We({}, s), d = t && l || !t && r !== "post";
  let p;
  if (Ns) {
    if (r === "sync") {
      const _ = ar();
      p = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!d) {
      const _ = () => {
      };
      return _.stop = Ct, _.resume = Ct, _.pause = Ct, _;
    }
  }
  const h = Xe;
  u.call = (_, D, E) => Rt(_, h, D, E);
  let f = !1;
  r === "post" ? u.scheduler = (_) => {
    st(_, h && h.suspense);
  } : r !== "sync" && (f = !0, u.scheduler = (_, D) => {
    D ? _() : pl(_);
  }), u.augmentJob = (_) => {
    t && (_.flags |= 4), f && (_.flags |= 2, h && (_.id = h.uid, _.i = h));
  };
  const m = Zo(e, t, u);
  return Ns && (p ? p.push(m) : d && m()), m;
}
function ir(e, t, s) {
  const l = this.proxy, i = Ve(e) ? e.includes(".") ? hi(l, e) : () => l[e] : e.bind(l, l);
  let r;
  be(t) ? r = t : (r = t.handler, s = t);
  const c = Us(this), u = pi(i, r.bind(l), s);
  return c(), u;
}
function hi(e, t) {
  const s = t.split(".");
  return () => {
    let l = e;
    for (let i = 0; i < s.length && l; i++)
      l = l[s[i]];
    return l;
  };
}
const or = /* @__PURE__ */ Symbol("_vte"), rr = (e) => e.__isTeleport, cr = /* @__PURE__ */ Symbol("_leaveCb");
function hl(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, hl(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Le(e, t) {
  return be(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    We({ name: e.name }, t, { setup: e })
  ) : e;
}
function _i(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ml(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const Zs = /* @__PURE__ */ new WeakMap();
function Ss(e, t, s, l, i = !1) {
  if (pe(e)) {
    e.forEach(
      (E, z) => Ss(
        E,
        t && (pe(t) ? t[z] : t),
        s,
        l,
        i
      )
    );
    return;
  }
  if (cs(l) && !i) {
    l.shapeFlag & 512 && l.type.__asyncResolved && l.component.subTree.component && Ss(e, t, s, l.component.subTree);
    return;
  }
  const r = l.shapeFlag & 4 ? mn(l.component) : l.el, c = i ? null : r, { i: u, r: d } = e, p = t && t.r, h = u.refs === Pe ? u.refs = {} : u.refs, f = u.setupState, m = /* @__PURE__ */ Ce(f), _ = f === Pe ? Oa : (E) => Ml(h, E) ? !1 : Re(m, E), D = (E, z) => !(z && Ml(h, z));
  if (p != null && p !== d) {
    if (Il(t), Ve(p))
      h[p] = null, _(p) && (f[p] = null);
    else if (/* @__PURE__ */ Me(p)) {
      const E = t;
      D(p, E.k) && (p.value = null), E.k && (h[E.k] = null);
    }
  }
  if (be(d))
    Ls(d, u, 12, [c, h]);
  else {
    const E = Ve(d), z = /* @__PURE__ */ Me(d);
    if (E || z) {
      const O = () => {
        if (e.f) {
          const P = E ? _(d) ? f[d] : h[d] : D() || !e.k ? d.value : h[e.k];
          if (i)
            pe(P) && nl(P, r);
          else if (pe(P))
            P.includes(r) || P.push(r);
          else if (E)
            h[d] = [r], _(d) && (f[d] = h[d]);
          else {
            const B = [r];
            D(d, e.k) && (d.value = B), e.k && (h[e.k] = B);
          }
        } else E ? (h[d] = c, _(d) && (f[d] = c)) : z && (D(d, e.k) && (d.value = c), e.k && (h[e.k] = c));
      };
      if (c) {
        const P = () => {
          O(), Zs.delete(e);
        };
        P.id = -1, Zs.set(e, P), st(P, s);
      } else
        Il(e), O();
    }
  }
}
function Il(e) {
  const t = Zs.get(e);
  t && (t.flags |= 8, Zs.delete(e));
}
cn().requestIdleCallback;
cn().cancelIdleCallback;
const cs = (e) => !!e.type.__asyncLoader, gi = (e) => e.type.__isKeepAlive;
function ur(e, t) {
  mi(e, "a", t);
}
function dr(e, t) {
  mi(e, "da", t);
}
function mi(e, t, s = Xe) {
  const l = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (hn(t, l, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      gi(i.parent.vnode) && fr(l, t, s, i), i = i.parent;
  }
}
function fr(e, t, s, l) {
  const i = hn(
    t,
    e,
    l,
    !0
    /* prepend */
  );
  bi(() => {
    nl(l[t], i);
  }, s);
}
function hn(e, t, s = Xe, l = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...c) => {
      Nt();
      const u = Us(s), d = Rt(t, s, e, c);
      return u(), Dt(), d;
    });
    return l ? i.unshift(r) : i.push(r), r;
  }
}
const Vt = (e) => (t, s = Xe) => {
  (!Ns || e === "sp") && hn(e, (...l) => t(...l), s);
}, pr = Vt("bm"), qt = Vt("m"), hr = Vt(
  "bu"
), _r = Vt("u"), gr = Vt(
  "bum"
), bi = Vt("um"), mr = Vt(
  "sp"
), br = Vt("rtg"), vr = Vt("rtc");
function yr(e, t = Xe) {
  hn("ec", e, t);
}
const wr = /* @__PURE__ */ Symbol.for("v-ndc");
function ve(e, t, s, l) {
  let i;
  const r = s, c = pe(e);
  if (c || Ve(e)) {
    const u = c && /* @__PURE__ */ xt(e);
    let d = !1, p = !1;
    u && (d = !/* @__PURE__ */ it(e), p = /* @__PURE__ */ Lt(e), e = un(e)), i = new Array(e.length);
    for (let h = 0, f = e.length; h < f; h++)
      i[h] = t(
        d ? p ? us(pt(e[h])) : pt(e[h]) : e[h],
        h,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let u = 0; u < e; u++)
      i[u] = t(u + 1, u, void 0, r);
  } else if (Ae(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (u, d) => t(u, d, void 0, r)
      );
    else {
      const u = Object.keys(e);
      i = new Array(u.length);
      for (let d = 0, p = u.length; d < p; d++) {
        const h = u[d];
        i[d] = t(e[h], h, d, r);
      }
    }
  else
    i = [];
  return i;
}
function Nl(e, t, s = {}, l, i) {
  if (ze.ce || ze.parent && cs(ze.parent) && ze.parent.ce) {
    const p = Object.keys(s).length > 0;
    return t !== "default" && (s.name = t), v(), ht(
      J,
      null,
      [X("slot", s, l)],
      p ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1), v();
  const c = r && vi(r(s)), u = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  c && c.key, d = ht(
    J,
    {
      key: (u && !ft(u) ? u : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!c && l ? "_fb" : "")
    },
    c || [],
    c && e._ === 1 ? 64 : -2
  );
  return d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]), r && r._c && (r._d = !0), d;
}
function vi(e) {
  return e.some((t) => Is(t) ? !(t.type === Ut || t.type === J && !vi(t.children)) : !0) ? e : null;
}
const Gn = (e) => e ? Vi(e) ? mn(e) : Gn(e.parent) : null, Cs = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ We(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Gn(e.parent),
    $root: (e) => Gn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => wi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      pl(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = pn.bind(e.proxy)),
    $watch: (e) => ir.bind(e)
  })
), En = (e, t) => e !== Pe && !e.__isScriptSetup && Re(e, t), $r = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: l, data: i, props: r, accessCache: c, type: u, appContext: d } = e;
    if (t[0] !== "$") {
      const m = c[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return l[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (En(l, t))
          return c[t] = 1, l[t];
        if (i !== Pe && Re(i, t))
          return c[t] = 2, i[t];
        if (Re(r, t))
          return c[t] = 3, r[t];
        if (s !== Pe && Re(s, t))
          return c[t] = 4, s[t];
        Hn && (c[t] = 0);
      }
    }
    const p = Cs[t];
    let h, f;
    if (p)
      return t === "$attrs" && je(e.attrs, "get", ""), p(e);
    if (
      // css module (injected by vue-loader)
      (h = u.__cssModules) && (h = h[t])
    )
      return h;
    if (s !== Pe && Re(s, t))
      return c[t] = 4, s[t];
    if (
      // global properties
      f = d.config.globalProperties, Re(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, s) {
    const { data: l, setupState: i, ctx: r } = e;
    return En(i, t) ? (i[t] = s, !0) : l !== Pe && Re(l, t) ? (l[t] = s, !0) : Re(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: l, appContext: i, props: r, type: c }
  }, u) {
    let d;
    return !!(s[u] || e !== Pe && u[0] !== "$" && Re(e, u) || En(t, u) || Re(r, u) || Re(l, u) || Re(Cs, u) || Re(i.config.globalProperties, u) || (d = c.__cssModules) && d[u]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Re(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Dl(e) {
  return pe(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Hn = !0;
function kr(e) {
  const t = wi(e), s = e.proxy, l = e.ctx;
  Hn = !1, t.beforeCreate && Fl(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: c,
    watch: u,
    provide: d,
    inject: p,
    // lifecycle
    created: h,
    beforeMount: f,
    mounted: m,
    beforeUpdate: _,
    updated: D,
    activated: E,
    deactivated: z,
    beforeDestroy: O,
    beforeUnmount: P,
    destroyed: B,
    unmounted: H,
    render: U,
    renderTracked: T,
    renderTriggered: w,
    errorCaptured: S,
    serverPrefetch: R,
    // public API
    expose: Z,
    inheritAttrs: ie,
    // assets
    components: _e,
    directives: ye,
    filters: Ie
  } = t;
  if (p && Sr(p, l, null), c)
    for (const $ in c) {
      const A = c[$];
      be(A) && (l[$] = A.bind(s));
    }
  if (i) {
    const $ = i.call(s, s);
    Ae($) && (e.data = /* @__PURE__ */ Ft($));
  }
  if (Hn = !0, r)
    for (const $ in r) {
      const A = r[$], me = be(A) ? A.bind(s, s) : be(A.get) ? A.get.bind(s, s) : Ct, ue = !be(A) && be(A.set) ? A.set.bind(s) : Ct, W = ae({
        get: me,
        set: ue
      });
      Object.defineProperty(l, $, {
        enumerable: !0,
        configurable: !0,
        get: () => W.value,
        set: (K) => W.value = K
      });
    }
  if (u)
    for (const $ in u)
      yi(u[$], l, s, $);
  if (d) {
    const $ = be(d) ? d.call(s) : d;
    Reflect.ownKeys($).forEach((A) => {
      js(A, $[A]);
    });
  }
  h && Fl(h, e, "c");
  function M($, A) {
    pe(A) ? A.forEach((me) => $(me.bind(s))) : A && $(A.bind(s));
  }
  if (M(pr, f), M(qt, m), M(hr, _), M(_r, D), M(ur, E), M(dr, z), M(yr, S), M(vr, T), M(br, w), M(gr, P), M(bi, H), M(mr, R), pe(Z))
    if (Z.length) {
      const $ = e.exposed || (e.exposed = {});
      Z.forEach((A) => {
        Object.defineProperty($, A, {
          get: () => s[A],
          set: (me) => s[A] = me,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  U && e.render === Ct && (e.render = U), ie != null && (e.inheritAttrs = ie), _e && (e.components = _e), ye && (e.directives = ye), R && _i(e);
}
function Sr(e, t, s = Ct) {
  pe(e) && (e = Wn(e));
  for (const l in e) {
    const i = e[l];
    let r;
    Ae(i) ? "default" in i ? r = ot(
      i.from || l,
      i.default,
      !0
    ) : r = ot(i.from || l) : r = ot(i), /* @__PURE__ */ Me(r) ? Object.defineProperty(t, l, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (c) => r.value = c
    }) : t[l] = r;
  }
}
function Fl(e, t, s) {
  Rt(
    pe(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function yi(e, t, s, l) {
  let i = l.includes(".") ? hi(s, l) : () => s[l];
  if (Ve(e)) {
    const r = t[e];
    be(r) && Ue(i, r);
  } else if (be(e))
    Ue(i, e.bind(s));
  else if (Ae(e))
    if (pe(e))
      e.forEach((r) => yi(r, t, s, l));
    else {
      const r = be(e.handler) ? e.handler.bind(s) : t[e.handler];
      be(r) && Ue(i, r, e);
    }
}
function wi(e) {
  const t = e.type, { mixins: s, extends: l } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: c }
  } = e.appContext, u = r.get(t);
  let d;
  return u ? d = u : !i.length && !s && !l ? d = t : (d = {}, i.length && i.forEach(
    (p) => en(d, p, c, !0)
  ), en(d, t, c)), Ae(t) && r.set(t, d), d;
}
function en(e, t, s, l = !1) {
  const { mixins: i, extends: r } = t;
  r && en(e, r, s, !0), i && i.forEach(
    (c) => en(e, c, s, !0)
  );
  for (const c in t)
    if (!(l && c === "expose")) {
      const u = Cr[c] || s && s[c];
      e[c] = u ? u(e[c], t[c]) : t[c];
    }
  return e;
}
const Cr = {
  data: Ll,
  props: Ul,
  emits: Ul,
  // objects
  methods: ys,
  computed: ys,
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
  components: ys,
  directives: ys,
  // watch
  watch: Rr,
  // provide / inject
  provide: Ll,
  inject: xr
};
function Ll(e, t) {
  return t ? e ? function() {
    return We(
      be(e) ? e.call(this, this) : e,
      be(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function xr(e, t) {
  return ys(Wn(e), Wn(t));
}
function Wn(e) {
  if (pe(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ys(e, t) {
  return e ? We(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ul(e, t) {
  return e ? pe(e) && pe(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : We(
    /* @__PURE__ */ Object.create(null),
    Dl(e),
    Dl(t ?? {})
  ) : t;
}
function Rr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = We(/* @__PURE__ */ Object.create(null), e);
  for (const l in t)
    s[l] = Je(e[l], t[l]);
  return s;
}
function $i() {
  return {
    app: null,
    config: {
      isNativeTag: Oa,
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
let Er = 0;
function Ar(e, t) {
  return function(l, i = null) {
    be(l) || (l = We({}, l)), i != null && !Ae(i) && (i = null);
    const r = $i(), c = /* @__PURE__ */ new WeakSet(), u = [];
    let d = !1;
    const p = r.app = {
      _uid: Er++,
      _component: l,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: ic,
      get config() {
        return r.config;
      },
      set config(h) {
      },
      use(h, ...f) {
        return c.has(h) || (h && be(h.install) ? (c.add(h), h.install(p, ...f)) : be(h) && (c.add(h), h(p, ...f))), p;
      },
      mixin(h) {
        return r.mixins.includes(h) || r.mixins.push(h), p;
      },
      component(h, f) {
        return f ? (r.components[h] = f, p) : r.components[h];
      },
      directive(h, f) {
        return f ? (r.directives[h] = f, p) : r.directives[h];
      },
      mount(h, f, m) {
        if (!d) {
          const _ = p._ceVNode || X(l, i);
          return _.appContext = r, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(_, h, m), d = !0, p._container = h, h.__vue_app__ = p, mn(_.component);
        }
      },
      onUnmount(h) {
        u.push(h);
      },
      unmount() {
        d && (Rt(
          u,
          p._instance,
          16
        ), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(h, f) {
        return r.provides[h] = f, p;
      },
      runWithContext(h) {
        const f = es;
        es = p;
        try {
          return h();
        } finally {
          es = f;
        }
      }
    };
    return p;
  };
}
let es = null;
const Tr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ut(t)}Modifiers`] || e[`${zt(t)}Modifiers`];
function Pr(e, t, ...s) {
  if (e.isUnmounted) return;
  const l = e.vnode.props || Pe;
  let i = s;
  const r = t.startsWith("update:"), c = r && Tr(l, t.slice(7));
  c && (c.trim && (i = s.map((h) => Ve(h) ? h.trim() : h)), c.number && (i = s.map(rn)));
  let u, d = l[u = kn(t)] || // also try camelCase event handler (#2249)
  l[u = kn(ut(t))];
  !d && r && (d = l[u = kn(zt(t))]), d && Rt(
    d,
    e,
    6,
    i
  );
  const p = l[u + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, Rt(
      p,
      e,
      6,
      i
    );
  }
}
const Or = /* @__PURE__ */ new WeakMap();
function ki(e, t, s = !1) {
  const l = s ? Or : t.emitsCache, i = l.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let c = {}, u = !1;
  if (!be(e)) {
    const d = (p) => {
      const h = ki(p, t, !0);
      h && (u = !0, We(c, h));
    };
    !s && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !r && !u ? (Ae(e) && l.set(e, null), null) : (pe(r) ? r.forEach((d) => c[d] = null) : We(c, r), Ae(e) && l.set(e, c), c);
}
function _n(e, t) {
  return !e || !ln(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Re(e, t[0].toLowerCase() + t.slice(1)) || Re(e, zt(t)) || Re(e, t));
}
function Vl(e) {
  const {
    type: t,
    vnode: s,
    proxy: l,
    withProxy: i,
    propsOptions: [r],
    slots: c,
    attrs: u,
    emit: d,
    render: p,
    renderCache: h,
    props: f,
    data: m,
    setupState: _,
    ctx: D,
    inheritAttrs: E
  } = e, z = Xs(e);
  let O, P;
  try {
    if (s.shapeFlag & 4) {
      const H = i || l, U = H;
      O = kt(
        p.call(
          U,
          H,
          h,
          f,
          _,
          m,
          D
        )
      ), P = u;
    } else {
      const H = t;
      O = kt(
        H.length > 1 ? H(
          f,
          { attrs: u, slots: c, emit: d }
        ) : H(
          f,
          null
        )
      ), P = t.props ? u : Mr(u);
    }
  } catch (H) {
    xs.length = 0, fn(H, e, 1), O = X(Ut);
  }
  let B = O;
  if (P && E !== !1) {
    const H = Object.keys(P), { shapeFlag: U } = B;
    H.length && U & 7 && (r && H.some(sl) && (P = Ir(
      P,
      r
    )), B = ds(B, P, !1, !0));
  }
  return s.dirs && (B = ds(B, null, !1, !0), B.dirs = B.dirs ? B.dirs.concat(s.dirs) : s.dirs), s.transition && hl(B, s.transition), O = B, Xs(z), O;
}
const Mr = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || ln(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Ir = (e, t) => {
  const s = {};
  for (const l in e)
    (!sl(l) || !(l.slice(9) in t)) && (s[l] = e[l]);
  return s;
};
function Nr(e, t, s) {
  const { props: l, children: i, component: r } = e, { props: c, children: u, patchFlag: d } = t, p = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return l ? Bl(l, c, p) : !!c;
    if (d & 8) {
      const h = t.dynamicProps;
      for (let f = 0; f < h.length; f++) {
        const m = h[f];
        if (Si(c, l, m) && !_n(p, m))
          return !0;
      }
    }
  } else
    return (i || u) && (!u || !u.$stable) ? !0 : l === c ? !1 : l ? c ? Bl(l, c, p) : !0 : !!c;
  return !1;
}
function Bl(e, t, s) {
  const l = Object.keys(t);
  if (l.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < l.length; i++) {
    const r = l[i];
    if (Si(t, e, r) && !_n(s, r))
      return !0;
  }
  return !1;
}
function Si(e, t, s) {
  const l = e[s], i = t[s];
  return s === "style" && Ae(l) && Ae(i) ? !Kt(l, i) : l !== i;
}
function Dr({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const l = t.subTree;
    if (l.suspense && l.suspense.activeBranch === e && (l.el = e.el), l === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Ci = {}, xi = () => Object.create(Ci), Ri = (e) => Object.getPrototypeOf(e) === Ci;
function Fr(e, t, s, l = !1) {
  const i = {}, r = xi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ei(e, t, i, r);
  for (const c in e.propsOptions[0])
    c in i || (i[c] = void 0);
  s ? e.props = l ? i : /* @__PURE__ */ li(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Lr(e, t, s, l) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: c }
  } = e, u = /* @__PURE__ */ Ce(i), [d] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (l || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const h = e.vnode.dynamicProps;
      for (let f = 0; f < h.length; f++) {
        let m = h[f];
        if (_n(e.emitsOptions, m))
          continue;
        const _ = t[m];
        if (d)
          if (Re(r, m))
            _ !== r[m] && (r[m] = _, p = !0);
          else {
            const D = ut(m);
            i[D] = Kn(
              d,
              u,
              D,
              _,
              e,
              !1
            );
          }
        else
          _ !== r[m] && (r[m] = _, p = !0);
      }
    }
  } else {
    Ei(e, t, i, r) && (p = !0);
    let h;
    for (const f in u)
      (!t || // for camelCase
      !Re(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = zt(f)) === f || !Re(t, h))) && (d ? s && // for camelCase
      (s[f] !== void 0 || // for kebab-case
      s[h] !== void 0) && (i[f] = Kn(
        d,
        u,
        f,
        void 0,
        e,
        !0
      )) : delete i[f]);
    if (r !== u)
      for (const f in r)
        (!t || !Re(t, f)) && (delete r[f], p = !0);
  }
  p && Ot(e.attrs, "set", "");
}
function Ei(e, t, s, l) {
  const [i, r] = e.propsOptions;
  let c = !1, u;
  if (t)
    for (let d in t) {
      if (ws(d))
        continue;
      const p = t[d];
      let h;
      i && Re(i, h = ut(d)) ? !r || !r.includes(h) ? s[h] = p : (u || (u = {}))[h] = p : _n(e.emitsOptions, d) || (!(d in l) || p !== l[d]) && (l[d] = p, c = !0);
    }
  if (r) {
    const d = /* @__PURE__ */ Ce(s), p = u || Pe;
    for (let h = 0; h < r.length; h++) {
      const f = r[h];
      s[f] = Kn(
        i,
        d,
        f,
        p[f],
        e,
        !Re(p, f)
      );
    }
  }
  return c;
}
function Kn(e, t, s, l, i, r) {
  const c = e[s];
  if (c != null) {
    const u = Re(c, "default");
    if (u && l === void 0) {
      const d = c.default;
      if (c.type !== Function && !c.skipFactory && be(d)) {
        const { propsDefaults: p } = i;
        if (s in p)
          l = p[s];
        else {
          const h = Us(i);
          l = p[s] = d.call(
            null,
            t
          ), h();
        }
      } else
        l = d;
      i.ce && i.ce._setProp(s, l);
    }
    c[
      0
      /* shouldCast */
    ] && (r && !u ? l = !1 : c[
      1
      /* shouldCastTrue */
    ] && (l === "" || l === zt(s)) && (l = !0));
  }
  return l;
}
const Ur = /* @__PURE__ */ new WeakMap();
function Ai(e, t, s = !1) {
  const l = s ? Ur : t.propsCache, i = l.get(e);
  if (i)
    return i;
  const r = e.props, c = {}, u = [];
  let d = !1;
  if (!be(e)) {
    const h = (f) => {
      d = !0;
      const [m, _] = Ai(f, t, !0);
      We(c, m), _ && u.push(..._);
    };
    !s && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !d)
    return Ae(e) && l.set(e, is), is;
  if (pe(r))
    for (let h = 0; h < r.length; h++) {
      const f = ut(r[h]);
      Gl(f) && (c[f] = Pe);
    }
  else if (r)
    for (const h in r) {
      const f = ut(h);
      if (Gl(f)) {
        const m = r[h], _ = c[f] = pe(m) || be(m) ? { type: m } : We({}, m), D = _.type;
        let E = !1, z = !0;
        if (pe(D))
          for (let O = 0; O < D.length; ++O) {
            const P = D[O], B = be(P) && P.name;
            if (B === "Boolean") {
              E = !0;
              break;
            } else B === "String" && (z = !1);
          }
        else
          E = be(D) && D.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = E, _[
          1
          /* shouldCastTrue */
        ] = z, (E || Re(_, "default")) && u.push(f);
      }
    }
  const p = [c, u];
  return Ae(e) && l.set(e, p), p;
}
function Gl(e) {
  return e[0] !== "$" && !ws(e);
}
const _l = (e) => e === "_" || e === "_ctx" || e === "$stable", gl = (e) => pe(e) ? e.map(kt) : [kt(e)], Vr = (e, t, s) => {
  if (t._n)
    return t;
  const l = oe((...i) => gl(t(...i)), s);
  return l._c = !1, l;
}, Ti = (e, t, s) => {
  const l = e._ctx;
  for (const i in e) {
    if (_l(i)) continue;
    const r = e[i];
    if (be(r))
      t[i] = Vr(i, r, l);
    else if (r != null) {
      const c = gl(r);
      t[i] = () => c;
    }
  }
}, Pi = (e, t) => {
  const s = gl(t);
  e.slots.default = () => s;
}, Oi = (e, t, s) => {
  for (const l in t)
    (s || !_l(l)) && (e[l] = t[l]);
}, Br = (e, t, s) => {
  const l = e.slots = xi();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Oi(l, t, s), s && Fa(l, "_", i, !0)) : Ti(t, l);
  } else t && Pi(e, t);
}, Gr = (e, t, s) => {
  const { vnode: l, slots: i } = e;
  let r = !0, c = Pe;
  if (l.shapeFlag & 32) {
    const u = t._;
    u ? s && u === 1 ? r = !1 : Oi(i, t, s) : (r = !t.$stable, Ti(t, i)), c = t;
  } else t && (Pi(e, t), c = { default: 1 });
  if (r)
    for (const u in i)
      !_l(u) && c[u] == null && delete i[u];
}, st = zr;
function Hr(e) {
  return Wr(e);
}
function Wr(e, t) {
  const s = cn();
  s.__VUE__ = !0;
  const {
    insert: l,
    remove: i,
    patchProp: r,
    createElement: c,
    createText: u,
    createComment: d,
    setText: p,
    setElementText: h,
    parentNode: f,
    nextSibling: m,
    setScopeId: _ = Ct,
    insertStaticContent: D
  } = e, E = (g, b, k, N = null, V = null, F = null, Y = void 0, q = null, j = !!b.dynamicChildren) => {
    if (g === b)
      return;
    g && !bs(g, b) && (N = I(g), K(g, V, F, !0), g = null), b.patchFlag === -2 && (j = !1, b.dynamicChildren = null);
    const { type: G, ref: de, shapeFlag: te } = b;
    switch (G) {
      case gn:
        z(g, b, k, N);
        break;
      case Ut:
        O(g, b, k, N);
        break;
      case Tn:
        g == null && P(b, k, N, Y);
        break;
      case J:
        _e(
          g,
          b,
          k,
          N,
          V,
          F,
          Y,
          q,
          j
        );
        break;
      default:
        te & 1 ? U(
          g,
          b,
          k,
          N,
          V,
          F,
          Y,
          q,
          j
        ) : te & 6 ? ye(
          g,
          b,
          k,
          N,
          V,
          F,
          Y,
          q,
          j
        ) : (te & 64 || te & 128) && G.process(
          g,
          b,
          k,
          N,
          V,
          F,
          Y,
          q,
          j,
          ce
        );
    }
    de != null && V ? Ss(de, g && g.ref, F, b || g, !b) : de == null && g && g.ref != null && Ss(g.ref, null, F, g, !0);
  }, z = (g, b, k, N) => {
    if (g == null)
      l(
        b.el = u(b.children),
        k,
        N
      );
    else {
      const V = b.el = g.el;
      b.children !== g.children && p(V, b.children);
    }
  }, O = (g, b, k, N) => {
    g == null ? l(
      b.el = d(b.children || ""),
      k,
      N
    ) : b.el = g.el;
  }, P = (g, b, k, N) => {
    [g.el, g.anchor] = D(
      g.children,
      b,
      k,
      N,
      g.el,
      g.anchor
    );
  }, B = ({ el: g, anchor: b }, k, N) => {
    let V;
    for (; g && g !== b; )
      V = m(g), l(g, k, N), g = V;
    l(b, k, N);
  }, H = ({ el: g, anchor: b }) => {
    let k;
    for (; g && g !== b; )
      k = m(g), i(g), g = k;
    i(b);
  }, U = (g, b, k, N, V, F, Y, q, j) => {
    if (b.type === "svg" ? Y = "svg" : b.type === "math" && (Y = "mathml"), g == null)
      T(
        b,
        k,
        N,
        V,
        F,
        Y,
        q,
        j
      );
    else {
      const G = g.el && g.el._isVueCE ? g.el : null;
      try {
        G && G._beginPatch(), R(
          g,
          b,
          V,
          F,
          Y,
          q,
          j
        );
      } finally {
        G && G._endPatch();
      }
    }
  }, T = (g, b, k, N, V, F, Y, q) => {
    let j, G;
    const { props: de, shapeFlag: te, transition: C, dirs: L } = g;
    if (j = g.el = c(
      g.type,
      F,
      de && de.is,
      de
    ), te & 8 ? h(j, g.children) : te & 16 && S(
      g.children,
      j,
      null,
      N,
      V,
      An(g, F),
      Y,
      q
    ), L && Jt(g, null, N, "created"), w(j, g, g.scopeId, Y, N), de) {
      for (const se in de)
        se !== "value" && !ws(se) && r(j, se, null, de[se], F, N);
      "value" in de && r(j, "value", null, de.value, F), (G = de.onVnodeBeforeMount) && yt(G, N, g);
    }
    L && Jt(g, null, N, "beforeMount");
    const x = Kr(V, C);
    x && C.beforeEnter(j), l(j, b, k), ((G = de && de.onVnodeMounted) || x || L) && st(() => {
      G && yt(G, N, g), x && C.enter(j), L && Jt(g, null, N, "mounted");
    }, V);
  }, w = (g, b, k, N, V) => {
    if (k && _(g, k), N)
      for (let F = 0; F < N.length; F++)
        _(g, N[F]);
    if (V) {
      let F = V.subTree;
      if (b === F || Di(F.type) && (F.ssContent === b || F.ssFallback === b)) {
        const Y = V.vnode;
        w(
          g,
          Y,
          Y.scopeId,
          Y.slotScopeIds,
          V.parent
        );
      }
    }
  }, S = (g, b, k, N, V, F, Y, q, j = 0) => {
    for (let G = j; G < g.length; G++) {
      const de = g[G] = q ? Pt(g[G]) : kt(g[G]);
      E(
        null,
        de,
        b,
        k,
        N,
        V,
        F,
        Y,
        q
      );
    }
  }, R = (g, b, k, N, V, F, Y) => {
    const q = b.el = g.el;
    let { patchFlag: j, dynamicChildren: G, dirs: de } = b;
    j |= g.patchFlag & 16;
    const te = g.props || Pe, C = b.props || Pe;
    let L;
    if (k && Qt(k, !1), (L = C.onVnodeBeforeUpdate) && yt(L, k, b, g), de && Jt(b, g, k, "beforeUpdate"), k && Qt(k, !0), (te.innerHTML && C.innerHTML == null || te.textContent && C.textContent == null) && h(q, ""), G ? Z(
      g.dynamicChildren,
      G,
      q,
      k,
      N,
      An(b, V),
      F
    ) : Y || A(
      g,
      b,
      q,
      null,
      k,
      N,
      An(b, V),
      F,
      !1
    ), j > 0) {
      if (j & 16)
        ie(q, te, C, k, V);
      else if (j & 2 && te.class !== C.class && r(q, "class", null, C.class, V), j & 4 && r(q, "style", te.style, C.style, V), j & 8) {
        const x = b.dynamicProps;
        for (let se = 0; se < x.length; se++) {
          const ge = x[se], qe = te[ge], tt = C[ge];
          (tt !== qe || ge === "value") && r(q, ge, qe, tt, V, k);
        }
      }
      j & 1 && g.children !== b.children && h(q, b.children);
    } else !Y && G == null && ie(q, te, C, k, V);
    ((L = C.onVnodeUpdated) || de) && st(() => {
      L && yt(L, k, b, g), de && Jt(b, g, k, "updated");
    }, N);
  }, Z = (g, b, k, N, V, F, Y) => {
    for (let q = 0; q < b.length; q++) {
      const j = g[q], G = b[q], de = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        j.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (j.type === J || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !bs(j, G) || // - In the case of a component, it could contain anything.
        j.shapeFlag & 198) ? f(j.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          k
        )
      );
      E(
        j,
        G,
        de,
        null,
        N,
        V,
        F,
        Y,
        !0
      );
    }
  }, ie = (g, b, k, N, V) => {
    if (b !== k) {
      if (b !== Pe)
        for (const F in b)
          !ws(F) && !(F in k) && r(
            g,
            F,
            b[F],
            null,
            V,
            N
          );
      for (const F in k) {
        if (ws(F)) continue;
        const Y = k[F], q = b[F];
        Y !== q && F !== "value" && r(g, F, q, Y, V, N);
      }
      "value" in k && r(g, "value", b.value, k.value, V);
    }
  }, _e = (g, b, k, N, V, F, Y, q, j) => {
    const G = b.el = g ? g.el : u(""), de = b.anchor = g ? g.anchor : u("");
    let { patchFlag: te, dynamicChildren: C, slotScopeIds: L } = b;
    L && (q = q ? q.concat(L) : L), g == null ? (l(G, k, N), l(de, k, N), S(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      b.children || [],
      k,
      de,
      V,
      F,
      Y,
      q,
      j
    )) : te > 0 && te & 64 && C && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    g.dynamicChildren && g.dynamicChildren.length === C.length ? (Z(
      g.dynamicChildren,
      C,
      k,
      V,
      F,
      Y,
      q
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (b.key != null || V && b === V.subTree) && Mi(
      g,
      b,
      !0
      /* shallow */
    )) : A(
      g,
      b,
      k,
      de,
      V,
      F,
      Y,
      q,
      j
    );
  }, ye = (g, b, k, N, V, F, Y, q, j) => {
    b.slotScopeIds = q, g == null ? b.shapeFlag & 512 ? V.ctx.activate(
      b,
      k,
      N,
      Y,
      j
    ) : Ie(
      b,
      k,
      N,
      V,
      F,
      Y,
      j
    ) : Te(g, b, j);
  }, Ie = (g, b, k, N, V, F, Y) => {
    const q = g.component = ec(
      g,
      N,
      V
    );
    if (gi(g) && (q.ctx.renderer = ce), tc(q, !1, Y), q.asyncDep) {
      if (V && V.registerDep(q, M, Y), !g.el) {
        const j = q.subTree = X(Ut);
        O(null, j, b, k), g.placeholder = j.el;
      }
    } else
      M(
        q,
        g,
        b,
        k,
        V,
        F,
        Y
      );
  }, Te = (g, b, k) => {
    const N = b.component = g.component;
    if (Nr(g, b, k))
      if (N.asyncDep && !N.asyncResolved) {
        $(N, b, k);
        return;
      } else
        N.next = b, N.update();
    else
      b.el = g.el, N.vnode = b;
  }, M = (g, b, k, N, V, F, Y) => {
    const q = () => {
      if (g.isMounted) {
        let { next: te, bu: C, u: L, parent: x, vnode: se } = g;
        {
          const bt = Ii(g);
          if (bt) {
            te && (te.el = se.el, $(g, te, Y)), bt.asyncDep.then(() => {
              st(() => {
                g.isUnmounted || G();
              }, V);
            });
            return;
          }
        }
        let ge = te, qe;
        Qt(g, !1), te ? (te.el = se.el, $(g, te, Y)) : te = se, C && Ks(C), (qe = te.props && te.props.onVnodeBeforeUpdate) && yt(qe, x, te, se), Qt(g, !0);
        const tt = Vl(g), mt = g.subTree;
        g.subTree = tt, E(
          mt,
          tt,
          // parent may have changed if it's in a teleport
          f(mt.el),
          // anchor may have changed if it's in a fragment
          I(mt),
          g,
          V,
          F
        ), te.el = tt.el, ge === null && Dr(g, tt.el), L && st(L, V), (qe = te.props && te.props.onVnodeUpdated) && st(
          () => yt(qe, x, te, se),
          V
        );
      } else {
        let te;
        const { el: C, props: L } = b, { bm: x, m: se, parent: ge, root: qe, type: tt } = g, mt = cs(b);
        Qt(g, !1), x && Ks(x), !mt && (te = L && L.onVnodeBeforeMount) && yt(te, ge, b), Qt(g, !0);
        {
          qe.ce && qe.ce._hasShadowRoot() && qe.ce._injectChildStyle(
            tt,
            g.parent ? g.parent.type : void 0
          );
          const bt = g.subTree = Vl(g);
          E(
            null,
            bt,
            k,
            N,
            g,
            V,
            F
          ), b.el = bt.el;
        }
        if (se && st(se, V), !mt && (te = L && L.onVnodeMounted)) {
          const bt = b;
          st(
            () => yt(te, ge, bt),
            V
          );
        }
        (b.shapeFlag & 256 || ge && cs(ge.vnode) && ge.vnode.shapeFlag & 256) && g.a && st(g.a, V), g.isMounted = !0, b = k = N = null;
      }
    };
    g.scope.on();
    const j = g.effect = new Wa(q);
    g.scope.off();
    const G = g.update = j.run.bind(j), de = g.job = j.runIfDirty.bind(j);
    de.i = g, de.id = g.uid, j.scheduler = () => pl(de), Qt(g, !0), G();
  }, $ = (g, b, k) => {
    b.component = g;
    const N = g.vnode.props;
    g.vnode = b, g.next = null, Lr(g, b.props, N, k), Gr(g, b.children, k), Nt(), Ol(g), Dt();
  }, A = (g, b, k, N, V, F, Y, q, j = !1) => {
    const G = g && g.children, de = g ? g.shapeFlag : 0, te = b.children, { patchFlag: C, shapeFlag: L } = b;
    if (C > 0) {
      if (C & 128) {
        ue(
          G,
          te,
          k,
          N,
          V,
          F,
          Y,
          q,
          j
        );
        return;
      } else if (C & 256) {
        me(
          G,
          te,
          k,
          N,
          V,
          F,
          Y,
          q,
          j
        );
        return;
      }
    }
    L & 8 ? (de & 16 && He(G, V, F), te !== G && h(k, te)) : de & 16 ? L & 16 ? ue(
      G,
      te,
      k,
      N,
      V,
      F,
      Y,
      q,
      j
    ) : He(G, V, F, !0) : (de & 8 && h(k, ""), L & 16 && S(
      te,
      k,
      N,
      V,
      F,
      Y,
      q,
      j
    ));
  }, me = (g, b, k, N, V, F, Y, q, j) => {
    g = g || is, b = b || is;
    const G = g.length, de = b.length, te = Math.min(G, de);
    let C;
    for (C = 0; C < te; C++) {
      const L = b[C] = j ? Pt(b[C]) : kt(b[C]);
      E(
        g[C],
        L,
        k,
        null,
        V,
        F,
        Y,
        q,
        j
      );
    }
    G > de ? He(
      g,
      V,
      F,
      !0,
      !1,
      te
    ) : S(
      b,
      k,
      N,
      V,
      F,
      Y,
      q,
      j,
      te
    );
  }, ue = (g, b, k, N, V, F, Y, q, j) => {
    let G = 0;
    const de = b.length;
    let te = g.length - 1, C = de - 1;
    for (; G <= te && G <= C; ) {
      const L = g[G], x = b[G] = j ? Pt(b[G]) : kt(b[G]);
      if (bs(L, x))
        E(
          L,
          x,
          k,
          null,
          V,
          F,
          Y,
          q,
          j
        );
      else
        break;
      G++;
    }
    for (; G <= te && G <= C; ) {
      const L = g[te], x = b[C] = j ? Pt(b[C]) : kt(b[C]);
      if (bs(L, x))
        E(
          L,
          x,
          k,
          null,
          V,
          F,
          Y,
          q,
          j
        );
      else
        break;
      te--, C--;
    }
    if (G > te) {
      if (G <= C) {
        const L = C + 1, x = L < de ? b[L].el : N;
        for (; G <= C; )
          E(
            null,
            b[G] = j ? Pt(b[G]) : kt(b[G]),
            k,
            x,
            V,
            F,
            Y,
            q,
            j
          ), G++;
      }
    } else if (G > C)
      for (; G <= te; )
        K(g[G], V, F, !0), G++;
    else {
      const L = G, x = G, se = /* @__PURE__ */ new Map();
      for (G = x; G <= C; G++) {
        const lt = b[G] = j ? Pt(b[G]) : kt(b[G]);
        lt.key != null && se.set(lt.key, G);
      }
      let ge, qe = 0;
      const tt = C - x + 1;
      let mt = !1, bt = 0;
      const gs = new Array(tt);
      for (G = 0; G < tt; G++) gs[G] = 0;
      for (G = L; G <= te; G++) {
        const lt = g[G];
        if (qe >= tt) {
          K(lt, V, F, !0);
          continue;
        }
        let vt;
        if (lt.key != null)
          vt = se.get(lt.key);
        else
          for (ge = x; ge <= C; ge++)
            if (gs[ge - x] === 0 && bs(lt, b[ge])) {
              vt = ge;
              break;
            }
        vt === void 0 ? K(lt, V, F, !0) : (gs[vt - x] = G + 1, vt >= bt ? bt = vt : mt = !0, E(
          lt,
          b[vt],
          k,
          null,
          V,
          F,
          Y,
          q,
          j
        ), qe++);
      }
      const Cl = mt ? jr(gs) : is;
      for (ge = Cl.length - 1, G = tt - 1; G >= 0; G--) {
        const lt = x + G, vt = b[lt], xl = b[lt + 1], Rl = lt + 1 < de ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          xl.el || Ni(xl)
        ) : N;
        gs[G] === 0 ? E(
          null,
          vt,
          k,
          Rl,
          V,
          F,
          Y,
          q,
          j
        ) : mt && (ge < 0 || G !== Cl[ge] ? W(vt, k, Rl, 2) : ge--);
      }
    }
  }, W = (g, b, k, N, V = null) => {
    const { el: F, type: Y, transition: q, children: j, shapeFlag: G } = g;
    if (G & 6) {
      W(g.component.subTree, b, k, N);
      return;
    }
    if (G & 128) {
      g.suspense.move(b, k, N);
      return;
    }
    if (G & 64) {
      Y.move(g, b, k, ce);
      return;
    }
    if (Y === J) {
      l(F, b, k);
      for (let te = 0; te < j.length; te++)
        W(j[te], b, k, N);
      l(g.anchor, b, k);
      return;
    }
    if (Y === Tn) {
      B(g, b, k);
      return;
    }
    if (N !== 2 && G & 1 && q)
      if (N === 0)
        q.beforeEnter(F), l(F, b, k), st(() => q.enter(F), V);
      else {
        const { leave: te, delayLeave: C, afterLeave: L } = q, x = () => {
          g.ctx.isUnmounted ? i(F) : l(F, b, k);
        }, se = () => {
          F._isLeaving && F[cr](
            !0
            /* cancelled */
          ), te(F, () => {
            x(), L && L();
          });
        };
        C ? C(F, x, se) : se();
      }
    else
      l(F, b, k);
  }, K = (g, b, k, N = !1, V = !1) => {
    const {
      type: F,
      props: Y,
      ref: q,
      children: j,
      dynamicChildren: G,
      shapeFlag: de,
      patchFlag: te,
      dirs: C,
      cacheIndex: L
    } = g;
    if (te === -2 && (V = !1), q != null && (Nt(), Ss(q, null, k, g, !0), Dt()), L != null && (b.renderCache[L] = void 0), de & 256) {
      b.ctx.deactivate(g);
      return;
    }
    const x = de & 1 && C, se = !cs(g);
    let ge;
    if (se && (ge = Y && Y.onVnodeBeforeUnmount) && yt(ge, b, g), de & 6)
      Be(g.component, k, N);
    else {
      if (de & 128) {
        g.suspense.unmount(k, N);
        return;
      }
      x && Jt(g, null, b, "beforeUnmount"), de & 64 ? g.type.remove(
        g,
        b,
        k,
        ce,
        N
      ) : G && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !G.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (F !== J || te > 0 && te & 64) ? He(
        G,
        b,
        k,
        !1,
        !0
      ) : (F === J && te & 384 || !V && de & 16) && He(j, b, k), N && ne(g);
    }
    (se && (ge = Y && Y.onVnodeUnmounted) || x) && st(() => {
      ge && yt(ge, b, g), x && Jt(g, null, b, "unmounted");
    }, k);
  }, ne = (g) => {
    const { type: b, el: k, anchor: N, transition: V } = g;
    if (b === J) {
      ke(k, N);
      return;
    }
    if (b === Tn) {
      H(g);
      return;
    }
    const F = () => {
      i(k), V && !V.persisted && V.afterLeave && V.afterLeave();
    };
    if (g.shapeFlag & 1 && V && !V.persisted) {
      const { leave: Y, delayLeave: q } = V, j = () => Y(k, F);
      q ? q(g.el, F, j) : j();
    } else
      F();
  }, ke = (g, b) => {
    let k;
    for (; g !== b; )
      k = m(g), i(g), g = k;
    i(b);
  }, Be = (g, b, k) => {
    const { bum: N, scope: V, job: F, subTree: Y, um: q, m: j, a: G } = g;
    Hl(j), Hl(G), N && Ks(N), V.stop(), F && (F.flags |= 8, K(Y, g, b, k)), q && st(q, b), st(() => {
      g.isUnmounted = !0;
    }, b);
  }, He = (g, b, k, N = !1, V = !1, F = 0) => {
    for (let Y = F; Y < g.length; Y++)
      K(g[Y], b, k, N, V);
  }, I = (g) => {
    if (g.shapeFlag & 6)
      return I(g.component.subTree);
    if (g.shapeFlag & 128)
      return g.suspense.next();
    const b = m(g.anchor || g.el), k = b && b[or];
    return k ? m(k) : b;
  };
  let le = !1;
  const ee = (g, b, k) => {
    let N;
    g == null ? b._vnode && (K(b._vnode, null, null, !0), N = b._vnode.component) : E(
      b._vnode || null,
      g,
      b,
      null,
      null,
      null,
      k
    ), b._vnode = g, le || (le = !0, Ol(N), ui(), le = !1);
  }, ce = {
    p: E,
    um: K,
    m: W,
    r: ne,
    mt: Ie,
    mc: S,
    pc: A,
    pbc: Z,
    n: I,
    o: e
  };
  return {
    render: ee,
    hydrate: void 0,
    createApp: Ar(ee)
  };
}
function An({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Qt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Kr(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Mi(e, t, s = !1) {
  const l = e.children, i = t.children;
  if (pe(l) && pe(i))
    for (let r = 0; r < l.length; r++) {
      const c = l[r];
      let u = i[r];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = i[r] = Pt(i[r]), u.el = c.el), !s && u.patchFlag !== -2 && Mi(c, u)), u.type === gn && (u.patchFlag === -1 && (u = i[r] = Pt(u)), u.el = c.el), u.type === Ut && !u.el && (u.el = c.el);
    }
}
function jr(e) {
  const t = e.slice(), s = [0];
  let l, i, r, c, u;
  const d = e.length;
  for (l = 0; l < d; l++) {
    const p = e[l];
    if (p !== 0) {
      if (i = s[s.length - 1], e[i] < p) {
        t[l] = i, s.push(l);
        continue;
      }
      for (r = 0, c = s.length - 1; r < c; )
        u = r + c >> 1, e[s[u]] < p ? r = u + 1 : c = u;
      p < e[s[r]] && (r > 0 && (t[l] = s[r - 1]), s[r] = l);
    }
  }
  for (r = s.length, c = s[r - 1]; r-- > 0; )
    s[r] = c, c = t[c];
  return s;
}
function Ii(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ii(t);
}
function Hl(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ni(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ni(t.subTree) : null;
}
const Di = (e) => e.__isSuspense;
function zr(e, t) {
  t && t.pendingBranch ? pe(e) ? t.effects.push(...e) : t.effects.push(e) : sr(e);
}
const J = /* @__PURE__ */ Symbol.for("v-fgt"), gn = /* @__PURE__ */ Symbol.for("v-txt"), Ut = /* @__PURE__ */ Symbol.for("v-cmt"), Tn = /* @__PURE__ */ Symbol.for("v-stc"), xs = [];
let at = null;
function v(e = !1) {
  xs.push(at = e ? null : []);
}
function qr() {
  xs.pop(), at = xs[xs.length - 1] || null;
}
let Ms = 1;
function tn(e, t = !1) {
  Ms += e, e < 0 && at && t && (at.hasOnce = !0);
}
function Fi(e) {
  return e.dynamicChildren = Ms > 0 ? at || is : null, qr(), Ms > 0 && at && at.push(e), e;
}
function y(e, t, s, l, i, r) {
  return Fi(
    n(
      e,
      t,
      s,
      l,
      i,
      r,
      !0
    )
  );
}
function ht(e, t, s, l, i) {
  return Fi(
    X(
      e,
      t,
      s,
      l,
      i,
      !0
    )
  );
}
function Is(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function bs(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Li = ({ key: e }) => e ?? null, zs = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? Ve(e) || /* @__PURE__ */ Me(e) || be(e) ? { i: ze, r: e, k: t, f: !!s } : e : null);
function n(e, t = null, s = null, l = 0, i = null, r = e === J ? 0 : 1, c = !1, u = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Li(t),
    ref: t && zs(t),
    scopeId: fi,
    slotScopeIds: null,
    children: s,
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
    ctx: ze
  };
  return u ? (bl(d, s), r & 128 && e.normalize(d)) : s && (d.shapeFlag |= Ve(s) ? 8 : 16), Ms > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  at && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && at.push(d), d;
}
const X = Jr;
function Jr(e, t = null, s = null, l = 0, i = null, r = !1) {
  if ((!e || e === wr) && (e = Ut), Is(e)) {
    const u = ds(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && bl(u, s), Ms > 0 && !r && at && (u.shapeFlag & 6 ? at[at.indexOf(e)] = u : at.push(u)), u.patchFlag = -2, u;
  }
  if (ac(e) && (e = e.__vccOpts), t) {
    t = Qr(t);
    let { class: u, style: d } = t;
    u && !Ve(u) && (t.class = he(u)), Ae(d) && (/* @__PURE__ */ dn(d) && !pe(d) && (d = We({}, d)), t.style = ll(d));
  }
  const c = Ve(e) ? 1 : Di(e) ? 128 : rr(e) ? 64 : Ae(e) ? 4 : be(e) ? 2 : 0;
  return n(
    e,
    t,
    s,
    l,
    i,
    c,
    r,
    !0
  );
}
function Qr(e) {
  return e ? /* @__PURE__ */ dn(e) || Ri(e) ? We({}, e) : e : null;
}
function ds(e, t, s = !1, l = !1) {
  const { props: i, ref: r, patchFlag: c, children: u, transition: d } = e, p = t ? Yr(i || {}, t) : i, h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && Li(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? pe(r) ? r.concat(zs(t)) : [r, zs(t)] : zs(t)
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
    patchFlag: t && e.type !== J ? c === -1 ? 16 : c | 16 : c,
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
    ssContent: e.ssContent && ds(e.ssContent),
    ssFallback: e.ssFallback && ds(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return d && l && hl(
    h,
    d.clone(h)
  ), h;
}
function ml(e = " ", t = 0) {
  return X(gn, null, e, t);
}
function we(e = "", t = !1) {
  return t ? (v(), ht(Ut, null, e)) : X(Ut, null, e);
}
function kt(e) {
  return e == null || typeof e == "boolean" ? X(Ut) : pe(e) ? X(
    J,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Is(e) ? Pt(e) : X(gn, null, String(e));
}
function Pt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ds(e);
}
function bl(e, t) {
  let s = 0;
  const { shapeFlag: l } = e;
  if (t == null)
    t = null;
  else if (pe(t))
    s = 16;
  else if (typeof t == "object")
    if (l & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), bl(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !Ri(t) ? t._ctx = ze : i === 3 && ze && (ze.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else be(t) ? (t = { default: t, _ctx: ze }, s = 32) : (t = String(t), l & 64 ? (s = 16, t = [ml(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Yr(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    for (const i in l)
      if (i === "class")
        t.class !== l.class && (t.class = he([t.class, l.class]));
      else if (i === "style")
        t.style = ll([t.style, l.style]);
      else if (ln(i)) {
        const r = t[i], c = l[i];
        c && r !== c && !(pe(r) && r.includes(c)) && (t[i] = r ? [].concat(r, c) : c);
      } else i !== "" && (t[i] = l[i]);
  }
  return t;
}
function yt(e, t, s, l = null) {
  Rt(e, t, 7, [
    s,
    l
  ]);
}
const Xr = $i();
let Zr = 0;
function ec(e, t, s) {
  const l = e.type, i = (t ? t.appContext : e.appContext) || Xr, r = {
    uid: Zr++,
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
    scope: new Ba(
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
    propsOptions: Ai(l, i),
    emitsOptions: ki(l, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Pe,
    // inheritAttrs
    inheritAttrs: l.inheritAttrs,
    // state
    ctx: Pe,
    data: Pe,
    props: Pe,
    attrs: Pe,
    slots: Pe,
    refs: Pe,
    setupState: Pe,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Pr.bind(null, r), e.ce && e.ce(r), r;
}
let Xe = null;
const Ui = () => Xe || ze;
let sn, jn;
{
  const e = cn(), t = (s, l) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(l), (r) => {
      i.length > 1 ? i.forEach((c) => c(r)) : i[0](r);
    };
  };
  sn = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Xe = s
  ), jn = t(
    "__VUE_SSR_SETTERS__",
    (s) => Ns = s
  );
}
const Us = (e) => {
  const t = Xe;
  return sn(e), e.scope.on(), () => {
    e.scope.off(), sn(t);
  };
}, Wl = () => {
  Xe && Xe.scope.off(), sn(null);
};
function Vi(e) {
  return e.vnode.shapeFlag & 4;
}
let Ns = !1;
function tc(e, t = !1, s = !1) {
  t && jn(t);
  const { props: l, children: i } = e.vnode, r = Vi(e);
  Fr(e, l, r, t), Br(e, i, s || t);
  const c = r ? sc(e, t) : void 0;
  return t && jn(!1), c;
}
function sc(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, $r);
  const { setup: l } = s;
  if (l) {
    Nt();
    const i = e.setupContext = l.length > 1 ? lc(e) : null, r = Us(e), c = Ls(
      l,
      e,
      0,
      [
        e.props,
        i
      ]
    ), u = Ma(c);
    if (Dt(), r(), (u || e.sp) && !cs(e) && _i(e), u) {
      if (c.then(Wl, Wl), t)
        return c.then((d) => {
          Kl(e, d);
        }).catch((d) => {
          fn(d, e, 0);
        });
      e.asyncDep = c;
    } else
      Kl(e, c);
  } else
    Bi(e);
}
function Kl(e, t, s) {
  be(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ae(t) && (e.setupState = ii(t)), Bi(e);
}
function Bi(e, t, s) {
  const l = e.type;
  e.render || (e.render = l.render || Ct);
  {
    const i = Us(e);
    Nt();
    try {
      kr(e);
    } finally {
      Dt(), i();
    }
  }
}
const nc = {
  get(e, t) {
    return je(e, "get", ""), e[t];
  }
};
function lc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, nc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function mn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ii(fl(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Cs)
        return Cs[s](e);
    },
    has(t, s) {
      return s in t || s in Cs;
    }
  })) : e.proxy;
}
function ac(e) {
  return be(e) && "__vccOpts" in e;
}
const ae = (e, t) => /* @__PURE__ */ Yo(e, t, Ns);
function Gi(e, t, s) {
  try {
    tn(-1);
    const l = arguments.length;
    return l === 2 ? Ae(t) && !pe(t) ? Is(t) ? X(e, null, [t]) : X(e, t) : X(e, null, t) : (l > 3 ? s = Array.prototype.slice.call(arguments, 2) : l === 3 && Is(s) && (s = [s]), X(e, t, s));
  } finally {
    tn(1);
  }
}
const ic = "3.5.30";
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let zn;
const jl = typeof window < "u" && window.trustedTypes;
if (jl)
  try {
    zn = /* @__PURE__ */ jl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Hi = zn ? (e) => zn.createHTML(e) : (e) => e, oc = "http://www.w3.org/2000/svg", rc = "http://www.w3.org/1998/Math/MathML", Tt = typeof document < "u" ? document : null, zl = Tt && /* @__PURE__ */ Tt.createElement("template"), cc = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, l) => {
    const i = t === "svg" ? Tt.createElementNS(oc, e) : t === "mathml" ? Tt.createElementNS(rc, e) : s ? Tt.createElement(e, { is: s }) : Tt.createElement(e);
    return e === "select" && l && l.multiple != null && i.setAttribute("multiple", l.multiple), i;
  },
  createText: (e) => Tt.createTextNode(e),
  createComment: (e) => Tt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Tt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, l, i, r) {
    const c = s ? s.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      zl.innerHTML = Hi(
        l === "svg" ? `<svg>${e}</svg>` : l === "mathml" ? `<math>${e}</math>` : e
      );
      const u = zl.content;
      if (l === "svg" || l === "mathml") {
        const d = u.firstChild;
        for (; d.firstChild; )
          u.appendChild(d.firstChild);
        u.removeChild(d);
      }
      t.insertBefore(u, s);
    }
    return [
      // first
      c ? c.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, uc = /* @__PURE__ */ Symbol("_vtc");
function dc(e, t, s) {
  const l = e[uc];
  l && (t = (t ? [t, ...l] : [...l]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const ql = /* @__PURE__ */ Symbol("_vod"), fc = /* @__PURE__ */ Symbol("_vsh"), pc = /* @__PURE__ */ Symbol(""), hc = /(?:^|;)\s*display\s*:/;
function _c(e, t, s) {
  const l = e.style, i = Ve(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (Ve(t))
        for (const c of t.split(";")) {
          const u = c.slice(0, c.indexOf(":")).trim();
          s[u] == null && qs(l, u, "");
        }
      else
        for (const c in t)
          s[c] == null && qs(l, c, "");
    for (const c in s)
      c === "display" && (r = !0), qs(l, c, s[c]);
  } else if (i) {
    if (t !== s) {
      const c = l[pc];
      c && (s += ";" + c), l.cssText = s, r = hc.test(s);
    }
  } else t && e.removeAttribute("style");
  ql in e && (e[ql] = r ? l.display : "", e[fc] && (l.display = "none"));
}
const Jl = /\s*!important$/;
function qs(e, t, s) {
  if (pe(s))
    s.forEach((l) => qs(e, t, l));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const l = gc(e, t);
    Jl.test(s) ? e.setProperty(
      zt(l),
      s.replace(Jl, ""),
      "important"
    ) : e[l] = s;
  }
}
const Ql = ["Webkit", "Moz", "ms"], Pn = {};
function gc(e, t) {
  const s = Pn[t];
  if (s)
    return s;
  let l = ut(t);
  if (l !== "filter" && l in e)
    return Pn[t] = l;
  l = Da(l);
  for (let i = 0; i < Ql.length; i++) {
    const r = Ql[i] + l;
    if (r in e)
      return Pn[t] = r;
  }
  return t;
}
const Yl = "http://www.w3.org/1999/xlink";
function Xl(e, t, s, l, i, r = wo(t)) {
  l && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Yl, t.slice(6, t.length)) : e.setAttributeNS(Yl, t, s) : s == null || r && !La(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : ft(s) ? String(s) : s
  );
}
function Zl(e, t, s, l, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Hi(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const u = r === "OPTION" ? e.getAttribute("value") || "" : e.value, d = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (u !== d || !("_value" in e)) && (e.value = d), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let c = !1;
  if (s === "" || s == null) {
    const u = typeof e[t];
    u === "boolean" ? s = La(s) : s == null && u === "string" ? (s = "", c = !0) : u === "number" && (s = 0, c = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  c && e.removeAttribute(i || t);
}
function It(e, t, s, l) {
  e.addEventListener(t, s, l);
}
function mc(e, t, s, l) {
  e.removeEventListener(t, s, l);
}
const ea = /* @__PURE__ */ Symbol("_vei");
function bc(e, t, s, l, i = null) {
  const r = e[ea] || (e[ea] = {}), c = r[t];
  if (l && c)
    c.value = l;
  else {
    const [u, d] = vc(t);
    if (l) {
      const p = r[t] = $c(
        l,
        i
      );
      It(e, u, p, d);
    } else c && (mc(e, u, c, d), r[t] = void 0);
  }
}
const ta = /(?:Once|Passive|Capture)$/;
function vc(e) {
  let t;
  if (ta.test(e)) {
    t = {};
    let l;
    for (; l = e.match(ta); )
      e = e.slice(0, e.length - l[0].length), t[l[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : zt(e.slice(2)), t];
}
let On = 0;
const yc = /* @__PURE__ */ Promise.resolve(), wc = () => On || (yc.then(() => On = 0), On = Date.now());
function $c(e, t) {
  const s = (l) => {
    if (!l._vts)
      l._vts = Date.now();
    else if (l._vts <= s.attached)
      return;
    Rt(
      kc(l, s.value),
      t,
      5,
      [l]
    );
  };
  return s.value = e, s.attached = wc(), s;
}
function kc(e, t) {
  if (pe(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (l) => (i) => !i._stopped && l && l(i)
    );
  } else
    return t;
}
const sa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Sc = (e, t, s, l, i, r) => {
  const c = i === "svg";
  t === "class" ? dc(e, l, c) : t === "style" ? _c(e, s, l) : ln(t) ? sl(t) || bc(e, t, s, l, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Cc(e, t, l, c)) ? (Zl(e, t, l), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Xl(e, t, l, c, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (xc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ve(l))) ? Zl(e, ut(t), l, r, t) : (t === "true-value" ? e._trueValue = l : t === "false-value" && (e._falseValue = l), Xl(e, t, l, c));
};
function Cc(e, t, s, l) {
  if (l)
    return !!(t === "innerHTML" || t === "textContent" || t in e && sa(t) && be(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return sa(t) && Ve(s) ? !1 : t in e;
}
function xc(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const l = ut(t);
  return Array.isArray(s) ? s.some((i) => ut(i) === l) : Object.keys(s).some((i) => ut(i) === l);
}
const jt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return pe(t) ? (s) => Ks(t, s) : t;
};
function Rc(e) {
  e.target.composing = !0;
}
function na(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const rt = /* @__PURE__ */ Symbol("_assign");
function la(e, t, s) {
  return t && (e = e.trim()), s && (e = rn(e)), e;
}
const Fe = {
  created(e, { modifiers: { lazy: t, trim: s, number: l } }, i) {
    e[rt] = jt(i);
    const r = l || i.props && i.props.type === "number";
    It(e, t ? "change" : "input", (c) => {
      c.target.composing || e[rt](la(e.value, s, r));
    }), (s || r) && It(e, "change", () => {
      e.value = la(e.value, s, r);
    }), t || (It(e, "compositionstart", Rc), It(e, "compositionend", na), It(e, "change", na));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: l, trim: i, number: r } }, c) {
    if (e[rt] = jt(c), e.composing) return;
    const u = (r || e.type === "number") && !/^0\d/.test(e.value) ? rn(e.value) : e.value, d = t ?? "";
    u !== d && (document.activeElement === e && e.type !== "range" && (l && t === s || i && e.value.trim() === d) || (e.value = d));
  }
}, as = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, s) {
    e[rt] = jt(s), It(e, "change", () => {
      const l = e._modelValue, i = fs(e), r = e.checked, c = e[rt];
      if (pe(l)) {
        const u = al(l, i), d = u !== -1;
        if (r && !d)
          c(l.concat(i));
        else if (!r && d) {
          const p = [...l];
          p.splice(u, 1), c(p);
        }
      } else if (_s(l)) {
        const u = new Set(l);
        r ? u.add(i) : u.delete(i), c(u);
      } else
        c(Wi(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: aa,
  beforeUpdate(e, t, s) {
    e[rt] = jt(s), aa(e, t, s);
  }
};
function aa(e, { value: t, oldValue: s }, l) {
  e._modelValue = t;
  let i;
  if (pe(t))
    i = al(t, l.props.value) > -1;
  else if (_s(t))
    i = t.has(l.props.value);
  else {
    if (t === s) return;
    i = Kt(t, Wi(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Ec = {
  created(e, { value: t }, s) {
    e.checked = Kt(t, s.props.value), e[rt] = jt(s), It(e, "change", () => {
      e[rt](fs(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: s }, l) {
    e[rt] = jt(l), t !== s && (e.checked = Kt(t, l.props.value));
  }
}, ct = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, l) {
    const i = _s(t);
    It(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => s ? rn(fs(c)) : fs(c)
      );
      e[rt](
        e.multiple ? i ? new Set(r) : r : r[0]
      ), e._assigning = !0, pn(() => {
        e._assigning = !1;
      });
    }), e[rt] = jt(l);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    ia(e, t);
  },
  beforeUpdate(e, t, s) {
    e[rt] = jt(s);
  },
  updated(e, { value: t }) {
    e._assigning || ia(e, t);
  }
};
function ia(e, t) {
  const s = e.multiple, l = pe(t);
  if (!(s && !l && !_s(t))) {
    for (let i = 0, r = e.options.length; i < r; i++) {
      const c = e.options[i], u = fs(c);
      if (s)
        if (l) {
          const d = typeof u;
          d === "string" || d === "number" ? c.selected = t.some((p) => String(p) === String(u)) : c.selected = al(t, u) > -1;
        } else
          c.selected = t.has(u);
      else if (Kt(fs(c), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function fs(e) {
  return "_value" in e ? e._value : e.value;
}
function Wi(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
const Ac = {
  created(e, t, s) {
    Hs(e, t, s, null, "created");
  },
  mounted(e, t, s) {
    Hs(e, t, s, null, "mounted");
  },
  beforeUpdate(e, t, s, l) {
    Hs(e, t, s, l, "beforeUpdate");
  },
  updated(e, t, s, l) {
    Hs(e, t, s, l, "updated");
  }
};
function Tc(e, t) {
  switch (e) {
    case "SELECT":
      return ct;
    case "TEXTAREA":
      return Fe;
    default:
      switch (t) {
        case "checkbox":
          return as;
        case "radio":
          return Ec;
        default:
          return Fe;
      }
  }
}
function Hs(e, t, s, l, i) {
  const c = Tc(
    e.tagName,
    s.props && s.props.type
  )[i];
  c && c(e, t, s, l);
}
const Pc = ["ctrl", "shift", "alt", "meta"], Oc = {
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
  exact: (e, t) => Pc.some((s) => e[`${s}Key`] && !t.includes(s))
}, bn = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), l = t.join(".");
  return s[l] || (s[l] = (i, ...r) => {
    for (let c = 0; c < t.length; c++) {
      const u = Oc[t[c]];
      if (u && u(i, t)) return;
    }
    return e(i, ...r);
  });
}, Mc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ic = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), l = t.join(".");
  return s[l] || (s[l] = (i) => {
    if (!("key" in i))
      return;
    const r = zt(i.key);
    if (t.some(
      (c) => c === r || Mc[c] === r
    ))
      return e(i);
  });
}, Nc = /* @__PURE__ */ We({ patchProp: Sc }, cc);
let oa;
function Dc() {
  return oa || (oa = Hr(Nc));
}
const Fc = (...e) => {
  const t = Dc().createApp(...e), { mount: s } = t;
  return t.mount = (l) => {
    const i = Uc(l);
    if (!i) return;
    const r = t._component;
    !be(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const c = s(i, !1, Lc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), c;
  }, t;
};
function Lc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Uc(e) {
  return Ve(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Ki;
const vn = (e) => Ki = e, ji = (
  /* istanbul ignore next */
  Symbol()
);
function qn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Rs;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Rs || (Rs = {}));
function Vc() {
  const e = Ga(!0), t = e.run(() => /* @__PURE__ */ Q({}));
  let s = [], l = [];
  const i = fl({
    install(r) {
      vn(i), i._a = r, r.provide(ji, i), r.config.globalProperties.$pinia = i, l.forEach((c) => s.push(c)), l = [];
    },
    use(r) {
      return this._a ? s.push(r) : l.push(r), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return i;
}
const zi = () => {
};
function ra(e, t, s, l = zi) {
  e.push(t);
  const i = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), l());
  };
  return !s && Ha() && ko(i), i;
}
function ss(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const Bc = (e) => e(), ca = Symbol(), Mn = Symbol();
function Jn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, l) => e.set(l, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const l = t[s], i = e[s];
    qn(i) && qn(l) && e.hasOwnProperty(s) && !/* @__PURE__ */ Me(l) && !/* @__PURE__ */ xt(l) ? e[s] = Jn(i, l) : e[s] = l;
  }
  return e;
}
const Gc = (
  /* istanbul ignore next */
  Symbol()
);
function Hc(e) {
  return !qn(e) || !e.hasOwnProperty(Gc);
}
const { assign: Gt } = Object;
function Wc(e) {
  return !!(/* @__PURE__ */ Me(e) && e.effect);
}
function Kc(e, t, s, l) {
  const { state: i, actions: r, getters: c } = t, u = s.state.value[e];
  let d;
  function p() {
    u || (s.state.value[e] = i ? i() : {});
    const h = /* @__PURE__ */ jo(s.state.value[e]);
    return Gt(h, r, Object.keys(c || {}).reduce((f, m) => (f[m] = fl(ae(() => {
      vn(s);
      const _ = s._s.get(e);
      return c[m].call(_, _);
    })), f), {}));
  }
  return d = qi(e, p, t, s, l, !0), d;
}
function qi(e, t, s = {}, l, i, r) {
  let c;
  const u = Gt({ actions: {} }, s), d = { deep: !0 };
  let p, h, f = [], m = [], _;
  const D = l.state.value[e];
  !r && !D && (l.state.value[e] = {});
  let E;
  function z(S) {
    let R;
    p = h = !1, typeof S == "function" ? (S(l.state.value[e]), R = {
      type: Rs.patchFunction,
      storeId: e,
      events: _
    }) : (Jn(l.state.value[e], S), R = {
      type: Rs.patchObject,
      payload: S,
      storeId: e,
      events: _
    });
    const Z = E = Symbol();
    pn().then(() => {
      E === Z && (p = !0);
    }), h = !0, ss(f, R, l.state.value[e]);
  }
  const O = r ? function() {
    const { state: R } = s, Z = R ? R() : {};
    this.$patch((ie) => {
      Gt(ie, Z);
    });
  } : (
    /* istanbul ignore next */
    zi
  );
  function P() {
    c.stop(), f = [], m = [], l._s.delete(e);
  }
  const B = (S, R = "") => {
    if (ca in S)
      return S[Mn] = R, S;
    const Z = function() {
      vn(l);
      const ie = Array.from(arguments), _e = [], ye = [];
      function Ie($) {
        _e.push($);
      }
      function Te($) {
        ye.push($);
      }
      ss(m, {
        args: ie,
        name: Z[Mn],
        store: U,
        after: Ie,
        onError: Te
      });
      let M;
      try {
        M = S.apply(this && this.$id === e ? this : U, ie);
      } catch ($) {
        throw ss(ye, $), $;
      }
      return M instanceof Promise ? M.then(($) => (ss(_e, $), $)).catch(($) => (ss(ye, $), Promise.reject($))) : (ss(_e, M), M);
    };
    return Z[ca] = !0, Z[Mn] = R, Z;
  }, H = {
    _p: l,
    // _s: scope,
    $id: e,
    $onAction: ra.bind(null, m),
    $patch: z,
    $reset: O,
    $subscribe(S, R = {}) {
      const Z = ra(f, S, R.detached, () => ie()), ie = c.run(() => Ue(() => l.state.value[e], (_e) => {
        (R.flush === "sync" ? h : p) && S({
          storeId: e,
          type: Rs.direct,
          events: _
        }, _e);
      }, Gt({}, d, R)));
      return Z;
    },
    $dispose: P
  }, U = /* @__PURE__ */ Ft(H);
  l._s.set(e, U);
  const w = (l._a && l._a.runWithContext || Bc)(() => l._e.run(() => (c = Ga()).run(() => t({ action: B }))));
  for (const S in w) {
    const R = w[S];
    if (/* @__PURE__ */ Me(R) && !Wc(R) || /* @__PURE__ */ xt(R))
      r || (D && Hc(R) && (/* @__PURE__ */ Me(R) ? R.value = D[S] : Jn(R, D[S])), l.state.value[e][S] = R);
    else if (typeof R == "function") {
      const Z = B(R, S);
      w[S] = Z, u.actions[S] = R;
    }
  }
  return Gt(U, w), Gt(/* @__PURE__ */ Ce(U), w), Object.defineProperty(U, "$state", {
    get: () => l.state.value[e],
    set: (S) => {
      z((R) => {
        Gt(R, S);
      });
    }
  }), l._p.forEach((S) => {
    Gt(U, c.run(() => S({
      store: U,
      app: l._a,
      pinia: l,
      options: u
    })));
  }), D && r && s.hydrate && s.hydrate(U.$state, D), p = !0, h = !0, U;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function vl(e, t, s) {
  let l, i;
  const r = typeof t == "function";
  typeof e == "string" ? (l = e, i = r ? s : t) : (i = e, l = e.id);
  function c(u, d) {
    const p = nr();
    return u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    u || (p ? ot(ji, null) : null), u && vn(u), u = Ki, u._s.has(l) || (r ? qi(l, t, i, u) : Kc(l, i, u)), u._s.get(l);
  }
  return c.$id = l, c;
}
function Ji(e) {
  {
    const t = /* @__PURE__ */ Ce(e), s = {};
    for (const l in t) {
      const i = t[l];
      i.effect ? s[l] = // ...
      ae({
        get: () => e[l],
        set(r) {
          e[l] = r;
        }
      }) : (/* @__PURE__ */ Me(i) || /* @__PURE__ */ xt(i)) && (s[l] = // ---
      /* @__PURE__ */ Jo(e, l));
    }
    return s;
  }
}
let jc = 0;
const gt = /* @__PURE__ */ vl("feedback", () => {
  const e = /* @__PURE__ */ Q([]), t = /* @__PURE__ */ Q(null);
  let s = null;
  function l(u) {
    const d = {
      id: ++jc,
      title: u.title,
      message: u.message,
      tone: u.tone || "info"
    };
    e.value.push(d);
    const p = typeof u.durationMs == "number" ? u.durationMs : 3600;
    return typeof window < "u" && p > 0 && window.setTimeout(() => i(d.id), p), d.id;
  }
  function i(u) {
    e.value = e.value.filter((d) => d.id !== u);
  }
  function r(u) {
    return s && (s(!1), s = null), t.value = {
      title: u.title,
      message: u.message,
      confirmLabel: u.confirmLabel || "Confirm",
      cancelLabel: u.cancelLabel || "Cancel",
      tone: u.tone || "default"
    }, new Promise((d) => {
      s = d;
    });
  }
  function c(u) {
    const d = s;
    s = null, t.value = null, d == null || d(u);
  }
  return {
    toasts: e,
    confirmRequest: t,
    pushToast: l,
    dismissToast: i,
    confirm: r,
    resolveConfirm: c
  };
}), zc = { class: "confirm-dialog__header" }, qc = { class: "page-card__title" }, Jc = { class: "confirm-dialog__body" }, Qc = { class: "confirm-dialog__footer" }, Yc = /* @__PURE__ */ Le({
  __name: "ConfirmDialog",
  setup(e) {
    const t = gt(), { confirmRequest: s } = Ji(t), l = ae(() => !!s.value);
    return (i, r) => {
      var c, u, d, p, h, f;
      return l.value ? (v(), y("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = bn((m) => a(t).resolveConfirm(!1), ["self"]))
      }, [
        n("section", {
          class: he(["confirm-dialog", { "confirm-dialog--danger": ((c = a(s)) == null ? void 0 : c.tone) === "danger" }])
        }, [
          n("header", zc, [
            r[3] || (r[3] = n("p", { class: "page-card__eyebrow" }, "Confirm", -1)),
            n("h2", qc, o((u = a(s)) == null ? void 0 : u.title), 1)
          ]),
          n("p", Jc, o((d = a(s)) == null ? void 0 : d.message), 1),
          n("footer", Qc, [
            n("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (m) => a(t).resolveConfirm(!1))
            }, o((p = a(s)) == null ? void 0 : p.cancelLabel), 1),
            n("button", {
              class: he(["inline-link", { "inline-link--danger": ((h = a(s)) == null ? void 0 : h.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (m) => a(t).resolveConfirm(!0))
            }, o((f = a(s)) == null ? void 0 : f.confirmLabel), 3)
          ])
        ], 2)
      ])) : we("", !0);
    };
  }
}), Xc = {
  class: "toast-viewport",
  "aria-live": "polite",
  "aria-atomic": "true"
}, Zc = { class: "toast-card__content" }, eu = { key: 0 }, tu = ["onClick"], su = /* @__PURE__ */ Le({
  __name: "ToastViewport",
  setup(e) {
    const t = gt(), { toasts: s } = Ji(t);
    return (l, i) => (v(), y("div", Xc, [
      (v(!0), y(J, null, ve(a(s), (r) => (v(), y("article", {
        key: r.id,
        class: he(["toast-card", `toast-card--${r.tone}`])
      }, [
        n("div", Zc, [
          r.title ? (v(), y("strong", eu, o(r.title), 1)) : we("", !0),
          n("p", null, o(r.message), 1)
        ]),
        n("button", {
          class: "toast-card__close",
          type: "button",
          onClick: (c) => a(t).dismissToast(r.id)
        }, " × ", 8, tu)
      ], 2))), 128))
    ]));
  }
});
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const ls = typeof document < "u";
function Qi(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function nu(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && Qi(e.default);
}
const xe = Object.assign;
function In(e, t) {
  const s = {};
  for (const l in t) {
    const i = t[l];
    s[l] = _t(i) ? i.map(e) : e(i);
  }
  return s;
}
const Es = () => {
}, _t = Array.isArray;
function ua(e, t) {
  const s = {};
  for (const l in e) s[l] = l in t ? t[l] : e[l];
  return s;
}
const Yi = /#/g, lu = /&/g, au = /\//g, iu = /=/g, ou = /\?/g, Xi = /\+/g, ru = /%5B/g, cu = /%5D/g, Zi = /%5E/g, uu = /%60/g, eo = /%7B/g, du = /%7C/g, to = /%7D/g, fu = /%20/g;
function yl(e) {
  return e == null ? "" : encodeURI("" + e).replace(du, "|").replace(ru, "[").replace(cu, "]");
}
function pu(e) {
  return yl(e).replace(eo, "{").replace(to, "}").replace(Zi, "^");
}
function Qn(e) {
  return yl(e).replace(Xi, "%2B").replace(fu, "+").replace(Yi, "%23").replace(lu, "%26").replace(uu, "`").replace(eo, "{").replace(to, "}").replace(Zi, "^");
}
function hu(e) {
  return Qn(e).replace(iu, "%3D");
}
function _u(e) {
  return yl(e).replace(Yi, "%23").replace(ou, "%3F");
}
function gu(e) {
  return _u(e).replace(au, "%2F");
}
function Ds(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const mu = /\/$/, bu = (e) => e.replace(mu, "");
function Nn(e, t, s = "/") {
  let l, i = {}, r = "", c = "";
  const u = t.indexOf("#");
  let d = t.indexOf("?");
  return d = u >= 0 && d > u ? -1 : d, d >= 0 && (l = t.slice(0, d), r = t.slice(d, u > 0 ? u : t.length), i = e(r.slice(1))), u >= 0 && (l = l || t.slice(0, u), c = t.slice(u, t.length)), l = $u(l ?? t, s), {
    fullPath: l + r + c,
    path: l,
    query: i,
    hash: Ds(c)
  };
}
function vu(e, t) {
  const s = t.query ? e(t.query) : "";
  return t.path + (s && "?") + s + (t.hash || "");
}
function da(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function yu(e, t, s) {
  const l = t.matched.length - 1, i = s.matched.length - 1;
  return l > -1 && l === i && ps(t.matched[l], s.matched[i]) && so(t.params, s.params) && e(t.query) === e(s.query) && t.hash === s.hash;
}
function ps(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function so(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var s in e) if (!wu(e[s], t[s])) return !1;
  return !0;
}
function wu(e, t) {
  return _t(e) ? fa(e, t) : _t(t) ? fa(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function fa(e, t) {
  return _t(t) ? e.length === t.length && e.every((s, l) => s === t[l]) : e.length === 1 && e[0] === t;
}
function $u(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const s = t.split("/"), l = e.split("/"), i = l[l.length - 1];
  (i === ".." || i === ".") && l.push("");
  let r = s.length - 1, c, u;
  for (c = 0; c < l.length; c++)
    if (u = l[c], u !== ".")
      if (u === "..")
        r > 1 && r--;
      else break;
  return s.slice(0, r).join("/") + "/" + l.slice(c).join("/");
}
const Bt = {
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
let Yn = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), Dn = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function ku(e) {
  if (!e) if (ls) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), bu(e);
}
const Su = /^[^#]+#/;
function Cu(e, t) {
  return e.replace(Su, "#") + t;
}
function xu(e, t) {
  const s = document.documentElement.getBoundingClientRect(), l = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: l.left - s.left - (t.left || 0),
    top: l.top - s.top - (t.top || 0)
  };
}
const yn = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Ru(e) {
  let t;
  if ("el" in e) {
    const s = e.el, l = typeof s == "string" && s.startsWith("#"), i = typeof s == "string" ? l ? document.getElementById(s.slice(1)) : document.querySelector(s) : s;
    if (!i)
      return;
    t = xu(i, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function pa(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Xn = /* @__PURE__ */ new Map();
function Eu(e, t) {
  Xn.set(e, t);
}
function Au(e) {
  const t = Xn.get(e);
  return Xn.delete(e), t;
}
function Tu(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function no(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let De = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const lo = Symbol("");
De.MATCHER_NOT_FOUND + "", De.NAVIGATION_GUARD_REDIRECT + "", De.NAVIGATION_ABORTED + "", De.NAVIGATION_CANCELLED + "", De.NAVIGATION_DUPLICATED + "";
function hs(e, t) {
  return xe(/* @__PURE__ */ new Error(), {
    type: e,
    [lo]: !0
  }, t);
}
function At(e, t) {
  return e instanceof Error && lo in e && (t == null || !!(e.type & t));
}
const Pu = [
  "params",
  "query",
  "hash"
];
function Ou(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const s of Pu) s in e && (t[s] = e[s]);
  return JSON.stringify(t, null, 2);
}
function Mu(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let l = 0; l < s.length; ++l) {
    const i = s[l].replace(Xi, " "), r = i.indexOf("="), c = Ds(r < 0 ? i : i.slice(0, r)), u = r < 0 ? null : Ds(i.slice(r + 1));
    if (c in t) {
      let d = t[c];
      _t(d) || (d = t[c] = [d]), d.push(u);
    } else t[c] = u;
  }
  return t;
}
function ha(e) {
  let t = "";
  for (let s in e) {
    const l = e[s];
    if (s = hu(s), l == null) {
      l !== void 0 && (t += (t.length ? "&" : "") + s);
      continue;
    }
    (_t(l) ? l.map((i) => i && Qn(i)) : [l && Qn(l)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + s, i != null && (t += "=" + i));
    });
  }
  return t;
}
function Iu(e) {
  const t = {};
  for (const s in e) {
    const l = e[s];
    l !== void 0 && (t[s] = _t(l) ? l.map((i) => i == null ? null : "" + i) : l == null ? l : "" + l);
  }
  return t;
}
const Nu = Symbol(""), _a = Symbol(""), wn = Symbol(""), wl = Symbol(""), Zn = Symbol("");
function vs() {
  let e = [];
  function t(l) {
    return e.push(l), () => {
      const i = e.indexOf(l);
      i > -1 && e.splice(i, 1);
    };
  }
  function s() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: s
  };
}
function Wt(e, t, s, l, i, r = (c) => c()) {
  const c = l && (l.enterCallbacks[i] = l.enterCallbacks[i] || []);
  return () => new Promise((u, d) => {
    const p = (m) => {
      m === !1 ? d(hs(De.NAVIGATION_ABORTED, {
        from: s,
        to: t
      })) : m instanceof Error ? d(m) : Tu(m) ? d(hs(De.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: m
      })) : (c && l.enterCallbacks[i] === c && typeof m == "function" && c.push(m), u());
    }, h = r(() => e.call(l && l.instances[i], t, s, p));
    let f = Promise.resolve(h);
    e.length < 3 && (f = f.then(p)), f.catch((m) => d(m));
  });
}
function Fn(e, t, s, l, i = (r) => r()) {
  const r = [];
  for (const c of e)
    for (const u in c.components) {
      let d = c.components[u];
      if (!(t !== "beforeRouteEnter" && !c.instances[u]))
        if (Qi(d)) {
          const p = (d.__vccOpts || d)[t];
          p && r.push(Wt(p, s, l, c, u, i));
        } else {
          let p = d();
          r.push(() => p.then((h) => {
            if (!h) throw new Error(`Couldn't resolve component "${u}" at "${c.path}"`);
            const f = nu(h) ? h.default : h;
            c.mods[u] = h, c.components[u] = f;
            const m = (f.__vccOpts || f)[t];
            return m && Wt(m, s, l, c, u, i)();
          }));
        }
    }
  return r;
}
function Du(e, t) {
  const s = [], l = [], i = [], r = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < r; c++) {
    const u = t.matched[c];
    u && (e.matched.find((p) => ps(p, u)) ? l.push(u) : s.push(u));
    const d = e.matched[c];
    d && (t.matched.find((p) => ps(p, d)) || i.push(d));
  }
  return [
    s,
    l,
    i
  ];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Fu = () => location.protocol + "//" + location.host;
function ao(e, t) {
  const { pathname: s, search: l, hash: i } = t, r = e.indexOf("#");
  if (r > -1) {
    let c = i.includes(e.slice(r)) ? e.slice(r).length : 1, u = i.slice(c);
    return u[0] !== "/" && (u = "/" + u), da(u, "");
  }
  return da(s, e) + l + i;
}
function Lu(e, t, s, l) {
  let i = [], r = [], c = null;
  const u = ({ state: m }) => {
    const _ = ao(e, location), D = s.value, E = t.value;
    let z = 0;
    if (m) {
      if (s.value = _, t.value = m, c && c === D) {
        c = null;
        return;
      }
      z = E ? m.position - E.position : 0;
    } else l(_);
    i.forEach((O) => {
      O(s.value, D, {
        delta: z,
        type: Yn.pop,
        direction: z ? z > 0 ? Dn.forward : Dn.back : Dn.unknown
      });
    });
  };
  function d() {
    c = s.value;
  }
  function p(m) {
    i.push(m);
    const _ = () => {
      const D = i.indexOf(m);
      D > -1 && i.splice(D, 1);
    };
    return r.push(_), _;
  }
  function h() {
    if (document.visibilityState === "hidden") {
      const { history: m } = window;
      if (!m.state) return;
      m.replaceState(xe({}, m.state, { scroll: yn() }), "");
    }
  }
  function f() {
    for (const m of r) m();
    r = [], window.removeEventListener("popstate", u), window.removeEventListener("pagehide", h), document.removeEventListener("visibilitychange", h);
  }
  return window.addEventListener("popstate", u), window.addEventListener("pagehide", h), document.addEventListener("visibilitychange", h), {
    pauseListeners: d,
    listen: p,
    destroy: f
  };
}
function ga(e, t, s, l = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: s,
    replaced: l,
    position: window.history.length,
    scroll: i ? yn() : null
  };
}
function Uu(e) {
  const { history: t, location: s } = window, l = { value: ao(e, s) }, i = { value: t.state };
  i.value || r(l.value, {
    back: null,
    current: l.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(d, p, h) {
    const f = e.indexOf("#"), m = f > -1 ? (s.host && document.querySelector("base") ? e : e.slice(f)) + d : Fu() + e + d;
    try {
      t[h ? "replaceState" : "pushState"](p, "", m), i.value = p;
    } catch (_) {
      console.error(_), s[h ? "replace" : "assign"](m);
    }
  }
  function c(d, p) {
    r(d, xe({}, t.state, ga(i.value.back, d, i.value.forward, !0), p, { position: i.value.position }), !0), l.value = d;
  }
  function u(d, p) {
    const h = xe({}, i.value, t.state, {
      forward: d,
      scroll: yn()
    });
    r(h.current, h, !0), r(d, xe({}, ga(l.value, d, null), { position: h.position + 1 }, p), !1), l.value = d;
  }
  return {
    location: l,
    state: i,
    push: u,
    replace: c
  };
}
function Vu(e) {
  e = ku(e);
  const t = Uu(e), s = Lu(e, t.state, t.location, t.replace);
  function l(r, c = !0) {
    c || s.pauseListeners(), history.go(r);
  }
  const i = xe({
    location: "",
    base: e,
    go: l,
    createHref: Cu.bind(null, e)
  }, t, s);
  return Object.defineProperty(i, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(i, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), i;
}
function Bu(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Vu(e);
}
let Xt = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var Ge = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(Ge || {});
const Gu = {
  type: Xt.Static,
  value: ""
}, Hu = /[a-zA-Z0-9_]/;
function Wu(e) {
  if (!e) return [[]];
  if (e === "/") return [[Gu]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${s})/"${p}": ${_}`);
  }
  let s = Ge.Static, l = s;
  const i = [];
  let r;
  function c() {
    r && i.push(r), r = [];
  }
  let u = 0, d, p = "", h = "";
  function f() {
    p && (s === Ge.Static ? r.push({
      type: Xt.Static,
      value: p
    }) : s === Ge.Param || s === Ge.ParamRegExp || s === Ge.ParamRegExpEnd ? (r.length > 1 && (d === "*" || d === "+") && t(`A repeatable param (${p}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: Xt.Param,
      value: p,
      regexp: h,
      repeatable: d === "*" || d === "+",
      optional: d === "*" || d === "?"
    })) : t("Invalid state to consume buffer"), p = "");
  }
  function m() {
    p += d;
  }
  for (; u < e.length; ) {
    if (d = e[u++], d === "\\" && s !== Ge.ParamRegExp) {
      l = s, s = Ge.EscapeNext;
      continue;
    }
    switch (s) {
      case Ge.Static:
        d === "/" ? (p && f(), c()) : d === ":" ? (f(), s = Ge.Param) : m();
        break;
      case Ge.EscapeNext:
        m(), s = l;
        break;
      case Ge.Param:
        d === "(" ? s = Ge.ParamRegExp : Hu.test(d) ? m() : (f(), s = Ge.Static, d !== "*" && d !== "?" && d !== "+" && u--);
        break;
      case Ge.ParamRegExp:
        d === ")" ? h[h.length - 1] == "\\" ? h = h.slice(0, -1) + d : s = Ge.ParamRegExpEnd : h += d;
        break;
      case Ge.ParamRegExpEnd:
        f(), s = Ge.Static, d !== "*" && d !== "?" && d !== "+" && u--, h = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return s === Ge.ParamRegExp && t(`Unfinished custom RegExp for param "${p}"`), f(), c(), i;
}
const ma = "[^/]+?", Ku = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var Qe = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(Qe || {});
const ju = /[.+*?^${}()[\]/\\]/g;
function zu(e, t) {
  const s = xe({}, Ku, t), l = [];
  let i = s.start ? "^" : "";
  const r = [];
  for (const p of e) {
    const h = p.length ? [] : [Qe.Root];
    s.strict && !p.length && (i += "/");
    for (let f = 0; f < p.length; f++) {
      const m = p[f];
      let _ = Qe.Segment + (s.sensitive ? Qe.BonusCaseSensitive : 0);
      if (m.type === Xt.Static)
        f || (i += "/"), i += m.value.replace(ju, "\\$&"), _ += Qe.Static;
      else if (m.type === Xt.Param) {
        const { value: D, repeatable: E, optional: z, regexp: O } = m;
        r.push({
          name: D,
          repeatable: E,
          optional: z
        });
        const P = O || ma;
        if (P !== ma) {
          _ += Qe.BonusCustomRegExp;
          try {
            `${P}`;
          } catch (H) {
            throw new Error(`Invalid custom RegExp for param "${D}" (${P}): ` + H.message);
          }
        }
        let B = E ? `((?:${P})(?:/(?:${P}))*)` : `(${P})`;
        f || (B = z && p.length < 2 ? `(?:/${B})` : "/" + B), z && (B += "?"), i += B, _ += Qe.Dynamic, z && (_ += Qe.BonusOptional), E && (_ += Qe.BonusRepeatable), P === ".*" && (_ += Qe.BonusWildcard);
      }
      h.push(_);
    }
    l.push(h);
  }
  if (s.strict && s.end) {
    const p = l.length - 1;
    l[p][l[p].length - 1] += Qe.BonusStrict;
  }
  s.strict || (i += "/?"), s.end ? i += "$" : s.strict && !i.endsWith("/") && (i += "(?:/|$)");
  const c = new RegExp(i, s.sensitive ? "" : "i");
  function u(p) {
    const h = p.match(c), f = {};
    if (!h) return null;
    for (let m = 1; m < h.length; m++) {
      const _ = h[m] || "", D = r[m - 1];
      f[D.name] = _ && D.repeatable ? _.split("/") : _;
    }
    return f;
  }
  function d(p) {
    let h = "", f = !1;
    for (const m of e) {
      (!f || !h.endsWith("/")) && (h += "/"), f = !1;
      for (const _ of m) if (_.type === Xt.Static) h += _.value;
      else if (_.type === Xt.Param) {
        const { value: D, repeatable: E, optional: z } = _, O = D in p ? p[D] : "";
        if (_t(O) && !E) throw new Error(`Provided param "${D}" is an array but it is not repeatable (* or + modifiers)`);
        const P = _t(O) ? O.join("/") : O;
        if (!P) if (z)
          m.length < 2 && (h.endsWith("/") ? h = h.slice(0, -1) : f = !0);
        else throw new Error(`Missing required param "${D}"`);
        h += P;
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
function qu(e, t) {
  let s = 0;
  for (; s < e.length && s < t.length; ) {
    const l = t[s] - e[s];
    if (l) return l;
    s++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === Qe.Static + Qe.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === Qe.Static + Qe.Segment ? 1 : -1 : 0;
}
function io(e, t) {
  let s = 0;
  const l = e.score, i = t.score;
  for (; s < l.length && s < i.length; ) {
    const r = qu(l[s], i[s]);
    if (r) return r;
    s++;
  }
  if (Math.abs(i.length - l.length) === 1) {
    if (ba(l)) return 1;
    if (ba(i)) return -1;
  }
  return i.length - l.length;
}
function ba(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Ju = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function Qu(e, t, s) {
  const l = zu(Wu(e.path), s), i = xe(l, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function Yu(e, t) {
  const s = [], l = /* @__PURE__ */ new Map();
  t = ua(Ju, t);
  function i(f) {
    return l.get(f);
  }
  function r(f, m, _) {
    const D = !_, E = ya(f);
    E.aliasOf = _ && _.record;
    const z = ua(t, f), O = [E];
    if ("alias" in f) {
      const H = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const U of H) O.push(ya(xe({}, E, {
        components: _ ? _.record.components : E.components,
        path: U,
        aliasOf: _ ? _.record : E
      })));
    }
    let P, B;
    for (const H of O) {
      const { path: U } = H;
      if (m && U[0] !== "/") {
        const T = m.record.path, w = T[T.length - 1] === "/" ? "" : "/";
        H.path = m.record.path + (U && w + U);
      }
      if (P = Qu(H, m, z), _ ? _.alias.push(P) : (B = B || P, B !== P && B.alias.push(P), D && f.name && !wa(P) && c(f.name)), oo(P) && d(P), E.children) {
        const T = E.children;
        for (let w = 0; w < T.length; w++) r(T[w], P, _ && _.children[w]);
      }
      _ = _ || P;
    }
    return B ? () => {
      c(B);
    } : Es;
  }
  function c(f) {
    if (no(f)) {
      const m = l.get(f);
      m && (l.delete(f), s.splice(s.indexOf(m), 1), m.children.forEach(c), m.alias.forEach(c));
    } else {
      const m = s.indexOf(f);
      m > -1 && (s.splice(m, 1), f.record.name && l.delete(f.record.name), f.children.forEach(c), f.alias.forEach(c));
    }
  }
  function u() {
    return s;
  }
  function d(f) {
    const m = ed(f, s);
    s.splice(m, 0, f), f.record.name && !wa(f) && l.set(f.record.name, f);
  }
  function p(f, m) {
    let _, D = {}, E, z;
    if ("name" in f && f.name) {
      if (_ = l.get(f.name), !_) throw hs(De.MATCHER_NOT_FOUND, { location: f });
      z = _.record.name, D = xe(va(m.params, _.keys.filter((B) => !B.optional).concat(_.parent ? _.parent.keys.filter((B) => B.optional) : []).map((B) => B.name)), f.params && va(f.params, _.keys.map((B) => B.name))), E = _.stringify(D);
    } else if (f.path != null)
      E = f.path, _ = s.find((B) => B.re.test(E)), _ && (D = _.parse(E), z = _.record.name);
    else {
      if (_ = m.name ? l.get(m.name) : s.find((B) => B.re.test(m.path)), !_) throw hs(De.MATCHER_NOT_FOUND, {
        location: f,
        currentLocation: m
      });
      z = _.record.name, D = xe({}, m.params, f.params), E = _.stringify(D);
    }
    const O = [];
    let P = _;
    for (; P; )
      O.unshift(P.record), P = P.parent;
    return {
      name: z,
      path: E,
      params: D,
      matched: O,
      meta: Zu(O)
    };
  }
  e.forEach((f) => r(f));
  function h() {
    s.length = 0, l.clear();
  }
  return {
    addRoute: r,
    resolve: p,
    removeRoute: c,
    clearRoutes: h,
    getRoutes: u,
    getRecordMatcher: i
  };
}
function va(e, t) {
  const s = {};
  for (const l of t) l in e && (s[l] = e[l]);
  return s;
}
function ya(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Xu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function Xu(e) {
  const t = {}, s = e.props || !1;
  if ("component" in e) t.default = s;
  else for (const l in e.components) t[l] = typeof s == "object" ? s[l] : s;
  return t;
}
function wa(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Zu(e) {
  return e.reduce((t, s) => xe(t, s.meta), {});
}
function ed(e, t) {
  let s = 0, l = t.length;
  for (; s !== l; ) {
    const r = s + l >> 1;
    io(e, t[r]) < 0 ? l = r : s = r + 1;
  }
  const i = td(e);
  return i && (l = t.lastIndexOf(i, l - 1)), l;
}
function td(e) {
  let t = e;
  for (; t = t.parent; ) if (oo(t) && io(e, t) === 0) return t;
}
function oo({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function $a(e) {
  const t = ot(wn), s = ot(wl), l = ae(() => {
    const d = a(e.to);
    return t.resolve(d);
  }), i = ae(() => {
    const { matched: d } = l.value, { length: p } = d, h = d[p - 1], f = s.matched;
    if (!h || !f.length) return -1;
    const m = f.findIndex(ps.bind(null, h));
    if (m > -1) return m;
    const _ = ka(d[p - 2]);
    return p > 1 && ka(h) === _ && f[f.length - 1].path !== _ ? f.findIndex(ps.bind(null, d[p - 2])) : m;
  }), r = ae(() => i.value > -1 && ad(s.params, l.value.params)), c = ae(() => i.value > -1 && i.value === s.matched.length - 1 && so(s.params, l.value.params));
  function u(d = {}) {
    if (ld(d)) {
      const p = t[a(e.replace) ? "replace" : "push"](a(e.to)).catch(Es);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => p), p;
    }
    return Promise.resolve();
  }
  return {
    route: l,
    href: ae(() => l.value.href),
    isActive: r,
    isExactActive: c,
    navigate: u
  };
}
function sd(e) {
  return e.length === 1 ? e[0] : e;
}
const nd = /* @__PURE__ */ Le({
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
  useLink: $a,
  setup(e, { slots: t }) {
    const s = /* @__PURE__ */ Ft($a(e)), { options: l } = ot(wn), i = ae(() => ({
      [Sa(e.activeClass, l.linkActiveClass, "router-link-active")]: s.isActive,
      [Sa(e.exactActiveClass, l.linkExactActiveClass, "router-link-exact-active")]: s.isExactActive
    }));
    return () => {
      const r = t.default && sd(t.default(s));
      return e.custom ? r : Gi("a", {
        "aria-current": s.isExactActive ? e.ariaCurrentValue : null,
        href: s.href,
        onClick: s.navigate,
        class: i.value
      }, r);
    };
  }
}), $l = nd;
function ld(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function ad(e, t) {
  for (const s in t) {
    const l = t[s], i = e[s];
    if (typeof l == "string") {
      if (l !== i) return !1;
    } else if (!_t(i) || i.length !== l.length || l.some((r, c) => r.valueOf() !== i[c].valueOf())) return !1;
  }
  return !0;
}
function ka(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Sa = (e, t, s) => e ?? t ?? s, id = /* @__PURE__ */ Le({
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
  setup(e, { attrs: t, slots: s }) {
    const l = ot(Zn), i = ae(() => e.route || l.value), r = ot(_a, 0), c = ae(() => {
      let p = a(r);
      const { matched: h } = i.value;
      let f;
      for (; (f = h[p]) && !f.components; ) p++;
      return p;
    }), u = ae(() => i.value.matched[c.value]);
    js(_a, ae(() => c.value + 1)), js(Nu, u), js(Zn, i);
    const d = /* @__PURE__ */ Q();
    return Ue(() => [
      d.value,
      u.value,
      e.name
    ], ([p, h, f], [m, _, D]) => {
      h && (h.instances[f] = p, _ && _ !== h && p && p === m && (h.leaveGuards.size || (h.leaveGuards = _.leaveGuards), h.updateGuards.size || (h.updateGuards = _.updateGuards))), p && h && (!_ || !ps(h, _) || !m) && (h.enterCallbacks[f] || []).forEach((E) => E(p));
    }, { flush: "post" }), () => {
      const p = i.value, h = e.name, f = u.value, m = f && f.components[h];
      if (!m) return Ca(s.default, {
        Component: m,
        route: p
      });
      const _ = f.props[h], D = _ ? _ === !0 ? p.params : typeof _ == "function" ? _(p) : _ : null, z = Gi(m, xe({}, D, t, {
        onVnodeUnmounted: (O) => {
          O.component.isUnmounted && (f.instances[h] = null);
        },
        ref: d
      }));
      return Ca(s.default, {
        Component: z,
        route: p
      }) || z;
    };
  }
});
function Ca(e, t) {
  if (!e) return null;
  const s = e(t);
  return s.length === 1 ? s[0] : s;
}
const ro = id;
function od(e) {
  const t = Yu(e.routes, e), s = e.parseQuery || Mu, l = e.stringifyQuery || ha, i = e.history, r = vs(), c = vs(), u = vs(), d = /* @__PURE__ */ Ho(Bt);
  let p = Bt;
  ls && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const h = In.bind(null, (I) => "" + I), f = In.bind(null, gu), m = In.bind(null, Ds);
  function _(I, le) {
    let ee, ce;
    return no(I) ? (ee = t.getRecordMatcher(I), ce = le) : ce = I, t.addRoute(ce, ee);
  }
  function D(I) {
    const le = t.getRecordMatcher(I);
    le && t.removeRoute(le);
  }
  function E() {
    return t.getRoutes().map((I) => I.record);
  }
  function z(I) {
    return !!t.getRecordMatcher(I);
  }
  function O(I, le) {
    if (le = xe({}, le || d.value), typeof I == "string") {
      const k = Nn(s, I, le.path), N = t.resolve({ path: k.path }, le), V = i.createHref(k.fullPath);
      return xe(k, N, {
        params: m(N.params),
        hash: Ds(k.hash),
        redirectedFrom: void 0,
        href: V
      });
    }
    let ee;
    if (I.path != null)
      ee = xe({}, I, { path: Nn(s, I.path, le.path).path });
    else {
      const k = xe({}, I.params);
      for (const N in k) k[N] == null && delete k[N];
      ee = xe({}, I, { params: f(k) }), le.params = f(le.params);
    }
    const ce = t.resolve(ee, le), $e = I.hash || "";
    ce.params = h(m(ce.params));
    const g = vu(l, xe({}, I, {
      hash: pu($e),
      path: ce.path
    })), b = i.createHref(g);
    return xe({
      fullPath: g,
      hash: $e,
      query: l === ha ? Iu(I.query) : I.query || {}
    }, ce, {
      redirectedFrom: void 0,
      href: b
    });
  }
  function P(I) {
    return typeof I == "string" ? Nn(s, I, d.value.path) : xe({}, I);
  }
  function B(I, le) {
    if (p !== I) return hs(De.NAVIGATION_CANCELLED, {
      from: le,
      to: I
    });
  }
  function H(I) {
    return w(I);
  }
  function U(I) {
    return H(xe(P(I), { replace: !0 }));
  }
  function T(I, le) {
    const ee = I.matched[I.matched.length - 1];
    if (ee && ee.redirect) {
      const { redirect: ce } = ee;
      let $e = typeof ce == "function" ? ce(I, le) : ce;
      return typeof $e == "string" && ($e = $e.includes("?") || $e.includes("#") ? $e = P($e) : { path: $e }, $e.params = {}), xe({
        query: I.query,
        hash: I.hash,
        params: $e.path != null ? {} : I.params
      }, $e);
    }
  }
  function w(I, le) {
    const ee = p = O(I), ce = d.value, $e = I.state, g = I.force, b = I.replace === !0, k = T(ee, ce);
    if (k) return w(xe(P(k), {
      state: typeof k == "object" ? xe({}, $e, k.state) : $e,
      force: g,
      replace: b
    }), le || ee);
    const N = ee;
    N.redirectedFrom = le;
    let V;
    return !g && yu(l, ce, ee) && (V = hs(De.NAVIGATION_DUPLICATED, {
      to: N,
      from: ce
    }), W(ce, ce, !0, !1)), (V ? Promise.resolve(V) : Z(N, ce)).catch((F) => At(F) ? At(F, De.NAVIGATION_GUARD_REDIRECT) ? F : ue(F) : A(F, N, ce)).then((F) => {
      if (F) {
        if (At(F, De.NAVIGATION_GUARD_REDIRECT))
          return w(xe({ replace: b }, P(F.to), {
            state: typeof F.to == "object" ? xe({}, $e, F.to.state) : $e,
            force: g
          }), le || N);
      } else F = _e(N, ce, !0, b, $e);
      return ie(N, ce, F), F;
    });
  }
  function S(I, le) {
    const ee = B(I, le);
    return ee ? Promise.reject(ee) : Promise.resolve();
  }
  function R(I) {
    const le = ke.values().next().value;
    return le && typeof le.runWithContext == "function" ? le.runWithContext(I) : I();
  }
  function Z(I, le) {
    let ee;
    const [ce, $e, g] = Du(I, le);
    ee = Fn(ce.reverse(), "beforeRouteLeave", I, le);
    for (const k of ce) k.leaveGuards.forEach((N) => {
      ee.push(Wt(N, I, le));
    });
    const b = S.bind(null, I, le);
    return ee.push(b), He(ee).then(() => {
      ee = [];
      for (const k of r.list()) ee.push(Wt(k, I, le));
      return ee.push(b), He(ee);
    }).then(() => {
      ee = Fn($e, "beforeRouteUpdate", I, le);
      for (const k of $e) k.updateGuards.forEach((N) => {
        ee.push(Wt(N, I, le));
      });
      return ee.push(b), He(ee);
    }).then(() => {
      ee = [];
      for (const k of g) if (k.beforeEnter) if (_t(k.beforeEnter)) for (const N of k.beforeEnter) ee.push(Wt(N, I, le));
      else ee.push(Wt(k.beforeEnter, I, le));
      return ee.push(b), He(ee);
    }).then(() => (I.matched.forEach((k) => k.enterCallbacks = {}), ee = Fn(g, "beforeRouteEnter", I, le, R), ee.push(b), He(ee))).then(() => {
      ee = [];
      for (const k of c.list()) ee.push(Wt(k, I, le));
      return ee.push(b), He(ee);
    }).catch((k) => At(k, De.NAVIGATION_CANCELLED) ? k : Promise.reject(k));
  }
  function ie(I, le, ee) {
    u.list().forEach((ce) => R(() => ce(I, le, ee)));
  }
  function _e(I, le, ee, ce, $e) {
    const g = B(I, le);
    if (g) return g;
    const b = le === Bt, k = ls ? history.state : {};
    ee && (ce || b ? i.replace(I.fullPath, xe({ scroll: b && k && k.scroll }, $e)) : i.push(I.fullPath, $e)), d.value = I, W(I, le, ee, b), ue();
  }
  let ye;
  function Ie() {
    ye || (ye = i.listen((I, le, ee) => {
      if (!Be.listening) return;
      const ce = O(I), $e = T(ce, Be.currentRoute.value);
      if ($e) {
        w(xe($e, {
          replace: !0,
          force: !0
        }), ce).catch(Es);
        return;
      }
      p = ce;
      const g = d.value;
      ls && Eu(pa(g.fullPath, ee.delta), yn()), Z(ce, g).catch((b) => At(b, De.NAVIGATION_ABORTED | De.NAVIGATION_CANCELLED) ? b : At(b, De.NAVIGATION_GUARD_REDIRECT) ? (w(xe(P(b.to), { force: !0 }), ce).then((k) => {
        At(k, De.NAVIGATION_ABORTED | De.NAVIGATION_DUPLICATED) && !ee.delta && ee.type === Yn.pop && i.go(-1, !1);
      }).catch(Es), Promise.reject()) : (ee.delta && i.go(-ee.delta, !1), A(b, ce, g))).then((b) => {
        b = b || _e(ce, g, !1), b && (ee.delta && !At(b, De.NAVIGATION_CANCELLED) ? i.go(-ee.delta, !1) : ee.type === Yn.pop && At(b, De.NAVIGATION_ABORTED | De.NAVIGATION_DUPLICATED) && i.go(-1, !1)), ie(ce, g, b);
      }).catch(Es);
    }));
  }
  let Te = vs(), M = vs(), $;
  function A(I, le, ee) {
    ue(I);
    const ce = M.list();
    return ce.length ? ce.forEach(($e) => $e(I, le, ee)) : console.error(I), Promise.reject(I);
  }
  function me() {
    return $ && d.value !== Bt ? Promise.resolve() : new Promise((I, le) => {
      Te.add([I, le]);
    });
  }
  function ue(I) {
    return $ || ($ = !I, Ie(), Te.list().forEach(([le, ee]) => I ? ee(I) : le()), Te.reset()), I;
  }
  function W(I, le, ee, ce) {
    const { scrollBehavior: $e } = e;
    if (!ls || !$e) return Promise.resolve();
    const g = !ee && Au(pa(I.fullPath, 0)) || (ce || !ee) && history.state && history.state.scroll || null;
    return pn().then(() => $e(I, le, g)).then((b) => b && Ru(b)).catch((b) => A(b, I, le));
  }
  const K = (I) => i.go(I);
  let ne;
  const ke = /* @__PURE__ */ new Set(), Be = {
    currentRoute: d,
    listening: !0,
    addRoute: _,
    removeRoute: D,
    clearRoutes: t.clearRoutes,
    hasRoute: z,
    getRoutes: E,
    resolve: O,
    options: e,
    push: H,
    replace: U,
    go: K,
    back: () => K(-1),
    forward: () => K(1),
    beforeEach: r.add,
    beforeResolve: c.add,
    afterEach: u.add,
    onError: M.add,
    isReady: me,
    install(I) {
      I.component("RouterLink", $l), I.component("RouterView", ro), I.config.globalProperties.$router = Be, Object.defineProperty(I.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => a(d)
      }), ls && !ne && d.value === Bt && (ne = !0, H(i.location).catch((ce) => {
      }));
      const le = {};
      for (const ce in Bt) Object.defineProperty(le, ce, {
        get: () => d.value[ce],
        enumerable: !0
      });
      I.provide(wn, Be), I.provide(wl, /* @__PURE__ */ li(le)), I.provide(Zn, d);
      const ee = I.unmount;
      ke.add(I), I.unmount = function() {
        ke.delete(I), ke.size < 1 && (p = Bt, ye && ye(), ye = null, d.value = Bt, ne = !1, $ = !1), ee();
      };
    }
  };
  function He(I) {
    return I.reduce((le, ee) => le.then(() => R(ee)), Promise.resolve());
  }
  return Be;
}
function co() {
  return ot(wn);
}
function rd(e) {
  return ot(wl);
}
const xa = "openclaw-guard.theme", Ra = "openclaw-guard.lang";
function cd() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const et = /* @__PURE__ */ vl("ui", () => {
  const e = /* @__PURE__ */ Q("auto"), t = /* @__PURE__ */ Q("zh"), s = /* @__PURE__ */ Q(!1), l = ae(() => e.value === "auto" ? cd() : e.value);
  function i() {
    typeof document > "u" || (document.documentElement.dataset.theme = l.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en");
  }
  function r() {
    if (s.value || typeof window > "u") {
      i();
      return;
    }
    const p = window.localStorage.getItem(xa), h = window.localStorage.getItem(Ra);
    (p === "auto" || p === "light" || p === "dark") && (e.value = p), (h === "zh" || h === "en") && (t.value = h), s.value = !0, i();
  }
  function c(p) {
    e.value = p, typeof window < "u" && window.localStorage.setItem(xa, p), i();
  }
  function u(p) {
    t.value = p, typeof window < "u" && window.localStorage.setItem(Ra, p), i();
  }
  function d(p, h) {
    return t.value === "zh" ? p : h;
  }
  return {
    themePreference: e,
    language: t,
    resolvedTheme: l,
    hydrate: r,
    setThemePreference: c,
    setLanguage: u,
    applyDocumentState: i,
    label: d
  };
}), ud = { class: "guard-shell" }, dd = { class: "guard-shell__topbar" }, fd = { class: "topbar-actions" }, pd = { class: "toolbar-menu" }, hd = ["title"], _d = { class: "toolbar-popover" }, gd = ["onClick"], md = { class: "toolbar-menu" }, bd = ["title"], vd = { class: "toolbar-popover" }, yd = {
  class: "toolbar-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, wd = { class: "guard-shell__body" }, $d = { class: "guard-shell__sidebar" }, kd = { class: "sidebar-current" }, Sd = { class: "sidebar-current__label" }, Cd = { class: "sidebar-current__title" }, xd = { class: "sidebar-current__meta" }, Rd = { class: "sidebar-nav" }, Ed = { class: "sidebar-group__title" }, Ad = { class: "guard-shell__content" }, Td = "/ui/logo.png", Pd = /* @__PURE__ */ Le({
  __name: "GuardShell",
  setup(e) {
    const t = et(), s = rd(), l = [
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
    ], i = [
      { value: "auto", icon: "⌘", zh: "跟随系统", en: "Auto" },
      { value: "light", icon: "☀", zh: "浅色", en: "Light" },
      { value: "dark", icon: "☾", zh: "深色", en: "Dark" }
    ], r = ae(() => t.themePreference === "light" ? "☀" : t.themePreference === "dark" ? "☾" : "⌘"), c = ae(() => {
      const u = l.flatMap((d) => d.items).find((d) => d.to === s.path);
      return u ? t.label(u.zh, u.en) : t.label("首页", "Home");
    });
    return qt(() => {
      t.hydrate();
    }), Ue(() => t.themePreference, () => t.applyDocumentState()), Ue(() => t.language, () => t.applyDocumentState()), (u, d) => (v(), y("div", ud, [
      n("header", dd, [
        n("div", { class: "brand-lockup" }, [
          n("img", {
            class: "brand-lockup__logo",
            src: Td,
            alt: "OpenClaw Guard"
          }),
          d[2] || (d[2] = n("div", null, [
            n("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            n("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        n("div", fd, [
          n("div", pd, [
            n("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("主题", "Theme")
            }, o(r.value), 9, hd),
            n("div", _d, [
              (v(), y(J, null, ve(i, (p) => n("button", {
                key: p.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (h) => a(t).setThemePreference(p.value)
              }, [
                n("span", null, o(p.icon), 1),
                n("span", null, o(a(t).label(p.zh, p.en)), 1)
              ], 8, gd)), 64))
            ])
          ]),
          n("div", md, [
            n("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("语言", "Language")
            }, " 🌐 ", 8, bd),
            n("div", vd, [
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: d[0] || (d[0] = (p) => a(t).setLanguage("zh"))
              }, [...d[3] || (d[3] = [
                n("span", null, "中", -1),
                n("span", null, "中文", -1)
              ])]),
              n("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: d[1] || (d[1] = (p) => a(t).setLanguage("en"))
              }, [...d[4] || (d[4] = [
                n("span", null, "EN", -1),
                n("span", null, "English", -1)
              ])])
            ])
          ]),
          n("a", yd, o(a(t).label("打开当前正式控制台", "Open current production console")), 1)
        ])
      ]),
      n("div", wd, [
        n("aside", $d, [
          n("div", kd, [
            n("p", Sd, o(a(t).label("当前页面", "Current page")), 1),
            n("p", Cd, o(c.value), 1),
            n("p", xd, o(a(t).label("这里是 dev-rust 分支上的模块化预览壳层。当前继续迁移真实业务页面，但不会替换正式运行时。", "This is the modular preview shell on the dev-rust line. We keep migrating real product pages here without replacing the production runtime yet.")), 1)
          ]),
          n("nav", Rd, [
            (v(), y(J, null, ve(l, (p) => n("section", {
              key: p.id,
              class: "sidebar-group"
            }, [
              n("p", Ed, o(a(t).label(p.zh, p.en)), 1),
              (v(!0), y(J, null, ve(p.items, (h) => (v(), ht(a($l), {
                key: h.to,
                to: h.to,
                class: he(["sidebar-link", { "sidebar-link--active": a(s).path === h.to }])
              }, {
                default: oe(() => [
                  ml(o(a(t).label(h.zh, h.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ])
        ]),
        n("main", Ad, [
          X(a(ro))
        ])
      ])
    ]));
  }
}), Od = /* @__PURE__ */ Le({
  __name: "App",
  setup(e) {
    return (t, s) => (v(), y(J, null, [
      X(Pd),
      X(su),
      X(Yc)
    ], 64));
  }
});
function nt(e, t = null, s = {}) {
  const l = /* @__PURE__ */ Q(t), i = s.immediate !== !1, r = /* @__PURE__ */ Q(i && t === null), c = /* @__PURE__ */ Q(!1), u = /* @__PURE__ */ Q(null);
  async function d(p = {}) {
    p.silent === !0 ? c.value = !0 : r.value = !0, u.value = null;
    try {
      l.value = await e();
    } catch (f) {
      u.value = f instanceof Error ? f.message : String(f);
    } finally {
      r.value = !1, c.value = !1;
    }
  }
  return qt(() => {
    i && d();
  }), {
    data: l,
    loading: r,
    refreshing: c,
    error: u,
    execute: d
  };
}
function Ze(e) {
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
function fe(e) {
  return e == null || !Number.isFinite(e) ? "-" : new Intl.NumberFormat(void 0).format(e);
}
function Md(e) {
  return e == null || !Number.isFinite(e) ? "-" : `${e.toFixed(e >= 10 ? 0 : 1)}%`;
}
function Id(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "-";
  if (e < 1024) return `${fe(e)} B`;
  const t = ["KB", "MB", "GB", "TB"];
  let s = e / 1024, l = 0;
  for (; s >= 1024 && l < t.length - 1; )
    s /= 1024, l += 1;
  return `${s.toFixed(s >= 10 ? 1 : 2)} ${t[l]}`;
}
function Ea(e, t = "USD") {
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
  const s = e >= 1 ? 2 : 4;
  return `${e.toFixed(s)} ${t}`.trim();
}
function Aa(e) {
  return e ? e.slice(0, 7) : "-";
}
function Ws(e) {
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
  return t[e] ? t[e] : e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
}
function Nd(e) {
  return typeof e == "boolean" ? e : typeof e == "string" ? ["true", "1", "yes", "on"].includes(e.trim().toLowerCase()) : !1;
}
function nn(e) {
  const t = e.trim();
  if (!t) return;
  const s = Number(t);
  return Number.isFinite(s) ? s : void 0;
}
function Ta(e) {
  return /token|secret|key|password/i.test(e);
}
const Dd = { class: "page-card" }, Fd = { class: "page-card__header" }, Ld = {
  key: 0,
  class: "page-card__eyebrow"
}, Ud = { class: "page-card__title" }, Vd = { class: "page-card__body" }, re = /* @__PURE__ */ Le({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, s) => (v(), y("section", Dd, [
      n("header", Fd, [
        n("div", null, [
          e.eyebrow ? (v(), y("p", Ld, o(e.eyebrow), 1)) : we("", !0),
          n("h2", Ud, o(e.title), 1)
        ]),
        Nl(t.$slots, "actions")
      ]),
      n("div", Vd, [
        Nl(t.$slots, "default")
      ])
    ]));
  }
});
async function Bd(e) {
  if ((e.headers.get("content-type") || "").includes("application/json"))
    try {
      const l = await e.json();
      return l.message || l.error || `Request failed with ${e.status}`;
    } catch {
      return `Request failed with ${e.status}`;
    }
  return await e.text() || `Request failed with ${e.status}`;
}
async function kl(e, t = {}) {
  const s = new Headers(t.headers);
  s.set("Accept", "application/json");
  let l = t.body;
  l && typeof l == "object" && !(l instanceof FormData) && !(l instanceof URLSearchParams) && !(l instanceof Blob) && (s.set("Content-Type", "application/json"), l = JSON.stringify(l));
  const i = await fetch(e, {
    ...t,
    headers: s,
    body: l
  });
  if (!i.ok)
    throw new Error(await Bd(i));
  return i.json();
}
function Ee(e) {
  return kl(e);
}
function Ne(e, t) {
  return kl(e, {
    method: "POST",
    body: t
  });
}
function uo(e) {
  return kl(e, {
    method: "DELETE"
  });
}
async function Gd() {
  const [e, t, s] = await Promise.all([
    Ee("/api/channels"),
    Ee("/api/channels/meta"),
    Ee("/api/feishu/plugin").catch(() => ({ installed: !1 }))
  ]);
  return {
    channels: e,
    definitions: t,
    feishuPlugin: s
  };
}
function Hd(e, t) {
  return Ne(`/api/channels/${encodeURIComponent(e)}`, t);
}
function Wd(e) {
  return uo(`/api/channels/${encodeURIComponent(e)}`);
}
const Kd = { class: "page-stack" }, jd = { class: "page-header" }, zd = { class: "page-header__eyebrow" }, qd = { class: "page-header__title" }, Jd = { class: "page-header__description" }, Qd = {
  key: 0,
  class: "page-empty"
}, Yd = {
  key: 1,
  class: "page-empty page-empty--error"
}, Xd = { class: "stat-grid" }, Zd = { class: "stat-card" }, ef = { class: "stat-card__label" }, tf = { class: "stat-card" }, sf = { class: "stat-card__label" }, nf = { class: "stat-card" }, lf = { class: "stat-card__label" }, af = { class: "stat-card" }, of = { class: "stat-card__label" }, rf = { class: "page-two-column" }, cf = { class: "catalog-list" }, uf = ["onClick"], df = { class: "catalog-list__title" }, ff = { class: "pill-row" }, pf = { class: "page-stack" }, hf = { class: "page-inline-status" }, _f = { class: "muted-copy" }, gf = { class: "settings-grid" }, mf = { key: 0 }, bf = ["onUpdate:modelValue", "type"], vf = ["onUpdate:modelValue"], yf = ["value"], wf = {
  key: 3,
  class: "checkbox-row"
}, $f = ["onUpdate:modelValue"], kf = { class: "page-actions" }, Sf = ["disabled"], Cf = ["disabled"], xf = { class: "list-stack" }, Rf = { class: "action-row" }, Ef = { class: "action-row" }, Af = { class: "action-row" }, Tf = { class: "code-panel" }, Pf = /* @__PURE__ */ Le({
  __name: "ChannelsPage",
  setup(e) {
    const t = {
      connectionMode: ["websocket", "webhook"],
      dmPolicy: ["open", "allowlist", "closed"],
      groupPolicy: ["open", "allowlist", "closed"],
      renderMode: ["auto", "rich", "compact"]
    }, s = et(), l = gt(), i = nt(() => Gd()), r = /* @__PURE__ */ Q(""), c = /* @__PURE__ */ Q(!1), u = /* @__PURE__ */ Q(!1), d = /* @__PURE__ */ Ft({}), p = /* @__PURE__ */ Ft({}), h = ae(() => {
      var w;
      return new Map((((w = i.data) == null ? void 0 : w.channels) || []).map((S) => [S.id, S]));
    }), f = ae(() => {
      var w;
      return new Map((((w = i.data) == null ? void 0 : w.definitions) || []).map((S) => [S.id, S]));
    }), m = ae(() => {
      var w, S;
      return f.value.get(r.value) || ((S = (w = i.data) == null ? void 0 : w.definitions) == null ? void 0 : S[0]) || null;
    }), _ = ae(() => {
      const w = m.value;
      return w ? h.value.get(w.id) || {
        id: w.id,
        name: w.name,
        icon: w.icon,
        enabled: !1,
        configured: !1,
        config: {}
      } : null;
    }), D = ae(() => {
      var w;
      return (((w = i.data) == null ? void 0 : w.channels) || []).filter((S) => S.enabled).length;
    }), E = ae(() => {
      var w;
      return (((w = i.data) == null ? void 0 : w.channels) || []).filter((S) => S.configured).length;
    }), z = ae(() => {
      const w = m.value, S = [
        {
          key: "enabled",
          label: s.label("启用这个渠道", "Enable this channel"),
          kind: "boolean",
          help: s.label("关闭后保留配置，但运行态不会接收这个入口的消息。", "Keep the config but stop receiving traffic from this channel.")
        }
      ];
      for (const R of (w == null ? void 0 : w.fields) || []) {
        if (R === "requireMention" || R === "streaming") {
          S.push({
            key: R,
            label: Ws(R),
            kind: "boolean",
            help: s.label("勾选即启用。", "Checked means enabled.")
          });
          continue;
        }
        if (t[R]) {
          S.push({
            key: R,
            label: Ws(R),
            kind: "text",
            inputType: "select",
            options: t[R].map((Z) => ({ value: Z, label: Z }))
          });
          continue;
        }
        S.push({
          key: R,
          label: Ws(R),
          kind: "text",
          inputType: /port/i.test(R) ? "number" : Ta(R) ? "password" : "text"
        });
      }
      for (const R of (w == null ? void 0 : w.envFields) || [])
        S.push({
          key: `env:${R}`,
          label: `${Ws(R)} (${R})`,
          kind: "text",
          inputType: "password",
          env: !0,
          help: s.label("留空会清除这个本机环境变量。", "Leave blank to clear this local environment variable.")
        });
      return S;
    });
    function O() {
      for (const w of Object.keys(d)) delete d[w];
      for (const w of Object.keys(p)) delete p[w];
    }
    function P() {
      var R, Z;
      O();
      const w = _.value, S = m.value;
      if (!(!w || !S)) {
        p.enabled = w.enabled === !0;
        for (const ie of S.fields) {
          const _e = (R = w.config) == null ? void 0 : R[ie];
          ie === "requireMention" || ie === "streaming" ? p[ie] = Nd(_e) : d[ie] = _e == null ? "" : String(_e);
        }
        for (const ie of S.envFields) {
          const _e = `env:${ie}`;
          d[_e] = ((Z = w.config) == null ? void 0 : Z[_e]) == null ? "" : String(w.config[_e]);
        }
      }
    }
    Ue(
      () => i.data,
      (w) => {
        const S = (w == null ? void 0 : w.definitions) || [];
        if (S.length) {
          if (!r.value || !f.value.has(r.value)) {
            r.value = S[0].id;
            return;
          }
          P();
        }
      },
      { immediate: !0 }
    ), Ue(r, () => {
      P();
    });
    function B() {
      const w = _.value;
      return w ? w.id === "feishu" ? w.enabled ? s.label(
        "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
        "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
      ) : s.label(
        "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
        "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
      ) : w.enabled ? s.label("保存后会直接更新当前消息入口配置。", "Saving here updates the live channel configuration immediately.") : s.label("这个消息入口当前停用中。可以先补齐配置，再决定是否启用。", "This channel is currently disabled. Finish the settings first, then decide whether to enable it.") : "";
    }
    async function H() {
      const w = _.value, S = m.value;
      if (!(!w || !S)) {
        c.value = !0;
        try {
          const R = {
            enabled: p.enabled === !0
          };
          for (const ie of S.fields) {
            if (ie === "requireMention" || ie === "streaming") {
              R[ie] = p[ie] === !0;
              continue;
            }
            const _e = d[ie] ?? "";
            /port/i.test(ie) ? R[ie] = nn(_e) ?? "" : R[ie] = _e;
          }
          for (const ie of S.envFields)
            R[`env:${ie}`] = d[`env:${ie}`] ?? "";
          const Z = await Hd(w.id, R);
          l.pushToast({
            tone: Z.success ? "success" : "error",
            message: Z.message
          }), await i.execute({ silent: !0 });
        } catch (R) {
          l.pushToast({
            tone: "error",
            message: R instanceof Error ? R.message : String(R)
          });
        } finally {
          c.value = !1;
        }
      }
    }
    async function U() {
      const w = _.value;
      if (!(!w || !await l.confirm({
        title: s.label("清空渠道配置", "Clear channel configuration"),
        message: s.label(
          `确认清空 ${w.name || w.id} 的配置吗？这会移除本机保存的字段和值。`,
          `Clear the configuration for ${w.name || w.id}? This removes the saved local values for this channel.`
        ),
        confirmLabel: s.label("确认清空", "Clear configuration"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        u.value = !0;
        try {
          const R = await Wd(w.id);
          l.pushToast({
            tone: R.success ? "success" : "error",
            message: R.message
          }), await i.execute({ silent: !0 });
        } catch (R) {
          l.pushToast({
            tone: "error",
            message: R instanceof Error ? R.message : String(R)
          });
        } finally {
          u.value = !1;
        }
      }
    }
    function T(w) {
      return d[w] ?? "";
    }
    return (w, S) => (v(), y("div", Kd, [
      n("header", jd, [
        n("div", null, [
          n("p", zd, o(a(s).label("渠道 / Second slice", "Channels / Second slice")), 1),
          n("h2", qd, o(a(s).label("渠道管理", "Channel management")), 1),
          n("p", Jd, o(a(s).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: S[0] || (S[0] = (R) => a(i).execute({ silent: !0 }))
        }, o(a(i).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(i).loading ? (v(), y("div", Qd, o(a(s).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : a(i).error ? (v(), y("div", Yd, o(a(i).error), 1)) : a(i).data && _.value ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(s).label("当前概览", "Current overview"),
          eyebrow: "Summary"
        }, {
          default: oe(() => [
            n("div", Xd, [
              n("article", Zd, [
                n("p", ef, o(a(s).label("可管理渠道", "Channels")), 1),
                n("strong", null, o(a(i).data.definitions.length), 1),
                n("span", null, o(a(s).label("当前内置和官方入口总数", "Built-in and official entry points available now")), 1)
              ]),
              n("article", tf, [
                n("p", sf, o(a(s).label("已启用", "Enabled")), 1),
                n("strong", null, o(D.value), 1),
                n("span", null, o(a(s).label("运行态会接收消息", "Receives traffic at runtime")), 1)
              ]),
              n("article", nf, [
                n("p", lf, o(a(s).label("已配置", "Configured")), 1),
                n("strong", null, o(E.value), 1),
                n("span", null, o(a(s).label("已经填写了字段或本机变量", "Fields or local values already exist")), 1)
              ]),
              n("article", af, [
                n("p", of, o(a(s).label("飞书插件", "Feishu plugin")), 1),
                n("strong", null, o(a(i).data.feishuPlugin.installed ? a(s).label("已识别", "Detected") : a(s).label("未识别", "Not detected")), 1),
                n("span", null, o(a(i).data.feishuPlugin.version || a(s).label("官方渠道仍可直接维护", "Official channel still remains manageable")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", rf, [
          X(re, {
            title: a(s).label("渠道目录", "Channel catalog"),
            eyebrow: "Catalog"
          }, {
            default: oe(() => [
              n("div", cf, [
                (v(!0), y(J, null, ve(a(i).data.definitions, (R) => {
                  var Z, ie, _e, ye;
                  return v(), y("button", {
                    key: R.id,
                    class: he(["catalog-list__item", { "catalog-list__item--active": r.value === R.id }]),
                    type: "button",
                    onClick: (Ie) => r.value = R.id
                  }, [
                    n("div", df, [
                      n("strong", null, o(`${R.icon} ${R.name}`), 1)
                    ]),
                    n("div", ff, [
                      n("span", {
                        class: he(["pill", (Z = h.value.get(R.id)) != null && Z.enabled ? "pill--success" : "pill--warning"])
                      }, o((ie = h.value.get(R.id)) != null && ie.enabled ? a(s).label("已启用", "Enabled") : a(s).label("停用", "Disabled")), 3),
                      n("span", {
                        class: he(["pill", (_e = h.value.get(R.id)) != null && _e.configured ? "pill--success" : "pill--muted"])
                      }, o((ye = h.value.get(R.id)) != null && ye.configured ? a(s).label("已配置", "Configured") : a(s).label("未配置", "Empty")), 3)
                    ])
                  ], 10, uf);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", pf, [
            X(re, {
              title: _.value.name,
              eyebrow: "Editor"
            }, {
              default: oe(() => [
                n("div", hf, [
                  n("span", {
                    class: he(["pill", _.value.enabled ? "pill--success" : "pill--warning"])
                  }, o(_.value.enabled ? a(s).label("正在接收消息", "Receiving traffic") : a(s).label("当前停用", "Currently disabled")), 3),
                  n("span", {
                    class: he(["pill", _.value.configured ? "pill--success" : "pill--muted"])
                  }, o(_.value.configured ? a(s).label("配置已完成", "Configured") : a(s).label("还未配置", "Not configured")), 3)
                ]),
                n("p", _f, o(B()), 1),
                n("div", gf, [
                  (v(!0), y(J, null, ve(z.value, (R) => (v(), y("label", {
                    key: R.key,
                    class: "settings-field"
                  }, [
                    n("span", null, o(R.label), 1),
                    R.help ? (v(), y("small", mf, o(R.help), 1)) : we("", !0),
                    R.kind === "text" && R.inputType !== "select" ? Se((v(), y("input", {
                      key: 1,
                      "onUpdate:modelValue": (Z) => d[R.key] = Z,
                      class: "settings-input",
                      type: R.inputType || "text"
                    }, null, 8, bf)), [
                      [Ac, d[R.key]]
                    ]) : R.kind === "text" && R.inputType === "select" ? Se((v(), y("select", {
                      key: 2,
                      "onUpdate:modelValue": (Z) => d[R.key] = Z,
                      class: "settings-input"
                    }, [
                      (v(!0), y(J, null, ve(R.options, (Z) => (v(), y("option", {
                        key: Z.value,
                        value: Z.value
                      }, o(Z.label), 9, yf))), 128))
                    ], 8, vf)), [
                      [ct, d[R.key]]
                    ]) : (v(), y("label", wf, [
                      Se(n("input", {
                        "onUpdate:modelValue": (Z) => p[R.key] = Z,
                        type: "checkbox"
                      }, null, 8, $f), [
                        [as, p[R.key]]
                      ]),
                      n("span", null, o(R.help || a(s).label("勾选即启用。", "Checked means enabled.")), 1)
                    ]))
                  ]))), 128))
                ]),
                n("div", kf, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: c.value,
                    onClick: H
                  }, o(c.value ? a(s).label("保存中…", "Saving…") : a(s).label("保存渠道配置", "Save channel configuration")), 9, Sf),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: P
                  }, o(a(s).label("恢复当前值", "Reset draft")), 1),
                  n("button", {
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: u.value,
                    onClick: U
                  }, o(u.value ? a(s).label("清空中…", "Clearing…") : a(s).label("清空配置", "Clear configuration")), 9, Cf)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            X(re, {
              title: a(s).label("配置摘要", "Configuration summary"),
              eyebrow: "Summary"
            }, {
              default: oe(() => {
                var R, Z;
                return [
                  n("div", xf, [
                    n("article", Rf, [
                      n("div", null, [
                        n("h3", null, o(a(s).label("普通字段", "Regular fields")), 1),
                        n("p", null, o(a(s).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                      ]),
                      n("strong", null, o(((R = m.value) == null ? void 0 : R.fields.length) || 0), 1)
                    ]),
                    n("article", Ef, [
                      n("div", null, [
                        n("h3", null, o(a(s).label("本机变量", "Local secrets")), 1),
                        n("p", null, o(a(s).label("敏感值优先以本机变量方式保存，便于后续替换或清空。", "Sensitive values are best stored as local variables so they can be rotated or cleared later.")), 1)
                      ]),
                      n("strong", null, o(((Z = m.value) == null ? void 0 : Z.envFields.length) || 0), 1)
                    ]),
                    n("article", Af, [
                      n("div", null, [
                        n("h3", null, o(a(s).label("当前草稿", "Current draft")), 1),
                        n("p", null, o(a(s).label("这里只显示你现在编辑中的内容，不会自动写入运行态。", "This only shows the values you are editing now. Nothing reaches runtime until you save.")), 1)
                      ]),
                      n("strong", null, o(_.value.id), 1)
                    ])
                  ]),
                  n("pre", Tf, o(JSON.stringify({
                    enabled: p.enabled,
                    fields: Object.fromEntries(Object.keys(d).filter((ie) => !ie.startsWith("env:")).map((ie) => [ie, a(Ta)(ie) && T(ie) ? "******" : T(ie)])),
                    envFields: Object.fromEntries(Object.keys(d).filter((ie) => ie.startsWith("env:")).map((ie) => [ie, T(ie) ? "******" : ""]))
                  }, null, 2)), 1)
                ];
              }),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : we("", !0)
    ]));
  }
});
function Of() {
  return Ee("/api/cron-ui");
}
function Mf(e) {
  return Ne("/api/cron-ui/create", e);
}
function If(e) {
  return Ne("/api/cron-ui/update", e);
}
function Nf(e) {
  return Ne("/api/cron-ui/enable", { jobId: e });
}
function Df(e) {
  return Ne("/api/cron-ui/disable", { jobId: e });
}
function Ff(e) {
  return Ne("/api/cron-ui/run", { jobId: e });
}
function Lf(e) {
  return Ne("/api/cron-ui/remove", { jobId: e });
}
const Uf = { class: "page-stack" }, Vf = { class: "page-header" }, Bf = { class: "page-header__eyebrow" }, Gf = { class: "page-header__title" }, Hf = { class: "page-header__description" }, Wf = {
  key: 0,
  class: "page-empty"
}, Kf = {
  key: 1,
  class: "page-empty page-empty--error"
}, jf = { class: "stat-grid" }, zf = { class: "stat-card" }, qf = { class: "stat-card__label" }, Jf = { class: "stat-card" }, Qf = { class: "stat-card__label" }, Yf = { class: "stat-card" }, Xf = { class: "stat-card__label" }, Zf = { class: "stat-card" }, ep = { class: "stat-card__label" }, tp = { class: "stat-card" }, sp = { class: "stat-card__label" }, np = { class: "stat-card" }, lp = { class: "stat-card__label" }, ap = {
  key: 0,
  class: "status-banner status-banner--warning"
}, ip = {
  key: 0,
  class: "code-panel"
}, op = { class: "list-stack" }, rp = {
  key: 0,
  class: "risk-row"
}, cp = { class: "page-split" }, up = { class: "provider-card__header" }, dp = { class: "muted-copy" }, fp = { class: "settings-grid settings-grid--wide" }, pp = { class: "settings-field" }, hp = ["placeholder"], _p = { class: "settings-field" }, gp = ["placeholder"], mp = { class: "settings-field" }, bp = { class: "settings-field" }, vp = ["placeholder"], yp = { class: "settings-field" }, wp = { class: "settings-field" }, $p = { class: "settings-field" }, kp = ["placeholder"], Sp = { class: "settings-field" }, Cp = { value: "" }, xp = { class: "settings-field" }, Rp = { class: "settings-field" }, Ep = { class: "settings-field" }, Ap = ["placeholder"], Tp = { class: "settings-field settings-field--full" }, Pp = ["placeholder"], Op = { class: "settings-field settings-field--full" }, Mp = ["placeholder"], Ip = { class: "checkbox-grid" }, Np = { class: "checkbox-card" }, Dp = { class: "checkbox-card__body" }, Fp = { class: "checkbox-card" }, Lp = { class: "checkbox-card__body" }, Up = { class: "checkbox-card" }, Vp = { class: "checkbox-card__body" }, Bp = { class: "checkbox-card" }, Gp = { class: "checkbox-card__body" }, Hp = { class: "page-actions" }, Wp = ["disabled"], Kp = { class: "control-grid" }, jp = { class: "settings-field" }, zp = ["placeholder"], qp = { class: "pill-row" }, Jp = {
  key: 0,
  class: "provider-stack"
}, Qp = { class: "provider-card__header" }, Yp = { class: "mini-list" }, Xp = { class: "mini-list__item mini-list__item--stack" }, Zp = { class: "mini-list__item mini-list__item--stack" }, eh = { class: "mini-list__item mini-list__item--stack" }, th = { class: "page-actions" }, sh = ["onClick"], nh = ["disabled", "onClick"], lh = ["disabled", "onClick"], ah = ["disabled", "onClick"], ih = {
  key: 1,
  class: "page-empty"
}, oh = /* @__PURE__ */ Le({
  __name: "CronPage",
  setup(e) {
    let t = null;
    const s = et(), l = gt(), i = /* @__PURE__ */ Q(""), r = /* @__PURE__ */ Q("all"), c = /* @__PURE__ */ Q("create"), u = /* @__PURE__ */ Q(""), d = /* @__PURE__ */ Q(""), p = /* @__PURE__ */ Q(null), h = nt(() => Of(), t, { immediate: !1 }), f = /* @__PURE__ */ Ft(z());
    Ue(h.data, (M) => {
      M && (t = M);
    }), qt(() => {
      h.execute({ silent: !!h.data.value });
    });
    const m = ae(() => {
      var M;
      return ((M = h.data.value) == null ? void 0 : M.jobs) || [];
    }), _ = ae(() => m.value.filter((M) => M.enabled)), D = ae(() => m.value.filter((M) => !M.enabled)), E = ae(() => {
      const M = i.value.trim().toLowerCase();
      return m.value.filter(($) => r.value === "enabled" && !$.enabled || r.value === "disabled" && $.enabled ? !1 : M ? [
        $.name,
        $.id,
        $.agentId,
        $.schedule,
        $.prompt,
        $.status
      ].join(" ").toLowerCase().includes(M) : !0);
    });
    Ue(m, () => {
      c.value === "edit" && !m.value.find((M) => M.id === u.value) && P();
    });
    function z() {
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
    function O(M = z()) {
      Object.assign(f, M);
    }
    function P() {
      c.value = "create", u.value = "", O();
    }
    function B(M) {
      const $ = Number(M);
      return !Number.isFinite($) || $ <= 0 ? "" : $ % 864e5 === 0 ? `${$ / 864e5}d` : $ % 36e5 === 0 ? `${$ / 36e5}h` : $ % 6e4 === 0 ? `${$ / 6e4}m` : $ % 1e3 === 0 ? `${$ / 1e3}s` : String($);
    }
    function H(M) {
      const $ = M.raw || {}, A = $.payload || {}, me = $.schedule || {}, ue = z();
      return me.kind === "every" ? (ue.scheduleMode = "every", ue.scheduleValue = B(me.everyMs)) : me.kind === "at" ? (ue.scheduleMode = "at", ue.scheduleValue = String(me.at || "")) : me.kind === "cron" && (ue.scheduleMode = "cron", ue.scheduleValue = String(me.expr || "")), !ue.scheduleValue && typeof M.schedule == "string" && (M.schedule.startsWith("cron ") ? (ue.scheduleMode = "cron", ue.scheduleValue = M.schedule.slice(5).trim()) : M.schedule.startsWith("every ") ? (ue.scheduleMode = "every", ue.scheduleValue = M.schedule.slice(6).trim()) : M.schedule.startsWith("at ") ? (ue.scheduleMode = "at", ue.scheduleValue = M.schedule.slice(3).trim()) : ue.scheduleValue = M.schedule.trim()), ue.stagger = B(me.staggerMs), ue.name = String($.name || M.name || ""), ue.description = String($.description || ""), ue.agentId = String($.agentId || M.agentId || ""), ue.prompt = String(A.message || A.text || $.message || M.prompt || ""), ue.enabled = M.enabled !== !1, ue.timezone = String($.tz || ""), ue.model = String($.model || A.model || ""), ue.thinking = String($.thinking || A.thinking || ""), ue.session = String($.session || A.session || ue.session), ue.wake = String($.wake || ue.wake), ue.timeoutSeconds = $.timeoutSeconds ? String($.timeoutSeconds) : ue.timeoutSeconds, ue.announce = $.announce === !0 || $.deliver === !0, ue.bestEffortDeliver = $.bestEffortDeliver === !0, ue.deleteAfterRun = $.deleteAfterRun === !0, ue;
    }
    function U(M) {
      return M === !0 ? s.label("已开启", "Enabled") : M === !1 ? s.label("已关闭", "Disabled") : s.label("未知", "Unknown");
    }
    function T(M) {
      const $ = String(M.status || "").trim().toLowerCase();
      if (!$) return M.enabled ? s.label("已启用", "Enabled") : s.label("已停用", "Disabled");
      const me = {
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
      }[$];
      return me ? s.label(me.zh, me.en) : $;
    }
    function w(M) {
      const $ = String(M.status || "").trim().toLowerCase();
      return ["running", "success", "completed", "enabled"].includes($) ? "pill--success" : ["queued", "pending", "paused", "disabled"].includes($) || M.enabled === !1 ? "pill--warning" : ["failed", "error"].includes($) ? "pill--danger" : M.enabled ? "pill--info" : "pill--warning";
    }
    function S() {
      return f.scheduleMode === "every" ? "10m / 1h" : f.scheduleMode === "at" ? "2026-03-20T09:00:00+08:00" : "0 9 * * *";
    }
    function R() {
      return {
        name: f.name.trim() || void 0,
        description: f.description.trim() || void 0,
        agentId: f.agentId.trim() || void 0,
        prompt: f.prompt.trim() || void 0,
        scheduleMode: f.scheduleMode,
        scheduleValue: f.scheduleValue.trim(),
        enabled: f.enabled,
        timezone: f.timezone.trim() || void 0,
        model: f.model.trim() || void 0,
        thinking: f.thinking || void 0,
        session: f.session || void 0,
        wake: f.wake || void 0,
        timeoutSeconds: nn(f.timeoutSeconds),
        stagger: f.stagger.trim() || void 0,
        announce: f.announce,
        bestEffortDeliver: f.bestEffortDeliver,
        deleteAfterRun: f.deleteAfterRun
      };
    }
    async function Z() {
      await h.execute({ silent: !!h.data.value });
    }
    function ie(M, $) {
      p.value = {
        tone: $,
        message: M.message,
        detail: M.output,
        at: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    async function _e(M, $ = !1) {
      const A = M.success ? "success" : "error";
      ie(M, A), l.pushToast({
        tone: A,
        message: M.message
      }), M.success && $ && P(), await Z();
    }
    async function ye() {
      const M = c.value === "edit" ? "update" : "create";
      d.value = M;
      try {
        const $ = R(), A = c.value === "edit" ? await If({ jobId: u.value, ...$ }) : await Mf($);
        await _e(A, A.success);
      } catch ($) {
        const A = $ instanceof Error ? $.message : String($);
        p.value = {
          tone: "error",
          message: A,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }, l.pushToast({
          tone: "error",
          message: A
        });
      } finally {
        d.value = "";
      }
    }
    function Ie(M) {
      c.value = "edit", u.value = M.id, O(H(M));
    }
    async function Te(M, $) {
      if (M === "remove" && !await l.confirm({
        title: s.label("删除 Cron 任务", "Delete cron job"),
        message: s.label(`确认删除任务 ${$.id}？`, `Delete cron job ${$.id}?`),
        confirmLabel: s.label("确认删除", "Delete job"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))
        return;
      const A = `${M}:${$.id}`;
      d.value = A;
      try {
        const me = M === "run" ? await Ff($.id) : M === "enable" ? await Nf($.id) : M === "disable" ? await Df($.id) : await Lf($.id);
        await _e(me, M === "remove" && c.value === "edit" && u.value === $.id);
      } catch (me) {
        const ue = me instanceof Error ? me.message : String(me);
        p.value = {
          tone: "error",
          message: ue,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }, l.pushToast({
          tone: "error",
          message: ue
        });
      } finally {
        d.value = "";
      }
    }
    return (M, $) => (v(), y("div", Uf, [
      n("header", Vf, [
        n("div", null, [
          n("p", Bf, o(a(s).label("Cron / Fourth slice", "Cron / Fourth slice")), 1),
          n("h2", Gf, o(a(s).label("自动化任务", "Automation jobs")), 1),
          n("p", Hf, o(a(s).label("把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。", "Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: Z
        }, o(a(h).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新任务状态", "Refresh jobs")), 1)
      ]),
      a(h).loading && !a(h).data ? (v(), y("div", Wf, o(a(s).label("正在读取 Cron 状态与任务列表…", "Loading cron status and jobs…")), 1)) : a(h).error && !a(h).data ? (v(), y("div", Kf, o(a(h).error), 1)) : a(h).data ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(s).label("运行概览", "Runtime overview"),
          eyebrow: "Overview"
        }, {
          default: oe(() => [
            n("div", jf, [
              n("article", zf, [
                n("p", qf, o(a(s).label("任务总数", "Jobs")), 1),
                n("strong", null, o(a(fe)(a(h).data.jobs.length)) + " / " + o(a(fe)(a(h).data.total)), 1),
                n("span", null, o(a(s).label("当前已加载任务 / 运行态汇总总量", "Loaded jobs / runtime total")), 1)
              ]),
              n("article", Jf, [
                n("p", Qf, o(a(s).label("已启用", "Enabled")), 1),
                n("strong", null, o(a(fe)(_.value.length)), 1),
                n("span", null, o(a(s).label("这些任务会按计划自动执行", "These jobs run on their schedule")), 1)
              ]),
              n("article", Yf, [
                n("p", Xf, o(a(s).label("已停用", "Disabled")), 1),
                n("strong", null, o(a(fe)(D.value.length)), 1),
                n("span", null, o(a(s).label("停用后仍会保留，之后可以重新开启", "Disabled jobs stay available and can be resumed later")), 1)
              ]),
              n("article", Zf, [
                n("p", ep, o(a(s).label("调度器状态", "Scheduler")), 1),
                n("strong", null, o(U(a(h).data.status.enabled)), 1),
                n("span", null, o(a(h).data.status.schedulerNextWakeAt ? a(Ze)(a(h).data.status.schedulerNextWakeAt) : a(h).data.status.storePath || a(s).label("暂未返回调度器路径", "No scheduler path reported yet")), 1)
              ]),
              n("article", tp, [
                n("p", sp, o(a(s).label("运行态任务数", "Runtime job count")), 1),
                n("strong", null, o(a(fe)(a(h).data.status.jobsCount)), 1),
                n("span", null, o(a(s).label("来自 openclaw cron status 的运行态统计", "Reported directly by openclaw cron status")), 1)
              ]),
              n("article", np, [
                n("p", lp, o(a(s).label("分页窗口", "Pagination window")), 1),
                n("strong", null, o(a(fe)(a(h).data.offset)) + " / " + o(a(fe)(a(h).data.limit)), 1),
                n("span", null, o(a(h).data.hasMore ? a(s).label(`还有更多任务未加载，nextOffset=${a(h).data.nextOffset ?? "-"}`, `More jobs remain, nextOffset=${a(h).data.nextOffset ?? "-"}`) : a(s).label("当前页已经完整", "The current page is complete")), 1)
              ])
            ]),
            a(h).error ? (v(), y("div", ap, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(h).error), 1)) : we("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        p.value ? (v(), ht(re, {
          key: 0,
          title: a(s).label("最近一次任务操作", "Latest task action"),
          eyebrow: "Action"
        }, {
          default: oe(() => [
            n("div", {
              class: he(["status-banner", p.value.tone === "success" ? "status-banner--success" : "status-banner--error"])
            }, [
              n("strong", null, o(p.value.message), 1),
              n("span", null, o(a(Ze)(p.value.at)), 1)
            ], 2),
            p.value.detail ? (v(), y("pre", ip, o(p.value.detail), 1)) : we("", !0)
          ]),
          _: 1
        }, 8, ["title"])) : we("", !0),
        a(h).data.warnings.length || a(h).data.hasMore ? (v(), ht(re, {
          key: 1,
          title: a(s).label("当前提醒", "Current warnings"),
          eyebrow: "Warnings"
        }, {
          default: oe(() => [
            n("div", op, [
              (v(!0), y(J, null, ve(a(h).data.warnings, (A) => (v(), y("article", {
                key: A,
                class: "risk-row"
              }, [
                n("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                n("span", null, o(A), 1)
              ]))), 128)),
              a(h).data.hasMore ? (v(), y("article", rp, [
                n("strong", null, o(a(s).label("尚未完整加载", "More jobs exist")), 1),
                n("span", null, o(a(s).label(`当前只拉取到 ${a(h).data.jobs.length} 条任务，运行态汇总显示总量为 ${a(h).data.total}。`, `Only ${a(h).data.jobs.length} jobs are loaded while the runtime reports ${a(h).data.total} in total.`)), 1)
              ])) : we("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"])) : we("", !0),
        n("div", cp, [
          X(re, {
            title: c.value === "edit" ? a(s).label(`编辑任务 ${u.value}`, `Edit ${u.value}`) : a(s).label("新建 Cron 任务", "Create cron job"),
            eyebrow: "Editor"
          }, {
            default: oe(() => [
              n("div", up, [
                n("p", dp, o(a(s).label("这里直接复用现有的 cron-ui 接口，所以保存后的任务会立即回到同一套运行态里，不会产生第二套自动化系统。", "This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system.")), 1),
                n("span", {
                  class: he(["pill", c.value === "edit" ? "pill--warning" : "pill--success"])
                }, o(c.value === "edit" ? a(s).label("编辑模式", "Edit mode") : a(s).label("创建模式", "Create mode")), 3)
              ]),
              n("form", {
                class: "page-form-stack",
                onSubmit: bn(ye, ["prevent"])
              }, [
                n("div", fp, [
                  n("label", pp, [
                    n("span", null, o(a(s).label("任务名称", "Job name")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": $[0] || ($[0] = (A) => f.name = A),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：每日汇总", "Example: Daily brief")
                    }, null, 8, hp), [
                      [Fe, f.name]
                    ])
                  ]),
                  n("label", _p, [
                    n("span", null, o(a(s).label("Agent ID", "Agent ID")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": $[1] || ($[1] = (A) => f.agentId = A),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：task-hub", "Example: task-hub")
                    }, null, 8, gp), [
                      [Fe, f.agentId]
                    ])
                  ]),
                  n("label", mp, [
                    n("span", null, o(a(s).label("调度类型", "Schedule mode")), 1),
                    Se(n("select", {
                      "onUpdate:modelValue": $[2] || ($[2] = (A) => f.scheduleMode = A),
                      class: "settings-input"
                    }, [...$[21] || ($[21] = [
                      n("option", { value: "cron" }, "cron", -1),
                      n("option", { value: "every" }, "every", -1),
                      n("option", { value: "at" }, "at", -1)
                    ])], 512), [
                      [ct, f.scheduleMode]
                    ])
                  ]),
                  n("label", bp, [
                    n("span", null, o(a(s).label("调度值", "Schedule value")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": $[3] || ($[3] = (A) => f.scheduleValue = A),
                      class: "settings-input",
                      type: "text",
                      placeholder: S()
                    }, null, 8, vp), [
                      [Fe, f.scheduleValue]
                    ]),
                    n("small", null, o(a(s).label("cron 用 5 段表达式；every 例如 10m / 1h；at 支持 ISO 时间或 +20m。", "Use a 5-field cron expression, 10m / 1h for every, or ISO time / +20m for at.")), 1)
                  ]),
                  n("label", yp, [
                    n("span", null, o(a(s).label("时区", "Timezone")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": $[4] || ($[4] = (A) => f.timezone = A),
                      class: "settings-input",
                      type: "text",
                      placeholder: "Asia/Shanghai"
                    }, null, 512), [
                      [Fe, f.timezone]
                    ])
                  ]),
                  n("label", wp, [
                    n("span", null, o(a(s).label("会话模式", "Session mode")), 1),
                    Se(n("select", {
                      "onUpdate:modelValue": $[5] || ($[5] = (A) => f.session = A),
                      class: "settings-input"
                    }, [...$[22] || ($[22] = [
                      n("option", { value: "main" }, "main", -1),
                      n("option", { value: "isolated" }, "isolated", -1)
                    ])], 512), [
                      [ct, f.session]
                    ])
                  ]),
                  n("label", $p, [
                    n("span", null, o(a(s).label("模型覆盖", "Model override")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": $[6] || ($[6] = (A) => f.model = A),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("留空则使用 Agent 默认模型", "Leave blank to use the agent default")
                    }, null, 8, kp), [
                      [Fe, f.model]
                    ])
                  ]),
                  n("label", Sp, [
                    n("span", null, o(a(s).label("Thinking 等级", "Thinking level")), 1),
                    Se(n("select", {
                      "onUpdate:modelValue": $[7] || ($[7] = (A) => f.thinking = A),
                      class: "settings-input"
                    }, [
                      n("option", Cp, o(a(s).label("跟随默认", "Use default")), 1),
                      $[23] || ($[23] = n("option", { value: "off" }, "off", -1)),
                      $[24] || ($[24] = n("option", { value: "minimal" }, "minimal", -1)),
                      $[25] || ($[25] = n("option", { value: "low" }, "low", -1)),
                      $[26] || ($[26] = n("option", { value: "medium" }, "medium", -1)),
                      $[27] || ($[27] = n("option", { value: "high" }, "high", -1))
                    ], 512), [
                      [ct, f.thinking]
                    ])
                  ]),
                  n("label", xp, [
                    n("span", null, o(a(s).label("唤醒时机", "Wake mode")), 1),
                    Se(n("select", {
                      "onUpdate:modelValue": $[8] || ($[8] = (A) => f.wake = A),
                      class: "settings-input"
                    }, [...$[28] || ($[28] = [
                      n("option", { value: "now" }, "now", -1),
                      n("option", { value: "next-heartbeat" }, "next-heartbeat", -1)
                    ])], 512), [
                      [ct, f.wake]
                    ])
                  ]),
                  n("label", Rp, [
                    n("span", null, o(a(s).label("超时（秒）", "Timeout (seconds)")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": $[9] || ($[9] = (A) => f.timeoutSeconds = A),
                      class: "settings-input",
                      type: "number",
                      min: "1",
                      placeholder: "30"
                    }, null, 512), [
                      [Fe, f.timeoutSeconds]
                    ])
                  ]),
                  n("label", Ep, [
                    n("span", null, o(a(s).label("错峰", "Stagger")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": $[10] || ($[10] = (A) => f.stagger = A),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：5m，填 0 表示精确执行", "Example: 5m, use 0 for exact timing")
                    }, null, 8, Ap), [
                      [Fe, f.stagger]
                    ])
                  ]),
                  n("label", Tp, [
                    n("span", null, o(a(s).label("任务消息", "Prompt")), 1),
                    Se(n("textarea", {
                      "onUpdate:modelValue": $[11] || ($[11] = (A) => f.prompt = A),
                      class: "settings-textarea",
                      placeholder: a(s).label("例如：汇总今天的新线索并输出为 Markdown。", "Example: Summarize today’s new leads in Markdown.")
                    }, null, 8, Pp), [
                      [Fe, f.prompt]
                    ])
                  ]),
                  n("label", Op, [
                    n("span", null, o(a(s).label("描述", "Description")), 1),
                    Se(n("textarea", {
                      "onUpdate:modelValue": $[12] || ($[12] = (A) => f.description = A),
                      class: "settings-textarea",
                      placeholder: a(s).label("可选，用来解释这个任务的用途。", "Optional note explaining what this job is for.")
                    }, null, 8, Mp), [
                      [Fe, f.description]
                    ])
                  ])
                ]),
                n("div", Ip, [
                  n("label", Np, [
                    Se(n("input", {
                      "onUpdate:modelValue": $[13] || ($[13] = (A) => f.enabled = A),
                      type: "checkbox"
                    }, null, 512), [
                      [as, f.enabled]
                    ]),
                    n("div", Dp, [
                      n("strong", null, o(a(s).label("保存后立即启用", "Enable after save")), 1),
                      n("p", null, o(a(s).label("关闭时任务会保留，但不会按计划自动执行。", "When disabled, the job stays available but will not run automatically.")), 1)
                    ])
                  ]),
                  n("label", Fp, [
                    Se(n("input", {
                      "onUpdate:modelValue": $[14] || ($[14] = (A) => f.announce = A),
                      type: "checkbox"
                    }, null, 512), [
                      [as, f.announce]
                    ]),
                    n("div", Lp, [
                      n("strong", null, o(a(s).label("投递结果", "Deliver output")), 1),
                      n("p", null, o(a(s).label("执行完成后尝试把结果投递回会话或目标通道。", "Try to deliver the result back to the session or target channel after execution.")), 1)
                    ])
                  ]),
                  n("label", Up, [
                    Se(n("input", {
                      "onUpdate:modelValue": $[15] || ($[15] = (A) => f.bestEffortDeliver = A),
                      type: "checkbox"
                    }, null, 512), [
                      [as, f.bestEffortDeliver]
                    ]),
                    n("div", Vp, [
                      n("strong", null, o(a(s).label("尽力投递", "Best effort deliver")), 1),
                      n("p", null, o(a(s).label("当目标暂时不可用时，尽量保留或稍后交付结果。", "Keep or retry delivery when the target is temporarily unavailable.")), 1)
                    ])
                  ]),
                  n("label", Bp, [
                    Se(n("input", {
                      "onUpdate:modelValue": $[16] || ($[16] = (A) => f.deleteAfterRun = A),
                      type: "checkbox"
                    }, null, 512), [
                      [as, f.deleteAfterRun]
                    ]),
                    n("div", Gp, [
                      n("strong", null, o(a(s).label("运行后删除", "Delete after run")), 1),
                      n("p", null, o(a(s).label("适合一次性任务；普通巡检或日报不建议开启。", "Useful for one-off jobs. Leave it off for recurring inspections or briefs.")), 1)
                    ])
                  ])
                ])
              ], 32),
              n("div", Hp, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: d.value === "create" || d.value === "update",
                  onClick: ye
                }, o(d.value === "create" || d.value === "update" ? a(s).label("保存中…", "Saving…") : c.value === "edit" ? a(s).label("保存修改", "Save changes") : a(s).label("创建任务", "Create job")), 9, Wp),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  onClick: P
                }, o(c.value === "edit" ? a(s).label("切回创建模式", "Switch to create mode") : a(s).label("重置表单", "Reset form")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(s).label("任务列表", "Job list"),
            eyebrow: "Jobs"
          }, {
            default: oe(() => [
              n("div", Kp, [
                n("label", jp, [
                  n("span", null, o(a(s).label("搜索", "Search")), 1),
                  Se(n("input", {
                    "onUpdate:modelValue": $[17] || ($[17] = (A) => i.value = A),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(s).label("搜索任务名、Agent、调度表达式", "Search by name, agent, or schedule")
                  }, null, 8, zp), [
                    [Fe, i.value]
                  ])
                ])
              ]),
              n("div", qp, [
                n("button", {
                  class: he(["pill-button", { "pill-button--active": r.value === "all" }]),
                  type: "button",
                  onClick: $[18] || ($[18] = (A) => r.value = "all")
                }, o(a(s).label(`全部 (${m.value.length})`, `All (${m.value.length})`)), 3),
                n("button", {
                  class: he(["pill-button", { "pill-button--active": r.value === "enabled" }]),
                  type: "button",
                  onClick: $[19] || ($[19] = (A) => r.value = "enabled")
                }, o(a(s).label(`启用中 (${_.value.length})`, `Enabled (${_.value.length})`)), 3),
                n("button", {
                  class: he(["pill-button", { "pill-button--active": r.value === "disabled" }]),
                  type: "button",
                  onClick: $[20] || ($[20] = (A) => r.value = "disabled")
                }, o(a(s).label(`已停用 (${D.value.length})`, `Disabled (${D.value.length})`)), 3)
              ]),
              E.value.length ? (v(), y("div", Jp, [
                (v(!0), y(J, null, ve(E.value, (A) => (v(), y("article", {
                  key: A.id,
                  class: "provider-card"
                }, [
                  n("header", Qp, [
                    n("div", null, [
                      n("strong", null, o(A.name || A.id), 1),
                      n("p", null, o(`${A.id} · ${A.agentId}`), 1)
                    ]),
                    n("span", {
                      class: he(["pill", w(A)])
                    }, o(T(A)), 3)
                  ]),
                  n("div", Yp, [
                    n("div", Xp, [
                      n("strong", null, o(a(s).label("调度", "Schedule")), 1),
                      n("p", null, o(A.schedule || "-"), 1)
                    ]),
                    n("div", Zp, [
                      n("strong", null, o(a(s).label("任务消息", "Prompt")), 1),
                      n("p", null, o(A.prompt || "-"), 1)
                    ]),
                    n("div", eh, [
                      n("strong", null, o(a(s).label("最近执行", "Last run")), 1),
                      n("p", null, o(a(Ze)(A.lastRunAt)), 1),
                      n("p", null, o(a(s).label("下次执行：", "Next run: ")) + o(a(Ze)(A.nextRunAt)), 1)
                    ])
                  ]),
                  n("div", th, [
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (me) => Ie(A)
                    }, o(a(s).label("编辑", "Edit")), 9, sh),
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      disabled: d.value === `run:${A.id}`,
                      onClick: (me) => Te("run", A)
                    }, o(d.value === `run:${A.id}` ? a(s).label("执行中…", "Running…") : a(s).label("立即运行", "Run now")), 9, nh),
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      disabled: d.value === `enable:${A.id}` || d.value === `disable:${A.id}`,
                      onClick: (me) => Te(A.enabled ? "disable" : "enable", A)
                    }, o(d.value === `enable:${A.id}` || d.value === `disable:${A.id}` ? a(s).label("处理中…", "Working…") : A.enabled ? a(s).label("停用", "Disable") : a(s).label("启用", "Enable")), 9, lh),
                    n("button", {
                      class: "inline-link inline-link--danger",
                      type: "button",
                      disabled: d.value === `remove:${A.id}`,
                      onClick: (me) => Te("remove", A)
                    }, o(d.value === `remove:${A.id}` ? a(s).label("删除中…", "Deleting…") : a(s).label("删除", "Delete")), 9, ah)
                  ])
                ]))), 128))
              ])) : (v(), y("div", ih, o(a(s).label("当前筛选条件下没有匹配的任务。", "No cron jobs match the current filters.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64)) : we("", !0)
    ]));
  }
});
async function rh() {
  const [e, t, s, l] = await Promise.all([
    Ee("/api/info"),
    Ee("/api/dashboard/overview"),
    Ee("/api/service/status"),
    Ee("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: s, openclaw: l };
}
async function ch() {
  const [e, t] = await Promise.all([
    Ee("/api/service/status"),
    Ee("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function uh() {
  const [e, t] = await Promise.all([
    Ee("/api/openclaw/status"),
    Ee("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const dh = { class: "page-stack" }, fh = { class: "page-header" }, ph = { class: "page-header__eyebrow" }, hh = { class: "page-header__title" }, _h = { class: "page-header__description" }, gh = {
  key: 0,
  class: "page-empty"
}, mh = {
  key: 1,
  class: "page-empty page-empty--error"
}, bh = { class: "stat-grid" }, vh = { class: "stat-card" }, yh = { class: "stat-card" }, wh = { class: "stat-card" }, $h = { class: "stat-card__label" }, kh = { class: "list-stack" }, Sh = { class: "action-row" }, Ch = { class: "action-row" }, xh = {
  class: "inline-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, Rh = {
  key: 0,
  class: "list-stack"
}, Eh = {
  key: 1,
  class: "muted-copy"
}, Ah = /* @__PURE__ */ Le({
  __name: "DashboardPage",
  setup(e) {
    const t = et(), s = nt(() => rh()), l = ae(() => {
      var r, c;
      const i = (c = (r = s.data) == null ? void 0 : r.overview) == null ? void 0 : c.risks;
      return Array.isArray(i) ? i : [];
    });
    return (i, r) => (v(), y("div", dh, [
      n("header", fh, [
        n("div", null, [
          n("p", ph, o(a(t).label("首页 / First slice", "Home / First slice")), 1),
          n("h2", hh, o(a(t).label("带路首页", "Guided Home")), 1),
          n("p", _h, o(a(t).label("先回答现在能不能用、下一步该做什么，以及哪里可能有风险。", "Answer what works now, what to do next, and where risk still exists.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (c) => a(s).execute({ silent: !0 }))
        }, o(a(s).refreshing ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新", "Refresh")), 1)
      ]),
      a(s).loading ? (v(), y("div", gh, o(a(t).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : a(s).error ? (v(), y("div", mh, o(a(s).error), 1)) : a(s).data ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(t).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: oe(() => {
            var c, u, d, p, h, f, m, _, D, E;
            return [
              n("div", bh, [
                n("article", vh, [
                  r[1] || (r[1] = n("p", { class: "stat-card__label" }, "Guard", -1)),
                  n("strong", null, o(((c = a(s).data.info) == null ? void 0 : c.guardVersion) || "unknown"), 1),
                  n("span", null, o(((u = a(s).data.info) == null ? void 0 : u.platform) || "unknown platform"), 1)
                ]),
                n("article", yh, [
                  r[2] || (r[2] = n("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  n("strong", null, o((p = (d = a(s).data.info) == null ? void 0 : d.openclaw) != null && p.installed ? ((f = (h = a(s).data.info) == null ? void 0 : h.openclaw) == null ? void 0 : f.version) || "installed" : a(t).label("未安装", "Not installed")), 1),
                  n("span", null, o(((_ = (m = a(s).data.info) == null ? void 0 : m.openclaw) == null ? void 0 : _.detectedSource) || a(t).label("待检测", "Pending detection")), 1)
                ]),
                n("article", wh, [
                  n("p", $h, o(a(t).label("Node 运行时", "Node runtime")), 1),
                  n("strong", null, o(((D = a(s).data.info) == null ? void 0 : D.nodeVersion) || "unknown"), 1),
                  n("span", null, o(((E = a(s).data.info) == null ? void 0 : E.user) || a(t).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(t).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: oe(() => [
            n("div", kh, [
              n("article", Sh, [
                n("div", null, [
                  n("h3", null, o(a(t).label("继续迁移首页 / 运维 / OpenClaw", "Keep migrating Home / Operations / OpenClaw")), 1),
                  n("p", null, o(a(t).label("这一版 Vue 壳层已经接上真实 API，下一批继续迁移渠道、模型、安全、备份与恢复。", "This Vue shell already talks to real APIs; next we migrate Channels, Models, Security, and Recovery.")), 1)
                ]),
                X(a($l), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: oe(() => [
                    ml(o(a(t).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              n("article", Ch, [
                n("div", null, [
                  n("h3", null, o(a(t).label("保持旧控制台可用", "Keep the legacy console available")), 1),
                  n("p", null, o(a(t).label("新壳层目前是开发线入口，不替换正式运行时。需要完整能力时仍可打开当前正式控制台。", "The new shell is a dev-line entry for now and does not replace the production runtime yet.")), 1)
                ]),
                n("a", xh, o(a(t).label("打开正式控制台", "Open production console")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(t).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: oe(() => [
            l.value.length ? (v(), y("div", Rh, [
              (v(!0), y(J, null, ve(l.value, (c, u) => (v(), y("article", {
                key: `${c.title}-${u}`,
                class: "risk-row"
              }, [
                n("strong", null, o(c.title || a(t).label("未命名风险", "Unnamed risk")), 1),
                n("span", null, o(c.detail || a(t).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (v(), y("p", Eh, o(a(t).label("当前 API 未返回结构化风险列表，因此这里先显示为安全占位。后续页面迁移时会继续精炼。", "The current API did not return structured risks, so this section stays intentionally lightweight for the first scaffold.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : we("", !0)
    ]));
  }
}), Th = {
  class: "page-tabs",
  role: "tablist"
}, Ph = ["aria-selected", "onClick"], Oh = { key: 0 }, $n = /* @__PURE__ */ Le({
  __name: "PageTabs",
  props: {
    items: {},
    activeId: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const s = t;
    return (l, i) => (v(), y("div", Th, [
      (v(!0), y(J, null, ve(e.items, (r) => (v(), y("button", {
        key: r.id,
        class: he(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
        type: "button",
        role: "tab",
        "aria-selected": r.id === e.activeId,
        onClick: (c) => s("change", r.id)
      }, [
        n("span", null, o(r.label), 1),
        r.hint ? (v(), y("small", Oh, o(r.hint), 1)) : we("", !0)
      ], 10, Ph))), 128))
    ]));
  }
});
function Mh(e) {
  const t = new URLSearchParams();
  e && t.set("path", e);
  const s = t.size ? `?${t.toString()}` : "";
  return Ee(`/api/files${s}`);
}
function Pa(e) {
  const t = new URLSearchParams({ path: e });
  return Ee(`/api/files/content?${t.toString()}`);
}
function Ih(e, t) {
  return Ne("/api/files/content", {
    path: e,
    content: t
  });
}
function Nh(e, t, s) {
  return Ne("/api/files/create", {
    parentPath: e,
    name: t,
    kind: s
  });
}
function Dh() {
  return Ee("/api/memory");
}
function el(e) {
  const t = String(e || "").replace(/\\/g, "/"), s = t.split("/").pop() || "";
  return ["SOUL.md", "USER.md", "AGENTS.md", "MEMORY.md"].includes(s) ? !0 : /\/memory\/.+\.md$/i.test(t);
}
function As(e) {
  const t = String(e || "").replace(/[\\/]+$/, "");
  if (!t) return "";
  const s = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return s >= 0 ? t.slice(0, s) : "";
}
const Sl = /* @__PURE__ */ vl("workspace", () => {
  const e = /* @__PURE__ */ Q("all"), t = /* @__PURE__ */ Q(""), s = /* @__PURE__ */ Q(""), l = /* @__PURE__ */ Q(""), i = /* @__PURE__ */ Q("all"), r = /* @__PURE__ */ Q(""), c = /* @__PURE__ */ Q(""), u = /* @__PURE__ */ Q(null);
  function d(O) {
    e.value = O;
  }
  function p(O) {
    t.value = O;
  }
  function h(O) {
    s.value = O, O && (t.value = As(O) || t.value);
  }
  function f(O) {
    l.value = O;
  }
  function m(O) {
    i.value = O;
  }
  function _(O) {
    r.value = O;
  }
  function D(O) {
    c.value = O;
  }
  function E(O) {
    const P = el(O) ? "memory" : "all";
    u.value = {
      path: O,
      mode: P,
      parentPath: As(O)
    }, e.value = P, P === "memory" ? l.value = O : (s.value = O, t.value = As(O) || t.value);
  }
  function z() {
    const O = u.value;
    return u.value = null, O;
  }
  return {
    mode: e,
    currentPath: t,
    selectedFilePath: s,
    selectedMemoryFilePath: l,
    memoryKindFilter: i,
    memoryFilterQuery: r,
    searchQuery: c,
    pendingReveal: u,
    setMode: d,
    setCurrentPath: p,
    setSelectedFilePath: h,
    setSelectedMemoryFilePath: f,
    setMemoryKindFilter: m,
    setMemoryFilterQuery: _,
    setSearchQuery: D,
    requestReveal: E,
    consumeReveal: z
  };
}), Fh = { class: "page-stack" }, Lh = { class: "page-header" }, Uh = { class: "page-header__eyebrow" }, Vh = { class: "page-header__title" }, Bh = { class: "page-header__description" }, Gh = {
  key: 0,
  class: "page-empty"
}, Hh = {
  key: 1,
  class: "page-empty page-empty--error"
}, Wh = { class: "stat-grid" }, Kh = { class: "stat-card" }, jh = { class: "stat-card__label" }, zh = { class: "stat-card" }, qh = { class: "stat-card__label" }, Jh = { class: "stat-card" }, Qh = { class: "stat-card__label" }, Yh = { class: "stat-card" }, Xh = { class: "stat-card__label" }, Zh = { class: "page-two-column" }, e_ = { class: "list-stack" }, t_ = { class: "catalog-list" }, s_ = ["onClick"], n_ = { class: "catalog-list__title" }, l_ = { class: "pill-row" }, a_ = { class: "pill pill--info" }, i_ = { class: "mini-list" }, o_ = { class: "mini-list__item mini-list__item--stack" }, r_ = { class: "page-actions" }, c_ = ["disabled"], u_ = { class: "create-row" }, d_ = { value: "file" }, f_ = { value: "directory" }, p_ = ["placeholder", "onKeydown"], h_ = ["disabled"], __ = {
  key: 0,
  class: "directory-list"
}, g_ = ["onClick"], m_ = { class: "entry-button__title" }, b_ = { class: "pill-row" }, v_ = { class: "pill pill--muted" }, y_ = {
  key: 1,
  class: "page-empty"
}, w_ = {
  key: 0,
  class: "page-empty"
}, $_ = { class: "mini-list" }, k_ = { class: "mini-list__item mini-list__item--stack" }, S_ = { key: 0 }, C_ = { class: "page-actions" }, x_ = ["disabled"], R_ = {
  key: 2,
  class: "page-empty"
}, E_ = { class: "stat-grid" }, A_ = { class: "stat-card" }, T_ = { class: "stat-card__label" }, P_ = { class: "stat-card" }, O_ = { class: "stat-card__label" }, M_ = { class: "stat-card" }, I_ = { class: "stat-card__label" }, N_ = { class: "stat-card" }, D_ = { class: "stat-card__label" }, F_ = { class: "page-two-column" }, L_ = { class: "settings-field" }, U_ = ["value", "placeholder"], V_ = { class: "pill-row" }, B_ = ["onClick"], G_ = { class: "muted-copy" }, H_ = {
  key: 0,
  class: "page-empty"
}, W_ = {
  key: 1,
  class: "provider-stack"
}, K_ = { class: "provider-card__header" }, j_ = { key: 0 }, z_ = { class: "pill-row" }, q_ = { class: "pill pill--info" }, J_ = { class: "pill pill--muted" }, Q_ = { class: "pill pill--muted" }, Y_ = { class: "directory-list" }, X_ = ["onClick"], Z_ = { class: "entry-button__title" }, eg = { class: "pill-row" }, tg = { class: "pill pill--muted" }, sg = {
  key: 2,
  class: "page-empty"
}, ng = {
  key: 0,
  class: "page-empty"
}, lg = { class: "mini-list" }, ag = { class: "mini-list__item mini-list__item--stack" }, ig = { class: "page-actions" }, og = ["disabled"], rg = {
  key: 2,
  class: "page-empty"
}, cg = /* @__PURE__ */ Le({
  __name: "FilesPage",
  setup(e) {
    const t = et(), s = gt(), l = Sl(), i = /* @__PURE__ */ Q(!0), r = /* @__PURE__ */ Q(!1), c = /* @__PURE__ */ Q(!1), u = /* @__PURE__ */ Q(!1), d = /* @__PURE__ */ Q(null), p = /* @__PURE__ */ Q(null), h = /* @__PURE__ */ Q(null), f = /* @__PURE__ */ Q([]), m = /* @__PURE__ */ Q(null), _ = /* @__PURE__ */ Q(""), D = /* @__PURE__ */ Q(""), E = /* @__PURE__ */ Q(null), z = /* @__PURE__ */ Q(""), O = /* @__PURE__ */ Q(""), P = /* @__PURE__ */ Q(!1), B = /* @__PURE__ */ Q(!1), H = /* @__PURE__ */ Q("file"), U = /* @__PURE__ */ Q(""), T = ae(() => [
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
    ]), w = ae(() => l.mode === "memory" ? p.value : d.value), S = ae(() => {
      var C;
      return ((C = h.value) == null ? void 0 : C.roots) || [];
    }), R = ae(() => {
      var C;
      return ((C = h.value) == null ? void 0 : C.entries) || [];
    }), Z = ae(() => {
      var C;
      return ((C = h.value) == null ? void 0 : C.currentPath) || l.currentPath;
    }), ie = ae(() => {
      var C;
      return ((C = h.value) == null ? void 0 : C.parentPath) || null;
    }), _e = ae(() => S.value.filter((C) => Z.value === C.path || Z.value.startsWith(`${C.path}\\`) || Z.value.startsWith(`${C.path}/`)).sort((C, L) => L.path.length - C.path.length)[0] || null), ye = ae(() => R.value.filter((C) => C.isDirectory).length), Ie = ae(() => R.value.length - ye.value), Te = ae(() => f.value), M = ae(() => {
      const C = l.memoryFilterQuery.trim().toLowerCase();
      return Te.value.filter((L) => l.memoryKindFilter !== "all" && me(L) !== l.memoryKindFilter ? !1 : C ? [
        L.agentId,
        L.type,
        L.relativePath,
        L.path
      ].join(" ").toLowerCase().includes(C) : !0).sort((L, x) => {
        const se = String(L.agentId || "").localeCompare(String(x.agentId || ""));
        if (se !== 0) return se;
        const ge = me(L).localeCompare(me(x));
        return ge !== 0 ? ge : K(L).localeCompare(K(x));
      });
    }), $ = ae(() => {
      var L;
      const C = /* @__PURE__ */ new Map();
      for (const x of M.value) {
        const se = String(x.agentId || "");
        C.has(se) || C.set(se, []), (L = C.get(se)) == null || L.push(x);
      }
      return Array.from(C.entries()).map(([x, se]) => ({
        agentId: x,
        label: W(x),
        files: se,
        docsCount: se.filter((ge) => me(ge) === "docs").length,
        notesCount: se.filter((ge) => me(ge) === "notes").length
      })).sort((x, se) => x.label.localeCompare(se.label));
    });
    function A(C) {
      return C.replace(/\r\n/g, `
`);
    }
    function me(C) {
      return C.type === "memory" ? "notes" : "docs";
    }
    function ue(C) {
      return C === "docs" ? t.label("核心文档", "Core docs") : C === "notes" ? t.label("记忆片段", "Memory notes") : t.label("全部", "All");
    }
    function W(C) {
      if (!C) return t.label("未分组", "Ungrouped");
      if (!C.startsWith("detected:")) return C;
      const L = C.slice(9) || "workspace";
      return t.label(`自动发现：${L}`, `Auto-detected: ${L}`);
    }
    function K(C) {
      if (C.type === "memory") {
        const L = C.relativePath.split(/[\\/]/);
        return L[L.length - 1] || C.relativePath;
      }
      return C.type;
    }
    function ne(C) {
      return C === "file" ? m.value !== null && A(_.value) !== D.value : E.value !== null && A(z.value) !== O.value;
    }
    async function ke(C) {
      if (!ne(C)) return !0;
      const L = C === "memory";
      return s.confirm({
        title: t.label(L ? "切换记忆文件" : "切换文件", L ? "Switch memory file" : "Switch file"),
        message: t.label(
          L ? "当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。" : "当前文件编辑器里有未保存修改，继续切换会丢失这些内容。",
          L ? "There are unsaved changes in the memory editor. Switching now discards them." : "There are unsaved changes in the file editor. Switching now discards them."
        ),
        confirmLabel: t.label("放弃并继续", "Discard and continue"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      });
    }
    async function Be(C, L = !1) {
      L || (r.value = !0), d.value = null;
      try {
        const x = await Mh(C);
        h.value = x, l.setCurrentPath(x.currentPath);
      } catch (x) {
        d.value = x instanceof Error ? x.message : String(x);
      } finally {
        r.value = !1;
      }
    }
    async function He(C = !1) {
      C || (c.value = !0), p.value = null;
      try {
        const L = await Dh();
        f.value = L.files || [];
      } catch (L) {
        p.value = L instanceof Error ? L.message : String(L);
      } finally {
        c.value = !1;
      }
    }
    async function I(C, L = !0) {
      if (L && !await ke("file")) return !1;
      u.value = !0;
      try {
        const x = await Pa(C);
        return m.value = x, _.value = x.content || "", D.value = A(x.content || ""), l.setSelectedFilePath(C), !0;
      } catch (x) {
        return s.pushToast({
          tone: "error",
          message: x instanceof Error ? x.message : String(x)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function le(C, L = !0) {
      if (L && !await ke("memory")) return !1;
      u.value = !0;
      try {
        const x = await Pa(C);
        return E.value = x, z.value = x.content || "", O.value = A(x.content || ""), l.setSelectedMemoryFilePath(C), !0;
      } catch (x) {
        return s.pushToast({
          tone: "error",
          message: x instanceof Error ? x.message : String(x)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function ee() {
      const C = l.currentPath || As(l.selectedFilePath) || void 0;
      await Be(C, !0), l.selectedFilePath && await I(l.selectedFilePath, !1);
    }
    async function ce() {
      await He(!0), l.selectedMemoryFilePath && await le(l.selectedMemoryFilePath, !1);
    }
    async function $e(C, L, x = !0) {
      if (L === "memory") {
        if (l.mode === "all" && x && !await ke("file")) return;
        l.setMode("memory"), await He(!0), C && await le(C, !1);
        return;
      }
      l.mode === "memory" && x && !await ke("memory") || (l.setMode("all"), await Be(As(C) || l.currentPath || void 0, !0), C && await I(C, !1));
    }
    async function g(C) {
      var se, ge;
      const L = C === "memory" ? "memory" : "all";
      if (L === l.mode) return;
      const x = L === "memory" ? l.selectedMemoryFilePath || ((se = E.value) == null ? void 0 : se.path) || "" : l.selectedFilePath || ((ge = m.value) == null ? void 0 : ge.path) || "";
      await $e(x, L, !0), L === "all" && !x && (l.setMode("all"), await Be(l.currentPath || void 0, !0)), L === "memory" && !x && (l.setMode("memory"), await He(!0));
    }
    async function b(C) {
      if (C.isDirectory) {
        if (!await ke("file")) return;
        m.value = null, _.value = "", D.value = "", l.setSelectedFilePath(""), await Be(C.path);
        return;
      }
      await I(C.path, !0);
    }
    async function k(C) {
      await ke("file") && (m.value = null, _.value = "", D.value = "", l.setSelectedFilePath(""), await Be(C));
    }
    async function N() {
      ie.value && await ke("file") && (m.value = null, _.value = "", D.value = "", l.setSelectedFilePath(""), await Be(ie.value));
    }
    async function V() {
      await Be(Z.value || void 0, !0);
    }
    async function F() {
      var C;
      (C = m.value) != null && C.path && await I(m.value.path, !0);
    }
    async function Y() {
      var C;
      (C = E.value) != null && C.path && await le(E.value.path, !0);
    }
    async function q(C) {
      const L = C === "file" ? m.value : E.value, x = C === "file" ? _.value : z.value;
      if (L != null && L.path) {
        P.value = !0;
        try {
          const se = await Ih(L.path, x);
          s.pushToast({
            tone: se.success ? "success" : "error",
            message: se.message
          }), se.success && (C === "file" ? (D.value = A(x), m.value && (m.value.content = x), await Be(Z.value || void 0, !0)) : (O.value = A(x), E.value && (E.value.content = x), await He(!0)));
        } catch (se) {
          s.pushToast({
            tone: "error",
            message: se instanceof Error ? se.message : String(se)
          });
        } finally {
          P.value = !1;
        }
      }
    }
    async function j() {
      const C = Z.value;
      if (!C) return;
      const L = U.value.trim();
      if (!L) {
        s.pushToast({
          tone: "warning",
          message: t.label("请输入要创建的文件名或目录名。", "Enter the file or directory name first.")
        });
        return;
      }
      B.value = !0;
      try {
        const x = await Nh(C, L, H.value);
        s.pushToast({
          tone: x.success ? "success" : "error",
          message: x.message
        }), x.success && (U.value = "", await Be(C, !0), H.value === "file" && x.path && await I(x.path, !1));
      } catch (x) {
        s.pushToast({
          tone: "error",
          message: x instanceof Error ? x.message : String(x)
        });
      } finally {
        B.value = !1;
      }
    }
    function G(C) {
      l.setMemoryKindFilter(C === "docs" || C === "notes" ? C : "all");
    }
    async function de() {
      var C;
      (C = E.value) != null && C.path && await $e(E.value.path, "all", !0);
    }
    async function te() {
      i.value = !0;
      const C = l.consumeReveal();
      if (C != null && C.path) {
        await $e(C.path, C.mode, !1), i.value = !1;
        return;
      }
      l.mode === "memory" ? await ce() : await ee(), i.value = !1;
    }
    return qt(() => {
      te();
    }), (C, L) => (v(), y("div", Fh, [
      n("header", Lh, [
        n("div", null, [
          n("p", Uh, o(a(t).label("文件 / Third slice", "Files / Third slice")), 1),
          n("h2", Vh, o(a(t).label("文件与记忆", "Files and memory")), 1),
          n("p", Bh, o(a(t).label("保留“全部文件”和“核心记忆”双视图，让搜索、角色工作区和实际编辑动作都能在新壳层里接得上。", "Keep both the All Files and Core Memory views so search results, role workspaces, and real editing actions can all land cleanly in the new shell.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: te
        }, o(i.value || r.value || c.value ? a(t).label("刷新中…", "Refreshing…") : a(t).label("Refresh", "Refresh")), 1)
      ]),
      X($n, {
        items: T.value,
        "active-id": a(l).mode,
        onChange: g
      }, null, 8, ["items", "active-id"]),
      i.value ? (v(), y("div", Gh, o(a(t).label("正在恢复文件视图…", "Restoring the workspace view…")), 1)) : w.value && (a(l).mode === "all" && !h.value || a(l).mode === "memory" && !f.value.length) ? (v(), y("div", Hh, o(w.value), 1)) : a(l).mode === "all" ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(t).label("当前目录概览", "Current directory overview"),
          eyebrow: "Summary"
        }, {
          default: oe(() => {
            var x, se, ge;
            return [
              n("div", Wh, [
                n("article", Kh, [
                  n("p", jh, o(a(t).label("受控根目录", "Managed roots")), 1),
                  n("strong", null, o(a(fe)(S.value.length)), 1),
                  n("span", null, o(((x = _e.value) == null ? void 0 : x.label) || a(t).label("当前正在受控范围内浏览", "Browsing inside the managed scope now")), 1)
                ]),
                n("article", zh, [
                  n("p", qh, o(a(t).label("当前目录内容", "Current entries")), 1),
                  n("strong", null, o(a(fe)(R.value.length)), 1),
                  n("span", null, o(`${a(fe)(ye.value)} ${a(t).label("个目录", "dirs")} / ${a(fe)(Ie.value)} ${a(t).label("个文件", "files")}`), 1)
                ]),
                n("article", Jh, [
                  n("p", Qh, o(a(t).label("当前打开文件", "Open file")), 1),
                  n("strong", null, o(m.value ? "1" : "0"), 1),
                  n("span", null, o(((se = m.value) == null ? void 0 : se.relativePath) || a(t).label("还没有打开文件", "No file opened yet")), 1)
                ]),
                n("article", Yh, [
                  n("p", Xh, o(a(t).label("当前路径", "Current path")), 1),
                  n("strong", null, o(((ge = _e.value) == null ? void 0 : ge.type) === "detected-workspace" ? a(t).label("自动发现", "Auto-detected") : a(t).label("受控目录", "Managed")), 1),
                  n("span", null, o(Z.value || a(t).label("等待路径返回", "Waiting for a resolved path")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        n("div", Zh, [
          X(re, {
            title: a(t).label("工作区浏览器", "Workspace browser"),
            eyebrow: "Browser"
          }, {
            default: oe(() => [
              n("div", e_, [
                n("div", t_, [
                  (v(!0), y(J, null, ve(S.value, (x) => (v(), y("button", {
                    key: x.id,
                    class: he(["catalog-list__item", { "catalog-list__item--active": Z.value === x.path || Z.value.startsWith(`${x.path}\\`) || Z.value.startsWith(`${x.path}/`) }]),
                    type: "button",
                    onClick: (se) => k(x.path)
                  }, [
                    n("div", n_, [
                      n("strong", null, o(x.label), 1)
                    ]),
                    n("div", l_, [
                      n("span", a_, o(x.type), 1)
                    ])
                  ], 10, s_))), 128))
                ]),
                n("div", i_, [
                  n("div", o_, [
                    n("strong", null, o(a(t).label("当前路径", "Current path")), 1),
                    n("p", null, o(Z.value || "-"), 1)
                  ])
                ]),
                n("div", r_, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: !ie.value,
                    onClick: N
                  }, o(a(t).label("返回上一级", "Go up")), 9, c_),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: V
                  }, o(r.value ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新目录", "Reload list")), 1)
                ]),
                n("div", u_, [
                  Se(n("select", {
                    "onUpdate:modelValue": L[0] || (L[0] = (x) => H.value = x),
                    class: "settings-input create-row__kind"
                  }, [
                    n("option", d_, o(a(t).label("文件", "File")), 1),
                    n("option", f_, o(a(t).label("目录", "Directory")), 1)
                  ], 512), [
                    [ct, H.value]
                  ]),
                  Se(n("input", {
                    "onUpdate:modelValue": L[1] || (L[1] = (x) => U.value = x),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(t).label("例如：README-local.md 或 drafts", "Example: README-local.md or drafts"),
                    onKeydown: Ic(bn(j, ["prevent"]), ["enter"])
                  }, null, 40, p_), [
                    [Fe, U.value]
                  ]),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: B.value,
                    onClick: j
                  }, o(B.value ? a(t).label("创建中…", "Creating…") : a(t).label("创建", "Create")), 9, h_)
                ]),
                R.value.length ? (v(), y("div", __, [
                  (v(!0), y(J, null, ve(R.value, (x) => {
                    var se;
                    return v(), y("button", {
                      key: x.path,
                      class: he(["entry-button", { "entry-button--active": ((se = m.value) == null ? void 0 : se.path) === x.path }]),
                      type: "button",
                      onClick: (ge) => b(x)
                    }, [
                      n("div", m_, [
                        n("strong", null, o(x.isDirectory ? `${a(t).label("[目录]", "[DIR]")} ${x.name}` : x.name), 1)
                      ]),
                      n("p", null, o(x.relativePath || x.path), 1),
                      n("div", b_, [
                        n("span", {
                          class: he(["pill", x.isDirectory ? "pill--info" : "pill--muted"])
                        }, o(x.isDirectory ? a(t).label("目录", "Directory") : a(Id)(x.size)), 3),
                        n("span", v_, o(a(Ze)(x.modifiedAt)), 1)
                      ])
                    ], 10, g_);
                  }), 128))
                ])) : (v(), y("div", y_, o(a(t).label("当前目录下还没有可展示内容。", "The current directory does not contain any visible entries yet.")), 1))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("文件编辑器", "File editor"),
            eyebrow: "Editor"
          }, {
            default: oe(() => [
              u.value ? (v(), y("div", w_, o(a(t).label("正在读取文件内容…", "Loading file content…")), 1)) : m.value ? (v(), y(J, { key: 1 }, [
                n("div", $_, [
                  n("div", k_, [
                    n("strong", null, o(m.value.relativePath || m.value.path), 1),
                    n("p", null, o(m.value.path), 1),
                    m.value.truncated ? (v(), y("p", S_, o(a(t).label("文件内容过长，当前只预览了前一部分。", "This file is large, so only the first portion is loaded for preview and editing.")), 1)) : we("", !0)
                  ])
                ]),
                n("div", C_, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: F
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: P.value,
                    onClick: L[2] || (L[2] = (x) => q("file"))
                  }, o(P.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存文件", "Save file")), 9, x_)
                ]),
                Se(n("textarea", {
                  "onUpdate:modelValue": L[3] || (L[3] = (x) => _.value = x),
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [Fe, _.value]
                ])
              ], 64)) : (v(), y("div", R_, o(a(t).label("先从左侧选择一个文件，再在这里查看或编辑。", "Select a file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64)) : (v(), y(J, { key: 3 }, [
        X(re, {
          title: a(t).label("核心记忆概览", "Core memory overview"),
          eyebrow: "Summary"
        }, {
          default: oe(() => {
            var x;
            return [
              n("div", E_, [
                n("article", A_, [
                  n("p", T_, o(a(t).label("记忆文件数", "Memory files")), 1),
                  n("strong", null, o(a(fe)(Te.value.length)), 1),
                  n("span", null, o(`${a(fe)(Te.value.filter((se) => se.type !== "memory").length)} ${a(t).label("个核心文档", "core docs")} / ${a(fe)(Te.value.filter((se) => se.type === "memory").length)} ${a(t).label("个记忆片段", "memory notes")}`), 1)
                ]),
                n("article", P_, [
                  n("p", O_, o(a(t).label("覆盖角色", "Covered roles")), 1),
                  n("strong", null, o(a(fe)($.value.length)), 1),
                  n("span", null, o(a(t).label("包含可管理记忆文件的角色或工作区", "Roles or workspaces that already have managed memory files")), 1)
                ]),
                n("article", M_, [
                  n("p", I_, o(a(t).label("当前显示", "Visible now")), 1),
                  n("strong", null, o(a(fe)(M.value.length)), 1),
                  n("span", null, o(`${ue(a(l).memoryKindFilter)} / ${a(l).memoryFilterQuery || a(t).label("未设置搜索词", "No search query")}`), 1)
                ]),
                n("article", N_, [
                  n("p", D_, o(a(t).label("当前打开", "Current file")), 1),
                  n("strong", null, o(E.value ? "1" : "0"), 1),
                  n("span", null, o(((x = E.value) == null ? void 0 : x.relativePath) || a(t).label("还没有打开记忆文件", "No memory file opened yet")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        n("div", F_, [
          X(re, {
            title: a(t).label("记忆目录", "Memory catalog"),
            eyebrow: "Catalog"
          }, {
            default: oe(() => [
              n("div", L_, [
                n("span", null, o(a(t).label("筛选", "Filter")), 1),
                n("input", {
                  value: a(l).memoryFilterQuery,
                  class: "settings-input",
                  type: "text",
                  placeholder: a(t).label("搜索 Agent / 文件名 / 路径", "Filter by agent / file / path"),
                  onInput: L[4] || (L[4] = (x) => a(l).setMemoryFilterQuery(x.target.value))
                }, null, 40, U_)
              ]),
              n("div", V_, [
                (v(), y(J, null, ve(["all", "docs", "notes"], (x) => n("button", {
                  key: x,
                  class: he(["pill-button", { "pill-button--active": a(l).memoryKindFilter === x }]),
                  type: "button",
                  onClick: (se) => G(x)
                }, [
                  n("span", null, o(ue(x)), 1)
                ], 10, B_)), 64))
              ]),
              n("p", G_, o(a(t).label(`当前显示 ${a(fe)(M.value.length)} / ${a(fe)(Te.value.length)} 个记忆文件。`, `Showing ${a(fe)(M.value.length)} of ${a(fe)(Te.value.length)} memory files.`)), 1),
              c.value ? (v(), y("div", H_, o(a(t).label("正在读取记忆目录…", "Loading the memory catalog…")), 1)) : $.value.length ? (v(), y("div", W_, [
                (v(!0), y(J, null, ve($.value, (x) => (v(), y("article", {
                  key: x.agentId,
                  class: "provider-card"
                }, [
                  n("header", K_, [
                    n("div", null, [
                      n("strong", null, o(x.label), 1),
                      x.label !== x.agentId ? (v(), y("p", j_, o(x.agentId), 1)) : we("", !0)
                    ]),
                    n("div", z_, [
                      n("span", q_, o(a(fe)(x.files.length)), 1),
                      n("span", J_, o(`${ue("docs")} ${a(fe)(x.docsCount)}`), 1),
                      n("span", Q_, o(`${ue("notes")} ${a(fe)(x.notesCount)}`), 1)
                    ])
                  ]),
                  n("div", Y_, [
                    (v(!0), y(J, null, ve(x.files, (se) => {
                      var ge;
                      return v(), y("button", {
                        key: se.path,
                        class: he(["entry-button", { "entry-button--active": ((ge = E.value) == null ? void 0 : ge.path) === se.path }]),
                        type: "button",
                        onClick: (qe) => le(se.path)
                      }, [
                        n("div", Z_, [
                          n("strong", null, o(K(se)), 1)
                        ]),
                        n("p", null, o(se.relativePath || se.path), 1),
                        n("div", eg, [
                          n("span", {
                            class: he(["pill", me(se) === "docs" ? "pill--info" : "pill--success"])
                          }, o(ue(me(se))), 3),
                          n("span", tg, o(a(Ze)(se.modifiedAt)), 1)
                        ])
                      ], 10, X_);
                    }), 128))
                  ])
                ]))), 128))
              ])) : (v(), y("div", sg, o(a(t).label("当前筛选条件下没有匹配的核心记忆文件。", "No core memory files match the current filter.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("记忆编辑器", "Memory editor"),
            eyebrow: "Editor"
          }, {
            default: oe(() => [
              u.value ? (v(), y("div", ng, o(a(t).label("正在读取记忆文件…", "Loading the memory file…")), 1)) : E.value ? (v(), y(J, { key: 1 }, [
                n("div", lg, [
                  n("div", ag, [
                    n("strong", null, o(E.value.relativePath || E.value.path), 1),
                    n("p", null, o(E.value.path), 1),
                    n("p", null, o(a(t).label("修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。", "Save after editing. These files directly affect role behavior, persona, and long-term memory.")), 1)
                  ])
                ]),
                n("div", ig, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: Y
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: de
                  }, o(a(t).label("在全部文件中定位", "Reveal in all files")), 1),
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: P.value,
                    onClick: L[5] || (L[5] = (x) => q("memory"))
                  }, o(P.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存记忆文件", "Save memory file")), 9, og)
                ]),
                Se(n("textarea", {
                  "onUpdate:modelValue": L[6] || (L[6] = (x) => z.value = x),
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [Fe, z.value]
                ])
              ], 64)) : (v(), y("div", rg, o(a(t).label("先从左侧选择一个记忆文件，再在这里查看或编辑。", "Select a memory file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64))
    ]));
  }
});
async function ug(e = 200) {
  const t = await Ee(`/api/service/logs?lines=${encodeURIComponent(String(e))}`);
  return {
    logs: Array.isArray(t.logs) ? t.logs.map((s) => String(s)) : [],
    requestedLines: e
  };
}
const dg = { class: "page-stack" }, fg = { class: "page-header" }, pg = { class: "page-header__eyebrow" }, hg = { class: "page-header__title" }, _g = { class: "page-header__description" }, gg = {
  key: 0,
  class: "page-empty"
}, mg = {
  key: 1,
  class: "page-empty page-empty--error"
}, bg = { class: "stat-grid" }, vg = { class: "stat-card" }, yg = { class: "stat-card__label" }, wg = { class: "stat-card" }, $g = { class: "stat-card__label" }, kg = { class: "stat-card" }, Sg = { class: "stat-card__label" }, Cg = { class: "stat-card" }, xg = { class: "stat-card__label" }, Rg = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Eg = { class: "page-actions" }, Ag = ["onClick"], Tg = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Pg = { class: "code-panel log-output" }, Og = /* @__PURE__ */ Le({
  __name: "LogsPage",
  setup(e) {
    let t = null;
    const s = et(), l = gt(), i = /* @__PURE__ */ Q((t == null ? void 0 : t.requestedLines) || 200), r = nt(() => ug(i.value), t, { immediate: !1 }), c = [100, 200, 500], u = ae(() => {
      var f;
      return ((f = r.data.value) == null ? void 0 : f.logs) || [];
    }), d = ae(() => /^(获取日志失败|Failed to fetch logs)/.test(u.value[0] || ""));
    Ue(r.data, (f) => {
      f && (t = f);
    }), qt(() => {
      r.execute({ silent: !!r.data.value });
    });
    async function p(f) {
      typeof f == "number" && (i.value = f), await r.execute({ silent: !!r.data.value });
    }
    async function h() {
      var f;
      typeof navigator > "u" || !((f = navigator.clipboard) != null && f.writeText) || (await navigator.clipboard.writeText(u.value.join(`
`)), l.pushToast({
        tone: "success",
        message: s.label("最近日志已复制。", "The latest log lines have been copied.")
      }));
    }
    return (f, m) => (v(), y("div", dg, [
      n("header", fg, [
        n("div", null, [
          n("p", pg, o(a(s).label("日志 / Fourth slice", "Logs / Fourth slice")), 1),
          n("h2", hg, o(a(s).label("日志与排障", "Logs & troubleshooting")), 1),
          n("p", _g, o(a(s).label("先把最常用的 Gateway 日志排障入口迁进新壳层里，支持切换日志行数、静默刷新和快速复制，避免排障时还要跳回旧控制台。", "Bring the most-used Gateway log workflow into the new shell first, with line-count switching, silent refresh, and quick copy so troubleshooting no longer depends on the old console.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: m[0] || (m[0] = (_) => p())
        }, o(a(r).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新日志", "Refresh logs")), 1)
      ]),
      a(r).loading && !a(r).data ? (v(), y("div", gg, o(a(s).label("正在读取最近日志…", "Loading the latest log lines…")), 1)) : a(r).error && !a(r).data ? (v(), y("div", mg, o(a(r).error), 1)) : a(r).data ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(s).label("日志概览", "Log overview"),
          eyebrow: "Gateway"
        }, {
          default: oe(() => [
            n("div", bg, [
              n("article", vg, [
                n("p", yg, o(a(s).label("日志来源", "Source")), 1),
                m[1] || (m[1] = n("strong", null, "Gateway", -1)),
                n("span", null, o(a(s).label("当前先迁移最常用的 Gateway 日志入口", "The first migrated source is the Gateway log stream")), 1)
              ]),
              n("article", wg, [
                n("p", $g, o(a(s).label("请求行数", "Requested lines")), 1),
                n("strong", null, o(a(fe)(a(r).data.requestedLines)), 1),
                n("span", null, o(a(s).label("切换后会静默拉取新结果", "Changing this refreshes the result silently")), 1)
              ]),
              n("article", kg, [
                n("p", Sg, o(a(s).label("返回行数", "Returned lines")), 1),
                n("strong", null, o(a(fe)(u.value.length)), 1),
                n("span", null, o(a(s).label("展示当前接口返回的最新结果", "Shows the latest lines returned by the API")), 1)
              ]),
              n("article", Cg, [
                n("p", xg, o(a(s).label("当前状态", "Current state")), 1),
                n("strong", null, o(d.value ? a(s).label("需要排查", "Needs attention") : a(s).label("可直接查看", "Ready to inspect")), 1),
                n("span", null, o(d.value ? a(s).label("接口返回了错误提示，建议先回到运维确认服务状态。", "The API returned an error banner. Confirm the service state in Operations first.") : a(s).label("如果最近刚执行过启停或重启，先看这里通常最快。", "If you recently started, stopped, or restarted services, this is usually the fastest place to check.")), 1)
              ])
            ]),
            a(r).error ? (v(), y("div", Rg, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : we("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(s).label("最近日志输出", "Latest log output"),
          eyebrow: "Output"
        }, {
          actions: oe(() => [
            n("div", Eg, [
              (v(), y(J, null, ve(c, (_) => n("button", {
                key: _,
                class: he(["pill-button", { "pill-button--active": i.value === _ }]),
                type: "button",
                onClick: (D) => p(_)
              }, o(a(s).label(`最近 ${_} 行`, `${_} lines`)), 11, Ag)), 64)),
              n("button", {
                class: "inline-link",
                type: "button",
                onClick: h
              }, o(a(s).label("复制日志", "Copy logs")), 1)
            ])
          ]),
          default: oe(() => [
            d.value ? (v(), y("div", Tg, o(u.value[0]), 1)) : we("", !0),
            n("pre", Pg, o(u.value.join(`
`) || a(s).label("当前没有可显示的日志内容。", "No log content is available right now.")), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : we("", !0)
    ]));
  }
});
async function Mg() {
  const [e, t] = await Promise.all([
    Ee("/api/ai/config"),
    Ee("/api/ai/providers")
  ]);
  return { config: e, catalog: t };
}
function Ig(e) {
  return Ne("/api/ai/provider", e);
}
function Ng(e) {
  return uo(`/api/ai/provider/${encodeURIComponent(e)}`);
}
function Dg(e) {
  return Ne("/api/ai/primary", { modelId: e });
}
function Fg(e) {
  return Ne("/api/ai/fallbacks", { modelIds: e });
}
const Lg = { class: "page-stack" }, Ug = { class: "page-header" }, Vg = { class: "page-header__eyebrow" }, Bg = { class: "page-header__title" }, Gg = { class: "page-header__description" }, Hg = {
  key: 0,
  class: "page-empty"
}, Wg = {
  key: 1,
  class: "page-empty page-empty--error"
}, Kg = { class: "stat-grid" }, jg = { class: "stat-card" }, zg = { class: "stat-card__label" }, qg = { class: "stat-card" }, Jg = { class: "stat-card__label" }, Qg = { class: "stat-card" }, Yg = { class: "stat-card__label" }, Xg = { class: "stat-card" }, Zg = { class: "stat-card__label" }, em = { class: "settings-grid settings-grid--wide" }, tm = { class: "settings-field" }, sm = { value: "" }, nm = ["value"], lm = { class: "checkbox-grid" }, am = ["checked", "onChange"], im = { class: "page-actions" }, om = ["disabled"], rm = { class: "page-two-column" }, cm = { class: "catalog-list" }, um = ["onClick"], dm = { class: "catalog-list__title" }, fm = { class: "pill-row" }, pm = { class: "page-stack" }, hm = { class: "muted-copy" }, _m = { class: "settings-grid settings-grid--wide" }, gm = { class: "settings-field" }, mm = { class: "settings-field" }, bm = { class: "settings-field" }, vm = ["value"], ym = { class: "settings-field" }, wm = { class: "settings-field settings-field--full" }, $m = { class: "page-actions" }, km = ["disabled"], Sm = ["disabled"], Cm = { class: "provider-stack" }, xm = { class: "provider-card__header" }, Rm = { class: "pill-row" }, Em = {
  key: 0,
  class: "pill pill--success"
}, Am = {
  key: 1,
  class: "pill pill--muted"
}, Tm = { class: "mini-list" }, Pm = { class: "pill-row" }, Om = {
  key: 0,
  class: "pill pill--success"
}, Mm = {
  key: 1,
  class: "pill pill--info"
}, Im = /* @__PURE__ */ Le({
  __name: "ModelsPage",
  setup(e) {
    const t = ["openai-completions", "anthropic-messages", "openai-responses"], s = et(), l = gt(), i = nt(() => Mg()), r = /* @__PURE__ */ Q("__new__"), c = /* @__PURE__ */ Q(!1), u = /* @__PURE__ */ Q(!1), d = /* @__PURE__ */ Q(!1), p = /* @__PURE__ */ Q(""), h = /* @__PURE__ */ Q([]), f = /* @__PURE__ */ Ft({
      mode: "new",
      title: "",
      canDelete: !1,
      name: "",
      baseUrl: "",
      apiType: "openai-completions",
      apiKey: "",
      apiKeyHelp: "",
      modelsText: ""
    }), m = ae(() => {
      const T = i.data, w = (T == null ? void 0 : T.config.providers) || [], S = (T == null ? void 0 : T.catalog.presets) || [];
      return [
        { value: "__new__", label: s.label("新建空白 Provider", "Create blank provider"), kind: "new" },
        ...w.map((R) => ({
          value: R.name,
          label: `${R.name} · ${s.label("已配置", "configured")}`,
          kind: "custom"
        })),
        ...S.filter((R) => !w.some((Z) => Z.name === R.id)).map((R) => ({
          value: R.id,
          label: `${R.id} · ${s.label("预设", "preset")}`,
          kind: "preset"
        }))
      ];
    }), _ = ae(() => {
      var w;
      return (((w = i.data) == null ? void 0 : w.config.providers) || []).flatMap((S) => S.models.map((R) => ({
        providerName: S.name,
        fullId: R.fullId,
        name: R.name,
        api: R.api
      })));
    });
    function D(T, w) {
      return T.map((S) => [
        S.id || "",
        S.name || S.id || "",
        S.contextWindow || "",
        S.maxTokens || "",
        S.api || w || ""
      ].join("|")).join(`
`);
    }
    function E(T, w) {
      return T.split(/\r?\n/).map((S) => S.trim()).filter(Boolean).map((S) => {
        const [R, Z, ie, _e, ye] = S.split("|").map((Ie) => Ie.trim());
        return {
          id: R,
          name: Z || R,
          contextWindow: nn(ie),
          maxTokens: nn(_e),
          api: ye || w || void 0
        };
      }).filter((S) => S.id);
    }
    function z(T) {
      var Ie, Te;
      const w = i.data;
      if (!w) return;
      const S = w.config.providers, R = new Map(S.map((M) => [M.name, M])), Z = new Map((w.catalog.custom || []).map((M) => [M.name, M])), ie = new Map((w.catalog.presets || []).map((M) => [M.id, M]));
      if (!T || T === "__new__") {
        f.mode = "new", f.title = s.label("新建 Provider", "Create provider"), f.canDelete = !1, f.name = "", f.baseUrl = "", f.apiType = "openai-completions", f.apiKey = "", f.apiKeyHelp = s.label("保存后写入 openclaw.json。", "Saved into openclaw.json after you confirm."), f.modelsText = "";
        return;
      }
      const _e = Z.get(T);
      if (_e) {
        const M = R.get(T);
        f.mode = "custom", f.title = s.label("编辑已配置 Provider", "Edit configured provider"), f.canDelete = !0, f.name = T, f.baseUrl = _e.baseUrl || "", f.apiType = _e.apiType || _e.api || ((Te = (Ie = _e.models) == null ? void 0 : Ie[0]) == null ? void 0 : Te.api) || "openai-completions", f.apiKey = "", f.apiKeyHelp = M != null && M.apiKeyMasked ? s.label(`留空会保留现有密钥：${M.apiKeyMasked}`, `Leave blank to keep the current key: ${M.apiKeyMasked}`) : s.label("填写后会覆盖当前密钥。", "A filled value replaces the current key."), f.modelsText = D(_e.models || [], f.apiType);
        return;
      }
      const ye = ie.get(T);
      if (ye) {
        f.mode = "preset", f.title = s.label("从预设带入 Provider", "Bootstrap provider from preset"), f.canDelete = !1, f.name = ye.id, f.baseUrl = ye.defaultBaseUrl || "", f.apiType = ye.apiType || "openai-completions", f.apiKey = "", f.apiKeyHelp = ye.requiresApiKey ? s.label("保存前请填写 API Key。", "Fill in the API key before saving.") : s.label("这个 Provider 通常不需要 API Key。", "This provider usually does not require an API key."), f.modelsText = D(
          (ye.suggestedModels || []).map((M) => ({
            id: M.id,
            name: M.name,
            api: ye.apiType
          })),
          ye.apiType
        );
        return;
      }
      r.value = "__new__";
    }
    Ue(
      () => i.data,
      (T) => {
        var S;
        if (!T) return;
        p.value = T.config.primaryModel || "", h.value = [...T.config.fallbackModels || []];
        const w = m.value;
        if (!w.some((R) => R.value === r.value)) {
          r.value = ((S = w[1]) == null ? void 0 : S.value) || "__new__";
          return;
        }
        z(r.value);
      },
      { immediate: !0 }
    ), Ue(r, (T) => {
      z(T);
    });
    async function O() {
      c.value = !0;
      try {
        const T = await Dg(p.value);
        if (!T.success)
          throw new Error(T.message);
        const w = await Fg(h.value.filter((S) => S !== p.value));
        if (!w.success)
          throw new Error(w.message);
        l.pushToast({
          tone: "success",
          message: s.label("模型路由已更新。", "Model routing was updated.")
        }), await i.execute({ silent: !0 });
      } catch (T) {
        l.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        c.value = !1;
      }
    }
    async function P() {
      u.value = !0;
      try {
        const T = await Ig({
          name: f.name.trim(),
          baseUrl: f.baseUrl.trim(),
          apiKey: f.apiKey.trim() || void 0,
          apiType: f.apiType,
          models: E(f.modelsText, f.apiType)
        });
        l.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), T.success && (r.value = f.name.trim() || "__new__", await i.execute({ silent: !0 }));
      } catch (T) {
        l.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        u.value = !1;
      }
    }
    async function B() {
      if (!(!f.canDelete || !f.name || !await l.confirm({
        title: s.label("删除 Provider", "Delete provider"),
        message: s.label(
          `确认删除 ${f.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
          `Delete ${f.name}? This also removes its model definitions, primary selection, and fallback references.`
        ),
        confirmLabel: s.label("确认删除", "Delete provider"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        d.value = !0;
        try {
          const w = await Ng(f.name);
          l.pushToast({
            tone: w.success ? "success" : "error",
            message: w.message
          }), w.success && (r.value = "__new__", await i.execute({ silent: !0 }));
        } catch (w) {
          l.pushToast({
            tone: "error",
            message: w instanceof Error ? w.message : String(w)
          });
        } finally {
          d.value = !1;
        }
      }
    }
    function H(T) {
      if (h.value.includes(T)) {
        h.value = h.value.filter((w) => w !== T);
        return;
      }
      h.value = [...h.value, T];
    }
    function U(T, w) {
      var S;
      return T ? s.label(`预设入口：${T.name}`, `Preset source: ${T.name}`) : (S = w == null ? void 0 : w.models) != null && S.length ? s.label(`当前已录入 ${w.models.length} 个模型`, `${w.models.length} model entries are recorded now`) : s.label("保存后就会写入当前 openclaw.json。", "Saving writes the provider into the active openclaw.json.");
    }
    return (T, w) => (v(), y("div", Lg, [
      n("header", Ug, [
        n("div", null, [
          n("p", Vg, o(a(s).label("模型 / Second slice", "Models / Second slice")), 1),
          n("h2", Bg, o(a(s).label("模型策略", "Model strategy")), 1),
          n("p", Gg, o(a(s).label("把 Provider、主模型和 fallback 链迁到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: w[0] || (w[0] = (S) => a(i).execute({ silent: !0 }))
        }, o(a(i).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(i).loading ? (v(), y("div", Hg, o(a(s).label("正在读取模型配置…", "Loading model configuration…")), 1)) : a(i).error ? (v(), y("div", Wg, o(a(i).error), 1)) : a(i).data ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(s).label("当前路由概览", "Current routing overview"),
          eyebrow: "Routing"
        }, {
          default: oe(() => [
            n("div", Kg, [
              n("article", jg, [
                n("p", zg, o(a(s).label("主模型", "Primary model")), 1),
                n("strong", null, o(a(i).data.config.primaryModel || a(s).label("待设置", "Not configured")), 1),
                n("span", null, o(a(s).label("默认执行路径", "Default execution route")), 1)
              ]),
              n("article", qg, [
                n("p", Jg, o(a(s).label("Provider 数量", "Providers")), 1),
                n("strong", null, o(a(i).data.config.providers.length), 1),
                n("span", null, o(a(s).label("已经进入运行配置", "Already present in runtime config")), 1)
              ]),
              n("article", Qg, [
                n("p", Yg, o(a(s).label("备用模型", "Fallbacks")), 1),
                n("strong", null, o(a(i).data.config.fallbackModels.length), 1),
                n("span", null, o(a(s).label("主模型失败时按顺序尝试", "Tried in sequence when the primary route fails")), 1)
              ]),
              n("article", Xg, [
                n("p", Zg, o(a(s).label("可选模型", "Available models")), 1),
                n("strong", null, o(_.value.length), 1),
                n("span", null, o(a(s).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(s).label("主模型与备用链路", "Primary and fallback chain"),
          eyebrow: "Routing editor"
        }, {
          default: oe(() => [
            n("div", em, [
              n("label", tm, [
                n("span", null, o(a(s).label("主模型", "Primary model")), 1),
                n("small", null, o(a(s).label("Guard 默认先走这一条模型路径。", "Guard routes here first by default.")), 1),
                Se(n("select", {
                  "onUpdate:modelValue": w[1] || (w[1] = (S) => p.value = S),
                  class: "settings-input"
                }, [
                  n("option", sm, o(a(s).label("暂不设置", "Leave unset")), 1),
                  (v(!0), y(J, null, ve(_.value, (S) => (v(), y("option", {
                    key: S.fullId,
                    value: S.fullId
                  }, o(`${S.providerName} / ${S.name}`), 9, nm))), 128))
                ], 512), [
                  [ct, p.value]
                ])
              ])
            ]),
            n("div", lm, [
              (v(!0), y(J, null, ve(_.value, (S) => (v(), y("label", {
                key: S.fullId,
                class: "checkbox-card"
              }, [
                n("input", {
                  checked: h.value.includes(S.fullId),
                  type: "checkbox",
                  onChange: (R) => H(S.fullId)
                }, null, 40, am),
                n("div", null, [
                  n("strong", null, o(`${S.providerName} / ${S.name}`), 1),
                  n("p", null, o(S.api || a(s).label("未声明 API 类型", "API type is not declared")), 1)
                ])
              ]))), 128))
            ]),
            n("div", im, [
              n("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: c.value,
                onClick: O
              }, o(c.value ? a(s).label("保存中…", "Saving…") : a(s).label("保存路由策略", "Save routing strategy")), 9, om)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", rm, [
          X(re, {
            title: a(s).label("Provider 选择器", "Provider picker"),
            eyebrow: "Provider"
          }, {
            default: oe(() => [
              n("div", cm, [
                (v(!0), y(J, null, ve(m.value, (S) => (v(), y("button", {
                  key: S.value,
                  class: he(["catalog-list__item", { "catalog-list__item--active": r.value === S.value }]),
                  type: "button",
                  onClick: (R) => r.value = S.value
                }, [
                  n("div", dm, [
                    n("strong", null, o(S.label), 1)
                  ]),
                  n("div", fm, [
                    n("span", {
                      class: he(["pill", S.kind === "custom" ? "pill--success" : S.kind === "preset" ? "pill--info" : "pill--muted"])
                    }, o(S.kind === "custom" ? a(s).label("已配置", "Configured") : S.kind === "preset" ? a(s).label("预设", "Preset") : a(s).label("空白", "Blank")), 3)
                  ])
                ], 10, um))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", pm, [
            X(re, {
              title: f.title,
              eyebrow: "Editor"
            }, {
              default: oe(() => [
                n("p", hm, o(U(a(i).data.catalog.presets.find((S) => S.id === r.value), a(i).data.catalog.custom.find((S) => S.name === r.value))), 1),
                n("div", _m, [
                  n("label", gm, [
                    n("span", null, o(a(s).label("Provider 名称", "Provider name")), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": w[2] || (w[2] = (S) => f.name = S),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Fe, f.name]
                    ])
                  ]),
                  n("label", mm, [
                    w[8] || (w[8] = n("span", null, "Base URL", -1)),
                    Se(n("input", {
                      "onUpdate:modelValue": w[3] || (w[3] = (S) => f.baseUrl = S),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Fe, f.baseUrl]
                    ])
                  ]),
                  n("label", bm, [
                    n("span", null, o(a(s).label("默认 API 类型", "Default API type")), 1),
                    Se(n("select", {
                      "onUpdate:modelValue": w[4] || (w[4] = (S) => f.apiType = S),
                      class: "settings-input"
                    }, [
                      (v(), y(J, null, ve(t, (S) => n("option", {
                        key: S,
                        value: S
                      }, o(S), 9, vm)), 64))
                    ], 512), [
                      [ct, f.apiType]
                    ])
                  ]),
                  n("label", ym, [
                    w[9] || (w[9] = n("span", null, "API Key", -1)),
                    n("small", null, o(f.apiKeyHelp), 1),
                    Se(n("input", {
                      "onUpdate:modelValue": w[5] || (w[5] = (S) => f.apiKey = S),
                      class: "settings-input",
                      type: "password"
                    }, null, 512), [
                      [Fe, f.apiKey]
                    ])
                  ]),
                  n("label", wm, [
                    n("span", null, o(a(s).label("模型列表", "Model list")), 1),
                    n("small", null, o(a(s).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                    Se(n("textarea", {
                      "onUpdate:modelValue": w[6] || (w[6] = (S) => f.modelsText = S),
                      class: "settings-textarea",
                      rows: "8"
                    }, null, 512), [
                      [Fe, f.modelsText]
                    ])
                  ])
                ]),
                n("div", $m, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: u.value,
                    onClick: P
                  }, o(u.value ? a(s).label("保存中…", "Saving…") : a(s).label("保存 Provider", "Save provider")), 9, km),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: w[7] || (w[7] = (S) => z(r.value))
                  }, o(a(s).label("恢复当前内容", "Reset draft")), 1),
                  f.canDelete ? (v(), y("button", {
                    key: 0,
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: d.value,
                    onClick: B
                  }, o(d.value ? a(s).label("删除中…", "Deleting…") : a(s).label("删除 Provider", "Delete provider")), 9, Sm)) : we("", !0)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            X(re, {
              title: a(s).label("已配置 Provider", "Configured providers"),
              eyebrow: "Overview"
            }, {
              default: oe(() => [
                n("div", Cm, [
                  (v(!0), y(J, null, ve(a(i).data.config.providers, (S) => (v(), y("article", {
                    key: S.name,
                    class: "provider-card"
                  }, [
                    n("header", xm, [
                      n("div", null, [
                        n("strong", null, o(S.name), 1),
                        n("p", null, o(S.baseUrl), 1)
                      ]),
                      n("div", Rm, [
                        S.hasApiKey ? (v(), y("span", Em, o(a(s).label("有密钥", "Has key")), 1)) : (v(), y("span", Am, o(a(s).label("无密钥", "No key")), 1))
                      ])
                    ]),
                    n("div", Tm, [
                      (v(!0), y(J, null, ve(S.models, (R) => (v(), y("div", {
                        key: R.fullId,
                        class: "mini-list__item"
                      }, [
                        n("div", null, [
                          n("strong", null, o(R.name), 1),
                          n("p", null, o(R.fullId), 1)
                        ]),
                        n("div", Pm, [
                          R.isPrimary ? (v(), y("span", Om, o(a(s).label("主模型", "Primary")), 1)) : we("", !0),
                          R.isFallback ? (v(), y("span", Mm, o(a(s).label("备用", "Fallback")), 1)) : we("", !0)
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
      ], 64)) : we("", !0)
    ]));
  }
});
async function Nm(e = 200, t = 80) {
  const [s, l] = await Promise.all([
    Ee(`/api/notifications?limit=${encodeURIComponent(String(e))}`),
    Ee(`/api/activity?limit=${encodeURIComponent(String(t))}`)
  ]);
  return {
    summary: {
      items: Array.isArray(s.items) ? s.items : [],
      total: s.total || 0,
      unread: s.unread || 0,
      read: s.read || 0
    },
    events: Array.isArray(l.events) ? l.events : []
  };
}
function Dm(e, t) {
  return Ne("/api/notifications/read", { id: e, read: t });
}
function Fm(e) {
  return Ne("/api/notifications/bulk", { action: e });
}
const Lm = { class: "page-stack" }, Um = { class: "page-header" }, Vm = { class: "page-header__eyebrow" }, Bm = { class: "page-header__title" }, Gm = { class: "page-header__description" }, Hm = {
  key: 0,
  class: "page-empty"
}, Wm = {
  key: 1,
  class: "page-empty page-empty--error"
}, Km = { class: "stat-grid" }, jm = { class: "stat-card" }, zm = { class: "stat-card__label" }, qm = { class: "stat-card" }, Jm = { class: "stat-card__label" }, Qm = { class: "stat-card" }, Ym = { class: "stat-card__label" }, Xm = { class: "stat-card" }, Zm = { class: "stat-card__label" }, eb = {
  key: 0,
  class: "status-banner status-banner--warning"
}, tb = { class: "control-grid" }, sb = { class: "settings-field" }, nb = ["placeholder"], lb = { class: "settings-field" }, ab = { value: "all" }, ib = ["value"], ob = { class: "settings-field" }, rb = ["value"], cb = { class: "pill-row" }, ub = { class: "page-actions" }, db = ["disabled"], fb = ["disabled"], pb = ["disabled"], hb = ["disabled"], _b = {
  key: 0,
  class: "timeline-day-stack"
}, gb = { class: "timeline-day-header" }, mb = { class: "provider-stack" }, bb = { class: "provider-card__header" }, vb = { class: "pill-row" }, yb = { class: "pill-row" }, wb = { class: "pill pill--info" }, $b = { class: "pill pill--muted" }, kb = { class: "page-actions" }, Sb = ["disabled", "onClick"], Cb = ["disabled", "onClick"], xb = {
  key: 1,
  class: "page-empty"
}, Rb = {
  key: 2,
  class: "pagination-bar"
}, Eb = { class: "muted-copy" }, Ab = { class: "page-actions" }, Tb = ["disabled"], Pb = ["disabled"], Ob = {
  key: 0,
  class: "provider-stack"
}, Mb = { class: "provider-card__header" }, Ib = { class: "pill pill--info" }, Nb = {
  key: 0,
  class: "muted-copy"
}, Db = {
  key: 1,
  class: "page-empty"
}, Fb = /* @__PURE__ */ Le({
  __name: "NotificationsPage",
  setup(e) {
    let t = null;
    const s = et(), l = gt(), i = /* @__PURE__ */ Q("reminders"), r = /* @__PURE__ */ Q(""), c = /* @__PURE__ */ Q("all"), u = /* @__PURE__ */ Q("all"), d = /* @__PURE__ */ Q(20), p = /* @__PURE__ */ Q(1), h = /* @__PURE__ */ Q(""), f = /* @__PURE__ */ Q(""), m = /* @__PURE__ */ Q(""), _ = nt(() => Nm(), t, { immediate: !1 }), D = [10, 20, 50], E = ae(() => [
      { id: "reminders", label: s.label("提醒", "Reminders") },
      { id: "timeline", label: s.label("时间线", "Timeline") }
    ]), z = ae(() => {
      var W;
      return ((W = _.data.value) == null ? void 0 : W.summary.items) || [];
    }), O = ae(() => {
      var W;
      return ((W = _.data.value) == null ? void 0 : W.events) || [];
    }), P = ae(() => z.value.filter((W) => W.severity === "warning" || W.severity === "error").length), B = ae(() => z.value.filter((W) => W.severity === "success").length), H = ae(() => Array.from(new Set(z.value.map((W) => W.source).filter(Boolean))).sort()), U = ae(() => {
      const W = r.value.trim().toLowerCase();
      return z.value.filter((K) => u.value === "unread" && K.read || u.value === "warning" && K.severity !== "warning" && K.severity !== "error" || u.value === "success" && K.severity !== "success" || c.value !== "all" && K.source !== c.value ? !1 : W ? [
        K.title,
        K.message,
        K.type,
        K.source,
        JSON.stringify(K.meta || {})
      ].join(" ").toLowerCase().includes(W) : !0);
    }), T = ae(() => Math.max(1, Math.ceil(U.value.length / d.value))), w = ae(() => {
      const W = (p.value - 1) * d.value;
      return U.value.slice(W, W + d.value);
    }), S = ae(() => {
      var K;
      const W = /* @__PURE__ */ new Map();
      for (const ne of w.value) {
        const ke = ne.createdAt ? ne.createdAt.slice(0, 10) : "unknown";
        W.has(ke) || W.set(ke, {
          key: ke,
          label: R(ne.createdAt),
          items: []
        }), (K = W.get(ke)) == null || K.items.push(ne);
      }
      return Array.from(W.values());
    });
    Ue(_.data, (W) => {
      W && (t = W);
    }), Ue([r, c, u, d, i], () => {
      p.value = 1;
    }), Ue(T, (W) => {
      p.value > W && (p.value = W);
    }), qt(() => {
      _.execute({ silent: !!_.data.value });
    });
    function R(W) {
      if (!W) return s.label("未知日期", "Unknown date");
      const K = Date.parse(W);
      return Number.isFinite(K) ? new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(K)) : W;
    }
    function Z(W) {
      return W === "success" ? "pill--success" : W === "warning" ? "pill--warning" : W === "error" ? "pill--danger" : "pill--info";
    }
    function ie(W) {
      return W === "success" ? s.label("成功", "Success") : W === "warning" ? s.label("警告", "Warning") : W === "error" ? s.label("异常", "Error") : s.label("提示", "Info");
    }
    function _e(W) {
      const ne = {
        cron: { zh: "自动化", en: "Automation" },
        recovery: { zh: "备份与恢复", en: "Backup & Recovery" },
        git: { zh: "Git", en: "Git" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" },
        openclaw: { zh: "OpenClaw", en: "OpenClaw" },
        security: { zh: "安全", en: "Security" }
      }[W];
      return ne ? s.label(ne.zh, ne.en) : W || s.label("系统提醒", "System reminder");
    }
    function ye(W) {
      const ne = {
        "session-started": { zh: "会话启动", en: "Session started" },
        "session-updated": { zh: "会话更新", en: "Session updated" },
        "session-ended": { zh: "会话结束", en: "Session ended" },
        "runtime-warning": { zh: "运行告警", en: "Runtime warning" },
        "cron-run": { zh: "自动化执行", en: "Automation run" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" }
      }[W];
      return ne ? s.label(ne.zh, ne.en) : W || s.label("系统事件", "System event");
    }
    function Ie(W) {
      return W ? W === "cron-ui" ? s.label("Cron 管理", "Cron management") : W === "openclaw" ? "OpenClaw" : W === "guard-ui" ? "Guard UI" : W : s.label("未知来源", "Unknown source");
    }
    function Te(W) {
      return [W.agentId, W.modelId, W.status].filter(Boolean).join(" · ");
    }
    function M(W) {
      if (!_.data.value) return;
      const K = {
        ..._.data.value,
        summary: {
          items: Array.isArray(W.items) ? W.items : [],
          total: W.total || 0,
          unread: W.unread || 0,
          read: W.read || 0
        }
      };
      _.data.value = K, t = K;
    }
    async function $() {
      await _.execute({ silent: !!_.data.value });
    }
    async function A(W) {
      const K = !W.read;
      h.value = W.id;
      try {
        const ne = await Dm(W.id, K);
        M(ne.summary), l.pushToast({
          tone: ne.success ? "success" : "error",
          message: ne.success ? K ? s.label("已标记为已读。", "Marked as read.") : s.label("已重新标记为未读。", "Marked as unread again.") : s.label("更新提醒状态失败。", "Failed to update the reminder state.")
        });
      } catch (ne) {
        l.pushToast({
          tone: "error",
          message: ne instanceof Error ? ne.message : String(ne)
        });
      } finally {
        h.value = "";
      }
    }
    async function me(W) {
      if (!(W === "clear-all" && !await l.confirm({
        title: s.label("清空全部通知", "Clear all reminders"),
        message: s.label("确认清空全部提醒吗？这个操作不可撤销。", "Clear all reminders? This action cannot be undone."),
        confirmLabel: s.label("确认清空", "Clear all"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        f.value = W;
        try {
          const K = await Fm(W);
          M(K.summary), l.pushToast({
            tone: K.success ? "success" : "error",
            message: K.message
          });
        } catch (K) {
          l.pushToast({
            tone: "error",
            message: K instanceof Error ? K.message : String(K)
          });
        } finally {
          f.value = "";
        }
      }
    }
    async function ue(W) {
      var K;
      if (!(typeof navigator > "u" || !((K = navigator.clipboard) != null && K.writeText))) {
        m.value = W.id;
        try {
          await navigator.clipboard.writeText(JSON.stringify(W, null, 2)), l.pushToast({
            tone: "success",
            message: s.label("提醒详情已复制。", "The reminder details have been copied.")
          });
        } finally {
          m.value = "";
        }
      }
    }
    return (W, K) => (v(), y("div", Lm, [
      n("header", Um, [
        n("div", null, [
          n("p", Vm, o(a(s).label("通知 / Fourth slice", "Notifications / Fourth slice")), 1),
          n("h2", Bm, o(a(s).label("提醒与时间线", "Reminders & timeline")), 1),
          n("p", Gm, o(a(s).label("把原来分散的提醒和活动时间线收回同一页里，默认先给普通用户看到可处理的提醒，切换到时间线再回看系统最近发生了什么。", "Bring reminders and the activity feed back into one page, so users first see what needs action and then switch to the timeline to review what the system has been doing.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: $
        }, o(a(_).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      X($n, {
        items: E.value,
        "active-id": i.value,
        onChange: K[0] || (K[0] = (ne) => i.value = ne)
      }, null, 8, ["items", "active-id"]),
      a(_).loading && !a(_).data ? (v(), y("div", Hm, o(a(s).label("正在读取提醒与时间线…", "Loading reminders and timeline events…")), 1)) : a(_).error && !a(_).data ? (v(), y("div", Wm, o(a(_).error), 1)) : a(_).data ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(s).label("当前概览", "Current overview"),
          eyebrow: "Overview"
        }, {
          default: oe(() => [
            n("div", Km, [
              n("article", jm, [
                n("p", zm, o(a(s).label("提醒总数", "Total reminders")), 1),
                n("strong", null, o(a(fe)(a(_).data.summary.total)), 1),
                n("span", null, o(a(s).label("包含已读与未读提醒", "Includes both read and unread reminders")), 1)
              ]),
              n("article", qm, [
                n("p", Jm, o(a(s).label("待处理", "Needs attention")), 1),
                n("strong", null, o(a(fe)(a(_).data.summary.unread)), 1),
                n("span", null, o(a(s).label("建议先处理这些未读提醒", "Start with these unread reminders")), 1)
              ]),
              n("article", Qm, [
                n("p", Ym, o(a(s).label("告警提醒", "Warnings / errors")), 1),
                n("strong", null, o(a(fe)(P.value)), 1),
                n("span", null, o(a(s).label("包含 warning 与 error 两种严重级别", "Counts both warning and error severity")), 1)
              ]),
              n("article", Xm, [
                n("p", Zm, o(a(s).label("时间线事件", "Timeline events")), 1),
                n("strong", null, o(a(fe)(O.value.length)), 1),
                n("span", null, o(a(s).label("最近活动会从这里回放", "Recent system activity is replayed here")), 1)
              ])
            ]),
            a(_).error ? (v(), y("div", eb, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(_).error), 1)) : we("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        i.value === "reminders" ? (v(), y(J, { key: 0 }, [
          X(re, {
            title: a(s).label("筛选与批量操作", "Filters & bulk actions"),
            eyebrow: "Controls"
          }, {
            default: oe(() => [
              n("div", tb, [
                n("label", sb, [
                  n("span", null, o(a(s).label("搜索", "Search")), 1),
                  Se(n("input", {
                    "onUpdate:modelValue": K[1] || (K[1] = (ne) => r.value = ne),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(s).label("搜索标题、消息、来源", "Search title, message, or source")
                  }, null, 8, nb), [
                    [Fe, r.value]
                  ])
                ]),
                n("label", lb, [
                  n("span", null, o(a(s).label("来源", "Source")), 1),
                  Se(n("select", {
                    "onUpdate:modelValue": K[2] || (K[2] = (ne) => c.value = ne),
                    class: "settings-input"
                  }, [
                    n("option", ab, o(a(s).label("全部来源", "All sources")), 1),
                    (v(!0), y(J, null, ve(H.value, (ne) => (v(), y("option", {
                      key: ne,
                      value: ne
                    }, o(Ie(ne)), 9, ib))), 128))
                  ], 512), [
                    [ct, c.value]
                  ])
                ]),
                n("label", ob, [
                  n("span", null, o(a(s).label("每页显示", "Per page")), 1),
                  Se(n("select", {
                    "onUpdate:modelValue": K[3] || (K[3] = (ne) => d.value = ne),
                    class: "settings-input"
                  }, [
                    (v(), y(J, null, ve(D, (ne) => n("option", {
                      key: ne,
                      value: ne
                    }, o(a(s).label(`${ne} 条`, `${ne}`)), 9, rb)), 64))
                  ], 512), [
                    [ct, d.value]
                  ])
                ])
              ]),
              n("div", cb, [
                n("button", {
                  class: he(["pill-button", { "pill-button--active": u.value === "all" }]),
                  type: "button",
                  onClick: K[4] || (K[4] = (ne) => u.value = "all")
                }, o(a(s).label(`全部 (${a(_).data.summary.total})`, `All (${a(_).data.summary.total})`)), 3),
                n("button", {
                  class: he(["pill-button", { "pill-button--active": u.value === "unread" }]),
                  type: "button",
                  onClick: K[5] || (K[5] = (ne) => u.value = "unread")
                }, o(a(s).label(`未读 (${a(_).data.summary.unread})`, `Unread (${a(_).data.summary.unread})`)), 3),
                n("button", {
                  class: he(["pill-button", { "pill-button--active": u.value === "warning" }]),
                  type: "button",
                  onClick: K[6] || (K[6] = (ne) => u.value = "warning")
                }, o(a(s).label(`警告 (${P.value})`, `Warning (${P.value})`)), 3),
                n("button", {
                  class: he(["pill-button", { "pill-button--active": u.value === "success" }]),
                  type: "button",
                  onClick: K[7] || (K[7] = (ne) => u.value = "success")
                }, o(a(s).label(`成功 (${B.value})`, `Success (${B.value})`)), 3)
              ]),
              n("div", ub, [
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: f.value === "read-all",
                  onClick: K[8] || (K[8] = (ne) => me("read-all"))
                }, o(f.value === "read-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部标记为已读", "Mark all as read")), 9, db),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: f.value === "unread-all",
                  onClick: K[9] || (K[9] = (ne) => me("unread-all"))
                }, o(f.value === "unread-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部重新标记为未读", "Mark all as unread")), 9, fb),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: f.value === "clear-read",
                  onClick: K[10] || (K[10] = (ne) => me("clear-read"))
                }, o(f.value === "clear-read" ? a(s).label("处理中…", "Working…") : a(s).label("清空已读提醒", "Clear read reminders")), 9, pb),
                n("button", {
                  class: "inline-link inline-link--danger",
                  type: "button",
                  disabled: f.value === "clear-all",
                  onClick: K[11] || (K[11] = (ne) => me("clear-all"))
                }, o(f.value === "clear-all" ? a(s).label("处理中…", "Working…") : a(s).label("清空全部提醒", "Clear all reminders")), 9, hb)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(s).label("提醒列表", "Reminder list"),
            eyebrow: "Reminders"
          }, {
            default: oe(() => [
              U.value.length ? (v(), y("div", _b, [
                (v(!0), y(J, null, ve(S.value, (ne) => (v(), y("section", {
                  key: ne.key,
                  class: "timeline-day-group"
                }, [
                  n("div", gb, [
                    n("strong", null, o(ne.label), 1),
                    n("span", null, o(a(s).label(`${ne.items.length} 条提醒`, `${ne.items.length} reminders`)), 1)
                  ]),
                  n("div", mb, [
                    (v(!0), y(J, null, ve(ne.items, (ke) => (v(), y("article", {
                      key: ke.id,
                      class: "provider-card"
                    }, [
                      n("header", bb, [
                        n("div", null, [
                          n("strong", null, o(ke.title || a(s).label("系统提醒", "System reminder")), 1),
                          n("p", null, o(a(Ze)(ke.createdAt)), 1)
                        ]),
                        n("div", vb, [
                          n("span", {
                            class: he(["pill", Z(ke.severity)])
                          }, o(ie(ke.severity)), 3),
                          n("span", {
                            class: he(["pill", ke.read ? "pill--muted" : "pill--warning"])
                          }, o(ke.read ? a(s).label("已读", "Read") : a(s).label("未读", "Unread")), 3)
                        ])
                      ]),
                      n("p", null, o(ke.message), 1),
                      n("div", yb, [
                        n("span", wb, o(Ie(ke.source)), 1),
                        n("span", $b, o(_e(ke.type)), 1)
                      ]),
                      n("div", kb, [
                        n("button", {
                          class: "inline-link",
                          type: "button",
                          disabled: h.value === ke.id,
                          onClick: (Be) => A(ke)
                        }, o(h.value === ke.id ? a(s).label("处理中…", "Working…") : ke.read ? a(s).label("重新标记为未读", "Mark as unread") : a(s).label("标记为已读", "Mark as read")), 9, Sb),
                        n("button", {
                          class: "inline-link",
                          type: "button",
                          disabled: m.value === ke.id,
                          onClick: (Be) => ue(ke)
                        }, o(m.value === ke.id ? a(s).label("复制中…", "Copying…") : a(s).label("复制详情", "Copy details")), 9, Cb)
                      ])
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (v(), y("div", xb, o(a(s).label("当前筛选条件下没有匹配的提醒。", "No reminders match the current filters.")), 1)),
              U.value.length ? (v(), y("div", Rb, [
                n("p", Eb, o(a(s).label(
                  `当前第 ${p.value} / ${T.value} 页，共 ${U.value.length} 条提醒`,
                  `Page ${p.value} of ${T.value}, ${U.value.length} reminders total`
                )), 1),
                n("div", Ab, [
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: p.value <= 1,
                    onClick: K[12] || (K[12] = (ne) => p.value -= 1)
                  }, o(a(s).label("上一页", "Previous")), 9, Tb),
                  n("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: p.value >= T.value,
                    onClick: K[13] || (K[13] = (ne) => p.value += 1)
                  }, o(a(s).label("下一页", "Next")), 9, Pb)
                ])
              ])) : we("", !0)
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (v(), ht(re, {
          key: 1,
          title: a(s).label("最近时间线", "Recent timeline"),
          eyebrow: "Timeline"
        }, {
          default: oe(() => [
            O.value.length ? (v(), y("div", Ob, [
              (v(!0), y(J, null, ve(O.value, (ne) => (v(), y("article", {
                key: ne.id,
                class: "provider-card"
              }, [
                n("header", Mb, [
                  n("div", null, [
                    n("strong", null, o(ne.title || a(s).label("系统事件", "System event")), 1),
                    n("p", null, o(a(Ze)(ne.createdAt)), 1)
                  ]),
                  n("span", Ib, o(ye(ne.type)), 1)
                ]),
                n("p", null, o(ne.description), 1),
                Te(ne) ? (v(), y("p", Nb, o(Te(ne)), 1)) : we("", !0)
              ]))), 128))
            ])) : (v(), y("div", Db, o(a(s).label("时间线里还没有新的记录。", "No timeline events are available yet.")), 1))
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : we("", !0)
    ]));
  }
}), Lb = { class: "page-stack" }, Ub = { class: "page-header" }, Vb = { class: "page-header__eyebrow" }, Bb = { class: "page-header__title" }, Gb = { class: "page-header__description" }, Hb = {
  key: 0,
  class: "page-empty"
}, Wb = {
  key: 1,
  class: "page-empty page-empty--error"
}, Kb = { class: "code-panel" }, jb = { class: "code-panel" }, zb = /* @__PURE__ */ Le({
  __name: "OpenClawPage",
  setup(e) {
    const t = et(), s = nt(() => uh());
    function l(i) {
      return JSON.stringify(i, null, 2);
    }
    return (i, r) => (v(), y("div", Lb, [
      n("header", Ub, [
        n("div", null, [
          n("p", Vb, o(a(t).label("OpenClaw / First slice", "OpenClaw / First slice")), 1),
          n("h2", Bb, o(a(t).label("OpenClaw 生命周期面板", "OpenClaw lifecycle panel")), 1),
          n("p", Gb, o(a(t).label("保留现有后端接口，只把读取、结构和高级区分层迁到 Vue 壳层。", "Keep the current backend API and move its reads, structure, and advanced layout into the Vue shell.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (c) => a(s).execute({ silent: !0 }))
        }, o(a(s).refreshing ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新", "Refresh")), 1)
      ]),
      a(s).loading ? (v(), y("div", Hb, o(a(t).label("正在加载 OpenClaw 状态…", "Loading the OpenClaw status…")), 1)) : a(s).error ? (v(), y("div", Wb, o(a(s).error), 1)) : a(s).data ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(t).label("状态快照", "Status snapshot"),
          eyebrow: "Status"
        }, {
          default: oe(() => [
            n("pre", Kb, o(l(a(s).data.status)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(t).label("可选目标与回退目录", "Targets and rollback catalog"),
          eyebrow: "Targets"
        }, {
          default: oe(() => [
            n("pre", jb, o(l(a(s).data.targets)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : we("", !0)
    ]));
  }
}), qb = { class: "page-stack" }, Jb = { class: "page-header" }, Qb = { class: "page-header__eyebrow" }, Yb = { class: "page-header__title" }, Xb = { class: "page-header__description" }, Zb = {
  key: 0,
  class: "page-empty"
}, ev = {
  key: 1,
  class: "page-empty page-empty--error"
}, tv = { class: "code-panel" }, sv = { class: "code-panel" }, nv = /* @__PURE__ */ Le({
  __name: "OperationsPage",
  setup(e) {
    const t = et(), s = nt(() => ch());
    function l(i) {
      return JSON.stringify(i, null, 2);
    }
    return (i, r) => (v(), y("div", qb, [
      n("header", Jb, [
        n("div", null, [
          n("p", Qb, o(a(t).label("运维 / First slice", "Operations / First slice")), 1),
          n("h2", Yb, o(a(t).label("运行态与后台服务", "Runtime and background services")), 1),
          n("p", Xb, o(a(t).label("先把状态读取、最小刷新和结构化信息展示模块化。后续再逐步迁移交互按钮。", "Modularize status reads, light refresh, and structured rendering first. Button interactions can follow in later slices.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (c) => a(s).execute({ silent: !0 }))
        }, o(a(s).refreshing ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新", "Refresh")), 1)
      ]),
      a(s).loading ? (v(), y("div", Zb, o(a(t).label("正在加载运维状态…", "Loading operations status…")), 1)) : a(s).error ? (v(), y("div", ev, o(a(s).error), 1)) : a(s).data ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(t).label("后台 Web 报告", "Background web report"),
          eyebrow: "Web report"
        }, {
          default: oe(() => [
            n("pre", tv, o(l(a(s).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(t).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Services"
        }, {
          default: oe(() => [
            n("pre", sv, o(l(a(s).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : we("", !0)
    ]));
  }
});
async function lv() {
  const [e, t, s, l] = await Promise.all([
    Ee("/api/recovery/overview"),
    Ee("/api/recovery/points?limit=20"),
    Ee("/api/git-sync/status"),
    Ee("/api/git-sync/gitignore-preview?mode=smart")
  ]);
  return {
    overview: e,
    points: t.items || [],
    gitStatus: s,
    gitIgnorePreview: l
  };
}
function av(e) {
  return Ne("/api/recovery/save", { label: e || "" });
}
function iv(e) {
  return Ne("/api/recovery/restore", { commitSha: e });
}
function ov() {
  return Ne("/api/git-sync/init", {});
}
function rv() {
  return Ne("/api/git-sync/check-private", {});
}
function cv(e) {
  return Ne("/api/git-sync/commit", { message: "" });
}
function uv() {
  return Ne("/api/git-sync/push", {});
}
function dv(e) {
  return Ne("/api/git-sync/sync", { message: "" });
}
function fv(e = "smart") {
  return Ne("/api/git-sync/gitignore-apply", { mode: e });
}
const pv = { class: "page-stack" }, hv = { class: "page-header" }, _v = { class: "page-header__eyebrow" }, gv = { class: "page-header__title" }, mv = { class: "page-header__description" }, bv = {
  key: 0,
  class: "page-empty"
}, vv = {
  key: 1,
  class: "page-empty page-empty--error"
}, yv = { class: "provider-card__header" }, wv = { class: "muted-copy" }, $v = { class: "stat-grid" }, kv = { class: "stat-card" }, Sv = { class: "stat-card__label" }, Cv = { class: "stat-card" }, xv = { class: "stat-card__label" }, Rv = { class: "stat-card" }, Ev = { class: "stat-card__label" }, Av = { class: "stat-card" }, Tv = { class: "stat-card__label" }, Pv = { class: "list-stack" }, Ov = { class: "action-row" }, Mv = { class: "pill pill--info" }, Iv = { class: "action-row" }, Nv = { class: "pill pill--success" }, Dv = { class: "settings-grid settings-grid--wide" }, Fv = { class: "settings-field settings-field--full" }, Lv = { class: "page-actions" }, Uv = ["disabled"], Vv = {
  key: 0,
  class: "provider-stack"
}, Bv = { class: "provider-card__header" }, Gv = { class: "pill-row" }, Hv = { class: "pill pill--info" }, Wv = {
  key: 0,
  class: "muted-copy"
}, Kv = { class: "page-actions" }, jv = ["onClick"], zv = ["disabled", "onClick"], qv = {
  key: 1,
  class: "page-empty"
}, Jv = { class: "muted-copy" }, Qv = { class: "page-actions" }, Yv = {
  class: "inline-link",
  href: "/#recovery",
  target: "_blank",
  rel: "noreferrer"
}, Xv = { class: "stat-grid" }, Zv = { class: "stat-card" }, ey = { class: "stat-card__label" }, ty = { class: "stat-card" }, sy = { class: "stat-card__label" }, ny = { class: "stat-card" }, ly = { class: "stat-card__label" }, ay = { class: "stat-card" }, iy = { class: "stat-card__label" }, oy = { class: "page-actions" }, ry = ["disabled"], cy = ["disabled"], uy = ["disabled"], dy = ["disabled"], fy = ["disabled"], py = {
  key: 0,
  class: "muted-copy"
}, hy = { class: "list-stack" }, _y = { class: "action-row" }, gy = { class: "action-row" }, my = { class: "action-row" }, by = { class: "code-panel" }, vy = { class: "muted-copy" }, yy = { class: "stat-grid" }, wy = { class: "stat-card" }, $y = { class: "stat-card__label" }, ky = { class: "stat-card" }, Sy = { class: "stat-card__label" }, Cy = { class: "code-panel" }, xy = { class: "page-actions" }, Ry = ["disabled"], Ey = /* @__PURE__ */ Le({
  __name: "RecoveryPage",
  setup(e) {
    const t = et(), s = gt(), l = /* @__PURE__ */ Q("center"), i = /* @__PURE__ */ Q(""), r = /* @__PURE__ */ Q(""), c = /* @__PURE__ */ Q(!1), u = /* @__PURE__ */ Q(""), d = /* @__PURE__ */ Q(""), p = nt(() => lv()), h = ae(() => [
      { id: "center", label: t.label("恢复中心", "Recovery center") },
      { id: "advanced", label: t.label("高级 Git", "Advanced Git") }
    ]), f = ae(() => {
      var T;
      const U = (T = p.data) == null ? void 0 : T.overview;
      return U ? !U.repoReady || U.warnings.length > 0 ? "pill--warning" : U.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
    });
    function m() {
      var T;
      const U = (T = p.data) == null ? void 0 : T.overview;
      return U ? U.protected ? U.remoteReady ? t.label("已上云保护", "Cloud protection ready") : t.label("当前仅本机可恢复", "Local recovery only") : t.label("尚未建立保护", "Protection not set up") : t.label("读取中", "Loading");
    }
    function _(U) {
      const w = {
        "install-git": { zh: "先安装 Git", en: "Install Git first" },
        "setup-protection": { zh: "先完成保护设置", en: "Complete protection setup first" },
        "save-first-point": { zh: "创建首个恢复点", en: "Create the first recovery point" },
        "save-current-state": { zh: "先保存当前状态", en: "Save the current state first" },
        "review-restored-state": { zh: "检查刚恢复的状态", en: "Review the restored state" },
        "connect-private-remote": { zh: "连接私有仓库", en: "Connect a private remote" },
        "sync-latest-point": { zh: "把最新保护点同步到云端", en: "Sync the latest point to the cloud" },
        protected: { zh: "当前已经受保护", en: "Protection is already in place" }
      }[U || ""];
      return w ? t.label(w.zh, w.en) : U || "-";
    }
    function D(U) {
      return U.kind === "auto" ? t.label("自动保护", "Auto protection") : U.kind === "restore" ? t.label("已恢复到此状态", "Restore point") : t.label("手动保存", "Manual save");
    }
    async function E() {
      await p.execute({ silent: !!p.data });
    }
    async function z() {
      c.value = !0;
      try {
        const U = await av(i.value.trim() || void 0);
        s.pushToast({
          tone: U.success ? "success" : "error",
          message: U.message
        }), U.success && (i.value = "", await E());
      } catch (U) {
        s.pushToast({
          tone: "error",
          message: U instanceof Error ? U.message : String(U)
        });
      } finally {
        c.value = !1;
      }
    }
    async function O(U) {
      if (await s.confirm({
        title: t.label("恢复到这个状态", "Restore this state"),
        message: t.label(
          `确认回到 ${U.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
          `Restore ${U.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`
        ),
        confirmLabel: t.label("确认恢复", "Restore now"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      })) {
        u.value = U.commitSha;
        try {
          const w = await iv(U.commitSha);
          s.pushToast({
            tone: w.success ? "success" : "error",
            message: w.message
          }), await E();
        } catch (w) {
          s.pushToast({
            tone: "error",
            message: w instanceof Error ? w.message : String(w)
          });
        } finally {
          u.value = "";
        }
      }
    }
    async function P(U) {
      d.value = U, r.value = "";
      try {
        const T = U === "init" ? await ov() : U === "private" ? await rv() : U === "checkpoint" ? await cv() : U === "push" ? await uv() : U === "sync" ? await dv() : await fv("smart");
        r.value = T.message, s.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), await E();
      } catch (T) {
        const w = T instanceof Error ? T.message : String(T);
        r.value = w, s.pushToast({
          tone: "error",
          message: w
        });
      } finally {
        d.value = "";
      }
    }
    function B(U) {
      l.value = U;
    }
    async function H(U) {
      var T;
      typeof navigator > "u" || !((T = navigator.clipboard) != null && T.writeText) || (await navigator.clipboard.writeText(U), s.pushToast({
        tone: "success",
        message: t.label("恢复点哈希已复制。", "Recovery point hash copied.")
      }));
    }
    return (U, T) => (v(), y("div", pv, [
      n("header", hv, [
        n("div", null, [
          n("p", _v, o(a(t).label("备份与恢复 / Second slice", "Backup & Recovery / Second slice")), 1),
          n("h2", gv, o(a(t).label("备份与恢复", "Backup & Recovery")), 1),
          n("p", mv, o(a(t).label("默认先讲“保存现在、回到某个状态、然后继续往前走”，把 Git 细节下沉到高级视图。", "Start with save now, go back to a protected state, then keep moving forward, while pushing raw Git details into the advanced view.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: E
        }, o(a(p).refreshing ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新", "Refresh")), 1)
      ]),
      X($n, {
        items: h.value,
        "active-id": l.value,
        onChange: B
      }, null, 8, ["items", "active-id"]),
      a(p).loading ? (v(), y("div", bv, o(a(t).label("正在读取保护状态…", "Loading protection status…")), 1)) : a(p).error ? (v(), y("div", vv, o(a(p).error), 1)) : a(p).data ? (v(), y(J, { key: 2 }, [
        l.value === "center" ? (v(), y(J, { key: 0 }, [
          X(re, {
            title: a(t).label("当前保护状态", "Current protection state"),
            eyebrow: "Overview"
          }, {
            default: oe(() => {
              var w;
              return [
                n("div", yv, [
                  n("p", wv, o(a(t).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
                  n("span", {
                    class: he(["pill", f.value])
                  }, o(m()), 3)
                ]),
                n("div", $v, [
                  n("article", kv, [
                    n("p", Sv, o(a(t).label("当前主线", "Current branch")), 1),
                    n("strong", null, o(a(p).data.overview.currentBranch || "-"), 1),
                    n("span", null, o(a(t).label("恢复后仍会继续写在这条主线上", "Future saves continue on the same main line after a restore")), 1)
                  ]),
                  n("article", Cv, [
                    n("p", xv, o(a(t).label("最近保存", "Last saved")), 1),
                    n("strong", null, o(a(Ze)(a(p).data.overview.lastSavedAt)), 1),
                    n("span", null, o(((w = a(p).data.overview.latestPoint) == null ? void 0 : w.title) || a(t).label("还没有恢复点", "No recovery point yet")), 1)
                  ]),
                  n("article", Rv, [
                    n("p", Ev, o(a(t).label("最近上云", "Last pushed")), 1),
                    n("strong", null, o(a(Ze)(a(p).data.overview.lastPushedAt)), 1),
                    n("span", null, o(a(p).data.overview.remoteReady ? a(t).label("云端保护已就绪", "Cloud protection is ready") : a(t).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
                  ]),
                  n("article", Av, [
                    n("p", Tv, o(a(t).label("下一步建议", "Recommended next step")), 1),
                    n("strong", null, o(_(a(p).data.overview.nextAction)), 1),
                    n("span", null, o(a(p).data.overview.unsyncedChanges ? a(t).label("当前存在未同步变化", "There are unsynced changes right now") : a(t).label("当前没有额外待处理变化", "No extra pending changes right now")), 1)
                  ])
                ])
              ];
            }),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("下一步建议", "Recommended next actions"),
            eyebrow: "Guide"
          }, {
            default: oe(() => [
              n("div", Pv, [
                n("article", Ov, [
                  n("div", null, [
                    n("h3", null, o(a(t).label("先保住现在", "Protect the current state")), 1),
                    n("p", null, o(a(t).label("当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。", "Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.")), 1)
                  ]),
                  n("span", Mv, o(_(a(p).data.overview.nextAction)), 1)
                ]),
                n("article", Iv, [
                  n("div", null, [
                    n("h3", null, o(a(t).label("回退不会删历史", "Restoring does not delete history")), 1),
                    n("p", null, o(a(t).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
                  ]),
                  n("span", Nv, o(a(t).label("同一主线继续", "Continue on the same main line")), 1)
                ]),
                (v(!0), y(J, null, ve(a(p).data.overview.warnings, (w) => (v(), y("article", {
                  key: w,
                  class: "risk-row"
                }, [
                  n("strong", null, o(a(t).label("注意事项", "Warning")), 1),
                  n("span", null, o(w), 1)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("立即保存", "Save now"),
            eyebrow: "Checkpoint"
          }, {
            default: oe(() => [
              n("div", Dv, [
                n("label", Fv, [
                  n("span", null, o(a(t).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
                  n("small", null, o(a(t).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
                  Se(n("input", {
                    "onUpdate:modelValue": T[0] || (T[0] = (w) => i.value = w),
                    class: "settings-input",
                    type: "text"
                  }, null, 512), [
                    [Fe, i.value]
                  ])
                ])
              ]),
              n("div", Lv, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: c.value,
                  onClick: z
                }, o(c.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存当前状态", "Save current state")), 9, Uv)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("恢复点时间线", "Recovery point timeline"),
            eyebrow: "Timeline"
          }, {
            default: oe(() => [
              a(p).data.points.length ? (v(), y("div", Vv, [
                (v(!0), y(J, null, ve(a(p).data.points, (w) => (v(), y("article", {
                  key: w.id,
                  class: "provider-card"
                }, [
                  n("header", Bv, [
                    n("div", null, [
                      n("strong", null, o(w.title), 1),
                      n("p", null, o(a(Ze)(w.createdAt)) + " · " + o(a(Aa)(w.commitSha)), 1)
                    ]),
                    n("div", Gv, [
                      n("span", Hv, o(D(w)), 1),
                      n("span", {
                        class: he(["pill", w.pushed ? "pill--success" : "pill--warning"])
                      }, o(w.pushed ? a(t).label("已上云", "Synced") : a(t).label("仅本机", "Local only")), 3)
                    ])
                  ]),
                  n("p", null, o(w.summary), 1),
                  w.sourceCommitSha ? (v(), y("p", Wv, o(a(t).label("来源节点：", "Source commit: ")) + o(a(Aa)(w.sourceCommitSha)), 1)) : we("", !0),
                  n("div", Kv, [
                    n("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (S) => H(w.commitSha)
                    }, o(a(t).label("复制节点", "Copy point")), 9, jv),
                    n("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: !w.restorable || u.value === w.commitSha,
                      onClick: (S) => O(w)
                    }, o(u.value === w.commitSha ? a(t).label("恢复中…", "Restoring…") : a(t).label("回到这个状态", "Restore this state")), 9, zv)
                  ])
                ]))), 128))
              ])) : (v(), y("div", qv, o(a(t).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (v(), y(J, { key: 1 }, [
          X(re, {
            title: a(t).label("高级 Git 入口", "Advanced Git entry"),
            eyebrow: "Advanced"
          }, {
            default: oe(() => [
              n("p", Jv, o(a(t).label("这里先接入最常用的高级动作和状态读取；更复杂的远端绑定、OAuth 和专家级操作，当前阶段仍保留在正式控制台。", "This view already brings in the most common advanced actions and status reads. More complex remote binding, OAuth, and expert-level operations still stay in the production console for now.")), 1),
              n("div", Qv, [
                n("a", Yv, o(a(t).label("打开正式控制台中的高级 Git", "Open advanced Git in the production console")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("当前仓库状态", "Current repository status"),
            eyebrow: "Status"
          }, {
            default: oe(() => [
              n("div", Xv, [
                n("article", Zv, [
                  n("p", ey, o(a(t).label("仓库初始化", "Repository")), 1),
                  n("strong", null, o(a(p).data.gitStatus.repoInitialized ? a(t).label("已初始化", "Initialized") : a(t).label("未初始化", "Not initialized")), 1),
                  n("span", null, o(a(p).data.gitStatus.repoPath), 1)
                ]),
                n("article", ty, [
                  n("p", sy, o(a(t).label("远端仓库", "Remote")), 1),
                  n("strong", null, o(a(p).data.gitStatus.remoteName || "-"), 1),
                  n("span", null, o(a(p).data.gitStatus.remoteUrl || a(t).label("还没绑定远端", "No remote connected yet")), 1)
                ]),
                n("article", ny, [
                  n("p", ly, o(a(t).label("认证方式", "Auth mode")), 1),
                  n("strong", null, o(a(p).data.gitStatus.authMode || "-"), 1),
                  n("span", null, o(a(p).data.gitStatus.authConfigured ? a(t).label("当前已配置认证", "Authentication is configured") : a(t).label("当前还没配置认证", "Authentication is not configured yet")), 1)
                ]),
                n("article", ay, [
                  n("p", iy, o(a(t).label("私有检查", "Private check")), 1),
                  n("strong", null, o(a(p).data.gitStatus.repoPrivate === !0 ? a(t).label("已通过", "Passed") : a(p).data.gitStatus.repoPrivate === !1 ? a(t).label("未通过", "Failed") : a(t).label("未检查", "Pending")), 1),
                  n("span", null, o(a(p).data.gitStatus.state.lastSyncAt ? `${a(t).label("最近同步", "Last sync")} ${a(Ze)(a(p).data.gitStatus.state.lastSyncAt)}` : a(t).label("还没有成功同步记录", "No successful sync record yet")), 1)
                ])
              ]),
              n("div", oy, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: d.value === "init",
                  onClick: T[1] || (T[1] = (w) => P("init"))
                }, o(d.value === "init" ? a(t).label("初始化中…", "Initializing…") : a(t).label("初始化保护仓库", "Initialize protection repo")), 9, ry),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: d.value === "private",
                  onClick: T[2] || (T[2] = (w) => P("private"))
                }, o(d.value === "private" ? a(t).label("检查中…", "Checking…") : a(t).label("检查私有仓库", "Check private remote")), 9, cy),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: d.value === "checkpoint",
                  onClick: T[3] || (T[3] = (w) => P("checkpoint"))
                }, o(d.value === "checkpoint" ? a(t).label("提交中…", "Committing…") : a(t).label("创建本地 checkpoint", "Create local checkpoint")), 9, uy),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: d.value === "push",
                  onClick: T[4] || (T[4] = (w) => P("push"))
                }, o(d.value === "push" ? a(t).label("推送中…", "Pushing…") : a(t).label("推送到云端", "Push to cloud")), 9, dy),
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: d.value === "sync",
                  onClick: T[5] || (T[5] = (w) => P("sync"))
                }, o(d.value === "sync" ? a(t).label("同步中…", "Syncing…") : a(t).label("提交并同步", "Commit and sync")), 9, fy)
              ]),
              r.value ? (v(), y("p", py, o(r.value), 1)) : we("", !0)
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("保护范围摘要", "Protection scope summary"),
            eyebrow: "Scope"
          }, {
            default: oe(() => [
              n("div", hy, [
                n("article", _y, [
                  n("div", null, [
                    n("h3", null, o(a(t).label("当前工作树变化", "Current worktree changes")), 1),
                    n("p", null, o(a(t).label("这些文件会进入根保护线；嵌套仓库会被单独标记，不会被误提交到根线。", "These files enter the root protection line, while nested repositories are marked separately so they are not committed into the root line by mistake.")), 1)
                  ]),
                  n("strong", null, o(a(p).data.gitStatus.changedFiles.length), 1)
                ]),
                n("article", gy, [
                  n("div", null, [
                    n("h3", null, o(a(t).label("可直接纳入保护", "Stageable in root line")), 1),
                    n("p", null, o(a(t).label("这些改动可以直接由 Guard 提交为恢复点。", "These changes can be committed directly by Guard as recovery points.")), 1)
                  ]),
                  n("strong", null, o(a(p).data.gitStatus.stageableChangedFiles.length), 1)
                ]),
                n("article", my, [
                  n("div", null, [
                    n("h3", null, o(a(t).label("嵌套仓库", "Nested repositories")), 1),
                    n("p", null, o(a(t).label("这些目录更适合单独维护，Guard 不会在根保护线里直接接管。", "These directories are better maintained separately. Guard does not take them over inside the root protection line.")), 1)
                  ]),
                  n("strong", null, o(a(p).data.gitStatus.skippedEmbeddedRepos.length), 1)
                ])
              ]),
              n("pre", by, o(JSON.stringify({
                changedFiles: a(p).data.gitStatus.changedFiles,
                stageableChangedFiles: a(p).data.gitStatus.stageableChangedFiles,
                skippedEmbeddedRepos: a(p).data.gitStatus.skippedEmbeddedRepos
              }, null, 2)), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label(".gitignore 建议", ".gitignore suggestions"),
            eyebrow: "Ignore rules"
          }, {
            default: oe(() => [
              n("p", vy, o(a(t).label("当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。", "When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.")), 1),
              n("div", yy, [
                n("article", wy, [
                  n("p", $y, o(a(t).label("嵌套仓库", "Embedded repos")), 1),
                  n("strong", null, o(a(p).data.gitIgnorePreview.embeddedRepos.length), 1),
                  n("span", null, o(a(t).label("需要单独维护的子仓库", "Child repositories that should be maintained separately")), 1)
                ]),
                n("article", ky, [
                  n("p", Sy, o(a(t).label("待追加规则", "Missing rules")), 1),
                  n("strong", null, o(a(p).data.gitIgnorePreview.missingEntries.length), 1),
                  n("span", null, o(a(p).data.gitIgnorePreview.gitignorePath), 1)
                ])
              ]),
              n("pre", Cy, o(a(p).data.gitIgnorePreview.appendBlock || a(t).label("当前没有需要追加的规则。", "There are no extra rules to append right now.")), 1),
              n("div", xy, [
                n("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: d.value === "gitignore",
                  onClick: T[6] || (T[6] = (w) => P("gitignore"))
                }, o(d.value === "gitignore" ? a(t).label("写入中…", "Applying…") : a(t).label("追加推荐规则", "Append recommended rules")), 9, Ry)
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64))
      ], 64)) : we("", !0)
    ]));
  }
});
function Ay() {
  return Ee("/api/agents");
}
const Ty = { class: "page-stack" }, Py = { class: "page-header" }, Oy = { class: "page-header__eyebrow" }, My = { class: "page-header__title" }, Iy = { class: "page-header__description" }, Ny = {
  key: 0,
  class: "page-empty"
}, Dy = {
  key: 1,
  class: "page-empty page-empty--error"
}, Fy = { class: "stat-grid" }, Ly = { class: "stat-card" }, Uy = { class: "stat-card__label" }, Vy = { class: "stat-card" }, By = { class: "stat-card__label" }, Gy = { class: "stat-card" }, Hy = { class: "stat-card__label" }, Wy = { class: "stat-card" }, Ky = { class: "stat-card__label" }, jy = {
  key: 0,
  class: "provider-stack"
}, zy = { class: "provider-card__header" }, qy = { class: "pill-row" }, Jy = {
  key: 0,
  class: "pill pill--success"
}, Qy = {
  key: 1,
  class: "pill pill--muted"
}, Yy = { class: "mini-list" }, Xy = { class: "mini-list__item mini-list__item--stack" }, Zy = { class: "mini-list__item mini-list__item--stack" }, e1 = { class: "pill-row" }, t1 = { class: "page-actions" }, s1 = ["onClick"], n1 = {
  key: 1,
  class: "page-empty"
}, l1 = /* @__PURE__ */ Le({
  __name: "RolesPage",
  setup(e) {
    const t = et(), s = co(), l = Sl(), i = nt(() => Ay()), r = ae(() => {
      var f;
      return ((f = i.data) == null ? void 0 : f.agents) || [];
    }), c = ae(() => r.value.filter((f) => f.isDefault).length), u = ae(() => r.value.filter((f) => f.workspaceExists).length), d = ae(() => r.value.filter((f) => p(f)).length);
    function p(f) {
      return f.docStatus.soul && f.docStatus.user && f.docStatus.agents && f.docStatus.memory;
    }
    function h(f) {
      l.setMode("all"), l.setCurrentPath(f.resolvedWorkspace), l.setSelectedFilePath(""), l.setSelectedMemoryFilePath(""), s.push("/files");
    }
    return (f, m) => (v(), y("div", Ty, [
      n("header", Py, [
        n("div", null, [
          n("p", Oy, o(a(t).label("角色 / Third slice", "Roles / Third slice")), 1),
          n("h2", My, o(a(t).label("角色目录", "Role catalog")), 1),
          n("p", Iy, o(a(t).label("先把 Agent 目录、默认角色和工作区文档健康度迁进新壳层里，方便后续与文件视图和会话视图打通。", "Move the agent catalog, default role state, and workspace doc health into the new shell so it can connect naturally with Files and Sessions next.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: m[0] || (m[0] = (_) => a(i).execute({ silent: !0 }))
        }, o(a(i).refreshing ? a(t).label("刷新中…", "Refreshing…") : a(t).label("Refresh", "Refresh")), 1)
      ]),
      a(i).loading ? (v(), y("div", Ny, o(a(t).label("正在读取角色目录…", "Loading the role catalog…")), 1)) : a(i).error ? (v(), y("div", Dy, o(a(i).error), 1)) : (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(t).label("团队概览", "Team overview"),
          eyebrow: "Summary"
        }, {
          default: oe(() => [
            n("div", Fy, [
              n("article", Ly, [
                n("p", Uy, o(a(t).label("角色总数", "Roles")), 1),
                n("strong", null, o(a(fe)(r.value.length)), 1),
                n("span", null, o(a(t).label("当前已接入到 Guard 的角色目录", "Role entries currently discovered by Guard")), 1)
              ]),
              n("article", Vy, [
                n("p", By, o(a(t).label("默认角色", "Default role")), 1),
                n("strong", null, o(a(fe)(c.value)), 1),
                n("span", null, o(c.value > 0 ? a(t).label("至少有一个默认角色", "At least one default role is configured") : a(t).label("还没有默认角色", "No default role is configured yet")), 1)
              ]),
              n("article", Gy, [
                n("p", Hy, o(a(t).label("工作区可用", "Workspaces ready")), 1),
                n("strong", null, o(a(fe)(u.value)), 1),
                n("span", null, o(a(t).label("对应的工作区目录已经存在", "The mapped workspace directory already exists")), 1)
              ]),
              n("article", Wy, [
                n("p", Ky, o(a(t).label("关键文档齐全", "Core docs ready")), 1),
                n("strong", null, o(a(fe)(d.value)), 1),
                m[1] || (m[1] = n("span", null, "SOUL / USER / AGENTS / MEMORY", -1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(t).label("角色成员", "Role entries"),
          eyebrow: "Catalog"
        }, {
          default: oe(() => [
            r.value.length ? (v(), y("div", jy, [
              (v(!0), y(J, null, ve(r.value, (_) => (v(), y("article", {
                key: _.id,
                class: "provider-card"
              }, [
                n("header", zy, [
                  n("div", null, [
                    n("strong", null, o(_.name), 1),
                    n("p", null, o(_.resolvedWorkspace || _.workspace), 1)
                  ]),
                  n("div", qy, [
                    _.isDefault ? (v(), y("span", Jy, o(a(t).label("默认", "Default")), 1)) : (v(), y("span", Qy, o(_.id), 1)),
                    n("span", {
                      class: he(["pill", _.workspaceExists ? "pill--success" : "pill--warning"])
                    }, o(_.workspaceExists ? a(t).label("工作区就绪", "Workspace ready") : a(t).label("工作区缺失", "Workspace missing")), 3)
                  ])
                ]),
                n("div", Yy, [
                  n("div", Xy, [
                    n("strong", null, o(a(t).label("模型路由", "Model route")), 1),
                    n("p", null, o(_.modelId || a(t).label("沿用默认模型", "Uses the default model route")), 1)
                  ]),
                  n("div", Zy, [
                    n("strong", null, o(a(t).label("关键文档", "Core docs")), 1),
                    n("div", e1, [
                      n("span", {
                        class: he(["pill", _.docStatus.soul ? "pill--success" : "pill--warning"])
                      }, "SOUL", 2),
                      n("span", {
                        class: he(["pill", _.docStatus.user ? "pill--success" : "pill--warning"])
                      }, "USER", 2),
                      n("span", {
                        class: he(["pill", _.docStatus.agents ? "pill--success" : "pill--warning"])
                      }, "AGENTS", 2),
                      n("span", {
                        class: he(["pill", _.docStatus.memory ? "pill--success" : "pill--warning"])
                      }, "MEMORY", 2)
                    ])
                  ])
                ]),
                n("div", t1, [
                  n("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (D) => h(_)
                  }, o(a(t).label("打开对应工作区", "Open workspace")), 9, s1)
                ])
              ]))), 128))
            ])) : (v(), y("div", n1, o(a(t).label("还没有发现可用角色。请先检查 OpenClaw 配置和安装状态。", "No role entries were discovered yet. Check the OpenClaw configuration and installation state first.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64))
    ]));
  }
});
function a1(e, t = 100) {
  const s = new URLSearchParams({
    q: e,
    limit: String(t)
  });
  return Ee(`/api/search?${s.toString()}`);
}
const i1 = { class: "page-stack" }, o1 = { class: "page-header" }, r1 = { class: "page-header__eyebrow" }, c1 = { class: "page-header__title" }, u1 = { class: "page-header__description" }, d1 = {
  class: "inline-link inline-link--primary",
  type: "submit"
}, f1 = {
  key: 0,
  class: "page-empty page-empty--error"
}, p1 = { class: "stat-grid" }, h1 = { class: "stat-card" }, _1 = { class: "stat-card__label" }, g1 = { class: "stat-card" }, m1 = { class: "stat-card__label" }, b1 = { class: "stat-card" }, v1 = { class: "stat-card__label" }, y1 = { class: "stat-card" }, w1 = { class: "stat-card__label" }, $1 = {
  key: 0,
  class: "page-empty"
}, k1 = {
  key: 1,
  class: "provider-stack"
}, S1 = { class: "provider-card__header" }, C1 = { class: "pill-row" }, x1 = { class: "page-actions" }, R1 = ["onClick"], E1 = {
  key: 2,
  class: "page-empty"
}, A1 = /* @__PURE__ */ Le({
  __name: "SearchPage",
  setup(e) {
    const t = et(), s = co(), l = gt(), i = Sl(), r = /* @__PURE__ */ Q(i.searchQuery), c = /* @__PURE__ */ Q(!1), u = /* @__PURE__ */ Q(null), d = /* @__PURE__ */ Q(!1), p = /* @__PURE__ */ Q([]), h = ae(() => new Set(p.value.map((_) => _.path)).size);
    Ue(r, (_) => {
      i.setSearchQuery(_);
    });
    async function f() {
      const _ = r.value.trim();
      if (i.setSearchQuery(_), d.value = !0, u.value = null, !_) {
        p.value = [];
        return;
      }
      c.value = !0;
      try {
        const D = await a1(_, 100);
        p.value = D.results || [];
      } catch (D) {
        u.value = D instanceof Error ? D.message : String(D);
      } finally {
        c.value = !1;
      }
    }
    function m(_) {
      i.requestReveal(_.path), l.pushToast({
        tone: "info",
        message: t.label("已切到文件页并定位结果。", "Switched to Files and queued the selected result."),
        durationMs: 2200
      }), s.push("/files");
    }
    return qt(() => {
      i.searchQuery.trim() && f();
    }), (_, D) => (v(), y("div", i1, [
      n("header", o1, [
        n("div", null, [
          n("p", r1, o(a(t).label("搜索 / Third slice", "Search / Third slice")), 1),
          n("h2", c1, o(a(t).label("工作区搜索", "Workspace search")), 1),
          n("p", u1, o(a(t).label("先让搜索直接覆盖 Guard 管理的工作区与核心记忆，并且可以一跳回到文件页继续编辑。", "Start with search across Guard-managed workspaces and core memory, then jump straight back into Files to continue editing.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: f
        }, o(c.value ? a(t).label("搜索中…", "Searching…") : a(t).label("Search", "Search")), 1)
      ]),
      X(re, {
        title: a(t).label("搜索条件", "Search query"),
        eyebrow: "Query"
      }, {
        default: oe(() => [
          n("form", {
            class: "search-form",
            onSubmit: bn(f, ["prevent"])
          }, [
            Se(n("input", {
              "onUpdate:modelValue": D[0] || (D[0] = (E) => r.value = E),
              class: "settings-input",
              type: "text",
              placeholder: "SOUL.md / qwen / fallback / cron"
            }, null, 512), [
              [Fe, r.value]
            ]),
            n("button", d1, o(c.value ? a(t).label("搜索中…", "Searching…") : a(t).label("开始搜索", "Run search")), 1)
          ], 32)
        ]),
        _: 1
      }, 8, ["title"]),
      u.value ? (v(), y("div", f1, o(u.value), 1)) : we("", !0),
      X(re, {
        title: a(t).label("结果概览", "Result overview"),
        eyebrow: "Summary"
      }, {
        default: oe(() => [
          n("div", p1, [
            n("article", h1, [
              n("p", _1, o(a(t).label("命中条数", "Matches")), 1),
              n("strong", null, o(a(fe)(p.value.length)), 1),
              n("span", null, o(a(t).label("当前查询返回的匹配行数", "Matched lines returned for the current query")), 1)
            ]),
            n("article", g1, [
              n("p", m1, o(a(t).label("涉及文件", "Files")), 1),
              n("strong", null, o(a(fe)(h.value)), 1),
              n("span", null, o(a(t).label("至少命中一次的文件数量", "Files that matched at least once")), 1)
            ]),
            n("article", b1, [
              n("p", v1, o(a(t).label("当前查询", "Current query")), 1),
              n("strong", null, o(r.value.trim() || "-"), 1),
              n("span", null, o(r.value.trim() ? a(t).label("结果来自当前搜索词", "Results are based on the current query") : a(t).label("还没有输入搜索词", "No search query yet")), 1)
            ]),
            n("article", y1, [
              n("p", w1, o(a(t).label("打开方式", "Open flow")), 1),
              n("strong", null, o(a(t).label("一跳到文件页", "Jump into Files")), 1),
              n("span", null, o(a(t).label("搜索结果会按文件或核心记忆模式自动定位", "Results automatically open in file or core-memory mode")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      X(re, {
        title: a(t).label("搜索结果", "Results"),
        eyebrow: "Results"
      }, {
        default: oe(() => [
          c.value ? (v(), y("div", $1, o(a(t).label("正在查找匹配结果…", "Searching for matching results…")), 1)) : p.value.length ? (v(), y("div", k1, [
            (v(!0), y(J, null, ve(p.value, (E) => (v(), y("article", {
              key: `${E.path}:${E.line}:${E.preview}`,
              class: "provider-card"
            }, [
              n("header", S1, [
                n("div", null, [
                  n("strong", null, o(E.relativePath || E.path), 1),
                  n("p", null, o(`L${E.line}`), 1)
                ]),
                n("div", C1, [
                  n("span", {
                    class: he(["pill", a(el)(E.path) ? "pill--success" : "pill--info"])
                  }, o(a(el)(E.path) ? a(t).label("核心记忆", "Core memory") : a(t).label("文件", "File")), 3)
                ])
              ]),
              n("p", null, o(E.preview), 1),
              n("div", x1, [
                n("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  onClick: (z) => m(E)
                }, o(a(t).label("在文件页打开", "Open in Files")), 9, R1)
              ])
            ]))), 128))
          ])) : (v(), y("div", E1, o(d.value ? a(t).label("当前搜索词没有命中任何文件。", "The current query did not match any files.") : a(t).label("输入关键词后开始搜索。", "Enter a query to start searching.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
function T1() {
  return Ee("/api/audit");
}
function P1() {
  return Ee("/api/profiles");
}
function O1(e) {
  return Ne("/api/profiles/apply", { profile: e });
}
function M1(e) {
  return Ee(`/api/harden/steps?platform=${encodeURIComponent(e)}`);
}
const I1 = { class: "page-stack" }, N1 = { class: "page-header" }, D1 = { class: "page-header__eyebrow" }, F1 = { class: "page-header__title" }, L1 = { class: "page-header__description" }, U1 = {
  key: 0,
  class: "page-empty"
}, V1 = {
  key: 1,
  class: "page-empty page-empty--error"
}, B1 = { class: "muted-copy" }, G1 = { class: "stat-grid" }, H1 = { class: "stat-card" }, W1 = { class: "stat-card__label" }, K1 = { class: "stat-card" }, j1 = { class: "stat-card__label" }, z1 = { class: "stat-card" }, q1 = { class: "stat-card__label" }, J1 = { class: "provider-stack" }, Q1 = { class: "provider-card__header" }, Y1 = { class: "pill pill--muted" }, X1 = { class: "mini-list" }, Z1 = { class: "provider-card__header" }, ew = {
  key: 0,
  class: "muted-copy"
}, tw = {
  key: 0,
  class: "page-empty"
}, sw = {
  key: 1,
  class: "page-empty page-empty--error"
}, nw = { class: "muted-copy" }, lw = { class: "provider-stack" }, aw = { class: "provider-card__header" }, iw = { class: "muted-copy" }, ow = { class: "pill pill--info" }, rw = { class: "settings-grid settings-grid--wide" }, cw = { class: "settings-field" }, uw = { class: "mini-list" }, dw = { class: "settings-field" }, fw = { class: "code-panel" }, pw = { class: "settings-field" }, hw = { class: "code-panel" }, _w = { class: "page-actions" }, gw = ["disabled", "onClick"], mw = {
  key: 0,
  class: "page-empty"
}, bw = {
  key: 1,
  class: "page-empty page-empty--error"
}, vw = { class: "muted-copy" }, yw = { class: "pill-row" }, ww = ["href"], $w = { class: "provider-stack" }, kw = { class: "provider-card__header" }, Sw = { class: "muted-copy" }, Cw = { class: "code-panel" }, xw = /* @__PURE__ */ Le({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const O = navigator.platform.toLowerCase();
      return O.includes("win") ? "windows" : O.includes("mac") ? "macos" : "linux";
    }
    const s = et(), l = gt(), i = /* @__PURE__ */ Q("audit"), r = /* @__PURE__ */ Q(t()), c = /* @__PURE__ */ Q(""), u = nt(() => T1(), null, { immediate: !1 }), d = nt(() => P1(), null, { immediate: !1 }), p = nt(() => M1(r.value), null, { immediate: !1 }), h = ae(() => [
      { id: "audit", label: s.label("安全检查", "Security checks") },
      { id: "profiles", label: s.label("权限模式", "Permission modes") },
      { id: "hardening", label: s.label("主机加固", "Host hardening") }
    ]), f = ae(() => {
      var P, B;
      const O = /* @__PURE__ */ new Map();
      for (const H of ((P = u.data) == null ? void 0 : P.results) || [])
        O.has(H.category) || O.set(H.category, []), (B = O.get(H.category)) == null || B.push(H);
      return Array.from(O.entries());
    });
    Ue(
      i,
      (O) => {
        O === "audit" && !u.data && !u.loading && u.execute(), O === "profiles" && !d.data && !d.loading && d.execute(), O === "hardening" && !p.data && !p.loading && p.execute();
      },
      { immediate: !0 }
    ), Ue(r, () => {
      i.value === "hardening" && p.execute({ silent: !!p.data });
    });
    function m(O) {
      return O === "pass" ? "pill--success" : O === "warn" ? "pill--warning" : "pill--danger";
    }
    function _(O) {
      return O === "pass" ? s.label("通过", "Pass") : O === "warn" ? s.label("警告", "Warning") : s.label("失败", "Fail");
    }
    async function D() {
      if (i.value === "audit") {
        await u.execute({ silent: !!u.data });
        return;
      }
      if (i.value === "profiles") {
        await d.execute({ silent: !!d.data });
        return;
      }
      await p.execute({ silent: !!p.data });
    }
    async function E(O) {
      c.value = O;
      try {
        const P = await O1(O);
        l.pushToast({
          tone: P.success ? "success" : "error",
          message: P.message
        });
      } catch (P) {
        l.pushToast({
          tone: "error",
          message: P instanceof Error ? P.message : String(P)
        });
      } finally {
        c.value = "";
      }
    }
    function z(O) {
      i.value = O;
    }
    return (O, P) => (v(), y("div", I1, [
      n("header", N1, [
        n("div", null, [
          n("p", D1, o(a(s).label("安全 / Second slice", "Security / Second slice")), 1),
          n("h2", F1, o(a(s).label("安全基线", "Security baseline")), 1),
          n("p", L1, o(a(s).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页面更像决策面板而不是说明书。", "Split the long screen into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: D
        }, o(i.value === "audit" && a(u).refreshing || i.value === "profiles" && a(d).refreshing || i.value === "hardening" && a(p).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      X($n, {
        items: h.value,
        "active-id": i.value,
        onChange: z
      }, null, 8, ["items", "active-id"]),
      i.value === "audit" ? (v(), y(J, { key: 0 }, [
        a(u).loading ? (v(), y("div", U1, o(a(s).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : a(u).error ? (v(), y("div", V1, o(a(u).error), 1)) : a(u).data ? (v(), y(J, { key: 2 }, [
          X(re, {
            title: a(s).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: oe(() => [
              n("p", B1, o(a(s).label("这一部分更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              n("div", G1, [
                n("article", H1, [
                  n("p", W1, o(a(s).label("通过项", "Pass")), 1),
                  n("strong", null, o(a(u).data.summary.pass), 1),
                  n("span", null, o(a(s).label("当前无需处理", "No action needed right now")), 1)
                ]),
                n("article", K1, [
                  n("p", j1, o(a(s).label("警告项", "Warning")), 1),
                  n("strong", null, o(a(u).data.summary.warn), 1),
                  n("span", null, o(a(s).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                n("article", z1, [
                  n("p", q1, o(a(s).label("失败项", "Fail")), 1),
                  n("strong", null, o(a(u).data.summary.fail), 1),
                  n("span", null, o(a(s).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(s).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: oe(() => [
              n("div", J1, [
                (v(!0), y(J, null, ve(f.value, ([B, H]) => (v(), y("article", {
                  key: B,
                  class: "provider-card"
                }, [
                  n("header", Q1, [
                    n("strong", null, o(B), 1),
                    n("span", Y1, o(H.length), 1)
                  ]),
                  n("div", X1, [
                    (v(!0), y(J, null, ve(H, (U) => (v(), y("div", {
                      key: `${B}-${U.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      n("div", Z1, [
                        n("strong", null, o(U.item), 1),
                        n("span", {
                          class: he(["pill", m(U.status)])
                        }, o(_(U.status)), 3)
                      ]),
                      n("p", null, o(U.message), 1),
                      U.fix ? (v(), y("p", ew, o(a(s).label("建议处理：", "Suggested fix: ")) + o(U.fix), 1)) : we("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : we("", !0)
      ], 64)) : i.value === "profiles" ? (v(), y(J, { key: 1 }, [
        a(d).loading ? (v(), y("div", tw, o(a(s).label("正在读取权限模式…", "Loading permission modes…")), 1)) : a(d).error ? (v(), y("div", sw, o(a(d).error), 1)) : a(d).data ? (v(), y(J, { key: 2 }, [
          X(re, {
            title: a(s).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: oe(() => [
              n("p", nw, o(a(s).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", lw, [
            (v(!0), y(J, null, ve(a(d).data, (B) => (v(), ht(re, {
              key: B.key,
              title: B.name,
              eyebrow: "Profile"
            }, {
              default: oe(() => {
                var H, U;
                return [
                  n("div", aw, [
                    n("p", iw, o(B.description), 1),
                    n("span", ow, o(B.riskLevel || a(s).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  n("div", rw, [
                    n("div", cw, [
                      n("span", null, o(a(s).label("建议使用场景", "Recommended use cases")), 1),
                      n("div", uw, [
                        (v(!0), y(J, null, ve(B.recommendations || [], (T) => (v(), y("div", {
                          key: T,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          n("p", null, o(T), 1)
                        ]))), 128))
                      ])
                    ]),
                    n("div", dw, [
                      n("span", null, o(a(s).label("允许规则", "Allow rules")), 1),
                      n("pre", fw, o((((H = B.tools) == null ? void 0 : H.allow) || []).join(`
`) || "(none)"), 1)
                    ]),
                    n("div", pw, [
                      n("span", null, o(a(s).label("拒绝规则", "Deny rules")), 1),
                      n("pre", hw, o((((U = B.tools) == null ? void 0 : U.deny) || []).join(`
`) || "(none)"), 1)
                    ])
                  ]),
                  n("div", _w, [
                    n("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: c.value === B.key,
                      onClick: (T) => E(B.key)
                    }, o(c.value === B.key ? a(s).label("应用中…", "Applying…") : a(s).label("应用权限模式", "Apply permission mode")), 9, gw)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : we("", !0)
      ], 64)) : (v(), y(J, { key: 2 }, [
        a(p).loading ? (v(), y("div", mw, o(a(s).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : a(p).error ? (v(), y("div", bw, o(a(p).error), 1)) : a(p).data ? (v(), y(J, { key: 2 }, [
          X(re, {
            title: a(s).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: oe(() => [
              n("p", vw, o(a(s).label("基础建议在所有平台上都一样：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              n("div", yw, [
                n("button", {
                  class: he(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: P[0] || (P[0] = (B) => r.value = "windows")
                }, "Windows", 2),
                n("button", {
                  class: he(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: P[1] || (P[1] = (B) => r.value = "macos")
                }, "macOS", 2),
                n("button", {
                  class: he(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: P[2] || (P[2] = (B) => r.value = "linux")
                }, "Linux", 2),
                n("a", {
                  class: "inline-link",
                  href: `/api/harden/script?platform=${r.value}`
                }, o(a(s).label("下载脚本", "Download script")), 9, ww)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          n("div", $w, [
            (v(!0), y(J, null, ve(a(p).data.steps, (B) => (v(), ht(re, {
              key: B.id,
              title: B.title,
              eyebrow: "Step"
            }, {
              default: oe(() => [
                n("div", kw, [
                  n("p", Sw, o(B.description), 1),
                  n("span", {
                    class: he(["pill", B.optional ? "pill--muted" : "pill--warning"])
                  }, o(B.optional ? a(s).label("可选", "Optional") : a(s).label("建议", "Recommended")), 3)
                ]),
                n("pre", Cw, o((B.commands || []).join(`
`) || a(s).label("当前没有附带命令。", "No commands are attached to this step.")), 1)
              ]),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : we("", !0)
      ], 64))
    ]));
  }
});
function Rw() {
  return Ee("/api/sessions");
}
const Ew = { class: "page-stack" }, Aw = { class: "page-header" }, Tw = { class: "page-header__eyebrow" }, Pw = { class: "page-header__title" }, Ow = { class: "page-header__description" }, Mw = {
  key: 0,
  class: "page-empty"
}, Iw = {
  key: 1,
  class: "page-empty page-empty--error"
}, Nw = { class: "stat-grid" }, Dw = { class: "stat-card" }, Fw = { class: "stat-card__label" }, Lw = { class: "stat-card" }, Uw = { class: "stat-card__label" }, Vw = { class: "stat-card" }, Bw = { class: "stat-card__label" }, Gw = { class: "stat-card" }, Hw = { class: "stat-card__label" }, Ww = { class: "stat-card" }, Kw = { class: "stat-card__label" }, jw = { class: "stat-card" }, zw = { class: "stat-card__label" }, qw = { class: "stat-grid" }, Jw = { class: "stat-card" }, Qw = { class: "stat-card" }, Yw = { class: "stat-card__label" }, Xw = { class: "stat-card" }, Zw = { class: "stat-card__label" }, e$ = { class: "stat-card" }, t$ = { class: "stat-card__label" }, s$ = { class: "stat-card" }, n$ = { class: "stat-card__label" }, l$ = { class: "stat-card" }, a$ = { class: "stat-card__label" }, i$ = {
  key: 0,
  class: "provider-stack"
}, o$ = { class: "provider-card__header" }, r$ = { class: "pill-row" }, c$ = { class: "pill pill--info" }, u$ = { class: "mini-list" }, d$ = { class: "mini-list__item mini-list__item--stack" }, f$ = { class: "mini-list__item mini-list__item--stack" }, p$ = { class: "mini-list__item mini-list__item--stack" }, h$ = { class: "mini-list__item mini-list__item--stack" }, _$ = {
  key: 1,
  class: "page-empty"
}, g$ = { class: "page-two-column" }, m$ = {
  key: 0,
  class: "provider-stack"
}, b$ = { class: "provider-card__header" }, v$ = { class: "pill pill--info" }, y$ = { class: "mini-list" }, w$ = {
  key: 1,
  class: "page-empty"
}, $$ = {
  key: 0,
  class: "provider-stack"
}, k$ = { class: "provider-card__header" }, S$ = { class: "pill pill--muted" }, C$ = {
  key: 1,
  class: "page-empty"
}, x$ = { class: "list-stack" }, R$ = { class: "stat-grid" }, E$ = { class: "stat-card" }, A$ = { class: "stat-card__label" }, T$ = { class: "stat-card" }, P$ = { class: "stat-card__label" }, O$ = { class: "stat-card" }, M$ = { class: "stat-card__label" }, I$ = { class: "stat-card" }, N$ = { class: "stat-card__label" }, D$ = /* @__PURE__ */ Le({
  __name: "SessionsPage",
  setup(e) {
    const t = et(), s = nt(() => Rw()), l = ae(() => {
      var f;
      return (f = s.data) == null ? void 0 : f.snapshot;
    }), i = ae(() => {
      var f;
      return ((f = l.value) == null ? void 0 : f.sessions) || [];
    }), r = ae(() => {
      var f, m;
      return ((m = (f = l.value) == null ? void 0 : f.sessionsMeta) == null ? void 0 : m.byAgent) || [];
    }), c = ae(() => i.value.filter((f) => !["ended", "finished", "closed"].includes(f.status))), u = ae(() => {
      var m;
      const f = (m = s.data) == null ? void 0 : m.costSummary;
      return f ? Number.isFinite(f.totalEstimatedCost) && (!!f.pricingUnit || f.totalEstimatedCost > 0) : !1;
    });
    function d() {
      var m;
      const f = (m = s.data) == null ? void 0 : m.costSummary;
      return !f || !u.value ? t.label("无法估算", "Unavailable") : Ea(f.totalEstimatedCost, f.pricingUnit || "USD");
    }
    function p() {
      return u.value ? t.label("仅供本地观察，不代表官方账单", "For local observation only, not an official bill") : t.label("缺少可靠单价或用量数据，当前不显示金额", "Pricing or usage data is incomplete, so no amount is shown");
    }
    function h(f) {
      return ["ended", "finished", "closed"].includes(f.status) ? "pill--muted" : ["error", "failed", "aborted"].includes(f.status) ? "pill--danger" : "pill--success";
    }
    return (f, m) => (v(), y("div", Ew, [
      n("header", Aw, [
        n("div", null, [
          n("p", Tw, o(a(t).label("会话 / Third slice", "Sessions / Third slice")), 1),
          n("h2", Pw, o(a(t).label("会话观察台", "Session observer")), 1),
          n("p", Ow, o(a(t).label("把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。", "Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.")), 1)
        ]),
        n("button", {
          class: "page-header__action",
          type: "button",
          onClick: m[0] || (m[0] = (_) => a(s).execute({ silent: !0 }))
        }, o(a(s).refreshing ? a(t).label("刷新中…", "Refreshing…") : a(t).label("Refresh", "Refresh")), 1)
      ]),
      a(s).loading ? (v(), y("div", Mw, o(a(t).label("正在读取会话快照…", "Loading the session snapshot…")), 1)) : a(s).error ? (v(), y("div", Iw, o(a(s).error), 1)) : a(s).data && l.value ? (v(), y(J, { key: 2 }, [
        X(re, {
          title: a(t).label("会话总览", "Session overview"),
          eyebrow: "Summary"
        }, {
          default: oe(() => {
            var _, D, E, z;
            return [
              n("div", Nw, [
                n("article", Dw, [
                  n("p", Fw, o(a(t).label("会话总数", "Sessions")), 1),
                  n("strong", null, o(a(fe)(((_ = l.value.summary) == null ? void 0 : _.sessionCount) ?? i.value.length)), 1),
                  n("span", null, o(((D = l.value.summary) == null ? void 0 : D.defaultModel) || a(t).label("默认模型未知", "Default model is unknown")), 1)
                ]),
                n("article", Lw, [
                  n("p", Uw, o(a(t).label("活跃会话", "Active now")), 1),
                  n("strong", null, o(a(fe)(c.value.length)), 1),
                  n("span", null, o(a(t).label("当前仍在运行或待执行的会话", "Sessions that are still running or waiting now")), 1)
                ]),
                n("article", Vw, [
                  n("p", Bw, o(a(t).label("累计 Tokens", "Total tokens")), 1),
                  n("strong", null, o(a(fe)(a(s).data.costSummary.totalTokens)), 1),
                  n("span", null, o(a(t).label("基于共享运行时快照统计", "Counted from the shared runtime snapshot")), 1)
                ]),
                n("article", Gw, [
                  n("p", Hw, o(a(t).label("用量估算", "Usage estimate")), 1),
                  n("strong", null, o(d()), 1),
                  n("span", null, o(p()), 1)
                ]),
                n("article", Ww, [
                  n("p", Kw, o(a(t).label("会话索引路径", "Session paths")), 1),
                  n("strong", null, o(a(fe)(((E = l.value.sessionsMeta) == null ? void 0 : E.paths.length) || 0)), 1),
                  n("span", null, o(a(t).label("被 Guard 识别到的会话目录", "Session directories detected by Guard")), 1)
                ]),
                n("article", jw, [
                  n("p", zw, o(a(t).label("待处理系统事件", "Queued events")), 1),
                  n("strong", null, o(a(fe)(((z = l.value.summary) == null ? void 0 : z.queuedSystemEvents) || 0)), 1),
                  n("span", null, o(a(t).label("等待处理的系统级事件", "System events that are still waiting")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(t).label("运行环境", "Runtime context"),
          eyebrow: "Runtime"
        }, {
          default: oe(() => {
            var _, D, E, z, O, P, B, H, U, T, w, S, R, Z, ie, _e, ye, Ie, Te, M, $, A;
            return [
              n("div", qw, [
                n("article", Jw, [
                  m[1] || (m[1] = n("p", { class: "stat-card__label" }, "OS", -1)),
                  n("strong", null, o(((_ = l.value.os) == null ? void 0 : _.label) || "-"), 1),
                  n("span", null, o([(D = l.value.os) == null ? void 0 : D.platform, (E = l.value.os) == null ? void 0 : E.arch, (z = l.value.os) == null ? void 0 : z.release].filter(Boolean).join(" / ") || a(t).label("系统信息暂缺", "OS details are missing")), 1)
                ]),
                n("article", Qw, [
                  n("p", Yw, o(a(t).label("记忆检索", "Memory search")), 1),
                  n("strong", null, o(((O = l.value.memory) == null ? void 0 : O.provider) || ((P = l.value.memory) == null ? void 0 : P.backend) || "-"), 1),
                  n("span", null, o([(B = l.value.memory) == null ? void 0 : B.searchMode, ((H = l.value.memory) == null ? void 0 : H.dbPath) || ((U = l.value.memory) == null ? void 0 : U.workspaceDir)].filter(Boolean).join(" / ") || a(t).label("记忆运行态信息暂缺", "Memory runtime details are missing")), 1)
                ]),
                n("article", Xw, [
                  n("p", Zw, o(a(t).label("Gateway 服务", "Gateway service")), 1),
                  n("strong", null, o(((T = l.value.gatewayService) == null ? void 0 : T.label) || "-"), 1),
                  n("span", null, o([(w = l.value.gatewayService) == null ? void 0 : w.loadedText, (S = l.value.gatewayService) == null ? void 0 : S.runtimeShort].filter(Boolean).join(" / ") || a(t).label("Gateway 服务信息暂缺", "Gateway service details are missing")), 1)
                ]),
                n("article", e$, [
                  n("p", t$, o(a(t).label("Node 服务", "Node service")), 1),
                  n("strong", null, o(((R = l.value.nodeService) == null ? void 0 : R.label) || "-"), 1),
                  n("span", null, o([(Z = l.value.nodeService) == null ? void 0 : Z.loadedText, (ie = l.value.nodeService) == null ? void 0 : ie.runtimeShort].filter(Boolean).join(" / ") || a(t).label("Node 服务信息暂缺", "Node service details are missing")), 1)
                ]),
                n("article", s$, [
                  n("p", n$, o(a(t).label("更新轨道", "Update track")), 1),
                  n("strong", null, o(((_e = l.value.update) == null ? void 0 : _e.channel) || ((ye = l.value.update) == null ? void 0 : ye.installKind) || "-"), 1),
                  n("span", null, o([(Ie = l.value.update) == null ? void 0 : Ie.packageManager, (Te = l.value.update) == null ? void 0 : Te.latestVersion].filter(Boolean).join(" / ") || a(t).label("更新信息暂缺", "Update details are missing")), 1)
                ]),
                n("article", l$, [
                  n("p", a$, o(a(t).label("安全审计", "Security audit")), 1),
                  n("strong", null, o(a(fe)(((M = l.value.securityAudit) == null ? void 0 : M.findingsCount) || 0)), 1),
                  n("span", null, o(`${a(fe)((($ = l.value.securityAudit) == null ? void 0 : $.critical) || 0)} critical / ${a(fe)(((A = l.value.securityAudit) == null ? void 0 : A.warn) || 0)} warn`), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        X(re, {
          title: a(t).label("当前会话", "Current sessions"),
          eyebrow: "Sessions"
        }, {
          default: oe(() => [
            i.value.length ? (v(), y("div", i$, [
              (v(!0), y(J, null, ve(i.value, (_) => (v(), y("article", {
                key: _.id,
                class: "provider-card"
              }, [
                n("header", o$, [
                  n("div", null, [
                    n("strong", null, o(_.id), 1),
                    n("p", null, o(`${_.agentId} / ${_.modelId}`), 1)
                  ]),
                  n("div", r$, [
                    n("span", {
                      class: he(["pill", h(_)])
                    }, o(_.status || "-"), 3),
                    n("span", c$, o(_.channel || "-"), 1)
                  ])
                ]),
                n("div", u$, [
                  n("div", d$, [
                    n("strong", null, o(a(t).label("时间轴", "Timeline")), 1),
                    n("p", null, o(a(t).label("开始：", "Started: ")) + o(a(Ze)(_.startedAt)), 1),
                    n("p", null, o(a(t).label("更新：", "Updated: ")) + o(a(Ze)(_.updatedAt)), 1)
                  ]),
                  n("div", f$, [
                    n("strong", null, o(a(t).label("Token 使用", "Token usage")), 1),
                    n("p", null, o(`${a(fe)(_.usage.totalTokens)} tokens`), 1),
                    n("p", null, o(`${a(t).label("输入", "Input")} ${a(fe)(_.usage.inputTokens)} / ${a(t).label("输出", "Output")} ${a(fe)(_.usage.outputTokens)}`), 1)
                  ]),
                  n("div", p$, [
                    n("strong", null, o(a(t).label("上下文窗口", "Context window")), 1),
                    n("p", null, o(_.contextTokens != null ? a(fe)(_.contextTokens) : "-"), 1),
                    n("p", null, o(a(t).label("剩余：", "Remaining: ")) + o(_.remainingTokens != null ? a(fe)(_.remainingTokens) : "-"), 1)
                  ]),
                  n("div", h$, [
                    n("strong", null, o(a(t).label("用量估算", "Usage estimate")), 1),
                    n("p", null, o(a(Ea)(_.estimatedCost, a(s).data.costSummary.pricingUnit || "USD")), 1),
                    n("p", null, o(a(t).label("上下文占比：", "Context used: ")) + o(a(Md)(_.percentUsed)), 1)
                  ])
                ])
              ]))), 128))
            ])) : (v(), y("div", _$, o(a(t).label("当前还没有会话记录。", "There are no session records right now.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        n("div", g$, [
          X(re, {
            title: a(t).label("按角色分布", "By role"),
            eyebrow: "Roles"
          }, {
            default: oe(() => [
              r.value.length ? (v(), y("div", m$, [
                (v(!0), y(J, null, ve(r.value, (_) => (v(), y("article", {
                  key: _.agentId,
                  class: "provider-card"
                }, [
                  n("header", b$, [
                    n("div", null, [
                      n("strong", null, o(_.agentId), 1),
                      n("p", null, o(_.path || a(t).label("没有返回路径信息", "No path information returned")), 1)
                    ]),
                    n("span", v$, o(a(fe)(_.count)), 1)
                  ]),
                  n("div", y$, [
                    (v(!0), y(J, null, ve(_.recent.slice(0, 3), (D) => (v(), y("div", {
                      key: D.id,
                      class: "mini-list__item"
                    }, [
                      n("div", null, [
                        n("strong", null, o(D.modelId), 1),
                        n("p", null, o(D.channel), 1)
                      ]),
                      n("span", {
                        class: he(["pill", h(D)])
                      }, o(D.status), 3)
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (v(), y("div", w$, o(a(t).label("当前没有按角色聚合的会话数据。", "No per-role session summary is available right now.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          X(re, {
            title: a(t).label("最近活动", "Recent activity"),
            eyebrow: "Timeline"
          }, {
            default: oe(() => [
              a(s).data.recentActivity.length ? (v(), y("div", $$, [
                (v(!0), y(J, null, ve(a(s).data.recentActivity.slice(0, 10), (_) => (v(), y("article", {
                  key: _.id,
                  class: "provider-card"
                }, [
                  n("header", k$, [
                    n("div", null, [
                      n("strong", null, o(_.title), 1),
                      n("p", null, o(a(Ze)(_.createdAt)), 1)
                    ]),
                    n("span", S$, o(_.type), 1)
                  ]),
                  n("p", null, o(_.description), 1)
                ]))), 128))
              ])) : (v(), y("div", C$, o(a(t).label("当前还没有最近活动记录。", "There is no recent activity yet.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        l.value.warnings.length ? (v(), ht(re, {
          key: 0,
          title: a(t).label("运行提醒", "Runtime warnings"),
          eyebrow: "Warning"
        }, {
          default: oe(() => [
            n("div", x$, [
              (v(!0), y(J, null, ve(l.value.warnings, (_) => (v(), y("article", {
                key: _,
                class: "risk-row"
              }, [
                n("strong", null, o(a(t).label("注意事项", "Warning")), 1),
                n("span", null, o(_), 1)
              ]))), 128))
            ])
          ]),
          _: 1
        }, 8, ["title"])) : we("", !0),
        l.value.memory ? (v(), ht(re, {
          key: 1,
          title: a(t).label("记忆运行态补充", "Memory runtime details"),
          eyebrow: "Memory"
        }, {
          default: oe(() => [
            n("div", R$, [
              n("article", E$, [
                n("p", A$, o(a(t).label("记忆文件", "Memory files")), 1),
                n("strong", null, o(a(fe)(l.value.memory.files)), 1),
                n("span", null, o(a(t).label("当前已接入的记忆文件数量", "Managed memory files detected now")), 1)
              ]),
              n("article", T$, [
                n("p", P$, o(a(t).label("记忆分块", "Chunks")), 1),
                n("strong", null, o(a(fe)(l.value.memory.chunks)), 1),
                n("span", null, o(a(t).label("用于搜索的记忆分块数", "Memory chunks available for search")), 1)
              ]),
              n("article", O$, [
                n("p", M$, o(a(t).label("索引状态", "Index state")), 1),
                n("strong", null, o(l.value.memory.dirty === !0 ? a(t).label("待刷新", "Dirty") : l.value.memory.dirty === !1 ? a(t).label("已同步", "Clean") : "-"), 1),
                n("span", null, o(l.value.memory.dbPath || l.value.memory.workspaceDir || a(t).label("没有返回索引路径", "No index path returned")), 1)
              ]),
              n("article", I$, [
                n("p", N$, o(a(t).label("索引目录", "Index location")), 1),
                n("strong", null, o(l.value.memory.dbPath ? a(t).label("已返回路径", "Path returned") : a(t).label("暂无路径", "No path")), 1),
                n("span", null, o(l.value.memory.dbPath || l.value.memory.workspaceDir || a(t).label("没有返回目录信息", "No directory information returned")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"])) : we("", !0)
      ], 64)) : we("", !0)
    ]));
  }
}), F$ = od({
  history: Bu(),
  routes: [
    { path: "/", name: "overview", component: Ah },
    { path: "/operations", name: "operations", component: nv },
    { path: "/openclaw", name: "openclaw", component: zb },
    { path: "/channels", name: "channels", component: Pf },
    { path: "/models", name: "models", component: Im },
    { path: "/security", name: "security", component: xw },
    { path: "/recovery", name: "recovery", component: Ey },
    { path: "/roles", name: "roles", component: l1 },
    { path: "/files", name: "files", component: cg },
    { path: "/search", name: "search", component: A1 },
    { path: "/sessions", name: "sessions", component: D$ },
    { path: "/logs", name: "logs", component: Og },
    { path: "/notifications", name: "notifications", component: Fb },
    { path: "/cron", name: "cron", component: oh },
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
Fc(Od).use(Vc()).use(F$).mount("#guard-next-app");
